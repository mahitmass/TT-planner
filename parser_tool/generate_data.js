const fs = require('fs');
const dictionaries = require('./dictionaries'); 
const staticData = require('./static_data');    

let overrides = { deletions: [], additions: [] };
try { overrides = require('./manual_overrides'); } catch (err) {}

if (!fs.existsSync('parsed_output.json')) {
    console.warn('🚨 parsed_output.json not found. Outputting empty data.js');
    fs.writeFileSync('../js/data.js', 'const scheduleMap = {}; const facultyNames = {}; const ROOM_LOCATIONS = {};');
    process.exit(0);
}
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
    const dayIndex = entry.day;
    const batchName = entry.batch;
    const actualHour = entry.start;
    const semester = entry.semester || "3"; // Default to 3

    if (!finalBatches[semester]) finalBatches[semester] = {};

    // Overrides: Deletions
    if (overrides.deletions.some(del => del.batch === batchName && del.day === dayIndex && del.start === actualHour && (!del.semester || del.semester == semester))) return;

    // Create batch object if it doesn't exist
    if (!finalBatches[semester][batchName]) finalBatches[semester][batchName] = [];

    let finalSubject = getSubjectName(entry.subject);
    
    if (entry.subject === 'HS111' || finalSubject.includes('UHV')) {
        finalSubject = (entry.type === 'LAB' || entry.duration > 1) ? "Life Skills" : "UHV";
    } else if (entry.subject === 'GE112' || finalSubject.toLowerCase().includes('workshop')) {
        finalSubject = "Workshop";
    }
    
    // Strip "Lab" or "(Lab)" from the title (case insensitive) at the end of the string
    finalSubject = finalSubject.replace(/\s*\(?Lab\)?$/ig, '').trim();

    let finalDuration = entry.duration;
    const is128Batch = /^[FHE]/.test(batchName);
    if (entry.type === 'LAB' || entry.duration > 1) {
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

    finalBatches[semester][batchName].push({
        day: dayIndex, start: actualHour, duration: finalDuration,
        title: finalSubject, code: entry.room, teacher: finalTeacher, type: entry.type.toLowerCase() 
    });
});

// Overrides: Additions
if (overrides.additions && overrides.additions.length > 0) {
    overrides.additions.forEach(newClass => {
        const bName = newClass.batch;
        const sem = newClass.semester || "3";
        
        if (!finalBatches[sem]) finalBatches[sem] = {};
        if (!finalBatches[sem][bName]) finalBatches[sem][bName] = [];
        
        // Priority Overwrite: Remove any existing class at this day and start time
        finalBatches[sem][bName] = finalBatches[sem][bName].filter(c => !(c.day === newClass.day && c.start === newClass.start));
        
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

let scheduleMapString = "{\n";
const semesters = Object.keys(finalBatches).sort();
semesters.forEach((sem, k) => {
    scheduleMapString += `  "${sem}": {\n`;
    const sortedBatches = Object.keys(finalBatches[sem]).sort((a, b) => a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'}));
    sortedBatches.forEach((bName, i) => {
        scheduleMapString += `    "${bName}": [\n`;
        
        // Sort classes within the batch by day and then by start time to guarantee 100% deterministic order
        finalBatches[sem][bName].sort((a, b) => {
            if (a.day !== b.day) return a.day - b.day;
            return a.start - b.start;
        });

        finalBatches[sem][bName].forEach((cls, j) => {
            scheduleMapString += `      { "day": ${cls.day}, "start": ${cls.start}, "duration": ${cls.duration}, "title": "${cls.title}", "code": "${cls.code}", "teacher": "${cls.teacher}", "type": "${cls.type}" }${j < finalBatches[sem][bName].length - 1 ? ',' : ''}\n`;
        });
        scheduleMapString += `    ]${i < sortedBatches.length - 1 ? ',' : ''}\n`;
    });
    scheduleMapString += `  }${k < semesters.length - 1 ? ',' : ''}\n`;
});
scheduleMapString += "}";

let fileContent = `// AUTOMATICALLY GENERATED\nconst scheduleMap = ${scheduleMapString};\nconst facultyNames = ${JSON.stringify(dictionaries.teachers, null, 2)};\nconst ROOM_LOCATIONS = ${JSON.stringify(staticData.classroomLocations, null, 2)};\n`;
fs.writeFileSync('../js/data.js', fileContent);
