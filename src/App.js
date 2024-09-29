/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Category, Episode, Home, Movies, New, Show, Shows, SingleMovie } from './pages'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/watch/movie/:id' element={<SingleMovie />}></Route>
        <Route path='/movies' element={<Movies />}></Route>
        <Route path='/new' element={<New />}></Route>
        <Route path='/category/:category' element={<Category />}></Route>
        <Route path='/shows' element={<Shows />}></Route>
        <Route path='/show/:id' element={<Show />}></Route>
        <Route path='/show/:showId/season/:seasonId/watch/episode' element={<Episode />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App