import React from 'react'
import { View,Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Login } from '../../components'
import { COLORS, icons, images, SIZES } from '../../constants';

function LoginScreenView() {
  return (
   <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
    <Login/>
   </SafeAreaView>
  )
}

export default LoginScreenView