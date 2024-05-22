import axios from 'axios';

export const sendJoystickData = async (x:number, y:number) => {
  try {
    console.log(`Sending data: x=${x}, y=${y}`); // Log the data being sent
    const response = await axios.post(`http://localhost:3001/main/joystick`, { x, y });
    if (response.status === 200) {  
      return response.data;
    }
  } catch (error) {
    console.error('Error sending joystick data:');
    throw new Error('Joystick data sent failed');
  }
};
