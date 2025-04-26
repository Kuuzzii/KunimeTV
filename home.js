const API_KEY = '961334ce43e0adcaa714fddec89fcfd9';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/original';

let currentItem; // Global selected movie/show

function goToMoviePage() {
  const movieId = currentItem.id;
  const type = currentItem.media_type === 'movie' ? 'movie' : 'tv';
  window.location.href = `watch.html?id=${movieId}&type=${type}`;
}

async function fetchTrending(type) {
  const res = await fetch(`${BASE_URL}/trending/${type}/week?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

async function fetchStreamingProviders(id, type) {
  try {
    const res = await fetch(`${BASE_URL}/${type}/${id}/watch/providers?api_key=${API_KEY}`);
    const data = await res.json();
    return (data.results && data.results.US) ? data.results.US : {};
  } catch (err) {
    console.error('Error fetching streaming providers:', err);
    return {};
  }
}

async function displayBanner(item) {
  document.getElementById('banner').style.backgroundImage = `url(${IMG_URL}${item.backdrop_path})`;
  document.getElementById('banner-title').textContent = item.title || item.name;
  document.getElementById('banner-description').textContent = item.overview || 'No description available.';
  currentItem = item;

  const type = item.media_type === 'movie' ? 'movie' : 'tv';
  const providers = await fetchStreamingProviders(item.id, type);
  const watchBtnContainer = document.getElementById('banner-watch-btn');
  if (providers.flatrate && providers.flatrate.length > 0) {
    const provNames = providers.flatrate.map(p => p.provider_name).join(', ');
    watchBtnContainer.innerHTML = `<button onclick="goToMoviePage()">Watch Now (${provNames})</button>`;
  } else {
    watchBtnContainer.innerHTML = '';
  }
}

async function performSearch() {
  const query = document.getElementById('search-bar').value.trim();
  const searchResults = document.getElementById('search-results');
  if (!query) {
    searchResults.innerHTML = '';
    return;
  }
  try {
    const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();
    displaySearchResults(data.results);
  } catch (error) {
    console.error('Error performing search:', error);
    searchResults.innerHTML = '<p>Unable to fetch results.</p>';
  }
}

function displaySearchResults(results) {
  const searchResults = document.getElementById('search-results');
  searchResults.innerHTML = '';
  if (!results || results.length === 0) {
    searchResults.innerHTML = '<p>No results found.</p>';
    return;
  }
  results.forEach(result => {
    if (result.poster_path) {
      const img = document.createElement('img');
      img.src = `${IMG_URL}${result.poster_path}`;
      img.alt = result.title || result.name;
      img.onclick = () => {
        const type = result.media_type === 'movie' ? 'movie' : 'tv';
        window.location.href = `watch.html?id=${result.id}&type=${type}`;
      };
      searchResults.appendChild(img);
    }
  });
}

async function init() {
  const movies = await fetchTrending('movie');
  const tvShows = await fetchTrending('tv');
  const anime = await fetchTrendingAnime();

  displayBanner(movies[Math.floor(Math.random() * movies.length)]);
  displayList(movies, 'movies-list');
  displayList(tvShows, 'tvshows-list');
  displayList(anime, 'anime-list');
}

function displayList(items, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  items.forEach(item => {
    const img = document.createElement('img');
    img.src = `${IMG_URL}${item.poster_path}`;
    img.alt = item.title || item.name;
    img.onclick = () => {
      const type = item.media_type === 'movie' ? 'movie' : 'tv';
      window.location.href = `watch.html?id=${item.id}&type=${type}`;
    };
    container.appendChild(img);
  });
}

async function fetchTrendingAnime() {
  const res = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`);
  const data = await res.json();
  // filter for Japanese animation (genre id 16)
  return data.results.filter(item => item.original_language === 'ja' && item.genre_ids.includes(16));
}

window.addEventListener('DOMContentLoaded', () => {
  init();
});
