import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserMd, FaUsers, FaCalendarAlt, FaBell, FaTasks } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import logo from '../Assets/logo.png';
import AdminNavbar from './AdminNavbar';

const HomePage = () => {
  const [counts, setCounts] = useState({ doctors: 0, users: 0, appointments: 0 });
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [doctorsResponse, usersResponse, appointmentsResponse] = await Promise.all([
          axios.get('http://localhost:8080/doctors/count'),
          axios.get('http://localhost:8080/login/count'),
          axios.get('http://localhost:8080/appointments/count'),
        ]);

        setCounts({
          doctors: doctorsResponse.data,
          users: usersResponse.data,
          appointments: appointmentsResponse.data,
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
        setError('Failed to fetch data. Please try again later.');
      }
    };

    // Dummy data for notifications and tasks
    setNotifications([
      { id: 1, icon: <FaBell />, message: 'New doctor registered' },
      { id: 2, icon: <FaBell />, message: 'System update available' },
      { id: 3, icon: <FaBell />, message: 'User feedback received' },
    ]);

    setTasks([
      { id: 1, icon: <FaTasks />, task: 'Review new registrations' },
      { id: 2, icon: <FaTasks />, task: 'Update system settings' },
      { id: 3, icon: <FaTasks />, task: 'Analyze user feedback' },
    ]);

    fetchCounts();
  }, []);

  const data = [
    { name: 'Doctors', value: counts.doctors },
    { name: 'Users', value: counts.users },
    { name: 'Appointments', value: counts.appointments },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {value}
      </text>
    );
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: darkMode ? '#2e2e2e' : '#f4f4f4',
      color: darkMode ? '#fff' : '#333',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: darkMode ? '#444' : '#2a3f54',
      padding: '10px 20px',
      color: '#fff',
    },
    logo: {
      width: '40px',
      height: '40px',
      marginRight: '10px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    toggleButton: {
      backgroundColor: darkMode ? '#444' : '#2a3f54',
      border: 'none',
      color: '#fff',
      padding: '10px 20px',
      cursor: 'pointer',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
    },
    main: {
      flex: 1,
      padding: '20px',
    },
    bigCard: {
      backgroundColor: darkMode ? '#3a3a3a' : '#fff',
      border: darkMode ? '1px solid #444' : '1px solid #ddd',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: darkMode ? '0 0 10px rgba(0, 0, 0, 0.5)' : '0 0 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '1200px',
      margin: '0 auto',
      textAlign: 'center',
      animation: 'fadeIn 1s ease-in-out',
    },
    counts: {
      display: 'flex',
      justifyContent: 'space-around',
      marginBottom: '40px',
      flexWrap: 'wrap',
    },
    countItem: {
      flex: '1 1 30%',
      margin: '10px',
      backgroundColor: darkMode ? '#555' : '#f9f9f9',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: darkMode ? '0 0 5px rgba(0, 0, 0, 0.5)' : '0 0 5px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
    countNumber: {
      fontSize: '36px',
      fontWeight: 'bold',
    },
    countLabel: {
      fontSize: '18px',
      color: darkMode ? '#ccc' : '#666',
    },
    countIcon: {
      fontSize: '48px',
      marginBottom: '10px',
      color: '#8884d8',
    },
    contentSection: {
      marginTop: '40px',
    },
    sectionTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    card: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: darkMode ? '#555' : '#fff',
      padding: '20px',
      borderRadius: '10px',
      marginBottom: '20px',
      boxShadow: darkMode ? '0 0 5px rgba(0, 0, 0, 0.5)' : '0 0 5px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer',
    },
    cardIcon: {
      fontSize: '36px',
      marginRight: '20px',
    },
    cardContent: {
      flex: 1,
    },
    cardText: {
      fontSize: '16px',
    },
    error: {
      color: 'red',
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <AdminNavbar />
      <header style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Logo" style={styles.logo} />
          <h1 style={styles.title}>Admin Dashboard</h1>
        </div>
        <button
          style={styles.toggleButton}
          onClick={() => setDarkMode(!darkMode)}
        >
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
      </header>
      <main style={styles.main}>
        <div style={styles.bigCard}>
          <h1 style={styles.title}>Admin Dashboard</h1>
          <div style={styles.counts}>
            <div
              style={styles.countItem}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <FaUserMd style={styles.countIcon} />
              <div style={styles.countNumber}>{counts.doctors}</div>
              <div style={styles.countLabel}>Doctors</div>
            </div>
            <div
              style={styles.countItem}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <FaUsers style={styles.countIcon} />
              <div style={styles.countNumber}>{counts.users}</div>
              <div style={styles.countLabel}>Users</div>
            </div>
            <div
              style={styles.countItem}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <FaCalendarAlt style={styles.countIcon} />
              <div style={styles.countNumber}>{counts.appointments}</div>
              <div style={styles.countLabel}>Appointments</div>
            </div>
          </div>
          {error && <div style={styles.error}>{error}</div>}
          <div style={styles.contentSection}>
            <h2 style={styles.sectionTitle}>Data Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={styles.contentSection}>
            <h2 style={styles.sectionTitle}>Notifications</h2>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                style={styles.card}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <div style={styles.cardIcon}>{notification.icon}</div>
                <div style={styles.cardContent}>
                  <div style={styles.cardText}>{notification.message}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={styles.contentSection}>
            <h2 style={styles.sectionTitle}>Tasks</h2>
            {tasks.map((task) => (
              <div
                key={task.id}
                style={styles.card}
                onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <div style={styles.cardIcon}>{task.icon}</div>
                <div style={styles.cardContent}>
                  <div style={styles.cardText}>{task.task}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
