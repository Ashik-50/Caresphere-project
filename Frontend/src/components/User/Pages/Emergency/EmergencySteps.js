import React, { useState } from 'react';
import { FaSearch, FaFire, FaMedkit, FaCarCrash, FaWater, FaHeartbeat, FaUmbrella, FaGasPump, FaShieldAlt, FaShieldVirus, FaPhone, FaVirus, FaSnowflake, FaPills } from 'react-icons/fa';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';

const emergencyData = {
  fire: {
    title: 'Fire Emergency',
    details: [
      'Alert everyone in the building.',
      'Evacuate the building immediately.',
      'Call emergency services.',
      'Do not use elevators.',
      'Use a wet cloth to cover your nose and mouth if smoke is present.',
      'If trapped, signal for help.',
      'Follow fire drill procedures if available.',
    ],
  },
  medical: {
    title: 'Medical Emergency',
    details: [
      'Assess the situation and call for help.',
      'Perform first aid if necessary.',
      'Keep the person calm and comfortable.',
      'Provide any information to the emergency responders.',
      'Follow any additional instructions provided by the dispatcher.',
      'Monitor the person’s condition until help arrives.',
      'Keep a first aid kit accessible and well-stocked.',
    ],
  },
  accident: {
    title: 'Accident',
    details: [
      'Check for any injuries and call emergency services if needed.',
      'If safe, move to a safe location.',
      'Provide necessary first aid.',
      'Exchange information with others involved in the accident.',
      'Document the scene and injuries if possible.',
      'Avoid moving seriously injured persons unless necessary.',
      'Stay calm and reassure others involved.',
    ],
  },
  flood: {
    title: 'Flood',
    details: [
      'Move to higher ground immediately.',
      'Avoid walking or driving through flooded areas.',
      'Listen to emergency broadcasts for instructions.',
      'Avoid contact with electrical equipment.',
      'Follow evacuation orders if issued.',
      'Prepare an emergency kit with essentials.',
      'Stay informed about weather updates and warnings.',
    ],
  },
  earthquake: {
    title: 'Earthquake',
    details: [
      'Drop to your knees and cover your head and neck.',
      'Hold on to a sturdy piece of furniture if possible.',
      'Stay indoors and away from windows.',
      'If outside, move to an open area away from buildings.',
      'Follow up with emergency services for instructions.',
      'Check for injuries and administer first aid if needed.',
      'Be prepared for aftershocks.',
    ],
  },
  storm: {
    title: 'Storm',
    details: [
      'Seek shelter indoors.',
      'Avoid using electrical appliances.',
      'Stay away from windows and glass doors.',
      'Monitor weather updates for warnings.',
      'Prepare an emergency kit with essentials.',
      'Avoid travel unless absolutely necessary.',
      'Follow local authorities’ instructions and updates.',
    ],
  },
  powerOutage: {
    title: 'Power Outage',
    details: [
      'Use flashlights instead of candles to avoid fire hazards.',
      'Keep refrigerator and freezer doors closed.',
      'Avoid using electrical devices unnecessarily.',
      'Check on neighbors who may need assistance.',
      'Follow local updates for power restoration information.',
      'Use a battery-operated radio to stay informed.',
      'Have a backup power source if available.',
    ],
  },
  chemicalSpill: {
    title: 'Chemical Spill',
    details: [
      'Evacuate the area immediately.',
      'Avoid contact with spilled chemicals.',
      'Follow emergency procedures provided by authorities.',
      'Do not attempt to clean up the spill yourself.',
      'Seek medical attention if exposed.',
      'Provide details about the spill to emergency responders.',
      'Avoid breathing in fumes or vapors.',
    ],
  },
  gasLeak: {
    title: 'Gas Leak',
    details: [
      'Evacuate the area immediately.',
      'Do not use electrical switches or appliances.',
      'Avoid lighting matches or using open flames.',
      'Contact emergency services from a safe location.',
      'Follow evacuation orders and provide details of the leak.',
      'Ventilate the area if safe to do so.',
      'Seek medical attention if exposed to gas.',
    ],
  },
  activeShooter: {
    title: 'Active Shooter',
    details: [
      'Run and escape the area if possible.',
      'Hide and stay out of sight if you cannot escape.',
      'Remain quiet and stay hidden.',
      'Follow instructions from authorities.',
      'If confronted, try to protect yourself and others.',
      'Call emergency services as soon as it is safe.',
      'Keep low and avoid windows if hiding.',
    ],
  },
  medicalEmergency: {
    title: 'Medical Emergency',
    details: [
      'Assess the situation and call for help.',
      'Provide first aid if trained and necessary.',
      'Keep the person calm and comfortable.',
      'Give emergency responders all relevant information.',
      'Follow any instructions given by emergency personnel.',
      'Monitor the person’s condition until help arrives.',
      'Keep a first aid kit accessible and well-stocked.',
    ],
  },
  lostPerson: {
    title: 'Lost Person',
    details: [
      'Search the immediate area where the person was last seen.',
      'Notify local authorities if the person is not found quickly.',
      'Provide a detailed description of the person to authorities.',
      'Keep in contact with emergency services for updates.',
      'Remain calm and assist in the search as directed.',
      'Utilize local resources and community support.',
      'Distribute flyers with the person’s details if necessary.',
    ],
  },
  fireExtinguisher: {
    title: 'Fire Extinguisher',
    details: [
      'Assess the fire and decide if it is manageable.',
      'Ensure you are trained in using a fire extinguisher.',
      'Use the PASS method: Pull, Aim, Squeeze, Sweep.',
      'Evacuate the area if the fire cannot be controlled.',
      'Report the fire to emergency services immediately.',
      'Ensure the fire is completely out before leaving.',
      'Regularly inspect and maintain fire extinguishers.',
    ],
  },
  pandemic: {
    title: 'Pandemic',
    details: [
      'Follow health advisories and guidelines.',
      'Practice good hygiene, such as handwashing.',
      'Maintain social distancing as recommended.',
      'Stay informed about vaccination and treatment options.',
      'Follow quarantine or isolation orders if applicable.',
      'Avoid unnecessary travel and gatherings.',
      'Stay updated with the latest health information.',
    ],
  },
  severeWeather: {
    title: 'Severe Weather',
    details: [
      'Stay indoors and away from windows.',
      'Monitor weather updates and warnings.',
      'Have an emergency kit ready.',
      'Follow local authorities instructions.',
      'Be prepared for possible power outages.',
      'Secure outdoor objects and prepare your home.',
      'Stay informed about weather conditions.',
    ],
  },
  hazardousMaterial: {
    title: 'Hazardous Material',
    details: [
      'Evacuate the area if necessary.',
      'Avoid contact with the material.',
      'Follow instructions from authorities.',
      'Seek medical help if exposed.',
      'Report the incident to emergency services.',
      'Provide details about the material to responders.',
      'Avoid breathing in fumes or vapors.',
    ],
  },
};

const EmergencySteps = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmergency, setSelectedEmergency] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleSelectEmergency = (type) => {
    setSelectedEmergency(emergencyData[type]);
  };

  const filteredEmergencies = Object.keys(emergencyData).filter(key =>
    emergencyData[key].title.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
        <Navbar />
        <div style={{ 
            display: 'flex', 
            minHeight: '100vh', 
            flexDirection: 'column', 
            padding: '10px', 
            marginTop: '70px', 
            background: 'linear-gradient(135deg, #f4f4f9 0%, #f4f4f9 100%)' 
            }}>

      <h1 style={{ textAlign: 'center', margin: '20px 0', color: 'black', fontSize: '36px', fontWeight: '700' }}>Emergency Steps</h1>
      <div style={{ margin: '0 auto', maxWidth: '1200px', display: 'flex', gap: '20px' }}>
        <div style={{ flex: '1', minWidth: '250px' }}>
          <input
            type="text"
            placeholder="Search for an emergency..."
            style={{ width: '100%', padding: '10px 20px', fontSize: '18px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '20px' }}
            onChange={handleSearchChange}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredEmergencies.map((type) => (
              <button
                key={type}
                style={{
                  backgroundColor: '#012441',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '15px',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  boxShadow: '0 4px 8px rgba(                  0, 0, 0, 0.1)',
                }}
                onClick={() => handleSelectEmergency(type)}
              >
                {/* Display an icon based on the emergency type */}
                {type === 'fire' && <FaFire size={24} />}
                {type === 'medical' && <FaMedkit size={24} />}
                {type === 'accident' && <FaCarCrash size={24} />}
                {type === 'flood' && <FaWater size={24} />}
                {type === 'earthquake' && <FaHeartbeat size={24} />}
                {type === 'storm' && <FaUmbrella size={24} />}
                {type === 'powerOutage' && <FaGasPump size={24} />}
                {type === 'chemicalSpill' && <FaShieldAlt size={24} />}
                {type === 'gasLeak' && <FaShieldVirus size={24} />}
                {type === 'activeShooter' && <FaPhone size={24} />}
                {type === 'medicalEmergency' && <FaPills size={24} />}
                {type === 'lostPerson' && <FaSearch size={24} />}
                {type === 'fireExtinguisher' && <FaFire size={24} />}
                {type === 'pandemic' && <FaVirus size={24} />}
                {type === 'severeWeather' && <FaSnowflake size={24} />}
                {type === 'hazardousMaterial' && <FaShieldVirus size={24} />}
                <span>{emergencyData[type].title}</span>
              </button>
            ))}
          </div>
        </div>
        <div style={{ flex: '2', padding: '20px', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          {selectedEmergency ? (
            <>
              <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#333', marginBottom: '20px' }}>{selectedEmergency.title}</h2>
              <ul style={{ listStyleType: 'none', padding: '0' }}>
                {selectedEmergency.details.map((detail, index) => (
                  <li key={index} style={{
                    padding: '10px',
                    marginBottom: '10px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    fontSize: '16px',
                    color: '#555'
                  }}>
                    {detail}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p style={{ fontSize: '18px', color: '#777' }}>Select an emergency from the list to view details.</p>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default EmergencySteps;

