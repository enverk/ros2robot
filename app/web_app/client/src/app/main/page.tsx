"use client";

import { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import nipplejs from 'nipplejs';
import './style.css';
import Camera from './camera'; 
import Navigation from './navigasyon';
import { Dropdown } from "flowbite-react";
import Navbar from '../components/navigation/navbar';
import VideoStreamDisplay from './video_capture';
import WebSocketImageDisplay from './camera';

export const ENDPOINT = "http://localhost:3001/main/joystick"; // Go server'ınızın çalıştığı port ve

function App() {
  const containerRef = useRef(null);
  const { register, handleSubmit } = useForm();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false); // State for connection status

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
        const x = force * Math.cos(angleInRadians);
        const y = force * Math.sin(angleInRadians);

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
    fetch("http://localhost:3001/main/broker", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {});

      console.log(data);
      setIsConnected(true); 
    //istek 200 dönerse setisconnected true
  };

  const handleDisconnect = () => {
    setIsConnected(false); // Set connected state to false
  };

  
  return (
    
    <div>
      <Navbar />
      
      <br />
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="form-right-aligned">
          <label htmlFor="ip-address-input">IP Address:</label>
          <input type="text" {...register("brokerip")}
            placeholder="Enter the broker ip."
            className="inputBox" />
          <br />
          <button type="submit" className="inputButton" disabled={isConnected}>Send IP Address</button>
          <button type="button" className="inputButton" onClick={handleDisconnect} disabled={!isConnected}>Disconnect</button>
        </form>
      </div>
      
      <div className="form-container3">
        <WebSocketImageDisplay />
        <div ref={containerRef} className='joystick' />
        <Navigation />
      </div>
    </div>
  );
}

export default App;
