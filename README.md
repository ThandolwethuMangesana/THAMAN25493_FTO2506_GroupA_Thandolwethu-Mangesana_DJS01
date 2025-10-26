#  Podcast Stream

Podcast Stream is a responsive, accessible, and interactive web app that allows users to discover and explore podcasts with ease.
It was built with vanilla HTML, CSS, and JavaScript, and emphasizes clean code structure, usability, and a polished user interface.

## Overview

the goal was to design and build a responsive web application that allows users to **browse podcast shows** on a landing page and **view detailed information** in a modal. The application should display clear, concise previews of podcast shows and offer additional information through a modal pop-up, **all without navigating away from the page**. Your app should showcase clean code architecture and strong UI/UX design while following JavaScript best practices.

---

## Core Objectives

### 1. Landing Page – Podcast Previews

- Display a list of podcast shows on the landing page.
- Each podcast preview must include:
  - Cover image
  - Show title
  - Number of seasons
  - Genre names
  - Last updated date (in a human-readable format)

### 2. Modal View – Show Details

- When a user clicks on a podcast preview, open a modal.
- The modal should include:
  - Larger cover image
  - Podcast title
  - Description of the show
  - Genre tags
  - Last updated date (readable format)
  - List of season titles
  - Number of episodes in each season
- Include a clear and accessible way to **close the modal**.

---
### 📱 Responsive Design
- **Desktop:** Grid supports up to 8 podcasts per row with two rows visible.
- **Tablet:** Grid adapts to 2–4 cards per row.
- **Mobile:** Grid collapses into 1–2 cards per row for readability.
- Modal scales fluidly to fit smaller screens.

---

## Technical Requirements

[![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5)](https://developer.mozilla.org/en-US/docs/Web/HTML) 
[![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS) 
[![JavaScript](https://img.shields.io/badge/-JavaScript-323330?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## Podcast Modal

- Opens when a card is clicked or focused + Enter pressed.
- Contains:
  - arge podcast cover image
  - Title & description
  - Genre tags styled as pills
  - Last updated information
  - Seasons list with episode counts
- If no seasons are available, the modal gracefully informs the user.
- Modal can be dismissed by:
  - Clicking the close button
  - Clicking the overlay background
  - Pressing the Esc key



---

```plaintext
PodcastExplorer/
│
├── index.html      # Main HTML template
├── styles.css      # Stylesheet for layout, grid, modal, and responsiveness
├── data.js         # Dataset with podcasts, genres, and seasons
├── modals.js       #  Core application logic( modal handling)
├── app.js          # Core application logic (rendering, filtering, sorting)
└── README.md       # Documentation
