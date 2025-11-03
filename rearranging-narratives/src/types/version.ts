// Version/Cut data structure
export interface Version {
  id: string;
  name: string;
  imageOrder: string[];
  createdAt: Date;
  description?: string;
}

// Diff change types
export type DiffChangeType = 'moved' | 'inserted' | 'removed' | 'unchanged';

// Diff item representing a change between versions
export interface DiffItem {
  id: string;
  type: DiffChangeType;
  oldIndex?: number;  // Position in old version
  newIndex?: number;  // Position in new version
}

// Complete diff result
export interface DiffResult {
  changes: DiffItem[];
  fromVersion: string;
  toVersion: string;
}
