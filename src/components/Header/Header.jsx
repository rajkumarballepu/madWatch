import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios';
import SearchResults from '../SearchResults/SearchResults';
import { getAllMovies, getAllShows } from '../../utils/APIRoutes';

function Header() {

  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleChange = (event) => {
    setSearchText(event.target.value);
  }

  useEffect(()=> {
    axios.get(`${getAllMovies}`).then((res) => {
      setMovies(res.data)
    }).then(()=> {
      axios.get(`${getAllShows}`).then((res) => {
        setShows(res.data)
      })
    }).catch(()=> {
      console.log("Server not responding... ")
    })

  },[])

  return (
    <div id='header'>
      <div className="nav-bar">
        <ul className="navbar-container">
          <li className="navbar-item"><a href="/" className="navbar-link"><i className="link-icon fa-solid fa-house"></i><p className='link-title'>Home</p></a></li>
          <li className="navbar-item"><a href="/new" className="navbar-link"><i className="link-icon fa-solid fa-fire"></i><p className='link-title'>New</p></a></li>
          <li className="navbar-item"><a href="/movies" className="navbar-link"><i className="link-icon fa-solid fa-film"></i><p className='link-title'>Movies</p></a></li>
          <li className="navbar-item"><a href="/shows" className="navbar-link"><i className="link-icon fa-brands fa-youtube"></i><p className='link-title'>Shows</p></a></li>
        </ul>
        <div className="search-bar">
          <input type="text" placeholder='Search your interest' className="search-input" value={searchText} onChange={handleChange}/>
        </div>
        {
          movies.length > 0 && shows.length > 0 && searchText.length > 0 && 
          <SearchResults searchText={searchText} 
            moviesResult={movies.filter((item)=>item.name.toLowerCase().includes(searchText.toLowerCase()))}
            showsResult={shows.filter((item)=>item.name.toLowerCase().includes(searchText.toLowerCase()))} 
          />
        }

      </div>
    </div>
  )
}

export default Header
