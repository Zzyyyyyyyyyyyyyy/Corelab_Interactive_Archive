import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ImageFragment } from '../types/image';
import type { DragDriverType, SnapConfig } from '../types/drag';
import type { Version } from '../types/version';
import { sampleImages, defaultOrder } from '../data/sampleImages';

interface AppState {
  images: ImageFragment[];
  imageOrder: string[];
  dragDriver: DragDriverType;
  snapConfig: SnapConfig;

  // Version management
  versions: Version[];
  currentVersionId: string | null;

  // Basic actions
  setImageOrder: (order: string[]) => void;
  moveImage: (fromIndex: number, toIndex: number) => void;
  setDragDriver: (driver: DragDriverType) => void;
  setSnapConfig: (config: SnapConfig) => void;
  resetOrder: () => void;

  // Keyboard shortcuts
  moveImageUp: (id: string) => void;
  moveImageDown: (id: string) => void;
  moveImageToStart: (id: string) => void;
  moveImageToEnd: (id: string) => void;

  // Version actions
  saveVersion: (name: string, description?: string) => void;
  loadVersion: (versionId: string) => void;
  deleteVersion: (versionId: string) => void;

  updateImageMetadata: (id: string, updates: Partial<ImageFragment>) => void;
  exportToJSON: () => string;
  importFromJSON: (json: string) => boolean;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
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

      // Core drag-and-drop logic
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

      deleteVersion: (versionId) => {
        const { versions, currentVersionId } = get();
        set({
          versions: versions.filter((v) => v.id !== versionId),
          currentVersionId: currentVersionId === versionId ? null : currentVersionId,
        });
      },

      updateImageMetadata: (id, updates) => {
        const { images } = get();
        set({
          images: images.map((img) =>
            img.id === id ? { ...img, ...updates } : img
          ),
        });
      },

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

      importFromJSON: (json) => {
        try {
          const data = JSON.parse(json);

          if (!data.images || !Array.isArray(data.images)) {
            console.error('Invalid JSON: missing images array');
            return false;
          }

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
      name: 'rearranging-narratives-storage-v3',
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
