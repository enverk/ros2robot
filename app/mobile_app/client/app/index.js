import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { useState,useEffect} from 'react'
import { Stack, useRouter } from 'expo-router';
import { COLORS, icons, images, SIZES } from '../constants';
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome, JoystickComponent } from '../components'
import styles from '../components/home/welcome/welcome.style';
import * as SecureStore from 'expo-secure-store';

const Home = () => {
    const [userToken, setUserToken] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const router = useRouter();


    useEffect(() => {
        const fetchUserDetails = async () => {
            const token = await SecureStore.getItemAsync('secure_token');
            if (!token) {
                console.log('Token bulunamadı, kullanıcı girişi yapmalı.');
                return;
            }
    
            try {
                // API adresinizi ve endpoint'inizi buraya ekleyin
                const response = await axios.get('http://10.0.2.2:3001/main/user/details', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const userDetails = response.data;
                
                setUserDetails(userDetails);
                // Router ile dinamik yönlendirme yapabilirsiniz, örneğin:
                router.push(`/main/${userDetails.userId}`);
            } catch (error) {
                console.error('Kullanıcı detayları çekilirken bir hata oluştu:', error);
            }
        };
    
        fetchUserDetails();
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.darkblue }}>
            <View
                style={
                    {
                        flex: 1,
                        padding: SIZES.large
                    }
                }>
                <Text style={styles.welcomeMessage}>Welcome! Please log in or sign up.</Text>
                <View style={{
                    flex: 1,
                    marginTop: -30,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    padding: SIZES.small,
                    justifyContent: 'center',
                    alignContent: 'space-between',
                    flexDirection: 'row',
                }}>

                    <TouchableOpacity style={styles.loginBtn}
                        onPress={() => router.push('/login/[id]')}
                    >
                        <Text style={styles.tabText}>Log in</Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 1,
                    padding: SIZES.small,
                    justifyContent: 'center',
                    alignContent: 'space-between',
                    flexDirection: 'row',
                }}>
                    <TouchableOpacity style={styles.loginBtn}
                        onPress={() => router.push('/signup/[id]')}
                    >
                        <Text style={styles.tabText}>Sign up</Text>
                    </TouchableOpacity>

                </View>
            </View>


        </SafeAreaView>
    )
}


export default Home;