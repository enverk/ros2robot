import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || '';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`http://localhost:3001/login`, { email, password });
    if (response.status === 200) {
      const token  = response.data.access_token;
      console.log(token)
      localStorage.setItem('access_token', token);
      return token;
    }
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const getToken = () => {
  return localStorage.getItem('access_token');
};

export const logout = () => {
  localStorage.removeItem('access_token');
  
};
