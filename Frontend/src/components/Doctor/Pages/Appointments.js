import React, { useState, useEffect } from 'react';
import DoctorNavbar from './DoctorNavbar';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const doctorusername = localStorage.getItem('username');
        if (!doctorusername) {
          throw new Error('Doctor username not found in local storage');
        }

        const fetchStatusAppointments = async (status) => {
          const response = await fetch(`http://localhost:8080/appointments/doctor?doctorusername=${doctorusername}&status=${status}`);
          if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(`Network response was not ok: ${errorDetails.message}`);
          }
          return await response.json();
        };

        const pendingAppointments = await fetchStatusAppointments('pending');
        const acceptedAppointments = await fetchStatusAppointments('accepted');
        
        // Combine pending and accepted appointments
        const combinedAppointments = [...pendingAppointments, ...acceptedAppointments];
        setAppointments(combinedAppointments);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAppointments();
  }, []);

  const markAsAccepted = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/appointments/${id}/accepted`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setAppointments(appointments.map(appointment =>
        appointment.id === id ? { ...appointment, status: 'accepted' } : appointment
      ));
    } catch (error) {
      console.error('Error accepting appointment:', error);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/appointments/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setAppointments(appointments.filter(appointment => appointment.id !== id));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const markAsCompleted = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/appointments/${id}/completed`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setAppointments(appointments.map(appointment =>
        appointment.id === id ? { ...appointment, status: 'completed' } : appointment
      ));
    } catch (error) {
      console.error('Error marking appointment as completed:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <DoctorNavbar />
      <div style={{ padding: '60px', marginTop: '80px', backgroundColor: '#e9ecef', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
        <main>
          <h2 style={{ fontSize: '36px', color: '#212529', marginBottom: '30px', textAlign: 'center', fontWeight: '600' }}>Your Appointments</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  style={{
                    maxWidth: '600px',
                    width: '100%',
                    backgroundColor: '#ffffff',
                    borderRadius: '15px',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    cursor: 'pointer',
                    padding: '25px',
                    margin: '10px',
                    animation: 'fadeInUp 0.6s ease-in-out',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ borderBottom: '1px solid #ddd', paddingBottom: '15px', marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#495057' }}>Appointment {appointment.id}</h3>
                    <p style={{ fontSize: '16px', color: '#868e96' }}>
                      {appointment.appointmentDate} | {appointment.appointmentTime}
                    </p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ flex: '1', marginRight: '10px' }}>
                      <p style={{ margin: '10px 0', color: '#6c757d' }}><strong>Patient Name:</strong> {appointment.username}</p>
                      <p style={{ margin: '10px 0', color: '#6c757d' }}><strong>Doctor Name:</strong> {appointment.doctorname}</p>
                    </div>
                  </div>
                  {appointment.status === 'pending' && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                      <button
                        style={{
                          backgroundColor: '#28a745',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '5px',
                          padding: '10px 20px',
                          cursor: 'pointer'
                        }}
                        onClick={() => markAsAccepted(appointment.id)}
                      >
                        Accept
                      </button>
                      <button
                        style={{
                          backgroundColor: '#dc3545',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '5px',
                          padding: '10px 20px',
                          cursor: 'pointer'
                        }}
                        onClick={() => deleteAppointment(appointment.id)}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {appointment.status === 'accepted' && (
                    <button
                      style={{
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        marginTop: '10px'
                      }}
                      onClick={() => markAsCompleted(appointment.id)}
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p style={{ color: '#495057', fontSize: '18px', textAlign: 'center' }}>No appointments found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Appointments;
