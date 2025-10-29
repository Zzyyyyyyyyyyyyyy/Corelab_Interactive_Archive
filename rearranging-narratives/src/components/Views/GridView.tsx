import React, { useCallback } from 'react';
import { useStore } from '../../store/useStore';
import { DraggableCard } from '../Common/DraggableCard';
import type { ImageFragment } from '../../types/image';
import './GridView.css';

export const GridView: React.FC = () => {
  const { images, imageOrder, moveImage, moveImageUp, moveImageDown, moveImageToStart, moveImageToEnd } = useStore();

  const handleMove = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      moveImage(dragIndex, hoverIndex);
    },
    [moveImage]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, fragment: ImageFragment, index: number) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          // Move up in grid (typically 3 columns, so -3 positions)
          if (index >= 3) {
            moveImage(index, index - 3);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          // Move down in grid (+3 positions)
          if (index < imageOrder.length - 3) {
            moveImage(index, index + 3);
          }
          break;
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
    [moveImage, moveImageUp, moveImageDown, moveImageToStart, moveImageToEnd, imageOrder.length]
  );

  // Get ordered images
  const orderedImages = imageOrder
    .map((id) => images.find((img) => img.id === id))
    .filter((img): img is ImageFragment => img !== undefined);

  if (orderedImages.length === 0) {
    return (
      <div className="grid-view">
        <div className="grid-container-wrapper">
          <div className="grid-placeholder">
            <div className="placeholder-content">
              <div className="placeholder-icon texture-crosshatch"></div>
              <h3 className="placeholder-title">Grid View</h3>
              <p className="placeholder-text">No images available</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid-view">
      <div className="grid-container-wrapper">
        <div className="grid-instructions">
          <span className="instructions-text">
            Drag cards to reorder · Use arrow keys to move · Home/End to jump
          </span>
        </div>
        <div className="grid-container">
          {orderedImages.map((fragment, index) => (
            <div key={fragment.id} className="grid-item">
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
