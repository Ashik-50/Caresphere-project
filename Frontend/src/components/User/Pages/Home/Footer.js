import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='container'>
                <div className='footer-top'>
                    <div className='footer-links'>
                        <h3>Quick Links</h3>
                        <ul>
                            <li className='nav-item'>
                                <Link to='/'>Home</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/doctors'>Doctors</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/appointments'>Appointments</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/emergency'>Emergency</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to='/emergencysteps'>Emergency Steps</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='footer-contact'>
                        <h3>Get in Touch</h3>
                        <p>Phone: +91 8220976004</p>
                        <p>Email: <a href='mailto:info@executeinc.com'>info@caresphere.com</a></p>
                        <p>Address: 123 Main St, Coimbatore, TamilNadu 641008</p>
                    </div>
                    <div className='footer-social'>
                        <h3>Follow Us</h3>
                        <ul>
                            <li>
                                <FacebookIcon />
                            </li>
                            <li>
                                <TwitterIcon />
                            </li>
                            <li>
                                <InstagramIcon />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='footer-bottom'>
                    <div className='bottom'>
                        <span className='line'></span>
                        <p>&copy; 2024 CareSphere. All rights reserved</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;