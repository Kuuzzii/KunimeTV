const API_KEY = '961334ce43e0adcaa714fddec89fcfd9';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/original';

const resultsDiv = document.getElementById('results');
const navLinks = document.querySelectorAll('nav a');

// Pagination states
const pagination = {
  movies: { currentPage: 1, totalPages: 1 },
  tvshows: { currentPage: 1, totalPages: 1 },
  newReleases: { currentPage: 1, totalPages: 1 },
};

let currentItem = null;

function setActiveNav(selectedLink) {
  navLinks.forEach((link) => link.classList.remove('active'));
  if (selectedLink) selectedLink.classList.add('active');
}

// Create card element for an item
function createItemCard(item, type) {
  const div = document.createElement('div');
  div.className = 'anime-item';
  div.innerHTML = `
    <a href="watch.html?id=${item.id}&type=${type}">
      <img src="${IMG_URL}${item.poster_path}" alt="${item.title || item.name}" />
    </a>
    <div class="info">
      <div class="title">${item.title || item.name}</div>
      <div class="score">⭐ ${item.vote_average ?? 'N/A'}</div>
    </div>
  `;
  return div;
}

// Utilities to display lists and clear others
function displayList(items, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  items.forEach((item) => {
    if (item.poster_path) {
      const type = item.media_type
        ? item.media_type === 'movie'
          ? 'movie'
          : 'tv'
        : containerId.includes('movies')
        ? 'movie'
        : 'tv';
      container.appendChild(createItemCard(item, type));
    }
  });
}
function clearOtherLists(listIds) {
  listIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = '';
  });
}

// Fetch data functions
async function fetchMovies(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
  return await res.json();
}

async function fetchTVShows(page = 1) {
  const res = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}&page=${page}`);
  return await res.json();
}

async function fetchNewReleases(page = 1) {
  const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`);
  return await res.json();
}

async function fetchTrendingAnime() {
  const res = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`);
  const data = await res.json();
  return data.results.filter((item) => item.original_language === 'ja' && item.genre_ids.includes(16));
}

// Loading Functions
async function loadMoviesPage(page = 1) {
  resultsDiv.innerHTML = '';
  const data = await fetchMovies(page);
  pagination.movies.currentPage = data.page;
  pagination.movies.totalPages = data.total_pages;
  displayList(data.results, 'movies-list');
  clearOtherLists(['tvshows-list', 'anime-list', 'new-releases-list']);
  updatePaginationControls('movies');
}

async function loadTVShowsPage(page = 1) {
  resultsDiv.innerHTML = '';
  const data = await fetchTVShows(page);
  pagination.tvshows.currentPage = data.page;
  pagination.tvshows.totalPages = data.total_pages;
  displayList(data.results, 'tvshows-list');
  clearOtherLists(['movies-list', 'anime-list', 'new-releases-list']);
  updatePaginationControls('tvshows');
}

async function loadNewReleasesPage(page = 1) {
  resultsDiv.innerHTML = '';
  const data = await fetchNewReleases(page);
  pagination.newReleases.currentPage = data.page;
  pagination.newReleases.totalPages = data.total_pages;
  displayList(data.results, 'new-releases-list');
  clearOtherLists(['movies-list', 'tvshows-list', 'anime-list']);
  updatePaginationControls('new-releases');
}

async function loadAnime() {
  resultsDiv.innerHTML = '';
  const anime = await fetchTrendingAnime();
  displayList(anime, 'anime-list');
  clearOtherLists(['movies-list', 'tvshows-list', 'new-releases-list']);
  hideAllPagination();
}

// Pagination controls update
function updatePaginationControls(section) {
  const pages = pagination[section];
  // Show or hide controls for sections
  const paginationControls = {
    movies: document.getElementById('movies-pagination'),
    tvshows: document.getElementById('tvshows-pagination'),
    'new-releases': document.getElementById('new-releases-pagination'),
  };

  Object.keys(paginationControls).forEach((key) => {
    if (key === section) {
      paginationControls[key].style.display = 'block';
      paginationControls[key].querySelector('span').textContent = pages.currentPage;
      paginationControls[key].querySelector('button#' + key + '-prev-page').disabled = pages.currentPage <= 1;
      paginationControls[key].querySelector('button#' + key + '-next-page').disabled = pages.currentPage >= pages.totalPages;
    } else {
      paginationControls[key].style.display = 'none';
    }
  });
}

function hideAllPagination() {
  ['movies-pagination', 'tvshows-pagination', 'new-releases-pagination'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
}

// Event listeners for pagination buttons
document.getElementById('movies-prev-page').addEventListener('click', () => {
  if (pagination.movies.currentPage > 1) loadMoviesPage(pagination.movies.currentPage - 1);
});
document.getElementById('movies-next-page').addEventListener('click', () => {
  if (pagination.movies.currentPage < pagination.movies.totalPages) loadMoviesPage(pagination.movies.currentPage + 1);
});

document.getElementById('tvshows-prev-page').addEventListener('click', () => {
  if (pagination.tvshows.currentPage > 1) loadTVShowsPage(pagination.tvshows.currentPage - 1);
});
document.getElementById('tvshows-next-page').addEventListener('click', () => {
  if (pagination.tvshows.currentPage < pagination.tvshows.totalPages) loadTVShowsPage(pagination.tvshows.currentPage + 1);
});

document.getElementById('new-prev-page').addEventListener('click', () => {
  if (pagination.newReleases.currentPage > 1) loadNewReleasesPage(pagination.newReleases.currentPage - 1);
});
document.getElementById('new-next-page').addEventListener('click', () => {
  if (pagination.newReleases.currentPage < pagination.newReleases.totalPages) loadNewReleasesPage(pagination.newReleases.currentPage + 1);
});

// Search functionality (hides pagination)
document.getElementById('searchBtn').addEventListener('click', performSearch);
document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') performSearch();
});

async function performSearch() {
  const query = document.getElementById('searchInput').value.trim();
  resultsDiv.innerHTML = '';
  if (!query) {
    resultsDiv.innerHTML = '<p>Please enter a search term.</p>';
    hideAllPagination();
    return;
  }
  try {
    const res = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await res.json();
    if (!data.results.length) {
      resultsDiv.innerHTML = '<p>No results found.</p>';
      hideAllPagination();
      return;
    }
    displayList(data.results, 'results');
    hideAllPagination();
  } catch (e) {
    resultsDiv.innerHTML = '<p>Error fetching search results.</p>';
    hideAllPagination();
  }
}

// Initial load defaults to movies
window.onload = () => {
  loadMoviesPage(1);
  setActiveNav(navLinks[0]);
};
