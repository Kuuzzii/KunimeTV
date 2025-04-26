const API_KEY = '961334ce43e0adcaa714fddec89fcfd9';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/original';

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const type = urlParams.get('type'); // 'movie' or 'tv'

let currentServer = '';  // No server selected initially

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

async function fetchDetails() {
  try {
    const res = await fetch(`${BASE_URL}/${type}/${movieId}?api_key=${API_KEY}`);
    if (!res.ok) throw new Error('Failed to fetch movie details');
    const data = await res.json();

    backdrop.style.backgroundImage = `url(${IMG_URL}${data.backdrop_path})`;
    poster.src = `${IMG_URL}${data.poster_path}`;
    titleEl.textContent = data.title || data.name;
    overviewEl.textContent = data.overview || 'No description available.';
    releaseDateEl.textContent = new Date(data.release_date || data.first_air_date).toLocaleDateString();

    if (type === 'movie') {
      runtimeEl.textContent = data.runtime ? `${data.runtime} min` : '';
    } else {
      runtimeEl.textContent = data.episode_run_time && data.episode_run_time.length > 0 ? `${data.episode_run_time[0]} min per episode` : '';
    }

    genresEl.innerHTML = '';
    data.genres.forEach(genre => {
      const span = document.createElement('span');
      span.className = 'genre-tag';
      span.textContent = genre.name;
      genresEl.appendChild(span);
    });

  } catch (err) {
    console.error(err);
    alert('Failed to load movie/show details.');
  }
}

function updateVideoSrc() {
  // Remove existing overlay message if any
  const existingMsg = document.getElementById('choose-server-msg');
  if (existingMsg) {
    existingMsg.remove();
  }

  // If no server selected, show overlay message
  if (!currentServer) {
    videoIframe.src = 'about:blank';

    const msg = document.createElement('div');
    msg.id = 'choose-server-msg';
    msg.style.position = 'absolute';
    msg.style.top = 0;
    msg.style.left = 0;
    msg.style.width = '100%';
    msg.style.height = '100%';
    msg.style.display = 'flex';
    msg.style.alignItems = 'center';
    msg.style.justifyContent = 'center';
    msg.style.color = '#fff';
    msg.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
    msg.style.fontSize = '1.4rem';
    msg.style.zIndex = '10';
    msg.textContent = '⚠️ Please choose a server first';

    const container = document.querySelector('.video-container');
    container.style.position = 'relative';
    container.appendChild(msg);

    playBtn.disabled = true;
    return;
  }

  // Server selected; hide overlay and load embed
  playBtn.disabled = false;

  let embedURL = '';
  switch (currentServer) {
    case 'vidsrc.cc':
      embedURL = `https://vidsrc.cc/v2/embed/${type}/${movieId}`;
      break;
    case 'vidsrc.me':
      embedURL = `https://vidsrc.net/embed/${type}/?tmdb=${movieId}`;
      break;
    case 'videasy.net':
      embedURL = `https://player.videasy.net/${type}/${movieId}`;
      break;
    default:
      embedURL = `https://vidsrc.cc/v2/embed/${type}/${movieId}`;
  }

  videoIframe.src = embedURL;
}

playBtn.addEventListener('click', () => {
  if (!currentServer) {
    alert('Please choose a streaming server first.');
    return;
  }
  document.querySelector('.video-container').scrollIntoView({ behavior: 'smooth' });
});

serverSelect.addEventListener('change', (e) => {
  currentServer = e.target.value;
  updateVideoSrc();
});

backBtn.addEventListener('click', () => {
  window.history.back();
});

if (!movieId || !type) {
  alert('Invalid movie or TV show ID');
} else {
  fetchDetails();
  updateVideoSrc();
}
