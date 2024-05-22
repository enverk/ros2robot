"use client";
import { useEffect, useRef, } from 'react';
import nipplejs from 'nipplejs';
import './style.css';
import { sendJoystickData } from '../services/joystickService';


export const ENDPOINT = "http://localhost:3001/main/joystick"; // Go server'ınızın çalıştığı port ve

function Joystick() {
  const containerRef = useRef(null);


  useEffect(() => {
    if (containerRef.current) {
      const manager = nipplejs.create({
        zone: containerRef.current,
        mode: 'static',
        position: { left: '50%', top: '50%' },
        size: 175,
        restOpacity: 1,
      });
  
      manager.on('move', (evt, data) => {
        const angleInRadians = data.angle.radian;
        const force = data.force;
        let x = force * Math.cos(angleInRadians);
        let y = force * Math.sin(angleInRadians);

        const maxXY = Math.max(Math.abs(x), Math.abs(y));
        if (maxXY > 1) {
          x /= maxXY;
          y /= maxXY;
        }
  
        sendJoystickData(x.toString(), y.toString());
      });
  
      manager.on('end', () => {
        sendJoystickData('0', '0');
      });
  
      return () => {
        manager.destroy();
      };
    }
  }, []);

  
  return (   
        <div ref={containerRef} className='joystick' />
  );
}


export default Joystick;
