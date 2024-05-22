import axios from 'axios';


export const sendJoystickData = async (x: string,y: string) => {
  try {
    const response = await axios.post(`http://localhost:3001/main/joystick`, { x, y });
    if (response.status === 200) {  
      return response.data;
    }
  } catch (error) {
    throw new Error('Joystick data sent failed');
  }
};


