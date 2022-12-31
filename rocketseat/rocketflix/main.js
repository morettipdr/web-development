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
  let noMovie = true
  while(noMovie){
    const movieID = Math.floor(Math.random() * 40000)
    await fetch(BASE_URL + movieID + "?" + API_KEY + language).then(response => response.json()).then(data => {
      console.log(data);
      posterPath = data.poster_path;
      movieTitle.textContent = data.title
      movieDetails.textContent = data.overview
      movie.style.display = "flex";
      noMovie = false;
      movieImage.src = IMG_URL + posterPath
      if(data.success == false) {
        movieImage.src = "./assets/Poster.jpg"
        movieTitle.innerHTML = "Ops, hoje não é dia de assistir filme. <br> Bora codar! 🚀"
      }
    }).catch(e => console.log(e))
    }
})
