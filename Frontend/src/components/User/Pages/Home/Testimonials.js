import React from 'react'
import user1 from '../../Assets/user1.jpeg'
import user2 from '../../Assets/user2.jpeg'
import user3 from '../../Assets/user3.jpeg'
import './Testimonials.css'

const Testimonials = () => {
    return (
        <div className='testimonials' id='testimonials'>
            <div className='container'>
                <h2>Testimonials</h2>
                <span className='line'></span>
                <div className='content'>
                    <div className='card'>
                        <img src={user1} alt='user1'/>
                        <p>As a doctor, CareSphere has streamlined my practice. I can easily manage appointments, view patient history, and stay organized. It's everything I need in one app!</p>
                        <p><span>Dr. Michael L</span></p>
                        <p>General Practitioner</p>
                    </div>
                    <div className='card'>
                        <img src={user2} alt='user1'/>
                        <p>CareSphere made booking appointments so simple! No more waiting on hold—just a few taps, and I'm scheduled. It's a lifesaver for my busy schedule!</p>
                        <p><span>Carol Harper</span></p>
                        <p>Working Mom</p>
                    </div>
                    <div className='card'>
                        <img src={user3} alt='user1'/>
                        <p>I love how CareSphere connects me with the best doctors around. The app is easy to use, and I feel confident knowing my health is in good hands.</p>
                        <p><span>James T</span></p>
                        <p>Health-Conscious User</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials
