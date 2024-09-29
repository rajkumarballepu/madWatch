import React from 'react'
import {useNavigate} from 'react-router-dom'
import './searchResult.css'

function SearchResults({moviesResult, showsResult, searchText}) {

  const navigate = useNavigate();

  return (
    <div id='search-result-container'>
      {
        moviesResult.length === 0 ? <p className='search-movie-name'>No movies Found</p> : moviesResult.map((res, index)=> {
          return <p key={index + 1} className='search-movie-name' onClick={()=> {
            navigate(`/watch/movie/${res.id}`) ;
            window.location.reload();
         }}>{res.name}</p> 
        })
      }
      {
        showsResult.length === 0 ? <p className='search-movie-name'>No shows Found</p> : showsResult.map((res, index)=> {
          return <p key={index + 1} className='search-movie-name' onClick={()=> {
            navigate(`/show/${res.id}`) ;
            window.location.reload();
         }}>{res.name}</p> 
        })
      }
    </div>
  )
}

export default SearchResults
