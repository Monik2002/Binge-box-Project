const global = {
  currentPage: window.location.pathname,
};

async function displayPopMovies() {
  const { results } = await fetchApidata("movie/popular");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
         ${
           movie.poster_path
             ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}"/>`
             : `<img src="https://via.placeholder.com/500x750" class="card-img-top" alt="${movie.title}"/>`
         }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
              <small class="text-muted">Adult: 
              ${movie.adult ? `return yes` : `no`}
              </small>
            </p>
          </div>
          `;
    document.querySelector("#popular-movies").appendChild(div);
  });
}
async function displayPopTVShows() {
  const { results } = await fetchApidata("tv/popular");
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href="movie-details.html?id=${show.id}">
         ${
           movie.poster_path
             ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.title}"/>`
             : `<img src="https://via.placeholder.com/500x750" class="card-img-top" alt="${show.title}"/>`
         }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${show.release_date}</small>
              <small class="text-muted">Adult:
              ${show.adult}
              </small>
            </p>
          </div>
          `;
    document.querySelector("#popular-movies").appendChild(div);
  });
}

async function fetchApidata(endpoint) {
  const api_key = "bd4f706e83db516163001a3547952688";
  const url = `https://api.themoviedb.org/3/${endpoint}?api_key=${api_key}&language=en-US`;
  showSpinner();
  const response = await fetch(url);
  const data = await response.json();
  hideSpinner();
  return data;
}

function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}
function highLightActiveLink() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}

function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopMovies();
      break;
    case "/shows.html":
      console.log("meow1");
      break;
    case "/movie-details.html":
      console.log("meow2");
      break;
    case "/tv-details.html":
      console.log("meow3");
      break;
    case "/search.html":
      displayPopMovies();
      break;
  }

  highLightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
