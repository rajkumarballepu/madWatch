import React from 'react'
import './comment.css'

function Comment({comment}) {
  return (
    <div id='comment' className='d-flex'>
        <div className="user-avatar">
            <i className="fa-solid fa-user"></i>
        </div>
        <div className="container">
            <div className="user">
                <h3>{comment.userName}</h3>
            </div>
            <div className="comment-text">
                {comment.comment}
            </div>
        </div>
        <div className='timestamp-container'>
            <p className="comment-date">{new Date(comment.timeStamp).toDateString()}</p>
            <p className="comment-time">{new Date(comment.timeStamp).toLocaleTimeString()}</p>
        </div>
    </div>
  )
}

export default Comment
