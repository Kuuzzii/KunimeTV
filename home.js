const resultsDiv = document.getElementById('results');
const navLinks = document.querySelectorAll('nav a');
function setActiveLink(clickedLink) {
  navLinks.forEach(link => link.classList.remove('active'));
  if(clickedLink) clickedLink.classList.add('active');
}
async function fetchAndDisplay(animeList) {
  resultsDiv.innerHTML = '';
  if (animeList.length === 0) {const API_KEY = '961334ce43e0adcaa714fddec89fcfd9';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/original';

let currentItem; // Global variable to hold the currently selected movie/show

// Redirect to the dedicated watch page
function goToMoviePage() {
  const movieId = currentItem.id;
  const type = currentItem.media_type === 'movie' ? 'movie' : 'tv';
  window.location.href = `watch.html?id=${movieId}&type=${type}`;
}

// Fetch Trending Movies/TV Shows/Anime
async function fetchTrending(type) {
  const res = await fetch(`${BASE_URL}/trending/${type}/week?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results;
}

// Fetch streaming providers for a movie or tv show
async function fetchStreamingProviders(id, type) {
  try {
    const res = await fetch(`${BASE_URL}/${type}/${id}/watch/providers?api_key=${API_KEY}`);
    const data = await res.json();
    // Return US providers if available or empty object
    return (data.results && data.results.US) ? data.results.US : {};
  } catch (err) {
    console.error('Error fetching streaming providers:', err);
    return {};
  }
}

// Display the banner (featured movie/show) and set currentItem, also show stream button if available
async function displayBanner(item) {
  document.getElementById('banner').style.backgroundImage = `url(${IMG_URL}${item.backdrop_path})`;
  document.getElementById('banner-title').textContent = item.title || item.name;
  document.getElementById('banner-description').textContent = item.overview || 'No description available.';
  currentItem = item;

  // Fetch streaming providers
  const type = item.media_type === 'movie' ? 'movie' : 'tv';
  const providers = await fetchStreamingProviders(item.id, type);

  const watchBtnContainer = document.getElementById('banner-watch-btn');
  if (providers.flatrate && providers.flatrate.length > 0) {
    const providerNames = providers.flatrate.map(p => p.provider_name).join(', ');
    watchBtnContainer.innerHTML = `<button onclick="goToMoviePage()">Watch Now (${providerNames})</button>`;
  } else {
    watchBtnContainer.innerHTML = ''; // no streaming available
  }
}

// Perform search
async function performSearch() {
  const query = document.getElementById('search-bar').value.trim();
  const searchResults = document.getElementById('search-results');
  if (!query) {
    searchResults.innerHTML = ''; // Clear results if query is empty
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

// Display Search Results
function displaySearchResults(results) {
  const searchResults = document.getElementById('search-results');
  searchResults.innerHTML = ''; // Clear previous results
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

// Initialize and fetch trending data
async function init() {
  const movies = await fetchTrending('movie');
  const tvShows = await fetchTrending('tv');
  const anime = await fetchTrendingAnime();

  displayBanner(movies[Math.floor(Math.random() * movies.length)]);
  displayList(movies, 'movies-list');
  displayList(tvShows, 'tvshows-list');
  displayList(anime, 'anime-list');
}

// Display the list of movies, TV shows, or anime
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

// Fetch trending anime (filter to Japanese anime and genre 16 = Animation)
async function fetchTrendingAnime() {
  const res = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results.filter(item => item.original_language === 'ja' && item.genre_ids.includes(16));
}

// Run the init function when the page loads
window.addEventListener('DOMContentLoaded', () => {
  init();
});
    resultsDiv.innerHTML = '<p style="color:#eee;">No results found.</p>';
    return;
  }
  for (const anime of animeList) {
    const animeItem = document.createElement('div');
    animeItem.className = 'anime-item';
    animeItem.innerHTML = `
     <a href="anime.html?id=${anime.mal_id}" ...>
        <img src="${anime.images.jpg.image_url}" alt="${anime.title}" />
      </a>
      <div class="info">
        <div class="title">${anime.title}</div>
        <div class="score">⭐ ${anime.score ?? 'N/A'}</div>
      </div>
    `;
    resultsDiv.appendChild(animeItem);
  }
}
async function loadAnime(event) {
  if(event) event.preventDefault();
  setActiveLink(event ? event.currentTarget : navLinks[0]);
  const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing&sfw=true&limit=12');
  const json = await response.json();
  await fetchAndDisplay(json.data);
}
async function loadPopular(event) {
  if(event) event.preventDefault();
  setActiveLink(event.currentTarget);
  const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=bypopularity&sfw=true&limit=12');
  const json = await response.json();
  await fetchAndDisplay(json.data);
}
async function load18Plus(event) {
  if(event) event.preventDefault();
  setActiveLink(event.currentTarget);
  const response = await fetch('https://api.jikan.moe/v4/anime?genres=12&sfw=false&limit=12');
  const json = await response.json();
  await fetchAndDisplay(json.data);
}
async function searchAnime() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) {
    alert("Please enter a search term");
    return;
  }
  setActiveLink(null);
  const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=12`);
  const json = await response.json();
  await fetchAndDisplay(json.data);
}
// Load the Anime list by default on page load
window.addEventListener('DOMContentLoaded', () => {
  loadAnime(null);
});
