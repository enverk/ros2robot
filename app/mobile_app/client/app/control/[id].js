import React from 'react'
import { View, Text, SafeAreaView ,StyleSheet, Button} from 'react-native'
import { COLORS, icons, images, SIZES } from '../../constants';
import { JoystickComponent } from '../../components'
import { Video, ResizeMode } from 'expo-av';
import VideoStreamDisplay from '../../components/controlPage/VideoStream';

function ControlScreen() {

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
    <View style={styles.container}>
    <VideoStreamDisplay />
  </View>
      <View style={{
        position: 'absolute',
        right: 30,
        bottom: 30,
        alignItems: 'flex-end'
      }}>
<View style={styles.container}>
      </View>
      
        <JoystickComponent />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
 
});

export default ControlScreen