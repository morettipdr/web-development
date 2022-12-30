import {
  API_KEY, BASE_URL,
  IMG_URL,
  language,
} from './api.js'

const button = document.querySelector(".button");
const movie = document.querySelector(".movie");
const movieImage = document.querySelector(".movieImage");
const movieTitle = document.querySelector(".title");
const movieDetails = document.querySelector(".movieDetails");

button.addEventListener("click", async () => {
  let posterPath;
  const movieID = Math.floor(Math.random() * 2000)
  await fetch(BASE_URL + movieID + "?" + API_KEY + "&language=pt-br").then(response => response.json()).then(data => {
    console.log(data);
    posterPath = data.poster_path;
    movieTitle.textContent = data.title
    movieDetails.textContent = data.overview
    movie.hidden = false;
    movieImage.hidden = false;
  }).catch(e => console.log(e))
    movieImage.src = IMG_URL + posterPath
})
