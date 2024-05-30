import React, {useState,} from 'react';
import './style.css';
import { coordinateService } from '../services/mqttService';

const Navigation = () => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const handleImageClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCoordinates({ x, y });
    
    coordinateService(x,y);
  };

  return (
    <div className='form-navigasyon'>
      <h1>Tıklanan Koordinatlar: X: {coordinates.x}, Y: {coordinates.y}</h1>
      <img 
        src="https://media.licdn.com/dms/image/D5612AQFB46eKvoixTA/article-cover_image-shrink_720_1280/0/1692482415881?e=2147483647&v=beta&t=blSi15UobTXreOgxT8tdL9xjD-7pp7XHWkpld9qGN50" 
        alt="Tıklanabilir resim" 
        onClick={handleImageClick} 
        style={{ cursor: 'pointer', maxWidth: '100%', width: '100%', height: '100%'  }}
      />

       
    </div>
  );
};

export default Navigation;
