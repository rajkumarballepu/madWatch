import React from 'react'
import { Comment, Footer, Header } from '../../components'
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import "./episode.css"
import axios from 'axios';
import DetailCard from './../../components/DetailCard/DetailCard';
import { getShow, postComment } from '../../utils/APIRoutes';

function Episode() {
  const [searchParams] = useSearchParams()
  const { showId, seasonId } = useParams()
  const [seasons, setSeasons] = useState(undefined);
  const [episodes, setEpisodes ] = useState(undefined);
  const [show, setShow ] = useState("")
  const [comments, setComments] = useState(undefined)

  const navigate = useNavigate();

  useEffect(()=> {
    console.log(searchParams.get('epId'))
    axios.get(getShow+showId).then((res)=> {
        console.log(res.data.seasons)
        setSeasons(res.data.seasons);
        setShow(res.data)
        setEpisodes(res.data.seasons.find((season) => season.id == seasonId).episodes)
        setComments(res.data.seasons.find((season) => season.id == seasonId).episodes[parseInt(searchParams.get('epNo')) - 1].comments)
    }).catch((err)=> {
      console.log(err)
    })  
  },[])
  
  const [comment, setComment] = useState({
    userName: "",
    comment: ""
  })

  const handleCommentPost = (event) => {
    event.preventDefault();
    console.log({...comment, episodeId: episodes[parseInt(searchParams.get('epNo')) - 1].id})
    let date = new Date();
    console.log(date)
    axios.post(postComment, {...comment, episodeId: episodes[parseInt(searchParams.get('epNo')) - 1].id}).then((res)=> {
      console.log("Comment posted")
      console.log(res.data)
      setComments([res.data, ...comments])
      setComment({
        userName: "",
        comment: ""
      })
    }).catch(()=> {
      console.warn("Movie server down...")
    })
  }

  const handleChange = (event) => {
    setComment({...comment, [event.target.name]: event.target.value})
  }
  

  return (
    <div id='episode' className='main-box-shadow'>
        <Header />
        <div className="container">
            <DetailCard item={show} />
            <div className="player">
              <iframe src={episodes && episodes.length > 0 && episodes[parseFloat(searchParams.get('epNo')) - 1].episodeLink} width="100%" height="100%" allow='autoplay' allowFullScreen='true' frameborder="0"></iframe>
            </div>
            <div className="episode-control">
                <a href={`/show/${showId}/season/${seasonId}/watch/episode?epNo=${parseInt(searchParams.get('epNo')) - 1}`} className={`btn btn-primary ${searchParams.get('epNo') == 1 ? "disable" : ""}`}>Prev</a>
                <a href={`/show/${showId}/season/${seasonId}/watch/episode?epNo=${parseInt(searchParams.get('epNo')) + 1}`} className={`btn btn-primary me-2 ${episodes && episodes.length == searchParams.get('epNo') ? "disable" : ""} `}>Next</a>
            </div>
            <div className="season-options-container">
              {
                seasons ? seasons.length == 1 ? <p className="season-btn">Season 1</p> : <select value={seasonId} className="seasons-container" onChange={(event)=> {
                  navigate(`/show/${showId}/season/${event.target.value}/watch/episode?epNo=1`)
                  window.location.reload();
                }}>
                  {
                    seasons && seasons.map((season, index)=> {
                      return <option key={index + 1} value={season.id} className="season"> Season {season.seasonNo} </option>
                    })
                  }
                </select> : "No seasons yet"
              }
            </div>
            <h3>{seasons && seasons.find(season=> season.id == seasonId).seasonName}</h3>
            <div className={`episodes-container ${episodes ? "" : "skeliton"} ${episodes && episodes.length === 0 ? "grid-0" : ''}`}>
                {
                  episodes && episodes.length > 0 ? episodes.map((ep, index)=> {
                    return <button key={index + 1} value={ep.episodeNo} className={`episode-link ${ep.episodeNo == searchParams.get('epNo') ? 'active' : ""}`} onClick={(event) => {
                      console.log(event.target.value)
                      navigate(`/show/${showId}/season/${seasonId}/watch/episode?epNo=${event.target.value}`);
                      window.location.reload();
                    } }>
                      {ep.episodeNo > 9 ? ep.episodeNo : "0" + ep.episodeNo}
                    </button>
                  }) : "No Episodes yet"
                }
            </div>
            <div className="episode-comments">
              <div className="episode-comments-container">
                <h3>Comment on this episode</h3>
                {
                  comments && comments.length > 0 ? comments.map((comment, index) => {
                    return <Comment key={index + 1} comment={comment}/>
                  }) : 'No comments yet'
                }
              </div>
              <form className='new-comment-container' autoComplete="off" onSubmit={handleCommentPost}>
                <div className="input-group">
                  <label htmlFor="">Name</label>
                  <input type="text" value={comment.userName} required name='userName' onChange={handleChange}/>
                </div>
                <div className="input-group">
                  <label htmlFor="">Comment</label>
                  <textarea id="" rows={10} value={comment.comment} required name='comment' onChange={handleChange}></textarea>
                </div>
                <div className=''>
                  <button className='btn' type="submit">Post</button>
                </div>
              </form>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Episode