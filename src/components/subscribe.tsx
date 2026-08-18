import type React from "react";
import { useCallback, useState, useTransition } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { RxPaperPlane } from "react-icons/rx";
import { toast } from "sonner";

import { useMounted } from "@/hooks/use-mounted";

import { Input } from "./ui/input";

const Subscribe: React.FC = () => {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusTone, setStatusTone] = useState<"ok" | "error" | null>(null);
  const [isPending, startTransition] = useTransition();
  const isMounted = useMounted();

  const sendSubscribeRequest = useCallback(async () => {
    try {
      const response = await fetch("/api/subscribe", {
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const payload = (await response.json()) as { error?: string };
      if (response.ok) {
        const message = "Subscribed to new posts";
        toast.success(message);
        setStatusMessage(message);
        setStatusTone("ok");
        setEmail("");
      } else {
        const message =
          payload.error || "Failed to subscribe. Please try again.";
        toast.error(message);
        setStatusMessage(message);
        setStatusTone("error");
      }
    } catch {
      const message = "An error occurred. Please try again later.";
      toast.error(message);
      setStatusMessage(message);
      setStatusTone("error");
    }
  }, [email]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      startTransition(async () => {
        await sendSubscribeRequest();
      });
    },
    [sendSubscribeRequest, startTransition]
  );

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    []
  );

  if (!isMounted) {
    return null;
  }

  let statusClassName = "sr-only";
  if (statusMessage && statusTone === "error") {
    statusClassName = "text-destructive text-sm";
  } else if (statusMessage) {
    statusClassName = "text-muted-foreground text-sm";
  }

  return (
    <div className="space-y-2" suppressHydrationWarning>
      <form className="group relative flex" onSubmit={handleSubmit}>
        <label
          className="has-[+input:not(:placeholder-shown)):-translate-y-1/2 pointer-events-none absolute top-1/2 z-1 block origin-start -translate-y-1/2 cursor-text px-1 text-muted-foreground text-sm transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:-translate-y-1/2 group-focus-within:cursor-default group-focus-within:font-normal group-focus-within:text-black group-focus-within:text-sm has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:font-normal has-[+input:not(:placeholder-shown)]:text-sm has-[input:not(:placeholder-shown)]:text-black dark:has-[+input:not(:placeholder-shown)]:text-neutral-300 dark:group-focus-within:text-neutral-300"
          htmlFor="subscribe-email"
        >
          <span className="relative -top-[1px] inline-flex bg-background px-2 text-sm">
            Subscribe to receive new posts
          </span>
        </label>
        <Input
          autoComplete="email"
          className="-me-px flex-1 pe-10 text-black text-sm shadow-none dark:text-neutral-300"
          id="subscribe-email"
          maxLength={254}
          name="email"
          onChange={handleEmailChange}
          placeholder=""
          required
          type="email"
          value={email}
        />

        <button
          aria-label="Subscribe"
          className="absolute inset-y-0 end-0 flex w-9 cursor-pointer items-center justify-center text-muted-foreground transition-colors duration-200 hover:text-blue-400 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:hover:text-blue-600"
          disabled={isPending}
          type="submit"
        >
          {isPending ? (
            <LuLoaderCircle className="size-4 animate-spin" />
          ) : (
            <RxPaperPlane className="size-4" />
          )}
        </button>
      </form>
      <output
        className={statusClassName}
        role={statusTone === "error" ? "alert" : undefined}
      >
        {statusMessage}
      </output>
    </div>
  );
};

export default Subscribe;
