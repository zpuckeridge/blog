const directusRelationLabel = (item: unknown): string => {
  if (typeof item === "string") {
    return item;
  }
  if (typeof item === "object" && item !== null) {
    const obj = item as Record<string, unknown>;
    return (
      (obj.name as string) ||
      (obj.title as string) ||
      (obj.value as string) ||
      String(item)
    );
  }
  return String(item);
};

/** Format a Directus relation field (string, object, or list) for display. */
export const formatDirectusRelationList = function formatDirectusRelationList(
  value: unknown
): string {
  if (Array.isArray(value)) {
    const processedItems = value.map(directusRelationLabel);
    if (processedItems.length === 2) {
      return processedItems.join(" & ");
    }
    return processedItems.join(", ");
  }
  if (typeof value === "object" && value !== null) {
    return directusRelationLabel(value);
  }
  return String(value);
};
