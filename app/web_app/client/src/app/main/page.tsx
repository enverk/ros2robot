"use client";

import { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import './style.css';
import Navigation from './navigasyon';
import Navbar from '../components/navigation/navbar';
import WebSocketImageDisplay from './camera';
import { mqttService } from '../services/mqttService';
import  Joystick  from './joystick';


function App() {
  const { register, handleSubmit } = useForm();
  const [isConnected, setIsConnected] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      console.log(data.brokerip)
      await mqttService(data.brokerip);
      
      setIsConnected(true);
      console.log('MQTT servisine bağlantı başarılı bir şekilde sağlandı.');
    } catch (error) {
      setIsConnected(false);
      console.error('MQTT servisine bağlanırken bir hata oluştu:', error);
    }
  };
  const handleDisconnect = () => {
    setIsConnected(false); 
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
        <Joystick/>
        <Navigation />
      </div>
    </div>
  );
}

export default App;
