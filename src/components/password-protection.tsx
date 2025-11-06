"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PasswordProtectionProps = {
  children: React.ReactNode;
  password: string;
  title?: string;
  description?: string;
};

export default function PasswordProtection({
  children,
  password,
  title = "Protected Content",
  description = "Please enter the password to view this content.",
}: PasswordProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");

  // Check for existing authentication on component mount
  useEffect(() => {
    const storedAuth = sessionStorage.getItem(`auth_${password}`);
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === password) {
      setIsAuthenticated(true);
      setError("");
      // Store authentication state in sessionStorage
      sessionStorage.setItem(`auth_${password}`, "true");
    } else {
      setError("Incorrect password. Please try again.");
      setInputPassword("");
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pt-4 pb-20">
      <div className="flex flex-col space-y-20 text-sm">
        <div className="flex flex-col gap-2 text-sm">
          <p className="font-redaction text-white text-xl">{title}</p>
          <p>{description}</p>
        </div>

        <form className="flex w-full flex-col gap-2" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              className="bg-background"
              id="password"
              onChange={(e) => setInputPassword(e.target.value)}
              placeholder="Enter password"
              required
              type="password"
              value={inputPassword}
            />
            {error && <p className="text-destructive text-sm">{error}</p>}
          </div>

          <button
            className="group inline-flex w-fit cursor-pointer text-muted-foreground text-xs underline decoration-dotted underline-offset-2 transition ease-in-out hover:decoration-solid hover:underline-offset-4"
            type="submit"
          >
            Access Content
          </button>
        </form>
      </div>
    </div>
  );
}
