import axios from 'axios';
import { Profile } from '../components/models/Profile';

const BASE_URL = process.env.REACT_APP_API_URL || '';

export const getUserInfo = async (access_token: string): Promise<Profile | null> => {
  try {
    const response = await axios.get(`http://localhost:3001/userinfo`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      throw new Error('User info request failed!');
    }
  } catch (error) {
    throw error;
  }
};