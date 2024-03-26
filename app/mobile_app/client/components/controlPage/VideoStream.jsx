import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import io from 'socket.io-client';

const VideoStreamDisplay = ({ id }) => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    // Sunucunun yerel IP adresi ve portu ile değiştirin
    const socket = io("http://192.168.1.106:3001");
    socket.on('video_frame', (data) => {
      setImageSrc(`data:image/jpeg;base64,${data.data}`); // `data.data` kullanılmalıdır.
    });

    return () => socket.disconnect();
  }, []);

  return (
    <View>
      {imageSrc ? <Image source={{ uri: imageSrc }} style={{ width: 300, height: 300 }} /> : null}
    </View>
  );
}

export default VideoStreamDisplay;