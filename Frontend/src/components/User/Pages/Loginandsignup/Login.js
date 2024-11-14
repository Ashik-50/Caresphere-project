import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/image.png';
import Navbar from '../Home/Navbar';

function UserLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [role, setRole] = useState('user');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, role })
      });
  
      const data = await response.json();
  
      if (response.ok && data.success) {
        // Store the user's email in local storage
        localStorage.setItem('username', username);
  
        switch (data.role) {
          case 'admin':
            navigate('/admin/home');
            break;
          case 'doctor':
            navigate('/doctor/home');
            break;
          case 'user':
            navigate('/');
            break;
          default:
            setError('Invalid role');
            break;
        }
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };  

  return (
    <div>
      <Navbar />
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      marginTop: '30px',
      backgroundColor: '#f4f4f9',
      padding: '0 20px'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <img src={logo} alt="Logo" style={{
            width: '100px', 
            marginBottom: '20px'
          }} />
          <h2>Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px' }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Enter your username"
              style={{
                width: '95%',
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              style={{
                width: '95%',
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}
            />
          </div>
          
          {error && <div style={{ color: 'red', marginBottom: '20px'}}>{error}</div>}
          <button type="submit" style={{
            backgroundColor: '#012441',
            color: '#fff',
            padding: '15px 30px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Login
          </button>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '20px'
          }}>
            <Link to="/signup" style={{
              textDecoration: 'none',
              color: '#012441'
            }}>New User? Register</Link>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default UserLogin;