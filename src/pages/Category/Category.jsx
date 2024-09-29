import React, { useEffect, useState } from 'react'
import { Footer, Header, MovieCard, SplitContainer } from '../../components'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getCategoryMovies } from '../../utils/APIRoutes';

function Category() {
  
  const [movies, setMovies] = useState(undefined);
  const { category } = useParams();

  useEffect(()=> {
    axios.get(`${getCategoryMovies}${category}`).then((res)=> {
        console.log(res.data)
        setMovies(res.data.sort((a, b) => b.rating - a.rating).map((movie) => {
          return <MovieCard item={movie}/>
        }))
    }).catch(()=> {
        console.log("Server not responding...")
    })
  },[category])

  return (
    <div id='category-page' className='main-box-shadow'>
      <Header />
      <div className="container">
        <h2 className={movies ? "" : 'skeliton'}>{category} Movies</h2>
        <SplitContainer array={movies} />
      </div>
      <Footer />
    </div>
  )
}

export default Category
