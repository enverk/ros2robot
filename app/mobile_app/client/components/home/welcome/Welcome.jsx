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
import { Link } from 'expo-router';
import { icons } from '../../../constants';
import { useNavigation } from '@react-navigation/native';


const Welcome = () => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState('TurtleBot');
  const [brokerip, setBrokerIP] = useState(''); 
  const navigation = useNavigation();

  const sendIPToServer = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3001/main/broker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ brokerip }), 
      });

      if (response.ok) {
        const result = await response.json();
        console.log('IP Address sent successfully:', result);
        Alert.alert('Success', 'IP Address has been sent successfully!');
            
      } else {
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
        
        <Text style={styles.welcomeMessage}>Please write the IP Address of the robot you want to use</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={brokerip}
            onChangeText={setBrokerIP} 
            placeholder='Please write your tcp IP of your broker'
          />
        </View>
       
      </View>
      
      <TouchableOpacity style={styles.searchBtn} onPress={()=>{sendIPToServer
      router.push('/control/[id]')}
        }>
      
          <Text style={styles.searchBtnText}>Connect</Text>
          
        </TouchableOpacity>
       
    </View>
  );
};

export default Welcome;
