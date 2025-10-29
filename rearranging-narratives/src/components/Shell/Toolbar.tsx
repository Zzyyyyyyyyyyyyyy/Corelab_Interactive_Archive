import React from 'react';
import './Toolbar.css';

export type LayoutMode = 'timeline' | 'grid';

interface ToolbarProps {
  layoutMode: LayoutMode;
  onLayoutChange: (mode: LayoutMode) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ layoutMode, onLayoutChange }) => {
  return (
    <div className="toolbar">
      <div className="toolbar-content">
        <div className="toolbar-section">
          <span className="toolbar-label">Layout</span>
          <div className="toolbar-button-group">
            <button
              className={`toolbar-button ${layoutMode === 'timeline' ? 'toolbar-button-active' : ''}`}
              onClick={() => onLayoutChange('timeline')}
              aria-pressed={layoutMode === 'timeline'}
            >
              Timeline
            </button>
            <button
              className={`toolbar-button ${layoutMode === 'grid' ? 'toolbar-button-active' : ''}`}
              onClick={() => onLayoutChange('grid')}
              aria-pressed={layoutMode === 'grid'}
            >
              Grid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};