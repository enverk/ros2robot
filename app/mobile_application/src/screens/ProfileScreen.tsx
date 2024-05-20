import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {removeData, getData} from '../utils/storage';
import {getUserInfo} from '../services/profileService';
import profilestyles from '../components/Profile';
import {useIsFocused} from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  Main: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Main',
  'Login'
>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const isFocused = useIsFocused();
  type UserInfo = {
    email:string;
    name: string;
    surname:string;
    
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const access_token = await getData('userToken');
      if (access_token) {
        const result = await getUserInfo(access_token);
        setUserInfo(result);
      }
      const cachedData = await getData('userInfo');
      const parsedCachedData = JSON.parse(cachedData);
      return parsedCachedData;
    };

    if (isFocused) {
      fetchUserInfo();
    }
  }, [isFocused]);

  const handleLogout = async () => {
    await removeData('userToken');
    setUserInfo(null); // userInfo state'ini sıfırlıyoruz
    navigation.navigate('Login');
  };
  const firstLetter = userInfo?.name ? userInfo.name.charAt(0) : '';
  return (
    <View style={profilestyles.container}>
      {userInfo ? (
        <>
          <View style={profilestyles.profileIconContainer}>
            <TouchableOpacity style={profilestyles.profileIcon}>
              <Text style={profilestyles.profileIconText}>{firstLetter}</Text>
            </TouchableOpacity>
          </View>
          <View style={profilestyles.infoContainer}>
            <Text style={profilestyles.label}>Email:</Text>
            <Text style={profilestyles.value}>{userInfo?.email}</Text>
          </View>
          <View style={profilestyles.infoContainer}>
            <Text style={profilestyles.label}>İsim:</Text>
            <Text style={profilestyles.value}>{userInfo?.name}</Text>
          </View>
          <View style={profilestyles.infoContainer}>
            <Text style={profilestyles.label}>Soy İsim:</Text>
            <Text style={profilestyles.value}>{userInfo?.surname}</Text>
          </View>
         
          
          <View style={profilestyles.buttonContainer}>
            <TouchableOpacity
              onPress={handleLogout}
              style={profilestyles.button}>
              <Text style={profilestyles.buttonText}>Çıkış Yap</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={profilestyles.loadingText}>Loading...</Text>
      )}
    </View>
  );
};

export default ProfileScreen;
