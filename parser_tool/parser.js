const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const dictionaries = require('./dictionaries');
const staticData = require('./static_data');

const allTeachers = dictionaries.teachers || {};
const sortedTeacherCodes = Object.keys(allTeachers).sort((a, b) => b.length - a.length);

const CONFIG = { sheetIndex: 0 };

// Map time header text to hour (9AM=9, 10AM=10, etc.)
function parseTimeHeader(text) {
    if (!text) return null;
    const cleaned = text.toString().toUpperCase().replace(/\s+/g, '').replace(/[–—]/g, '-').replace(/\./g, ':');
    
    // Must look like a time range: "9-10AM", "11-12PM", "1-2PM", "12-1PM", etc.
    // Must contain a dash and at least one digit
    if (!cleaned.includes('-') || !/\d/.test(cleaned)) return null;
    
    // Reject if it looks like class data (contains parentheses or slashes)
    if (cleaned.includes('(') || cleaned.includes('/')) return null;
    
    // Try to extract: startHour-endHour[AM/PM]
    const rangeMatch = cleaned.match(/^(\d{1,2})(?::?\d{0,2})?-(\d{1,2})(?::?\d{0,2})?(AM|PM)?$/);
    if (!rangeMatch) return null;
    
    let startHour = parseInt(rangeMatch[1], 10);
    let endHour = parseInt(rangeMatch[2], 10);
    let ampm = rangeMatch[3]; // AM or PM suffix (applies to END hour typically)
    
    // If we have AM/PM, figure out the actual start hour
    if (ampm === 'PM') {
        // End hour is PM
        if (endHour < 12) endHour += 12;
        // Start hour: if it's >= endHour-2 and < 12, it's probably AM (like 11-12PM means 11AM)
        // If start hour is small (1-6), it's PM too (like 1-2PM means 13)
        if (startHour <= 6) startHour += 12; // 1-2PM -> 13, 2-3PM -> 14, etc.
        // 11-12PM: startHour=11, keep as-is (11AM)
        // 12-1PM: startHour=12, keep as-is (12PM)
    } else if (ampm === 'AM') {
        // Both are AM
        // 9-10AM: startHour=9, fine
    } else {
        // No AM/PM suffix - try to infer from hour values
        // If startHour is 1-6, assume PM
        if (startHour >= 1 && startHour <= 6) startHour += 12;
    }
    
    // Sanity check: only accept hours 8-18
    if (startHour >= 8 && startHour <= 18) return startHour;
    return null;
}

const DAY_MAP = {
    "MON": 1, "MONDAY": 1,
    "TUE": 2, "TUES": 2, "TUESDAY": 2,
    "WED": 3, "WEDNESDAY": 3,
    "THU": 4, "THUR": 4, "THURSDAY": 4,
    "FRI": 5, "FRIDAY": 5,
    "SAT": 6, "SATURDAY": 6
};

// Detect day from cell text
function detectDay(text) {
    if (!text) return null;
    const cleaned = text.toString().toUpperCase().trim();
    for (const [key, val] of Object.entries(DAY_MAP)) {
        if (cleaned === key || cleaned.startsWith(key)) return val;
    }
    return null;
}

// === BATCH EXPANSION: e.g. "A1-A4" -> ["A1","A2","A3","A4"] ===
function expandBatches(batchString) {
    let spaced = batchString.replace(/(\d)([A-Za-z])/g, '$1,$2');
    const parts = spaced.split(/[,+]/).map(s => s.trim()).filter(s => s);
    const expanded = [];
    
    let lastPrefix = '';

    parts.forEach(part => {
        if (part.includes('-')) {
            const [start, end] = part.split('-').map(s => s.trim());
            const matchStart = start.match(/^([A-Za-z]*)(\d+)$/i);
            const matchEnd = end.match(/^([A-Za-z]*)(\d+)$/i);
            
            if (matchStart && matchEnd) {
                let prefix = matchStart[1] || lastPrefix;
                if (prefix) lastPrefix = prefix; // remember it
                
                const endPrefix = matchEnd[1] || prefix;
                
                if (prefix.toUpperCase() === endPrefix.toUpperCase()) {
                    const startNum = parseInt(matchStart[2], 10);
                    const endNum = parseInt(matchEnd[2], 10);
                    
                    if (startNum <= endNum && (endNum - startNum) < 20) {
                        for (let i = startNum; i <= endNum; i++) expanded.push(`${prefix}${i}`);
                    } else expanded.push(`${prefix}${matchStart[2]}-${endPrefix}${matchEnd[2]}`);
                } else expanded.push(part);
            } else expanded.push(part);
        } else {
            // It's a single item like "B11" or "12"
            const matchSingle = part.match(/^([A-Za-z]*)(\d+)$/i);
            if (matchSingle) {
                let prefix = matchSingle[1];
                if (prefix) {
                    lastPrefix = prefix; // update prefix
                } else {
                    prefix = lastPrefix; // inherit prefix
                }
                
                if (prefix) {
                    expanded.push(`${prefix}${matchSingle[2]}`);
                } else {
                    expanded.push(part); // fallback
                }
            } else {
                expanded.push(part);
            }
        }
    });
    return expanded;
}

// === PARSE A SINGLE CELL's TEXT ===
function parseCellString(rawText, semester) {
    if (!rawText || typeof rawText !== 'string') return [];
    
    const text = rawText.replace(/\r?\n/g, ' ').replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim();
    
    // Skip cells that are clearly headers/junk (day names, time slots, "LEGEND", etc.)
    const upperText = text.toUpperCase();
    if (/^(MON|TUE|WED|THU|FRI|SAT|SUN|LEGEND|BACKLOG|PROBABILITY AND|NOTE)/i.test(upperText)) return [];
    if (/^\d{1,2}-\d{1,2}(AM|PM)?$/i.test(text.replace(/\s/g, ''))) return []; // skip time-only cells
    
    // Lookahead Regex: Splits when two classes share the same cell
    const entries = text.match(/[A-Z0-9,+\- ]+\(\s*[^)]+\s*\)[^(]*(?=\s*[A-Z0-9,+\- ]+\(\s*[^)]+\s*\)|$)/gi);
    
    if (!entries) return [];

    const results = [];

    entries.forEach(entry => {
        // Match: BATCHES(SUBJECT)-ROOM/TEACHER
        // We use \/ as the separator between room and teacher to avoid splitting by comma prematurely
        const match = entry.match(/^([^()]+)\s*\(\s*([^)]+)\s*\)\s*-?\s*([^/]+?)(?:\s*\/\s*(.*))?$/i);     
        
        if (!match) return;

        let batchPart = match[1].trim();
        let subjectPart = match[2].trim();
        let roomPart = match[3].trim();
        let teacherPart = match[4] ? match[4].trim() : "TBA";
        
        // Dictionary-assisted splitting if no explicit slash was found and teacher is TBA
        if (teacherPart === "TBA") {
            let extractedTeachers = [];
            let cleanRooms = [];
            
            // Split roomPart by comma to handle multiple combined blocks
            let tempParts = roomPart.split(',').map(s => s.trim()).filter(s => s);
            
            tempParts.forEach(part => {
                let foundTeacher = null;
                for (const tCode of sortedTeacherCodes) {
                    if (part.toUpperCase().endsWith(tCode) && part.length > tCode.length) {
                        // Prevent slicing "LAB" into room "L" and teacher "AB"
                        if (part.toUpperCase().endsWith("LAB") && tCode === "AB") {
                            continue;
                        }

                        foundTeacher = tCode;
                        cleanRooms.push(part.slice(0, -tCode.length).trim());
                        extractedTeachers.push(tCode);
                        break;
                    }
                }
                if (!foundTeacher) {
                    cleanRooms.push(part);
                }
            });
            
            if (extractedTeachers.length > 0) {
                roomPart = cleanRooms.join(',');
                teacherPart = extractedTeachers.join(',');
            }
        }
        if (!teacherPart) teacherPart = "TBA";
        
        let type = 'LEC';
        let cleanBatches = batchPart.toUpperCase();
        
        let subjectDict = semester === 1 ? dictionaries.subjectsSem1 : dictionaries.subjectsSem3;
        let subjectTitle = subjectDict && subjectDict[subjectPart] ? subjectDict[subjectPart].toUpperCase() : "";
        
        if (cleanBatches.startsWith('T')) type = 'TUT';
        else if (cleanBatches.startsWith('P')) type = 'LAB';
        else if (cleanBatches.startsWith('L')) type = 'LEC';
        else if (subjectPart.toUpperCase().includes('LAB') || subjectTitle.includes('LAB')) type = 'LAB';

        // Strip the L, T, P prefix
        cleanBatches = cleanBatches.replace(/^[LTP](?=[A-Z])/i, '').trim();

        const rawBatchesList = expandBatches(cleanBatches);
        const numBatches = rawBatchesList.length;

        // --- Distribute Rooms ---
        let roomPartsRaw = roomPart.split(',').map(s => s.trim()).filter(s => s);
        let roomParts = [];
        let lastRoomPrefix = '';
        roomPartsRaw.forEach(r => {
            let m = r.match(/^([A-Za-z]+)?(.*)$/);
            if (m && m[1]) lastRoomPrefix = m[1];
            roomParts.push((m && m[1] ? m[1] : lastRoomPrefix) + (m ? m[2] : r));
        });
        
        let chunkedRooms = [];
        if (roomParts.length === 1) {
            for (let i = 0; i < numBatches; i++) chunkedRooms.push(roomParts[0]);
        } else if (roomParts.length >= numBatches && numBatches > 1) {
            for (let i = 0; i < numBatches; i++) {
                if (i === numBatches - 1) {
                    chunkedRooms.push(roomParts.slice(i).join(','));
                } else {
                    chunkedRooms.push(roomParts[i]);
                }
            }
        } else {
            for (let i = 0; i < numBatches; i++) chunkedRooms.push(roomParts.join(','));
        }

        // --- Distribute Teachers ---
        let teacherPartsRaw = teacherPart === "TBA" ? ["TBA"] : teacherPart.split(/[,/\s]+/).map(s => s.trim()).filter(s => s);
        let chunkedTeachers = [];
        if (teacherPartsRaw.length === 1) {
            for (let i = 0; i < numBatches; i++) chunkedTeachers.push(teacherPartsRaw[0]);
        } else if (teacherPartsRaw.length >= numBatches && numBatches > 1) {
            const baseSize = Math.floor(teacherPartsRaw.length / numBatches);
            const remainder = teacherPartsRaw.length % numBatches;
            let offset = 0;
            for (let i = 0; i < numBatches; i++) {
                let size = baseSize + (i >= numBatches - remainder ? 1 : 0);
                chunkedTeachers.push(teacherPartsRaw.slice(offset, offset + size).join(','));
                offset += size;
            }
        } else {
            for (let i = 0; i < numBatches; i++) chunkedTeachers.push(teacherPartsRaw.join(','));
        }
        
        rawBatchesList.forEach((b, index) => {
            let finalBatch = b.trim().toUpperCase();
            
            // VALIDATION: batch must match pattern like A1, B12, C3, D1, G1, etc.
            // Must start with a letter and end with digits, total length 2-4
            if (!/^[A-Z]\d{1,3}$/.test(finalBatch)) return;
            
            results.push({
                rawBatch: finalBatch,
                type: type,
                subject: subjectPart,
                room: chunkedRooms[index] || roomPart,
                teacher: chunkedTeachers[index] || teacherPart
            });
        });
    });

    // === SECOND LEVEL PARSING ===
    // Go through the extracted results and detect misarrangements (be "the eyes")
    const teacherCodes = Object.keys(dictionaries.teachers || {});
    const roomCodes = Object.keys(staticData.classroomLocations || {});
    
    let finalResults = [];
    results.forEach(res => {
        let isMisarranged = false;
        
        let tTokens = res.teacher.split(/[,/\s]+/).map(t => t.trim().toUpperCase()).filter(t => t);
        let rTokens = res.room.split(/[,/\s]+/).map(t => t.trim().toUpperCase()).filter(t => t);

        // Check if teacher field contains a room
        if (tTokens.some(t => roomCodes.includes(t) || /^(CL|CR|TR|TS|G|F|FF|PL|BT|MCL|LAB)\d{1,3}$/.test(t))) {
            isMisarranged = true;
        }
        
        // Check if room field contains a teacher
        if (rTokens.some(r => teacherCodes.includes(r) || /^NF\d{1,3}$/.test(r))) {
            isMisarranged = true;
        }

        if (isMisarranged) {
            // Re-parse the text for this entry using token classification to fix the misarrangement
            let combinedString = `${res.rawBatch} ${res.subject} ${res.room} ${res.teacher}`;
            let corrected = parseCellStringTokens(combinedString, semester);
            if (corrected.length > 0) {
                finalResults.push(...corrected);
            } else {
                finalResults.push(res);
            }
        } else {
            finalResults.push(res);
        }
    });

    if (finalResults.length === 0) {
        return parseCellStringTokens(rawText, semester);
    }

    return finalResults;
}

const isInsideMerge = (r, c, merges) => {
    return merges.find(m => r >= m.s.r && r <= m.e.r && c >= m.s.c && c <= m.e.c);
};

function parseSingleFile(filePath, semester) {
    console.log(`📂 Reading: ${filePath}...`);
    
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[CONFIG.sheetIndex];
    const sheet = workbook.Sheets[sheetName];

    const range = XLSX.utils.decode_range(sheet['!ref']);
    const merges = sheet['!merges'] || [];

    // === STEP 1: Find the time header row ===
    // Look for a row that has at least 3 valid time headers in columns 1+
    let timeRowIndex = -1;
    let colToStartHour = {};

    for (let R = 0; R <= 15; ++R) {
        let matchesInRow = 0;
        let tempMap = {};
        for (let C = 1; C <= range.e.c; ++C) { // Start from col 1, not col 0 (col 0 has day names)
            const cell = sheet[XLSX.utils.encode_cell({ r: R, c: C })];
            if (cell && cell.v) {
                const cellText = cell.v.toString().trim();
                const hour = parseTimeHeader(cellText);
                if (hour !== null) {
                    matchesInRow++;
                    tempMap[C] = hour;
                }
            }
        }
        if (matchesInRow >= 3) {
            timeRowIndex = R;
            colToStartHour = tempMap;
            break;
        }
    }

    if (timeRowIndex === -1) {
        console.error(`❌ ERROR: Could not find Time Headers in ${path.basename(filePath)}. Skipping.`);
        return [];
    }

    console.log(`   ⏰ Time header row: ${timeRowIndex}, columns mapped: ${JSON.stringify(colToStartHour)}`);

    // === STEP 2: Detect the day for the time header row itself ===
    // The day name (e.g. "MON") might be on the SAME row as the time headers
    let firstDay = null;
    const dayCell = sheet[XLSX.utils.encode_cell({ r: timeRowIndex, c: 0 })];
    if (dayCell && dayCell.v) {
        firstDay = detectDay(dayCell.v.toString());
    }
    
    // Data starts from the row AFTER the time header
    const dataStartRow = timeRowIndex + 1;
    
    // === STEP 3: Build a map of which rows belong to which day ===
    // Using merge information + cell scanning
    const rowToDay = {};
    
    // If the time header row had a day, all subsequent rows until next day belong to it
    if (firstDay !== null) {
        // Find the merge range for column 0 starting at timeRowIndex
        const dayMerge = merges.find(m => m.s.r === timeRowIndex && m.s.c === 0);
        const endRow = dayMerge ? dayMerge.e.r : timeRowIndex;
        for (let R = dataStartRow; R <= endRow; R++) {
            rowToDay[R] = firstDay;
        }
        console.log(`   📅 First day: ${firstDay} (rows ${dataStartRow}-${endRow})`);
    }
    
    // Now scan remaining rows for day names in column 0
    for (let R = dataStartRow; R <= range.e.r; ++R) {
        if (rowToDay[R] !== undefined) continue; // already assigned
        
        const cell = sheet[XLSX.utils.encode_cell({ r: R, c: 0 })];
        if (cell && cell.v) {
            const dayVal = detectDay(cell.v.toString());
            if (dayVal !== null) {
                // Find merge range for this day cell
                const dayMerge = merges.find(m => m.s.r === R && m.s.c === 0);
                const endRow = dayMerge ? dayMerge.e.r : R;
                for (let rr = R; rr <= endRow; rr++) {
                    rowToDay[rr] = dayVal;
                }
                console.log(`   📅 Day ${dayVal}: rows ${R}-${endRow}`);
            }
            
            // Stop at LEGEND
            if (cell.v.toString().toUpperCase().includes('LEGEND')) break;
        }
    }

    // === STEP 4: Extract class data ===
    const results = [];

    for (let R = dataStartRow; R <= range.e.r; ++R) {
        const currentDay = rowToDay[R];
        if (!currentDay) continue;

        for (let C = 1; C <= range.e.c; ++C) {
            const startHour = colToStartHour[C];
            if (!startHour) continue;

            const mergeObj = isInsideMerge(R, C, merges);
            if (mergeObj && (mergeObj.s.r !== R || mergeObj.s.c !== C)) continue;

            const cell = sheet[XLSX.utils.encode_cell({ r: R, c: C })];
            if (cell && cell.v) {
                let duration = 1;
                if (mergeObj) {
                    const mappedCols = Object.keys(colToStartHour).map(Number).sort((a,b)=>a-b);
                    let sH = colToStartHour[mergeObj.s.c];
                    let eC = mappedCols.slice().reverse().find(c => c <= mergeObj.e.c);
                    let eH = eC ? colToStartHour[eC] : null;
                    if (sH && eH) {
                        duration = (eH - sH) + 1;
                    }
                }
                
                const parsedDataList = parseCellString(cell.v.toString(), semester);
                parsedDataList.forEach(parsedData => {
                    let finalDuration = duration;
                    if (parsedData.subject.toUpperCase().includes('GE111')) {
                        finalDuration = 3;
                    }

                    results.push({
                        day: currentDay,
                        start: startHour,
                        duration: finalDuration,
                        batch: parsedData.rawBatch,
                        type: parsedData.type,
                        subject: parsedData.subject,
                        room: parsedData.room,
                        teacher: parsedData.teacher
                    });
                });
            }
        }
    }
    return results;
}

// === MAIN ===
function main() {
    const rawDataDir = path.join(__dirname, '../raw_data');
    let filesToParse = [];

    function findFiles(dir) {
        if (!fs.existsSync(dir)) return;
        const items = fs.readdirSync(dir);
        items.forEach(item => {
            const fullPath = path.join(dir, item);
            if (!fs.statSync(fullPath).isDirectory()) {
                const lowerItem = item.toLowerCase();
                if (lowerItem === '62.xlsx' || lowerItem === '128.xlsx' || lowerItem === '1.xlsx') {
                    filesToParse.push(fullPath);
                }
            }
        });
    }

    findFiles(rawDataDir);
    let combinedSchedule = [];

    if (filesToParse.length === 0) {
        console.log("❌ ERROR: No timetable files found in raw_data!");
        return;
    }

    filesToParse.forEach(filePath => {
        try {
            const basename = path.basename(filePath).toLowerCase();
            let semester = 3;
            if (basename === '1.xlsx') semester = 1;

            let fileData = parseSingleFile(filePath, semester);
            if (fileData && fileData.length > 0) {
                fileData.forEach(entry => entry.semester = semester);
                combinedSchedule = combinedSchedule.concat(fileData);
                console.log(`   ✅ Extracted ${fileData.length} entries from ${path.basename(filePath)}`);
            }
        } catch (err) {
            console.error(`   ❌ ERROR parsing file ${filePath}:`, err.message);
        }
    });

    // --- DEDUPLICATOR ---
    const uniqueClasses = new Map();
    combinedSchedule.forEach(entry => {
        const uniqueKey = `${entry.batch}-${entry.day}-${entry.start}-${entry.subject}-${entry.room}`;
        if (!uniqueClasses.has(uniqueKey)) {
            uniqueClasses.set(uniqueKey, entry);
        }
    });

    const finalCleanSchedule = Array.from(uniqueClasses.values());

    if (finalCleanSchedule.length > 0) {
        fs.writeFileSync(path.join(__dirname, 'parsed_output.json'), JSON.stringify(finalCleanSchedule, null, 2));
        console.log(`\n🎉 Success! Final master count: ${finalCleanSchedule.length}`);
        
        // Summary per batch
        const batchCounts = {};
        finalCleanSchedule.forEach(e => {
            batchCounts[e.batch] = (batchCounts[e.batch] || 0) + 1;
        });
        const sortedBatches = Object.keys(batchCounts).sort((a, b) => a.localeCompare(b, undefined, {numeric: true}));
        console.log('\n📊 Entries per batch:');
        sortedBatches.forEach(b => console.log(`   ${b}: ${batchCounts[b]}`));
        
        // Summary per day
        const dayCounts = {};
        finalCleanSchedule.forEach(e => {
            dayCounts[e.day] = (dayCounts[e.day] || 0) + 1;
        });
        console.log('\n📊 Entries per day:');
        Object.keys(dayCounts).sort().forEach(d => {
            const dayNames = {1:'MON',2:'TUE',3:'WED',4:'THU',5:'FRI',6:'SAT'};
            console.log(`   ${dayNames[d] || d}: ${dayCounts[d]}`);
        });
    } else {
        console.log("\n❌ No data was extracted.");
    }
}

main();
// === SECOND LEVEL PARSING (TOKEN CLASSIFICATION) ===
function parseCellStringTokens(rawText, semester) {
    if (!rawText || typeof rawText !== 'string') return [];
    
    // Normalize text
    const text = rawText.replace(/\r?\n/g, ' ').replace(/[?"?"]/g, '-').replace(/\s+/g, ' ').trim();
    
    const upperText = text.toUpperCase();
    if (/^(MON|TUE|WED|THU|FRI|SAT|SUN|LEGEND|BACKLOG|PROBABILITY AND|NOTE)/i.test(upperText)) return [];
    if (/^\d{1,2}-\d{1,2}(AM|PM)?$/i.test(text.replace(/\s/g, ''))) return [];

    let tokens = text.split(/[\s()/\-,]+/).filter(t => t.trim());
    
    // First pass: extract all matches
    let foundBatches = [];
    let foundTeachers = [];
    let foundRooms = [];
    let foundSubjects = [];

    const teacherCodes = Object.keys(dictionaries.teachers || {});
    const roomCodes = Object.keys(staticData.classroomLocations || {});
    const subjectsList = (semester == 1) ? Object.keys(dictionaries.subjectsSem1 || {}) : Object.keys(dictionaries.subjectsSem3 || {});

    // Attempt to identify each token
    tokens.forEach(token => {
        let t = token.toUpperCase();
        
        if (teacherCodes.includes(t) || /^NF\d{1,3}$/.test(t)) {
            foundTeachers.push(t);
        } else if (roomCodes.includes(t) || /^(CL|CR|TR|TS|G|F|FF|PL|BT|MCL|LAB)\d{1,3}$/.test(t)) {
            foundRooms.push(t);
        } else if (subjectsList.includes(t)) {
            foundSubjects.push(t);
        } else if (/^[A-Z]{1,2}\d{1,3}(-[A-Z]{0,2}\d{1,3})?$/.test(t) && !/^(CL|CR|TR|TS|G|F|FF|PL|BT|MCL)\d/.test(t)) {
            foundBatches.push(t);
        } else {
            let shortCodeMatch = t.match(/[A-Z]{2}\d{3,4}/);
            if (shortCodeMatch && subjectsList.includes(shortCodeMatch[0])) {
                foundSubjects.push(shortCodeMatch[0]);
            }
        }
    });

    if (foundBatches.length === 0 && foundSubjects.length === 0) return [];

    let subject = foundSubjects.length > 0 ? foundSubjects[0] : "UNKNOWN";
    let room = foundRooms.length > 0 ? foundRooms.join(',') : "TBA";
    let teacher = foundTeachers.length > 0 ? foundTeachers.join(',') : "TBA";
    
    let subjectDict = semester === 1 ? dictionaries.subjectsSem1 : dictionaries.subjectsSem3;
    let subjectTitle = subjectDict && subjectDict[subject] ? subjectDict[subject].toUpperCase() : "";

    let type = 'LEC';
    if (subject.includes('LAB') || subjectTitle.includes('LAB') || foundBatches.some(b => b.startsWith('P'))) type = 'LAB';
    else if (foundBatches.some(b => b.startsWith('T'))) type = 'TUT';

    let rawBatchesStr = foundBatches.join(',');
    let cleanBatches = rawBatchesStr.replace(/^[LTP](?=[A-Z])/ig, '').trim();
    
    const expandedBatches = expandBatches(cleanBatches);
    
    let results = [];
    expandedBatches.forEach(b => {
        let finalBatch = b.trim().toUpperCase();
        if (!/^[A-Z]\d{1,3}$/.test(finalBatch)) return;
        results.push({
            rawBatch: finalBatch,
            type: type,
            subject: subject,
            room: room,
            teacher: teacher
        });
    });

    return results;
}
