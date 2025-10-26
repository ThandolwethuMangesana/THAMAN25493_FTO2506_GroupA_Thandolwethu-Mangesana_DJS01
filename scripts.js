import { podcasts, genres } from './data.js';
import { Modal } from './modal.js';

const grid = document.getElementById('podcastGrid');
const genreSelect = document.getElementById('genre');


// Map genre IDs to titles
const genreMap = {};
genres.forEach(g => {
  genreMap[g.id] = g.title;
});

// set up modal
const podcastModal = new Modal('podcastModal', {genreMap, podcasts});

/**
 * Creates a DOM element with specified options.
 * @param {string} tag - HTML tag name.
 * @param {Object} [options={}] - Element options: className, content, attributes, children, events.
 * @returns {HTMLElement}
 */
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
  })}`;
}

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
 * open modals for podcast details
 * @param {Object} podcast - Podcast data object.
 * @param {'podcast'|'genre'} [type='podcast'] - Type of modal to open.
 */
function openModal(item, type = 'podcast') {
  podcastModal.open(item, type === 'genre');
}

/**
 * create podcast card
 * @param {object} item - Podcast data object.
 * @returns {HTMLElement} - Podcast card element.
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