import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';

const base64Encode = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const AddDoctor = () => {
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    specialty: '',
    hospital: '',
    yearsOfExperience: '',
    description: '',
    imageUrl: '',
  });

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const [imagePreview, setImagePreview] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDoctor({ ...newDoctor, [name]: value });
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await base64Encode(file);
        setImagePreview(base64);
        setNewDoctor({ ...newDoctor, imageUrl: base64 });
      } catch (error) {
        console.error('Error converting to base64:', error);
        setMessage('Error converting image to base64.');
      }
    } else {
      setMessage('Invalid image format.');
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/doctors/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDoctor),
      });

      if (!response.ok) {
        throw new Error('Failed to add doctor');
      }

      setMessage('Doctor added successfully.');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error: ' + error.message);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      setMessage('User created successfully.');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div>
    <AdminNavbar />
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h2 style={titleStyle}>Add Doctor</h2>
        <form>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Doctor's Picture:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={fileInputStyle}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Doctor Preview"
                style={imagePreviewStyle}
              />
            )}
          </div>
          {/* Doctor Details */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>Full Name:</label>
            <input
              type="text"
              name="name"
              value={newDoctor.name}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="Enter full name"
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Username:</label>
            <input
              type="text"
              name="username"
              value={newDoctor.username}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="Enter username"
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Email:</label>
            <input
              type="email"
              name="email"
              value={newDoctor.email}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="Enter email"
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={newDoctor.phone}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="Enter phone number"
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Specialty:</label>
            <input
              type="text"
              name="specialty"
              value={newDoctor.specialty}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="Enter specialty"
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Hospital:</label>
            <input
              type="text"
              name="hospital"
              value={newDoctor.hospital}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="Enter hospital"
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Years of Experience:</label>
            <input
              type="number"
              name="yearsOfExperience"
              value={newDoctor.yearsOfExperience}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="Enter years of experience"
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Description:</label>
            <textarea
              name="description"
              value={newDoctor.description}
              onChange={handleInputChange}
              style={textareaStyle}
              placeholder="Enter description"
            />
          </div>
          {/* Create Login Section */}
          <h2 style={titleStyle}>Create Login</h2>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Username:</label>
            <input
              type="text"
              name="username"
              value={newUser.username}
              onChange={handleUserInputChange}
              style={inputStyle}
              placeholder="Enter username"
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Email:</label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleUserInputChange}
              style={inputStyle}
              placeholder="Enter email"
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Password:</label>
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleUserInputChange}
              style={inputStyle}
              placeholder="Enter password"
            />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Role:</label>
            <input
              type="text"
              name="role"
              value={newUser.role}
              onChange={handleUserInputChange}
              style={inputStyle}
              placeholder="Enter role"
            />
          </div>
          {/* Submit Buttons */}
          <div style={buttonGroupStyle}>
            <button onClick={handleAddDoctor} style={buttonStyle}>
              Add Doctor
            </button>
            <button onClick={handleCreateUser} style={buttonStyle}>
              Create Login
            </button>
          </div>
        </form>
        {message && <p style={messageStyle}>{message}</p>}
      </div>
    </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  marginTop:'500px',
  padding: '20px',
};

const formContainerStyle = {
  width: '100%',
  maxWidth: '800px',
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  animation: 'fadeIn 0.5s ease-in',
};

const titleStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#343a40',
  textAlign: 'center',
  marginBottom: '20px',
};

const formGroupStyle = {
  marginBottom: '20px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold',
  color: '#495057',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ced4da',
  marginBottom: '10px',
};

const textareaStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ced4da',
  minHeight: '100px',
  marginBottom: '10px',
};

const fileInputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ced4da',
  marginBottom: '10px',
};

const imagePreviewStyle = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginBottom: '10px',
};

const buttonGroupStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const buttonStyle = {
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#012441',
  color: '#fff',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const messageStyle = {
  marginTop: '20px',
  textAlign: 'center',
  color: '#495057',
  fontWeight: 'bold',
};

export default AddDoctor;
