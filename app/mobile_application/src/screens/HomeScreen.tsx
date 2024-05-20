import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { sendBroker } from '../services/mqttService';
import homestyles from '../components/Home'
import { removeData } from '../utils/storage';
import profilestyles from '../components/Profile';

type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Kontrol: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Main',
  'Kontrol'

>;
const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  type UserInfo = {
    email:string;
    name: string;
    surname:string;
    
  };
  const [brokerip, setBrokerIP] = useState('');
  
  const handleLogout = async () => {
    await removeData('userToken');
    setUserInfo(null); // userInfo state'ini sıfırlıyoruz
    navigation.navigate('Login');
  };
  const connectMqtt = async () =>{
    try {
      await sendBroker(brokerip);
      Alert.alert('Bağlantı başarılı! Kontrol sayfasına aktarılıyorsunuz.')
      navigation.navigate('Kontrol')
    }
    catch (error) {
      if (error instanceof Error) {
        Alert.alert('Hata', error.message);
      }

    }
  }
    return (
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={homestyles.container}>
        <Text style={homestyles.welcomeMessage}>Bağlanmak istediğiniz robotun ağ adresini giriniz.</Text>
        <TextInput style={homestyles.inputView}
          placeholder="MQTT Broker IP'nizi girin."
          placeholderTextColor="black"
          onChangeText={setBrokerIP}
          value={brokerip}
        />
        <TouchableOpacity style={homestyles.searchBtn} onPress={connectMqtt}>
          <Text style={homestyles.searchBtnText}>Bağlan</Text>
        </TouchableOpacity>      

        <View style={profilestyles.buttonContainer}>
            <TouchableOpacity
              onPress={handleLogout}
              style={profilestyles.button}>
              <Text style={profilestyles.buttonText}>Çıkış Yap</Text>
            </TouchableOpacity>
          </View>
      </View>
      </KeyboardAvoidingView>

    )
  }


  export default HomeScreen