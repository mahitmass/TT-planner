# Mass Planner (Batch Timetable)

[![Website](https://img.shields.io/badge/Website-Live-brightgreen.svg)](https://planner-mass.vercel.app/)

**Mass Planner** is a modern, interactive, and responsive Progressive Web App (PWA) for managing and viewing batch schedules.

## 🌟 Features

- **Progressive Web App (PWA):** Installable on mobile and desktop for a native-like experience. Includes offline support.
- **Multiple View Modes:** Switch between intuitive Swipe Cards (great for mobile) and a comprehensive Table View (great for desktop).
- **Batch Selection:** Easily filter and select your specific series and batch to view tailored schedules.
- **Teacher/Classroom Search Mode:** Quickly find schedules based on teacher names or classroom venues (e.g., ANK, Manoj, G2).
- **Theme Support:** Built-in Light and Dark modes to suit your viewing preference.
- **Day Navigation:** Quick jump buttons for Monday through Saturday.
- **Responsive Design:** Beautifully crafted to work seamlessly on devices of all sizes.

## 🚀 Live Demo

Check out the live application here: [https://planner-mass.vercel.app/](https://planner-mass.vercel.app/)

## 🛠️ Technology Stack

- **HTML5:** Semantic and accessible structure.
- **CSS3:** Custom responsive styling with CSS variables for theming.
- **JavaScript (Vanilla):** Core logic, DOM manipulation, and data handling.
- **PWA (Manifest & Service Worker):** For offline capabilities and app installation.

## 📂 Project Structure

```text
.
├── index.html          # Main HTML entry point
├── manifest.json       # PWA manifest
├── sw.js               # Service Worker for offline support
├── Logo.png            # App logo
├── css/
│   └── styles.css      # Core stylesheets
├── js/
│   ├── app.js          # Application logic and UI interaction
│   ├── data.js         # Timetable data
│   └── utils.js        # Helper functions
├── parser_tool/        # Tools for parsing raw timetable data
└── raw_data/           # Raw schedule data
```

## 👨‍💻 Author

Created by [Mahit](https://github.com/mahitmass).
