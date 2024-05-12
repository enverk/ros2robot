import React, { useEffect, useRef } from 'react';
import { ENDPOINT } from './page'; // Ana uygulamadan ENDPOINT sabitini alıyoruz

const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const socket = new WebSocket(ENDPOINT);

    socket.onopen = () => {
      console.log('WebSocket connection established for camera.');
    };

    socket.onmessage = (event) => {
      // Gelen veriyi işle (örneğin, video akışı)
      // Bu örnekte video elementine veriyi doğrudan aktarıyoruz
      const data = event.data;
      if (videoRef.current) {
        videoRef.current.src = URL.createObjectURL(data);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed for camera.');
    };

    // Component unmount olduğunda bağlantıyı kapat
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="form-camera">
        
      <video ref={videoRef} autoPlay />
    </div>
  );
 
};

export default Camera;
