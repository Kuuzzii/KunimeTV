const API_KEY = '961334ce43e0adcaa714fddec89fcfd9';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/original';

const resultsDiv = document.getElementById('results');
const navLinks = document.querySelectorAll('nav a');

let currentItem = null;

// Helper to set active nav link
function setActiveNav(selectedLink) {
  navLinks.forEach(link => link.classList.remove('active'));
  if (selectedLink) selectedLink.classList.add('active');
}

// Fetch trending movie or TV
async function fetchTrending(type) {
  const res = await fetch(`${BASE_URL}/trending/${type}/week?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}
// Fetch Trending Anime: filter Japanese animation from TV trending 
async function fetchTrendingAnime() {
  const res = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results.filter(item => item.original_language === 'ja' && item.genre_ids.includes(16));
}
// Fetch popular movies
async function fetchPopular() {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}
// Fetch adult / 18+ movies (e.g. Horror genre 27 for demonstration)
async function fetchAdult() {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27&include_adult=true&sort_by=popularity.desc`);
  const data = await res.json();
  return data.results;
}
// Fetch streaming providers from TMDb
async function fetchStreamingProviders(id, type) {
  try {
    const res = await fetch(`${BASE_URL}/${type}/${id}/watch/providers?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results?.US || {};
  } catch {
    return {};
  }
}

// Create item card element (movie or TV)
function createItemCard(item) {
  const type = item.media_type === 'movie' || item.media_type === undefined ? 'movie' : 'tv'; 
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
// Display list of items into the container by ID
function displayList(items, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  items.forEach(item => {
    if (item.poster_path) {
      container.appendChild(createItemCard(item));
    }
  });
}
// Display banner with featured item and streaming providers
async function displayBanner(item) {
  if (!item) return;
  currentItem = item;
  document.getElementById('banner').style.backgroundImage = `url(${IMG_URL}${item.backdrop_path})`;
  document.getElementById('banner-title').textContent = item.title || item.name;
  document.getElementById('banner-description').textContent = item.overview || 'No description available.';
  const type = item.media_type === 'movie' || item.media_type === undefined ? 'movie' : 'tv';
  const providers = await fetchStreamingProviders(item.id, type);
  const watchBtnContainer = document.getElementById('banner-watch-btn');
  if (providers.flatrate && providers.flatrate.length > 0) {
    const names = providers.flatrate.map(p => p.provider_name).join(', ');
    watchBtnContainer.innerHTML = `<button class="play-btn" onclick="goToMoviePage()">Watch Now (${names})</button>`;
  } else {
    watchBtnContainer.innerHTML = '';
  }
}

// Redirect to watch page when play button or item clicked
function goToMoviePage() {
  if (!currentItem) return alert("No movie/show selected");
  const id = currentItem.id;
  const type = currentItem.media_type === 'movie' || currentItem.media_type === undefined ? 'movie' : 'tv';
  window.location.href = `watch.html?id=${id}&type=${type}`;
}

// Search via TMDb multi-search
async function performSearch() {
  const query = document.getElementById('searchInput').value.trim();
  resultsDiv.innerHTML = '';
  if (!query) {
    resultsDiv.innerHTML = '<p>Please enter a search term.</p>';
    return;
  }
  try {
    const res = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await res.json();
    if (!data.results.length) {
      resultsDiv.innerHTML = '<p>No results found.</p>';
      return;
    }
    data.results.forEach(item => {
      if (item.poster_path) resultsDiv.appendChild(createItemCard(item));
    });
  } catch {
    resultsDiv.innerHTML = '<p>Error fetching search results.</p>';
  }
}

// Load functions linked to nav items
async function loadTrending(type) {
  resultsDiv.innerHTML = '';
  setActiveNav(event ? event.currentTarget : null);
  const items = await fetchTrending(type);
  displayBanner(items[Math.floor(Math.random() * items.length)]);
  if (type === 'movie') {
    displayList(items, 'movies-list');
    clearOtherLists(['tvshows-list','anime-list','popular-list','adult-list']);
  } else if (type === 'tv') {
    displayList(items, 'tvshows-list');
    clearOtherLists(['movies-list','anime-list','popular-list','adult-list']);
  }
}

async function loadTrendingAnime() {
  resultsDiv.innerHTML = '';
  setActiveNav(event ? event.currentTarget : null);
  const anime = await fetchTrendingAnime();
  displayBanner(anime[Math.floor(Math.random() * anime.length)]);
  displayList(anime, 'anime-list');
  clearOtherLists(['movies-list','tvshows-list','popular-list','adult-list']);
}

async function loadPopular() {
  resultsDiv.innerHTML = '';
  setActiveNav(event ? event.currentTarget : null);
  const popular = await fetchPopular();
  displayBanner(popular[Math.floor(Math.random() * popular.length)]);
  displayList(popular, 'popular-list');
  clearOtherLists(['movies-list','tvshows-list','anime-list','adult-list']);
}

async function loadAdult() {
  resultsDiv.innerHTML = '';
  setActiveNav(event ? event.currentTarget : null);
  const adult = await fetchAdult();
  displayBanner(adult[Math.floor(Math.random() * adult.length)]);
  displayList(adult, 'adult-list');
  clearOtherLists(['movies-list','tvshows-list','anime-list','popular-list']);
}

function clearOtherLists(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = '';
  });
}

// Handle Enter key on search input
document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') performSearch();
});

// On page load, show trending movies by default
window.onload = () => {
  loadTrending('movie');
  setActiveNav(navLinks[0]);
};
