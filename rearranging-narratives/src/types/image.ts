// Image fragment data structure
export interface ImageFragment {
  id: string;
  title: string;
  role?: string; // e.g., "character", "scene", "fragment"
  imagePath: string;
  tags?: string[];
  description?: string;
}

// Metadata for authorship tracking (for future phases)
export interface FragmentMetadata {
  source: 'user' | 'ai';
  createdAt: Date;
  modifiedAt?: Date;
  narration?: string;
}
