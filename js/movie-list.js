import { getPopularMovies } from '../api/movies.js'
import { getMovieImage } from '../api/movies.js'

const FIRST_BANNER_NUMBER = Math.floor(Math.random() * 20)

const bannerTitle = document.querySelector('.banner-title')
const bannerImg = document.querySelector('.banner-button img')
const movieList = document.querySelector('.movie-list')

async function updateMovieCards() {
  const movies = await getPopularMovies()

  if (movies && movies.length > 0) {
    createInitialBanner(movies[FIRST_BANNER_NUMBER])

    movies.forEach((movie) => {
      const movieCard = makeMovieCard(movie)
      movieList.appendChild(movieCard)
    })
  } else {
    alert('😅영화를 찾을 수 없습니다!')
  }
}

// 배너 초기 세팅 함수
function createInitialBanner(movie) {
  bannerTitle.innerHTML = movie.title
  bannerImg.src = getMovieImage(movie.poster_path)
  bannerImg.alt = `${movie.title}`
}

// 영화 카드 생성 함수
function makeMovieCard(movie) {
  const movieCard = document.createElement('div')
  movieCard.classList.add('movie-card')

  const movieImg = document.createElement('img')
  movieImg.src = getMovieImage(movie.poster_path)
  movieImg.alt = `${movie.title}`

  const movieTitle = document.createElement('h2')
  movieTitle.textContent = movie.title

  const movieRating = document.createElement('p')
  const rating = Math.floor(movie.vote_average)
  movieRating.textContent = '⭐'.repeat(rating)

  movieCard.appendChild(movieImg)
  movieCard.appendChild(movieTitle)
  movieCard.appendChild(movieRating)

  return movieCard
}

window.onload = updateMovieCards
