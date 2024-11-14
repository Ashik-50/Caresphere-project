import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [hoveredReport, setHoveredReport] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const username = localStorage.getItem('username');
        const response = await axios.get(`http://localhost:8080/doctor/reports/${username}`);
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    fetchReports();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.title}>Reports</h2>
        {reports.length === 0 ? (
          <p style={styles.noReports}>No reports available</p>
        ) : (
          reports.map(report => (
            <div
              key={report.id}
              style={{
                ...styles.reportContainer,
                ...(hoveredReport === report.id ? styles.reportContainerHover : {}),
              }}
              onMouseEnter={() => setHoveredReport(report.id)}
              onMouseLeave={() => setHoveredReport(null)}
            >
              <div style={styles.reportHeader}>
                <h3 style={styles.reportTitle}>{report.doctorName}</h3>
                <p style={styles.reportSubtitle}>{report.diagnosis}</p>
              </div>
              <div style={styles.reportContent}>
                <p><strong>Patient:</strong> {report.patientName}</p>
                <p><strong>Treatment:</strong> {report.treatment}</p>
                <p><strong>Prescription:</strong> {report.prescription}</p>
                <p><strong>Notes:</strong> {report.notes}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1550px',
    margin: 'auto',
    marginTop: '90px',
    marginBottom:'70px',
    backgroundColor: '#f4f4f9',
  },
  title: {
    textAlign: 'center',
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: '30px',
  },
  noReports: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#6c757d',
  },
  reportContainer: {
    margin: '15px 0',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    transition: 'transform 0.3s, box-shadow 0.3s',
    animation: 'fadeIn 0.5s ease-in-out',
    cursor: 'pointer',
  },
  reportContainerHover: {
    transform: 'scale(1.02)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
  },
  reportHeader: {
    borderBottom: '2px solid #343a40',
    paddingBottom: '10px',
    marginBottom: '15px',
  },
  reportTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#343a40',
  },
  reportSubtitle: {
    fontSize: '18px',
    color: '#6c757d',
  },
  reportContent: {
    fontSize: '16px',
    color: '#495057',
  },
};

export default Reports;
