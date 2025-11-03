import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ImageFragment } from '../types/image';
import type { DragDriverType, SnapConfig } from '../types/drag';
import type { Version } from '../types/version';
import { sampleImages, defaultOrder } from '../data/sampleImages';

interface AppState {
  // Image data and ordering
  images: ImageFragment[];
  imageOrder: string[];

  // Drag configuration
  dragDriver: DragDriverType;
  snapConfig: SnapConfig;

  // ========================================
  // VERSION MANAGEMENT: Saved cuts/arrangements
  // ========================================
  versions: Version[];
  currentVersionId: string | null;

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

  // ========================================
  // VERSION MANAGEMENT ACTIONS
  // ========================================
  saveVersion: (name: string, description?: string) => void;
  loadVersion: (versionId: string) => void;
  deleteVersion: (versionId: string) => void;

  // Metadata editing
  updateImageMetadata: (id: string, updates: Partial<ImageFragment>) => void;

  // Import/Export
  exportToJSON: () => string;
  importFromJSON: (json: string) => boolean;
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
      versions: [],
      currentVersionId: null,

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
        set({ imageOrder: newOrder, currentVersionId: null });
      },

      setDragDriver: (driver) => set({ dragDriver: driver }),

      setSnapConfig: (config) => set({ snapConfig: config }),

      resetOrder: () => set({ imageOrder: defaultOrder, currentVersionId: null }),

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

      // ========================================
      // VERSION MANAGEMENT: Save current arrangement as a named version
      // ========================================
      saveVersion: (name, description) => {
        const { imageOrder, versions } = get();
        const newVersion: Version = {
          id: `version-${Date.now()}`,
          name,
          imageOrder: [...imageOrder],
          createdAt: new Date(),
          description,
        };
        set({
          versions: [...versions, newVersion],
          currentVersionId: newVersion.id,
        });
      },

      // ========================================
      // VERSION MANAGEMENT: Load a saved version
      // ========================================
      loadVersion: (versionId) => {
        const { versions } = get();
        const version = versions.find((v) => v.id === versionId);
        if (version) {
          set({
            imageOrder: [...version.imageOrder],
            currentVersionId: versionId,
          });
        }
      },

      // ========================================
      // VERSION MANAGEMENT: Delete a version
      // ========================================
      deleteVersion: (versionId) => {
        const { versions, currentVersionId } = get();
        set({
          versions: versions.filter((v) => v.id !== versionId),
          currentVersionId: currentVersionId === versionId ? null : currentVersionId,
        });
      },

      // ========================================
      // METADATA EDITING: Update image properties
      // ========================================
      updateImageMetadata: (id, updates) => {
        const { images } = get();
        set({
          images: images.map((img) =>
            img.id === id ? { ...img, ...updates } : img
          ),
        });
      },

      // ========================================
      // EXPORT: Generate JSON of current state
      // ========================================
      exportToJSON: () => {
        const { images, imageOrder, versions } = get();
        const exportData = {
          images,
          imageOrder,
          versions: versions.map(v => ({
            ...v,
            createdAt: v.createdAt.toISOString(),
          })),
          exportedAt: new Date().toISOString(),
        };
        return JSON.stringify(exportData, null, 2);
      },

      // ========================================
      // IMPORT: Load state from JSON
      // ========================================
      importFromJSON: (json) => {
        try {
          const data = JSON.parse(json);

          // Validate structure
          if (!data.images || !Array.isArray(data.images)) {
            console.error('Invalid JSON: missing images array');
            return false;
          }

          // Convert date strings back to Date objects
          const versions = (data.versions || []).map((v: any) => ({
            ...v,
            createdAt: new Date(v.createdAt),
          }));

          set({
            images: data.images,
            imageOrder: data.imageOrder || data.images.map((img: ImageFragment) => img.id),
            versions,
            currentVersionId: null,
          });

          return true;
        } catch (error) {
          console.error('Failed to import JSON:', error);
          return false;
        }
      },
    }),
    {
      // Persist to localStorage
      name: 'rearranging-narratives-storage',
      partialize: (state) => ({
        images: state.images,
        imageOrder: state.imageOrder,
        dragDriver: state.dragDriver,
        snapConfig: state.snapConfig,
        versions: state.versions,
        currentVersionId: state.currentVersionId,
      }),
    }
  )
);
