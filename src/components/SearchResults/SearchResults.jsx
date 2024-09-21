import React from 'react'
import {useNavigate} from 'react-router-dom'
import './searchResult.css'

function SearchResults({result, searchText}) {

  const navigate = useNavigate();

  return (
    <div id='search-result-container'>
      {
        result.length === 0 ? <p className='search-movie-name'>Nothing Found</p> : result.map((res, index)=> {
          return <p key={index + 1} className='search-movie-name' onClick={()=> {
            navigate(`/watch/movie/${res.id}`) ;
            window.location.reload();
         }}>{res.name}</p>
        })
      }
    </div>
  )
}

export default SearchResults
