const API_KEY = '961334ce43e0adcaa714fddec89fcfd9';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/original';

const urlParams = new URLSearchParams(window.location.search);
const tmdbId = urlParams.get('id');
const type = urlParams.get('type'); // 'movie' or 'tv'
const season = urlParams.get('season') || 1;
const episode = urlParams.get('episode') || 1;

const backdrop = document.getElementById('movie-backdrop');
const poster = document.getElementById('movie-poster');
const titleEl = document.getElementById('movie-title');
const releaseDateEl = document.getElementById('movie-release-date');
const runtimeEl = document.getElementById('movie-runtime');
const genresEl = document.getElementById('movie-genres');
const overviewEl = document.getElementById('movie-overview');
const videoIframe = document.getElementById('movie-video');
const playBtn = document.getElementById('play-btn');
const serverSelect = document.getElementById('server-select');
const backBtn = document.getElementById('back-btn');

let currentServerIndex = null;
let servers = [];
let imdbId = null;

async function fetchTmdbDetails() {
  const url = `${BASE_URL}/${type}/${tmdbId}?api_key=${API_KEY}&append_to_response=external_ids`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error('Failed to fetch TMDB data');
  const data = await resp.json();
  return data;
}

function populateUI(data) {
  backdrop.style.backgroundImage = `url(${IMG_URL}${data.backdrop_path || ''})`;
  poster.src = `${IMG_URL}${data.poster_path || ''}`;
  poster.alt = data.title || data.name || 'Poster';
  titleEl.textContent = data.title || data.name || '';
  overviewEl.textContent = data.overview || 'No description available.';
  releaseDateEl.textContent = (data.release_date || data.first_air_date || '').split('T')[0];
  if (type === 'movie') {
    runtimeEl.textContent = data.runtime ? `${data.runtime} min` : '';
  } else {
    runtimeEl.textContent = data.episode_run_time && data.episode_run_time.length ? `${data.episode_run_time[0]} min per episode` : '';
  }
  genresEl.innerHTML = '';
  if (data.genres && data.genres.length) {
    data.genres.forEach(genre => {
      const span = document.createElement('span');
      span.textContent = genre.name;
      genresEl.appendChild(span);
    });
  }
}

function setupServers() {
  servers = [];
  if (type === 'movie') {
    servers.push({ name: 'Vidsrc', url: `https://vidsrc.me/embed/${imdbId}` });
    servers.push({ name: 'Fsapi', url: `https://fsapi.xyz/movie/${imdbId}` });
    servers.push({ name: 'Curtstream', url: `https://curtstream.com/movies/imdb/${imdbId}` });
    servers.push({ name: 'Moviewp', url: `https://moviewp.com/se.php?video_id=${imdbId}` });
    servers.push({ name: 'ApiMDB', url: `https://v2.apimdb.net/e/movie/${imdbId}` });
    servers.push({ name: 'Gomo', url: `https://gomo.to/movie/${imdbId}` });
    servers.push({ name: 'VidCloud', url: `https://vidcloud.stream/${imdbId}.html` });
  } else if (type === 'tv') {
    servers.push({ name: 'Fsapi TV', url: `https://fsapi.xyz/tv-imdb/${imdbId}-${season}-${episode}` });
    servers.push({ name: 'Moviewp TV', url: `https://moviewp.com/se.php?video_id=${tmdbId}&tmdb=1&s=${season}&e=${episode}` });
    servers.push({ name: 'ApiMDB TV', url: `https://v2.apimdb.net/e/tmdb/tv/${tmdbId}/${season}/${episode}/` });
    servers.push({ name: 'GDrivePlayer', url: `https://databasegdriveplayer.co/player.php?type=series&tmdb=${tmdbId}&season=${season}&episode=${episode}` });
    servers.push({ name: 'Curtstream TV', url: `https://curtstream.com/series/tmdb/${tmdbId}/season/${season}/episode/${episode}/` });
  }
  serverSelect.innerHTML = '';
  servers.forEach((srv, idx) => {
    const option = document.createElement('option');
    option.value = idx;
    option.textContent = srv.name;
    serverSelect.appendChild(option);
  });
  currentServerIndex = null;
  updateVideoSrc();
}

function updateVideoSrc() {
  const existingMsg = document.getElementById('choose-server-msg');
  if (existingMsg) existingMsg.remove();
  if (currentServerIndex === null) {
    videoIframe.src = 'about:blank';
    const msg = document.createElement('div');
    msg.id = 'choose-server-msg';
    msg.style =
      'position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#fff;background-color:rgba(0,0,0,.75);font-size:1.4rem;z-index:10;';
    msg.textContent = '⚠️ Please choose a server first';
    const container = document.querySelector('.video-container');
    container.style.position = 'relative';
    container.appendChild(msg);
    playBtn.disabled = true;
    return;
  }
  playBtn.disabled = false;
  videoIframe.src = servers[currentServerIndex].url;
}

async function init() {
  if (!tmdbId || !type) {
    alert('Invalid or missing id/type parameters in URL');
    playBtn.disabled = true;
    return;
  }
  try {
    const data = await fetchTmdbDetails();
    imdbId = data.external_ids && data.external_ids.imdb_id ? data.external_ids.imdb_id : null;
    if (!imdbId) {
      alert('IMDb ID not found; some servers may not work properly.');
    }
    populateUI(data);
    setupServers();
  } catch (e) {
    alert('Failed to load movie/show details');
    console.error(e);
    playBtn.disabled = true;
  }
}

// Event listeners
serverSelect.addEventListener('change', (e) => {
  currentServerIndex = parseInt(e.target.value, 10);
  updateVideoSrc();
});
playBtn.addEventListener('click', () => {
  if (currentServerIndex === null) {
    alert('Please choose a streaming server first.');
    return;
  }
  document.querySelector('.video-container').scrollIntoView({ behavior: 'smooth' });
});
backBtn.addEventListener('click', () => {
  window.history.back();
});

// Start initialization
init();
