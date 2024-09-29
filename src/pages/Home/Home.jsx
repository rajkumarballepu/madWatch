import { host } from '../../utils'
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Header, Carousel, Slider, Footer, DetailCard, MovieCard } from '../../components'
import axios from 'axios'
import './style.css'
import { getAllMovies } from '../../utils/APIRoutes'

function Home() {

  const [movies, setMovies] = useState([]);
  const [carouselItems, setCarouselItems] = useState([]);
  const [categories, setCategories] = useState([
    "Action",
    "Thriller",
    "Romantic",
    "Family",
    "Drama",
    "Comedy",
    "Crime",
  ]);

  function getCategories(moviesList) {
    let str = "";
    moviesList.forEach((item)=> {
      str += item.categories.replaceAll(" ", "") + ",";
    })
    console.log()
    return [...new Set(str.substring(0, str.length-1).split(","))];
  }

  useEffect(() => {
    axios.get(getAllMovies).then((res) => {
      const list = res.data;
      console.log(list.filter((_, index)=> index < 4));
      let cItems = list.filter((_, index)=> index < 4).map((item)=> {
        return <DetailCard item={item}/>
      })
      console.log(cItems)
      setCarouselItems(cItems)
      setMovies(list);
    }).catch(()=> {
      console.warn("Server in home is not responding....")
    })

  }, [])

  return (
    <>
      <div id='home' className='main-box-shadow'>
        <Header />
        <div className="container">
          <Carousel items={carouselItems}/>
          <h2 className={movies.length === 0 ? "skeliton" : ""}>Recently Added</h2>
          <Slider items={movies.filter((_, index)=> index < 10).sort((a, b) => a.dateOfRelease - b.dateOfRelease).map((item)=> {
            return <MovieCard item={item} />
          })}></Slider>
          <h2 className={movies.length === 0 ? "skeliton" : ""}>Top Rated</h2>  
          <Slider items={movies.filter((_, index)=> index < 10).sort((a, b) => b.rating - a.rating).map((item)=> {
            return <MovieCard item={item} />
          })}></Slider>
          {
            categories && categories.map((category, index) => {
              return <Slider key={index + 1} h2={category} items={movies.filter((movie, index)=> movie.categories.includes(category)).sort((a, b) => b.rating - a.rating).map((item)=> {
                return <MovieCard item={item} />
              })}></Slider>
            })
          }
          <h2>Explore More by Category</h2>
          <div className="home-categories-container">
            {
              categories && categories.map((category, index)=> {
                return <a href={`/category/${category}`} key={index + 1} className='home-category'>
                  {category}
                </a>
              })
            }
            
          </div>
        </div>
        
        <Footer />
      </div>
    </>
    
  )
}

export default Home
