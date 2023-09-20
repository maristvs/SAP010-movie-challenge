export async function fetchMovies(movieType) {
  try {
    const apiKey = "21a573ad60a6315aa3f1df90fe857dc4"; // Substitua pelo seu API key da TMDB
    const movieContainer = document.getElementById("movie-container");
    let apiUrl = "";

    switch (movieType) {
      case "Filmes Populares":
        apiUrl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=" + apiKey;
        break;
      case "Ação":
        apiUrl = "https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=" + apiKey;
        break;
      case "Comédia":
        apiUrl = "https://api.themoviedb.org/3/discover/movie?with_genres=35&api_key=" + apiKey;
        break;
      case "Desenho":
        apiUrl = "https://api.themoviedb.org/3/discover/movie?with_genres=16&api_key=" + apiKey;
        break;
      default:
        console.log("Categoria não mapeada.");
        return;
    }

    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      if (data.results) {
        const movies = data.results;
        movieContainer.innerHTML = "";

        for (const movie of movies) {
          const title = movie.title;
          const posterPath = movie.poster_path;
          const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "";

          const movieCard = document.createElement("div");
          movieCard.classList.add("movie-card");
          movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${posterPath}" alt="${title}">
            <h2>${title}</h2>
            <p>Lançamento: ${releaseYear}</p>
          `;

          movieContainer.appendChild(movieCard);
        }
      } else {
        console.log("Nenhum filme encontrado.");
      }
    } else {
      console.log(response.status);
    }
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
  }
}
