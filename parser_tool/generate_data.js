const fs = require('fs');
const dictionaries = require('./dictionaries'); 
const staticData = require('./static_data');    

let overrides = { deletions: [], additions: [] };
try { overrides = require('./manual_overrides'); } catch (err) {}

const rawData = JSON.parse(fs.readFileSync('parsed_output.json', 'utf8'));

// Smart Subject Lookup: Handles both "24B11CS312" and "CS312" automatically!
function getSubjectName(code) {
    let cleanCode = code.replace(/\(.*\)/, '').trim();
    // Try exact match first (e.g., 24B11CS312)
    if (dictionaries.subjects[cleanCode]) return dictionaries.subjects[cleanCode];
    
    // Try short-code match (e.g., extracts CS312 from 24B11CS312)
    let shortCodeMatch = cleanCode.match(/[A-Z]{2}\d{3,4}/);
    if (shortCodeMatch && dictionaries.subjects[shortCodeMatch[0]]) {
        return dictionaries.subjects[shortCodeMatch[0]];
    }
    return dictionaries.subjects[code] || code;
}

// Master object: { "2": { "A1": [...] }, "4": { "A1": [...] } }
const finalBatches = {};

rawData.forEach(entry => {
    const dayMap = { "MON": 1, "TUE": 2, "WED": 3, "THU": 4, "FRI": 5, "SAT": 6, "SUN": 0 };
    const dayIndex = dayMap[entry.day];
    const batchName = entry.batch;
    const actualHour = entry.start + 8; 
    const sem = entry.semester || "2";

    // Overrides: Deletions
    if (overrides.deletions.some(del => del.batch === batchName && del.day === dayIndex && del.start === actualHour)) return;

    // Create sem and batch objects if they don't exist
    if (!finalBatches[sem]) finalBatches[sem] = {};
    if (!finalBatches[sem][batchName]) finalBatches[sem][batchName] = [];

    let finalSubject = getSubjectName(entry.subject);
    
    if (entry.subject === 'HS111' || finalSubject.includes('UHV')) {
        finalSubject = (entry.type === 'LAB' || entry.duration > 1) ? "Life Skills Lab" : "UHV";
    } else if (entry.subject === 'GE112' || finalSubject.toLowerCase().includes('workshop')) {
        finalSubject = (entry.type === 'LAB' || entry.duration > 1) ? "Workshop Lab" : "Workshop";
    } else if (entry.type === 'LAB' && !finalSubject.toLowerCase().includes('lab')) {
        finalSubject += " (Lab)";
    }

    let finalDuration = entry.duration;
    const is128Batch = /^[FHE]/.test(batchName);
    if (entry.type === 'LAB' || finalSubject.toLowerCase().includes('lab')) {
        finalDuration = 2;
        if (is128Batch && finalSubject.includes('Workshop')) finalDuration = 3;
    }

    // Smart 128 Teacher Codes
    let finalTeacher = entry.teacher;
    if (is128Batch) {
        let teacherArray = finalTeacher.split('/');
        finalTeacher = teacherArray.map(t => {
            let tClean = t.trim();
            if (dictionaries.teachers[tClean + '1']) return tClean + '1';
            return tClean;
        }).join('/');
    }

    finalBatches[sem][batchName].push({
        day: dayIndex, start: actualHour, duration: finalDuration,
        title: finalSubject, code: entry.room, teacher: finalTeacher, type: entry.type.toLowerCase() 
    });
});

// Overrides: Additions
if (overrides.additions && overrides.additions.length > 0) {
    overrides.additions.forEach(newClass => {
        const bName = newClass.batch;
        const sem = newClass.semester || "2"; // Default to sem 2 if not specified in override
        
        if (!finalBatches[sem]) finalBatches[sem] = {};
        if (!finalBatches[sem][bName]) finalBatches[sem][bName] = [];
        
        finalBatches[sem][bName].push({
            day: newClass.day, start: newClass.start, duration: newClass.duration,
            title: newClass.title, code: newClass.code, teacher: newClass.teacher, type: newClass.type
        });
    });
}

// Kill Switch
let totalParsedBatches = 0;
Object.values(finalBatches).forEach(semObj => totalParsedBatches += Object.keys(semObj).length);

if (totalParsedBatches < 5) {
    console.error(`🚨 FATAL ERROR: Only ${totalParsedBatches} total batches parsed!`);
    process.exit(1);
}

let fileContent = `// AUTOMATICALLY GENERATED\nconst scheduleMap = ${JSON.stringify(finalBatches, null, 2)};\nconst facultyNames = ${JSON.stringify(dictionaries.teachers, null, 2)};\nconst ROOM_LOCATIONS = ${JSON.stringify(staticData.classroomLocations, null, 2)};\n`;
fs.writeFileSync('../js/data.js', fileContent);
