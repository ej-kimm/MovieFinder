const movieDetail = document.querySelector('.movie-detail')
const poster = document.querySelector('.poster')
const movieDetailInfo = document.querySelector('.movie-detail-info')
const title = movieDetailInfo.querySelector('.title dd')
const genre = movieDetailInfo.querySelector('.genre dd')
const overview = movieDetailInfo.querySelector('.overview dd')
const releaseDate = movieDetailInfo.querySelector('.release-date dd')
const rating = movieDetailInfo.querySelector('.rating dd')
const closeBtn = document.querySelector('.btn-close')

// modal
export function updateMovieDetail(movie) {
  if (movie) {
    movieDetail.classList.toggle('is-active')
  }
}

closeBtn.addEventListener('click', function () {
  movieDetail.classList.toggle('is-active')
})
