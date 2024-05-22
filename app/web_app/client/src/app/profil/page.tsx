'use client';

import { useEffect, useState} from 'react';
import { getUserInfo } from '../services/profileService';
import { getToken } from '../services/authService'; 
import './style.css'; 

interface ProfileData {
  name: string;
  surname: string;
  email: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = getToken(); 
        if (!accessToken) {
          throw new Error('Access token is missing');
        }

        const userInfo = await getUserInfo(accessToken);
        setProfile(userInfo);
      } catch (err) {
        setError('Failed to fetch profile information.');
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <h1>Profil</h1>
      <div className="profile-details">
        {error && <p>{error}</p>}
        {profile ? (
          <>
            <p><strong>Adınız:</strong> {profile.name}</p>
            <p><strong>Soyadınız:</strong> {profile.surname}</p>
            <p><strong>Email:</strong> {profile.email}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;