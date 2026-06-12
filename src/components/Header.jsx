"use client";

import React, { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="nav-container">
        <a href="#" className="nav-logo">
          <div className="nav-logo-icon">T</div>
          <span className="text-gradient">TaskFlow</span>
        </a>

        <nav>
          <ul className="nav-menu">
            <li><a href="#showcase">Showcase</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#demo">TaskFlow Demo</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>

        <a 
          href="http://localhost:5000" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-secondary" 
          style={{ padding: "8px 20px", fontSize: "14px" }}
        >
          Launch App
        </a>
      </div>
    </header>
  );
}
