import React, { useState, useEffect } from 'react';
import './AppointmentsPage.css';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const username = localStorage.getItem('username');

  const fetchAppointments = async () => {
    try {
        if (!username) {
            console.error('No username found in local storage');
            return;
        }
        const statuses = ["pending", "accepted"];
        const query = statuses.map(status => `statuses=${status}`).join("&");
        const response = await fetch(`http://localhost:8080/appointments/user?username=${username}&${query}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAppointments(data);
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
};
  useEffect(() => {
    fetchAppointments();
  }, []);

  const confirmDelete = (appointment) => {
    setShowConfirmation(true);
    setAppointmentToDelete(appointment);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setAppointmentToDelete(null);
  };

  const deleteAppointment = async () => {
    try {
      if (!appointmentToDelete) return;
      const { id } = appointmentToDelete;
      const response = await fetch(`http://localhost:8080/appointments/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete the appointment');
      }
      setAppointments(appointments.filter(appointment => appointment.id !== id));
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const viewDetails = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const closeDetails = () => {
    setSelectedAppointment(null);
  };

  return (
    <div>
      <Navbar />
      <div className="appointments-page-container">
        <h1 className="appointments-page-title">Appointments</h1>
        <ul className="appointments-list">
          {appointments.map(appointment => (
            <li key={appointment.id} 
                className={`appointment-item ${appointment.status === 'pending' ? 'pending' : 'accepted'}`}
                onClick={() => viewDetails(appointment)}>
              <div className="appointment-summary">
                <img
                  src={appointment.doctorImageUrl}
                  alt="Doctor"
                  className="doctor-image"
                />
                <div>
                  <span className="appointment-doctor-name">Doctor Name: {appointment.doctorname}</span>
                  <span className="appointment-date">Date: {appointment.appointmentDate}</span>
                  <span className="appointment-time">Time: {appointment.appointmentTime}</span>
                  <span className="appointment-status">Status: {appointment.status}</span>
                </div>
              </div>
              <div className="appointment-actions">
                <button onClick={(e) => {
                  e.stopPropagation();
                  confirmDelete(appointment);
                }}>Delete</button>
              </div>
            </li>
          ))}
        </ul>

        {selectedAppointment && (
          <div className="appointment-details-overlay">
            <div className="appointment-details">
              <h2>Appointment Details</h2>
              <p><strong>Name:</strong> {selectedAppointment.doctorname}</p>
              <p><strong>Email:</strong> {selectedAppointment.doctorEmail}</p>
              <p><strong>Phone:</strong> {selectedAppointment.doctorPhone}</p>
              <p><strong>Specialty:</strong> {selectedAppointment.doctorSpecialty}</p>
              <p><strong>Hospital:</strong> {selectedAppointment.doctorHospital}</p>
              <p><strong>Date:</strong> {selectedAppointment.appointmentDate}</p>
              <p><strong>Time:</strong> {selectedAppointment.appointmentTime}</p>
              <button onClick={closeDetails}>Close</button>
            </div>
          </div>
        )}

        {showConfirmation && (
          <div className="confirmation-modal">
            <div className="confirmation-content">
              <p>Are you sure you want to delete this appointment?</p>
              <button onClick={deleteAppointment}>Yes</button>
              <button onClick={cancelDelete}>No</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AppointmentsPage;
