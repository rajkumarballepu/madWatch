import './movies.css'
import { Header, Footer, SplitContainer, MovieCard } from '../../components'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { host } from '../../utils'
import { getAllMovies } from '../../utils/APIRoutes';



function Movies() {

  const [movies, setMovies] = useState(undefined);
  
  useEffect(()=> {
    axios.get(`${getAllMovies}`).then((res) => {
      const list = res.data;
      setMovies(list.sort((a, b) => b.rating - a.rating).map((movie) => {
        return <MovieCard item={movie}/>
      }));
    }).catch(()=> {
      console.log("Server not responding..")
    })
  }, [])

  return (
    <div id='movies-container' className='main-box-shadow'>
      <Header />
      <div className='container'>
        <h2 className={movies ? "" : 'skeliton'}>Top Movies</h2>
        <SplitContainer array={movies} />
      </div>
      <Footer />
    </div>
  )
}

export default Movies
