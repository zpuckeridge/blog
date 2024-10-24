"use client";

import { useToast } from "@/components/ui/use-toast";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Input } from "./ui/input";

const Subscribe: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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

  return (
    <div className="space-y-2">
      <form onSubmit={handleSubmit} className="flex group relative">
        <label className="z-[1] pointer-events-none has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)):-translate-y-1/2 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:-translate-y-1/2 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground">
          <span className="inline-flex text-xs bg-background px-2 relative -top-[1px]">
            Enter your email address
          </span>
        </label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder=""
          required
          className="-me-px text-xs flex-1 shadow-none "
        />

        <button
          type="submit"
          disabled={isLoading}
          className="absolute inset-y-px end-px flex h-full w-9 my-auto items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
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

// import { Label } from "@/components/ui/label";

// export default function Input21() {
//   return (
//     <div className="space-y-2">
//       <Label htmlFor="input-21">Input with end button</Label>
//       <div className="flex rounded-lg shadow-sm shadow-black/[.04]">
//         <Input
//           id="input-21"
//           className="-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
//           placeholder="Email"
//           type="email"
//         />
//         <button className="inline-flex items-center rounded-e-lg border border-input bg-background px-3 text-sm font-medium text-foreground ring-offset-background transition-shadow hover:bg-accent hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// import { Input } from "@/components/ui/input";

// export default function Input32() {
//   return (
//     <div className="group relative">
//       <label
//         htmlFor="input-32"
//         className="has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)):-translate-y-1/2 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-foreground origin-start absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-muted-foreground/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:-translate-y-1/2 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-foreground"
//       >
//         <span className="inline-flex bg-background px-2">
//           Input with label animation
//         </span>
//       </label>
//       <Input id="input-32" type="email" placeholder="" />
//     </div>
//   );
// }

// Dependencies: npm install lucide-react

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Send } from "lucide-react";

// export default function Input19() {
//   return (
//     <div className="space-y-2">
//       <Label htmlFor="input-19">Input with end inline button</Label>
//       <div className="relative">
//         <Input id="input-19" className="pe-9" placeholder="Email" type="email" />
//         <button
//           className="absolute inset-y-px end-px flex h-full w-9 items-center justify-center rounded-e-lg border border-transparent text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
//           aria-label="Subscribe"
//         >
//           <Send size={16} strokeWidth={2} aria-hidden="true" />
//         </button>
//       </div>
//     </div>
//   );
// }
