import { useCallback, useEffect } from 'react';
import { useFonts } from 'expo-font';
import  LoginScreenView  from './login/[id]';
import SignupScreen from './signup/[id]';
import Home from './index';
import ControlScreen from './control/[id]';
import { COLORS } from '../constants';
import { Stack } from 'expo-router';

import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

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
        <Stack>
   
            <Stack.Screen name="login/[id]" options={{
                headerTitle:"Login",
                headerStyle:{
                    backgroundColor:COLORS.softpurple,
                }
                
            }}/>
            <Stack.Screen name="index"  options={{
                headerTitle:"Home Page",
                headerStyle:{
                    backgroundColor:COLORS.softpurple,
                }
                

            }} />
            <Stack.Screen name="control/[id]"  options={{
                headerTitle:"Controller",
                headerStyle:{
                    backgroundColor:COLORS.softpurple,
                }
                

            }} />
            <Stack.Screen name="signup/[id]"  options={{
                headerTitle:"Sign Up",
                headerStyle:{
                    backgroundColor:COLORS.softpurple,
                }
                

            }} />
            <Stack.Screen name="main/[user]"  options={{
                headerTitle:"Main",
                headerStyle:{
                    backgroundColor:COLORS.softpurple,
                }
                

            }} />
        </Stack>
    );
};

export default Layout;
