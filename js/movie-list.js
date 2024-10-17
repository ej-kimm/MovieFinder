import {
  getPopularMovies,
  getSearchMovie,
  getMovieImage,
  getMovieDetail,
} from '../api/movies.js'
import { updateBanner } from './banner.js'
import { updateMovieDetail } from './movie-detail.js'

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
  movieCard.id = movie.id // Detail을 불러오기 위한 id
  movieCard.backdropPath = movie.backdrop_path

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

// movie-card 클릭했을 때 영화 세부정보 모달창을 띄움
movieList.addEventListener('click', async function (e) {
  const clickedCard = e.target.closest('.movie-card')
  const movieId = clickedCard.id

  if (clickedCard) {
    const movieDetail = await getMovieDetail(movieId)
    updateMovieDetail(movieDetail)
  }
})

// movie-card hover(1초)했을 때 banner 사진 변경
movieList.addEventListener('mouseover', function (e) {
  const hoveredCard = e.target.closest('.movie-card')

  if (hoveredCard) {
    const movieTitle = hoveredCard.querySelector('h2').textContent
    const backdropPath = hoveredCard.backdropPath

    hoverTimeout = setTimeout(() => {
      updateBanner({ title: movieTitle, backdrop_path: backdropPath })
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
