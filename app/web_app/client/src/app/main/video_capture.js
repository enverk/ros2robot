import React, { useEffect, useState } from 'react';

const VideoStreamDisplay = () => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const fetchVideoFrame = async () => {
      try {
        const response = await fetch("http://192.168.1.106:3002");
        reader.onload = () => {
          setImageSrc(reader.result);
        };
        reader.readAsDataURL(data);
      } catch (error) {
        console.error('Error fetching video frame:', error);
      }
    };

    fetchVideoFrame();

    return () => {}; // Burada herhangi bir temizleyici fonksiyon yok çünkü fetch işlemi bir kere yapılıyor ve devamlı çalışan bir soket bağlantısı kapatılmıyor.
  }, []);

  return (
    <div>
      {imageSrc ? <img src={imageSrc} alt="Video Frame" style={{ width: 300, height: 300 }} /> : null}
    </div>
  );
}

export default VideoStreamDisplay;