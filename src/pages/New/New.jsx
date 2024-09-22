import React, { useEffect, useState } from 'react'
import { Header, Footer, SplitContainer } from '../../components'
import './new.css'
import axios from 'axios'

function New() {
  
  const [movies, setMovies] = useState(undefined);
  
  useEffect(()=> {
    axios.get("https://madwatchrest-env.eba-y4up4gpn.ap-south-1.elasticbeanstalk.com/madwatch/api/movie/all").then((res) => {
      const list = res.data;
      // console.log(list.filter((_, index)=> index < 60))
      setMovies(list);
    }).catch(()=> {
      console.warn("SErver not responding ")
    })
  }, [])

  return (
    <div id='new' className={`main-box-shadow`}>
      <Header />
      <div className="container">
        <h2 className={movies ? "" : 'skeliton'}>New Movies</h2>
        <SplitContainer array={movies} />
      </div>
      <Footer />
    </div>
  )
}

export default New
