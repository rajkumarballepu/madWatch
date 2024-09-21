import React from 'react'
import './movieDetailCard.css'
import { Rating } from 'react-simple-star-rating'

function MovieDetailCard({movie}) {
  return (
    <div className={`movie-details`}>
        <div className={`movie-avatar ${movie ? '' : 'skeliton'}`}>
            {movie && <img src={movie.avatar} alt={movie.name} />}
        </div>
        <div className={`movie-meta-details ${movie ? '' : 'skeliton'}`}>
            <h2 className={`movie-name `}>{movie && movie.name}</h2>
            <p className={`rating `}>
              {movie && <Rating fillColor='#f304cb' readonly={true} allowFraction={true} initialValue={movie.rating} size={20} iconsCount={10} />}
            </p>
            {/* <h3>{movie && movie.dateOfRelease}</h3> */}
            <div className='movie-category-contianer'>{movie && movie.categories.split(",").map((category, index)=> {
              return <p key={index + 1} className="movie-category">
                {category}
              </p>
            })}</div>
            <p className={`movie-description`}>{movie && movie.description}</p>
        </div>
    </div>
  )
}

export default MovieDetailCard
