const API_KEY = '961334ce43e0adcaa714fddec89fcfd9';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/original';

const resultsDiv = document.getElementById('results');
const navLinks = document.querySelectorAll('nav a');

let currentItem = null;

function setActiveNav(selectedLink) {
  navLinks.forEach(link => link.classList.remove('active'));
  if (selectedLink) selectedLink.classList.add('active');
}

async function fetchTrending(type) {
  const res = await fetch(`${BASE_URL}/trending/${type}/week?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

async function fetchTrendingAnime() {
  const res = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results.filter(item => item.original_language === 'ja' && item.genre_ids.includes(16));
}

async function fetchNewReleases() {
  const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`);
  const data = await res.json();
  return data.results;
}

async function fetchStreamingProviders(id, type) {
  try {
    const res = await fetch(`${BASE_URL}/${type}/${id}/watch/providers?api_key=${API_KEY}`);
    const data = await res.json();
    return data.results?.US || {};
  } catch {
    return {};
  }
}

function createItemCard(item) {
  const type = (item.media_type === 'movie' || item.media_type === undefined) ? 'movie' : 'tv';
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

async function displayBanner(item) {
  if (!item) return;
  currentItem = item;
  document.getElementById('banner').style.backgroundImage = `url(${IMG_URL}${item.backdrop_path})`;
  document.getElementById('banner-title').textContent = item.title || item.name;
  document.getElementById('banner-description').textContent = item.overview || 'No description available.';
  const type = (item.media_type === 'movie' || item.media_type === undefined) ? 'movie' : 'tv';
  const providers = await fetchStreamingProviders(item.id, type);
  const watchBtnContainer = document.getElementById('banner-watch-btn');
  if (providers.flatrate && providers.flatrate.length > 0) {
    const providersNames = providers.flatrate.map(p => p.provider_name).join(', ');
    watchBtnContainer.innerHTML = `<button class="play-btn" onclick="goToMoviePage()">Watch Now (${providersNames})</button>`;
  } else {
    watchBtnContainer.innerHTML = '';
  }
}

function goToMoviePage() {
  if (!currentItem) return alert('No movie/show selected');
  const id = currentItem.id;
  const type = (currentItem.media_type === 'movie' || currentItem.media_type === undefined) ? 'movie' : 'tv';
  window.location.href = `watch.html?id=${id}&type=${type}`;
}

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

async function loadTrending(type, event) {
  resultsDiv.innerHTML = '';
  setActiveNav(event ? event.currentTarget : null);
  const items = await fetchTrending(type);
  displayBanner(items[Math.floor(Math.random() * items.length)]);
  if (type === 'movie') {
    displayList(items, 'movies-list');
    clearOtherLists(['tvshows-list', 'anime-list', 'new-releases-list']);
  } else if (type === 'tv') {
    displayList(items, 'tvshows-list');
    clearOtherLists(['movies-list', 'anime-list', 'new-releases-list']);
  }
}

async function loadTrendingAnime(event) {
  resultsDiv.innerHTML = '';
  setActiveNav(event ? event.currentTarget : null);
  const anime = await fetchTrendingAnime();
  displayBanner(anime[Math.floor(Math.random() * anime.length)]);
  displayList(anime, 'anime-list');
  clearOtherLists(['movies-list', 'tvshows-list', 'new-releases-list']);
}

async function loadNewReleases() {
  const newReleases = await fetchNewReleases();
  displayList(newReleases, 'new-releases-list');
  clearOtherLists(['movies-list', 'tvshows-list', 'anime-list']);
}

function clearOtherLists(ids) {
  ids.forEach(id => {
    const container = document.getElementById(id);
    if (container) container.innerHTML = '';
  });
}

navLinks[0].addEventListener('click', e => loadTrending('movie', e));
navLinks[1].addEventListener('click', e => loadTrending('tv', e));
navLinks[2].addEventListener('click', e => loadTrendingAnime(e));

document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') performSearch();
});

window.onload = () => {
  loadTrending('movie');
  loadNewReleases();
  setActiveNav(navLinks[0]);
};
