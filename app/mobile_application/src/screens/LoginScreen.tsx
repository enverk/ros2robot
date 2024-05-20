import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {login} from '../services/authService';
import {storeData, getData} from '../utils/storage';
import loginstyles from '../components/Login';
import HomeScreen from './HomeScreen';
import VideoPlayer from '../components/VideoPlayer';

type RootStackParamList = {
  Login: undefined;
  // HomeScreen: undefined;
  Signup:undefined
  Main:undefined
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();

  useEffect(() => {
    const retrieveData = async () => {
      const storedEmail = await getData('userEmail');
      const storedPassword = await getData('userPassword');
      if (storedEmail) setEmail(storedEmail);
      if (storedPassword) setPassword(storedPassword);
    };
    retrieveData();
  }, []);

  const handleLogin = async () => {
    try {
      const token = await login(email, password);
      await storeData('userToken', token);
      await storeData('userEmail', email);
      await storeData('userPassword', password);
      Alert.alert('Login başarılı')
      
     navigation.navigate('Main');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Hata', error.message);
      }
    }
  };
  const handleSignup = async()=> {
    navigation.navigate('Signup')
  }
  return (
    <View style={loginstyles.container}>
      <Text style={loginstyles.welcomeMessage}> Hoş Geldiniz Lütfen Giriş Yapın! </Text>
      <View style={loginstyles.inputView}>
        <TextInput
          style={loginstyles.inputText}
          placeholder="E-mail"
          placeholderTextColor="black"
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <View style={loginstyles.inputView}>
        <TextInput
          style={loginstyles.inputText}
          placeholder="Parola"
          placeholderTextColor="black"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
      </View>
      <Text style={{color:'white'}}>Henüz bir hesabınız yok mu?</Text>
            <TouchableOpacity style={loginstyles.signupBtn} onPress={handleSignup}>
              <Text style={loginstyles.signupText}>Kayıt Ol</Text>
            </TouchableOpacity>
      
      <TouchableOpacity style={loginstyles.loginBtn} onPress={handleLogin}>
        <Text style={loginstyles.loginText}>Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
