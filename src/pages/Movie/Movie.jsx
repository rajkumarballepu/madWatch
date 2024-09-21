import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './movie.css'
import { Header, Footer, Comment, MovieDetailCard } from '../../components'
import axios from 'axios';

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(undefined);
  const [comments, setComments] = useState(undefined);
  const [comment, setComment] = useState({
    userName: "",
    comment: ""
  })

  useEffect(()=> {
    console.log(id);
    axios.get(`http://192.168.0.199:8080/madwatch/api/movie/${id}`).then((res)=> {
      console.log(res.data);
      setMovie(res.data);
    }).catch(()=> {
      console.warn("Movie server down...")
    })

    axios.get(`http://192.168.0.199:8080/madwatch/api/comment/${id}`).then((res)=> {
      console.log(res.data);
      setComments(res.data)
    }).catch(()=> {
      console.warn("Comment  server down...")
    })

  }, [id])


  const handleCommentPost = (event) => {
    event.preventDefault();
    console.log(comment)
    axios.post('http://madwatchrest-env.eba-y4up4gpn.ap-south-1.elasticbeanstalk.com/madwatch/api/comment/', {...comment, movieId: movie.id}).then((res)=> {
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

  const [play, setPlay] = useState(false);

  return (
    <div id='movie' className='main-box-shadow'>
        <Header/>
        <div className="container">
          <div className={`player ${movie ? "" : "skeliton"}`} >
            {!play && <span className="play-icon" onClick={()=> {
                setPlay(true);
                console.log(play)
              }}>
                <i className="fa-solid fa-play"></i>
              </span> 
            }
            {movie && play && <iframe title='movie-player' width="100%" height="100%" allow='autoplay' src={movie.frameLink} allowFullScreen={true}></iframe>}
          </div>
          <MovieDetailCard movie={movie}/>
          
          <div className="movie-comments">
            <div className="comments-container">
            <h3 className={!comments ? "skeliton" : "" }>Comments</h3>
              {
                comments && comments.length > 0 ? comments.map((comment, index)=> {
                  return <Comment key={index + 1} comment={comment} />
                }) : <p className={!comments ? "skeliton" : "" }>No comments yet</p>
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
              <button type="submit">Post</button>
            </form>
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default Movie
