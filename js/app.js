// Removed semester logic
if ("serviceWorker" in navigator) {
    
    // 1. Listen for the "Reload" command from the Service Worker
    navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
            console.log("Update Available Notification Received");
            try {
                // Safely evaluate the new data
                const getNewSchedule = new Function(event.data.payload + '\nreturn scheduleMap;');
                const newScheduleMap = getNewSchedule();
                
                const currentBatch = Storage.get('selectedBatch', 'A1');
                
                const oldBatchSchedule = JSON.stringify(scheduleMap?.[currentBatch] || []);
                const newBatchSchedule = JSON.stringify(newScheduleMap?.[currentBatch] || []);
                
                if (oldBatchSchedule !== newBatchSchedule) {
                    console.log("Current batch data changed. Showing Update button.");
                    const updateBtn = document.getElementById('smart-update-btn');
                    if (updateBtn) updateBtn.classList.remove('hidden');
                } else {
                    console.log("Update is for another batch. Ignoring silently.");
                }
            } catch (err) {
                console.error("Failed to parse new schedule data", err);

            }
        } else if (event.data && event.data.type === 'FORCE_RELOAD') {
            console.log("Force Update Triggered");
            window.location.reload();
        }
    });

    // 2. Listen for a new Service Worker taking control
    // (This ensures the "Rename Trick" refreshes the page instantly)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log("New Service Worker active. Reloading...");
        window.location.reload();
    });

    // 3. Register the NEW filename
    navigator.serviceWorker.register("./sw.js") // <--- NEW NAME
        .then(reg => {
             // Force a check immediately on load
             reg.update();
             console.log("SW Registered");
        })
        .catch(err => console.log("SW Fail", err));
        
    // 4. Check connection recovery
    window.addEventListener('online', () => {
         fetch('./js/data.js', { cache: 'no-store' }).catch(() => {});
    });
}
// ================= END SERVICE WORKER SETUP =================
// ==================== ROOM POPUP LOGIC ====================
// Define the global function immediately
window.showRoomPopup = function(event, code) {
    event.stopPropagation();
    let popup = document.getElementById('room-info-popup');
    
    // Create it if it doesn't exist yet
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'room-info-popup';
        document.body.appendChild(popup);
    }

    const location = (typeof ROOM_LOCATIONS !== 'undefined' && ROOM_LOCATIONS[code]) 
                     ? ROOM_LOCATIONS[code] 
                     : "Location details not available";

    popup.innerHTML = `<div><span style="color:var(--accent-color)">${code}:</span> ${location}</div>`;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    popup.style.display = 'block';
    popup.style.top = `${rect.bottom + scrollTop + 8}px`;
    popup.style.left = `${rect.left + scrollLeft}px`;

    // Handle overflow
    if (rect.left + 220 > window.innerWidth) {
        popup.style.left = 'auto';
        popup.style.right = '10px';
    }
};

// Global hider
document.addEventListener('click', () => {
    const popup = document.getElementById('room-info-popup');
    if (popup) popup.style.display = 'none';
});
document.addEventListener('scroll', () => {
    const popup = document.getElementById('room-info-popup');
    if (popup) popup.style.display = 'none';
}, {capture: true});

// ==================== TIMETABLE APPLICATION ====================
const TimetableApp = (function() {
// ==================== MOBILE BATCH SCROLLER (V3 - Final) ====================
  const BatchScroller = (function() {
  let masterList = [];
  let overlay = null;
  let badge = null;
  let isOpen = false;
  
  let startY = 0;
  let lastSwitchY = 0;
  let isSwiping = false; 
  
  function init() {
      overlay = document.getElementById('batch-scroller');
      badge = document.getElementById('floating-batch');
      if (!overlay || !badge) return;

      badge.addEventListener('touchstart', handleStart, { passive: false });
      badge.addEventListener('touchmove', handleMove, { passive: false });
      badge.addEventListener('touchend', handleEnd);
      badge.addEventListener('touchcancel', handleEnd);
      
      document.addEventListener('click', (e) => {
          if (isOpen && !isSwiping && !overlay.contains(e.target) && !badge.contains(e.target)) {
              close();
          }
      });
      
      overlay.addEventListener('click', (e) => {
           const item = e.target.closest('.scroll-item');
           if(item) {
               selectBatch(item.textContent);
               close();
           }
      });
  }

  function updateMasterList() {
      if (typeof scheduleMap === 'undefined') return;
      
      const semData = scheduleMap[state.currentSemester] || {};
      masterList = Object.keys(semData).sort((a, b) => 
          a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
      );
  }

  function handleStart(e) {
      if (state.currentView !== 'swipe') return;
      
      updateMasterList();
      
      startY = e.touches[0].clientY;
      lastSwitchY = startY;
      isSwiping = false; 
      
      if (!isOpen) open();
  }

  function handleMove(e) {
      if (state.currentView !== 'swipe') return;
      e.preventDefault(); 
      
      const currentY = e.touches[0].clientY;
      const deltaTotal = currentY - startY;
      const deltaStep = currentY - lastSwitchY;
      
      if (Math.abs(deltaTotal) > 10) {
          isSwiping = true;
      }

      const SENSITIVITY = 25; 

      if (Math.abs(deltaStep) > SENSITIVITY) {
          const direction = deltaStep > 0 ? -1 : 1; 
          
          shiftBatch(direction);
          lastSwitchY = currentY; 
      }
  }

  function handleEnd(e) {
      if (isSwiping) {
          close();
      } else {
          if (!isOpen) open();
      }
      isSwiping = false;
  }

  function shiftBatch(direction) {
      const currentIndex = masterList.indexOf(state.currentBatch);
      if (currentIndex === -1) return;

      let newIndex = currentIndex + direction;
      
      if (newIndex >= masterList.length) newIndex = 0;
      if (newIndex < 0) newIndex = masterList.length - 1;

      const newBatch = masterList[newIndex];
      selectBatch(newBatch);
      renderList(); 
      if (navigator.vibrate) navigator.vibrate(5);
  }

  function open() {
      isOpen = true;
      renderList();
      overlay.classList.add('active');
      badge.classList.add('hide-self'); 
  }

  function close() {
      isOpen = false;
      overlay.classList.remove('active');
      badge.classList.remove('hide-self');
  }

  function renderList() {
      const currIdx = masterList.indexOf(state.currentBatch);
      if (currIdx === -1) return;

      const indices = [currIdx - 2, currIdx - 1, currIdx, currIdx + 1, currIdx + 2];
      
      overlay.innerHTML = ''; 
      
      indices.forEach(idx => {
          let actualIdx = idx;
          if (idx < 0) actualIdx = masterList.length + idx; 
          if (idx >= masterList.length) actualIdx = idx - masterList.length; 
          
          const batch = masterList[actualIdx];
          const div = document.createElement('div');
          const isCenter = (idx === currIdx);
          
          div.className = `scroll-item ${isCenter ? 'current' : ''}`;
          div.textContent = batch;
          overlay.appendChild(div);
      });
  }

  return { init };
})();    
  let state = {
    currentSemester: Storage.get('selectedSemester', '3'),
    currentSchedule: [],
    currentDayIndex: 0,
    currentBatch: 'A1',
    currentView: 'swipe',
    isDragging: false,
    startX: 0,
    startY: 0,
    currentTranslate: 0,
    prevTranslate: 0,
    totalDays: 6,
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    activeHighlightInterval: null,
    isVerticalScroll: false,
    isVerticalScrollPossible: false,
    initialScrollTop: 0,
    isTeacherMode: false,
    wheelCooldown: false
  };

  const dom = {
    daysTrack: null,
    timetableContainer: null,
    compactContainer: null,
    tableBody: null,
    batchGrid: null,
    floatingBatch: null,
    filterArrow: null,
    filterPanel: null,
    dropdownContent: null
  };

  function init() {
    console.log('Initializing Timetable App...');
    cacheDOMElements();
    loadSavedPreferences();
    setupEventListeners();
    initializeBatchDropdown();
    BatchScroller.init();
    
    const teacherBtn = document.getElementById('teacher-mode-btn');
    if(teacherBtn) teacherBtn.addEventListener('click', toggleTeacherMode);
    
    initTeacherSearch();
    renderInitialViews();
    startActiveHighlighting();

    // FIX LAYOUT
   setTimeout(() => {
        handleResize(); 
        jumpToDay(state.currentDayIndex);
    }, 100);

    // 1. Run immediately (50ms) so it feels instant
    setTimeout(() => {
        handleResize(); // This now uses instant jump internally
        jumpToDay(state.currentDayIndex, false); // Force Instant Jump
        highlightActiveClass();
    }, 50);

    // 2. Safety Check (In case browser was slow to calculate width)
    setTimeout(() => {
        const trackWidth = dom.timetableContainer ? dom.timetableContainer.offsetWidth : window.innerWidth;
        // If the math is wrong (we aren't exactly on the day), snap it again instantly
        if (Math.abs(state.currentTranslate) % trackWidth !== 0 || trackWidth === 0) {
            handleResize();
            jumpToDay(state.currentDayIndex, false); // Instant Correction
        }
    }, 300);
}

  function cacheDOMElements() {
    dom.daysTrack = document.getElementById('daysTrack');
    dom.timetableContainer = document.getElementById('timetable-container');
    dom.compactContainer = document.getElementById('compact-container');
    dom.tableBody = document.querySelector('.weekly-table tbody');
    dom.batchGrid = document.getElementById('batchGrid');
    dom.floatingBatch = document.getElementById('floating-batch');
    dom.filterArrow = document.getElementById('filter-arrow');
    dom.filterPanel = document.getElementById('filter-panel');
    dom.dropdownContent = document.getElementById('batch-dropdown-content');
  }

  function loadSavedPreferences() {
    
    const savedBatch = Storage.get('selectedBatch', 'A1');
    state.currentBatch = savedBatch;
    
    // Check inside the semester!
    if (typeof scheduleMap !== 'undefined' && scheduleMap && scheduleMap[state.currentSemester] && scheduleMap[state.currentSemester][savedBatch]) {
        state.currentSchedule = scheduleMap[state.currentSemester][savedBatch];
    } else {
        state.currentSchedule = [];
    }
    
    state.currentView = Storage.get('preferredView', 'swipe');
    const savedTheme = Storage.get('theme', 'dark');
    document.body.setAttribute('data-theme', savedTheme);
    const themeBtn = document.getElementById('theme-btn');
    if(themeBtn) themeBtn.textContent = savedTheme === 'dark' ? '☀' : '🌙';
    
    const today = DateTime.getCurrentDay();
    state.currentDayIndex = (today >= 1 && today <= 6) ? today - 1 : 0;
  }

  function setupEventListeners() {
    if (dom.daysTrack) {
      dom.daysTrack.addEventListener('touchstart', handleTouchStart, { passive: false });
      dom.daysTrack.addEventListener('touchmove', handleTouchMove, { passive: false });
      dom.daysTrack.addEventListener('touchend', handleTouchEnd);
      dom.daysTrack.addEventListener('mousedown', handleMouseStart);
      dom.daysTrack.addEventListener('mousemove', handleMouseMove);
      dom.daysTrack.addEventListener('mouseup', handleMouseEnd);
      dom.daysTrack.addEventListener('mouseleave', handleMouseLeave);
    }
    if (dom.timetableContainer) {
        dom.timetableContainer.addEventListener('wheel', handleWheel, { passive: false });
    }
    window.addEventListener('resize', debounce(handleResize, 200));
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('keydown', handleKeyboardNavigation);
      // Listen for Semester Clicks
    document.querySelectorAll('.sem-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            selectSemester(e.target.getAttribute('data-sem'));
        });
    });
  }
  
  // ==================== RENDERING ====================
  function renderInitialViews() {
    updateBatchLabels(state.currentBatch);
    setViewMode(state.currentView); 
    renderMobileView();
    renderDesktopView();
  }

  function updateBatchLabels(batchName) {
    if (dom.floatingBatch) dom.floatingBatch.textContent = `BATCH ${batchName}`;
    
    const cornerLabel = document.getElementById('table-corner-label');
    if (cornerLabel) {
        // Teacher Mode Check
        if (state.isTeacherMode) {
             cornerLabel.innerHTML = 'Day';
        } else {
             // YOUR EXACT STYLING [cite: 70-71], just changed "TIME" to "DAY"
             cornerLabel.innerHTML = `
                  <div style="display: inline-block; font-size: 0.9rem; color: var(--accent-color); font-weight: 800; border: 1px solid var(--accent-color); background: rgba(187, 134, 252, 0.1); border-radius: 6px; padding: 1px 8px; margin-bottom: 2px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); letter-spacing: 0.5px;">
                      ${batchName}
                  </div>
                  <div style="font-size: 0.65rem; opacity: 0.6; font-weight: 600; letter-spacing: 1px;">DAY</div>
              `;
        }
    }
}

  function renderMobileView() {
    if (!dom.daysTrack) return;
    dom.daysTrack.innerHTML = '';
    for (let day = 1; day <= 6; day++) {
      dom.daysTrack.appendChild(createDayView(day));
    }
  }

  function createDayView(day) {
    const dayView = document.createElement('div');
    dayView.className = 'day-view';
    dayView.setAttribute('data-day-index', day);
    dayView.id = `day-${day}`;

    const header = document.createElement('h2');
    header.className = 'day-header';
    header.textContent = state.dayNames[day];
    dayView.appendChild(header);

    const dayClasses = state.currentSchedule
      .filter(s => s.day === day)
      .sort((a, b) => a.start - b.start);

    if (dayClasses.length === 0) {
      dayView.appendChild(createNoClassesCard());
    } else {
      renderDayClasses(dayView, dayClasses);
    }
    return dayView;
  }

  function renderDayClasses(container, classes) {
    let lastEndTime = classes[0].start;
    let lunchStart = (state.currentSemester == 1 || state.currentSemester === '1') ? 12 : 13;
    let lunchEnd = lunchStart + 1;

    classes.forEach((cls, index) => {
      if (index > 0 && cls.start > lastEndTime) {
        const gapStart = lastEndTime;
        const gapEnd = cls.start;
        if (gapStart <= lunchStart && gapEnd >= lunchEnd) {
          if (lunchStart > gapStart) container.appendChild(createBreakCard(gapStart, lunchStart, "Break"));
          container.appendChild(createBreakCard(lunchStart, lunchEnd, "Lunch Break"));
          if (gapEnd > lunchEnd) container.appendChild(createBreakCard(lunchEnd, gapEnd, "Break"));
        } else {
          container.appendChild(createBreakCard(gapStart, gapEnd, "Break"));
        }
      }
      container.appendChild(createClassCard(cls));
      lastEndTime = cls.start + cls.duration;
    });
  }

  function createNoClassesCard() {
    const card = document.createElement('div');
    card.className = 'break-card';
    card.innerHTML = `<div class="break-header">No Classes Today! 🥳</div>`;
    return card;
  }

 function createClassCard(cls) {
    const displayTeacher = getTeacherDisplayName(cls.teacher);
    const displayTitle = getSubjectFullTitle(cls.title, cls.type) || cls.title;
    
    const card = document.createElement('div');
    card.className = `class-card type-${cls.type}`;
    card.dataset.startHour = cls.start.toString();
    card.dataset.day = cls.day.toString();
    card.innerHTML = `
      <div class="time-slot">${formatTimeRange(cls.start, cls.duration)}</div>
      <div class="subject-name">${displayTitle}</div>
      <div class="card-footer">
        <span class="info-badge" style="cursor:pointer; display:inline-flex; align-items:center;" onclick="window.showRoomPopup(event, '${cls.code}')">
            🏛 ${cls.code} <span class="info-icon">i</span>
        </span>
        <span class="info-badge">👨‍🏫 ${displayTeacher}</span>
        <span class="info-badge">${cls.type.toUpperCase()}</span>
      </div>
    `;
    return card;
  }

  function createBreakCard(start, end, title) {
    const breakCard = document.createElement('div');
    breakCard.className = 'break-card';
    breakCard.innerHTML = `
      <div class="break-header">${title}</div>
      <div class="break-time-text">${formatTimeRange(start, end - start)}</div>
    `;
    return breakCard;
  }

// --- REPLACE 'renderDesktopView' IN app.js ---
function renderDesktopView() {
    const table = document.querySelector('.weekly-table');
    // Safety check: if table doesn't exist, stop.
    if (!table) return;

    // 1. Grab parts DIRECTLY (Fixes "Nothing in table" issue)
    const thead = table.querySelector('thead');
    let tbody = table.querySelector('tbody');
    
    // If tbody is missing for some reason, create it
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }

    const hours = [9, 10, 11, 12, 13, 14, 15, 16];

    // ================= HEADER (Time Slots) =================
    thead.innerHTML = '';
    const headerRow = document.createElement('tr');

    // Corner Cell (Batch + "DAY")
    const corner = document.createElement('th');
    corner.id = 'table-corner-label';
    corner.style.zIndex = '65'; // Higher than others
    
    if (state.isTeacherMode) {
        corner.innerHTML = 'Day';
    } else {
        corner.innerHTML = `
             <div style="display: inline-block; font-size: 0.9rem; color: var(--accent-color); font-weight: 800; border: 1px solid var(--accent-color); background: rgba(187, 134, 252, 0.1); border-radius: 6px; padding: 1px 8px; margin-bottom: 2px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); letter-spacing: 0.5px;">
                  ${state.currentBatch}
              </div>
              <div style="font-size: 0.65rem; opacity: 0.6; font-weight: 600; letter-spacing: 1px;">DAY</div>
        `;
    }
    headerRow.appendChild(corner);

    // Time Columns
    hours.forEach(h => {
        const th = document.createElement('th');
        const displayH = h % 12 || 12;
        th.innerHTML = `${displayH}:00`;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // ================= BODY (Days Mon-Sat) =================
    tbody.innerHTML = ''; // Clear previous content

    for (let day = 1; day <= 6; day++) {
        const row = document.createElement('tr');
        row.setAttribute('data-day', day); 

        // 1. Day Name (Sticky Left)
        const dayLabel = document.createElement('td');
        dayLabel.textContent = state.dayNames[day].substring(0, 3); 
        dayLabel.className = 'day-col-header';
        row.appendChild(dayLabel);

        // 2. Class Slots
        let skipSlots = 0;
        hours.forEach(hour => {
            if (skipSlots > 0) {
                skipSlots--;
                return;
            }

            const classesForSlot = state.currentSchedule.filter(s => s.day === day && s.start === hour);

            if (classesForSlot.length > 0) {
                const cls = classesForSlot[0];
                const cell = createTableCell(classesForSlot); // Uses helper below
                if (cls.duration > 1) {
                    cell.colSpan = cls.duration;
                    skipSlots = cls.duration - 1;
                }
                cell.setAttribute('data-start-hour', cls.start);
                row.appendChild(cell);
            } else {
                const cell = createEmptyTableCell(day, hour);
                cell.setAttribute('data-start-hour', hour);
                row.appendChild(cell);
            }
        });

        tbody.appendChild(row);
    }
    
    // Bottom Hint
    const hintRow = document.createElement('tr');
    const hintCell = document.createElement('td');
    hintCell.colSpan = hours.length + 1;
    hintCell.style.cssText = "text-align: center; padding: 10px; opacity: 0.6; font-size: 0.8rem; border:none;";
    hintCell.textContent = "☝️ Tap any class block for details";
    hintRow.appendChild(hintCell);
    tbody.appendChild(hintRow);
}
  function createEmptyTableCell(day, hour) {
    const cell = document.createElement('td');
    cell.setAttribute('data-day', day);
    let lunchHour = (state.currentSemester == 1 || state.currentSemester === '1') ? 12 : 13;
    if (hour === lunchHour) {
      cell.className = 'cell-break';
      cell.innerHTML = '<span style="font-size:0.6rem; opacity:0.5;">LUNCH</span>';
    }
    return cell;
  }
function createTableCell(classes) {
    const isArray = Array.isArray(classes);
    const cls = isArray ? classes[0] : classes;
    const extraCount = isArray ? classes.length - 1 : 0;

    const cell = document.createElement('td');
    cell.className = `cell-${cls.type}`;
    cell.style.cursor = 'pointer';
    cell.onclick = () => openDetailsModal(classes);

    const displayTitle = getSubjectFullTitle(cls.title, cls.type) || cls.title;
    const shortTitle = displayTitle.includes('(') ? displayTitle.split('(')[0].trim() : displayTitle;

    let innerHtml = `
        <span class="cell-subject" title="${displayTitle}">${shortTitle}</span>
        <span class="cell-room">${cls.code}</span>
    `;

    if (extraCount > 0) {
        innerHtml += `<div style="position: absolute; top: 2px; right: 2px; background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 4px; color: #fff; font-size: 0.6rem; padding: 1px 3px; font-weight: bold;">+${extraCount}</div>`;
        cell.style.position = 'relative';
    }
    cell.innerHTML = innerHtml;
    return cell; // <--- This is CRITICAL
}
  function initializeBatchDropdown() {
      const availableSems = typeof scheduleMap !== 'undefined' ? Object.keys(scheduleMap) : ['3'];
      if (!availableSems.includes(state.currentSemester)) {
          state.currentSemester = availableSems[0] || '3';
      }
      
      const semText = document.getElementById('semester-text');
      if (semText) semText.textContent = `Semester ${state.currentSemester}`;
      
      if (scheduleMap && scheduleMap[state.currentSemester] && !scheduleMap[state.currentSemester][state.currentBatch]) {
          state.currentBatch = Object.keys(scheduleMap[state.currentSemester])[0] || 'A1';
      }
      
      const current = state.currentBatch;
      const bSeries = (typeof batchSeries !== 'undefined' && batchSeries[state.currentSemester] && batchSeries[state.currentSemester][current]) ? batchSeries[state.currentSemester][current] : (/^[FEH]/.test(current) ? "128" : "62");
      const is128 = bSeries === "128"; 
      
      if (is128) {
          document.body.classList.add('series-128');
      } else {
          document.body.classList.remove('series-128');
      }

      const seriesBtn = document.getElementById('series-text');
      if (seriesBtn) seriesBtn.textContent = is128 ? "128 Series" : "62 Series";
      
      updateTriggerText();
      populateBatchGrid(is128 ? "128" : "62");
    }
  
    function toggleSemester() {
      const semText = document.getElementById('semester-text');
      if (!semText) return;
      if (typeof scheduleMap === 'undefined') return;
      
      const availableSems = Object.keys(scheduleMap).sort();
      if (availableSems.length <= 1) return;
      
      let currentIndex = availableSems.indexOf(state.currentSemester);
      let nextIndex = (currentIndex + 1) % availableSems.length;
      let nextSem = availableSems[nextIndex];
      
      state.currentSemester = nextSem;
      Storage.set('selectedSemester', nextSem);
      semText.textContent = `Semester ${nextSem}`;
      
      const semBatches = Object.keys(scheduleMap[nextSem] || {});
      if (semBatches.length > 0) {
          selectBatch(semBatches[0]);
      } else {
          populateBatchGrid();
      }
    }

    function toggleSeries() {
      const seriesText = document.getElementById('series-text');
      if (!seriesText) return;

      const isCurrently62 = seriesText.textContent.includes("62");
      const newType = isCurrently62 ? "128" : "62";

      if (newType === "128") {
          document.body.classList.add('series-128');
      } else {
          document.body.classList.remove('series-128');
      }

      seriesText.textContent = `${newType} Series`;
      populateBatchGrid(newType);
    }

  function toggleBatchGrid(forceState) {
    const grid = document.getElementById('floating-batch-grid');
    if (!grid) return;
    if (typeof forceState === 'boolean') {
        forceState ? grid.classList.remove('hidden') : grid.classList.add('hidden');
    } else {
        grid.classList.toggle('hidden');
    }
  }
function populateBatches() {
    const batchSelect = document.getElementById("batch-select");
    batchSelect.innerHTML = "";
    
    const is128 = toggleCheckbox.checked;
    
    let hasData = false;
    
    // Read from the new nested object!
    const semData = scheduleMap || {};

    Object.keys(semData).sort().forEach(batch => {
        const bSeries = (typeof batchSeries !== 'undefined' && batchSeries[state.currentSemester] && batchSeries[state.currentSemester][batch]) ? batchSeries[state.currentSemester][batch] : (/^[FEH]/.test(batch) ? "128" : "62");
        if ((is128 && bSeries === "128") || (!is128 && bSeries === "62")) {
            const option = document.createElement("option");
            option.value = batch;
            option.textContent = `Batch ${batch}`;
            batchSelect.appendChild(option);
            hasData = true;
        }
    });
    
    if (!hasData) {
        batchSelect.innerHTML = '<option value="">NO DATA</option>';
    }

}
  function populateBatchGrid(forcedType) {
      const grid = document.getElementById('floating-batch-grid');
      const seriesText = document.getElementById('series-text');
      const type = forcedType || (seriesText?.textContent.includes("128") ? "128" : "62");
      if (!grid || typeof scheduleMap === 'undefined') return;
      grid.innerHTML = '';
  
      const semData = scheduleMap[state.currentSemester] || {};
      const allBatches = Object.keys(semData);
      
      const filteredBatches = allBatches.filter(b => {
          const bSeries = (typeof batchSeries !== 'undefined' && batchSeries[state.currentSemester] && batchSeries[state.currentSemester][b]) ? batchSeries[state.currentSemester][b] : "62";
          return type === bSeries;
      }).sort((a, b) => 
          a.localeCompare(b, undefined, {numeric: true, sensitivity: 'base'})
      );
      
      filteredBatches.forEach(bName => {
          const div = document.createElement('div');
          div.className = `batch-grid-item ${bName === state.currentBatch ? 'active' : ''}`;
          div.textContent = bName;
          div.onclick = (e) => {
              e.stopPropagation();
              selectBatch(bName);
              toggleBatchGrid(false);
          };
          grid.appendChild(div);
      });
      
      if(filteredBatches.length === 0) {
          grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; opacity:0.5; padding:10px;">No Data</div>';
      }
      updateGridSelection();
    }

  function updateTriggerText() {
      const btnText = document.getElementById('trigger-text');
      if(btnText) btnText.textContent = state.currentBatch;
  }
  
  function updateGridSelection() {
    document.querySelectorAll('.batch-btn').forEach(btn => {
      btn.classList.remove('active-batch');
      if (btn.textContent === state.currentBatch) {
        btn.classList.add('active-batch');
      }
    });
  }
  
  function selectBatch(batchName) {
      if (!batchName) return;
      
      state.currentBatch = batchName;
      Storage.set('selectedBatch', batchName);
      
      const bSeries = (typeof batchSeries !== 'undefined' && batchSeries[state.currentSemester] && batchSeries[state.currentSemester][batchName]) ? batchSeries[state.currentSemester][batchName] : (/^[FEH]/.test(batchName) ? "128" : "62");
      const is128 = bSeries === "128";
      if (is128) {
          document.body.classList.add('series-128');
      } else {
          document.body.classList.remove('series-128');
      }
      const seriesBtn = document.getElementById('series-text');
      if (seriesBtn) seriesBtn.textContent = is128 ? "128 Series" : "62 Series";
      
      if (typeof scheduleMap !== 'undefined' && scheduleMap && scheduleMap[state.currentSemester] && scheduleMap[state.currentSemester][batchName]) {
          state.currentSchedule = scheduleMap[state.currentSemester][batchName];
      } else {
          state.currentSchedule = [];
      }
      
      updateTriggerText();
      populateBatchGrid(is128 ? "128" : "62");
      BatchScroller.init(); 
      renderInitialViews();
      
      updateGridSelection();
      renderMobileView();
      renderDesktopView();
      
      setTimeout(() => {
          highlightActiveClass();
          jumpToDay(state.currentDayIndex);
      }, 50);
  }

// ==================== VIEW MODE ====================
 // REPLACE 'setViewMode' in app.js
function setViewMode(mode) {
    state.currentView = mode;
    Storage.set('preferredView', mode);
    
    document.querySelectorAll('#btn-swipe, #btn-table').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-${mode}`);
    if(activeBtn) activeBtn.classList.add('active');

    if (mode === 'swipe') {
      dom.timetableContainer.classList.remove('hidden-view');
      dom.compactContainer.classList.add('hidden-view');
      
      // Instant snap for Swipe View
      setTimeout(() => {
          handleResize();
          jumpToDay(state.currentDayIndex, false); 
      }, 50);

    } else {
      // Switch to Table View
      dom.timetableContainer.classList.add('hidden-view');
      dom.compactContainer.classList.remove('hidden-view');
      
      // --- NEW: Trigger Navigation immediately for Table View ---
      setTimeout(() => {
          highlightActiveClass(); 
      }, 50);
    }
}

  // ==================== NAVIGATION ====================
  // REPLACE 'jumpToDay' in app.js
function jumpToDay(index, animate = true) { // <--- Added 'animate' parameter (Default: true)
    if (index < 0 || index >= state.totalDays) return;
    state.currentDayIndex = index;
    const trackWidth = dom.timetableContainer ? dom.timetableContainer.offsetWidth : window.innerWidth;
    state.currentTranslate = index * -trackWidth;
    state.prevTranslate = state.currentTranslate;

    if (dom.daysTrack) {
        if (animate) {
            // Normal Swipe Animation
            dom.daysTrack.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)';
        } else {
            // INSTANT JUMP (No Animation)
            dom.daysTrack.style.transition = 'none';
        }
        dom.daysTrack.style.transform = `translateX(${state.currentTranslate}px)`;
    }
    
    // Update Active Button State
    document.querySelectorAll('.day-btn').forEach(btn => {
      btn.classList.toggle('active-day', parseInt(btn.dataset.day) === index + 1);
    });
}

  function manualJumpToDay(dayNumber) {
    jumpToDay(dayNumber - 1);
  }

// REPLACE 'highlightActiveClass' in app.js
function highlightActiveClass() {
    // 1. Cleanup old highlights
    document.querySelectorAll('.active-now').forEach(el => el.classList.remove('active-now'));
    document.querySelectorAll('.active-day-row').forEach(el => el.classList.remove('active-day-row'));

    const now = new Date();
    const currentDay = now.getDay(); 
    let currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Logic: If it is past X:50, highlight the NEXT hour class
    if (currentMinute >= 50) {
        currentHour += 1;
    }

    if (currentDay >= 1 && currentDay <= 6) {
        // --- A. TABLE VIEW: Highlight Row ---
        const dayRow = document.querySelector(`.weekly-table tr[data-day="${currentDay}"]`);
        if (dayRow) {
            dayRow.classList.add('active-day-row');
        }

        // --- B. FIND THE ACTIVE CLASS DATA ---
        const activeClass = state.currentSchedule.find(cls => 
            cls.day === currentDay && 
            currentHour >= cls.start && 
            currentHour < (cls.start + cls.duration)
        );

        if (activeClass) {
            // 1. Handle Swipe Card View (Unchanged)
            const dayView = document.querySelector(`#day-${currentDay}`);
            if (dayView) {
                const card = dayView.querySelector(`.class-card[data-start-hour="${activeClass.start}"]`);
                if (card) {
                    card.classList.add('active-now');
                    if (!state.isDragging) {
                        if (state.currentDayIndex !== (currentDay - 1)) {
                            jumpToDay(currentDay - 1, false); // Instant jump
                        }
                        // Scroll card into view
                        setTimeout(() => {
                            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 100);
                    }
                }
            }
            
            // 2. Handle Table View Cell (UPDATED WITH NAVIGATION)
            if (dayRow) {
                 const cell = dayRow.querySelector(`td[data-start-hour="${activeClass.start}"]`);
                 if (cell) {
                      cell.classList.add('active-now');

                      // === NEW: Horizontal Auto-Scroll ===
                      const container = document.getElementById('compact-container');
                      // Only scroll if Table View is currently visible
                      if (container && !container.classList.contains('hidden-view')) {
                           // Calculate center position: Cell Position - Half Screen Width + Half Cell Width
                           const scrollTarget = cell.offsetLeft - (container.clientWidth / 2) + (cell.clientWidth / 2);
                           
                           container.scrollTo({
                               left: scrollTarget,
                               behavior: 'smooth' // Smooth scroll to the right time column
                           });
                      }
                 }
            }
        }
    }
}
    
  function startActiveHighlighting() {
    highlightActiveClass();
    state.activeHighlightInterval = setInterval(highlightActiveClass, 60000);
  }

  // ==================== SWIPE LOGIC ====================
  function handleTouchStart(e) {
    if (state.currentView !== 'swipe') return;
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
    const dayView = document.querySelector(`#day-${state.currentDayIndex + 1}`);
    if (dayView) {
      state.initialScrollTop = dayView.scrollTop;
      state.isVerticalScrollPossible = dayView.scrollHeight > dayView.clientHeight;
      state.isVerticalScroll = false;
    }
  }

  function handleTouchMove(e) {
    if (!state.isDragging || state.currentView !== 'swipe') return;
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - state.startX);
    const deltaY = Math.abs(touch.clientY - state.startY);
    if (state.isVerticalScrollPossible && deltaY > deltaX) {
        state.isVerticalScroll = true;
        state.isDragging = false;
        if (dom.timetableContainer) dom.timetableContainer.style.cursor = 'default';
        return;
    }
    if (deltaX > 5) {
        e.preventDefault();
        moveDrag(touch.clientX);
    }
  }

  function handleTouchEnd() {
    if (!state.isVerticalScroll) endDrag();
    else {
        state.isDragging = false;
        state.isVerticalScroll = false;
        if(dom.timetableContainer) dom.timetableContainer.style.cursor = 'grab';
    }
  }

  function handleMouseStart(e) { 
      // --- FIX: Allow Middle-Click Auto-Scroll (Button 1) ---
      if (e.button === 1) return; 

      if (state.currentView !== 'swipe') return;
      e.preventDefault();
      startDrag(e.clientX, e.clientY); 
  }
  function handleMouseMove(e) { if(state.isDragging) { e.preventDefault(); moveDrag(e.clientX); } }
  function handleMouseEnd() { endDrag(); }
  function handleMouseLeave() { if(state.isDragging) endDrag(); }

  function startDrag(x, y) {
    state.isDragging = true;
    state.startX = x;
    state.startY = y;
    if(dom.daysTrack) dom.daysTrack.style.transition = 'none';
  }

  function moveDrag(x) {
    state.currentTranslate = state.prevTranslate + (x - state.startX);
    if(dom.daysTrack) dom.daysTrack.style.transform = `translateX(${state.currentTranslate}px)`;
  }

  function endDrag() {
    if(!state.isDragging) return;
    state.isDragging = false;
    const movedBy = state.currentTranslate - state.prevTranslate;
    const containerWidth = dom.timetableContainer ? dom.timetableContainer.offsetWidth : window.innerWidth;
    const threshold = containerWidth / 4;
    
    if (movedBy < -threshold) {
      state.currentDayIndex = (state.currentDayIndex < state.totalDays - 1) ? state.currentDayIndex + 1 : 0;
    } else if (movedBy > threshold) {
      state.currentDayIndex = (state.currentDayIndex > 0) ? state.currentDayIndex - 1 : state.totalDays - 1;
    }
    jumpToDay(state.currentDayIndex);
  }

  // ==================== MODAL LOGIC ====================

function openRoomModal(code, location) {
    const modal = document.getElementById('details-modal');
    if(!modal) return;

    // 1. Set Data
    document.getElementById('modal-subject').textContent = code; // e.g. "TS12"
    document.getElementById('modal-time').textContent = "Room Detail"; // Subtitle
    
    // 2. Hide Irrelevant Fields (Type, Teacher, Batch)
    const typeRow = document.getElementById('modal-type') ? document.getElementById('modal-type').parentElement : null;
    const teacherRow = document.getElementById('modal-teacher') ? document.getElementById('modal-teacher').parentElement : null;
    const batchRow = document.getElementById('modal-batch') ? document.getElementById('modal-batch').parentElement : null;

    if (typeRow) typeRow.style.display = 'none';
    if (teacherRow) teacherRow.style.display = 'none';
    if (batchRow) batchRow.style.display = 'none';

    // 3. Show Venue
    const roomRow = document.getElementById('modal-venue-row');
    if(roomRow) roomRow.style.display = 'flex';
    document.getElementById('modal-room').textContent = location;

    // 4. Show Modal
    modal.classList.remove('hidden-modal');
    modal.setAttribute('aria-hidden', 'false');
    
    // 5. Close Handlers
    const closeBtn = document.getElementById('modal-close-btn');
    closeBtn.onclick = () => {
        closeModal();
        resetModalFields(); // Reset for next time
    };
    modal.onclick = (e) => {
        if (e.target === modal) {
            closeModal();
            resetModalFields();
        }
    };
}

// --- HELPER: Reset Hidden Fields ---
function resetModalFields() {
    const typeRow = document.getElementById('modal-type') ? document.getElementById('modal-type').parentElement : null;
    const teacherRow = document.getElementById('modal-teacher') ? document.getElementById('modal-teacher').parentElement : null;
    const batchRow = document.getElementById('modal-batch') ? document.getElementById('modal-batch').parentElement : null;

    if (typeRow) typeRow.style.display = 'flex';
    if (teacherRow) teacherRow.style.display = 'flex';
    if (batchRow) batchRow.style.display = 'flex';
}
    
  function openDetailsModal(classes) {
    const modal = document.getElementById('details-modal');
    if(!modal) return;
    
    // CRITICAL: Ensure fields are visible (in case Room Modal hid them)
    resetModalFields();

    const isArray = Array.isArray(classes);
    const clsList = isArray ? classes : [classes];
    const primaryCls = clsList[0];

    let subjectHtml = '';
    let typeHtml = '';
    let teacherHtml = '';
    let roomHtml = '';

    clsList.forEach((cls, index) => {
        const rawTitle = cls.title;
        const isFormatted = rawTitle.includes('('); 
        const displayTitle = isFormatted ? rawTitle : (getSubjectFullTitle(rawTitle, cls.type) || rawTitle);
        const displayTeacher = getTeacherDisplayName(cls.teacher);

        const separator = index > 0 ? '<div style="height: 1px; background: rgba(255,255,255,0.1); margin: 6px 0;"></div>' : '';

        subjectHtml += `${separator}<div>${displayTitle}</div>`;
        typeHtml += `${separator}<div>${cls.type.charAt(0).toUpperCase() + cls.type.slice(1)}</div>`;
        teacherHtml += `${separator}<div>${displayTeacher}</div>`;
        roomHtml += `${separator}<div>${cls.code} <span class="modal-glow-btn" onclick="window.showRoomPopup(event, '${cls.code}')">i</span></div>`;
    });

    const displayTime = formatTimeRange(primaryCls.start, primaryCls.duration);
    
    let displayBatch = state.currentBatch;
    if (primaryCls.batchNames && Array.isArray(primaryCls.batchNames)) {
        displayBatch = primaryCls.batchNames.join(', ');
    }

    document.getElementById('modal-subject').innerHTML = subjectHtml;
    document.getElementById('modal-time').textContent = displayTime;
    document.getElementById('modal-type').innerHTML = typeHtml;
    document.getElementById('modal-teacher').innerHTML = teacherHtml;
    document.getElementById('modal-batch').textContent = displayBatch;
    
    const roomEl = document.getElementById('modal-room');
    roomEl.innerHTML = roomHtml;
    
    modal.classList.remove('hidden-modal');
    modal.setAttribute('aria-hidden', 'false');
    const closeBtn = document.getElementById('modal-close-btn');
    closeBtn.onclick = closeModal;
    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    };
}

  function closeModal() {
      const modal = document.getElementById('details-modal');
      if(modal) {
          modal.classList.add('hidden-modal');
          modal.setAttribute('aria-hidden', 'true');
      }
  }

// --- NEW HELPER: The "Glass Wall" Manager ---
function manageBackdrop(shouldShow) {
    let backdrop = document.getElementById('filter-backdrop');
    
    if (shouldShow) {
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.id = 'filter-backdrop';
            // z-index 1050: Above Table, Below Header
            backdrop.style.cssText = `
                position: fixed; 
                top: 0; 
                left: 0; 
                width: 100vw; 
                height: 100vh; 
                z-index: 1050; 
                background: transparent; 
                touch-action: none;
                cursor: default;
            `;
            
            // The "Closer" Function
            const closeAndBlock = (e) => {
                e.preventDefault();
                e.stopPropagation(); // <--- CRITICAL: Stops click from hitting table
                
                if (state.isTeacherMode) {
                    toggleTeacherMode();
                } else {
                    toggleFilterPanel();
                }
            };
            
            backdrop.addEventListener('click', closeAndBlock);
            backdrop.addEventListener('touchstart', closeAndBlock, { passive: false });
            backdrop.addEventListener('wheel', (e) => { e.preventDefault(); e.stopPropagation(); }, { passive: false });
            document.body.appendChild(backdrop);
        }
    } else {
        if (backdrop) backdrop.remove();
    }
}
    
  // ==================== UI CONTROLS ====================
 // REPLACE 'toggleFilterPanel' in app.js
function toggleFilterPanel() {
    if (state.isTeacherMode) {
        toggleTeacherMode();
        return; 
    }

    const isExpanded = dom.filterPanel.classList.toggle('expanded');
    
    if (isExpanded) {
        const computedStyle = window.getComputedStyle(dom.filterPanel);
        if (computedStyle.position === 'static') dom.filterPanel.style.position = 'relative';
        dom.filterPanel.style.zIndex = '1060'; 
    } else {
        dom.filterPanel.style.zIndex = ''; 
        dom.filterPanel.style.position = '';
    }

    if (dom.filterArrow) {
      dom.filterArrow.textContent = isExpanded ? '▲' : '▼';
    }

    toggleBatchGrid(false);
    
    // THE FIX: Turn on the glass wall
    manageBackdrop(isExpanded);
}

  function handleOutsideClick(e) {
    const filterPanel = dom.filterPanel;
    const toggleBtn = document.querySelector('.filter-toggle-btn');
    const teacherBtn = document.getElementById('teacher-mode-btn');
    if (filterPanel && filterPanel.classList.contains('expanded')) {
      if (!filterPanel.contains(e.target) && !toggleBtn.contains(e.target) && !teacherBtn.contains(e.target)) {
        toggleFilterPanel();
      }
    }
  }

  function toggleTheme() {
    const current = document.body.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    Storage.set('theme', newTheme);
    const btn = document.getElementById('theme-btn');
    if(btn) btn.textContent = newTheme === 'dark' ? '☀' : '🌙';
  }

  // REPLACE 'handleResize' in app.js
function handleResize() {
    // Pass 'false' to make it instant
    jumpToDay(state.currentDayIndex, false);
}

  function handleKeyboardNavigation(e) {
    if (state.currentView !== 'swipe') return;
    if (e.key === 'ArrowRight') jumpToDay(state.currentDayIndex < 5 ? state.currentDayIndex + 1 : 0);
    if (e.key === 'ArrowLeft') jumpToDay(state.currentDayIndex > 0 ? state.currentDayIndex - 1 : 5);
  }

  // ==================== TEACHER MODE ====================
  // REPLACE 'toggleTeacherMode' in app.js
function toggleTeacherMode() {
    state.isTeacherMode = !state.isTeacherMode;
    const btn = document.getElementById('teacher-mode-btn');
    const studentControls = document.getElementById('student-controls');
    const teacherControls = document.getElementById('teacher-controls');
    
    if (btn) btn.classList.toggle('active-mode', state.isTeacherMode);

    if (state.isTeacherMode) {
        // --- OPEN MODE ---
        if (studentControls) studentControls.classList.add('hidden');
        if (teacherControls) teacherControls.classList.remove('hidden');

        if (dom.filterPanel) {
            dom.filterPanel.classList.add('expanded');
            dom.filterPanel.style.zIndex = '1060'; 
            if(dom.filterArrow) dom.filterArrow.textContent = '▲';
        }
        setTimeout(() => {
            const searchInput = document.getElementById('teacher-search');
            if (searchInput) searchInput.focus();
        }, 300);
        
    } else {
        // --- CLOSE MODE ---
        if (studentControls) studentControls.classList.remove('hidden');
        if (teacherControls) teacherControls.classList.add('hidden');

        const viewModeButtons = document.querySelector('.filter-group:nth-child(2) .filter-options');
        const jumpToDayButtons = document.querySelector('.filter-group:nth-child(3) .filter-options');
        if (viewModeButtons) { viewModeButtons.style.visibility = 'visible'; viewModeButtons.style.opacity = '1'; }
        if (jumpToDayButtons) { jumpToDayButtons.style.visibility = 'visible'; jumpToDayButtons.style.opacity = '1'; }

        const searchInput = document.getElementById('teacher-search');
        const searchList = document.getElementById('search-suggestions');
        if (searchInput) searchInput.value = '';
        if (searchList) searchList.innerHTML = '';
        
        if (dom.filterPanel) {
            dom.filterPanel.classList.remove('expanded');
            if(dom.filterArrow) dom.filterArrow.textContent = '▼';
        }
        
        selectBatch(state.currentBatch);
    }
    
    // THE FIX: Turn on the glass wall here too!
    manageBackdrop(state.isTeacherMode);
}

 // REPLACE 'initTeacherSearch' in app.js
function initTeacherSearch() {
    const input = document.getElementById('teacher-search');
    const list = document.getElementById('search-suggestions');
    if (!input || !list) return;

    const toggleOtherGroups = (show) => {
        const group2 = document.querySelector('.filter-group:nth-child(2)');
        const group3 = document.querySelector('.filter-group:nth-child(3)');
        const displayValue = show ? 'flex' : 'none';
        if (group2) group2.style.display = displayValue;
        if (group3) group3.style.display = displayValue;
        
        if (!show) {
            list.style.position = 'relative';
            list.style.boxShadow = 'none';
            list.style.border = 'none';
        } else {
            list.style.position = '';
            list.style.boxShadow = '';
            list.style.border = '';
        }
    };

    input.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase().trim();
        list.innerHTML = ''; 

        if (val.length < 1) {
            toggleOtherGroups(true); 
            return;
        }
        toggleOtherGroups(false);

        let allResults = [];

        // 1. Add Teachers
        if (typeof facultyNames !== 'undefined') {
            Object.entries(facultyNames).forEach(([code, name]) => 
                allResults.push({ type: 'teacher', code, name, source: '62' }));
        }
        if (typeof facultyNames128 !== 'undefined') {
            Object.entries(facultyNames128).forEach(([code, name]) => 
                allResults.push({ type: 'teacher', code, name, source: '128' }));
        }

        // 2. Add Rooms
        if (typeof ROOM_LOCATIONS !== 'undefined') {
            Object.entries(ROOM_LOCATIONS).forEach(([code, location]) => {
                allResults.push({ type: 'room', code: code, name: location });
            });
        }

        // 3. Filter Matches
        let matches = allResults.filter(item => 
            item.code.toLowerCase().includes(val) || 
            item.name.toLowerCase().includes(val)
        );

        // 4. Sort
        matches.sort((a, b) => {
             const aCodeStart = a.code.toLowerCase().startsWith(val);
             const bCodeStart = b.code.toLowerCase().startsWith(val);
             if (aCodeStart && !bCodeStart) return -1;
             if (!aCodeStart && bCodeStart) return 1;
             return a.name.localeCompare(b.name);
        });

        if (matches.length === 0) {
            list.innerHTML = '<div style="padding:15px; opacity:0.6;">No matches found</div>';
        } else {
             matches.slice(0, 15).forEach(item => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                
                if (item.type === 'teacher') {
                    // --- TEACHER CLICK ---
                    const codeDisplay = item.source === '128' ? `${item.code} (128)` : item.code;
                    div.innerHTML = `<span class="s-code">${codeDisplay}</span> <span class="s-name">${item.name}</span>`;
                    div.onclick = () => {
                        loadTeacherSchedule(item.code, item.name);
                        input.value = `${item.name} (${codeDisplay})`;
                        list.innerHTML = '';
                        
                        if (dom.filterPanel) {
                            dom.filterPanel.classList.remove('expanded');
                            dom.filterPanel.style.zIndex = ''; 
                            dom.filterPanel.style.position = '';
                        }
                        if (dom.filterArrow) dom.filterArrow.textContent = '▼';
                        
                        // Remove the invisible backdrop so you can interact with the table
                        if (typeof manageBackdrop === 'function') manageBackdrop(false);
                        
                        setTimeout(() => toggleOtherGroups(true), 300);
                    };
                } else {
                    // --- ROOM CLICK ---
                    div.innerHTML = `<span class="s-code">📍 ${item.code}</span> <span class="s-name" style="font-size:0.8rem">${item.name}</span>`;
                    div.onclick = () => {
                        openRoomModal(item.code, item.name);
                        input.value = ''; // Clear input for next search
                        list.innerHTML = '';
                        
                        // DO NOT CLOSE PANEL for Rooms
                        // The User stays in "Search Mode" to look up more rooms if they want.
                        
                        setTimeout(() => toggleOtherGroups(true), 300);
                    };
                }
                list.appendChild(div);
            });
        }
    });
}
  function handleWheel(e) {
    if (state.currentView !== 'swipe') return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      if (Math.abs(e.deltaX) < 20) return;
      if (state.wheelCooldown) return;
      state.wheelCooldown = true;
      setTimeout(() => { state.wheelCooldown = false; }, 800);
      if (e.deltaX > 0) {
        jumpToDay(state.currentDayIndex < state.totalDays - 1 ? state.currentDayIndex + 1 : 0);
      } else {
        jumpToDay(state.currentDayIndex > 0 ? state.currentDayIndex - 1 : state.totalDays - 1);
      }
    }
  }

  function loadTeacherSchedule(targetCode, teacherName) {
    if (dom.selectedBatchLabel) dom.selectedBatchLabel.textContent = `Teacher: ${targetCode}`;
    if (dom.floatingBatch) dom.floatingBatch.textContent = `PROF. ${targetCode}`;

    const slotMap = new Map();
    if (typeof scheduleMap !== 'undefined') {
        Object.keys(scheduleMap || {}).forEach(semId => {
          const semBatches = scheduleMap[semId];
          Object.keys(semBatches || {}).forEach(batchName => {
            const batchClasses = semBatches[batchName];
            batchClasses.forEach(cls => {
               const teachers = cls.teacher.split(/[/,]/).map(t => t.trim());
               if (teachers.includes(targetCode)) {
                   const key = `${cls.day}-${cls.start}`;
                   if (!slotMap.has(key)) {
                      slotMap.set(key, { ...cls, batchNames: [batchName] });
                   } else {
                       const existing = slotMap.get(key);
                       if (!existing.batchNames.includes(batchName)) {
                           existing.batchNames.push(batchName);
                       }
                   }
               }
            });
          });
        });
      }

    const aggregatedSchedule = Array.from(slotMap.values()).map(cls => {
        const fullName = getSubjectFullTitle(cls.title, cls.type) || cls.title;
        const uniqueBatches = cls.batchNames.sort((a, b) => 
            a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
        );
        return {
            ...cls,
            title: `${fullName} (${uniqueBatches.join(', ')})` 
        };
    });
    state.currentSchedule = aggregatedSchedule;
    renderMobileView();
    renderDesktopView();
    jumpToDay(state.currentDayIndex);
  }
// --- NEW: Force Check Function ---
  function forceUpdateCheck() {
    console.log("Checking for updates...");
    // We add ?t=Timestamp to force the browser to actually ask the network
    fetch(`./js/data.js?t=${Date.now()}`)
        .then(() => console.log("Check complete"))
        .catch(() => console.log("Check failed (offline)"));
  }
  // Public API
    return {
      init,
      toggleFilterPanel,
      toggleTheme,
      selectBatch,
      setViewMode,
      manualJumpToDay,
      toggleSemester,
      toggleSeries,
      toggleBatchGrid,
        forceUpdateCheck
    };
})();

// Start
document.addEventListener('DOMContentLoaded', () => {
    TimetableApp.init();
    
    // Check for updates immediately on load
    setTimeout(() => TimetableApp.forceUpdateCheck(), 1000); 
});

// Check for updates whenever internet comes back
window.addEventListener('online', () => {
    console.log("Back online! Checking for data...");
    TimetableApp.forceUpdateCheck();
});
