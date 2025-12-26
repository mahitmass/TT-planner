// --- 1. THE DATA ---
// Days: 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
// Types: 'lec', 'tut', 'lab'
const schedule = [
  // MONDAY
  { day: 1, start: 10, duration: 2, title: "Physics Lab-2", code: "PL2", teacher: "Dr. Navendu / Dr. Indrani", type: "lab" },
  { day: 1, start: 14, duration: 1, title: "UHV", code: "G1", teacher: "Dr. Manoj Tripathi", type: "lec" },

  // TUESDAY
  { day: 2, start: 9, duration: 1, title: "Workshop", code: "TS16", teacher: "Dr. Gorav Patel", type: "tut" },
  { day: 2, start: 10, duration: 2, title: "Workshop Lab", code: "EW2", teacher: "Dr. Gorav Patel", type: "lab" },
  { day: 2, start: 13, duration: 1, title: "Mathematics-2", code: "G1", teacher: "Dr. Arpita Nayek", type: "lec" },
  { day: 2, start: 14, duration: 1, title: "Physics-2", code: "G1", teacher: "Dr. Sandeep Mishra", type: "lec" },
  { day: 2, start: 15, duration: 1, title: "SDF-2", code: "FF1", teacher: "Rohit Kumar Sony", type: "lec" },

  // WEDNESDAY
  { day: 3, start: 9, duration: 1, title: "UHV", code: "F10", teacher: "Dr. Yogita Naruka", type: "tut" },
  { day: 3, start: 12, duration: 1, title: "Physics-2", code: "CS5", teacher: "Dr. Sandeep Mishra", type: "lec" },
  { day: 3, start: 13, duration: 1, title: "Mathematics-2", code: "FF3", teacher: "Dr. Arpita Nayek", type: "lec" },
  { day: 3, start: 14, duration: 2, title: "SDF Lab", code: "CL02", teacher: "Meenal / Prateek", type: "lab" },

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

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// --- 2. GENERATE MOBILE SWIPE VIEW ---
function renderMobileView() {
  const track = document.getElementById('daysTrack');
  track.innerHTML = ''; // Clear existing

  for (let d = 1; d <= 6; d++) {
    const dayView = document.createElement('div');
    dayView.className = 'day-view';
    dayView.setAttribute('data-day-index', d);

    // Header
    const h2 = document.createElement('h2');
    h2.className = 'day-header';
    h2.innerText = dayNames[d];
    dayView.appendChild(h2);

    // Filter classes for this day and sort by time
    const dayClasses = schedule.filter(s => s.day === d).sort((a, b) => a.start - b.start);

    // If no classes
    if (dayClasses.length === 0) {
      dayView.innerHTML += `<div class="break-card"><div class="break-header">No Classes Today! 🥳</div></div>`;
    }

    // Generate Cards
    dayClasses.forEach(cls => {
        // Format Time (e.g., 13 -> 01:00 PM)
        const formatTime = (h) => {
            const ampm = h >= 12 ? 'PM' : 'AM';
            const hr = h % 12 || 12;
            return `${hr < 10 ? '0'+hr : hr}:00 ${ampm}`;
        };

        const timeString = `${formatTime(cls.start)} - ${formatTime(cls.start + cls.duration)}`;
        
        // Type Badge Text
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
            </div>
        `;
        dayView.appendChild(card);
    });
    
    // Add bottom padding spacer
    const spacer = document.createElement('div');
    spacer.style.height = "100px"; 
    dayView.appendChild(spacer);

    track.appendChild(dayView);
  }
}

// --- 3. GENERATE DESKTOP TABLE VIEW ---
function renderDesktopView() {
    const tbody = document.querySelector('.weekly-table tbody');
    tbody.innerHTML = ''; // Clear existing

    // The hours we want to show rows for
    const hours = [9, 10, 11, 12, 13, 14, 15, 16];

    hours.forEach(hour => {
        const tr = document.createElement('tr');
        
        // Time Column
        const tdTime = document.createElement('td');
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        tdTime.innerText = `${displayHour < 10 ? '0'+displayHour : displayHour}:00 ${ampm}`;
        tr.appendChild(tdTime);

        // Special Case: Lunch Break at 12
        if (hour === 12) {
            const tdLunch = document.createElement('td');
            tdLunch.colSpan = 6;
            tdLunch.className = 'cell-break';
            tdLunch.style.textAlign = 'center';
            tdLunch.style.letterSpacing = '2px';
            tdLunch.innerHTML = '<span class="cell-subject">LUNCH BREAK</span>';
            tr.appendChild(tdLunch);
            tbody.appendChild(tr);
            return; // Skip the rest of the loop for 12pm
        }

        // Days Mon(1) to Sat(6)
        for (let d = 1; d <= 6; d++) {
            // 1. Check if a class STARTS here
            const cls = schedule.find(s => s.day === d && s.start === hour);

            if (cls) {
                const td = document.createElement('td');
                td.className = `cell-${cls.type}`;
                if (cls.duration > 1) td.rowSpan = cls.duration;
                
                // Format Subject Title for Table
                let subjectShort = cls.title; 
                if(subjectShort.includes('Laboratory')) subjectShort = subjectShort.replace('Laboratory', 'Lab');

                td.innerHTML = `
                    <span class="cell-subject">${subjectShort} (${cls.type === 'lec' ? 'L' : cls.type === 'tut' ? 'T' : 'Lab'})</span>
                    <span class="cell-room">${cls.code}</span>
                `;
                tr.appendChild(td);
            } else {
                // 2. Check if a class is OCCUPYING this slot (started earlier)
                const isOccupied = schedule.some(s => s.day === d && s.start < hour && (s.start + s.duration) > hour);

                if (!isOccupied) {
                    const tdEmpty = document.createElement('td');
                    tdEmpty.className = 'cell-empty';
                    tr.appendChild(tdEmpty);
                }
                // If occupied, we DON'T add a td, because the previous rowspan covers it
            }
        }
        tbody.appendChild(tr);
    });
}

// Initial Render
renderMobileView();
renderDesktopView();
