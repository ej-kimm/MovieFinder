import { updateMovieCards } from './movie-list.js'

const searchInput = document.querySelector('.search-input')
const searchButton = document.querySelector('.search-button')

searchButton.addEventListener('click', function () {
  const query = searchInput.value.toLowerCase()
  query && updateMovieCards(query)
})

searchInput.addEventListener('input', function (e) {
  const query = searchInput.value.toLowerCase()
  query ? updateMovieCards(query) : updateMovieCards()
})
