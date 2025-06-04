// Simple in-memory store for active viewers
const activeViewers = new Set<string>();

export function addViewer(id: string) {
  activeViewers.add(id);
  return activeViewers.size;
}

export function removeViewer(id: string) {
  activeViewers.delete(id);
  return activeViewers.size;
}

export function getActiveViewerCount() {
  return activeViewers.size;
}
