import React from 'react'
import {Rating} from "react-simple-star-rating"
import './movieCard.css'

function MovieCard({item}) {
  return (
    <a href={`/watch/movie/${item.id}`} className='slide'>
      <img src={item.avatar} alt={`${item.name}`} />
      <p className="item-name">
        <span className="name">
          {item.name}
        </span>
        <span className="rating">
          {item && <Rating fillColor='#f304cb' readonly={true} allowFraction={true} initialValue={item.rating / 2} size={20} iconsCount={5} />}
        </span>
      </p>
    </a>
  )
}

export default MovieCard;
