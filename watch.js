const API_KEY = '961334ce43e0adcaa714fddec89fcfd9';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/original';

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id'); // TMDb id only
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
const servers = [];

async function fetchDetails() {
  try {
    const res = await fetch(`${BASE_URL}/${type}/${movieId}?api_key=${API_KEY}`);
    if (!res.ok) throw new Error('Failed to fetch details');
    const data = await res.json();
    backdrop.style.backgroundImage = `url(${IMG_URL}${data.backdrop_path || ''})`;
    poster.src = `${IMG_URL}${data.poster_path || ''}`;
    titleEl.textContent = data.title || data.name || '';
    overviewEl.textContent = data.overview || 'No description available.';
    releaseDateEl.textContent = new Date(data.release_date || data.first_air_date || '').toLocaleDateString();
    if (type === 'movie') {
      runtimeEl.textContent = data.runtime ? `${data.runtime} min` : '';
    } else {
      runtimeEl.textContent = (data.episode_run_time && data.episode_run_time.length > 0) ? `${data.episode_run_time[0]} min per episode` : '';
    }
    genresEl.innerHTML = '';
    if (data.genres) {
      data.genres.forEach(genre => {
        const span = document.createElement('span');
        span.textContent = genre.name;
        genresEl.appendChild(span);
      });
    }
  } catch (err) {
    console.error(err);
    alert('Failed to load movie/show details.');
  }
}

function setupServers() {
  servers.length = 0;
  if (type === 'movie') {
    // Use servers supporting TMDb ids for movies (you may add or remove as needed)
    // Many servers expect IMDb ids for movies, so if restricted to TMDb-only, options are limited
    // Here I list only those servers you mentioned that use TMDb ids for movies (if none, empty)
    // So, here you can keep it empty or add servers that accept TMDb ids for movies if available
  } else if (type === 'tv') {
    // TV servers requiring TMDb id + season + episode
    servers.push(
      { name: 'Moviewp TV', url: `https://moviewp.com/se.php?video_id=${movieId}&tmdb=1&s=${season}&e=${episode}` },
      { name: 'ApiMDB TV', url: `https://v2.apimdb.net/e/tmdb/tv/${movieId}/${season}/${episode}/` },
      { name: 'GDrivePlayer', url: `https://databasegdriveplayer.co/player.php?type=series&tmdb=${movieId}&season=${season}&episode=${episode}` },
      { name: 'Curtstream TV', url: `https://curtstream.com/series/tmdb/${movieId}/season/${season}/episode/${episode}/` }
    );
  }
  serverSelect.innerHTML = '';
  if (servers.length === 0) {
    const option = document.createElement('option');
    option.textContent = 'No available streaming servers';
    option.disabled = true;
    serverSelect.appendChild(option);
    playBtn.disabled = true;
  } else {
    servers.forEach((srv, idx) => {
      const option = document.createElement('option');
      option.value = idx;
      option.textContent = srv.name;
      serverSelect.appendChild(option);
    });
    playBtn.disabled = false;
  }
  currentServerIndex = null;
  updateVideoSrc();
}

function updateVideoSrc() {
  const existingMsg = document.getElementById('choose-server-msg');
  if (existingMsg) existingMsg.remove();
  if (currentServerIndex === null || servers.length === 0) {
    videoIframe.src = 'about:blank';
    const msg = document.createElement('div');
    msg.id = 'choose-server-msg';
    msg.style =
      'position:absolute;top:0;left:0;width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#fff;background-color:rgba(0,0,0,.75);font-size:1.4rem;z-index:10;';
    msg.textContent = servers.length === 0 ? '⚠️ No available streaming servers' : '⚠️ Please choose a server first';
    const container = document.querySelector('.video-container');
    container.style.position = 'relative';
    container.appendChild(msg);
    playBtn.disabled = true;
    return;
  }
  playBtn.disabled = false;
  videoIframe.src = servers[currentServerIndex].url;
}

// Events
serverSelect.addEventListener('change', e => {
  currentServerIndex = parseInt(e.target.value, 10);
  updateVideoSrc();
});

playBtn.addEventListener('click', () => {
  if (currentServerIndex === null || servers.length === 0) {
    alert('No streaming server available or selected.');
    return;
  }
  document.querySelector('.video-container').scrollIntoView({ behavior: 'smooth' });
});

backBtn.addEventListener('click', () => {
  window.history.back();
});

// Init
if (!movieId || !type) {
  alert('Invalid movie or TV show ID');
  playBtn.disabled = true;
} else {
  fetchDetails();
  setupServers();
  updateVideoSrc();
}
