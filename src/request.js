document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "21a573ad60a6315aa3f1df90fe857dc4"; // Substitua pelo seu API key da TMDB
  const movieContainer = document.getElementById("movie-container");
  const popularLink = document.getElementById("popular");
  const actionLink = document.getElementById("action");
  const comedyLink = document.getElementById("comedy");
  const animationLink = document.getElementById("animation");

  // Função para buscar filmes com base na categoria
  async function fetchMovies(category) {
    try {
      // Mapeie as categorias para os IDs da TMDB (você pode adicionar mais mapeamentos conforme necessário)
      const categoryMap = {
        "Filmes Populares": "popular",
        Ação: "28",
        Comédia: "35",
        Animação: "16",
      };

      const categoryId = categoryMap[category];
      if (!categoryId) {
        console.log("Categoria não mapeada.");
        return;
      }

      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${categoryId}`
      );

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

  // Adicione manipuladores de eventos de clique para as categorias
  popularLink.addEventListener("click", () => fetchMovies("Filmes Populares"));
  actionLink.addEventListener("click", () => fetchMovies("Ação"));
  comedyLink.addEventListener("click", () => fetchMovies("Comédia"));
  animationLink.addEventListener("click", () => fetchMovies("Animação"));

  // Carregue os filmes populares por padrão
  fetchMovies("Filmes Populares");
});
