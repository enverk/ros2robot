"use client";

import { useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";

import nipplejs from 'nipplejs';
import './style.css'

export const ENDPOINT = "http://localhost:3001/web/main/joystick"; // Go server'ınızın çalıştığı port ve endpoint

function App() {
  const containerRef = useRef(null);
  const { register, handleSubmit } = useForm();


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
  const onSubmit = (data: any) => {
    fetch("http://localhost:3001/web/main/broker", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {});

      console.log(data);

  };

  return (
    <div className="form-container">
      <form  onSubmit={handleSubmit(onSubmit)} className="form-right-aligned">
        
        <label htmlFor="ip-address-input">IP Address:</label>
        <input type="text" {...register("brokerip")}
            placeholder="Enter the broker ip."
            className="inputBox" />    
        
        <br />
        <button type="submit" className="inputButton">Send IP Address</button>
        <div ref={containerRef} className='joystick' />
      </form>
      
    </div>
  );
};

export default App;
