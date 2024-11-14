import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import logo from '../Assets/logo.png';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');

  // Fetch doctors from API
  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:8080/doctors/all');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Filter doctors based on search input
  const filteredDoctors = doctors.filter((doctor) => {
    return (
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.email.toLowerCase().includes(search.toLowerCase()) ||
      doctor.phone.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(search.toLowerCase()) ||
      doctor.hospital.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Handle doctor removal
  const handleRemoveDoctor = async (doctorId, index) => {
    try {
      const response = await fetch(`http://localhost:8080/doctors/${doctorId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const newDoctors = [...doctors];
      newDoctors.splice(index, 1);
      setDoctors(newDoctors);
    } catch (error) {
      console.error('Error removing doctor:', error);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f9f9f9',
      paddingTop: '90px', // Add margin-top to push content down
    },
    searchContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '30px',
    },
    searchInput: {
      width: '100%',
      maxWidth: '600px',
      padding: '15px',
      fontSize: '16px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      transition: 'box-shadow 0.3s ease-in-out',
    },
    searchInputFocus: {
      boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
    },
    doctorList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      justifyContent: 'center',
      padding: '0 20px',
    },
    doctorCard: {
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    doctorCardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    },
    doctorImage: {
      width: '100%',
      height: '200px',
      backgroundColor: '#e0e0e0',
      borderRadius: '12px',
      marginBottom: '15px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    doctorImageImg: {
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
    },
    doctorInfo: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    doctorName: {
      fontSize: '22px',
      fontWeight: 'bold',
      margin: '10px 0',
    },
    doctorDetail: {
      fontSize: '16px',
      color: '#555',
      margin: '5px 0',
    },
    doctorLink: {
      color: '#007bff',
      textDecoration: 'none',
    },
    removeButton: {
      padding: '10px 15px',
      borderRadius: '5px',
      backgroundColor: '#dc3545',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease-in-out',
      fontSize: '14px',
    },
    removeButtonHover: {
      backgroundColor: '#c82333',
    },
  };

  return (
    <div style={styles.container}>
      <AdminNavbar />
      <main style={{ padding: '20px' }}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search doctors..."
            onChange={handleSearch}
            value={search}
            style={styles.searchInput}
            onFocus={(e) => e.target.style.boxShadow = styles.searchInputFocus.boxShadow}
            onBlur={(e) => e.target.style.boxShadow = styles.searchInput.boxShadow}
          />
        </div>
        <div style={styles.doctorList}>
          {filteredDoctors.map((doctor, index) => (
            <div
              key={doctor.id}
              style={styles.doctorCard}
              onMouseEnter={e => e.currentTarget.style.transform = styles.doctorCardHover.transform}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={styles.doctorImage}>
                {doctor.imageUrl ? (
                  <img src={doctor.imageUrl} alt="Doctor" style={styles.doctorImageImg} />
                ) : (
                  <div style={{ width: '100%', height: '100%' }} />
                )}
              </div>
              <div style={styles.doctorInfo}>
                <h3 style={styles.doctorName}>{doctor.name}</h3>
                <p style={styles.doctorDetail}>Email: <a href={`mailto:${doctor.email}`} style={styles.doctorLink}>{doctor.email}</a></p>
                <p style={styles.doctorDetail}>Phone: {doctor.phone}</p>
                <p style={styles.doctorDetail}>Specialty: {doctor.specialty}</p>
                <p style={styles.doctorDetail}>Hospital: {doctor.hospital}</p>
                <p style={styles.doctorDetail}>Years of Experience: {doctor.yearsOfExperience}</p>
                <p style={styles.doctorDetail}>{doctor.description}</p>
                <button
                  onClick={() => handleRemoveDoctor(doctor.id, index)}
                  style={styles.removeButton}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = styles.removeButtonHover.backgroundColor}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = styles.removeButton.backgroundColor}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DoctorsPage;
