import React, { useEffect, useState } from 'react'
import './show.css'
import { Footer, Header, DetailCard, SeasonsContainer } from '../../components'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getShow } from '../../utils/APIRoutes';

function Show() {

  const [active, setActive] = useState(0);
  const { id } = useParams();
  const [show, setShow] = useState(undefined);
  const [seasons, setSeasons] = useState(undefined)

  useEffect(()=> {
    console.log(id)
    axios.get(`${getShow}${id}`).then((res) => {
      console.log(res.data)
      setShow(res.data)
      setSeasons(res.data.seasons);
    })
  },[active])

  return (
    <div id='show' className='main-box-shadow'>
      <Header />
      <div className="container">
        <DetailCard item={show} type={'show'} />
        <div className="seasons-container">
          {
            seasons && seasons.length > 0 ? seasons.map((season, index) => {
              return <SeasonsContainer key={index + 1} id={id} season={season} />
            }) : <p className="p-1">No Seasons are available</p>
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Show

function SeasonButton({text, index, active}) {
  return <span className={`season-btn ${index === active ? "active" : ""}`}>
    Season : {text}
  </span>
}