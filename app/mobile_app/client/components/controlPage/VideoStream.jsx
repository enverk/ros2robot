import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const VideoStreamDisplay = () => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://10.0.2.2:3002');

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (e) => {
      // Burada gelen veri direkt olarak base64 formatında bir JPEG görüntüsüdür.
      setImageSrc(`data:image/jpeg;base64,${e.data}`);
    };

    ws.onerror = (e) => {
      console.error('WebSocket error:', e.message);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <View style={styles.container}>
      {imageSrc ? (
        <Image source={{ uri: imageSrc }} style={styles.image} />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default VideoStreamDisplay;
