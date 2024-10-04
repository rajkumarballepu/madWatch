import React from 'react'
import './detailCard.css'
import { Rating } from 'react-simple-star-rating'
import MovieCard from '../MovieCard/MovieSlide'
import ShowCard from '../ShowCard/ShowCard'

function DetailCard({item, type}) {
  return (
    <div className="detail-card">
        <div className={`item-avatar ${item ? '' : 'skeliton'}`}>
          {
            item && type === 'movie' && <MovieCard item={item} /> 
          }
          {
            item && type === 'show' && <ShowCard item={item} />
          }
        </div>
        <div className={`item-meta-details ${item ? '' : 'skeliton'}`}>
          <h2 className={`item-name `}>{item && item.name}</h2>
          <p className={`rating `}>
            {item && <Rating fillColor='#f304cb' readonly={true} allowFraction={true} initialValue={item.rating} size={20} iconsCount={10} />}
          </p>
          <div className='item-category-contianer'>{item && item.categories.split(",").map((category, index)=> {
            return <p key={index + 1} className="btn btn-outline item-category">
                {category}
              </p>
            })}
          </div>
        </div>
        <p className={`item-description ${item ? '' : 'skeliton'}`}>{item && item.description}</p>
    </div>
  )
}

export default DetailCard
