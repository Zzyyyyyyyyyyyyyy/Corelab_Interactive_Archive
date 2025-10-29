import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span className="footer-text">CoreLab Interactive Archive · 2025</span>
        <span className="footer-divider">|</span>
        <span className="footer-text">Monochrome 2D / Print-Lab Noir</span>
      </div>
    </footer>
  );
};