// client/src/services/authService.ts

import axios from 'axios';


export const login = async (email: string, password: string): Promise<string> => {
  try {
    const response = await axios.post(`http://10.0.2.2:3001/mobile/login`, { email, password });
    if (response.status === 200) {
      if (response.data.error) {
        throw new Error('Kullanıcı Adı veya Şifre Yanlış');
      }
      return response.data.mobile_token;
    } else {
      throw new Error('Giriş başarısız!');
    }
  } catch (error) {
    throw error;
  }
};
