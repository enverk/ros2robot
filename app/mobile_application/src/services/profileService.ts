import axios from 'axios';
import { getData, storeData } from '../utils/storage';
import NetInfo from '@react-native-community/netinfo';
import { Profile } from '../models/Profile';

const BASE_URL = process.env.REACT_APP_API_URL;

export const getUserInfo = async (mobile_token: string): Promise<Profile | null> => {
  const netInfo = await NetInfo.fetch();
  
  if (netInfo.isConnected && netInfo.isInternetReachable) {
    try {
      const response = await axios.get(`http://10.0.2.2:3001/userinfo`, {
        headers: {
          Authorization: `Bearer ${mobile_token}`,
        },
      });

      if (response.status === 200) {
        await storeData('userInfo', JSON.stringify(response.data));
        console.log(response.data);
        
        return response.data;
      } else {
        throw new Error('User info request failed!');
      }
    } catch (error) {
      throw error; 
    }
  } else {
    
    const cachedData = await getData('userInfo');
    if (cachedData) {
      return JSON.parse(cachedData);
    } else {
      throw new Error('No internet connection and no cached data available!');
    }
  }
};