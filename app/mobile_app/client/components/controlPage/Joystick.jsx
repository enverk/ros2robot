import React from 'react';
import { View, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ReactNativeJoystick } from '@korsolutions/react-native-joystick';
import styles from './joystick.style';

function scaleValue(oldValue, oldMin, oldMax, newMin, newMax) {
  return ((oldValue - oldMin) * (newMax - newMin) / (oldMax - oldMin)) + newMin;
}

const sendJoystickData = (x, y) => {
  fetch('http://10.0.2.2:3001/main/joystick', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ x, y }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      return response.json();
    }
  })
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
};

const JoystickComponent = () => {

  const handleMove = (event) => {
    // Orjinal x ve y değerlerini ölçeklendir
     const x = scaleValue(event.position.x, -25, 125, -1, 1);
     const y = scaleValue(event.position.y, -25, 125, -1, 1);
  
    sendJoystickData(x, y);
  }

  const handleStop = () => {
    console.log('Joystick stopped');
    sendJoystickData(0, 0);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ReactNativeJoystick
      radius={75}
        onMove={handleMove}
        onStop={handleStop}
        autoCenter={true}
      />
    </GestureHandlerRootView>
  );
};

export default JoystickComponent;
