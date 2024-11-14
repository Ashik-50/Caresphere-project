import React from 'react';
import './About.css';
import image from '../../Assets/john-doe.png';
import { Link } from 'react-router-dom';
const About = () => {
  return (
    <div className="about">
            <div className='container'>
                <img src={image} alt='doc' />
                <div className='col-2'>
                    <h2>About</h2>
                    <span className='line'></span>
                    <p>CareSphere is a comprehensive healthcare app designed to make medical care more accessible and convenient for everyone. Our mission is to provide a seamless experience for users to book appointments with doctors, find medical professionals based on their medical history, and access emergency services when needed.</p>                    
                    <p>Easily schedule appointments with our network of doctors and medical professionals.</p>
                    <p><br />Find the steps to do during an emergency.</p>
                    <Link to="/emergencysteps">
                    <button className='button'>EmergencySteps</button></Link>
                </div>
            </div>
      </div>
  );
};
export default About;