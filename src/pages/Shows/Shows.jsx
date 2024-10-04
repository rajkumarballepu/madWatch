import React, { useEffect, useState } from 'react'
import './shows.css'
import { Header, Footer, SplitContainer, ShowCard } from '../../components'
import axios from 'axios'
import { getAllShows } from '../../utils/APIRoutes'

function Shows() {

  const [shows, setShows] = useState()

  useEffect(()=> {
    axios.get(`${getAllShows}`).then((res)=> {
      console.log(res.data)
      setShows(res.data.map((show)=> {
        return <ShowCard item={show} />
      }))
    })
  }, [])

  return (

    <div id='shows' className='main-box-shadow'>
      <Header active={'shows'}/>
      <div className='container'>
        <h2>Shows</h2>
        <SplitContainer array={shows} />
      </div>
      <Footer />
    </div>
  )
}

export default Shows
