// page.js
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  ShieldCheck, 
  BellRing, 
  Layers, 
  Activity, 
  Mail, 
  Phone, 
  Globe, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Send,
  Loader2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const InstagramIcon = ({ size = 20, ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    stroke="currentColor" 
    strokeWidth="2" 
    fill="none" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Home() {
  // Sticky Header state
  const [scrolled, setScrolled] = useState(false);

  // App Preview Carousel state
  const [carouselIndex, setCarouselIndex] = useState(2);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const previewImages = [
    { src: "/preview-1.png", alt: "Add New Task form with priority and status fields" },
    { src: "/preview-2.png", alt: "Admin Dashboard with Admin Tools and task stats" },
    { src: "/preview-3.png", alt: "Tasks list with status badges and edit actions" },
    { src: "/preview-4.png", alt: "Notifications page showing recent alerts" },
    { src: "/preview-5.png", alt: "Send Broadcast Message modal with user targeting" },
  ];

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
  
  // Interactive Sandbox state
  const [tasks, setTasks] = useState([
    { id: 1, title: "Refactor auth notification middleware", column: "pending" },
    { id: 2, title: "Draft system roles permissions matrix", column: "pending" },
    { id: 3, title: "Optimize database index queries", column: "completed" },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // Contact Form state
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState({ type: null, text: "" }); // { type: 'success' | 'error', text: '' }
  const [formLoading, setFormLoading] = useState(false);

  // 3D Card Tilt state
  const frameRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

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

  // Auto-advance carousel every 3 seconds (pauses on hover / manual nav)
  useEffect(() => {
    if (isCarouselPaused) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(timer);
  }, [isCarouselPaused]);

  // 3D Tilt calculation
  const handleMouseMove = (e) => {
    if (!frameRef.current) return;
    
    const card = frameRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position inside container
    const y = e.clientY - rect.top;  // y position inside container
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (-10deg to 10deg max)
    const rotateX = ((centerY - y) / centerY) * 8; 
    const rotateY = ((x - centerX) / centerX) * 8;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.05s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s ease",
    });
  };

  // Sandbox Tasks manipulation
  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            column: task.column === "pending" ? "completed" : "pending",
          };
        }
        return task;
      })
    );
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      column: "pending",
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  const handleDeleteTask = (id, e) => {
    e.stopPropagation(); // Stop task toggle on card click
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Contact Form Submission
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormStatus({ type: null, text: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setFormStatus({ type: "success", text: data.message });
        setFormData({ name: "", email: "", message: "" }); // Reset
      } else {
        setFormStatus({ type: "error", text: data.error || "Failed to submit." });
      }
    } catch (error) {
      console.error("Form Submit Error:", error);
      setFormStatus({ type: "error", text: "Something went wrong. Please check your connection." });
    } finally {
      setFormLoading(false);
    }
  };

  // Filter tasks for columns
  const pendingTasks = tasks.filter((task) => task.column === "pending");
  const completedTasks = tasks.filter((task) => task.column === "completed");

  return (
    <div>
      {/* Navigation Header */}
      <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
        <div className="nav-container">
          <a href="#" className="nav-logo">
            <div className="nav-logo-icon">T</div>
            <span className="text-gradient">TaskFlow</span>
          </a>

          <nav>
            <ul className="nav-menu">
              <li><a href="#features">Features</a></li>
              <li><a href="#demo">TaskFlow Demo</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>

          <a href="http://localhost:5000" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: "8px 20px", fontSize: "14px" }}>
            Launch App
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero section">
        <div className="container">
          <div className="hero-badge">
            <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#6366f1" }} className="animate-pulse-slow"></span>
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

      {/* Features Grid Section */}
      <section id="features" className="section" style={{ background: "var(--bg-darker)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container">
          <div className="section-header">
            <h2 className="text-gradient-teal">Tailored for Operational Integrity</h2>
            <p>TaskFlow is engineered to keep managers informed, databases secure, and operations highly synchronized.</p>
          </div>

          <div className="features-grid">
            {/* Feature 1 */}
            <div className="glass-panel feature-card">
              <div className="feature-icon">
                <ShieldCheck size={24} />
              </div>
              <h3>Fine-Grained Permissions</h3>
              <p>
                Define designations with distinct access boundaries. Grant roles authority to approve tasks, 
                oversee logs, verify accounts, or send broadcast alerts safely.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel feature-card">
              <div className="feature-icon">
                <Layers size={24} />
              </div>
              <h3>Multi-Tiered Workspaces</h3>
              <p>
                Personalized user views for Admins, CTOs, and Standard Employees. Focus on the core tasks, 
                pending bottlenecks, and progress metrics relevant to your role.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel feature-card">
              <div className="feature-icon">
                <Activity size={24} />
              </div>
              <h3>Seamless Approval Pipelines</h3>
              <p>
                Empower your workforce to register tasks, request reviews, and submit updates. Managers receive 
                live action lists to approve, defer, or flag tasks in one click.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-panel feature-card">
              <div className="feature-icon">
                <BellRing size={24} />
              </div>
              <h3>Real-Time Notifications</h3>
              <p>
                No page refreshes needed. Updates, messages, and manager actions publish instantly across 
                the organization via standard WebSocket connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Sandbox Section */}
      <section id="demo" className="section">
        <div className="container">
          <div className="section-header">
            <h2>Experience TaskFlow Live</h2>
            <p>Don't just read about it. Test our sandbox task board below. Complete, delete, or create cards to see transitions.</p>
          </div>

          {/* New Task Bar */}
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <form onSubmit={handleAddTask} className="demo-input-bar">
              <input 
                type="text" 
                placeholder="Type a task name (e.g. Test Docker configurations)..." 
                className="input-field" 
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: "0 20px" }}>
                <Plus size={20} />
              </button>
            </form>
          </div>

          {/* Task Board Container */}
          <div className="demo-board" style={{ maxWidth: "800px", margin: "30px auto 0 auto" }}>
            {/* Column 1: Active */}
            <div className="demo-column">
              <h3>
                Active Tasks 
                <span className="demo-badge">{pendingTasks.length}</span>
              </h3>
              
              {pendingTasks.length === 0 ? (
                <div style={{ color: "var(--text-muted)", fontSize: "14px", textAlign: "center", padding: "40px 0" }}>
                  No active tasks. Add one above!
                </div>
              ) : (
                pendingTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="demo-task-card"
                    onClick={() => handleToggleTask(task.id)}
                  >
                    <div className="demo-task-info">
                      <div className="checkbox-custom">
                        <Clock size={12} style={{ color: "var(--text-muted)" }} />
                      </div>
                      <span>{task.title}</span>
                    </div>
                    <button 
                      onClick={(e) => handleDeleteTask(task.id, e)} 
                      className="btn demo-task-action" 
                      style={{ background: "none", border: "none", padding: 0 }}
                      title="Delete Task"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Column 2: Completed */}
            <div className="demo-column">
              <h3>
                Completed Tasks 
                <span className="demo-badge">{completedTasks.length}</span>
              </h3>

              {completedTasks.length === 0 ? (
                <div style={{ color: "var(--text-muted)", fontSize: "14px", textAlign: "center", padding: "40px 0" }}>
                  No completed tasks yet. Check an active task!
                </div>
              ) : (
                completedTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="demo-task-card completed"
                    onClick={() => handleToggleTask(task.id)}
                  >
                    <div className="demo-task-info">
                      <div className="checkbox-custom checkbox-checked">
                        <CheckCircle2 size={12} />
                      </div>
                      <span className="line-through">{task.title}</span>
                    </div>
                    <button 
                      onClick={(e) => handleDeleteTask(task.id, e)} 
                      className="btn demo-task-action" 
                      style={{ background: "none", border: "none", padding: 0 }}
                      title="Delete Task"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact & SMTP Form Section */}
      <section id="contact" className="section" style={{ background: "var(--bg-darker)", borderTop: "1px solid var(--border-color)" }}>
        <div className="container">
          <div className="section-header">
            <h2>Get In Touch</h2>
            <p>Reach out to us directly or fill in your email details below. We reply to queries within 24 hours.</p>
          </div>

          <div className="contact-grid">
            {/* Contact Information Side */}
            <div className="contact-info">
              {/* Item 1: Email */}
              <div className="contact-item">
                <div className="contact-item-icon">
                  <Mail size={20} />
                </div>
                <div className="contact-item-text">
                  <h4>Mail Address</h4>
                  <p>
                    <a href="mailto:support@taskmanager.com?subject=TaskFlow Inquiry" className="text-gradient">
                      support@taskmanager.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Item 2: Instagram */}
              <div className="contact-item">
                <div className="contact-item-icon">
                  <InstagramIcon size={20} />
                </div>
                <div className="contact-item-text">
                  <h4>Instagram Handles</h4>
                  <p>
                    <a href="https://instagram.com/taskflow_app" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-primary)" }}>
                      @taskflow_app
                    </a>
                  </p>
                </div>
              </div>

              {/* Item 3: Phone */}
              <div className="contact-item">
                <div className="contact-item-icon">
                  <Phone size={20} />
                </div>
                <div className="contact-item-text">
                  <h4>Contact Support</h4>
                  <p>
                    <a href="tel:+15550192834" style={{ color: "var(--text-primary)" }}>
                      +1 (555) 019-2834
                    </a>
                  </p>
                </div>
              </div>

              {/* Item 4: Website */}
              <div className="contact-item">
                <div className="contact-item-icon">
                  <Globe size={20} />
                </div>
                <div className="contact-item-text">
                  <h4>Official Portal</h4>
                  <p>
                    <a href="http://localhost:5000" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-primary)" }}>
                      taskflow-dashboard.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* SMTP Contact Form Side */}
            <div className="glass-panel contact-form-container">
              <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "24px" }}>Send A Direct Query</h3>
              
              {formStatus.text && (
                <div className={`status-msg ${formStatus.type === "success" ? "status-success" : "status-error"}`}>
                  {formStatus.type === "success" ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                  <span>{formStatus.text}</span>
                </div>
              )}

              <form onSubmit={handleFormSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="form-name" className="input-label">Your Name</label>
                    <input 
                      id="form-name"
                      type="text" 
                      name="name"
                      required
                      placeholder="Jane Doe" 
                      className="input-field" 
                      value={formData.name}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="form-email" className="input-label">Email ID</label>
                    <input 
                      id="form-email"
                      type="email" 
                      name="email"
                      required
                      placeholder="jane@company.com" 
                      className="input-field" 
                      value={formData.email}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="form-message" className="input-label">Message Details</label>
                  <textarea 
                    id="form-message"
                    name="message"
                    required
                    placeholder="Enter your task manager queries here..." 
                    className="input-field" 
                    rows={4}
                    style={{ resize: "vertical" }}
                    value={formData.message}
                    onChange={handleFormChange}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={formLoading} 
                  className="btn btn-primary contact-submit-btn"
                  id="form-submit-btn"
                >
                  {formLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending Query...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-socials">
            <a href="https://instagram.com/taskflow_app" target="_blank" rel="noopener noreferrer" className="footer-social-link" id="social-instagram">
              <InstagramIcon size={18} />
            </a>
            <a href="mailto:support@taskmanager.com" className="footer-social-link" id="social-mail">
              <Mail size={18} />
            </a>
            <a href="http://localhost:5000" target="_blank" rel="noopener noreferrer" className="footer-social-link" id="social-web">
              <Globe size={18} />
            </a>
          </div>
          
          <p className="footer-text">
            © {new Date().getFullYear()} TaskFlow Inc. All Rights Reserved. Built with Next.js and Vanilla CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
