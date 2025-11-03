import type { DiffItem, DiffResult, DiffChangeType } from '../types/version';

/**
 * Compare two image orders and generate a diff
 * Identifies: moved, inserted, removed, and unchanged items
 */
export function calculateDiff(
  oldOrder: string[],
  newOrder: string[],
  fromVersionName: string = 'Previous',
  toVersionName: string = 'Current'
): DiffResult {
  const changes: DiffItem[] = [];
  const processedIds = new Set<string>();

  // Track items in both orders
  const oldSet = new Set(oldOrder);
  const newSet = new Set(newOrder);

  // Process items in new order
  newOrder.forEach((id, newIndex) => {
    const oldIndex = oldOrder.indexOf(id);

    if (oldIndex === -1) {
      // Item was inserted (exists in new but not in old)
      changes.push({
        id,
        type: 'inserted',
        newIndex,
      });
    } else if (oldIndex === newIndex) {
      // Item unchanged (same position)
      changes.push({
        id,
        type: 'unchanged',
        oldIndex,
        newIndex,
      });
    } else {
      // Item moved (exists in both but different position)
      changes.push({
        id,
        type: 'moved',
        oldIndex,
        newIndex,
      });
    }

    processedIds.add(id);
  });

  // Find removed items (in old but not in new)
  oldOrder.forEach((id, oldIndex) => {
    if (!newSet.has(id)) {
      changes.push({
        id,
        type: 'removed',
        oldIndex,
      });
    }
  });

  return {
    changes,
    fromVersion: fromVersionName,
    toVersion: toVersionName,
  };
}

/**
 * Get a summary of changes
 */
export function getDiffSummary(diff: DiffResult): {
  moved: number;
  inserted: number;
  removed: number;
  unchanged: number;
} {
  const summary = {
    moved: 0,
    inserted: 0,
    removed: 0,
    unchanged: 0,
  };

  diff.changes.forEach((change) => {
    summary[change.type]++;
  });

  return summary;
}

/**
 * Check if two orders are identical
 */
export function areOrdersEqual(order1: string[], order2: string[]): boolean {
  if (order1.length !== order2.length) return false;
  return order1.every((id, index) => id === order2[index]);
}
