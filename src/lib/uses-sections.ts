import type { UseItem } from "@/interfaces/content-item";

/** Directus category → display section (programming rolls into Tools). */
const USE_SECTION_KEY: Record<UseItem["category"], string> = {
  communication: "communication",
  everyday_carry: "everyday_carry",
  office: "office",
  programming: "tools",
  tools: "tools",
  vehicles: "vehicles",
};

const USE_SECTION_LABELS: Record<string, string> = {
  communication: "Comms",
  everyday_carry: "EDC",
  office: "Office",
  tools: "Tools",
  vehicles: "Vehicles",
};

export interface UsesSection {
  items: Pick<UseItem, "description" | "title">[];
  label: string;
}

export const buildUsesSections = (items: UseItem[]): UsesSection[] => {
  const sections = new Map<string, { sectionSort: number; items: UseItem[] }>();

  for (const item of items) {
    const sectionKey = USE_SECTION_KEY[item.category];
    const itemCategorySort = item.category_sort ?? Number.MAX_SAFE_INTEGER;
    const existing = sections.get(sectionKey);
    if (existing) {
      existing.items.push(item);
      existing.sectionSort = Math.min(existing.sectionSort, itemCategorySort);
    } else {
      sections.set(sectionKey, {
        items: [item],
        sectionSort: itemCategorySort,
      });
    }
  }

  return [...sections.entries()]
    .toSorted(([, a], [, b]) => a.sectionSort - b.sectionSort)
    .map(([sectionKey, { items: sectionItems }]) => ({
      items: sectionItems
        .toSorted((a, b) => {
          const categorySortA = a.category_sort ?? 0;
          const categorySortB = b.category_sort ?? 0;
          if (categorySortA !== categorySortB) {
            return categorySortA - categorySortB;
          }
          return (a.sort ?? 0) - (b.sort ?? 0);
        })
        .map(({ description, title }) => ({ description, title })),
      label: USE_SECTION_LABELS[sectionKey] ?? sectionKey,
    }));
};
