import React from 'react'

//componets
import Navbar from './navbar/Navbar'
import Carousel_Com from './Carousel_Com'
import Events from './navbar/Event/Events'

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Carousel_Com/>
      <Events/>
    </div>
  )
}
