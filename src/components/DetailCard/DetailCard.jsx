import React from 'react'
import './detailCard.css'
import { Rating } from 'react-simple-star-rating'

function DetailCard({item}) {
  return (
    <div className="detail-card">
        <div className={`item-avatar ${item ? '' : 'skeliton'}`}>
            {item && <img src={item.avatar} alt={item.name} />}
        </div>
        <div className={`item-meta-details ${item ? '' : 'skeliton'}`}>
            <h2 className={`item-name `}>{item && item.name}</h2>
            <p className={`rating `}>
              {item && <Rating fillColor='#f304cb' readonly={true} allowFraction={true} initialValue={item.rating} size={20} iconsCount={10} />}
            </p>
            <h4>{item && item.dateOfRelease && item.dateOfRelease.substring(0,4)}</h4>
            <div className='item-category-contianer'>{item && item.categories.split(",").map((category, index)=> {
              return <p key={index + 1} className="item-category">
                {category}
              </p>
            })}</div>
        </div>
        <p className={`item-description ${item ? '' : 'skeliton'}`}>{item && item.description}</p>
    </div>
  )
}

export default DetailCard
