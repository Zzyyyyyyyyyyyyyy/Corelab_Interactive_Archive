import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ImageFragment } from '../types/image';
import type { DragDriverType, SnapConfig } from '../types/drag';
import { sampleImages, defaultOrder } from '../data/sampleImages';

interface AppState {
  // Image data and ordering
  images: ImageFragment[];
  imageOrder: string[];

  // Drag configuration
  dragDriver: DragDriverType;
  snapConfig: SnapConfig;

  // Actions
  setImageOrder: (order: string[]) => void;
  moveImage: (fromIndex: number, toIndex: number) => void;
  setDragDriver: (driver: DragDriverType) => void;
  setSnapConfig: (config: SnapConfig) => void;
  resetOrder: () => void;

  // Keyboard navigation
  moveImageUp: (id: string) => void;
  moveImageDown: (id: string) => void;
  moveImageToStart: (id: string) => void;
  moveImageToEnd: (id: string) => void;
}

// ========================================
// Zustand Store with localStorage persistence
// ========================================
export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      images: sampleImages,
      imageOrder: defaultOrder,
      dragDriver: 'react-dnd',
      snapConfig: {
        enabled: true,
        gridSize: 8,
        slotSize: 16,
      },

      setImageOrder: (order) => set({ imageOrder: order }),

      // ========================================
      // CORE REORDERING: Move image between positions
      // Uses array splice to remove and insert at new index
      // ========================================
      moveImage: (fromIndex, toIndex) => {
        const { imageOrder } = get();
        const newOrder = [...imageOrder];
        const [movedItem] = newOrder.splice(fromIndex, 1);
        newOrder.splice(toIndex, 0, movedItem);
        set({ imageOrder: newOrder });
      },

      setDragDriver: (driver) => set({ dragDriver: driver }),

      setSnapConfig: (config) => set({ snapConfig: config }),

      resetOrder: () => set({ imageOrder: defaultOrder }),

      // Keyboard navigation helpers
      moveImageUp: (id) => {
        const { imageOrder } = get();
        const currentIndex = imageOrder.indexOf(id);
        if (currentIndex > 0) {
          get().moveImage(currentIndex, currentIndex - 1);
        }
      },

      moveImageDown: (id) => {
        const { imageOrder } = get();
        const currentIndex = imageOrder.indexOf(id);
        if (currentIndex < imageOrder.length - 1) {
          get().moveImage(currentIndex, currentIndex + 1);
        }
      },

      moveImageToStart: (id) => {
        const { imageOrder } = get();
        const currentIndex = imageOrder.indexOf(id);
        if (currentIndex > 0) {
          get().moveImage(currentIndex, 0);
        }
      },

      moveImageToEnd: (id) => {
        const { imageOrder } = get();
        const currentIndex = imageOrder.indexOf(id);
        if (currentIndex < imageOrder.length - 1) {
          get().moveImage(currentIndex, imageOrder.length - 1);
        }
      },
    }),
    {
      // Persist only imageOrder to localStorage
      name: 'rearranging-narratives-storage',
      partialize: (state) => ({
        imageOrder: state.imageOrder,
        dragDriver: state.dragDriver,
        snapConfig: state.snapConfig,
      }),
    }
  )
);
