import React, { useEffect, useState } from 'react'
import { Footer, Header, SplitContainer } from '../../components'
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Category() {
  
  const [movies, setMovies] = useState(undefined);
  const { category } = useParams();

  useEffect(()=> {
    axios.get(`http://192.168.0.199:8080/madwatch/api/movie/category/${category}`).then((res)=> {
        console.log(res.data)
        setMovies(res.data)
    }).catch(()=> {
        console.log("Server not responding...")
    })
  },[])

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
