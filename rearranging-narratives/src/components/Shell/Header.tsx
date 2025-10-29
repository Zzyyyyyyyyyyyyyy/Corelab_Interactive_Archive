import React from 'react';
import './Header.css';

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title = 'Rearranging Narratives' }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">{title}</h1>
        <div className="header-subtitle">
          <span className="header-meta">Interactive Archive</span>
        </div>
      </div>
    </header>
  );
};