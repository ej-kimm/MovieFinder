import {
  getPopularMovies,
  getSearchMovie,
  getMovieDetail,
} from '../api/movies.js'
import { updateBanner } from './banner.js'
import { makeMovieCard } from './components/movie-card.js'
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
