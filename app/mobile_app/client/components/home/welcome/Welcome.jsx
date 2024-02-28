import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import styles from './welcome.style';

import { icons } from '../../../constants';

const robotTypes = ['TurtleBot', 'IHA', 'SIHA'];

const Welcome = () => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState('TurtleBot');
  const [brokerip, setBrokerIP] = useState(''); // IP adresini tutmak için state

  // IP adresini sunucuya gönderme işlevi
  const sendIPToServer = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3001/main/broker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ brokerip }), // IP adresini JSON olarak gövdeye ekleyin
      });

      if (response.ok) {
        const result = await response.json();
        console.log('IP Address sent successfully:', result);
        Alert.alert('Success', 'IP Address has been sent successfully!');
      } else {
        // Sunucu tarafından dönen hata mesajını göster
        const error = await response.text();
        throw new Error(error);
      }
    } catch (error) {
      console.error('Error sending IP Address:', error);
      Alert.alert('Error', 'There was an error sending the IP Address.');
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Selcuk</Text>
        <Text style={styles.welcomeMessage}>Be careful while you controlling the robot!</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={brokerip}
            onChangeText={setBrokerIP} // TextInput değerini güncellemek için
            placeholder='Please write your tcp IP of your broker'
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={sendIPToServer}>
          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;
