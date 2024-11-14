import React, { useState, useEffect } from 'react';
import DoctorNavbar from './DoctorNavbar';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [editPatient, setEditPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    illness: '',
    treatment: ''
  });

  const [reportData, setReportData] = useState({
    patientName: '',
    patientUsername: '',
    doctorName: '',
    diagnosis: '',
    treatment: '',
    prescription: '',
    notes: ''
  });

  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const username = localStorage.getItem('username');
        const response = await fetch(`http://localhost:8080/doctor/ongoing?doctor=${username}`);
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleEditClick = (patient) => {
    setEditPatient(patient);
    setFormData({
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      illness: patient.illness,
      treatment: patient.treatment,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleReportInputChange = (e) => {
    const { name, value } = e.target;
    setReportData({
      ...reportData,
      [name]: value,
    });
  };

  const handleMarkAsCompleted = async (id) => {
    const confirm = window.confirm('Are you sure you want to mark this patient as completed?');
    if (confirm) {
      try {
        const response = await fetch(`http://localhost:8080/doctor/mark-completed/${id}`, {
          method: 'PUT',
        });
        if (response.ok) {
          setPatients((prevPatients) =>
            prevPatients.map((patient) =>
              patient.id === id ? { ...patient, status: 'completed' } : patient
            )
          );
        } else {
          console.error('Error updating patient status');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/doctor/edit-patient/${editPatient.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setPatients((prevPatients) =>
          prevPatients.map((patient) =>
            patient.id === editPatient.id ? { ...patient, ...formData } : patient
          )
        );
        setEditPatient(null);
      } else {
        console.error('Error updating patient details');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/doctor/add-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });
      if (response.ok) {
        setShowReportModal(false);
        setReportData({
          patientName: '',
          patientUsername: '',
          doctorName: '',
          diagnosis: '',
          treatment: '',
          prescription: '',
          notes: ''
        });
      } else {
        console.error('Error adding report');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const closeModal = () => {
    setEditPatient(null);
    setShowReportModal(false);
  };

  return (
    <div>
      <DoctorNavbar />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
        marginTop:'90px',
        backgroundColor: '#f0f2f5',
        minHeight: '100vh'
      }}>
        <main style={{ width: '100%', maxWidth: '1200px', textAlign: 'center' }}>
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '30px', color: '#333', fontWeight: '700' }}>Patient Dashboard</h2>
            <p style={{ fontSize: '16px', color: '#777' }}>Manage your patients with ease and efficiency</p>
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
          }}>
            {patients.map((patient) => (
              <div key={patient.id} style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                width: '320px',
                textAlign: 'left',
                transition: 'transform 0.3s ease-in-out',
                cursor: 'pointer',
                transform: 'scale(1)',
              }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <h3 style={{ fontSize: '22px', color: '#333', marginBottom: '10px' }}>{patient.name}</h3>
                <p style={{ fontSize: '16px', color: '#555' }}><strong>Email:</strong> {patient.email}</p>
                <p style={{ fontSize: '16px', color: '#555' }}><strong>Phone:</strong> {patient.phone}</p>
                <p style={{ fontSize: '16px', color: '#555' }}><strong>Illness:</strong> {patient.illness}</p>
                <p style={{ fontSize: '16px', color: '#555' }}><strong>Treatment:</strong> {patient.treatment}</p>
                <p style={{ fontSize: '16px', color: patient.status === 'completed' ? '#27ae60' : '#e74c3c' }}>
                  <strong>Status:</strong> {patient.status}
                </p>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '20px'
                }}
                >
                  <button onClick={() => handleEditClick(patient)} style={{
                    padding: '10px 15px',
                    borderRadius: '8px',
                    backgroundColor: '#012441',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                  }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#012441'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#012441'}>
                    Edit
                  </button>
                  {patient.status === 'ongoing' && (
                    <button onClick={() => handleMarkAsCompleted(patient.id)} style={{
                      padding: '10px 15px',
                      borderRadius: '8px',
                      backgroundColor: '#012441',
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                    }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#012441'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#012441'}>
                      Mark as Completed
                    </button>
                  )}
                  <button onClick={() => {
                    setShowReportModal(true);
                    setReportData({
                      ...reportData,
                      patientName: patient.name,
                      patientusername: patient.patientusername
                    });
                  }} style={{
                    padding: '10px 15px',
                    borderRadius: '8px',
                    backgroundColor: '#012441',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                  }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#012441'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#012441'}>
                    Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {editPatient && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            width: '400px',
            maxWidth: '100%',
            textAlign: 'left'
          }}>
            <button onClick={closeModal} style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
            }}>&times;</button>
            <h3 style={{ fontSize: '20px', color: '#333', marginBottom: '10px' }}>Edit Patient Details</h3>
            <form onSubmit={handleFormSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '16px'
                }} required />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '16px'
                }} required />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '16px'
                }} required />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Illness</label>
                <input type="text" name="illness" value={formData.illness} onChange={handleInputChange} style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '16px'
                }} required />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Treatment</label>
                <input type="text" name="treatment" value={formData.treatment} onChange={handleInputChange} style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '16px'
                }} required />
              </div>
              <button type="submit" style={{
                padding: '10px 15px',
                borderRadius: '8px',
                backgroundColor: '#012441',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
                fontSize: '16px',
                marginTop: '10px'
              }}>Update</button>
            </form>
          </div>
        )}

        {showReportModal && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            width: '400px',
            maxWidth: '100%',
            textAlign: 'left'
          }}>
            <button onClick={closeModal} style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
            }}>&times;</button>
            <h3 style={{ fontSize: '20px', color: '#333', marginBottom: '10px' }}>Add Patient Report</h3>
            <form onSubmit={handleReportSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Doctor Name</label>
                <input type="text" name="doctorName" value={reportData.doctorName} onChange={handleReportInputChange} style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '16px'
                }} required />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Diagnosis</label>
                <input type="text" name="diagnosis" value={reportData.diagnosis} onChange={handleReportInputChange} style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '16px'
                }} required />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Treatment</label>
                <input type="text" name="treatment" value={reportData.treatment} onChange={handleReportInputChange} style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '16px'
                }} required />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Prescription</label>
                <input type="text" name="prescription" value={reportData.prescription} onChange={handleReportInputChange} style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '16px'
                }} required />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontSize: '14px', color: '#555', marginBottom: '5px' }}>Notes</label>
                <textarea name="notes" value={reportData.notes} onChange={handleReportInputChange} style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '16px'
                }} required />
              </div>
              <button type="submit" style={{
                padding: '10px 15px',
                borderRadius: '8px',
                backgroundColor: '#012441',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                width: '100%',
                fontSize: '16px',
                marginTop: '10px'
              }}>Submit Report</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients;
