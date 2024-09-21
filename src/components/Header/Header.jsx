import React, { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios';
import SearchResults from '../SearchResults/SearchResults';

function Header() {

  const [movies, setMovies] = useState(undefined);
  const [searchText, setSearchText] = useState("");

  const handleChange = (event) => {
    setSearchText(event.target.value);
    // console.log(movies.filter((movie)=>movie.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  useEffect(()=> {
    axios.get("http://madwatchrest-env.eba-y4up4gpn.ap-south-1.elasticbeanstalk.com/madwatch/api/movie/all").then((res) => {
      const list = res.data;
      // console.log(list)
      setMovies(list);
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
        {movies && searchText.length > 0 && <SearchResults searchText={searchText} result={movies.filter((movie)=>movie.name.toLowerCase().includes(searchText.toLowerCase()))} />}
      </div>
    </div>
  )
}

export default Header
