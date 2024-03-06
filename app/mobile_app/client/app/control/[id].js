import React from 'react'
import { View ,Text,SafeAreaView} from 'react-native'
import { COLORS, icons, images, SIZES } from '../../constants';

import {  JoystickComponent } from '../../components'
function ControlScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
    

      <View style={{
                position: 'absolute',
                right: 30,
                bottom: 30,
                alignItems: 'flex-end'
            }}>

                <JoystickComponent/>

          </View>
    
    </SafeAreaView>
  )
}

export default ControlScreen