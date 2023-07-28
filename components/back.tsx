"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Back() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Button variant="ghost" onClick={handleBackClick}>
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back
    </Button>
  );
}
