import React from 'react'
import './Hero.css'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='hero'>
            <div className='content'>
                <p>Book Health, Book Happiness</p>
                <p>Your Doctor is Just a Tap Away!</p>
                <p>CareSphere</p>
                <p>Your Health, Your Schedule, Your Doctor</p>
                <Link to="/doctors">
                <button className='button'>Consult Now</button>
                </Link>
            </div>
        </div>
    )
}

export default Hero