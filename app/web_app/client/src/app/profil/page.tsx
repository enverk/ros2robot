import { useEffect, useState } from 'react';

import axios from 'axios';
import './style.css'; // Include your CSS file for styling

const Profile = () => {
  
  return (
    <div className="profile-container">
      <h1>Profil</h1>
      <div className="profile-details">
        <p><strong>Name:</strong> </p>
        <p><strong>Email:</strong> </p>
        
        
      </div>
    </div>
  );
};

export default Profile;
