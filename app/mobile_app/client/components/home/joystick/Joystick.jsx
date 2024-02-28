import React from 'react';
import { View, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ReactNativeJoystick } from '@korsolutions/react-native-joystick';
import styles from './joystick.style';

// x ve y değerlerini ölçeklendirme fonksiyonu
function scaleValue(oldValue, oldMin, oldMax, newMin, newMax) {
  return ((oldValue - oldMin) * (newMax - newMin) / (oldMax - oldMin)) + newMin;
}

const JoystickComponent = () => {
  const handleMove = (event) => {
    // Orjinal x ve y değerlerini ölçeklendir
    const x = scaleValue(event.position.x, -50, 250, -1, 1);
    const y = scaleValue(event.position.y, -50, 250, -1, 1);

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
  }

  const handleStop = () => {
    console.log('Joystick stopped');
    // Joystick durduğunda x ve y değerleri zaten 0
    const x = 0;
    const y = 0;

    // Bu durumda ölçeklendirme gerekmiyor, doğrudan x ve y değerlerini kullan
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

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text>Joystick Example</Text>
      <ReactNativeJoystick
        onMove={handleMove}
        onStop={handleStop}
        autoCenter={true}
      />
    </GestureHandlerRootView>
  );
};

export default JoystickComponent;
