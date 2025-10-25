import { podcasts } from './scripts.js';
import { modal  from } './modals.js';

const grid = document.getElementById('podcast-grid');
const genreFilter = document.getElementById('genre');

// Map genre IDs to titles
const genreMap = {};
genres.forEach(g => {
    genreMap[g.id] = g.title;
});

// set up modal
const podcastModal = new modal('podcast-modal', {genreMap, podcasts});

/* change ISO date to readable format */
function formatDate(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diff === 0) return 'Updated today';
  if (diff === 1) return 'Updated yesterday';
  if (diff <= 30) return `Updated ${diff} days ago`;

  return `Updated on ${date.toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })};
}

/* create podcast cards */
function createElement(tag, options = {}) {
  const element = document.createElement(tag);
  if (options.className) element.className = options.className;
  if (options.content) element.innerHTML = options.content;
  if (options.attributes) {
    for (const [key, value] of Object.entries(options.attributes)) {
      element.setAttribute(key, value);
    }
  }
  if (options.children) options.children.forEach(child => element.appendChild(child));
  if (options.events) {
    for (const [event, handler] of Object.entries(options.events)) {
      element.addEventListener(event, handler);
    }
  }
  return element;
}

fun



