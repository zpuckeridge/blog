import { getAllInventory } from "@/lib/get-inventory";
import Image from "next/image";

export default function Inventory() {
  const inventory = getAllInventory();

  return (
    <div className="grid grid-cols-6 gap-1">
      {inventory.map((inventory: any) => (
        <div key={inventory.slug} className="aspect-square bg-neutral-900 p-4">
          <Image
            src={inventory.image}
            alt={inventory.item}
            width={200}
            height={200}
          />
        </div>
      ))}
    </div>
  );
}
