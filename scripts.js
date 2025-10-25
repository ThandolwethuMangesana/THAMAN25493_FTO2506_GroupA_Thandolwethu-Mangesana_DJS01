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


