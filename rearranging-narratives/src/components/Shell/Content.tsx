import React from 'react';
import './Content.css';

interface ContentProps {
  children: React.ReactNode;
}

export const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <main className="content">
      <div className="content-container">
        {children}
      </div>
    </main>
  );
};