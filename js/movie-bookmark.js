import { getBookmarkedMovies } from '../api/bookmark.js'
import { getMovieDetail } from '../api/movies.js'
import { makeMovieCard } from './components/movie-card.js'
import { updateMovieDetail } from './movie-detail.js'

const movieBookmarkList = document.querySelector('.movie-bookmark-list')
const movieBookmarkBtn = document.querySelector('.movie-bookmark')
const bookmarks = document.querySelector('.bookmarks')

function showMovieBookmark() {
  const movies = getBookmarkedMovies()

  bookmarks.innerHTML = ''
  movies.forEach((movie) => {
    const movieCard = makeMovieCard(movie)
    bookmarks.appendChild(movieCard)
  })
}

bookmarks.addEventListener('click', async function (e) {
  const clickedCard = e.target.closest('.movie-card')
  const movieId = clickedCard.id

  if (clickedCard) {
    const movieDetail = await getMovieDetail(movieId)
    updateMovieDetail(movieDetail)
  }
})

movieBookmarkBtn.addEventListener('click', function () {
  movieBookmarkList.classList.toggle('is-active')
  showMovieBookmark()
})

document.addEventListener('click', function (e) {
  const isClickInside =
    movieBookmarkBtn.contains(e.target) || movieBookmarkList.contains(e.target)

  if (!isClickInside) {
    movieBookmarkList.classList.remove('is-active')
  }
})
