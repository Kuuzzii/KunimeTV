function createMovieCard(item) {
  const div = document.createElement('div');
  div.className = 'anime-item';
  div.innerHTML = `
    <a href="watch.html?id=${item.id}&type=movie">
      <img src="${IMG_URL}${item.poster_path}" alt="${item.title}" />
    </a>
    <div class="info">
      <div class="title">${item.title}</div>
      <div class="score">⭐ ${item.vote_average ?? 'N/A'}</div>
    </div>
  `;
  return div;
}

function displayMovies(movies) {
  moviesList.innerHTML = '';
  movies.forEach(movie => {
    if (movie.poster_path) {
      moviesList.appendChild(createMovieCard(movie));
    }
  });
}

async function loadMovies(page = 1) {
  const data = await fetchMovies(page);
  displayMovies(data.results);
  currentPage = page;
  currentPageSpan.textContent = currentPage;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage >= data.total_pages;
  // Update URL without reload
  history.replaceState(null, '', `movies.html?page=${currentPage}`);
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    loadMovies(currentPage - 1);
  }
});

nextBtn.addEventListener('click', () => {
  loadMovies(currentPage + 1);
});

// Initial load
loadMovies(currentPage);
