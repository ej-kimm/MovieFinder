export function isMovieBookmarked(movieId) {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || []
  return bookmarks.find((bookmark) => bookmark.id === movieId)
}

export function getBookmarkedMovies() {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || []
  return bookmarks
}

export function saveToBookmark(movie) {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || []

  if (!isMovieBookmarked(movie.id)) {
    localStorage.setItem('bookmarks', JSON.stringify([...bookmarks, movie]))
    alert(`✅[${movie.title}] 북마크에 저장 완료!`)
  }
}

export function removeToBookmark(movie) {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || []
  const filteredBookmarks = bookmarks.filter(
    (bookmark) => bookmark.id !== movie.id
  )
  localStorage.setItem('bookmarks', JSON.stringify(filteredBookmarks))
  alert(`❌[${movie.title}] 북마크 해제 완료!`)
}
