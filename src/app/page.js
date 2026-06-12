"use client";

import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Showcase from "@/components/Showcase";
import DemoBoard from "@/components/DemoBoard";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Showcase />
      <Features />
      <DemoBoard />
      <Contact />
      <Footer />
    </div>
  );
}

