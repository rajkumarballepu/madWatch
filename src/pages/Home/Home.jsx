import React, { useEffect, useState } from 'react'
import { Header, Carousel, Slider, Footer, DetailCard, MovieCard, ShowCard } from '../../components'
import axios from 'axios'
import './style.css'
import { getAllMovies, getAllShows } from '../../utils/APIRoutes'

function Home() {

  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [carouselItems, setCarouselItems] = useState([]);
  const [categories] = useState([
    "Action",
    "Thriller",
    "Romantic",
    "Drama",
  ]);

  useEffect(() => {
    var cItems = [];
    axios.get(getAllMovies).then(async (res) => {
      const list = res.data;
      cItems = list.filter((_, index)=> index < 2).map((item)=> {
        return <DetailCard type={'movie'} item={item}/>
      })
      setMovies(list);
    }).catch(()=> {
      console.warn("Server in home is not responding....")
    })

    axios.get(getAllShows).then(async (res)=> {
      let c = res.data.filter((i, index) => index < 2).map((item)=> {
        return <DetailCard type={'show'} item={item} />
      })
      cItems = [...cItems, ...c]
      console.log(cItems)
      setCarouselItems(cItems)
      setShows(res.data)
    })

  }, [])

  useEffect(()=> {
    
  },[])

  return (
    <>
      <div id='home' className='main-box-shadow'>
        <Header active={'home'}/>
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
          <Slider h2={'Anime Shows'} items={shows.filter((show)=> show.categories.toLowerCase().includes('anime')).map((show, index)=> {
            return <ShowCard key={index + 1} item={show} />
          })}/>
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
