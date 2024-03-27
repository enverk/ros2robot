import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';

const VideoStreamDisplay = ({ id }) => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    
    const ws = new WebSocket('ws://10.0.2.2:3001'); 

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (e) => {
      
      const blob = e.data;
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(blob);
    };

    ws.onerror = (e) => {
      console.log(e.message);
    };

    ws.onclose = (e) => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <View>
      {imageSrc ? <Image source={{ uri: imageSrc }} style={{ width: 300, height: 300 }} /> : null}
    </View>
  );
}

export default VideoStreamDisplay;
