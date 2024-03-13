import React from 'react'
import { View,Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Signup } from '../../components'
import { COLORS, icons, images, SIZES } from '../../constants';

function SignupScreen() {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:COLORS.lightWhite}}>
        <Signup/>
    </SafeAreaView>
  )
}

export default SignupScreen