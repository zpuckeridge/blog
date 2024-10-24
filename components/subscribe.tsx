"use client";

import { useToast } from "@/components/ui/use-toast";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";

const Subscribe: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

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

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success!",
          description: data.message,
        });
        setEmail("");
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to subscribe. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null; // or a loading placeholder
  }

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="flex group relative">
        <label className="z-[1] pointer-events-none has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)):-translate-y-1/2 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-normal dark:has-[+input:not(:placeholder-shown)]:text-neutral-300 has-[input:not(:placeholder-shown)]:text-black origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:-translate-y-1/2 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-normal group-focus-within:text-black dark:group-focus-within:text-neutral-300">
          <span className="inline-flex text-xs bg-background px-2 relative -top-[1px]">
            Enter your email address to subscribe to new posts
          </span>
        </label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder=""
          required
          className="-me-px text-xs flex-1 shadow-none text-black dark:text-neutral-300"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="absolute text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition-all duration-300 inset-y-px end-px flex h-full w-9 my-auto items-center justify-center rounded-e-lg disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            <PaperPlaneIcon />
          )}
        </button>
      </form>
    </div>
  );
};

export default Subscribe;
