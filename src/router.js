import { fetchMovies } from './request.js';

function handleHashChange() {
  const hash = window.location.hash; // Remove o símbolo '#' da hash

  if (hash === "" || hash === "#filmes") {
    fetchMovies("Filmes Populares");
  } else {
    switch (hash) {
      case "#acao":
        fetchMovies("Ação");
        break;
      case "#comedia":
        fetchMovies("Comédia");
        break;
      case "#desenho":
        fetchMovies("Animação");
        break;
      default:
        // Trate qualquer outra hash aqui, se necessário
        break;
    }
  }
}

// Adicione um ouvinte de evento para lidar com mudanças na hash
window.addEventListener("hashchange", handleHashChange);

// Lide com a hash atual quando a página for carregada
document.addEventListener("DOMContentLoaded", handleHashChange);
