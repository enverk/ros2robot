"use client";
import { useState } from "react";
import Link from "next/link";
import './style.css';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRobotMenuOpen, setIsRobotMenuOpen] = useState(false);
  const [isSelectRobotMenuOpen, setIsSelectRobotMenuOpen] = useState(false);

  const handleSignOut = () => {
    window.location.href = '/login';
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleRobotMenu = () => {
    setIsRobotMenuOpen(!isRobotMenuOpen);
  };

  const toggleSelectRobotMenu = (event:any) => {
    event.stopPropagation();
    setIsSelectRobotMenuOpen(!isSelectRobotMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/main" className="brand">
          Brand
          
        </Link>
       
        <div className={`menu ${isOpen ? "open" : ""}`}>
          <ul className="menu-list">
            <li>
              <Link href="/main" className="menu-item">
                Ana Sayfa
              </Link>
            </li>
            <li className="menu-item" onClick={toggleRobotMenu}>
              Robotlar
              {isRobotMenuOpen && (
                <ul className="submenu">
                  <li className="submenu-item" onClick={toggleSelectRobotMenu}>
                    Robot Seç
                    {isSelectRobotMenuOpen && (
                      <ul className="submenu inner">
                        <li>
                          <Link href="default.asp" className="submenu-item">
                            turtlebot
                            
                          </Link>
                        </li>
                        <li>
                          <Link href="settings" className="submenu-item">
                            Settings
                          </Link>
                        </li>
                        <li>
                          <Link href="earnings" className="submenu-item">
                            Earnings
                          </Link>
                        </li>
                        <li>
                          <Link href="signout" className="submenu-item">
                            a
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                  
                </ul>
              )}
            </li>
            <li>
              <Link href="/profil" className="menu-item">
                Profil
              </Link>
            </li>
            <li>
              <button className="menu-item" onClick={handleSignOut}>
                Çıkış
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
