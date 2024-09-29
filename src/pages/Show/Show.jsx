import React, { act, useEffect, useState } from 'react'
import './show.css'
import { Footer, Header, DetailCard, Slider } from '../../components'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { host } from '../../utils';
import { getShow } from '../../utils/APIRoutes';

function Show() {

  const arr = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
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
        <DetailCard item={show} />
        <div className="seasons-container">
          {
            seasons && seasons.length > 0 ? seasons.map((season, index) => {
              return <details key={index + 1} className='season-container'>
                <summary>{season.seasonName}</summary>
                {season.episodes && season.episodes == 0 ? <p className="episode-container">No episodes available</p> : season.episodes.map((ep, index) => {
                  return <p key={index + 1} className="episode-container">
                    <span className="episode-text">Episode {ep.episodeNo}</span>
                    <a href={`/show/${id}/season/${season.id}/watch/episode?epNo=${ep.episodeNo}`} className='btn main-box-shadow'><i className="fa-solid fa-play"></i> Watch Now </a>
                  </p>
                }) }
              </details>
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