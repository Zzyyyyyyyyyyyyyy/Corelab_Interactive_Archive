import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier } from 'dnd-core';
import type { ImageFragment } from '../../types/image';
import { MetadataEditor } from './MetadataEditor';
import './DraggableCard.css';

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

  // Drop target setup
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: ITEM_TYPE,

    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    hover(item: DragItem, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      // Prevent flickering by only swapping when cursor crosses middle
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset?.y || 0) - hoverBoundingRect.top;

      // Only swap when cursor is past the middle point
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  // Drag source setup
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: () => {
      return { id: fragment.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

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
