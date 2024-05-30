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
  Modal,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { sendBroker } from '../services/mqttService';
import Orientation from 'react-native-orientation-locker';
import homestyles from '../components/Home';
import { removeData } from '../utils/storage';
import profilestyles from '../components/Profile';
import ImageClicker from '../components/ImageClicker';  // Haritayı tıklama bileşenini içe aktarın

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
    email: string;
    name: string;
    surname: string;
  };
  const [brokerip, setBrokerIP] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    await removeData('userToken');
    setUserInfo(null); 
    navigation.navigate('Login');
  };

  const connectMqtt = async () => {
    try {
      await sendBroker(brokerip);
      Alert.alert('Bağlantı başarılı! Kontrol sayfasına aktarılıyorsunuz.');
      navigation.navigate('Kontrol');
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Hata', error.message);
      }
    }
  };

  const openMapModal = () => {
    setModalVisible(true);
    Orientation.lockToLandscape(); // Ekranı yatay moda döndür
  };

  const closeMapModal = () => {
    setModalVisible(false);
    Orientation.lockToPortrait(); // Ekranı dikey moda döndür
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <View style={homestyles.container}>
        <Text style={homestyles.welcomeMessage}>
          Bağlanmak istediğiniz robotun ağ adresini giriniz.
        </Text>
        <TextInput
          style={homestyles.inputView}
          placeholder="MQTT Broker IP'nizi girin."
          placeholderTextColor="black"
          onChangeText={setBrokerIP}
          value={brokerip}
        />
        <TouchableOpacity style={homestyles.searchBtn} onPress={connectMqtt}>
          <Text style={homestyles.searchBtnText}>Bağlan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={homestyles.mapButton}
          onPress={openMapModal}
        >
          <Text style={homestyles.mapButtonText}>Haritayı Göster</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeMapModal}
        >
          <View style={homestyles.modalContainer}>
            <View style={homestyles.modalContent}>
              <ImageClicker />
              <TouchableOpacity
                style={homestyles.closeButton}
                onPress={closeMapModal}
              >
                <Text style={homestyles.closeButtonText}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};


export default HomeScreen;
