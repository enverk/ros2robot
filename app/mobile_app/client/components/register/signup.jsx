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
import styles from './signup.style';
import { router } from 'expo-router';


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
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
  const checkSamePassword =()=>{
    return password!=repeatPassword;
  }

  const handleSignUp = () => {
    router.push('/signup/[id]')
  }

  const handleSignup = () => {
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
    } else if(checkSamePassword()){
        setPasswordError('Your password must be match.')
        isValid = false;
    }else{
        setPasswordError('')
    }
    
    

    if (isValid) {
      setIsLoading(true); // Show loader

      console.log('Email:', email);
      console.log('Password:', password);
      // Perform Signup logic here
      fetch('http://10.0.2.2:3001/signup', {
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
          // Handle API response
          console.log('API Response:', data);
          router.push('/login/[id]')
          // setIsLoading(false); // Hide loader
        })
        .catch((error) => {
          console.error('Error:', error);
          // setIsLoading(false); // Hide loader
        });
    }
  };

  return (
    <View style={styles.signup_container}>
      <View style={styles.header}>
        <Text style={styles.welcomeMessage}>Kayıt Olun</Text>
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
          <View style={styles.container}>
            <TextInput
              style={[
                styles.password_input,
                repeatPassword && styles.errorInput,
              ]}
              placeholder={'Repeat Password'}
              placeholderTextColor="#BCBCBC80"
              secureTextEntry={!showPassword}
              onChangeText={(text) => setRepeatPassword(text)}
              value={repeatPassword}
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
            onPress={handleSignup}
            style={styles.signupScreenButton}
            disabled={isLoading} // Disable button when loading
            underlayColor="#fff">
            {isLoading ? (
              <ActivityIndicator size="small" color="#0222D8" />
            ) : (
              <Text style={styles.signupText}>Signup</Text>
            )}
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <Text style={{color:'white'}}>You Already Have an Account?</Text>
            <TouchableOpacity style={styles.loginBtn} onPress={handleSignUp}>
              <Text style={styles.loginText}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Signup;