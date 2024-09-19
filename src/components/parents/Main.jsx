import React from 'react'
import LandingPage from './Navbar'
import PrimarySearchAppBar from './Navbar'
import CarouselComponent from './Carousel'
import Card from './Card'
import Activity from './Activity'
import Footer from './Footer'

function Main() {
  return (
    <div>
      <PrimarySearchAppBar/>
      <CarouselComponent/>
      <Card/>
      <Activity/>
      <Footer/>
    </div>
  )
}

export default Main
