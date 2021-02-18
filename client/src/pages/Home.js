import React, { useEffect, useState } from 'react'
import { movieNowPlaying } from '../config/axios'
import LoadingSpin from '../components/LoadingSpin'
import MovieCard from '../components/MovieCard'
import Navbar from '../components/Navbar'

function Home(){
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchMovies = async () => {
    setIsLoading(true)
    try {
      const data = await movieNowPlaying(`language=en-US&page=${page}`)
      console.log(data);
      await setMovies(movies.concat(data))
      setIsLoading(false)
    } catch (err) {
      console.log(err);
    }
  }
  
  const handleIntersectorObserved = () => {
    setPage( page + 1)
  }

  useEffect(() => {
    fetchMovies()
  },[])

  useEffect(() => {
    if(!isLoading) {
      fetchMovies()
    }
  },[page])

  return (
    <div className="w-full bg-blue-100 min-h-screen">
      <Navbar/>
      <div className="container justify-center md:mx-auto grid grid-cols-1 md:grid-cols-3 md:gap-4">
        {
          movies.map((movie,i) => {
            if(i === (movies.length - 4)){
              return <MovieCard key={movie.id} movie={movie} intersector={true} observed={handleIntersectorObserved}/>
            }
            return <MovieCard key={movie.id} movie={movie} intersector={false}/>
          })
        }
      </div>
      { isLoading ? 
        <LoadingSpin/> 
        : 
        ""
      }
    </div>
  )
}

export default Home