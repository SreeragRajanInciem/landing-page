"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mail, Phone, Globe, CheckCircle2, AlertTriangle, Loader2, Send } from "lucide-react";
import InstagramIcon from "./InstagramIcon";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState({ type: null, text: "" });
  const [formLoading, setFormLoading] = useState(false);
  const textareaRef = useRef(null);

  // Auto-resize message textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [formData.message]);

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
        setFormData({ name: "", email: "", message: "" });
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

  return (
    <section id="contact" className="section" style={{ background: "var(--bg-dark)", borderTop: "1px solid var(--border-color)" }}>
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
                  ref={textareaRef}
                  rows={4}
                  style={{ resize: "none", overflowY: "hidden" }}
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
  );
}
