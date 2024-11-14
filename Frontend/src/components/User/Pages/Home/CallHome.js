import React from 'react'
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Testimonials from './Testimonials';
import Footer from './Footer';
import './CallHome.css';
 function CallHome() {
  return (
    <div>
        <Navbar />
        <Hero />
        <About />
        <Testimonials />
        <Footer />
        
    </div>
  )
}

export default CallHome