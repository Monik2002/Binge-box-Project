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
            </p>
            <small class="text-muted">Adult: 
              ${movie.adult ? `18+` : `All Ages`}
            </small>
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
           show.poster_path
             ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.title}"/>`
             : `<img src="https://via.placeholder.com/500x750" class="card-img-top" alt="${show.name}"/>`
         }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${show.first_air_date}</small>
              <small class="text-muted">Adult:
              ${show.adult}
              </small>
            </p>
          </div>
          `;
    document.querySelector("#popular-shows").appendChild(div);
  });
}

async function displayMovieDetails() {
  const movieId = window.location.search.split("=")[1];
  const movie = await fetchApidata(`movie/${movieId}`);
  displayBackgroundImage("movie", movie.backdrop_path);
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `<div class="details-top">
          <div>
          ${
            movie.poster_path
              ? `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
              />`
              : `<img src="https://via.placeholder.com/500x750" class="card-img-top" alt="${movie.name}"/>`
          }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres : </h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join(" ")}
            </ul>
            <a href="${
              movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
    <div class="details-bottom">
      <h2>Movie Info</h2>
      <ul>
        <li><span class="text-secondary">Budget:</span> $${movie.budget}</li>
        <li><span class="text-secondary">Revenue:</span> ${movie.revenue}</li>
        <li><span class="text-secondary">Runtime:</span> ${
          movie.runtime
        } min </li>
        <li><span class="text-secondary">Status:</span> ${movie.status}</li>
      </ul>
      <h4>Production Companies</h4>
      <div class="list-group">
      ${movie.production_companies
        .map((company) => `<span>${company.name}</span>`)
        .join(", ")}
      </div>
    </div>`;
  document.querySelector("#movie-details").appendChild(div);
}

async function displayBackgroundImage(type, path) {}
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
      displayPopTVShows();
      break;
    case "/movie-details.html":
      displayMovieDetails();
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
