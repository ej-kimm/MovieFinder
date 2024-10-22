import {
  isMovieBookmarked,
  removeToBookmark,
  saveToBookmark,
} from '../api/bookmark.js'
import { getMovieImage } from '../api/movies.js'

const movieDetail = document.querySelector('.movie-detail')
const poster = document.querySelector('.poster')
const movieDetailInfo = document.querySelector('.movie-detail-info')
const title = movieDetailInfo.querySelector('.title dd')
const genre = movieDetailInfo.querySelector('.genre dd')
const overview = movieDetailInfo.querySelector('.overview dd')
const releaseDate = movieDetailInfo.querySelector('.release-date dd')
const rating = movieDetailInfo.querySelector('.rating dd')
const bookmarkBtn = movieDetailInfo.querySelector('.btn-bookmark')
const removeBookmarkBtn = movieDetailInfo.querySelector('.btn-remove-bookmark')
const closeBtn = document.querySelector('.btn-close')
const overlay = document.querySelector('.overlay')

let currentMovie = null

// modal
export function updateMovieDetail(movie) {
  if (movie) {
    currentMovie = movie
    poster.style.backgroundImage = `url(${getMovieImage(
      movie.poster_path,
      500
    )})`
    title.textContent = movie.title
    genre.innerHTML = movie.genres
      .map(
        (genre) => `<button class="btn-primary btn-32">${genre.name}</button>`
      )
      .join(' ')
    overview.textContent = movie.overview
      ? movie.overview
      : '😂줄거리가 없습니다'
    releaseDate.textContent = movie.release_date
    rating.textContent = '⭐'.repeat(Math.floor(movie.vote_average))
    overlay.style.backgroundImage = `url(${getMovieImage(
      movie.backdrop_path,
      'original'
    )})`

    movieDetail.classList.toggle('is-active')
    overlay.classList.toggle('is-active')
    updateBookmarkButtons(movie.id)
  }
}

function updateBookmarkButtons(movieId) {
  if (isMovieBookmarked(movieId)) {
    bookmarkBtn.style.display = 'none'
    removeBookmarkBtn.style.display = 'block'
  } else {
    bookmarkBtn.style.display = 'block'
    removeBookmarkBtn.style.display = 'none'
  }
}

// 북마크 버튼 클릭 이벤트
bookmarkBtn.addEventListener('click', function () {
  saveToBookmark(currentMovie)
  updateBookmarkButtons(currentMovie.id)
})

removeBookmarkBtn.addEventListener('click', function () {
  removeToBookmark(currentMovie)
  updateBookmarkButtons(currentMovie.id)
})

// 모달 창 닫기 버튼 클릭 이벤트
closeBtn.addEventListener('click', function () {
  movieDetail.classList.toggle('is-active')
  overlay.classList.toggle('is-active')
})
