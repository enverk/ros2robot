import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert,
    Image,
    ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { signup } from '../services/registerService'
import { storeData, getData } from '../utils/storage';
import loginstyles from '../components/Login';


type RootStackParamList = {
    Login: undefined;
    // HomeScreen: undefined;
    Signup: undefined
};

type SignupScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Login',
    'Signup'
>;

const SignupScreen = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [password, setPassword] = useState('');
    const navigation = useNavigation<SignupScreenNavigationProp>();

    useEffect(() => {
        const retrieveData = async () => {
            const storedEmail = await getData('userEmail');
            const storedPassword = await getData('userPassword');
            if (storedEmail) setEmail(storedEmail);
            if (storedPassword) setPassword(storedPassword);
        };
        retrieveData();
    }, []);

    const handleSignup = async () => {
        try {
            const token = await signup(email, name, surname, password);
            await storeData('userToken', token);
            await storeData('userEmail', email);
            await storeData('userPassword', password);
            Alert.alert('Kayit başarılı')

            navigation.navigate('Login');
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Hata', error.message);
            }
        }
    };
    const handleLogin = async () => {
        navigation.navigate('Login')
    }
    return (
        <KeyboardAvoidingView
            style={loginstyles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems:'center'}}>
                <Text style={loginstyles.welcomeMessage}> Kayıt Olun</Text>
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
                        placeholder="Adınız"
                        placeholderTextColor="black"
                        onChangeText={setName}
                        value={name}
                    />
                </View>
                <View style={loginstyles.inputView}>
                    <TextInput
                        style={loginstyles.inputText}
                        placeholder="Soy Adınız"
                        placeholderTextColor="black"
                        onChangeText={setSurname}
                        value={surname}
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
                <Text style={{ color: 'white' }}>Hesabın var mı?</Text>
                <TouchableOpacity style={loginstyles.signupBtn} onPress={handleLogin}>
                    <Text style={loginstyles.signupText}>Giriş Yap</Text>
                </TouchableOpacity>
                <TouchableOpacity style={loginstyles.loginBtn} onPress={handleSignup}>
                    <Text style={loginstyles.loginText}>Kayıt Ol</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default SignupScreen;
