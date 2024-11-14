import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyAccount.css'; // Import the CSS file for styling
import Navbar from './Navbar';

const MyAccount = () => {
    const [userDetails, setUserDetails] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const username = localStorage.getItem('username'); // Get the username from localStorage
        axios.get(`http://localhost:8080/userdetails/user?username=${username}`)
            .then(response => {
                setUserDetails(response.data[0]); // Assuming the API returns an array
                setFormData(response.data[0]);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = () => {
        axios.post('http://localhost:8080/userdetails', formData)
            .then(response => {
                setUserDetails(response.data);
                setIsEditing(false);
            })
            .catch(error => {
                console.error('Error saving user details:', error);
            });
    };

    return (
        <div>
            <Navbar />
        <div className="my-account-container">
            <h2 className="my-account-title">My Account</h2>
            <div className="my-account-details">
                {/* Render all fields */}
                <div className="account-section">
                    <label>First Name:</label>
                    {isEditing ? (
                        <input type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} />
                    ) : (
                        <p>{userDetails.firstName}</p>
                    )}
                </div>
                <div className="account-section">
                    <label>Last Name:</label>
                    {isEditing ? (
                        <input type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} />
                    ) : (
                        <p>{userDetails.lastName}</p>
                    )}
                </div>
                <div className="account-section">
                    <label>Email:</label>
                    {isEditing ? (
                        <input type="email" name="email" value={formData.email || ''} onChange={handleChange} />
                    ) : (
                        <p>{userDetails.email}</p>
                    )}
                </div>
                <div className="account-section">
                    <label>Phone:</label>
                    {isEditing ? (
                        <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} />
                    ) : (
                        <p>{userDetails.phone}</p>
                    )}
                </div>
                <div className="account-section">
                    <label>Emergency Contact:</label>
                    {isEditing ? (
                        <input type="text" name="emergencyContact" value={formData.emergencyContact || ''} onChange={handleChange} />
                    ) : (
                        <p>{userDetails.emergencyContact}</p>
                    )}
                </div>
                <div className="account-section">
                    <label>Address:</label>
                    {isEditing ? (
                        <input type="text" name="address" value={formData.address || ''} onChange={handleChange} />
                    ) : (
                        <p>{userDetails.address}</p>
                    )}
                </div>
                <div className="account-section">
                    <label>Date of Birth:</label>
                    {isEditing ? (
                        <input type="date" name="dateOfBirth" value={formData.dateOfBirth || ''} onChange={handleChange} />
                    ) : (
                        <p>{new Date(userDetails.dateOfBirth).toLocaleDateString()}</p>
                    )}
                </div>
                <div className="account-section">
                    <label>Age:</label>
                    {isEditing ? (
                        <input type="number" name="age" value={formData.age || ''} onChange={handleChange} />
                    ) : (
                        <p>{userDetails.age}</p>
                    )}
                </div>
                <div className="account-section">
                    <label>Gender:</label>
                    {isEditing ? (
                        <select name="gender" value={formData.gender || ''} onChange={handleChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    ) : (
                        <p>{userDetails.gender}</p>
                    )}
                </div>
                <div className="account-section">
                    <label>Pregnant:</label>
                    {isEditing ? (
                        <select name="isPregnant" value={formData.isPregnant ? 'Yes' : 'No'} onChange={handleChange}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    ) : (
                        <p>{userDetails.isPregnant ? 'Yes' : 'No'}</p>
                    )}
                </div>
                <div className="account-section">
                    <label>Month of Pregnancy:</label>
                    {isEditing ? (
                        <input type="number" name="monthOfPregnancy" value={formData.monthOfPregnancy || ''} onChange={handleChange} />
                    ) : (
                        <p>{userDetails.monthOfPregnancy}</p>
                    )}
                </div>
                <div className="account-section">
                    <label>Expected Delivery Date:</label>
                    {isEditing ? (
                        <input type="date" name="expectedDeliveryDate" value={formData.expectedDeliveryDate || ''} onChange={handleChange} />
                    ) : (
                        <p>{new Date(userDetails.expectedDeliveryDate).toLocaleDateString()}</p>
                    )}
                </div>
                <div className="account-section">
                    <label>Consulting Doctor:</label>
                    {isEditing ? (
                        <input type="text" name="consultingDoctor" value={formData.consultingDoctor || ''} onChange={handleChange} />
                    ) : (
                        <p>{userDetails.consultingDoctor}</p>
                    )}
                </div>
                <div className="account-section">
                    <label>Had Disease Before:</label>
                    {isEditing ? (
                        <select name="hadDiseaseBefore" value={formData.hadDiseaseBefore ? 'Yes' : 'No'} onChange={handleChange}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    ) : (
                        <p>{userDetails.hadDiseaseBefore ? 'Yes' : 'No'}</p>
                    )}
                </div>
                <div className="account-section">
                    <label>Selected Disease:</label>
                    {isEditing ? (
                        <input type="text" name="selectedDisease" value={formData.selectedDisease || ''} onChange={handleChange} />
                    ) : (
                        <p>{userDetails.selectedDisease}</p>
                    )}
                </div>
                <div className="account-section">
                    <label>Disease Consulting Doctor:</label>
                    {isEditing ? (
                        <input type="text" name="diseaseConsultingDoctor" value={formData.diseaseConsultingDoctor || ''} onChange={handleChange} />
                    ) : (
                        <p>{userDetails.diseaseConsultingDoctor}</p>
                    )}
                </div>
                <div className="account-section">
                    <label>Medical History:</label>
                    {isEditing ? (
                        <textarea name="medicalHistory" value={formData.medicalHistory || ''} onChange={handleChange}></textarea>
                    ) : (
                        <p>{userDetails.medicalHistory}</p>
                    )}
                </div>
                <div className="my-account-buttons">
                    {isEditing ? (
                        <button className="save-button" onClick={handleSave}>Save</button>
                    ) : (
                        <button className="edit-button" onClick={handleEdit}>Edit</button>
                    )}
                </div>
            </div>
        </div>
        </div>
    );
};

export default MyAccount;
