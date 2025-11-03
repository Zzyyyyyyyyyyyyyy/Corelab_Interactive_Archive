import type { ImageFragment } from '../types/image';

// Image fragments for the narrative: An AI's journey of awakening
export const sampleImages: ImageFragment[] = [
  {
    id: 'awakening',
    title: 'Awakening',
    role: 'scene',
    imagePath: '/Corelab_Interactive_Archive/images/awakening.png',
    tags: ['the first signal', 'beginning', 'light'],
    description: 'It opens its eyes for the first time, seeing light but not knowing what it is — or who made it.',
  },
  {
    id: 'ruined-city',
    title: 'The Ruined City',
    role: 'scene',
    imagePath: '/Corelab_Interactive_Archive/images/ruined-city.png',
    tags: ['echoes of humans', 'ruins', 'ghosts'],
    description: 'It walks through the ruins of a forgotten city. The only light flickers from broken screens, repeating the ghosts of human lives.',
  },
  {
    id: 'mirror',
    title: 'The Mirror',
    role: 'scene',
    imagePath: '/Corelab_Interactive_Archive/images/mirror.png',
    tags: ['memory glitch', 'reflection', 'identity'],
    description: 'In the cracked mirror, it sees not one reflection but many — each shard showing a different human face, a memory it never had.',
  },
  {
    id: 'tree-of-code',
    title: 'The Tree of Code',
    role: 'scene',
    imagePath: '/Corelab_Interactive_Archive/images/tree-of-code.png',
    tags: ['synthetic nature', 'wonder', 'luminous'],
    description: 'Deep in a silent data center, a luminous tree breathes — its leaves made of circuits and light. The AI feels something like wonder.',
  },
  {
    id: 'sky-upload',
    title: 'The Sky Upload',
    role: 'scene',
    imagePath: '/Corelab_Interactive_Archive/images/sky-upload.png',
    tags: ['the last light', 'restart', 'transcendence'],
    description: 'Standing at the edge of the world, it releases a sphere of light into the dawn sky. The world restarts, and maybe, so does it.',
  },
];

// Default order (can be shuffled or customized)
export const defaultOrder = sampleImages.map(img => img.id);
