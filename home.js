const API_KEY = '961334ce43e0adcaa714fddec89fcfd9';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/original';

const resultsDiv = document.getElementById('results');
const navLinks = document.querySelectorAll('nav a');
const searchInput = document.getElementById('searchInput');

let currentItem = null;

function setActiveLink(clickedLink) {
  navLinks.forEach(link => link.classList.remove('active'));
  if (clickedLink) clickedLink.classList.add('active');
}

async function fetchTrending(type) {
  const res = await fetch(`${BASE_URL}/trending/${type}/week?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

async function fetchTrendingAnime() {
  // TMDB does not have "anime" category, so filter Japanese animation from 'tv' trending
  const res = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`);
  const data = await res.json();
  // Filter by Japanese language and Animation genre (genre_id 16)
  return data.results.filter(item => item.original_language === 'ja' && item.genre_ids.includes(16));
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

function displayList(items, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  items.forEach(item => {
    if (item.poster_path) {
      container.appendChild(createAnimeItem(item));
    }
  });
}

async function displayBanner(item) {
  currentItem = item;
  document.getElementById('banner').style.backgroundImage = `url(${IMG_URL}${item.backdrop_path})`;
  document.getElementById('banner-title').textContent = item.title || item.name;
  document.getElementById('banner-description').textContent = item.overview || 'No description available.';

  const type = item.media_type === 'movie' ? 'movie' : 'tv';
  const providers = await fetchStreamingProviders(item.id, type);
  const watchBtnContainer = document.getElementById('banner-watch-btn');

  if (providers.flatrate && providers.flatrate.length > 0) {
    const provNames = providers.flatrate.map(p => p.provider_name).join(', ');
    watchBtnContainer.innerHTML = `<button class="play-btn" onclick="goToMoviePage()">Watch Now (${provNames})</button>`;
  } else {
    watchBtnContainer.innerHTML = '';
  }
}

async function performSearch() {
  const query = searchInput.value.trim();
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
      if (item.poster_path) resultsDiv.appendChild(createAnimeItem(item));
    });
  } catch (error) {
    console.error('Search error:', error);
    resultsDiv.innerHTML = '<p>Failed to fetch search results.</p>';
  }
}

// Redirect to watch page with correct URL parameters
function goToMoviePage() {
  if (!currentItem) return alert('No movie/show selected');
  const id = currentItem.id;
  const type = currentItem.media_type === 'movie' ? 'movie' : 'tv';
  window.location.href = `watch.html?id=${id}&type=${type}`;
}

// For nav link clicks
async function loadAnime(event) {
  if (event) event.preventDefault();
  setActiveLink(event ? event.currentTarget : navLinks[0]);
  resultsDiv.innerHTML = '';
  const anime = await fetchTrendingAnime();
  displayBanner(anime[Math.floor(Math.random() * anime.length)]);
  displayList(anime, 'anime-list');
}

async function loadPopular(event) {
  if (event) event.preventDefault();
  setActiveLink(event.currentTarget);
  resultsDiv.innerHTML = '';
  const movies = await fetchTrending('movie');
  displayBanner(movies[Math.floor(Math.random() * movies.length)]);
  displayList(movies, 'movies-list');
}

async function load18Plus(event) {
  if (event) event.preventDefault();
  setActiveLink(event.currentTarget);
  resultsDiv.innerHTML = '';
  // For demo, use Horror genre (id 27), include adult=TRUE
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27&include_adult=true&sort_by=popularity.desc`);
  const data = await res.json();
  displayBanner(data.results[0]);
  displayList(data.results, 'movies-list'); // reusing movies-list container
}

// Attach event listeners
navLinks[0].addEventListener('click', loadAnime);
navLinks[1].addEventListener('click', loadPopular);
navLinks[2].addEventListener('click', load18Plus);

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') performSearch();
});

window.onload = () => {
  // Default load anime trending list on page load
  loadAnime();
};
