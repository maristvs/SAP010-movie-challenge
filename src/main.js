import './styles.css';

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const movieList = document.getElementById('movieList');

searchButton.addEventListener('click', searchMovies);

function searchMovies() {
  const searchTerm = searchInput.value;

  fetch(`https://www.omdbapi.com/?apikey=YOUR_API_KEY&s=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      if (data.Search) {
        displayMovies(data.Search);
      } else {
        movieList.innerHTML = '<p>No movies found.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching movies:', error);
    });
}

function displayMovies(movies) {
  movieList.innerHTML = '';
  movies.forEach(movie => {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');
    movieItem.innerHTML = `<h2>${movie.Title}</h2>`;
    movieList.appendChild(movieItem);
  });
}