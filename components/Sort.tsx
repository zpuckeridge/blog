"use client";

import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

export default function Sort() {
  const [sort, setSort] = useState(true);

  return (
    <>
      <button
        className="flex justify-end text-[#888888] hover:text-black dark:hover:text-white transition duration-100"
        onClick={() => setSort(!sort)}
      >
        <ChevronsUpDown />
        {sort ? "Newest" : "Oldest"}
      </button>
    </>
  );
}
