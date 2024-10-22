import { getMovieImage } from '../../api/movies.js'

// 영화 카드 생성 함수
export function makeMovieCard(movie) {
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
