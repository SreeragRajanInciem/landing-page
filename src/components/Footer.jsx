import React from "react";
import { Mail, Globe } from "lucide-react";
import InstagramIcon from "./InstagramIcon";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-socials">
          <a href="https://instagram.com/taskflow_app" target="_blank" rel="noopener noreferrer" className="footer-social-link" id="social-instagram">
            <InstagramIcon size={18} />
          </a>
          <a href="mailto:sreeragsrg2003@gmail.com" className="footer-social-link" id="social-mail">
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
  );
}
