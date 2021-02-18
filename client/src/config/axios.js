import axios from 'axios'

async function movieNowPlaying (url = "") {
  const { data } = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=a3620faebaf080f284e617f7659ffa83&${url}`)
  return data.results
}

async function getMovieID (movieId = "") {
  const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=a3620faebaf080f284e617f7659ffa83&language=en-US`)
  return data
}

async function getSimiliarMovies (movieId = "",page = 1) {
  const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=a3620faebaf080f284e617f7659ffa83&language=en-US&page=${page}`)
  return data.results
}


export {
  movieNowPlaying, getMovieID, getSimiliarMovies
}