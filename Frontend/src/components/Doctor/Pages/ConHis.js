import React, { useState, useEffect } from 'react';
import logo from '../Assets/logo.png';
import DoctorNavbar from './DoctorNavbar';

const ConHis = () => {
  const [consultations, setConsultations] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState({});

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const username = localStorage.getItem('username');
        const response = await fetch(`http://localhost:8080/doctor/completed?doctor=${username}`);
        const data = await response.json();
        setConsultations(data);
      } catch (error) {
        console.error('Error fetching consultations:', error);
      }
    };

    fetchConsultations();
  }, []);

  const handleViewDetails = (consultation) => {
    setSelectedConsultation(consultation);
    setShowDetails(true);
  };

  return (
    <div>
      <DoctorNavbar />
    <div style={{ padding: '40px',marginTop:'80px', backgroundColor: '#f4f6f9', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>

      <main>
        <h2 style={{ fontSize: '36px', color: '#2c3e50', marginBottom: '20px', textAlign: 'center' }}>Consultation History</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {consultations.length > 0 ? (
            consultations.map((consultation, index) => (
              <div
                key={index}
                style={{
                  maxWidth: '400px',
                  width: '100%',
                  backgroundColor: '#ffffff',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  cursor: 'pointer',
                  animation: 'fadeInUp 0.5s ease-in-out',
                  padding: '20px',
                }}
                onClick={() => handleViewDetails(consultation)}
              >
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#34495e' }}>{consultation.name}</h3>
                <p style={{ fontSize: '16px', color: '#7f8c8d' }}>Doctor: {consultation.doctor}</p>
                <p style={{ fontSize: '16px', color: '#7f8c8d' }}>Illness: {consultation.illness}</p>
                <button
                  style={{
                    marginTop: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#2c3e50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                  }}
                  onClick={() => handleViewDetails(consultation)}
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: '#34495e', fontSize: '18px', textAlign: 'center' }}>No consultations found.</p>
          )}
        </div>
        {showDetails && (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: '40px',
              backgroundColor: '#ffffff',
              boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
              borderRadius: '10px',
              zIndex: 1000,
              animation: 'fadeIn 0.5s ease-in-out',
            }}
          >
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#34495e', marginBottom: '20px' }}>Consultation Details</h2>
            <p style={{ margin: '10px 0', color: '#7f8c8d' }}><strong>Doctor:</strong> {selectedConsultation.doctor}</p>
            <p style={{ margin: '10px 0', color: '#7f8c8d' }}><strong>Patient:</strong> {selectedConsultation.name}</p>
            <p style={{ margin: '10px 0', color: '#7f8c8d' }}><strong>Illness:</strong> {selectedConsultation.illness}</p>
            <p style={{ margin: '10px 0', color: '#7f8c8d' }}><strong>Treatment:</strong> {selectedConsultation.treatment}</p>
            <button
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#2c3e50',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onClick={() => setShowDetails(false)}
            >
              Close
            </button>
          </div>
        )}
      </main>
    </div>
    </div>
  );
};

export default ConHis;
