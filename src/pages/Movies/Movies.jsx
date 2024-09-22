
import './movies.css'
import { Header, Footer, SplitContainer } from '../../components'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { host } from '../../utils'


function Movies() {

  const [movies, setMovies] = useState(undefined);
  
  useEffect(()=> {
    axios.get(`${host}/madwatch/api/movie/all`).then((res) => {
      const list = res.data;
      console.log(list.filter((_, index)=> index < 60))
      setMovies(list);
    }).catch(()=> {
      console.log("Server not responding..")
    })
  }, [])

  return (
    <div id='movies-container' className='main-box-shadow'>
      <Header />
      <h2 className={movies ? "" : 'skeliton'}>New Movies</h2>
      <SplitContainer array={movies} />
      <Footer />
    </div>
  )
}

export default Movies
