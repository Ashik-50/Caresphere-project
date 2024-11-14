import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/image.png';
import './Navbar.css';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedname = localStorage.getItem('username');
    if (storedname) {
      setUsername(storedname);
    }
  }, []);

  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className='header'>
      <nav className='navbar'>
        <div className='logo'>
          <img src={logo} alt='logo' />
          <h1 className='heading'>CARESPHERE</h1>
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className='nav-item'>
            <Link to='/' onClick={closeMenu}>Home</Link>
          </li>
          <li className='nav-item'>
            <Link to='/doctors' onClick={closeMenu}>Doctors</Link>
          </li>
          <li className='nav-item'>
            <Link to='/appointments' onClick={closeMenu}>Appointments</Link>
          </li>
          <li className='nav-item'>
            <Link to='/report' onClick={closeMenu}>Reports</Link>
          </li>
          <li className='nav-item'>
            <Link to='/emergency' onClick={closeMenu}>Emergency</Link>
          </li>
          {username ? (
            <>
              <li className='nav-item username'>
              <span> <Link to="/account">{ username}</Link></span>
              </li>
              <li className='nav-item'>
                <Link to='/login' className='logout-button' onClick={handleLogout}>Logout</Link>
              </li>
            </>
          ) : (
            <li className='nav-item'>
              <Link to='/login' onClick={closeMenu}>Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
