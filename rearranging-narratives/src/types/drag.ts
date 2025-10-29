// Drag driver types
export type DragDriverType = 'react-dnd' | 'html5-native';

// Drag and drop event handlers
export interface DragHandlers {
  onDragStart?: (id: string, index: number) => void;
  onDragOver?: (id: string, index: number) => void;
  onDrop?: (draggedId: string, targetId: string, draggedIndex: number, targetIndex: number) => void;
  onDragEnd?: () => void;
}

// Position for drag preview
export interface DragPosition {
  x: number;
  y: number;
}

// Drag state
export interface DragState {
  isDragging: boolean;
  draggedId: string | null;
  draggedIndex: number | null;
  targetIndex: number | null;
}

// Snap configuration
export interface SnapConfig {
  enabled: boolean;
  gridSize?: number; // for grid view
  slotSize?: number; // for timeline view
}
