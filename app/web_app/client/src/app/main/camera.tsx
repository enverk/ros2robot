import React, { useEffect, useRef } from 'react';
import io from 'socket.io-client'; // socket.io-client'ı import ediyoruz

const Camera = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // socket.io-client ile belirtilen adrese bağlanıyoruz
    const socket = io('http://192.168.1.112:3002');

    socket.on('connect', () => {
      console.log('Socket.IO connection established for camera.');
    });

    socket.on('video_frame', (data) => {
      // Gelen video frame verisini işle
      if (videoRef.current) {
        const blob = new Blob([data], { type: 'video/mp4' }); // data'nın tipine bağlı olarak MIME tipi ayarlanmalı
        videoRef.current.src = URL.createObjectURL(blob);
      }
    });

    socket.on('disconnect', () => {
      console.log('Socket.IO connection closed for camera.');
    });

    // Component unmount olduğunda bağlantıyı kapat
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="form-camera">
      <video ref={videoRef} autoPlay />
    </div>
  );
};

export default Camera;