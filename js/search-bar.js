import { updateMovieCards } from './movie-list.js'

const searchInput = document.querySelector('.search-input')
const searchButton = document.querySelector('.search-button')

const debounce = (callback, delay) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => callback.apply(this, args), delay)
  }
}

searchButton.addEventListener('click', function () {
  const query = searchInput.value.toLowerCase()
  query && updateMovieCards(query)
})

searchInput.addEventListener(
  'input',
  debounce(function () {
    const query = searchInput.value.toLowerCase()
    query ? updateMovieCards(query) : updateMovieCards()
  }, 300)
)
