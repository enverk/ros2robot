import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import io from 'socket.io-client';
import { COLORS } from '../constants/theme';

const VideoStreamDisplay = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [socket, setSocket] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false); // Yayın durumunu takip etmek için

  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  const handleStart = () => {
    const newSocket = io('http://192.168.43.225:3002');
    setSocket(newSocket);
    setIsStreaming(true); // Yayını başlat

    newSocket.on('connect', () => {
      console.log('Socket.IO connection established');
    });

    newSocket.on('video_frame', (data) => {
      setImageSrc(`data:image/jpeg;base64,${data.data}`);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error);
    });
  };

  const handleStop = () => {
    if (socket) {
      socket.disconnect();
      setIsStreaming(false); // Yayını durdur
    }
  };

  return (
    <View style={styles.container}>
      
      {imageSrc && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageSrc }} style={styles.image} resizeMode='cover' />
        </View>
      )}
      {!imageSrc && <Text></Text>}
      <View style={styles.buttons}>
        {!isStreaming && (
          <TouchableOpacity style={styles.startStopBtn} onPress={handleStart}>
            <Text style={styles.buttonText}>Başla</Text>
          </TouchableOpacity>
        )}
        {isStreaming && (
          <TouchableOpacity style={styles.startStopBtn} onPress={handleStop}>
            <Text style={styles.buttonText}>Durdur</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  imageContainer: {
    position: 'relative',
    width: 300,
    height: 300,
    marginTop: 10,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  startStopBtn: {
    width: 100,
    backgroundColor: COLORS.softpurple,
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10, // Butonlar arasında boşluk eklemek
  },
  buttonText: {
    textAlign: 'center',
    color: COLORS.lightWhite,
    fontSize: 17,
  },
});

export default VideoStreamDisplay;
