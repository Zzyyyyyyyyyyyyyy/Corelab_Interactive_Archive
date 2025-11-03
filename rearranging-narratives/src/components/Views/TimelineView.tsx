import React, { useCallback } from 'react';
import { useStore } from '../../store/useStore';
import { DraggableCard } from '../Common/DraggableCard';
import type { ImageFragment } from '../../types/image';
import './TimelineView.css';

export const TimelineView: React.FC = () => {
  const { images, imageOrder, moveImage, moveImageUp, moveImageDown, moveImageToStart, moveImageToEnd } = useStore();

  const handleMove = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      moveImage(dragIndex, hoverIndex);
    },
    [moveImage]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, fragment: ImageFragment, _index: number) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          moveImageUp(fragment.id);
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveImageDown(fragment.id);
          break;
        case 'Home':
          e.preventDefault();
          moveImageToStart(fragment.id);
          break;
        case 'End':
          e.preventDefault();
          moveImageToEnd(fragment.id);
          break;
      }
    },
    [moveImageUp, moveImageDown, moveImageToStart, moveImageToEnd]
  );

  // Get ordered images
  const orderedImages = imageOrder
    .map((id) => images.find((img) => img.id === id))
    .filter((img): img is ImageFragment => img !== undefined);

  if (orderedImages.length === 0) {
    return (
      <div className="timeline-view">
        <div className="timeline-container">
          <div className="timeline-placeholder">
            <div className="placeholder-content">
              <div className="placeholder-icon texture-halftone"></div>
              <h3 className="placeholder-title">Timeline View</h3>
              <p className="placeholder-text">No images available</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="timeline-view">
      <div className="timeline-container">
        <div className="timeline-instructions">
          <span className="instructions-text">
            Drag cards to reorder · Use ← → keys to move · Home/End to jump
          </span>
        </div>
        <div className="timeline-track">
          {orderedImages.map((fragment, index) => (
            <div key={fragment.id} className="timeline-slot">
              <DraggableCard
                fragment={fragment}
                index={index}
                onMove={handleMove}
                onKeyDown={handleKeyDown}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
