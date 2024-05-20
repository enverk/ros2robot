// client/src/services/authService.ts

import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const signup = async (email: string, name:string, surname:string, password: string): Promise<string> => {
  try {
    const response = await axios.post(`http://10.0.2.2:3001/signup`, { email, name, surname, password });
    if (response.status === 200) {
      if (response.data.error) {
        throw new Error('Kullanıcı olusturulurken hata olustu!');
      }
      return response.data;
    } else {
      throw new Error('Kayit başarısız! Lutfen bilgilerinizi tekrar kontrol edin!');
    }
  } catch (error) {
    throw error;
  }
};
