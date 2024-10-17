import { getMovieImage } from '../api/movies.js'

const bannerTitle = document.querySelector('.banner-title')
const bannerImg = document.querySelector('.banner-button img')

export function updateBanner(movie) {
  bannerTitle.innerHTML = movie.title
  bannerImg.src = getMovieImage(movie.poster_path)
  bannerImg.alt = `${movie.title}`
}
