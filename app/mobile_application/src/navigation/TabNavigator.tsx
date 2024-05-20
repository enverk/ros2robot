import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import ControlScreen from '../screens/ControlScreen';
// import InfoScreen from '../screens/InfoScreen'
import ProfileScreen from '../screens/ProfileScreen'
import QrScreen from '../screens/QrScreen';
import { getData } from '../utils/storage';

import homeIcon from '../assets/icons/home.png';
import profileIcon from '../assets/icons/profile.png';
import filterIcon from '../assets/icons/filter.png'
import qrIcon from '../assets/icons/qr-code.png'
import RobotIcon from '../assets/icons/robot.png'
import { COLORS,FONT,SIZES } from '../constants/theme';
import RobotsScreen from '../screens/Robots';

type TabParamList = {
  Anasayfa: undefined;
  Robot: undefined;
  Profilim: undefined;
  Kontrol:undefined;
  QRCode:undefined;
  Login:undefined;
  Robotlar:undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  const [userToken, setUserToken] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let token;
      try {
        token = await getData('userToken');
      } catch (e) {
        // Restoring token failed
      }
      setUserToken(token);
      setLoading(false);
    };
    bootstrapAsync();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Tab.Navigator initialRouteName={userToken ? 'Anasayfa' : 'Login'} screenOptions={{  headerStyle: {
      backgroundColor: COLORS.darkblue, 
    },
    headerTintColor: COLORS.lightWhite, 
    headerTitleStyle: {
      fontWeight: 'bold',
    },tabBarStyle:{height: 60, backgroundColor:COLORS.darkblue}, tabBarLabelStyle:{fontSize: 16, fontWeight: 'bold', backgroundColor:COLORS.darkblue},}}>
      
      <Tab.Screen 
        name="QRCode" 
        component={QrScreen} 
        options={{
          tabBarIcon: ({focused, color}) => <Image source={qrIcon} style={{width: 30, height: 30, tintColor: color}} />
        }}
      /> 
      <Tab.Screen 
        name="Robotlar" 
        component={RobotsScreen} 
        options={{
          headerShown:false,
          tabBarIcon: ({focused, color}) => <Image source={RobotIcon} style={{width: 30, height: 30, tintColor: color}}  />
        }}
        
      /> 

      <Tab.Screen 
        name="Anasayfa" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({focused, color}) => <Image source={homeIcon} style={{width: 30, height: 30, tintColor: color}} />
        }}
      />
      
      <Tab.Screen 
        name="Kontrol" 
        component={ControlScreen} 
        options={{
          tabBarIcon: ({focused, color}) => <Image source={filterIcon} style={{width: 30, height: 30, tintColor: color}} />
        }}
      />
      
       <Tab.Screen 
        name="Profilim" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({focused, color}) => <Image source={profileIcon} style={{width: 30, height: 30, tintColor: color}} />
        }}
      /> 
       
    </Tab.Navigator>
  );
}

export default TabNavigator;