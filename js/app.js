// ==================== TIMETABLE APPLICATION ====================
const TimetableApp = (function() {
  // Private state
  let state = {
    currentSchedule: [],
    currentDayIndex: 0,
    currentBatch: 'A1',
    currentView: 'swipe',
    isDragging: false,
    startX: 0,
    startY: 0,
    currentTranslate: 0,
    prevTranslate: 0,
    totalDays: 6, // Mon-Sat
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    activeHighlightInterval: null,
    isVerticalScroll: false,
    isVerticalScrollPossible: false,
    initialScrollTop: 0
  };

  // DOM Elements cache
  const dom = {
    daysTrack: null,
    timetableContainer: null,
    compactContainer: null,
    tableBody: null,
    batchGrid: null,
    selectedBatchLabel: null,
    floatingBatch: null,
    filterArrow: null,
    filterPanel: null,
    dropdownArrow: null,
    dropdownContent: null,
    batchDropdownTrigger: null
  };

  // ==================== INITIALIZATION ====================
  function init() {
    console.log('Initializing Timetable App...');
    cacheDOMElements();
    loadSavedPreferences();
    setupEventListeners();
    initializeBatchDropdown();
    
    // RENDER
    renderInitialViews();
    
    // START SERVICES
    startActiveHighlighting();
    setupServiceWorker();
    
    // FIX LAYOUT & HIGHLIGHT AFTER LOAD
    setTimeout(() => {
        handleResize(); // Fixes "half-view" alignment
        jumpToDay(state.currentDayIndex);
        highlightActiveClass();
    }, 200);
  }

  function cacheDOMElements() {
    dom.daysTrack = document.getElementById('daysTrack');
    dom.timetableContainer = document.getElementById('timetable-container');
    dom.compactContainer = document.getElementById('compact-container');
    dom.tableBody = document.querySelector('.weekly-table tbody');
    dom.batchGrid = document.getElementById('batchGrid');
    //dom.selectedBatchLabel = document.getElementById('selected-batch-label');
    dom.floatingBatch = document.getElementById('floating-batch');
    dom.filterArrow = document.getElementById('filter-arrow');
    dom.filterPanel = document.getElementById('filter-panel');
    //dom.dropdownArrow = document.getElementById('dropdown-arrow');
    dom.dropdownContent = document.getElementById('batch-dropdown-content');
    //dom.batchDropdownTrigger = document.getElementById('batch-dropdown-trigger');
  }

  function loadSavedPreferences() {
    // 1. Load Batch
    const savedBatch = Storage.get('selectedBatch', 'A1');
    state.currentBatch = savedBatch;
    
    // Load schedule from global variable in data.js
    if (typeof scheduleMap !== 'undefined' && scheduleMap[savedBatch]) {
        state.currentSchedule = scheduleMap[savedBatch];
    } else {
        // Safe fallback if data.js isn't ready yet
        state.currentSchedule = (typeof scheduleA1 !== 'undefined') ? scheduleA1 : [];
    }
    
    // 2. Load View Mode
    const savedView = Storage.get('preferredView', 'swipe');
    state.currentView = savedView;
    
    // 3. Load Theme
    const savedTheme = Storage.get('theme', 'dark');
    document.body.setAttribute('data-theme', savedTheme);
    const themeBtn = document.getElementById('theme-btn');
    if(themeBtn) themeBtn.textContent = savedTheme === 'dark' ? '☀' : '🌙';
    
    // 4. Set Day to Today
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
  }

  function setupServiceWorker() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch(err => console.log("SW Fail", err));
    }
  }

  // ==================== RENDERING ====================
  function renderInitialViews() {
    updateBatchLabels(state.currentBatch);
    updateBatchUI();
    setViewMode(state.currentView); 
    renderMobileView();
    renderDesktopView();
  }

  function updateBatchLabels(batchName) {
      if (dom.selectedBatchLabel) dom.selectedBatchLabel.textContent = `Batch ${batchName}`;
      if (dom.floatingBatch) dom.floatingBatch.textContent = `BATCH ${batchName}`;
  }

  function renderMobileView() {
    if (!dom.daysTrack) return;
    dom.daysTrack.innerHTML = '';
    
    for (let day = 1; day <= 6; day++) {
      const dayView = createDayView(day);
      dom.daysTrack.appendChild(dayView);
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
    classes.forEach((cls, index) => {
      // Logic for gaps/breaks
      if (index > 0 && cls.start > lastEndTime) {
        const gapStart = lastEndTime;
        const gapEnd = cls.start;
        
        if (gapStart <= 12 && gapEnd >= 13) {
          if (12 > gapStart) container.appendChild(createBreakCard(gapStart, 12, "Break"));
          container.appendChild(createBreakCard(12, 13, "Lunch Break"));
          if (gapEnd > 13) container.appendChild(createBreakCard(13, gapEnd, "Break"));
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
    
    // Attributes used by Highlighter
    card.dataset.startHour = cls.start.toString();
    card.dataset.day = cls.day.toString();
    
    card.innerHTML = `
      <div class="time-slot">${formatTimeRange(cls.start, cls.duration)}</div>
      <div class="subject-name">${displayTitle}</div>
      <div class="card-footer">
        <span class="info-badge">🏛 ${cls.code}</span>
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

  // --- DESKTOP VIEW ---
  function renderDesktopView() {
    if (!dom.tableBody) return;
    dom.tableBody.innerHTML = '';
    const hours = [9, 10, 11, 12, 13, 14, 15, 16];
    const occupiedCells = new Set();

   hours.forEach(hour => {
      const row = document.createElement('tr');
      row.setAttribute('data-hour', hour); 

      const timeCell = document.createElement('td');
      const displayHour = hour % 12 || 12;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hStr = displayHour < 10 ? '0' + displayHour : displayHour;

      // DELETE the old timeCell.textContent line and PASTE this instead:
     timeCell.innerHTML = `
        <div style="line-height: 1.1;">
            ${hStr}:00<br>
            <span style="font-size: 0.85em; opacity: 0.7;">${hStr}:50</span>
        </div>
        <div style="font-size: 0.75em; margin-top: 4px; opacity: 0.6;">${ampm}</div>
      `;
      row.appendChild(timeCell);

      for (let day = 1; day <= 6; day++) {
        const cellKey = `${hour}-${day}`;
        if (occupiedCells.has(cellKey)) continue;
        
        const cls = state.currentSchedule.find(s => s.day === day && s.start === hour);
        
        if (cls) {
          const cell = createTableCell(cls);
          if (cls.duration > 1) {
            for (let i = 1; i < cls.duration; i++) occupiedCells.add(`${hour + i}-${day}`);
          }
          row.appendChild(cell);
        } else {
          // Fix for empty cells
          const cell = createEmptyTableCell(day, hour);
          row.appendChild(cell);
        }
      }
      dom.tableBody.appendChild(row);
    });
  }

  function createTableCell(cls) {
    const cell = document.createElement('td');
    cell.setAttribute('data-day', cls.day);
    cell.className = `cell-${cls.type}`;
    if (cls.duration > 1) cell.rowSpan = cls.duration;
    const displayTitle = getSubjectFullTitle(cls.title, cls.type) || cls.title;
    cell.innerHTML = `<span class="cell-subject" title="${displayTitle}">${displayTitle}</span><span class="cell-room">${cls.code}</span>`;
    return cell;
  }

  function createEmptyTableCell(day, hour) {
    const cell = document.createElement('td');
    cell.setAttribute('data-day', day);
    if (hour === 12) {
      cell.className = 'cell-break';
      cell.innerHTML = '<span style="font-size:0.6rem; opacity:0.5;">LUNCH</span>';
    }
    return cell;
  }

// --- BATCH MANAGEMENT WITH TABS ---
  
  let currentBatchType = '62'; // Default to 62 series

  // --- NEW BATCH LOGIC ---

  // --- NEW CUSTOM UI BATCH LOGIC ---

 // --- BATCH MANAGEMENT (FIXED SORTING & LOGIC) ---

  function initializeBatchDropdown() {
    const current = state.currentBatch;
    // Auto-detect series (128 if starts with F, E, H)
    const is128 = /^[FEH]/.test(current);
    
    const seriesBtn = document.getElementById('series-text');
    if (seriesBtn) seriesBtn.textContent = is128 ? "128 Series" : "62 Series";
    
    updateTriggerText();
    populateBatchGrid(is128 ? "128" : "62");
  }

  function toggleSeries() {
    const seriesText = document.getElementById('series-text');
    if (!seriesText) return;

    // 1. Toggle the Logic
    const isCurrently62 = seriesText.textContent.includes("62");
    const newType = isCurrently62 ? "128" : "62";

    // 2. Update the Button Text
    seriesText.textContent = `${newType} Series`;

    // 3. Update the Grid Data silently (DO NOT OPEN)
    populateBatchGrid(newType);
    
    // (Removed the line that forced it to open)
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

  function populateBatchGrid(forcedType) {
    const grid = document.getElementById('floating-batch-grid');
    const seriesText = document.getElementById('series-text');
    
    // Determine type (use forced, or read from button)
    const type = forcedType || (seriesText?.textContent.includes("128") ? "128" : "62");

    if (!grid || typeof scheduleMap === 'undefined') return;

    grid.innerHTML = '';

    // 1. Get Keys
    const allBatches = Object.keys(scheduleMap);

    // 2. Filter by Type
    const filteredBatches = allBatches.filter(b => {
        return type === "128" ? /^[EFH]/.test(b) : /^[ABCDG]/.test(b);
    });

    // 3. NATURAL SORT (The Fix for A1 -> A2 -> A10)
    filteredBatches.sort((a, b) => {
        return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    });

    // 4. Generate Buttons
    filteredBatches.forEach(batch => {
        const btn = document.createElement('button');
        btn.className = 'batch-btn';
        if(batch === state.currentBatch) btn.classList.add('active-batch');
        btn.textContent = batch;
        
        btn.onclick = () => {
            selectBatch(batch);
            toggleBatchGrid(false); // Close menu
        };
        grid.appendChild(btn);
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

  // Ensure selectBatch updates everything
  const originalSelectBatch = selectBatch; // Backup if needed logic exists there
  
  function selectBatch(batchName) {
    state.currentBatch = batchName;
    if (typeof scheduleMap !== 'undefined' && scheduleMap[batchName]) {
        state.currentSchedule = scheduleMap[batchName];
    }
    Storage.set('selectedBatch', batchName);
    
    updateBatchLabels(batchName);
    updateTriggerText(); 
    updateGridSelection();
    // Renders
    renderMobileView();
    renderDesktopView();
    setTimeout(() => {
        highlightActiveClass();
        jumpToDay(state.currentDayIndex);
    }, 50);
  }

  function updateBatchUI() {
    document.querySelectorAll('.batch-btn').forEach(btn => {
      btn.classList.toggle('active-batch', btn.textContent === state.currentBatch);
    });
  }

  // ==================== VIEW MODE ====================
  function setViewMode(mode) {
    state.currentView = mode;
    Storage.set('preferredView', mode);
    
    document.querySelectorAll('#btn-swipe, #btn-table').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-${mode}`);
    if(activeBtn) activeBtn.classList.add('active');
    
    if (mode === 'swipe') {
      dom.timetableContainer.classList.remove('hidden-view');
      dom.compactContainer.classList.add('hidden-view');
      // Recalculate layout on view switch
      setTimeout(() => {
          handleResize();
          jumpToDay(state.currentDayIndex);
      }, 50);
    } else {
      dom.timetableContainer.classList.add('hidden-view');
      dom.compactContainer.classList.remove('hidden-view');
    }
  }

  // ==================== NAVIGATION (FIXED LOOP & WIDTH) ====================
  function jumpToDay(index) {
    if (index < 0 || index >= state.totalDays) return;
    state.currentDayIndex = index;
    
    // FIX: Use offsetWidth instead of window.innerWidth to handle scrollbars/notches
    const trackWidth = dom.timetableContainer ? dom.timetableContainer.offsetWidth : window.innerWidth;
    state.currentTranslate = index * -trackWidth;
    state.prevTranslate = state.currentTranslate;
    
    if (dom.daysTrack) {
      dom.daysTrack.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1)';
      dom.daysTrack.style.transform = `translateX(${state.currentTranslate}px)`;
    }
    
    document.querySelectorAll('.day-btn').forEach(btn => {
      btn.classList.toggle('active-day', parseInt(btn.dataset.day) === index + 1);
    });
  }

  function manualJumpToDay(dayNumber) {
    jumpToDay(dayNumber - 1);
  }

  // ==================== HIGHLIGHTING ====================
  function highlightActiveClass() {
    document.querySelectorAll('.active-now').forEach(el => el.classList.remove('active-now'));
    
    const currentDay = DateTime.getCurrentDay();
    const currentHour = DateTime.getCurrentHour();
    
    if (currentDay >= 1 && currentDay <= 6) {
      const activeClass = state.currentSchedule.find(cls => 
        cls.day === currentDay && 
        currentHour >= cls.start && 
        currentHour < (cls.start + cls.duration)
      );

      if (activeClass) {
        // Highlight Mobile
        const dayView = document.querySelector(`#day-${currentDay}`);
        if (dayView) {
          const card = dayView.querySelector(`.class-card[data-start-hour="${activeClass.start}"]`);
          if (card) {
              card.classList.add('active-now');
   const dayView = card.closest('.day-view');
if (dayView) {
  dayView.scrollTo({
    top: card.offsetTop - dayView.clientHeight / 2 + card.clientHeight / 2,
    behavior: 'smooth'
  });
}
          }
        }
        // Highlight Table
        const row = document.querySelector(`.weekly-table tr[data-hour="${activeClass.start}"]`);
        if (row) {
         const cell = row.querySelector(`td[data-day="${currentDay}"]`);
          if (cell && !cell.classList.contains('cell-break')) {
              cell.classList.add('active-now');
          }
        }
      }
    }
  }

  function startActiveHighlighting() {
    highlightActiveClass();
    state.activeHighlightInterval = setInterval(highlightActiveClass, 60000);
  }

  // ==================== SWIPE LOGIC (FIXED LOOP) ====================
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
    
    // FIX: ADDED LOOP LOGIC HERE
    if (movedBy < -threshold) {
      // Next Day (Loop to Mon if at Sat)
      state.currentDayIndex = (state.currentDayIndex < state.totalDays - 1) ? state.currentDayIndex + 1 : 0;
    } else if (movedBy > threshold) {
      // Prev Day (Loop to Sat if at Mon)
      state.currentDayIndex = (state.currentDayIndex > 0) ? state.currentDayIndex - 1 : state.totalDays - 1;
    }
    
    jumpToDay(state.currentDayIndex);
  }

  // ==================== UI CONTROLS ====================
  function toggleFilterPanel() {
    // 1. Toggle the main panel
    const isExpanded = dom.filterPanel.classList.toggle('expanded');
    
    // 2. Update the arrow icon
    if (dom.filterArrow) {
      dom.filterArrow.textContent = isExpanded ? '▲' : '▼';
    }

    // 3. THE FIX: Use 'toggleBatchGrid', NOT 'toggleBatchDropdown'
    toggleBatchGrid(false); 
  }

  function handleOutsideClick(e) {
    const filterPanel = dom.filterPanel;
    const toggleBtn = document.querySelector('.filter-toggle-btn'); // The "FILTERS" button

    // Check if the panel is currently OPEN
    if (filterPanel && filterPanel.classList.contains('expanded')) {
      
      // logic: If the click is NOT inside the panel AND NOT on the button itself...
      if (!filterPanel.contains(e.target) && !toggleBtn.contains(e.target)) {
        toggleFilterPanel(); // ...then close it.
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

  function handleResize() {
    jumpToDay(state.currentDayIndex);
  }

  function handleKeyboardNavigation(e) {
    if (state.currentView !== 'swipe') return;
    if (e.key === 'ArrowRight') jumpToDay(state.currentDayIndex < 5 ? state.currentDayIndex + 1 : 0);
    if (e.key === 'ArrowLeft') jumpToDay(state.currentDayIndex > 0 ? state.currentDayIndex - 1 : 5);
  }
// ==================== TRACKPAD SWIPE LOGIC ====================
  function handleWheel(e) {
    // Only active in Swipe view
    if (state.currentView !== 'swipe') return;

    // Check if movement is horizontal (horizontal delta > vertical delta)
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      
      // Prevent browser back/forward navigation
      e.preventDefault();

      // Threshold check (ignore tiny accidental movements)
      if (Math.abs(e.deltaX) < 20) return;

      // Cooldown check (prevent one swipe triggering 10 day jumps)
      if (state.wheelCooldown) return;

      // Set cooldown
      state.wheelCooldown = true;
      setTimeout(() => { state.wheelCooldown = false; }, 800); // 800ms delay

      // Determine Direction
      if (e.deltaX > 0) {
        // Swiping Right -> Go to Next Day
        // Logic: (Current + 1) or Loop back to 0
        jumpToDay(state.currentDayIndex < state.totalDays - 1 ? state.currentDayIndex + 1 : 0);
      } else {
        // Swiping Left -> Go to Prev Day
        // Logic: (Current - 1) or Loop to last day
        jumpToDay(state.currentDayIndex > 0 ? state.currentDayIndex - 1 : state.totalDays - 1);
      }
    }
  }
 // Public API
  return {
    init,
    toggleFilterPanel,
    toggleTheme,
    selectBatch,
    setViewMode,
    manualJumpToDay,
    // ENSURE THESE ARE HERE:
    toggleSeries,
    toggleBatchGrid
  };
})();
// Start
document.addEventListener('DOMContentLoaded', TimetableApp.init);
















