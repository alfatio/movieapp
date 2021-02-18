import React, { useEffect , useRef } from 'react'
import { Link } from 'react-router-dom'

function MovieCard (props) {
  const movie = props.movie
  const intersectorRef = useRef(null)

  const handleObserved = (entities) => {
    entities.forEach( entry => {
      if(entry.intersectionRatio > 0){
        console.log('observed');
        props.observed()
        observer.unobserve(intersectorRef.current)
      }
    })
  }
  const observer = new IntersectionObserver(handleObserved)

  useEffect(() => {
    if(props.intersector){
      observer.observe(intersectorRef.current)
    }
  },[])

  let color;
  if(movie.vote_average > 8) color = "bg-green-400"
  else if(movie.vote_average < 6) color = "bg-red-400"
  else color = "bg-yellow-400"


  return (
    <div ref={intersectorRef} className="lg:m-4 shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-white my-12 mx-8 max-w-full">
        <Link to={`/details/${movie.id}`}><img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="poster" className="max-w-full rounded-md" style={{height:'576px'}}/></Link>
        {
          props.inDetail ?
          ""
          :
          <div className="p-4">
            <h3 className="font-medium text-gray-600 text-lg my-2 uppercase">{movie.original_title}</h3>
            <p className="text-justify" style={{textOverflow: 'ellipsis',whiteSpace:'nowrap',overflow:'hidden'}}>{movie.overview}</p>
            <div className={`rounded-full ${color} w-8 h-8 flex flex-row items-center justify-center`}>
              <p className={`max-w-full text-center items-center align-middle`}>{movie.vote_average}</p>
            </div>
          </div>
        }
    </div>
  )
}

export default MovieCard