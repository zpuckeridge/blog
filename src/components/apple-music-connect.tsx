import { useCallback, useEffect, useState } from "react";

interface AppleMusicConnectProps {
  developerToken: string | null;
}

type ConnectPhase = "idle" | "authorising" | "saving" | "done" | "error";

declare global {
  interface Window {
    MusicKit?: {
      configure: (config: {
        developerToken: string;
        app: { build: string; name: string };
      }) => Promise<MusicKitInstance>;
      getInstance: () => MusicKitInstance;
    };
  }
}

interface MusicKitInstance {
  authorize: () => Promise<string>;
  musicUserToken: string;
}

const connectButtonLabel = (
  phase: ConnectPhase,
  busy: boolean,
  musicKitReady: boolean
): string => {
  if (phase === "done") {
    return "Connected";
  }

  if (busy) {
    return "Working…";
  }

  if (!musicKitReady) {
    return "Loading MusicKit…";
  }

  return "Connect Apple Music";
};

const AppleMusicConnect = ({ developerToken }: AppleMusicConnectProps) => {
  const [connectSecret, setConnectSecret] = useState("");
  const [phase, setPhase] = useState<ConnectPhase>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [musicKitReady, setMusicKitReady] = useState(() =>
    Boolean(globalThis.window?.MusicKit)
  );

  useEffect(() => {
    if (musicKitReady) {
      return;
    }

    let frame = 0;
    let frameId = 0;
    const waitForMusicKit = () => {
      if (globalThis.window?.MusicKit) {
        setMusicKitReady(true);
        return;
      }

      frame += 1;
      if (frame < 240) {
        frameId = requestAnimationFrame(waitForMusicKit);
      }
    };

    frameId = requestAnimationFrame(waitForMusicKit);
    return () => cancelAnimationFrame(frameId);
  }, [musicKitReady]);

  const fail = useCallback(() => {
    setPhase("error");
    setMessage("Connection failed. Try again in a moment.");
  }, []);

  const connect = useCallback(async () => {
    const bearerSecret = connectSecret.trim();
    if (!bearerSecret) {
      setPhase("error");
      setMessage("Enter the connect secret for this environment.");
      return;
    }

    if (!developerToken) {
      setPhase("error");
      setMessage("Apple Music signing secrets are not configured.");
      return;
    }

    const musicKit = globalThis.window?.MusicKit;
    if (!musicKit) {
      setPhase("error");
      setMessage("MusicKit is still loading. Try again in a moment.");
      return;
    }

    setPhase("authorising");
    setMessage(null);

    await musicKit.configure({
      app: { build: "1.0.0", name: "Zacchary Blog" },
      developerToken,
    });
    const instance = musicKit.getInstance();
    const musicUserToken = await instance.authorize().catch(() => null);
    if (!musicUserToken) {
      fail();
      return;
    }

    setPhase("saving");
    const response = await fetch("/api/apple-music/connect", {
      body: JSON.stringify({ musicUserToken }),
      headers: {
        Authorization: `Bearer ${bearerSecret}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!response.ok) {
      fail();
      return;
    }

    setPhase("done");
    setMessage("Apple Music is connected. You can close this page.");
  }, [connectSecret, developerToken, fail]);

  const busy = phase === "authorising" || phase === "saving";
  const canConnect =
    connectSecret.trim().length > 0 &&
    !busy &&
    phase !== "done" &&
    musicKitReady;

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">
        Authorise Apple Music so the site can poll your recently played tracks
        when Discord is offline. This page is not linked from the site.
      </p>
      <div className="space-y-2">
        <label
          className="text-sm text-black dark:text-white"
          htmlFor="apple-music-connect-secret"
        >
          Connect secret
        </label>
        <input
          autoComplete="off"
          className="w-full border border-black bg-white px-3 py-2 text-sm text-black dark:border-white dark:bg-black dark:text-white"
          disabled={busy || phase === "done"}
          id="apple-music-connect-secret"
          onChange={(event) => {
            setConnectSecret(event.target.value);
          }}
          spellCheck={false}
          type="password"
          value={connectSecret}
        />
        <p className="text-muted-foreground text-xs">
          Paste the environment&apos;s Apple Music connect bearer secret. It is
          not stored in the browser.
        </p>
      </div>
      <button
        className="border border-black bg-black px-4 py-2 text-sm text-white disabled:opacity-50 dark:border-white dark:bg-white dark:text-black"
        disabled={!canConnect}
        onClick={() => {
          void connect();
        }}
        type="button"
      >
        {connectButtonLabel(phase, busy, musicKitReady)}
      </button>
      {message ? (
        <p aria-live="polite" className="text-sm">
          {message}
        </p>
      ) : null}
    </div>
  );
};

export default AppleMusicConnect;
