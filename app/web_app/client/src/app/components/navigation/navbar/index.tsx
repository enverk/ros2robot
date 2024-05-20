"use client";
import { useState } from "react";
import Link from "next/link";
import './style.css';  // Kendi stil dosyanızı ekleyin

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSignOut = () => {
    window.location.href = '/login'; 
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link href="/" className="brand">
          Brand
        </Link>
        <div className="menu-icon" onClick={toggleMenu}>
          <svg
            className="icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </div>
        <div className={`menu ${isOpen ? "open" : ""}`}>
          <ul className="menu-list">
            <li>
              <Link href="/main" className="menu-item">
                Ana Sayfa
              </Link>
            </li>
            <li>
              <Link href="/about" className="menu-item">
                Robotlar
              </Link>
            </li>
            <li>
              <Link href="/services" className="menu-item">
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
