import React from 'react'
import './footer.css'

function Footer() {
  return (
    <div id='footer'>
        <div className="container d-flex">
            <div className="menu-container d-flex">
                <ul className="navlink-container">
                    <li className="navlink"><a href="/#home" target="" rel="noopener noreferrer">Home</a></li>
                    <li className="navlink"><a href="/movies" target="" rel="noopener noreferrer">Movies</a></li>
                    <li className="navlink"><a href="/new" target="" rel="noopener noreferrer">New Movies</a></li>
                    <li className="navlink"><a href="/shows" target="" rel="noopener noreferrer">Shows</a></li>
                </ul>
                <hr className="seperator" />
                <ul className="social-media-container">
                    <li className="social-item"><a href="/">Instagram</a></li>
                    <li className="social-item"><a href="/">Facebook</a></li>
                    <li className="social-item"><a href="/">X</a></li>
                </ul>
            </div>
            <div className="logo-container">
                <img src="/logo-1.png" alt="" />
            </div>
        </div>
        <p>madcoder.com 2024</p>
        
    </div>
  )
}

export default Footer
