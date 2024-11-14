import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/image.png'; // Replace with your logo image path
import Navbar from '../Home/Navbar';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, email, role })
      });

      if (response.ok) {
        localStorage.setItem('username', username);
        navigate('/userdetails');
      } else {
        const data = await response.json();
        setError(data.message || 'An error occurred');
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
      marginTop:'70px',
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
            width: '100px', // Adjust the size as needed
            marginBottom: '20px'
          }} />
          <h2>Register</h2>
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
            <label style={{ display: 'block', marginBottom: '10px' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
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
          {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}
          <button type="submit" style={{
            backgroundColor: '#012441',
            color: '#fff',
            padding: '15px 30px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Register
          </button>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px'
          }}>
            <Link to="/login" style={{
              textDecoration: 'none',
              color: '#012441'
            }}>Already have an account? Login</Link>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Register;
