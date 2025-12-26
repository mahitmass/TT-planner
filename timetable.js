// --- 1. THE DATA ---

// BATCH A6 SCHEDULE (FIXED WEDNESDAY TIMES)
const scheduleA6 = [
  // MONDAY
  { day: 1, start: 10, duration: 2, title: "Physics Lab-2", code: "PL2", teacher: "Dr. Navendu / Dr. Indrani", type: "lab" },
  { day: 1, start: 14, duration: 1, title: "UHV", code: "G1", teacher: "Dr. Manoj Tripathi", type: "lec" },

  // TUESDAY
  { day: 2, start: 9, duration: 1, title: "Workshop", code: "TS16", teacher: "Dr. Gorav Patel", type: "tut" },
  { day: 2, start: 10, duration: 2, title: "Workshop Lab", code: "EW2", teacher: "Dr. Gorav Patel", type: "lab" },
  { day: 2, start: 13, duration: 1, title: "Mathematics-2", code: "G1", teacher: "Dr. Arpita Nayek", type: "lec" },
  { day: 2, start: 14, duration: 1, title: "Physics-2", code: "G1", teacher: "Dr. Sandeep Mishra", type: "lec" },
  { day: 2, start: 15, duration: 1, title: "SDF-2", code: "FF1", teacher: "Rohit Kumar Sony", type: "lec" },

  // WEDNESDAY (CORRECTED: Starts at 1PM)
  { day: 3, start: 9, duration: 1, title: "UHV", code: "F10", teacher: "Dr. Yogita Naruka", type: "tut" },
  { day: 3, start: 13, duration: 1, title: "Physics-2", code: "CS5", teacher: "Dr. Sandeep Mishra", type: "lec" }, // Moved to 1 PM
  { day: 3, start: 14, duration: 1, title: "Mathematics-2", code: "FF3", teacher: "Dr. Arpita Nayek", type: "lec" }, // Moved to 2 PM
  { day: 3, start: 15, duration: 2, title: "SDF Lab", code: "CL02", teacher: "Meenal / Prateek", type: "lab" },     // Moved to 3 PM

  // THURSDAY
  { day: 4, start: 10, duration: 1, title: "SDF-2", code: "G1", teacher: "Rohit Kumar Sony", type: "lec" },
  { day: 4, start: 11, duration: 1, title: "UHV", code: "G1", teacher: "Dr. Manoj Tripathi", type: "lec" },
  { day: 4, start: 13, duration: 2, title: "Life Skills Lab", code: "LL", teacher: "Prof. Mukta Mani", type: "lab" },

  // FRIDAY
  { day: 5, start: 11, duration: 1, title: "Physics-2", code: "FF4", teacher: "Dr. Sandeep Mishra", type: "lec" },
  { day: 5, start: 13, duration: 1, title: "Physics-2", code: "TS8", teacher: "Dr. B. C. Joshi", type: "tut" },
  { day: 5, start: 14, duration: 1, title: "Mathematics-2", code: "TS8", teacher: "Dr. Neha Singhal", type: "tut" },
  { day: 5, start: 15, duration: 1, title: "SDF-2", code: "TS6", teacher: "Shardha Porwal", type: "tut" },

  // SATURDAY
  { day: 6, start: 10, duration: 1, title: "SDF-2", code: "FF1", teacher: "Rohit Kumar Sony", type: "lec" },
  { day: 6, start: 11, duration: 1, title: "Mathematics-2", code: "FF1", teacher: "Dr. Arpita Nayek", type: "lec" },
];

// BATCH A5 SCHEDULE
const scheduleA5 = [
  // MONDAY
  { day: 1, start: 9, duration: 1, title: "SDF-2", code: "TS4", teacher: "Dr. Amanpreet Kaur", type: "tut" },
  { day: 1, start: 10, duration: 1, title: "Physics-2", code: "G1", teacher: "Dr. Anuraj Panwar", type: "lec" },
  { day: 1, start: 11, duration: 1, title: "Mathematics-2", code: "G1", teacher: "Dr. Nisha Shukla", type: "lec" },
  { day: 1, start: 13, duration: 2, title: "Physics Lab-2", code: "PL2", teacher: "Dr. Navendu / Dr. Indrani", type: "lab" },
  { day: 1, start: 15, duration: 2, title: "SDF Lab", code: "CL05", teacher: "Dr. Ankita Verma / Dr. Ankit", type: "lab" },

  // TUESDAY
  { day: 2, start: 9, duration: 1, title: "Physics-2", code: "TS6", teacher: "Dr. R.K. Gopal", type: "tut" },
  { day: 2, start: 10, duration: 1, title: "UHV", code: "G1", teacher: "Dr. Manoj Tripathi", type: "lec" },
  { day: 2, start: 11, duration: 1, title: "Workshop", code: "FF1", teacher: "Dr. Priya", type: "lec" },
  { day: 2, start: 13, duration: 1, title: "Mathematics-2", code: "G1", teacher: "Dr. Arpita Nayek", type: "lec" },
  { day: 2, start: 14, duration: 1, title: "Physics-2", code: "G1", teacher: "Dr. Anuraj Panwar", type: "lec" },
  { day: 2, start: 15, duration: 1, title: "SDF-2", code: "FF1", teacher: "Rohit Kumar Sony", type: "lec" },
  { day: 2, start: 16, duration: 1, title: "Mathematics-2", code: "TS4", teacher: "Dr. Nisha Shukla", type: "tut" },

  // WEDNESDAY
  { day: 3, start: 9, duration: 1, title: "Physics-2", code: "FF1", teacher: "Dr. Anuraj Panwar", type: "lec" },
  { day: 3, start: 10, duration: 1, title: "Mathematics-2", code: "FF1", teacher: "Dr. Nisha Shukla", type: "lec" },
  { day: 3, start: 11, duration: 1, title: "Workshop", code: "TS4", teacher: "Dr. Priya", type: "tut" },
  { day: 3, start: 13, duration: 2, title: "Workshop Lab", code: "EW1", teacher: "Mr. Shwetabh Singh", type: "lab" },
  { day: 3, start: 15, duration: 1, title: "SDF-2", code: "G1", teacher: "Rohit Kumar Sony", type: "lec" },
  { day: 3, start: 16, duration: 1, title: "UHV", code: "G1", teacher: "Dr. Manoj Tripathi", type: "lec" },

  // THURSDAY
  { day: 4, start: 9, duration: 1, title: "UHV", code: "TS4", teacher: "Dr. Manoj Tripathi", type: "tut" },
  { day: 4, start: 10, duration: 1, title: "SDF-2", code: "FF1", teacher: "Rohit Kumar Sony", type: "lec" },
  { day: 4, start: 11, duration: 1, title: "Mathematics-2", code: "FF1", teacher: "Dr. Nisha Shukla", type: "lec" },
  { day: 4, start: 13, duration: 2, title: "Life Skills Lab", code: "LL", teacher: "Prof. Mukta Mani", type: "lab" },
  { day: 4, start: 15, duration: 1, title: "Physics-2", code: "CS5", teacher: "Dr. Anuraj Panwar", type: "lec" },

  // FRIDAY
  { day: 5, start: 9, duration: 1, title: "Mathematics-2", code: "G1", teacher: "Dr. Nisha Shukla", type: "lec" },
  { day: 5, start: 10, duration: 1, title: "Physics-2", code: "G1", teacher: "Dr. Anuraj Panwar", type: "lec" },
  { day: 5, start: 11, duration: 1, title: "UHV", code: "G1", teacher: "Dr. Manoj Tripathi", type: "lec" },
  { day: 5, start: 13, duration: 1, title: "SDF-2", code: "FF1", teacher: "Rohit Kumar Sony", type: "lec" },

  // SATURDAY
  { day: 6, start: 10, duration: 1, title: "SDF-2", code: "FF1", teacher: "Rohit Kumar Sony", type: "lec" },
  { day: 6, start: 11, duration: 1, title: "Mathematics-2", code: "FF1", teacher: "Dr. Arpita Nayek", type: "lec" },
];

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentSchedule = scheduleA6; // Default

// --- GLOBAL UPDATE FUNCTION ---
window.updateBatchData = function(batch) {
    if (batch === 'A5') {
        currentSchedule = scheduleA5;
    } else {
        currentSchedule = scheduleA6;
    }
    // Use requestAnimationFrame to ensure the HTML Table exists before we try to fill it
    requestAnimationFrame(() => {
        renderMobileView();
        renderDesktopView();
    });
};

// --- RENDER MOBILE VIEW ---
function renderMobileView() {
  const track = document.getElementById('daysTrack');
  if(!track) return;
  track.innerHTML = ''; 

  for (let d = 1; d <= 6; d++) {
    const dayView = document.createElement('div');
    dayView.className = 'day-view';
    dayView.setAttribute('data-day-index', d);

    const h2 = document.createElement('h2');
    h2.className = 'day-header';
    h2.innerText = dayNames[d];
    dayView.appendChild(h2);

    const dayClasses = currentSchedule.filter(s => s.day === d).sort((a, b) => a.start - b.start);

    if (dayClasses.length === 0) {
      dayView.innerHTML += `<div class="break-card"><div class="break-header">No Classes Today! 🥳</div></div>`;
    } else {
        let lastEndTime = dayClasses[0].start; 
        dayClasses.forEach((cls) => {
            if (cls.start > lastEndTime) {
                let gapStart = lastEndTime;
                let gapEnd = cls.start;
                // Lunch Logic
                if (gapStart < 12) {
                    const end = Math.min(gapEnd, 12);
                    if (end > gapStart) createBreakCard(dayView, gapStart, end, "Break");
                }
                if (gapStart < 13 && gapEnd > 12) {
                    const start = Math.max(gapStart, 12);
                    const end = Math.min(gapEnd, 13);
                    createBreakCard(dayView, start, end, "Lunch Break");
                }
                if (gapEnd > 13) {
                    const start = Math.max(gapStart, 13);
                    if (gapEnd > start) createBreakCard(dayView, start, gapEnd, "Break");
                }
            }
            createClassCard(dayView, cls);
            lastEndTime = cls.start + cls.duration;
        });
    }
    const spacer = document.createElement('div');
    spacer.style.height = "100px"; 
    dayView.appendChild(spacer);
    track.appendChild(dayView);
  }
}

function createClassCard(container, cls) {
    const formatTime = (h) => {
        const ampm = h >= 12 ? 'PM' : 'AM';
        const hr = h % 12 || 12;
        return `${hr < 10 ? '0'+hr : hr}:00 ${ampm}`;
    };
    const timeString = `${formatTime(cls.start)} - ${formatTime(cls.start + cls.duration)}`;
    const typeText = cls.type === 'lec' ? 'Lecture' : cls.type === 'tut' ? 'Tutorial' : 'LAB';
    const card = document.createElement('div');
    card.className = `class-card type-${cls.type}`;
    card.setAttribute('data-day', cls.day);
    card.setAttribute('data-start-hour', cls.start);
    card.setAttribute('data-end-hour', cls.start + cls.duration);
    card.innerHTML = `
        <div class="time-slot">${timeString}</div>
        <div class="subject-name">${cls.title}</div>
        <div class="card-footer">
            <span class="info-badge">🏛 ${cls.code}</span>
            <span class="info-badge">👨‍🏫 ${cls.teacher}</span>
            <span class="info-badge">${typeText}</span>
        </div>`;
    container.appendChild(card);
}

function createBreakCard(container, start, end, title) {
    const duration = end - start;
    if (duration <= 0) return;
    const formatTime = (h) => { const hr = h % 12 || 12; return `${hr < 10 ? '0'+hr : hr}:00 ${h >= 12 ? 'PM' : 'AM'}`; };
    const breakDiv = document.createElement('div');
    breakDiv.className = 'break-card';
    breakDiv.innerHTML = `<div class="break-header">${title}</div><div class="break-time-text">${formatTime(start)} - ${formatTime(end)}</div><div class="break-duration-text">${duration} hr${duration > 1 ? 's' : ''} 0 min</div>`;
    container.appendChild(breakDiv);
}

// --- RENDER DESKTOP VIEW ---
function renderDesktopView() {
    const tbody = document.querySelector('.weekly-table tbody');
    if(!tbody) { console.error("Table body not found!"); return; } // ERROR CHECK
    tbody.innerHTML = ''; 

    const hours = [9, 10, 11, 12, 13, 14, 15, 16];
    hours.forEach(hour => {
        const tr = document.createElement('tr');
        const tdTime = document.createElement('td');
        const displayHour = hour % 12 || 12;
        tdTime.innerText = `${displayHour < 10 ? '0'+displayHour : displayHour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
        tr.appendChild(tdTime);

        if (hour === 12) {
            const tdLunch = document.createElement('td');
            tdLunch.colSpan = 6;
            tdLunch.className = 'cell-break';
            tdLunch.style.textAlign = 'center';
            tdLunch.style.letterSpacing = '2px';
            tdLunch.innerHTML = '<span class="cell-subject">LUNCH BREAK</span>';
            tr.appendChild(tdLunch);
            tbody.appendChild(tr);
            return;
        }

        for (let d = 1; d <= 6; d++) {
            const cls = currentSchedule.find(s => s.day === d && s.start === hour);
            if (cls) {
                const td = document.createElement('td');
                td.className = `cell-${cls.type}`;
                if (cls.duration > 1) td.rowSpan = cls.duration;
                let subjectShort = cls.title; 
                if(subjectShort.includes('Laboratory')) subjectShort = subjectShort.replace('Laboratory', 'Lab');
                td.innerHTML = `<span class="cell-subject">${subjectShort} (${cls.type === 'lec' ? 'L' : cls.type === 'tut' ? 'T' : 'Lab'})</span><span class="cell-room">${cls.code}</span>`;
                tr.appendChild(td);
            } else {
                const isOccupied = currentSchedule.some(s => s.day === d && s.start < hour && (s.start + s.duration) > hour);
                if (!isOccupied) {
                    const tdEmpty = document.createElement('td');
                    tdEmpty.className = 'cell-empty';
                    tr.appendChild(tdEmpty);
                }
            }
        }
        tbody.appendChild(tr);
    });
}
