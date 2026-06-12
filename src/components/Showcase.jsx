"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const previewImages = [
  { src: "/preview-1.png", alt: "Add New Task form with priority and status fields" },
  { src: "/preview-2.png", alt: "Admin Dashboard with Admin Tools and task stats" },
  { src: "/preview-3.png", alt: "Tasks list with status badges and edit actions" },
  { src: "/preview-4.png", alt: "Notifications page showing recent alerts" },
  { src: "/preview-5.png", alt: "Send Broadcast Message modal with user targeting" },
];

export default function Showcase() {
  const [carouselIndex, setCarouselIndex] = useState(2);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  const handlePrev = () => {
    setIsCarouselPaused(true);
    setCarouselIndex((prev) => (prev - 1 + 5) % 5);
    setTimeout(() => setIsCarouselPaused(false), 4000);
  };

  const handleNext = () => {
    setIsCarouselPaused(true);
    setCarouselIndex((prev) => (prev + 1) % 5);
    setTimeout(() => setIsCarouselPaused(false), 4000);
  };

  useEffect(() => {
    if (isCarouselPaused) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(timer);
  }, [isCarouselPaused]);

  const getCardStyle = (index) => {
    const diff = index - carouselIndex;
    let offset = diff;
    if (diff < -2) offset += 5;
    if (diff > 2) offset -= 5;

    if (offset === 0) return { transform: "translateX(0) translateZ(100px) scale(1)", opacity: 1, zIndex: 10, filter: "brightness(1)" };
    if (offset === 1) return { transform: "translateX(38%) translateZ(0) scale(0.82)", opacity: 0.65, zIndex: 5, filter: "brightness(0.35)", cursor: "pointer" };
    if (offset === -1) return { transform: "translateX(-38%) translateZ(0) scale(0.82)", opacity: 0.65, zIndex: 5, filter: "brightness(0.35)", cursor: "pointer" };
    return { transform: `translateX(${offset > 0 ? "70%" : "-70%"}) translateZ(-100px) scale(0.65)`, opacity: 0, zIndex: 1, filter: "brightness(0.2)", pointerEvents: "none" };
  };

  return (
    <section id="showcase" className="section showcase-section">
      <div className="container">
        {/* Section Heading */}
        <div className="section-header">
          <h2 className="text-gradient">Explore the Interface</h2>
          <p>Get a visual tour of TaskFlow's modern, responsive administrative boards and task pipelines.</p>
        </div>

        {/* App Screenshot Carousel */}
        <div
          className="carousel-container"
          onMouseEnter={() => setIsCarouselPaused(true)}
          onMouseLeave={() => setIsCarouselPaused(false)}
        >
          <div className="screenshot-glow"></div>

          <button className="carousel-btn carousel-btn-left" onClick={handlePrev} aria-label="Previous Preview">
            <ChevronLeft size={24} />
          </button>

          <div className="carousel-track">
            {previewImages.map((image, index) => (
              <div
                key={index}
                className="carousel-card"
                style={getCardStyle(index)}
                onClick={() => { if (index !== carouselIndex) setCarouselIndex(index); }}
              >
                <Image src={image.src} alt={image.alt} width={1024} height={576} quality={75} className="screenshot-image" />
              </div>
            ))}
          </div>

          <button className="carousel-btn carousel-btn-right" onClick={handleNext} aria-label="Next Preview">
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="carousel-dots">
          {previewImages.map((_, index) => (
            <div
              key={index}
              className={`carousel-dot ${index === carouselIndex ? "carousel-dot-active" : ""}`}
              onClick={() => setCarouselIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
