import type { ImageFragment } from '../types/image';

// Sample image fragments for the narrative
export const sampleImages: ImageFragment[] = [
  {
    id: 'fragment-01',
    title: 'Fragment 01',
    role: 'scene',
    imagePath: '/src/assets/images/sample-01.svg',
    tags: ['halftone', 'opening'],
    description: 'The beginning - a rectangle filled with halftone texture',
  },
  {
    id: 'fragment-02',
    title: 'Fragment 02',
    role: 'character',
    imagePath: '/src/assets/images/sample-02.svg',
    tags: ['crosshatch', 'circular'],
    description: 'A circular form with crosshatch pattern',
  },
  {
    id: 'fragment-03',
    title: 'Fragment 03',
    role: 'scene',
    imagePath: '/src/assets/images/sample-03.svg',
    tags: ['diagonal', 'square'],
    description: 'Diagonal lines forming a contained space',
  },
  {
    id: 'fragment-04',
    title: 'Fragment 04',
    role: 'character',
    imagePath: '/src/assets/images/sample-04.svg',
    tags: ['dots', 'polygon'],
    description: 'A pentagon filled with dot pattern',
  },
  {
    id: 'fragment-05',
    title: 'Fragment 05',
    role: 'scene',
    imagePath: '/src/assets/images/sample-05.svg',
    tags: ['grid', 'structure'],
    description: 'Grid pattern suggesting structure and order',
  },
];

// Default order (can be shuffled or customized)
export const defaultOrder = sampleImages.map(img => img.id);
