import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/image.png';
import './UserDetails.css';
import Navbar from '../Home/Navbar';

function UserDetails() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(''); // Added state for age
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emergencyContact, setEmergencyContact] = useState(''); 
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [isPregnant, setIsPregnant] = useState(false);
  const [monthOfPregnancy, setMonthOfPregnancy] = useState('');
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState('');
  const [consultingDoctor, setConsultingDoctor] = useState('');
  const [hadDiseaseBefore, setHadDiseaseBefore] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState('');
  const [diseaseConsultingDoctor, setDiseaseConsultingDoctor] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [error, setError] = useState('');
  const [username,setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedname = localStorage.getItem('username');
    if (storedname) {
      setUsername(storedname);
    }
  }, []);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    if (event.target.value !== 'female') {
      setIsPregnant(false);
    }
  };

  const handleDiseaseChange = (event) => {
    setSelectedDisease(event.target.value);
    if (event.target.value === '') {
      setDiseaseConsultingDoctor('');
      setMedicalHistory('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formattedDateOfBirth = dateOfBirth ? dateOfBirth : '';
    const formattedExpectedDeliveryDate = expectedDeliveryDate ? expectedDeliveryDate : '';
  
    const userDetails = {
      firstName,
      lastName,
      age, // Include age in the submitted data
      email,
      phone,
      emergencyContact,
      address,
      dateOfBirth: formattedDateOfBirth,
      gender,
      isPregnant,
      monthOfPregnancy,
      expectedDeliveryDate: formattedExpectedDeliveryDate,
      consultingDoctor,
      hadDiseaseBefore,
      selectedDisease,
      diseaseConsultingDoctor,
      medicalHistory,
      username
    };
  
    try {
      const response = await fetch('http://localhost:8080/userdetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });
  
      if (response.ok) {
        navigate('/doctors');
      } else {
        const errorData = await response.json();
        setError(`Failed to submit user details: ${errorData.message}`);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <Navbar />
    <div className="userdetails-container">
      <div className="userdetails-content">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>User Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
            />
          </div>
          <div className="form-group">
            <label>Age</label> {/* Added label for age */}
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="form-group">
            <label>Emergency Contact</label>
            <input
              type="text"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              placeholder="Enter emergency contact number"
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
            />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select
              value={gender}
              onChange={handleGenderChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          {gender === 'female' && (
            <div className="form-group">
              <label>Are you pregnant?</label>
              <select
                value={isPregnant ? 'yes' : 'no'}
                onChange={(e) => setIsPregnant(e.target.value === 'yes')}
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          )}
          {isPregnant && (
            <>
              <div className="form-group">
                <label>Month of Pregnancy</label>
                <input
                  type="number"
                  value={monthOfPregnancy}
                  onChange={(e) => setMonthOfPregnancy(e.target.value)}
                  placeholder="Enter month of pregnancy"
                />
              </div>
              <div className="form-group">
                <label>Expected Delivery Date</label>
                <input
                  type="date"
                  value={expectedDeliveryDate}
                  onChange={(e) => setExpectedDeliveryDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Consulting Doctor</label>
                <input
                  type="text"
                  value={consultingDoctor}
                  onChange={(e) => setConsultingDoctor(e.target.value)}
                  placeholder="Enter consulting doctor"
                />
              </div>
            </>
          )}
          <div className="form-group">
            <label>Had any disease before?</label>
            <select
              value={hadDiseaseBefore ? 'yes' : 'no'}
              onChange={(e) => setHadDiseaseBefore(e.target.value === 'yes')}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
          {hadDiseaseBefore && (
            <>
              <div className="form-group">
                <label>Select Disease</label>
                <select
                  value={selectedDisease}
                  onChange={handleDiseaseChange}
                >
                  <option value="">Select Disease</option>
                  <option value="disease1">Diabetes</option>
                  <option value="disease2">Hypertension</option>
                  <option value="disease3">Asthma</option>
                  <option value="disease4">Heart Disease</option>
                  <option value="disease5">Arthritis</option>
                </select>
              </div>
              {selectedDisease && (
                <>
                  <div className="form-group">
                    <label>Consulted Doctor</label>
                    <input
                      type="text"
                      value={diseaseConsultingDoctor}
                      onChange={(e) => setDiseaseConsultingDoctor(e.target.value)}
                      placeholder="Enter consulted doctor"
                    />
                  </div>
                  <div className="form-group">
                    <label>Medical History</label>
                    <textarea
                      value={medicalHistory}
                      onChange={(e) => setMedicalHistory(e.target.value)}
                      placeholder="Enter medical history"
                    />
                  </div>
                </>
              )}
            </>
          )}
          <div className="form-group">
            <button type="submit" className="submit-button">Submit</button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
    </div>
  );
}

export default UserDetails;
