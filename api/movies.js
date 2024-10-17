const API_KEY = '22fbac1adbd9708d5158d657e4a4dbb4'
const MOVIE_API_BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_API_BASE_URL = 'https://image.tmdb.org/t/p/original'

export async function getPopularMovies() {
  return fetch(
    `${MOVIE_API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`
  )
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((err) => console.error(err))
}

export function getMovieImage(url) {
  return `${IMAGE_API_BASE_URL}/${url}`
}

export async function getSearchMovie(title) {
  return fetch(
    `${MOVIE_API_BASE_URL}/search/movie?query=${title}&api_key=${API_KEY}&language=ko-KR&page=1`
  )
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((err) => console.error(err))
}
