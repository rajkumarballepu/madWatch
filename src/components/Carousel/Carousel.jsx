import React, { useEffect, useState } from 'react'
import './carousel.css'
import MovieDetailCard from '../MovieDetailCard/MovieDetailCard';

function Carousel({items}) {
    const [count, setCount] = useState(0);
    const [isActive, setIsActive] = useState(true);
    const [touches, setTouches] = useState({
      start: 0,
      end: 0
    })
  
    useEffect(() => {
      let intervalId;
      if (isActive) {
        intervalId = setInterval(() => {
          if(count + 1 === items.length) {
            setCount((count) => 0);
          } else {
            setCount((count) => count + 1)
          }
        }, 3000);
      }
      return () => {
        if (intervalId) clearInterval(intervalId);
      };
    }, [isActive, count, items.length]);
  
    const handleStart = () => setIsActive(true);
    const handleStop = () => setIsActive(false);
  
    const handleChange = (event) => {
      handleStop();
      setCount(()=> parseInt(event.target.value))
      handleStart();
    }

    const handlenNext = () => {
        handleStop();
        if(count + 1 === items.length) {
          setCount(0)
        } else {
          setCount((count) => count + 1)
        }
        handleStart();
    }

    const handlePrev = () => {
        handleStop();
        if(count === 0) {
          setCount(items.length - 1)
        } else {
          setCount((count) => count - 1)
        }
        handleStart();
    }
  
  
    return (
        <div id="carousel" className={items.length > 0 ? "" : "skeliton"}  onMouseEnter={handleStop} onMouseLeave={handleStart}>
            <div className='wrapper' onClick={()=> {
              console.log("Clicked")
            }} onTouchStart={(event)=> {
              console.log(event.touches[0].clientX)
              setTouches({...touches, start: event.touches[0].clientX})
            }} onTouchEnd={(event)=>{
              console.log(event.changedTouches[0].clientX - touches.start)
              if(event.changedTouches[0].clientX - touches.start > 0) {
                handlePrev();
              } else {
                handlenNext();
              }
              setTouches({...touches, end: event.changedTouches[0].clientX})
            }}>
                {
                    items && items.map((movie, index)=> {
                        return <div key={index} className={`carousel-slider ${count === index ? 'active' : ''}`}>
                          <MovieDetailCard movie={movie}/>
                        </div>
                    })
                }
                <div className={`slide-btn-container ${items.length > 0 ? "" : "d-none"}`}>
                  <span className='slide-btn' onClick={handlePrev} >
                    &lt;
                  </span>
                  <span className='slide-btn' onClick={handlenNext}>
                    &gt;
                  </span>
                </div>
          </div>
        {
            items && <div className='circles'>
                {
                    items.map((_, index)=> {
                        return <button key={index + 1} className={`circle ${index === count ? "active-btn" : ""}`} value={index} onClick={handleChange} ></button>
                    })
                }
            </div>
        }
          
      </div>
    )
}

export default Carousel
