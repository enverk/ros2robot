import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import io from 'socket.io-client';

const VideoStreamDisplay = () => {
  const [imageSrc, setImageSrc] = useState(null); 

  useEffect(() => {
    const socket = io('http://192.168.163.135:3002');

    socket.on('connect', () => {
      console.log('Socket.IO connection established');
    });

    socket.on('video_frame', (data) => {
      setImageSrc(`data:image/jpeg;base64,${data.data}`);
    });

    socket.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      {imageSrc && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageSrc }} style={styles.image}  resizeMode='cover' />
          
        </View>
      )}
      {!imageSrc && <Text>Loading...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    width: 300,
    height: 300,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default VideoStreamDisplay;
