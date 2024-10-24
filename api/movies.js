const API_KEY = '22fbac1adbd9708d5158d657e4a4dbb4'
const MOVIE_API_BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_API_BASE_URL = 'https://image.tmdb.org/t/p'

export async function getPopularMovies(page) {
  try {
    const response = await fetch(
      `${MOVIE_API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`
    )
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error(error)
  }
}

export function getMovieImage(url, size = 'original') {
  if (size === 200) {
    return `${IMAGE_API_BASE_URL}/w200${url}`
  }
  if (size === 500) {
    return `${IMAGE_API_BASE_URL}/w500${url}`
  }
  if (size === 'original') {
    return `${IMAGE_API_BASE_URL}/original${url}`
  }
}

export async function getTotalPage() {
  try {
    const response = await fetch(
      `${MOVIE_API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR`
    )
    const data = await response.json()
    return data.total_pages
  } catch (error) {
    console.error(error)
  }
}

export async function getSearchMovie(title) {
  try {
    const response = await fetch(
      `${MOVIE_API_BASE_URL}/search/movie?query=${title}&api_key=${API_KEY}&language=ko-KR&page=1`
    )
    const data = await response.json()
    return data.results
  } catch (error) {
    console.error(error)
  }
}

export async function getMovieDetail(id) {
  try {
    const response = await fetch(
      `${MOVIE_API_BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR`
    )
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}
