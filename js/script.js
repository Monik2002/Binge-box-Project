const global = {
  currentPage: window.location.pathname,
  search: {
    term: " ",
    type: " ",
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: "bd4f706e83db516163001a3547952688",
    apiUrl: "https://api.themoviedb.org/3/",
  },
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
            <small class="text-muted">Legal Age : 
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
        } min</li>
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

async function displayTvDetails() {
  const showId = window.location.search.split("=")[1];
  const show = await fetchApidata(`tv/${showId}`);
  displayBackgroundImage("tv", show.backdrop_path);
  const div = document.createElement("div");
  div.innerHTML = `<div class="details-top">
          <div>
          ${
            show.poster_path
              ? `<img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.name}"
              />`
              : `<img src="https://via.placeholder.com/500x750" class="card-img-top" alt="${show.name}"/>`
          }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres : </h5>
            <ul class="list-group">
              ${show.genres.map((genre) => `<li>${genre.name}</li>`).join(" ")}
            </ul>
            <a href="${
              show.homepage
            }" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
    <div class="details-bottom">
      <h2>show Info</h2>
      <ul>
        <li><span class="text-secondary">Episodes:</span> $${
          show.number_of_episodes
        }</li>
        <li><span class="text-secondary">Last Episode To Air:</span> ${
          show.last_episode_to_air.name
        }</li>
        <li><span class="text-secondary">Status:</span> ${show.status}</li>
      </ul>
      <h4>Production Companies</h4>
      <div class="list-group">
      ${show.production_companies
        .map((company) => `<span>${company.name}</span>`)
        .join(", ")}
      </div>
    </div>`;
  document.querySelector("#show-details").appendChild(div);
}

function displayBackgroundImage(type, path) {
  const overlayDiv = document.createElement("div");
  overlayDiv.classList.add("overlay");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${path})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundAttachment = "fixed";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "fixed";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.2";
  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}

async function search() {
  const query = window.location.search;
  const urlParams = new URLSearchParams(query);
  urlParams;
  global.search.type = urlParams.get("type");
  global.search.term = urlParams.get("search-term");
  if (global.search.term !== "" && global.search.term !== null) {
    const { results, total_pages, page, total_results } = await searchApidata();
    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;
    if (results.length === 0) {
      showAlert("No Results Found");
    }
    displaySearchResults(results);
    document.querySelector("#search-term").value = "";
  } else {
    // window.location.href = "index.html";
    showAlert("Please Enter name of the movie/Show");
  }
}

function displaySearchResults(results) {
  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href="${global.search.type}-details.html?id=${result.id}">
         ${
           result.poster_path
             ? `<img src="https://image.tmdb.org/t/p/w500/${
                 result.poster_path
               }" class="card-img-top" alt="${
                 global.search.type === "movie" ? result.title : result.name
               }"/>`
             : `<img src="https://via.placeholder.com/500x750" class="card-img-top" alt="${
                 global.search.type === "movie" ? result.title : result.name
               }"/>`
         }
          </a>
          <div class="card-body">
            <h5 class="card-title">${
              global.search.type === "movie" ? result.title : result.name
            }</h5>
            <p class="card-text">
              <small class="text-muted">${
                global.search.type === "movie"
                  ? "Release Date"
                  : "First Air Date"
              }: ${
      global.search.type === "movie"
        ? result.release_date
        : result.first_air_date
    }</small>
            </p>
          </div>
          `;
    document.querySelector(
      "#search-results-heading"
    ).innerHTML = `<h2>${results.length} of ${global.search.totalResults} Results found`;
    document.querySelector("#search-results").appendChild(div);
  });
}
async function displayTopRatedMovies() {
  const { results } = await fetchApidata("movie/top_rated");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
            </h4>`;
    document.querySelector(".swiper-wrapper").appendChild(div);
    initSwipper();
  });
}

async function displayTopRatedShows() {
  const { results } = await fetchApidata("tv/top_rated");
  results.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = `
            <a href="show-details.html?id=${show.id}">
              <img src="https://image.tmdb.org/t/p/w200${show.poster_path}" alt="${show.name}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${show.vote_average} / 10
            </h4>`;
    document.querySelector(".swiper-wrapper").appendChild(div);
    initSwipper();
  });
}
function showAlert(message, className) {
  const alertElement = document.createElement("div");
  alertElement.classList.add("alert", className);
  alertElement.appendChild(document.createTextNode(message));
  document.querySelector("#alert-box").appendChild(alertElement);
  setTimeout(() => {
    alertElement.remove();
  }, 3000);
}
function initSwipper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    },
  });
}
async function fetchApidata(endpoint) {
  const api_key = global.api.apiKey;
  const url = `https://api.themoviedb.org/3/${endpoint}?api_key=${api_key}&language=en-US`;
  showSpinner();
  const response = await fetch(url);
  const data = await response.json();
  hideSpinner();
  return data;
}

async function searchApidata() {
  const api_key = global.api.apiKey;
  const url = `https://api.themoviedb.org/3/search/${global.search.type}?api_key=${api_key}&language=en-US&query=${global.search.term}`;
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
      displayTopRatedMovies();
      displayPopMovies();
      break;
    case "/shows.html":
      displayTopRatedShows();
      displayPopTVShows();
      break;
    case "/movie-details.html":
      displayMovieDetails();
      break;
    case "/tv-details.html":
      displayTvDetails();
      break;
    case "/search.html":
      search();
      break;
  }

  highLightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);
