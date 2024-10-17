import {
  getPopularMovies,
  getSearchMovie,
  getMovieImage,
} from '../api/movies.js'
import { updateBanner } from './banner.js'

const movieList = document.querySelector('.movie-list')

export async function updateMovieCards(query) {
  let movies = null

  query
    ? (movies = await getSearchMovie(query))
    : (movies = await getPopularMovies())

  if (movies && movies.length > 0) {
    updateBanner(movies[Math.floor(Math.random() * movies.length)])

    movieList.innerHTML = ''
    movies.forEach((movie) => {
      const movieCard = makeMovieCard(movie)
      movieList.appendChild(movieCard)
    })
  }
}

// 영화 카드 생성 함수
function makeMovieCard(movie) {
  const movieCard = document.createElement('button')
  movieCard.classList.add('movie-card')

  const imgWrapper = document.createElement('div')
  imgWrapper.classList.add('img-wrapper')

  const movieImg = document.createElement('img')
  movieImg.src = getMovieImage(movie.poster_path)
  movieImg.alt = `${movie.title}`

  imgWrapper.appendChild(movieImg)

  const movieTitle = document.createElement('h2')
  movieTitle.textContent = movie.title

  const movieRating = document.createElement('p')
  const rating = Math.floor(movie.vote_average)
  movieRating.textContent = '⭐'.repeat(rating)

  movieCard.appendChild(imgWrapper)
  movieCard.appendChild(movieTitle)
  movieCard.appendChild(movieRating)

  return movieCard
}

window.onload = updateMovieCards()
