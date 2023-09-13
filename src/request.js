const apiKey = "1e75eb9f";
const movieContainer = document.getElementById("movie-container");

    async function fetchMovies() {
      try {
        const type = "movie"; // Para buscar filmes populares
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${apiKey}&s=${type}`
        );

        if (response.ok) {
          const data = await response.json();

          if (data.Search) {
            const movies = data.Search;
            movieContainer.innerHTML = "";

            for (const movie of movies) {
              const title = movie.Title;
              const posterPath = movie.Poster;
              const releaseYear = movie.Year;

              const movieCard = document.createElement("div");
              movieCard.classList.add("movie-card");
              movieCard.innerHTML = `
                <img src="${posterPath}" alt="${title}">
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

    fetchMovies();