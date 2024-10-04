import React, { useState } from 'react'
import './seasonsContainer.css'

function SeasonsContainer({season, id}) {
  
  const [epVisible, setEpVisible] = useState(false);

  return (
    <div className={`season-detail-container ${epVisible ? "open" : ""}`}>
        <p className="season-name">
            {season.seasonName}
            <span onClick={()=> {
                    setEpVisible(!epVisible)
                }} className='expand-btn'>&gt;
            </span>
        </p>
        <div className={`season-episodes-container`}>
            {
                season.episodes && season.episodes == 0 ? <p className="episode-container">No episodes available</p> : season.episodes.sort((a, b) => a.episodeNo - b.episodeNo).map((ep, index) => {
                  return <p key={index + 1} className="episode-container">
                    <span className="episode-text">Episode {ep.episodeNo}</span>
                    <a href={`/show/${id}/season/${season.id}/watch/episode?epNo=${ep.episodeNo}`} className='btn main-box-shadow'><i className="fa-solid fa-play"></i> Watch Now </a>
                  </p>
                })}
        </div>
        
    </div>
  )
}

export default SeasonsContainer