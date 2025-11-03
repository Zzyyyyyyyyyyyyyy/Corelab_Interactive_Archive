import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import type { ImageFragment } from '../../types/image';
import './MetadataEditor.css';

interface MetadataEditorProps {
  fragment: ImageFragment;
  onClose: () => void;
}

export const MetadataEditor: React.FC<MetadataEditorProps> = ({ fragment, onClose }) => {
  const { updateImageMetadata } = useStore();
  const [title, setTitle] = useState(fragment.title);
  const [role, setRole] = useState(fragment.role || '');
  const [description, setDescription] = useState(fragment.description || '');
  const [tags, setTags] = useState((fragment.tags || []).join(', '));

  const handleSave = () => {
    updateImageMetadata(fragment.id, {
      title: title.trim(),
      role: role.trim() || undefined,
      description: description.trim() || undefined,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
    });
    onClose();
  };

  return (
    <div className="metadata-editor-overlay" onClick={onClose}>
      <div className="metadata-editor" onClick={(e) => e.stopPropagation()}>
        <div className="metadata-editor-header">
          <h3 className="metadata-editor-title">Edit Metadata</h3>
          <button className="metadata-editor-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="metadata-editor-content">
          <div className="metadata-field">
            <label className="metadata-label">
              Title
              <input
                type="text"
                className="metadata-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </div>

          <div className="metadata-field">
            <label className="metadata-label">
              Role
              <input
                type="text"
                className="metadata-input"
                placeholder="e.g., character, scene, fragment"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </label>
          </div>

          <div className="metadata-field">
            <label className="metadata-label">
              Description
              <textarea
                className="metadata-textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>

          <div className="metadata-field">
            <label className="metadata-label">
              Tags (comma-separated)
              <input
                type="text"
                className="metadata-input"
                placeholder="e.g., halftone, opening"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </label>
          </div>

          <div className="metadata-actions">
            <button className="metadata-button cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button className="metadata-button save-button" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
