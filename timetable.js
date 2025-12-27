// --- 1. THE DATA ---

// BATCH A6 SCHEDULE
const scheduleA6 = [
  // MONDAY
  { day: 1, start: 10, duration: 2, title: "Physics Lab-2", code: "PL2", teacher: "Dr. Navendu / Dr. Indrani", type: "lab" },
  { day: 1, start: 14, duration: 1, title: "UHV", code: "G1", teacher: "Dr. Manoj Tripathi", type: "lec" },

  // TUESDAY
  { day: 2, start: 9, duration: 1, title: "Workshop", code: "TS16", teacher: "Dr. Gorav Patel", type: "tut" },
  { day: 2, start: 10, duration: 2, title: "Workshop Lab", code: "EW2", teacher: "Dr. Gorav Patel", type: "lab" },
  { day: 2, start: 13, duration: 1, title: "Mathematics-2", code: "G1", teacher: "Dr. Arpita Nayek", type: "lec" },
  { day: 2, start: 14, duration: 1, title: "Physics-2", code: "G1", teacher: "Dr. Sandeep Mishra", type: "lec" },
  { day: 2, start: 15, duration: 1, title: "SDF-2", code: "FF1", teacher: "Rohit Kumar Soni", type: "lec" },

  // WEDNESDAY
  { day: 3, start: 9, duration: 1, title: "UHV", code: "F10", teacher: "Dr. Yogita Naruka", type: "tut" },
  { day: 3, start: 13, duration: 1, title: "Physics-2", code: "CS5", teacher: "Dr. Sandeep Mishra", type: "lec" },
  { day: 3, start: 14, duration: 1, title: "Mathematics-2", code: "FF3", teacher: "Dr. Arpita Nayek", type: "lec" },
  { day: 3, start: 15, duration: 2, title: "SDF Lab", code: "CL02", teacher: "Meenal / Prateek", type: "lab" },

  // THURSDAY
  { day: 4, start: 10, duration: 1, title: "SDF-2", code: "G1", teacher: "Rohit Kumar Soni", type: "lec" },
  { day: 4, start: 11, duration: 1, title: "UHV", code: "G1", teacher: "Dr. Manoj Tripathi", type: "lec" },
  { day: 4, start: 13, duration: 2, title: "Life Skills Lab", code: "LL", teacher: "Prof. Mukta Mani", type: "lab" },

  // FRIDAY
  { day: 5, start: 11, duration: 1, title: "Physics-2", code: "FF4", teacher: "Dr. Sandeep Mishra", type: "lec" },
  { day: 5, start: 13, duration: 1, title: "Physics-2", code: "TS8", teacher: "Dr.Bhubesh Chander Joshi", type: "tut" },
  { day: 5, start: 14, duration: 1, title: "Mathematics-2", code: "TS8", teacher: "Dr. Neha Singhal", type: "tut" },
  { day: 5, start: 15, duration: 1, title: "SDF-2", code: "TS6", teacher: "Shardha Porwal", type: "tut" },

  // SATURDAY
  { day: 6, start: 10, duration: 1, title: "SDF-2", code: "FF1", teacher: "Rohit Kumar Soni", type: "lec" },
  { day: 6, start: 11, duration: 1, title: "Mathematics-2", code: "FF1", teacher: "Dr. Arpita Nayek", type: "lec" },
];

// BATCH A5 SCHEDULE ( Lectures synced with A6, rooms/tuts updated)
const scheduleA5 = [
  // MONDAY
  { day: 1, start: 10, duration: 2, title: "Physics Lab-2", code: "PL1", teacher: "Dr. Navendu / Dr. Indrani", type: "lab" },
  { day: 1, start: 14, duration: 1, title: "UHV", code: "G1", teacher: "Dr. Manoj Tripathi", type: "lec" },

  // TUESDAY
  { day: 2, start: 9, duration: 1, title: "Workshop", code: "TS13", teacher: "Dr. Gorav Patel", type: "tut" },
  { day: 2, start: 10, duration: 2, title: "Workshop Lab", code: "EW1", teacher: "Mr. Shwetabh Singh", type: "lab" },
  { day: 2, start: 13, duration: 1, title: "Mathematics-2", code: "G1", teacher: "Dr. Arpita Nayek", type: "lec" },
  { day: 2, start: 14, duration: 1, title: "Physics-2", code: "G1", teacher: "Dr. Sandeep Mishra", type: "lec" },
  { day: 2, start: 15, duration: 1, title: "SDF-2", code: "FF1", teacher: "Rohit Kumar Soni", type: "lec" },

  // WEDNESDAY
  { day: 3, start: 9, duration: 1, title: "UHV", code: "TS6", teacher: "Dr. Yogita Naruka", type: "tut" },
  { day: 3, start: 13, duration: 1, title: "Physics-2", code: "CS5", teacher: "Dr. Sandeep Mishra", type: "lec" },
  { day: 3, start: 14, duration: 1, title: "Mathematics-2", code: "FF3", teacher: "Dr. Arpita Nayek", type: "lec" },
  { day: 3, start: 15, duration: 2, title: "SDF Lab", code: "CL01", teacher: "Meenal / Prateek", type: "lab" },

  // THURSDAY
  { day: 4, start: 10, duration: 1, title: "SDF-2", code: "G1", teacher: "Rohit Kumar Soni", type: "lec" },
  { day: 4, start: 11, duration: 1, title: "UHV", code: "G1", teacher: "Dr. Manoj Tripathi", type: "lec" },
  { day: 4, start: 13, duration: 2, title: "Life Skills Lab", code: "LL1", teacher: "Prof. Mukta Mani", type: "lab" },

  // FRIDAY (Updated Tut Times)
  { day: 5, start: 9, duration: 1, title: "SDF-2", code: "TS8", teacher: "Shardha Porwal", type: "tut" },
  { day: 5, start: 11, duration: 1, title: "Physics-2", code: "FF4", teacher: "Dr. Sandeep Mishra", type: "lec" },
  { day: 5, start: 13, duration: 1, title: "Mathematics-2", code: "TS7", teacher: "Dr. Neha Singhal", type: "tut" },
  { day: 5, start: 14, duration: 1, title: "Physics-2", code: "TS7", teacher: "Dr.Bhubesh Chander Joshi", type: "tut" },

  // SATURDAY
  { day: 6, start: 10, duration: 1, title: "SDF-2", code: "FF1", teacher: "Rohit Kumar Soni", type: "lec" },
  { day: 6, start: 11, duration: 1, title: "Mathematics-2", code: "FF1", teacher: "Dr. Arpita Nayek", type: "lec" },
];

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentSchedule = scheduleA6; 

// --- 2. THE RENDER LOGIC ---

window.updateBatchData = function(batch) {
    currentSchedule = (batch === 'A5') ? scheduleA5 : scheduleA6;
    requestAnimationFrame(() => {
        renderMobileView();
        renderDesktopView();
    });
};

function renderMobileView() {
  const track = document.getElementById('daysTrack');
  if(!track) return;
  track.innerHTML = ''; 

  for (let d = 1; d <= 6; d++) {
    const dayView = document.createElement('div');
    dayView.className = 'day-view';
    dayView.setAttribute('data-day-index', d);

    const dayClasses = currentSchedule.filter(s => s.day === d).sort((a, b) => a.start - b.start);

    if (dayClasses.length === 0) {
      dayView.innerHTML += `<div class="break-card"><div class="break-header">No Classes Today! 🥳</div></div>`;
    } else {
        // Start from first class to avoid break cards before class starts
        let lastEndTime = dayClasses[0].start; 
        
        dayClasses.forEach((cls, index) => {
            // Only add breaks/lunch between classes
            if (index > 0 && cls.start > lastEndTime) {
                let gapStart = lastEndTime;
                let gapEnd = cls.start;
                
                if (gapStart <= 12 && gapEnd >= 13) {
                    if (12 > gapStart) createBreakCard(dayView, gapStart, 12, "Break");
                    createBreakCard(dayView, 12, 13, "Lunch Break");
                    if (gapEnd > 13) createBreakCard(dayView, 13, gapEnd, "Break");
                } else {
                    createBreakCard(dayView, gapStart, gapEnd, "Break");
                }
            }
            createClassCard(dayView, cls);
            lastEndTime = cls.start + cls.duration;
        });
    }
    track.appendChild(dayView);
  }
}

function createClassCard(container, cls) {
    const formatTime = (h) => {
        const ampm = h >= 12 ? 'PM' : 'AM';
        const hr = h % 12 || 12;
        const startStr = `${hr < 10 ? '0'+hr : hr}:00`;
        const endHr = (h + cls.duration - 1) % 12 || 12;
        const endStr = `${endHr < 10 ? '0'+endHr : endHr}:50`;
        return `${startStr} - ${endStr} ${ampm}`;
    };
    const card = document.createElement('div');
    card.className = `class-card type-${cls.type}`;
    card.innerHTML = `
        <div class="time-slot">${formatTime(cls.start)}</div>
        <div class="subject-name">${cls.title}</div>
        <div class="card-footer">
            <span class="info-badge">🏛 ${cls.code}</span>
            <span class="info-badge">👨‍🏫 ${cls.teacher}</span>
            <span class="info-badge">${cls.type.toUpperCase()}</span>
        </div>`;
    container.appendChild(card);
}

function createBreakCard(container, start, end, title) {
    const duration = end - start;
    const formatTime = (h) => { const hr = h % 12 || 12; return `${hr < 10 ? '0'+hr : hr}:00 ${h >= 12 ? 'PM' : 'AM'}`; };
    const breakDiv = document.createElement('div');
    breakDiv.className = 'break-card';
    breakDiv.innerHTML = `<div class="break-header">${title}</div><div class="break-time-text">${formatTime(start)} - ${formatTime(end)}</div>`;
    container.appendChild(breakDiv);
}

function renderDesktopView() {
    const tbody = document.querySelector('.weekly-table tbody');
    if(!tbody) return;
    tbody.innerHTML = ''; 

    const hours = [9, 10, 11, 12, 13, 14, 15, 16];
    hours.forEach(hour => {
        const tr = document.createElement('tr');
        const tdTime = document.createElement('td');
        const displayHour = hour % 12 || 12;
        tdTime.innerText = `${displayHour < 10 ? '0'+displayHour : displayHour}:00 - ${displayHour < 10 ? '0'+displayHour : displayHour}:50 ${hour >= 12 ? 'PM' : 'AM'}`;
        tr.appendChild(tdTime);

        if (hour === 12) {
            const tdLunch = document.createElement('td');
            tdLunch.colSpan = 6;
            tdLunch.className = 'cell-break';
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
                td.innerHTML = `<span class="cell-subject">${cls.title}</span><span class="cell-room">${cls.code}</span>`;
                tr.appendChild(td);
            } else {
                const isOccupied = currentSchedule.some(s => s.day === d && s.start < hour && (s.start + s.duration) > hour);
                if (!isOccupied) tr.appendChild(document.createElement('td'));
            }
        }
        tbody.appendChild(tr);
    });
}
