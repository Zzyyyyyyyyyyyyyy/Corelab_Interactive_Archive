import React, { useState, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { calculateDiff, getDiffSummary } from '../../utils/diffAlgorithm';
import type { Version } from '../../types/version';
import './DiffView.css';

interface DiffViewProps {
  onClose: () => void;
}

export const DiffView: React.FC<DiffViewProps> = ({ onClose }) => {
  const { versions, images, imageOrder } = useStore();
  const [selectedVersion, setSelectedVersion] = useState<string>('');

  // Calculate diff when a version is selected
  const diff = useMemo(() => {
    if (!selectedVersion) return null;
    const version = versions.find((v) => v.id === selectedVersion);
    if (!version) return null;

    return calculateDiff(version.imageOrder, imageOrder, version.name, 'Current');
  }, [selectedVersion, versions, imageOrder]);

  const summary = diff ? getDiffSummary(diff) : null;

  const getImageById = (id: string) => images.find((img) => img.id === id);

  return (
    <div className="diff-view-overlay" onClick={onClose}>
      <div className="diff-view" onClick={(e) => e.stopPropagation()}>
        <div className="diff-view-header">
          <h2 className="diff-view-title">Compare Versions</h2>
          <button className="diff-view-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="diff-view-content">
          {/* Version selector */}
          <div className="diff-selector">
            <label className="diff-label">
              Compare current arrangement with:
              <select
                className="diff-select"
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(e.target.value)}
              >
                <option value="">Select a version...</option>
                {versions.map((version) => (
                  <option key={version.id} value={version.id}>
                    {version.name} ({new Date(version.createdAt).toLocaleDateString()})
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Summary */}
          {summary && diff && (
            <div className="diff-summary">
              <div className="diff-summary-item">
                <span className="diff-summary-label">From:</span>
                <span className="diff-summary-value">{diff.fromVersion}</span>
              </div>
              <div className="diff-summary-item">
                <span className="diff-summary-label">To:</span>
                <span className="diff-summary-value">{diff.toVersion}</span>
              </div>
              <div className="diff-summary-stats">
                <span className="diff-stat moved">{summary.moved} moved</span>
                <span className="diff-stat inserted">{summary.inserted} inserted</span>
                <span className="diff-stat removed">{summary.removed} removed</span>
                <span className="diff-stat unchanged">{summary.unchanged} unchanged</span>
              </div>
            </div>
          )}

          {/* Diff results */}
          {diff && (
            <div className="diff-results">
              <h3 className="diff-results-title">Changes</h3>
              <div className="diff-list">
                {diff.changes.map((change, index) => {
                  const image = getImageById(change.id);
                  if (!image) return null;

                  return (
                    <div key={`${change.id}-${index}`} className={`diff-item ${change.type}`}>
                      <div className={`diff-indicator texture-${change.type}`}></div>
                      <div className="diff-item-content">
                        <img
                          src={image.imagePath}
                          alt={image.title}
                          className="diff-item-image"
                        />
                        <div className="diff-item-info">
                          <h4 className="diff-item-title">{image.title}</h4>
                          <span className="diff-item-type">{change.type}</span>
                          {change.type === 'moved' && (
                            <span className="diff-item-position">
                              Position: {change.oldIndex! + 1} → {change.newIndex! + 1}
                            </span>
                          )}
                          {change.type === 'removed' && (
                            <span className="diff-item-position">
                              Was at position {change.oldIndex! + 1}
                            </span>
                          )}
                          {change.type === 'inserted' && (
                            <span className="diff-item-position">
                              Now at position {change.newIndex! + 1}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {!selectedVersion && (
            <div className="diff-empty">
              <p>Select a version to compare with the current arrangement</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
