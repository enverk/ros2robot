import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { coordinateService } from '../services/mqttService';  

const ImageClicker = () => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const handleImageClick = (event) => {
    const { locationX, locationY } = event.nativeEvent;
    setCoordinates({ x: locationX, y: locationY });
    
    coordinateService(locationX, locationY);
  };

  return (
    <View style={styles.container}>
      <Text>Tıklanan Koordinatlar: X: {coordinates.x}, Y: {coordinates.y}</Text>
      <TouchableOpacity onPress={handleImageClick} activeOpacity={1}>
        <Image 
          source={{ uri: 'https://media.licdn.com/dms/image/D5612AQFB46eKvoixTA/article-cover_image-shrink_720_1280/0/1692482415881?e=2147483647&v=beta&t=blSi15UobTXreOgxT8tdL9xjD-7pp7XHWkpld9qGN50' }}
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 450,
    height: 300,
    resizeMode: 'contain',
  },
});

export default ImageClicker;