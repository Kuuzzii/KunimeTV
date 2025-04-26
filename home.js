const resultsDiv = document.getElementById('results');
const navLinks = document.querySelectorAll('nav a');
function setActiveLink(clickedLink) {
  navLinks.forEach(link => link.classList.remove('active'));
  if(clickedLink) clickedLink.classList.add('active');
}
async function fetchAndDisplay(animeList) {
  resultsDiv.innerHTML = '';
  if (animeList.length === 0) {
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
