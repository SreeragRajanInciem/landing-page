"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const previewImages = [
  { src: "/preview-1.png", alt: "Add New Task form with priority and status fields" },
  { src: "/preview-2.png", alt: "Admin Dashboard with Admin Tools and task stats" },
  { src: "/preview-3.png", alt: "Tasks list with status badges and edit actions" },
  { src: "/preview-4.png", alt: "Notifications page showing recent alerts" },
  { src: "/preview-5.png", alt: "Send Broadcast Message modal with user targeting" },
];

export default function Hero() {
  const [carouselIndex, setCarouselIndex] = useState(2);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const handlePrevCarousel = () => {
    setIsCarouselPaused(true);
    setCarouselIndex((prev) => (prev - 1 + 5) % 5);
    setTimeout(() => setIsCarouselPaused(false), 4000);
  };

  const handleNextCarousel = () => {
    setIsCarouselPaused(true);
    setCarouselIndex((prev) => (prev + 1) % 5);
    setTimeout(() => setIsCarouselPaused(false), 4000);
  };

  // Auto-advance carousel every 3 seconds (pauses on hover / manual nav)
  useEffect(() => {
    if (isCarouselPaused) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(timer);
  }, [isCarouselPaused]);

  const getCarouselCardStyle = (index) => {
    const diff = index - carouselIndex;
    
    // Circular slide wrap calculation
    let offset = diff;
    if (diff < -2) offset += 5;
    if (diff > 2) offset -= 5;

    // Center Slide (In Focus)
    if (offset === 0) {
      return {
        transform: "translateX(0) translateZ(100px) scale(1)",
        opacity: 1,
        zIndex: 10,
        filter: "brightness(1)",
      };
    }
    // Right Adjacent Slide (Offset, Darkened & Scaled down)
    else if (offset === 1) {
      return {
        transform: "translateX(38%) translateZ(0) scale(0.82)",
        opacity: 0.65,
        zIndex: 5,
        filter: "brightness(0.35)",
        cursor: "pointer",
      };
    }
    // Left Adjacent Slide (Offset, Darkened & Scaled down)
    else if (offset === -1) {
      return {
        transform: "translateX(-38%) translateZ(0) scale(0.82)",
        opacity: 0.65,
        zIndex: 5,
        filter: "brightness(0.35)",
        cursor: "pointer",
      };
    }
    // Offscreen Slides (Hidden)
    else {
      return {
        transform: `translateX(${offset > 0 ? "70%" : "-70%"}) translateZ(-100px) scale(0.65)`,
        opacity: 0,
        zIndex: 1,
        filter: "brightness(0.2)",
        pointerEvents: "none",
      };
    }
  };

  return (
    <section className="hero section">
      <div className="container">
        <div className="hero-badge">
          <span 
            style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#6366f1" }} 
            className="animate-pulse-slow"
          ></span>
          Enterprise Task Management
        </div>
        
        <h1 className="hero-title">
          Orchestrate Your Workflows With <span className="text-gradient">Precision</span>
        </h1>
        
        <p className="hero-subtitle">
          A secure, collaborative workspace featuring real-time task pipelines, 
          granular role authorizations, and live notifications. Take command of your team's productivity today.
        </p>

        <div className="hero-actions">
          <a href="#contact" className="btn btn-primary">
            Get Started Free <ArrowRight size={16} />
          </a>
          <a href="#demo" className="btn btn-secondary">
            Try TaskFlow Demo
          </a>
        </div>

        {/* 3D Coverflow Carousel Area */}
        <div
          className="carousel-container"
          onMouseEnter={() => setIsCarouselPaused(true)}
          onMouseLeave={() => setIsCarouselPaused(false)}
        >
          <div className="screenshot-glow"></div>
          
          <button 
            className="carousel-btn carousel-btn-left" 
            onClick={handlePrevCarousel}
            aria-label="Previous Preview"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="carousel-track">
            {previewImages.map((image, index) => (
              <div
                key={index}
                className="carousel-card"
                style={getCarouselCardStyle(index)}
                onClick={() => {
                  if (index !== carouselIndex) {
                    setCarouselIndex(index);
                  }
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1024}
                  height={576}
                  quality={100}
                  className="screenshot-image"
                  priority
                />
              </div>
            ))}
          </div>

          <button 
            className="carousel-btn carousel-btn-right" 
            onClick={handleNextCarousel}
            aria-label="Next Preview"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Carousel Dot Indicators */}
        <div className="carousel-dots">
          {previewImages.map((_, index) => (
            <div
              key={index}
              className={`carousel-dot ${index === carouselIndex ? "carousel-dot-active" : ""}`}
              onClick={() => setCarouselIndex(index)}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
