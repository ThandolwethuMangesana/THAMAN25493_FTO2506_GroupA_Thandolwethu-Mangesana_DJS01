import { podcasts, genres }  from './data.js';
import { Modal } from './modals.js';

const grid = document.getElementById('podcastGrid');
const genreSelect = document.getElementById('genre');

// Build a quick lookup map of genre IDs to their titles
const genreMap = {};
genres.forEach(g => {
  genreMap[g.id] = g.title;
});

// Initialize the modal instance with podcast and genre data
const podcastModal = new Modal('podcastModal', { genreMap, podcasts });

/**
 * Utility to create a DOM element with optional configuration.
 * @param {string} tag - The HTML tag name (e.g., 'div', 'p', 'h3').
 * @param {Object} [options={}] - Options for the element.
 * @param {string} [options.className] - CSS class names.
 * @param {string} [options.content] - Inner HTML/text content.
 * @param {Object} [options.attrs] - Attributes to set on the element.
 * @param {HTMLElement[]} [options.children] - Child elements to append.
 * @param {Object} [options.events] - Event listeners to attach.
 * @returns {HTMLElement} The created DOM element.
 */
function createElement(tag, options = {}) {
  const el = document.createElement(tag);
  if (options.className) el.className = options.className;
  if (options.content) el.innerHTML = options.content;
  if (options.attrs) {
    for (const [key, value] of Object.entries(options.attrs)) {
      el.setAttribute(key, value);
    }
  }
  if (options.children) options.children.forEach(child => el.appendChild(child));
  if (options.events) {
    for (const [event, handler] of Object.entries(options.events)) {
      el.addEventListener(event, handler);
    }
  }
  return el;
}

/**
 * Formats an ISO date string into a human-friendly "Updated X days ago" style.
 * @param {string} isoString - ISO date string.
 * @returns {string} A formatted relative or absolute date string.
 */
function formatDate(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diff === 0) return 'Updated today';
  if (diff === 1) return 'Updated yesterday';
  if (diff <= 30) return `Updated ${diff} days ago`;

  return `Updated on ${date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })}`;
}

/**
 * Creates a container of genre tags for a podcast.
 * @param {number[]} genreIds - Array of genre IDs.
 * @returns {HTMLElement} A div containing span tags for each genre.
 */
function createTags(genreIds = []) {
  const tagContainer = createElement('div', { className: 'tags' });
  genreIds.forEach(id => {
    const name = genreMap[id] || `Genre ${id}`;
    const tag = createElement('span', { className: 'tag', content: name });
    tagContainer.appendChild(tag);
  });
  return tagContainer;
}

/**
 * Opens the modal with details for a podcast or genre.
 * @param {Object} item - The podcast or genre object.
 * @param {'podcast'|'genre'} [type='podcast'] - Type of item to display.
 */
function openModal(item, type = 'podcast') {
  podcastModal.open(item, type === 'genre');
}

/**
 * Builds a card element for either a podcast or a genre.
 * @param {Object} item - The podcast or genre data.
 * @param {'podcast'|'genre'} [type='podcast'] - Type of card to create.
 * @returns {HTMLElement} The card element.
 */
function createCard(item, type = 'podcast') {
  if (type === 'podcast') {
    const cover = createElement('div', {
      className: 'cover',
      children: [createElement('img', { attrs: { src: item.image, alt: `${item.title} Cover` } })]
    });
    const title = createElement('h3', { content: item.title });
    const meta = createElement('p', { className: 'meta', content: `📅 ${item.seasons} seasons` });
    const tags = createTags(item.genres);
    const updated = createElement('p', { className: 'updated', content: formatDate(item.updated) });

    return createElement('div', {
      className: 'card',
      children: [cover, title, meta, tags, updated],
      events: { click: () => openModal(item, 'podcast') }
    });
  } else {
    const title = createElement('h3', { content: item.title });
    const desc = createElement('p', { content: item.description });

    return createElement('div', {
      className: 'card genre-card',
      children: [title, desc],
      events: { click: () => openModal(item, 'genre') }
    });
  }
}

/**
 * Renders a list of podcasts or genres into the grid.
 * @param {Object[]} items - Array of items to render.
 * @param {'podcast'|'genre'} [type='podcast'] - Type of items to render.
 */
function renderItems(items, type = 'podcast') {
  grid.innerHTML = '';
  if (items.length === 0) {
    grid.appendChild(createElement('p', { content: 'No items found.' }));
    return;
  }
  items.forEach(item => grid.appendChild(createCard(item, type)));
}

/**
 * Filters podcasts by a selected genre ID.
 * @param {Object[]} items - Array of podcasts.
 * @param {string} genreId - Genre ID or 'all'.
 * @returns {Object[]} Filtered list of podcasts.
 */
function filterByGenre(items, genreId) {
  if (genreId === 'all') return items;
  const id = Number(genreId);
  if (isNaN(id)) return items;
  return items.filter(item => item.genres.includes(id));
}

/**
 * Populates the genre dropdown filter with available genres.
 */
function populateGenreFilter() {
  genreSelect.innerHTML = `<option value="all">All Genres</option>`;
  genres.forEach(g => {
    const option = createElement('option', { content: g.title, attrs: { value: g.id } });
    genreSelect.appendChild(option);
  });
}

// Handle genre filter changes
genreSelect.addEventListener('change', (e) => {
  const filtered = filterByGenre(podcasts, e.target.value);
  renderItems(filtered, 'podcast');
});

// Initialize the UI with genres and podcasts
populateGenreFilter();
renderItems(podcasts, 'podcast');