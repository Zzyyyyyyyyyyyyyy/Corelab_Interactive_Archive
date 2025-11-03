import React, { useState } from 'react';
import { VersionManager } from '../Common/VersionManager';
import { DiffView } from '../Common/DiffView';
import './Toolbar.css';

export type LayoutMode = 'timeline' | 'grid';

interface ToolbarProps {
  layoutMode: LayoutMode;
  onLayoutChange: (mode: LayoutMode) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ layoutMode, onLayoutChange }) => {
  const [showVersionManager, setShowVersionManager] = useState(false);
  const [showDiffView, setShowDiffView] = useState(false);

  return (
    <>
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

          <div className="toolbar-section">
            <span className="toolbar-label">Versions</span>
            <div className="toolbar-button-group">
              <button
                className="toolbar-button"
                onClick={() => setShowVersionManager(true)}
              >
                Manage
              </button>
              <button
                className="toolbar-button"
                onClick={() => setShowDiffView(true)}
              >
                Compare
              </button>
            </div>
          </div>
        </div>
      </div>

      {showVersionManager && (
        <VersionManager onClose={() => setShowVersionManager(false)} />
      )}

      {showDiffView && (
        <DiffView onClose={() => setShowDiffView(false)} />
      )}
    </>
  );
};
