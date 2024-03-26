import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for your project
import styles from './login.style';
import { router } from 'expo-router';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = () => {
    return password.length >= 6;
  };

  const handleSignUp = () => {
    router.push('/signup/[id]')
  }

  const handleLogin = () => {
    let isValid = true;

    if (!validateEmail()) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword()) {
      setPasswordError('Password must be at least 6 characters.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      setIsLoading(true); // Show loader

      console.log('Email:', email);
      console.log('Password:', password);
      // Perform login logic here
      fetch('http://10.0.2.2:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('API Response:', data);
          router.push( '/main/[user]')
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <View style={styles.login_container}>
      <View style={styles.header}>
        <Text style={styles.welcomeMessage}>Hoş Geldiniz!</Text>
        <Text style={styles.welcomeMessage}>Lütfen giriş yapın</Text>
      </View>
      <View style={styles.center_container}>
        <View style={styles.form_info}>
          <TextInput
            style={[styles.email_input, emailError && styles.errorInput]}
            placeholder={'Email'}
            placeholderTextColor="#BCBCBC80"
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          <View style={styles.container}>
            <TextInput
              style={[
                styles.password_input,
                passwordError && styles.errorInput,
              ]}
              placeholder={'Password'}
              placeholderTextColor="#BCBCBC80"
              secureTextEntry={!showPassword}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={toggleShowPassword}>
              <Ionicons
                name={showPassword ? 'eye' : 'eye-off'}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}

          <TouchableOpacity
            onPress={handleLogin}
            style={styles.loginScreenButton}
            disabled={isLoading} // Disable button when loading
            underlayColor="#fff">
            {isLoading ? (
              <ActivityIndicator size="small" color="#0222D8" />
            ) : (
              <Text style={styles.loginText}>Login</Text>
            )}
          </TouchableOpacity>
          <View style={styles.signupContainer}>
            <Text style={{color:'white'}}>Don't You Have Account Yet?</Text>
            <TouchableOpacity style={styles.signupBtn} onPress={handleSignUp}>
              <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Login;