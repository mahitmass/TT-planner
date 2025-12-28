// --- 1. THE DATA ---

// BATCH A6 SCHEDULE
const scheduleA6 = [
  { day: 1, start: 10, duration: 2, title: "Physics Lab-2", code: "PL2", teacher: "Dr. Navendu / Dr. Indrani", type: "lab" },
  { day: 1, start: 14, duration: 1, title: "UHV", code: "G1", teacher: "Dr. Manoj Tripathi", type: "lec" },
  { day: 2, start: 9, duration: 1, title: "Workshop", code: "TS16", teacher: "Dr. Gorav Patel", type: "tut" },
  { day: 2, start: 10, duration: 2, title: "Workshop Lab", code: "EW2", teacher: "Dr. Gorav Patel", type: "lab" },
  { day: 2, start: 13, duration: 1, title: "Mathematics-2", code: "G1", teacher: "Dr. Arpita Nayek", type: "lec" },
  { day: 2, start: 14, duration: 1, title: "Physics-2", code: "G1", teacher: "Dr. Sandeep Mishra", type: "lec" },
  { day: 2, start: 15, duration: 1, title: "SDF-2", code: "FF1", teacher: "Rohit Kumar Soni", type: "lec" },
  { day: 3, start: 9, duration: 1, title: "UHV", code: "F10", teacher: "Dr. Yogita Naruka", type: "tut" },
  { day: 3, start: 13, duration: 1, title: "Physics-2", code: "CS5", teacher: "Dr. Sandeep Mishra", type: "lec" },
  { day: 3, start: 14, duration: 1, title: "Mathematics-2", code: "FF3", teacher: "Dr. Arpita Nayek", type: "lec" },
  { day: 3, start: 15, duration: 2, title: "SDF Lab", code: "CL02", teacher: "Meenal / Prateek", type: "lab" },
  { day: 4, start: 10, duration: 1, title: "SDF-2", code: "G1", teacher: "Rohit Kumar Soni", type: "lec" },
  { day: 4, start: 11, duration: 1, title: "UHV", code: "G1", teacher: "Dr. Manoj Tripathi", type: "lec" },
  { day: 4, start: 13, duration: 2, title: "Life Skills Lab", code: "LL", teacher: "Prof. Mukta Mani", type: "lab" },
  { day: 5, start: 11, duration: 1, title: "Physics-2", code: "FF4", teacher: "Dr. Sandeep Mishra", type: "lec" },
  { day: 5, start: 13, duration: 1, title: "Physics-2", code: "TS8", teacher: "Dr.Bhubesh Chander Joshi", type: "tut" },
  { day: 5, start: 14, duration: 1, title: "Mathematics-2", code: "TS8", teacher: "Dr. Neha Singhal", type: "tut" },
  { day: 5, start: 15, duration: 1, title: "SDF-2", code: "TS6", teacher: "Shardha Porwal", type: "tut" },
  { day: 6, start: 10, duration: 1, title: "SDF-2", code: "FF1", teacher: "Rohit Kumar Soni", type: "lec" },
  { day: 6, start: 11, duration: 1, title: "Mathematics-2", code: "FF1", teacher: "Dr. Arpita Nayek", type: "lec" },
];

// BATCH A5 SCHEDULE
const scheduleA5 = [
  { day: 1, start: 10, duration: 2, title: "Physics Lab-2", code: "PL1", teacher: "Dr.Manoj Kumar / Dr.Manoj Tripathi", type: "lab" },
  { day: 1, start: 14, duration: 1, title: "UHV", code: "G1", teacher: "Dr. Manoj Tripathi", type: "lec" },
  { day: 2, start: 9, duration: 1, title: "Workshop", code: "TS13", teacher: "Mr. Shwetabh Singh", type: "tut" },
  { day: 2, start: 10, duration: 2, title: "Workshop Lab", code: "EW1", teacher: "Mr. Shwetabh Singh", type: "lab" },
  { day: 2, start: 13, duration: 1, title: "Mathematics-2", code: "G1", teacher: "Dr. Arpita Nayek", type: "lec" },
  { day: 2, start: 14, duration: 1, title: "Physics-2", code: "G1", teacher: "Dr. Sandeep Mishra", type: "lec" },
  { day: 2, start: 15, duration: 1, title: "SDF-2", code: "FF1", teacher: "Rohit Kumar Soni", type: "lec" },
  { day: 3, start: 9, duration: 1, title: "UHV", code: "TS6", teacher: "Dr. Priya", type: "tut" },
  { day: 3, start: 13, duration: 1, title: "Physics-2", code: "CS5", teacher: "Dr. Sandeep Mishra", type: "lec" },
  { day: 3, start: 14, duration: 1, title: "Mathematics-2", code: "FF3", teacher: "Dr. Arpita Nayek", type: "lec" },
  { day: 3, start: 15, duration: 2, title: "SDF Lab", code: "CL01", teacher: "Dr. Tanvee Gautam / Mr. Imran Rashid", type: "lab" },
  { day: 4, start: 10, duration: 1, title: "SDF-2", code: "G1", teacher: "Rohit Kumar Soni", type: "lec" },
  { day: 4, start: 11, duration: 1, title: "UHV", code: "G1", teacher: "Dr. Manoj Tripathi", type: "lec" },
  { day: 4, start: 13, duration: 2, title: "Life Skills Lab", code: "LL1", teacher: "Dr. Kanupriya Misra", type: "lab" },
  { day: 5, start: 9, duration: 1, title: "SDF-2", code: "TS8", teacher: "Dr. Amanpreet Kaur", type: "tut" },
  { day: 5, start: 11, duration: 1, title: "Physics-2", code: "FF4", teacher: "Dr. Sandeep Mishra", type: "lec" },
  { day: 5, start: 13, duration: 1, title: "Mathematics-2", code: "TS7", teacher: "Dr. Neha Singhal", type: "tut" },
  { day: 5, start: 14, duration: 1, title: "Physics-2", code: "TS7", teacher: "Dr. Ravi Gupta", type: "tut" },
  { day: 6, start: 10, duration: 1, title: "SDF-2", code: "FF1", teacher: "Rohit Kumar Soni", type: "lec" },
  { day: 6, start: 11, duration: 1, title: "Mathematics-2", code: "FF1", teacher: "Dr. Arpita Nayek", type: "lec" },
];

// BATCH B12 SCHEDULE
const scheduleB12 = [
  { day: 1, start: 10, duration: 1, title: "UHV", code: "TS10", teacher: "Dr.ILA Joshi", type: "tut" },
  { day: 1, start: 11, duration: 1, title: "Physics-2", code: "TS10", teacher: "Rakesh Kumar Dwivedi", type: "tut" },
  { day: 1, start: 13, duration: 1, title: "Mathematics-2", code: "TS6", teacher: "Dr.Himani Pant", type: "tut" },
  { day: 1, start: 15, duration: 1, title: "SDF-2", code: "G1", teacher: "Dr.Asish Mishra", type: "lec" },
  { day: 2, start: 9, duration: 1, title: "SDF-2", code: "TS6", teacher: "Dr.Kavita Pandey", type: "tut" },
  { day: 2, start: 13, duration: 1, title: "Mathematics-2", code: "FF3", teacher: "Dr.Himani Pant", type: "lec" },
  { day: 2, start: 14, duration: 1, title: "SDF-2", code: "FF3", teacher: "Dr.Asish Mishra", type: "lec" },
  { day: 2, start: 15, duration: 1, title: "Physics-2", code: "FF2", teacher: "Dr.Navendu Goswami", type: "lec" },
  { day: 3, start: 10, duration: 2, title: "Physics Lab-2", code: "PL2", teacher: "Narinder Kaur/Anuraj Panwar", type: "lab" },
  { day: 3, start: 13, duration: 1, title: "Physics-2", code: "G1", teacher: "Dr.Navendu Goswami", type: "lec" },
  { day: 3, start: 14, duration: 1, title: "Mathematics-2", code: "CS5", teacher: "Dr.Himani Pant", type: "lec" },
  { day: 4, start: 10, duration: 1, title: "SDF-2", code: "CS5", teacher: "Dr.Asish Mishra", type: "lec" },
  { day: 4, start: 13, duration: 2, title: "SDF Lab", code: "CL07", teacher: "Ms.Anupama Padha/Dr.Anita Sahoo", type: "lab" },
  { day: 4, start: 15, duration: 2, title: "Life Skills Lab", code: "LL1", teacher: "Mohua Dutta", type: "lab" },
  { day: 5, start: 10, duration: 1, title: "UHV", code: "FF3", teacher: "Dr.Amanpreet Kaur", type: "lec" },
  { day: 5, start: 11, duration: 1, title: "Physics-2", code: "FF3", teacher: "Dr.Navendu Goswami", type: "lec" },
  { day: 5, start: 13, duration: 1, title: "Workshop", code: "TS11", teacher: "Ms.Madhu Jharia", type: "tut" },
  { day: 5, start: 15, duration: 2, title: "Workshop Lab", code: "EW2", teacher: "Ms.Madhu Jharia", type: "lab" },
  { day: 6, start: 9, duration: 1, title: "UHV", code: "G1", teacher: "Dr.Amanpreet Kaur", type: "lec" },
  { day: 6, start: 11, duration: 1, title: "Mathematics-2", code: "LL1", teacher: "Dr.Himani Pant", type: "lec" },
];

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentSchedule = scheduleA6;

// --- 2. THE RENDER LOGIC ---

window.updateBatchData = function(batch) {
    if (batch === 'A5') {
        currentSchedule = scheduleA5;
    } else if (batch === 'B12') {
        currentSchedule = scheduleB12;
    } else {
        currentSchedule = scheduleA6;
    }

    requestAnimationFrame(() => {
        renderMobileView();
        renderDesktopView();
    });
};

// FIXED: Better time checking function
function isClassActive(cls) {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Convert your day format (1=Monday) to match Date.getDay() (1=Monday)
    if (cls.day !== currentDay) return false;
    
    // Calculate class end hour (classes end 10 minutes before the hour)
    const classEndHour = cls.start + cls.duration - 1;
    const classEndMinute = 50; // Classes end at :50
    
    // For start hour comparison
    if (currentHour < cls.start) return false;
    
    // For end hour comparison
    if (currentHour > classEndHour) return false;
    
    // If current hour is exactly the end hour, check minutes
    if (currentHour === classEndHour && currentMinute > classEndMinute) {
        return false;
    }
    
    return true;
}

function renderMobileView() {
    const track = document.getElementById('daysTrack');
    if (!track) return;
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

            dayClasses.forEach((cls, index) => {
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
        const startStr = `${hr < 10 ? '0' + hr : hr}:00`;
        const endHr = (h + cls.duration - 1) % 12 || 12;
        const endStr = `${endHr < 10 ? '0' + endHr : endHr}:50`;
        return `${startStr} - ${endStr} ${ampm}`;
    };
    
    const card = document.createElement('div');
    card.className = `class-card type-${cls.type}`;
    
    // Add 'active-now' class if the class is currently happening
    if (isClassActive(cls)) {
        card.classList.add('active-now');
    }
    
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
    const formatTime = (h) => { const hr = h % 12 || 12; return `${hr < 10 ? '0' + hr : hr}:00 ${h >= 12 ? 'PM' : 'AM'}`; };
    const breakDiv = document.createElement('div');
    breakDiv.className = 'break-card';
    breakDiv.innerHTML = `<div class="break-header">${title}</div><div class="break-time-text">${formatTime(start)} - ${formatTime(end)}</div>`;
    container.appendChild(breakDiv);
}

function renderDesktopView() {
    const tbody = document.querySelector('.weekly-table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const hours = [9, 10, 11, 12, 13, 14, 15, 16];
    hours.forEach(hour => {
        const tr = document.createElement('tr');
        const tdTime = document.createElement('td');
        const displayHour = hour % 12 || 12;
        tdTime.innerText = `${displayHour < 10 ? '0' + displayHour : displayHour}:00 - ${displayHour < 10 ? '0' + displayHour : displayHour}:50 ${hour >= 12 ? 'PM' : 'AM'}`;
        tr.appendChild(tdTime);

        if (hour === 12) {
            const tdLunch = document.createElement('td');
            tdLunch.colSpan = 7;
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
                
                // Add 'active-now' class for desktop view too
                if (isClassActive(cls)) {
                    td.classList.add('active-now');
                }
                
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

// Auto-refresh function
function startAutoRefresh() {
    // Refresh every minute to update active classes
    setInterval(() => {
        if (document.getElementById('timetable-container') && 
            !document.getElementById('timetable-container').classList.contains('hidden-view')) {
            renderMobileView();
        }
        if (document.getElementById('compact-container') && 
            !document.getElementById('compact-container').classList.contains('hidden-view')) {
            renderDesktopView();
        }
    }, 60000); // 60 seconds
}

// Start auto-refresh when page loads
if (typeof window !== 'undefined') {
    window.addEventListener('load', startAutoRefresh);
}
