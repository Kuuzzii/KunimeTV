<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Watch - KuNime</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    /* Reset and base styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    body {
      background-color: #111;
      color: #fff;
      line-height: 1.5;
    }
    
    /* Navbar styling */
    .navbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 20px;
      background-color: #000;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #e60000;
      font-weight: 700;
      font-size: 20px;
    }
    
    .logo img {
      height: 35px;
      border-radius: 4px;
    }
    
    .back-button {
      padding: 8px 16px;
      background-color: #34cfeb; /* Using player primary color */
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      transition: background-color 0.2s;
    }
    
    .back-button:hover {
      background-color: #6900e0; /* Using player secondary color */
    }
    
    /* Movie container styling */
    .movie-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 15px;
    }
    
    /* Movie backdrop and details */
    .movie-backdrop {
      position: relative;
      padding: 25px 0;
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 20px;
      background-size: cover;
      background-position: center top;
    }
    
    .movie-backdrop::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 1;
    }
    
    .movie-details {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: row;
      gap: 25px;
      padding: 0 20px;
    }
    
    .movie-poster {
      flex-shrink: 0;
      width: 220px;
      height: 330px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }
    
    .movie-poster img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .movie-info {
      flex-grow: 1;
    }
    
    .movie-info h1 {
      font-size: 28px;
      margin-bottom: 10px;
      color: #fff;
    }
    
    .movie-meta {
      color: #ccc;
      margin-bottom: 15px;
    }
    
    .movie-genres {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 15px;
    }
    
    .movie-genres span {
      background-color: rgba(255, 255, 255, 0.1);
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 14px;
    }
    
    #movie-overview {
      color: #ddd;
      margin-bottom: 20px;
      line-height: 1.6;
    }
    
    .movie-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: flex-start;
    }
    
    .action-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      font-size: 16px;
    }
    
    .play-btn {
      background-color: #34cfeb; /* Using player primary color */
      color: white;
    }
    
    .play-btn:hover {
      background-color: #6900e0; /* Using player secondary color */
    }
    
    #server-select {
      background-color: #333;
      color: white;
      padding: 10px 15px;
    }
    
    /* TV controls */
    .tv-controls {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 10px;
    }
    
    #season-select, #episode-select {
      background-color: #333;
      color: white;
      padding: 8px 15px;
      border: none;
      border-radius: 4px;
    }
    
    /* Warning box styling */
    .warning-box {
      margin-top: 15px;
      padding: 12px 16px;
      background-color: #ff9800; /* Orange background */
      color: #000;
      font-weight: 600;
      font-size: 1rem;
      border-radius: 4px;
      user-select: none;
      max-width: 600px;
      box-sizing: border-box;
      width: 100%;
    }
    
    /* Video container styling */
    .video-container {
      position: relative;
      width: 100%;
      height: 0;
      padding-bottom: 56.25%; /* 16:9 aspect ratio */
      margin-bottom: 30px;
      background-color: #000000; /* Using player bg color */
      border-radius: 8px;
      overflow: hidden;
    }
    
    #movie-video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #000000; /* Using player bg color */
    }
    
    /* Loader animation */
    .loader-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #000000; /* Using player bg color */
      z-index: 10;
    }
    
    .loader {
      width: 48px;
      height: 48px;
      border: 5px solid #34cfeb; /* Using player primary color */
      border-bottom-color: transparent;
      border-radius: 50%;
      display: inline-block;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
    }
    
    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    
    /* Server dropdown styling */
    .server-dropdown {
      position: relative;
      display: inline-block;
    }
    
    .server-dropdown-btn {
      background-color: #333;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .server-dropdown-btn:hover {
      background-color: #444;
    }
    
    .server-dropdown-content {
      display: none;
      position: absolute;
      background-color: #333;
      min-width: 180px;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.5);
      z-index: 1;
      border-radius: 4px;
      overflow: hidden;
      max-height: 300px;
      overflow-y: auto;
    }
    
    .server-dropdown-content a {
      color: white;
      padding: 10px 15px;
      text-decoration: none;
      display: block;
      font-size: 14px;
      transition: background-color 0.2s;
    }
    
    .server-dropdown-content a:hover {
      background-color: #444;
    }
    
    .server-dropdown:hover .server-dropdown-content {
      display: block;
    }
    
    /* Responsive adjustments */
    @media (max-width: 992px) {
      .movie-poster {
        width: 180px;
        height: 270px;
      }
      
      .movie-info h1 {
        font-size: 24px;
      }
    }
    
    @media (max-width: 768px) {
      .movie-details {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      
      .movie-poster {
        width: 200px;
        height: 300px;
        margin-bottom: 20px;
      }
      
      .movie-genres {
        justify-content: center;
      }
      
      .movie-actions {
        flex-direction: column;
        align-items: center;
      }
      
      .action-btn, #server-select, .warning-box, .tv-controls, #season-select, #episode-select, .server-dropdown, .server-dropdown-btn {
        width: 100%;
        max-width: 400px;
      }
      
      .navbar {
        padding: 10px 15px;
      }
      
      .logo {
        font-size: 18px;
      }
      
      .logo img {
        height: 30px;
      }
      
      .back-button {
        padding: 6px 12px;
        font-size: 14px;
      }
      
      .server-dropdown-content {
        width: 100%;
        max-width: 400px;
      }
    }
    
    @media (max-width: 480px) {
      .movie-container {
        padding: 0 10px;
      }
      
      .movie-backdrop {
        padding: 15px 0;
      }
      
      .movie-poster {
        width: 160px;
        height: 240px;
      }
      
      .movie-info h1 {
        font-size: 20px;
      }
      
      #movie-overview {
        font-size: 14px;
      }
      
      .movie-meta, .movie-genres span {
        font-size: 13px;
      }
      
      .warning-box {
        font-size: 0.9rem;
        padding: 10px 12px;
      }
      
      .video-container {
        margin-bottom: 20px;
      }
    }
  </style>
</head>
<body>
  <header class="navbar">
    <div class="logo">
      <img src="https://static.vecteezy.com/system/resources/previews/016/699/663/original/graffiti-letter-k-premium-illustration-vector.jpg" alt="KuNime Logo" />
      <span>KuNime</span>
    </div>
    <button id="back-btn" type="button" class="back-button">&#8592; Back to Homepage</button>
  </header>
  
  <main class="movie-container">
    <div id="movie-backdrop" class="movie-backdrop">
      <div class="movie-details">
        <div class="movie-poster">
          <img id="movie-poster" src="" alt="Movie Poster" />
        </div>
        <div class="movie-info">
          <h1 id="movie-title"></h1>
          <p class="movie-meta">
            <span id="movie-release-date"></span> •
            <span id="movie-runtime"></span>
          </p>
          <div id="movie-genres" class="movie-genres"></div>
          <p id="movie-overview"></p>
          
          <div class="movie-actions">
            <button id="play-btn" type="button" class="action-btn play-btn">&#9658; Play</button>
            
            <!-- Movie server selection dropdown -->
            <div class="server-dropdown" id="movie-server-dropdown">
              <button class="server-dropdown-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4z"></path>
                  <path d="M6 10h.01"></path>
                  <path d="M10 10h.01"></path>
                </svg>
                Select Server
              </button>
              <div class="server-dropdown-content" id="movie-server-list">
                <!-- Will be populated by JavaScript -->
              </div>
            </div>
            
            <!-- TV show server selection dropdown and controls (hidden by default, only shown for TV shows) -->
            <div id="tv-only-controls" style="display: none;">
              <div class="server-dropdown" id="tv-server-dropdown">
                <button class="server-dropdown-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
                    <polyline points="17 2 12 7 7 2"></polyline>
                  </svg>
                  Select Server
                </button>
                <div class="server-dropdown-content" id="tv-server-list">
                  <!-- Will be populated by JavaScript -->
                </div>
              </div>
              
              <div class="tv-controls" id="tv-controls">
                <select id="season-select" aria-label="Select Season">
                  <option value="1">Season 1</option>
                </select>
                <select id="episode-select" aria-label="Select Episode">
                  <option value="1">Episode 1</option>
                </select>
              </div>
            </div>
            
            <!-- Warning Box -->
            <div class="warning-box" role="alert" aria-live="polite">
              ⚠️ Some servers may occasionally be unavailable. If the one you selected is not working, please try another for the best experience.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="video-container">
      <iframe id="movie-video" frameborder="0" allowfullscreen loading="lazy" title="Streaming Video Player"></iframe>
      <div class="loader-container" id="loader">
        <span class="loader"></span>
      </div>
    </div>
  </main>
  
  <script>
    // TMDB API configuration
    const API_KEY = '961334ce43e0adcaa714fddec89fcfd9';
    const BASE_URL = 'https://api.themoviedb.org/3';
    const IMG_URL = 'https://image.tmdb.org/t/p/original';
    
    // Player configuration
    const playerConfig = {
      font: "Poppins",
      bgColor: "000000",
      fontColor: "ffffff",
      primaryColor: "34cfeb",
      secondaryColor: "6900e0",
      loader: 1,
      preferredServer: 0, // 0 means no preference
      sourcesToggleType: 2 // 2 = dropdown with server list
    };
    
    // Server number mappings for SuperEmbed
    const serverMap = {
      7: "vidlox",
      11: "fembed", 
      12: "mixdrop",
      17: "upstream",
      18: "videobin",
      21: "doodstream",
      25: "streamtape",
      26: "streamsb",
      29: "voe",
      33: "ninjastream"
    };
    
    document.addEventListener('DOMContentLoaded', () => {
      // Initialize UI elements
      const movieServerDropdown = document.getElementById('movie-server-dropdown');
      const tvOnlyControls = document.getElementById('tv-only-controls');
      const tvServerList = document.getElementById('tv-server-list');
      const movieServerList = document.getElementById('movie-server-list');
      const loaderElement = document.getElementById('loader');
      const videoElement = document.getElementById('movie-video');
      
      // Initialize season and episode selectors
      const seasonSelect = document.getElementById('season-select');
      const episodeSelect = document.getElementById('episode-select');
      
      // Back button handler
      const backBtn = document.getElementById('back-btn');
      backBtn.addEventListener('click', () => {
        window.location.href = 'https://kunimetv.pages.dev/main';
      });
      
      // Get URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const imdbId = urlParams.get('imdb') || 'tt4154796'; // Default to Avengers: Endgame
      const tmdbId = urlParams.get('tmdb') || '299534'; // Default to Avengers: Endgame in TMDB
      const contentType = urlParams.get('type') || 'movie';
      
      // Set up the UI based on content type
      if (contentType === 'tv') {
        movieServerDropdown.style.display = 'none';
        tvOnlyControls.style.display = 'block';
      }
      
      // Define available movie servers (correctly formatted URLs)
      const movieServers = [
        { id: "superembed", name: "Super Embed", url: "https://getsuperembed.link/?video_id={imdbId}&preferred_server={preferredServer}" },
        { id: "vidsrc.me", name: "Vidsrc.me", url: "https://vidsrc.me/embed/{imdbId}/" },
        { id: "fsapi.xyz", name: "FSAPI", url: "https://fsapi.xyz/movie/{imdbId}" },
        { id: "curtstream", name: "CurtStream", url: "https://curtstream.com/movies/imdb/{imdbId}" },
        { id: "moviewp", name: "MovieWP", url: "https://moviewp.com/se.php?video_id={imdbId}" },
        { id: "apimdb", name: "ApiMDB", url: "https://v2.apimdb.net/e/movie/{imdbId}" },
        { id: "gomo", name: "GomoTV", url: "https://gomo.to/movie/{imdbId}" },
        { id: "vidcloud", name: "VidCloud", url: "https://vidcloud.stream/{imdbId}.html" }
      ];
      
      // Define available TV show servers (correctly formatted URLs)
      const tvServers = [
        { id: "superembed", name: "Super Embed", url: "https://getsuperembed.link/?video_id={imdbId}&season={season}&episode={episode}&preferred_server={preferredServer}" },
        { id: "fsapi.xyz", name: "FSAPI", url: "https://fsapi.xyz/tv-imdb/{imdbId}-{season}-{episode}" },
        { id: "moviewp", name: "MovieWP", url: "https://moviewp.com/se.php?video_id={tmdbId}&tmdb=1&s={season}&e={episode}" },
        { id: "apimdb", name: "ApiMDB", url: "https://v2.apimdb.net/e/tmdb/tv/{tmdbId}/{season}/{episode}/" },
        { id: "gdriveplayer", name: "GDrivePlayer", url: "https://databasegdriveplayer.co/player.php?type=series&tmdb={tmdbId}&season={season}&episode={episode}" },
        { id: "curtstream", name: "CurtStream", url: "https://curtstream.com/series/tmdb/{tmdbId}/{season}/{episode}/" }
      ];
      
      // Populate season and episode selectors
      function populateSeasons(maxSeasons = 3) {
        seasonSelect.innerHTML = '';
        for (let i = 1; i <= maxSeasons; i++) {
          const option = document.createElement('option');
          option.value = i;
          option.textContent = `Season ${i}`;
          seasonSelect.appendChild(option);
        }
      }
      
      function populateEpisodes(maxEpisodes = 10) {
        episodeSelect.innerHTML = '';
        for (let i = 1; i <= maxEpisodes; i++) {
          const option = document.createElement('option');
          option.value = i;
          option.textContent = `Episode ${i}`;
          episodeSelect.appendChild(option);
        }
      }
      
      populateSeasons();
      populateEpisodes();
      
      seasonSelect.addEventListener('change', populateEpisodes);
      
      // Populate server selection dropdowns
      function populateServerList(listElement, servers) {
        listElement.innerHTML = '';
        
        servers.forEach(server => {
          const link = document.createElement('a');
          link.href = '#';
          link.textContent = server.name;
          link.dataset.serverId = server.id;
          
          link.addEventListener('click', (e) => {
            e.preventDefault();
            loadServer(server);
          });
          
          listElement.appendChild(link);
        });
      }
      
      populateServerList(movieServerList, movieServers);
      populateServerList(tvServerList, tvServers);
      
      // Function to load a server
      function loadServer(server) {
        // Show the loader
        loaderElement.style.display = 'flex';
        
        // Determine if content is TV or movie based on URL parameter
        const isTV = contentType === 'tv';
        const season = seasonSelect.value;
        const episode = episodeSelect.value;
        
        // Prepare the URL by replacing placeholders
        let url = server.url;
        url = url.replace(/{imdbId}/g, imdbId);
        url = url.replace(/{preferredServer}/g, playerConfig.preferredServer);
        
        if (isTV) {
          url = url.replace(/{season}/g, season);
          url = url.replace(/{episode}/g, episode);
          if (url.includes('{tmdbId}')) {
            url = url.replace(/{tmdbId}/g, tmdbId);
          }
        }
        
        // Load the video
        videoElement.src = url;
        
        // Set up the event listeners for the iframe
        videoElement.onload = () => {
          loaderElement.style.display = 'none';
        };
        
        // Add a fallback to hide loader if the iframe somehow doesn't trigger onload
        setTimeout(() => {
          loaderElement.style.display = 'none';
        }, 10000); // Hide loader after 10 seconds if it doesn't load
      }
      
      // Play button click handler
      document.getElementById('play-btn').addEventListener('click', () => {
        // Choose SuperEmbed as the default server for either movie or TV
        const defaultServer = contentType === 'tv' ? tvServers[0] : movieServers[0];
        
        // Load the server
        loadServer(defaultServer);
      });
      
      // Fetch movie/show data from TMDB API
      async function fetchMovieData() {
        try {
          // Get content type from URL parameter
          const type = contentType === 'tv' ? 'tv' : 'movie';
          
          // Create URL for API request
          let apiUrl;
          if (tmdbId) {
            apiUrl = `${BASE_URL}/${type}/${tmdbId}?api_key=${API_KEY}`;
          } else {
            // For IMDb ID, need to use the find endpoint
            apiUrl = `${BASE_URL}/find/${imdbId}?api_key=${API_KEY}&external_source=imdb_id`;
          }
          
          const response = await fetch(apiUrl);
          let data = await response.json();
          
          // If using the find endpoint, need to extract the result
          if (apiUrl.includes('/find/')) {
            const results = type === 'movie' ? data.movie_results : data.tv_results;
            
            if (results && results.length > 0) {
              // Get the first result's ID and make another request
              const id = results[0].id;
              const detailsResponse = await fetch(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}`);
              data = await detailsResponse.json();
            } else {
              throw new Error('Content not found');
            }
          }
          
          // Update UI with movie/TV show data
          document.getElementById('movie-title').textContent = data.title || data.name;
          document.getElementById('movie-overview').textContent = data.overview;
          
          if (data.poster_path) {
            document.getElementById('movie-poster').src = `${IMG_URL}${data.poster_path}`;
          }
          
          // Set backdrop image
          if (data.backdrop_path) {
            document.getElementById('movie-backdrop').style.backgroundImage = `url(${IMG_URL}${data.backdrop_path})`;
          }
          
          // Set release date or first air date
          const dateString = data.release_date || data.first_air_date;
          document.getElementById('movie-release-date').textContent = formatDate(dateString);
          
          // Set runtime or episode runtime
          let runtime = data.runtime;
          if (!runtime && data.episode_run_time && data.episode_run_time.length) {
            runtime = data.episode_run_time[0];
          }
          document.getElementById('movie-runtime').textContent = formatRuntime(runtime);
          
          // Update genres
          const genresElement = document.getElementById('movie-genres');
          genresElement.innerHTML = '';
          
          if (data.genres && data.genres.length) {
            data.genres.forEach(genre => {
              const span = document.createElement('span');
              span.textContent = genre.name;
              genresElement.appendChild(span);
            });
          }
          
          // If it's a TV show, update season/episode information
          if (type === 'tv' && data.number_of_seasons) {
            populateSeasons(data.number_of_seasons);
            
            // When a season is selected, update episodes
            seasonSelect.addEventListener('change', () => {
              const seasonNum = parseInt(seasonSelect.value);
              const season = data.seasons.find(s => s.season_number === seasonNum);
              
              if (season) {
                populateEpisodes(season.episode_count);
              } else {
                populateEpisodes(10); // Default
              }
            });
            
            // Trigger once to initialize first season's episodes
            const event = new Event('change');
            seasonSelect.dispatchEvent(event);
          }
          
        } catch (error) {
          console.error('Error fetching data:', error);
          
          // Fallback to basic data
          document.getElementById('movie-title').textContent = "Video Content";
          document.getElementById('movie-overview').textContent = "Content information not available.";
        }
      }
      
      // Helper function to format date
      function formatDate(dateString) {
        if (!dateString) return 'Unknown';
        return new Date(dateString).getFullYear();
      }
      
      // Helper function to format runtime
      function formatRuntime(minutes) {
        if (!minutes) return 'Unknown';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
      }
      
      // Initialize page with content data
      fetchMovieData();
    });
  </script>
</body>
</html>
