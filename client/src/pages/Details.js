import React, { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingSpin from '../components/LoadingSpin'
import { getMovieID, getSimiliarMovies } from '../config/axios'
import Navbar from '../components/Navbar'
import MovieCard from '../components/MovieCard'

function Details() {
  const params = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [movie, setMovie] = useState(null)
  const [similiarMovies, setSimiliarMovies] = useState([])
  const [page,setPage] = useState(1)

  async function getMovie(){
    const data = await getMovieID(params.id)
    console.log(data);
    setMovie(data)
    setIsLoading(false)
  }

  async function fetchInitSimiliar () {
    const data = await getSimiliarMovies(params.id,page)
    setSimiliarMovies(data)
  }

  async function fetchSimiliarMovies () {
    const data = await getSimiliarMovies(params.id,page)
    console.log(data);
    await setSimiliarMovies(similiarMovies.concat(data))
  }

  const handleIntersectorObserved = () => {
    setPage( page + 1)
  }

  useEffect(() => {
    setIsLoading(true)
    getMovie()
    fetchInitSimiliar()
  },[params.id])

  useEffect(() => {
    if(!isLoading) {
      fetchSimiliarMovies()
      console.log('observerd detail');
    }
  },[page])

  if(isLoading) return <LoadingSpin/>

  return (
    <div className="w-full bg-blue-100 min-h-screen">
      <Navbar/>
      <div className="container mx-auto flex flex-col mt-4">
        <div className="w-full flex flex-row">
          <div className="container p-0 justify-start w-1/2 flex flex-col items-start gap-10 mt-7">
            <h5><p className="font-bold">TITLE:</p> {movie.original_title}</h5>
            <h6><p className="font-bold">RELEASE YEAR:</p> {movie.release_date.split('').slice(0,4).join('')}</h6>
            <h6><p className="font-bold">DESCRIPTION:</p> {movie.overview}</h6>
          </div>
          <div className="p-0 w-1/2 flex flex-row justify-center">
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt=""/>
          </div>
        </div>
        <h4 className="font-bold mt-12">RELATED MOVIES:</h4>
        <div className="container justify-center md:mx-auto grid grid-cols-1 md:grid-cols-5 md:gap-4">
          {similiarMovies?.map( (movie, i) => {
            if(i === (similiarMovies.length - 4)){
              return <MovieCard key={movie.id} movie={movie} intersector={true} observed={handleIntersectorObserved} inDetail={true}/>
            }
            return <MovieCard key={movie.id} movie={movie} intersector={false} inDetail={true}/>
          })}
        </div>
      </div>
    </div>
  )
}

export default Details