import React, { useEffect, useState } from 'react';
import DoctorNavbar from './DoctorNavbar';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement);

const HomePage = () => {
  const [ongoingPatients, setOngoingPatients] = useState([]);
  const [completedPatients, setCompletedPatients] = useState([]);

  useEffect(() => {
    const doctorUsername = localStorage.getItem('username');
    
    fetch(`http://localhost:8080/doctor/ongoing?doctor=${doctorUsername}`)
      .then(response => response.json())
      .then(data => setOngoingPatients(data));

    fetch(`http://localhost:8080/doctor/completed?doctor=${doctorUsername}`)
      .then(response => response.json())
      .then(data => setCompletedPatients(data));
  }, []);

  const getChartData = () => {
    const ongoingData = ongoingPatients.reduce((acc, curr) => {
      const date = new Date(curr.date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const completedData = completedPatients.reduce((acc, curr) => {
      const date = new Date(curr.date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const labels = [...new Set([...Object.keys(ongoingData), ...Object.keys(completedData)])];

    return {
      labels,
      datasets: [
        {
          label: 'Ongoing Appointments',
          data: labels.map(label => ongoingData[label] || 0),
          borderColor: '#e74c3c',
          backgroundColor: 'rgba(231, 76, 60, 0.2)',
        },
        {
          label: 'Completed Appointments',
          data: labels.map(label => completedData[label] || 0),
          borderColor: '#2ecc71',
          backgroundColor: 'rgba(46, 204, 113, 0.2)',
        },
      ],
    };
  };

  return (
    <div>
      <DoctorNavbar />
      <div style={{ maxWidth: '1200px', marginTop: '120px', margin: '0 auto', padding: '90px', backgroundColor: '#f7f9f9', borderRadius: '10px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)' }}>
        <section style={{ marginTop: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2C5F2D', marginBottom: '20px' }}>Appointment Trends</h2>
          <Line data={getChartData()} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Appointments Over Time',
              },
            },
          }} />
        </section>

        <section style={{ marginTop: '40px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2C5F2D', marginBottom: '20px' }}>Patients Overview</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '40px' }}>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2C5F2D' }}>Total Patients</h3>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#3498db' }}>{ongoingPatients.length + completedPatients.length}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2C5F2D' }}>Attended Patients</h3>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#2ecc71' }}>{completedPatients.length}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#2C5F2D' }}>Unattended Patients</h3>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#e74c3c' }}>{ongoingPatients.length}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
