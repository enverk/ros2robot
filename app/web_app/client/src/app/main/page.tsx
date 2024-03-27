"use client";

import { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";

import nipplejs from 'nipplejs';
import './style.css';
import Camera from './camera'; 
import Navigation from './navigasyon'; 

export const ENDPOINT = "http://localhost:3001/main/joystick"; // Go server'ınızın çalıştığı port ve

function App() {
  const containerRef = useRef(null);
  const { register, handleSubmit } = useForm();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (containerRef.current) {
      const manager = nipplejs.create({
        zone: containerRef.current,
        mode: 'static',
        position: { left: '50%', top: '50%' },
        
        restOpacity: 1,

      });

      manager.on('move', (evt, data) => {
        // ...
      });

      manager.on('end', () => {
        // ...
      });

      return () => {
        manager.destroy();
      };
    }
  }, []);

  const onSubmit = (data: any) => {
    // ...
  };

  return (
    <div>
      <div className="form-container1">
        <button className="inputButton" onClick={toggleDropdown}>
          Options
        </button>
        <br />
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <ul>
              <li><a href="default.asp">turtlebot
              <img src="https://assets-global.website-files.com/5f2b1efb0f881760ffdc5c96/62fcf07bbc1f7b5da918d2d4_P8rzh6b3jjUu4D7ty5FlnNpvIp4s3ybP50v2EuYKWOdikbn58RMZLqsM62lsNL4rzy7ST_PsqSFoajQb2F0EfjY6FDkmzqxqsoKTgH-swK_yZ8xxwO34WJovOpeLw-vpkRIlI3mulKY-7dpqAneGVwE.png" alt="" /></a></li>
              <li><a href="news.asp">News</a></li>
              <li><a href="contact.asp">Contact</a></li>
              <li><a href="about.asp">About</a></li>
            </ul>
          </div>
        )}
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="form-right-aligned">

          <label htmlFor="ip-address-input">IP Address:</label>
          <input type="text" {...register("brokerip")}
            placeholder="Enter the broker ip."
            className="inputBox" />

          <br />
          <button type="submit" className="inputButton">Send IP Address</button>

        </form>
        
      </div>


      
      <Camera />

      <div className="form-container3">
        <div ref={containerRef} className='joystick' />
      </div>

      
      <Navigation />
    </div>
  );
}

export default App;
