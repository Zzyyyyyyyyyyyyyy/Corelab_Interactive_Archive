import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import './VersionManager.css';

interface VersionManagerProps {
  onClose: () => void;
}

export const VersionManager: React.FC<VersionManagerProps> = ({ onClose }) => {
  const { versions, currentVersionId, saveVersion, loadVersion, deleteVersion, exportToJSON } = useStore();
  const [newVersionName, setNewVersionName] = useState('');
  const [newVersionDescription, setNewVersionDescription] = useState('');

  const handleSave = () => {
    if (!newVersionName.trim()) {
      alert('Please enter a version name');
      return;
    }
    saveVersion(newVersionName.trim(), newVersionDescription.trim() || undefined);
    setNewVersionName('');
    setNewVersionDescription('');
  };

  const handleExport = () => {
    const json = exportToJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rearranging-narratives-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="version-manager-overlay" onClick={onClose}>
      <div className="version-manager" onClick={(e) => e.stopPropagation()}>
        <div className="version-manager-header">
          <h2 className="version-manager-title">Version Manager</h2>
          <button className="version-manager-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="version-manager-content">
          {/* Save new version */}
          <div className="version-save-section">
            <h3 className="section-title">Save Current Arrangement</h3>
            <div className="version-form">
              <input
                type="text"
                className="version-input"
                placeholder="Version name (e.g., 'Opening Scene')"
                value={newVersionName}
                onChange={(e) => setNewVersionName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSave()}
              />
              <input
                type="text"
                className="version-input"
                placeholder="Description (optional)"
                value={newVersionDescription}
                onChange={(e) => setNewVersionDescription(e.target.value)}
              />
              <button className="version-button save-button" onClick={handleSave}>
                Save Version
              </button>
            </div>
          </div>

          {/* List of saved versions */}
          <div className="version-list-section">
            <h3 className="section-title">Saved Versions ({versions.length})</h3>
            {versions.length === 0 ? (
              <p className="empty-message">No saved versions yet</p>
            ) : (
              <div className="version-list">
                {versions.map((version) => (
                  <div
                    key={version.id}
                    className={`version-item ${currentVersionId === version.id ? 'current' : ''}`}
                  >
                    <div className="version-info">
                      <h4 className="version-name">{version.name}</h4>
                      {version.description && (
                        <p className="version-description">{version.description}</p>
                      )}
                      <span className="version-date">{formatDate(version.createdAt)}</span>
                      <span className="version-count">{version.imageOrder.length} images</span>
                    </div>
                    <div className="version-actions">
                      <button
                        className="version-button load-button"
                        onClick={() => loadVersion(version.id)}
                        disabled={currentVersionId === version.id}
                      >
                        Load
                      </button>
                      <button
                        className="version-button delete-button"
                        onClick={() => {
                          if (confirm(`Delete version "${version.name}"?`)) {
                            deleteVersion(version.id);
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Export button */}
          <div className="version-export-section">
            <button className="version-button export-button" onClick={handleExport}>
              Export All to JSON
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
