import React, { useEffect, useState } from 'react'
import { Header, Footer, SplitContainer, MovieCard } from '../../components'
import './new.css'
import axios from 'axios'



import { getAllMovies } from '../../utils/APIRoutes'

function New() {
  
  const [movies, setMovies] = useState(undefined);
  
  useEffect(()=> {
    axios.get(`${getAllMovies}`).then((res) => {
      const list = res.data;
      // console.log(list.filter((_, index)=> index < 60))
      setMovies(list.filter((_, index)=> index < 60).map((movie)=> {
        return <MovieCard item={movie} />
      }));
    }).catch(()=> {
      console.warn("SErver not responding ")
    })
  }, [])

  return (
    <div id='new' className={`main-box-shadow`}>
      <Header active={'new'} />
      <div className="container">
        <h2 className={movies ? "" : 'skeliton'}>New Movies</h2>
        <SplitContainer array={movies} />
      </div>
      <Footer />
    </div>
  )
}

export default New
