const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const CONFIG = { sheetIndex: 0 };

// === THE FIX: BULLETPROOF SECTOR 62 & 128 TIMINGS ===
const TIME_SLOT_MAP = {
    // Sector 62 & 128 Standard Starts
    "9-": 1,  "09-": 1, "9:00-": 1, "09:00-": 1, "9:00AM-": 1,
    "10-": 2, "10:00-": 2, "10:00AM-": 2, "09:55-": 2, "9:55-": 2, "09:50-": 2, "9:50-": 2,
    "11-": 3, "11:00-": 3, "11:00AM-": 3, "10:50-": 3, "10:40-": 3,
    "12-": 4, "12:00-": 4, "12:00PM-": 4, "11:45-": 4, "11:30-": 4,
    "1-": 5,  "01-": 5, "1:00-": 5, "1:00PM-": 5, "13:00-": 5, "12:40-": 5, "12:20-": 5,
    "2-": 6,  "02-": 6, "2:00-": 6, "2:00PM-": 6, "14:00-": 6, "01:35-": 6, "1:35-": 6, "13:35-": 6, "01:10-": 6, "1:10-": 6,
    "3-": 7,  "03-": 7, "3:00-": 7, "3:00PM-": 7, "15:00-": 7, "02:30-": 7, "2:30-": 7, "14:30-": 7,
    "4-": 8,  "04-": 8, "4:00-": 8, "4:00PM-": 8, "16:00-": 8, "03:25-": 8, "3:25-": 8, "15:25-": 8, "02:50-": 8, "2:50-": 8,
    "5-": 9,  "05-": 9, "5:00-": 9, "5:00PM-": 9, "17:00-": 9, "04:20-": 9, "4:20-": 9, "16:20-": 9, "03:40-": 9, "3:40-": 9
};

const DAY_MAP = {
    "MON": "MON",   "MONDAY": "MON",
    "TUE": "TUE",   "TUES": "TUE",   "TUESDAY": "TUE",
    "WED": "WED",   "WEDNESDAY": "WED",
    "THU": "THU",   "THUR": "THU",   "THURSDAY": "THU",
    "FRI": "FRI",   "FRIDAY": "FRI",
    "SAT": "SAT",   "SATURDAY": "SAT"
};

function cleanHeader(str) {
    if (!str) return "";
    return str.toString()
        .toUpperCase()
        .replace(/\s+/g, '')       
        .replace(/[–—]/g, '-')     
        .replace(/TO/g, '-')       
        .replace(/\./g, ':');
}

// === THE FIX: SPLIT GLUED BATCHES (e.g. F9F10 -> F9, F10) ===
function expandBatches(batchString) {
    // Inserts a comma between a number and a letter
    let spaced = batchString.replace(/(\d)([A-Za-z])/g, '$1,$2');
    
    const parts = spaced.split(/[,+]/).map(s => s.trim()).filter(s => s);
    const expanded = [];

    parts.forEach(part => {
        if (part.includes('-')) {
            const [start, end] = part.split('-').map(s => s.trim());
            const matchStart = start.match(/^([A-Za-z]+)(\d+)$/i);
            const matchEnd = end.match(/^([A-Za-z]*)(\d+)$/i);
            
            if (matchStart && matchEnd) {
                const prefix = matchStart[1];
                const endPrefix = matchEnd[1] || prefix;
                
                if (prefix.toUpperCase() === endPrefix.toUpperCase()) {
                    const startNum = parseInt(matchStart[2], 10);
                    const endNum = parseInt(matchEnd[2], 10);
                    
                    if (startNum <= endNum) {
                        for (let i = startNum; i <= endNum; i++) expanded.push(`${prefix}${i}`);
                    } else expanded.push(part);
                } else expanded.push(part);
            } else expanded.push(part);
        } else {
            expanded.push(part);
        }
    });
    return expanded;
}

// === THE FIX: MULTI-CLASS CELLS & TEACHER COMMAS ===
function parseCellString(rawText) {
    if (!rawText || typeof rawText !== 'string') return [];
    
    // Convert newlines to spaces so we can process multi-class cells mathematically
    const text = rawText.replace(/\r?\n/g, ' ').replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim();
    
    // Lookahead Regex: Splits string safely when two classes share the same cell
    const entries = text.match(/[A-Z0-9,+-]+\s*\(\s*[^)]+\s*\)[^(]*(?=\s*[A-Z0-9,+-]+\s*\(\s*[^)]+\s*\)|$)/gi);
    
    if (!entries) return [];

    const results = [];

    entries.forEach(entry => {
        // THE MAGIC REGEX
        const match = entry.match(/^([^()]+)\s*\(\s*([^)]+)\s*\)\s*-?\s*(.+?)\s*[\/;,]+\s*(.+)$/i);     
        
        if (!match) return;

        let batchPart = match[1].trim();
        let subjectPart = match[2].trim();
        let roomPart = match[3].trim();
        
        // Convert Teacher commas to clean slashes
        let teacherPart = match[4].trim().replace(/\s*[,;]\s*/g, '/').replace(/\s*\/\s*/g, '/');
        
        let type = 'LEC';
        let cleanBatches = batchPart.toUpperCase();
        
        if (cleanBatches.startsWith('T')) type = 'TUT';
        else if (cleanBatches.startsWith('P')) type = 'LAB';
        else if (cleanBatches.startsWith('L')) type = 'LEC';
        else if (subjectPart.toUpperCase().includes('LAB')) type = 'LAB';

        // Strip the L, T, P prefix BEFORE expanding
        cleanBatches = cleanBatches.replace(/^[LTP](?=[A-Z])/i, '').trim();

        const rawBatchesList = expandBatches(cleanBatches);
        
        rawBatchesList.forEach(b => {
            let finalBatch = b.trim();
            if (finalBatch.length > 0 && finalBatch.length <= 5) {
                results.push({
                    rawBatch: finalBatch,
                    type: type,
                    subject: subjectPart,
                    room: roomPart,
                    teacher: teacherPart
                });
            }
        });
    });

    return results;
}

const isInsideMerge = (r, c, merges) => {
    return merges.find(m => r >= m.s.r && r <= m.e.r && c >= m.s.c && c <= m.e.c);
};

function parseSingleFile(filePath) {
    console.log(`📂 Reading: ${filePath}...`);
    
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[CONFIG.sheetIndex];
    const sheet = workbook.Sheets[sheetName];

    const range = XLSX.utils.decode_range(sheet['!ref']);
    const merges = sheet['!merges'] || [];

    let timeRowIndex = -1;
    let colToStartHour = {};

    for (let R = 0; R <= 10; ++R) {
        let matchesInRow = 0;
        let tempMap = {};
        for (let C = 0; C <= range.e.c; ++C) {
            const cell = sheet[XLSX.utils.encode_cell({ r: R, c: C })];
            if (cell && cell.v) {
                const cleaned = cleanHeader(cell.v.toString());
                let foundTime = Object.values(TIME_SLOT_MAP).find((_, idx) => cleaned.includes(Object.keys(TIME_SLOT_MAP)[idx]));
                if (foundTime) { matchesInRow++; tempMap[C] = foundTime; }
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

    let dataStartRowIndex = -1;
    for (let R = timeRowIndex + 1; R <= range.e.r; ++R) {
        const cell = sheet[XLSX.utils.encode_cell({ r: R, c: 0 })];
        if (cell && cell.v) {
            const val = cleanHeader(cell.v);
            if (DAY_MAP[val] || Object.keys(DAY_MAP).some(k => val.includes(k))) {
                dataStartRowIndex = R;
                break;
            }
        }
    }

    if (dataStartRowIndex === -1) return [];

    const results = [];
    let currentDayStr = null;

    for (let R = dataStartRowIndex; R <= range.e.r; ++R) {
        const dayCell = sheet[XLSX.utils.encode_cell({ r: R, c: 0 })];
        let dayVal = dayCell ? dayCell.v.toString().toUpperCase().trim() : "";
        
        if (dayVal.length > 0) {
            let cleanDay = cleanHeader(dayVal);
            for (const [key, val] of Object.entries(DAY_MAP)) {
                if (cleanDay.includes(key)) { currentDayStr = val; break; }
            }
            if (dayVal.includes("LEGEND")) break;
        }

        if (!currentDayStr) continue; 

        for (let C = 0; C <= range.e.c; ++C) {
            const startHour = colToStartHour[C];
            if (!startHour) continue;

            const mergeObj = isInsideMerge(R, C, merges);
            if (mergeObj && (mergeObj.s.r !== R || mergeObj.s.c !== C)) continue; 

            const cell = sheet[XLSX.utils.encode_cell({ r: R, c: C })];
            if (cell && cell.v) {
                let duration = mergeObj ? (mergeObj.e.c - mergeObj.s.c) + 1 : 1;
                
                const parsedDataList = parseCellString(cell.v.toString());
                parsedDataList.forEach(parsedData => {
                    results.push({
                        day: currentDayStr,
                        start: startHour,
                        duration: duration,
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

// ... (Keep TIME_SLOT_MAP, Regex, and parseSingleFile exactly the same) ...

// === THE NEW MULTI-SEM SCANNER & DEDUPLICATOR ===
function main() {
    const rawDataDir = path.join(__dirname, '../raw_data');
    let filesToParse = [];

    // Recursively dig through folders to find all Excels/CSVs
    function findFiles(dir) {
        if (!fs.existsSync(dir)) return;
        const items = fs.readdirSync(dir);
        items.forEach(item => {
            const fullPath = path.join(dir, item);
            if (fs.statSync(fullPath).isDirectory()) {
                findFiles(fullPath); // Dig deeper (e.g. into the "2" or "4" folder)
            } else {
                const lowerItem = item.toLowerCase();
                if (lowerItem === '62.xlsx' || lowerItem === '128.xlsx') {
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
        // Magically extract the Semester number from the folder name!
        // E.g., raw_data/62/4/file.csv -> grabs the "4"
        const pathParts = filePath.split(path.sep);
        const semFolder = pathParts[pathParts.length - 2]; 
        let currentSem = isNaN(semFolder) ? "2" : semFolder; 

        try {
            const fileData = parseSingleFile(filePath);
            if (fileData && fileData.length > 0) {
                // Attach the semester tag to every parsed class
                fileData.forEach(entry => entry.semester = currentSem);
                combinedSchedule = combinedSchedule.concat(fileData);
                console.log(`   ✅ Extracted ${fileData.length} entries from Sem ${currentSem} (${path.basename(filePath)})`);
            }
        } catch (err) {
            console.error(`   ❌ ERROR parsing file ${filePath}:`, err.message);
        }
    });

    // --- THE DEDUPLICATOR (Now respects semesters) ---
    const uniqueClasses = new Map();
    combinedSchedule.forEach(entry => {
        const uniqueKey = `${entry.semester}-${entry.batch}-${entry.day}-${entry.start}`;
        if (!uniqueClasses.has(uniqueKey)) {
            uniqueClasses.set(uniqueKey, entry);
        }
    });

    const finalCleanSchedule = Array.from(uniqueClasses.values());

    if (finalCleanSchedule.length > 0) {
        fs.writeFileSync(path.join(__dirname, 'parsed_output.json'), JSON.stringify(finalCleanSchedule, null, 2));
        console.log(`\n🎉 Success! Final master count: ${finalCleanSchedule.length}`);
    } else {
        console.log("\n❌ No data was extracted.");
    }
}

main();
