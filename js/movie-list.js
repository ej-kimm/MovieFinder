import {
  getPopularMovies,
  getSearchMovie,
  getMovieImage,
} from '../api/movies.js'
import { updateBanner } from './banner.js'

const movieList = document.querySelector('.movie-list')
let hoverTimeout = null

export async function updateMovieCards(query) {
  let movies = null

  query
    ? (movies = await getSearchMovie(query))
    : (movies = await getPopularMovies())

  if (movies && movies.length > 0) {
    updateBanner(movies[Math.floor(Math.random() * movies.length)]) // 초기 Banner 사진 랜덤 설정

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

// movie-card hover(1초)했을 때 banner 사진 변경
movieList.addEventListener('mouseover', function (e) {
  const hoveredCard = e.target.closest('.movie-card')

  if (hoveredCard) {
    const movieTitle = hoveredCard.querySelector('h2').textContent
    const moviePoster = hoveredCard.querySelector('img').src

    hoverTimeout = setTimeout(() => {
      updateBanner({ title: movieTitle, poster_path: moviePoster })
    }, 1000)
  }
})

// movie-card 1초 전에 hover를 떼어도 banner 사진 변경 금지
movieList.addEventListener('mouseout', function (e) {
  const hoveredCard = e.target.closest('.movie-card')

  if (hoveredCard && hoverTimeout) {
    clearTimeout(hoverTimeout)
    hoverTimeout = null
  }
})

window.onload = updateMovieCards()
