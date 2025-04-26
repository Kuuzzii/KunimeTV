const API_KEY = '961334ce43e0adcaa714fddec89fcfd9';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/original';

const resultsDiv = document.getElementById('results');
const prevBtn = document.getElementById('prev-page');
const nextBtn = document.getElementById('next-page');
const currentPageSpan = document.getElementById('current-page');

let currentPage = 1;

// Get page from URL query string
const urlParams = new URLSearchParams(window.location.search);
const pageParam = parseInt(urlParams.get('page'));
if (pageParam && pageParam > 0) currentPage = pageParam;

async function fetchTVShows(page = 1) {
  const res = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}&page=${page}`);
  const data = await res.json();
  return { results: data.results, page: data.page, total_pages: data.total_pages };
}

function createTVShowCard(item) {
  const div = document.createElement('div');
  div.className = 'anime-item';
  div.innerHTML = `
    <a href="watch.html?id=${item.id}&type=tv">
      <img src="${IMG_URL}${item.poster_path}" alt="${item.name}" />
    </a>
    <div class="info">
      <div class="title">${item.name}</div>
      <div class="score">⭐ ${item.vote_average ?? 'N/A'}</div>
    </div>
  `;
  return div;
}

function displayTVShows(list) {
  resultsDiv.innerHTML = '';
  list.forEach(item => {
    if (item.poster_path) {
      resultsDiv.appendChild(createTVShowCard(item));
    }
  });
}

async function loadTVShowsPage(page = 1) {
  const data = await fetchTVShows(page);
  displayTVShows(data.results);
  currentPage = data.page;
  currentPageSpan.textContent = currentPage;
  prevBtn.disabled = currentPage <= 1;
  nextBtn.disabled = currentPage >= data.total_pages;
  history.replaceState(null, '', `tvshows.html?page=${currentPage}`);
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) loadTVShowsPage(currentPage - 1);
});

nextBtn.addEventListener('click', () => {
  loadTVShowsPage(currentPage + 1);
});

async function performSearch() {
  const query = document.getElementById('searchInput').value.trim();
  resultsDiv.innerHTML = '';
  if (!query) {
    resultsDiv.innerHTML = '<p>Please enter a search term.</p>';
    return;
  }
  try {
    const res = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=1`);
    const data = await res.json();
    if (!data.results.length) {
      resultsDiv.innerHTML = '<p>No results found.</p>';
      return;
    }
    displayTVShows(data.results);
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    currentPageSpan.textContent = '';
  } catch {
    resultsDiv.innerHTML = '<p>Error fetching search results.</p>';
  }
}

document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') performSearch();
});

window.onload = () => {
  loadTVShowsPage(currentPage);
};
