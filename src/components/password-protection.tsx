import { authenticateVideoAccess } from "@/app/videos/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordProtectionProps {
  error?: string | null;
  isConfigured?: boolean;
  redirectTo?: string;
  title?: string;
  description?: string;
}

const PasswordProtection = ({
  error = null,
  isConfigured = true,
  redirectTo = "/videos",
  title = "Protected Content",
  description = "Please enter the password to view this content.",
}: PasswordProtectionProps) => (
  <div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pt-4 pb-20">
    <div className="flex flex-col space-y-20 text-sm">
      <div className="flex flex-col gap-2 text-sm">
        <p className="font-redaction text-white text-xl">{title}</p>
        <p>{description}</p>
      </div>

      {isConfigured ? (
        <form
          className="flex w-full flex-col gap-2"
          action={authenticateVideoAccess}
        >
          <input name="redirectTo" type="hidden" value={redirectTo} />
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              className="bg-background"
              id="password"
              name="password"
              placeholder="Enter password"
              required
              type="password"
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
      ) : (
        <p className="text-destructive text-sm">
          Video access is temporarily unavailable.
        </p>
      )}
    </div>
  </div>
);

export default PasswordProtection;
