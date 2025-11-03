import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier } from 'dnd-core';
import type { ImageFragment } from '../../types/image';
import { MetadataEditor } from './MetadataEditor';
import './DraggableCard.css';

// Define drag item type identifier for React DnD
const ITEM_TYPE = 'IMAGE_CARD';

interface DraggableCardProps {
  fragment: ImageFragment;
  index: number;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  onClick?: (fragment: ImageFragment) => void;
  onKeyDown?: (e: React.KeyboardEvent, fragment: ImageFragment, index: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export const DraggableCard: React.FC<DraggableCardProps> = ({
  fragment,
  index,
  onMove,
  onClick,
  onKeyDown,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showMetadataEditor, setShowMetadataEditor] = useState(false);

  // ========================================
  // DROP TARGET: Makes this card accept other draggable cards
  // ========================================
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: ITEM_TYPE,

    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    // ========================================
    // HOVER LOGIC: Core reordering implementation
    // Triggers when a dragged card hovers over this card
    // ========================================
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      // Calculate mouse position to prevent flickering
      // Only swap when mouse crosses the middle line of the card
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset?.y || 0) - hoverBoundingRect.top;

      // Dragging downwards: only move when cursor is below 50%
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards: only move when cursor is above 50%
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Execute the reorder by calling parent's onMove callback
      // This triggers the Zustand store's moveImage function
      onMove(dragIndex, hoverIndex);

      // Update item index to avoid expensive lookups on next hover
      item.index = hoverIndex;
    },
  });

  // ========================================
  // DRAG SOURCE: Makes this card draggable
  // ========================================
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: () => {
      return { id: fragment.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Combine drag and drop on the same element
  drag(drop(ref));

  return (
    <>
      <div
        ref={ref}
        className={`draggable-card ${isDragging ? 'dragging' : ''}`}
        data-handler-id={handlerId}
        onClick={() => onClick?.(fragment)}
        onDoubleClick={() => setShowMetadataEditor(true)}
        onKeyDown={(e) => onKeyDown?.(e, fragment, index)}
        tabIndex={0}
        role="button"
        aria-label={`${fragment.title} - ${fragment.description || ''}`}
      >
        <div className="card-image-container">
          <img
            src={fragment.imagePath}
            alt={fragment.title}
            className="card-image"
            draggable={false}
          />
        </div>
        <div className="card-info">
          <h3 className="card-title">{fragment.title}</h3>
          {fragment.tags && fragment.tags.length > 0 && (
            <div className="card-tags">
              {fragment.tags.map((tag, idx) => (
                <span key={idx} className="card-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
          {fragment.description && (
            <p className="card-description">{fragment.description}</p>
          )}
        </div>
      </div>

      {showMetadataEditor && (
        <MetadataEditor
          fragment={fragment}
          onClose={() => setShowMetadataEditor(false)}
        />
      )}
    </>
  );
};
