import { podcasts } from './scripts.js';
import { modal  from } './modals.js';

const grid = document.getElementById('podcast-grid');
const genreFilter = document.getElementById('genre');

// Map genre IDs to titles
const genreMap = {};
genres.forEach(g => {
    genreMap[g.id] = g.title;
});

// setup modal
const podcastModal = new modal('podcast-modal', {genreMap, podcasts});

/**
 *  *create a DOM element for a podcast card
 * * @param {Object} podcast - Element options: classNames, content, attributes, children, events.
 * * @returns {HTMLElement} - The podcast card element
 */

function createElement(tag, options = {}) {
    const element = document.createElement(tag);
if (options.classNames) element.className = options.classNames;
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
