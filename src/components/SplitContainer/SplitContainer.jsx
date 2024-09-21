import React, { useEffect, useState } from 'react'
import './splitcontainer.css'
import { Slide } from "../index"

function SplitContainer({array}) {
    const [arrayIndexes, setArrayIndexes] = useState({start: 0, end: 20-1})
    const [activeArray, setActiveArray] = useState(undefined);
    
    useEffect(()=> {
        array && setActiveArray(array.filter((_, index)=> index >= arrayIndexes.start && index <=  arrayIndexes.end))
    }, [arrayIndexes, array])

  return (
    <div className={`split-page ${array ? '' : 'skeliton'}`}>
        <div className='split-container'>
          {
            activeArray && activeArray.map((item, index)=> {
              return <Slide key={index+1} item={item} />            
            })
          }
        </div>
        <div className={array ? '' : 'd-none'}>
          <button disabled={arrayIndexes.start <= 0} onClick={()=> {
              setArrayIndexes({
                start: arrayIndexes.start - 20,
                end: arrayIndexes.end - 20
              });
            }}>Prev</button>
            <button disabled={array && arrayIndexes.end > array.length} onClick={()=> {
              setArrayIndexes({
                start: arrayIndexes.start + 20,
                end: arrayIndexes.end + 20
              });
            }}>Next</button>
        </div>
      </div>
  )
}

export default SplitContainer
