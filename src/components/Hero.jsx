"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero section">
      <div className="container">
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
          <a href="#features" className="btn btn-secondary">
            See Features
          </a>
        </div>
      </div>
    </section>
  );
}
