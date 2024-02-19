"use client";

import { useEffect, useRef } from 'react';
import nipplejs from 'nipplejs';


export const ENDPOINT = "http://localhost:5172/api/joystick"; // Go server'ınızın çalıştığı port ve endpoint

function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const manager = nipplejs.create({
        zone: containerRef.current,
        mode: 'static',
        position: { left: '50%', top: '50%' },
        color: 'blue',
        restOpacity: 1,
        
      });

      manager.on('move', (evt, data) => {
        const angleInRadians = data.angle.radian;
        const force = data.force;
        // x ve y koordinatlarını hesapla
        const x = force * Math.cos(angleInRadians);
        const y = force * Math.sin(angleInRadians);

        // Hesaplanan x ve y değerlerini ve diğer bilgileri backend'e gönder
        fetch(ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: "move",
            x: x,
            y: y,
            direction: data.direction.angle,
            force: data.force,
            distance: data.distance,
            angle: data.angle.degree,
          }),
        })
        .then(response => response.json())
        .then(data => console.log('POST success:', data))
        .catch(error => console.error('POST error:', error));
      });

      manager.on('end', () => {
        // Joystick bırakıldığında backend'e bir istek gönder
        fetch(ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: "stop",
            x: null,
            y: null,
            direction: null,
            force: null,
            distance: null,
            angle: null,
          }),
        })
        .then(response => response.json())
        .then(data => console.log('POST success:', data))
        .catch(error => console.error('POST error:', error));

        console.log('Joystick bırakıldı');
      });

      return () => {
        manager.destroy();
      };
    }
  }, []);

  return <div ref={containerRef} style={{ width: 200, height: 200 }} />;
};

export default App;
