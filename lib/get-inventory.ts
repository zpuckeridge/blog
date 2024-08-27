import { Inventory } from "@/interfaces/item";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const inventoryDirectory = join(process.cwd(), "_inventory");

export function getInventorySlugs() {
  return fs.readdirSync(inventoryDirectory);
}

export function getInventoryBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(inventoryDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return { ...data } as Inventory;
}

export function getAllInventory(): Inventory[] {
  const slugs = getInventorySlugs();
  const inventory = slugs
    .map((slug) => getInventoryBySlug(slug))
    .sort((item1, item2) => (item1.date > item2.date ? -1 : 1));
  return inventory;
}
