import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useIsFocused } from '@react-navigation/native';
import { getData} from '../utils/storage';
import {getUserInfo} from '../services/profileService';


const QrScreen = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const isFocused = useIsFocused();

  type UserInfo = {
    email: string;
    name: string;
    surname: string;
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const access_token = await getData('userToken');
      if (access_token) {
        const result = await getUserInfo(access_token);
        setUserInfo(result);
      }
      const cachedData = await getData('userInfo');
      if (cachedData) {
        const parsedCachedData = JSON.parse(cachedData);
        setUserInfo(parsedCachedData);
      }
    };

    if (isFocused) {
      fetchUserInfo();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {userInfo ? (
        <View style={styles.qrContainer}>
          <Text style={styles.text}>
            {userInfo.name} {userInfo.surname}
          </Text>
          <QRCode
            value={`${userInfo.name} ${userInfo.surname}`}
            size={300}
          />
        </View>
      ) : (
        <Text style={styles.text}>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default QrScreen;