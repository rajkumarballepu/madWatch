/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Category, Home, Movies, New, Shows, SingleMovie } from './pages'
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
      </Routes>
    </BrowserRouter>
  )
}

export default App