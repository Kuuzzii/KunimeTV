const API_KEY = 'a1e72fd93ed59f56e6332813b9f8dcae';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/original';
let currentItem;

async function fetchKitsuTrendingAnime() {
  const res = await fetch('https://kitsu.io/api/edge/trending/anime');
  const data = await res.json();
  
  // Extract the relevant information
  return data.data.map(item => ({
    id: item.id,
    title: item.attributes.titles.en_jp || item.attributes.titles.en || item.attributes.canonicalTitle,
    poster: item.attributes.posterImage.large,  // Poster image URL
    cover: item.attributes.coverImage?.original || item.attributes.posterImage.original,  // Cover image URL
    synopsis: item.attributes.synopsis  // Anime description
  }));
}

function displayBanner(item) {
  const banner = document.getElementById('banner');
  const title = document.getElementById('banner-title');
  const description = document.getElementById('banner-description');

  // Check if 'item' contains valid data
  if (item && item.cover) {
    banner.style.backgroundImage = `url(${item.cover})`;
    title.textContent = item.title;
    description.textContent = item.synopsis?.slice(0, 180) + '...' || "No description available";
  } else {
    banner.style.backgroundImage = `url('fallback-image.jpg')`;  // Use a fallback image
    title.textContent = "No featured anime";
    description.textContent = "Please try again later.";
  }

  currentItem = item; // Set the current item for "Watch Now" button
}

async function init() {
  const kitsuAnime = await fetchKitsuTrendingAnime();  // Fetch anime data from Kitsu API
  const randomAnime = kitsuAnime[Math.floor(Math.random() * kitsuAnime.length)];  // Pick a random anime

  // Display the banner with random anime
  displayBanner(randomAnime);
}

init();  // Run the init function when the page loads
