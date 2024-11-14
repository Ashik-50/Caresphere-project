import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/login');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/login/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const capitalizeFirstLetter = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <div>
      <AdminNavbar />
      <div className="user-page" style={{ display: 'flex', flexDirection: 'column', marginTop: '90px', height: '100vh' }}>
        <main style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="search-area" style={{ width: '100%', maxWidth: 600, marginBottom: 20, display: 'flex', justifyContent: 'center' }}>
            <input
              type="text"
              placeholder="Search users..."
              onChange={handleSearch}
              value={search}
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '16px',
                borderRadius: '50px', 
                border: '1px solid #ddd',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                backgroundColor: '#fff',
                outline: 'none',
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)'}
              onBlur={(e) => e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'}
              onKeyDown={(e) => e.key === 'Enter' && e.target.blur()}
            />
          </div>
          <div className="user-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', width: '100%', maxWidth: 1200 }}>
            {users.filter(user => 
              user.username.toLowerCase().includes(search.toLowerCase()) ||
              user.firstName.toLowerCase().includes(search.toLowerCase()) ||
              user.lastName.toLowerCase().includes(search.toLowerCase()) ||
              user.email.toLowerCase().includes(search.toLowerCase())
            ).map((user, index) => (
              <div key={index} className="user-card" style={{
                backgroundColor: '#fff',
                border: 'none',
                padding: '20px',
                borderRadius: '15px', // More rounded corners
                boxShadow: '0 10px 20px rgba(0,0,0,0.1)', // Softer, more pronounced shadow
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '250px', // Increased min-height for better spacing
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
              }}
              >
                <div className="user-info" style={{ textAlign: 'center' }}>
                  <h3 className="username" style={{
                    margin: '10px 0',
                    fontSize: '26px', // Increased font size
                    fontWeight: '700', // Bolder text
                    color: '#333',
                    letterSpacing: '0.5px' // Added letter spacing for readability
                  }}>
                    {capitalizeFirstLetter(user.username)}
                  </h3>
                  <span style={{
                    display: 'block',
                    marginBottom: '10px',
                    padding: '6px 12px', // Larger padding for role tags
                    fontSize: '14px', // Increased size for the role
                    fontWeight: '600',
                    color: '#000',
                    textAlign: 'left', // Align roles to the left
                    textTransform: 'uppercase' // Roles in uppercase
                  }}>
                    {user.role}
                  </span>
                  <p className="email" style={{
                    margin: '10px 0',
                    color: '#007bff',
                    fontSize: '18px', // Increased font size for email
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                  }}>
                    <a href={`mailto:${user.email}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                      {user.email}
                    </a>
                  </p>
                </div>
                {user.role !== 'admin' && (
                  <button
                    onClick={() => deleteUser(user.id)}
                    style={{
                      marginTop: '20px', // Added margin for spacing
                      padding: '10px 25px', // Adjusted padding for button
                      backgroundColor: '#dc3545',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '25px', // Rounded button
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease, transform 0.3s ease',
                      fontSize: '16px', // Increased font size for button text
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#c82333'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = '#dc3545'}
                    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    Delete User
                  </button>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Users;
