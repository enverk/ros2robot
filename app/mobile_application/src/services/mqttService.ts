// client/src/services/authService.ts

import axios from 'axios';

export const sendBroker = async (brokerip: string): Promise<string> => {
  try {
    const response = await axios.post(`http://10.0.2.2:3001/main/broker`, { brokerip });
    if (response.status === 200) {
      if (response.data.error) {
        throw new Error('Gönderdiğiniz MQTT IP sine bağlanılamadı.');
      }
      return response.data;
    } else {
      throw new Error('Bağlantı hatası!');
    }
  } catch (error) {
    throw error;
  }
};
