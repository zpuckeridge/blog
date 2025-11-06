"use client";

import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";

const Subscribe: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success("Subscribed to new posts");
        setEmail("");
      } else {
        toast.error("Failed to subscribe. Please try again.");
      }
    } catch (_error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null; // or a loading placeholder
  }

  return (
    <div className="space-y-2">
      <form className="group relative flex" onSubmit={handleSubmit}>
        <div className="has-[+input:not(:placeholder-shown)):-translate-y-1/2 -translate-y-1/2 group-focus-within:-translate-y-1/2 pointer-events-none absolute top-1/2 z-1 block origin-start cursor-text px-1 text-muted-foreground text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:font-normal group-focus-within:text-black group-focus-within:text-xs has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:font-normal has-[+input:not(:placeholder-shown)]:text-xs has-[input:not(:placeholder-shown)]:text-black dark:has-[+input:not(:placeholder-shown)]:text-neutral-300 dark:group-focus-within:text-neutral-300">
          <span className="-top-[1px] relative inline-flex bg-background px-2 text-xs">
            Subscribe to receive new posts
          </span>
        </div>
        <Input
          className="-me-px flex-1 text-black text-xs shadow-none dark:text-neutral-300"
          onChange={(e) => setEmail(e.target.value)}
          placeholder=""
          required
          type="email"
          value={email}
        />

        <button
          className="absolute inset-y-px end-px my-auto flex h-full w-9 cursor-pointer items-center justify-center rounded-e-lg text-muted-foreground transition-all duration-200 hover:text-blue-400 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:hover:text-blue-600"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <PaperPlaneIcon />
          )}
        </button>
      </form>
    </div>
  );
};

export default Subscribe;
