import React from 'react'
import { View } from 'react-native';
import JoystickHandler from '../components/Joystick'
import VideoStreamDisplay from '../components/VideoPlayer'
import styles from '../components/Home';

const ControlScreen = () => {
  return (
    <View style={styles.container}>  
      <VideoStreamDisplay />
      <JoystickHandler />
    </View>
  )
}

export default ControlScreen
