import { useCallback, useEffect } from 'react';
import { useFonts } from 'expo-font';
import {createStackNavigator} from '@react-navigation/stack'
import  LoginScreenView  from './login/[id]';
import SignupScreen from './signup/[id]';
import Home from './index';
import ControlScreen from './control/[id]';

import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

const Layout = () => {
    const [fontsLoaded] = useFonts({
        DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
        DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
        DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    useEffect(() => {
        onLayoutRootView();
    }, [onLayoutRootView]);

    if (!fontsLoaded) return null; 

    return (
        <Stack.Navigator
        initialRouteName='LoginScreenView' ///the name of the initial screen
        screenOptions={{
          headerShown: false,
        }}>
   
            <Stack.Screen name="LoginScreenView" component={LoginScreenView}/>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="ControlScreen" component={ControlScreen}/>
            <Stack.Screen name="SignupScreen" component={SignupScreen}/>
         </Stack.Navigator>
    );
};

export default Layout;
