const API_KEY = '961334ce43e0adcaa714fddec89fcfd9';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/original';

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const type = urlParams.get('type'); // 'movie' or 'tv'

let currentServerIndex = null; // Set to null initially, to track the server selection

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

const servers = [];

if (type === 'movie') {
    servers.push(
        { name: 'Vidsrc', url: `https://vidsrc.me/embed/${movieId}` },
        { name: 'Fsapi', url: `https://fsapi.xyz/movie/${movieId}` },
        { name: 'Curtstream', url: `https://curtstream.com/movies/imdb/${movieId}` },
        { name: 'Moviewp', url: `https://moviewp.com/se.php?video_id=${movieId}` },
        { name: 'ApiMDB', url: `https://v2.apimdb.net/e/movie/${movieId}` },
        { name: 'Gomo', url: `https://gomo.to/movie/${movieId}` },
        { name: 'VidCloud', url: `https://vidcloud.stream/${movieId}.html` },
    );
} else if (type === 'tv') {
    const season = urlParams.get('season') || 1;
    const episode = urlParams.get('episode') || 1;
    servers.push(
        { name: 'Fsapi TV', url: `https://fsapi.xyz/tv-imdb/${movieId}-${season}-${episode}` },
        { name: 'Moviewp TV', url: `https://moviewp.com/se.php?video_id=${movieId}&tmdb=1&s=${season}&e=${episode}` },
        { name: 'ApiMDB TV', url: `https://v2.apimdb.net/e/tmdb/tv/${movieId}/${season}/${episode}/` },
        { name: 'GDrivePlayer', url: `https://databasegdriveplayer.co/player.php?type=series&tmdb=${movieId}&season=${season}&episode=${episode}` },
        { name: 'Curtstream TV', url: `https://curtstream.com/series/tmdb/${movieId}/season/${season}/episode/${episode}/` },
    );
}

// Populate server dropdown
servers.forEach((server, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = server.name;
    serverSelect.appendChild(option);
});

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
  if (currentServerIndex === null) {
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

  const selectedServer = servers[currentServerIndex];
  if (selectedServer) {
      // Force iframe reload by resetting src
      videoIframe.src = ''; // Clear previous iframe content
      setTimeout(() => {
          videoIframe.src = selectedServer.url; // Set new server URL after a short delay
      }, 200); // Delay to ensure the iframe reloads
  } else {
      videoIframe.src = 'about:blank'; // fallback if somehow invalid
  }
}

playBtn.addEventListener('click', () => {
  if (currentServerIndex === null) {
    alert('Please choose a streaming server first.');
    return;
  }
  document.querySelector('.video-container').scrollIntoView({ behavior: 'smooth' });
});

serverSelect.addEventListener('change', (e) => {
  currentServerIndex = parseInt(e.target.value); // Make sure to parse the value as an integer
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
