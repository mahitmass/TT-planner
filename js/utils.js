// ==================== UTILITIES ====================

// 1. Storage Wrapper (Handles LocalStorage)
const Storage = {
  get: (key, defaultValue) => {
    try {
      const val = localStorage.getItem(key);
      return val ? val : defaultValue;
    } catch (e) {
      console.error("Storage access failed", e);
      return defaultValue;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error("Storage save failed", e);
    }
  }
};

// 2. Date/Time Helpers
const DateTime = {
  getCurrentDay: () => new Date().getDay(), // 0=Sun, 1=Mon...
  getCurrentHour: () => new Date().getHours(),
  getCurrentMinute: () => new Date().getMinutes()
};

// 3. Debounce (Optimizes Resize Events)
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// 4. Data Formatters
// Safe access to global data objects defined in data.js

function getTeacherDisplayName(code) {
  if (!code) return "TBA";

  // 1. Try finding in the Standard (62) List
  if (typeof facultyNames !== 'undefined' && facultyNames[code]) {
    return facultyNames[code];
  }

  // 2. Try finding in the 128 List (NEW ADDITION)
  if (typeof facultyNames128 !== 'undefined' && facultyNames128[code]) {
    return facultyNames128[code];
  }

  // 3. Handle combined names like "NG / INC"
  if (code.includes('/')) {
    return code.split('/')
      .map(part => {
        const trimmed = part.trim();
        // Check both lists for each part
        if (typeof facultyNames !== 'undefined' && facultyNames[trimmed]) return facultyNames[trimmed];
        if (typeof facultyNames128 !== 'undefined' && facultyNames128[trimmed]) return facultyNames128[trimmed];
        return trimmed;
      })
      .join(' / ');
  }
  
  return code;
}

function getSubjectFullTitle(code, type) {
  // Special overrides
  if (code === "GE112") return type === "lab" ? "Workshop Lab" : "Workshop";
  if (code === "HS111") return type === "lab" ? "Life Skills" : "UHV";
  
  // Lookup in global subjectNames
  if (typeof subjectNames !== 'undefined' && subjectNames[code]) {
    return subjectNames[code];
  }
  return code;
}

function formatTimeRange(start, duration) {
  const format = (h) => {
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hr = h % 12 || 12;
    return `${hr < 10 ? '0' + hr : hr}:00`;
  };
  
  const endTime = start + duration;
  const endFormat = (h) => {
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hr = h % 12 || 12;
    return `${hr < 10 ? '0' + hr : hr}:50 ${ampm}`;
  };

  // e.g., "09:00 - 09:50 AM"
  return `${format(start)} - ${endFormat(endTime - 1)}`;
}

