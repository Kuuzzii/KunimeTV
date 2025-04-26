const API_KEY = '961334ce43e0adcaa714fddec89fcfd9';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/original';

const resultsDiv = document.getElementById('results');
const navLinks = document.querySelectorAll('nav a');
const searchInput = document.getElementById('searchInput');

function setActiveLink(clickedLink) {
  navLinks.forEach(link => link.classList.remove('active'));
  if(clickedLink) clickedLink.classList.add('active');
}

async function fetchTrending(type) {
  const res = await fetch(`${BASE_URL}/trending/${type}/week?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

async function fetchStreamingProviders(id, type) {
  const res = await fetch(`${BASE_URL}/${type}/${id}/watch/providers?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results?.US || {};
}

function createAnimeItem(item) {
  const type = item.media_type === 'movie' ? 'movie' : 'tv';
  const div = document.createElement('div');
  div.className = 'anime-item';
  div.innerHTML = `
    <a href="watch.html?id=${item.id}&type=${type}">
      <img src="${IMG_URL + item.poster_path}" alt="${item.title || item.name}" />
    </a>
    <div class="info">
      <div class="title">${item.title || item.name}</div>
      <div class="score">⭐ ${item.vote_average ?? 'N/A'}</div>
    </div>
  `;
  return div;
}

async function fetchAndDisplay(type) {
  resultsDiv.innerHTML = '';
  const list = await fetchTrending(type);
  if (!list.length) {
    resultsDiv.innerHTML = '<p>No results found.</p>';
    return;
  }
  list.forEach(item => {
    if(item.poster_path) {
      resultsDiv.appendChild(createAnimeItem(item));
    }
  });
}

async function search() {
  const query = searchInput.value.trim();
  resultsDiv.innerHTML = '';
  if (!query) {
    resultsDiv.innerHTML = '<p>Please enter a search term.</p>';
    return;
  }
  const res = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  const data = await res.json();
  if (!data.results.length) {
    resultsDiv.innerHTML = '<p>No results found.</p>';
    return;
  }
  data.results.forEach(item => {
    if(item.poster_path) {
      resultsDiv.appendChild(createAnimeItem(item));
    }
  });
}

// Default load anime trending on page load
async function loadAnime(event) {
  if(event) event.preventDefault();
  setActiveLink(event ? event.currentTarget : navLinks[0]);
  await fetchAndDisplay('tv'); // using 'tv' for anime+series
}

// Load popular (using movie trending for example)
async function loadPopular(event) {
  if(event) event.preventDefault();
  setActiveLink(event.currentTarget);
  await fetchAndDisplay('movie');
}

// Load 18+ (genre: Horror or Adult? TMDB genre id 27 is Horror, id 10752 war, etc. For demo pick one)
async function load18Plus(event) {
  if(event) event.preventDefault();
  setActiveLink(event.currentTarget);
  // Fetch 18+ genre movies - genre id 27 (Horror) as example
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27&sort_by=popularity.desc&include_adult=true&language=en-US`);
  const data = await res.json();
  resultsDiv.innerHTML = '';
  if(!data.results.length) {
    resultsDiv.innerHTML = "<p>No results found.</p>";
    return;
  }
  data.results.forEach(item => {
    if(item.poster_path) {
      resultsDiv.appendChild(createAnimeItem(item));
    }
  });
}

// Attach event listeners
navLinks[0].addEventListener('click', loadAnime);
navLinks[1].addEventListener('click', loadPopular);
navLinks[2].addEventListener('click', load18Plus);

document.querySelector('button[onclick="searchAnime()"]').addEventListener('click', search);
searchInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') search();
});

// Load anime trending on start
window.addEventListener('DOMContentLoaded', () => loadAnime());
