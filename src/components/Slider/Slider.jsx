import React, { useEffect, useRef, useState } from 'react'
import './slider.css'
import useWindowSize from '../useWindowSize';
import Slide from '../Slide/Slide';

function Slider({items, h2}) {

  const [width] = useWindowSize()
  const [scroll, setScroll] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const sliderWrapper = useRef();
  const handleScroll = (event) => {
    if(event.target.classList.contains("right")) {
        sliderWrapper.current.scrollLeft += 500;
        setScroll(sliderWrapper.current.scrollLeft + 500)
        
    } else {
        sliderWrapper.current.scrollLeft -= 500;
        if(sliderWrapper.current.scrollLeft > 0) {
          setScroll(sliderWrapper.current.scrollLeft - 500);
        }
    }
  }
  
  const sliderContainer = useRef();
  useEffect(()=> {
    setMaxScroll(sliderContainer.current.clientWidth - sliderWrapper.current.clientWidth + 16);
    
  },[width, items])

  return (
    <>
      {
        h2 && <h2>{h2}</h2>
      }
      <div className={`container d-flex p-0 ${items.length > 0 ? " ": "skeliton"}`}>
        <span className={`arrow left ${scroll > 0 ? 'd-flex' : 'd-none'}`} onClick={handleScroll}>&lt;</span>
        <div className='slider-container' ref={sliderWrapper}>
          <div className="slider-wrapper" ref={sliderContainer}>
            {
              items && items.map((item, index)=> {
                return <Slide item={item} alt={index + 1} key={index + 1} />
              })
            }
          </div>
        </div>
        <span className={`arrow right ${scroll < maxScroll ? 'd-flex' : 'd-none'}`} onClick={handleScroll}>&gt;</span>
      </div>
    </>
  )
}

export default Slider
