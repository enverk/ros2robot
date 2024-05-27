import axios from 'axios';

export const mqttService = async (brokerip: string) => {
  try {
    const response = await axios.post('http://localhost:3001/main/broker', { brokerip });
    if (response.status === 200) {
      return response.data; 
    }
  } catch (error) {
    throw new Error('MQTT servisine bağlantı sağlanamadı.');
  }
};