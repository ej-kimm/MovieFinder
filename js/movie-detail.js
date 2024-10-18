import { getMovieImage } from '../api/movies.js'

const movieDetail = document.querySelector('.movie-detail')
const poster = document.querySelector('.poster')
const movieDetailInfo = document.querySelector('.movie-detail-info')
const title = movieDetailInfo.querySelector('.title dd')
const genre = movieDetailInfo.querySelector('.genre dd')
const overview = movieDetailInfo.querySelector('.overview dd')
const releaseDate = movieDetailInfo.querySelector('.release-date dd')
const rating = movieDetailInfo.querySelector('.rating dd')
const closeBtn = document.querySelector('.btn-close')
const overlay = document.querySelector('.overlay')

// modal
export function updateMovieDetail(movie) {
  if (movie) {
    poster.style.backgroundImage = `url(${getMovieImage(movie.poster_path)})`
    title.textContent = movie.title
    genre.innerHTML = movie.genres
      .map(
        (genre) => `<button class="btn-primary btn-32">${genre.name}</button>`
      )
      .join(' ')
    overview.textContent = movie.overview
    releaseDate.textContent = movie.release_date
    rating.textContent = '⭐'.repeat(Math.floor(movie.vote_average))
    overlay.style.backgroundImage = `url(${getMovieImage(movie.backdrop_path)})`

    movieDetail.classList.toggle('is-active')
    overlay.classList.toggle('is-active')
  }
}

closeBtn.addEventListener('click', function () {
  movieDetail.classList.toggle('is-active')
  overlay.classList.toggle('is-active')
})
