import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import { getData } from '../utils/storage';
import VideoPlayer from '../components/VideoPlayer';
import SignupScreen from '../screens/SingupScreen';
import TabNavigator from './TabNavigator';
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Main:undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | undefined>(undefined);

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
    <Stack.Navigator initialRouteName={userToken ? 'Main' : 'Login'}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
