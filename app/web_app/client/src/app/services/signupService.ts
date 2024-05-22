import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || '';

export const signup = async (email: string,name: string,surname: string, password: string) => {
  try {
    const response = await axios.post(`http://localhost:3001/signup`, { email, name, surname, password });
    if (response.status === 200) {  
      return
    }
  } catch (error) {
    throw new Error('Sign up failed');
  }
};


