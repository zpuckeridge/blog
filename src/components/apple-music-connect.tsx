import { useCallback, useEffect, useState } from "react";

interface AppleMusicConnectProps {
  connectSecret: string;
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

const AppleMusicConnect = ({
  connectSecret,
  developerToken,
}: AppleMusicConnectProps) => {
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
        Authorization: `Bearer ${connectSecret}`,
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

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm">
        Authorise Apple Music so the site can poll your recently played tracks
        when Discord is offline. This page is not linked from the site.
      </p>
      <button
        className="border border-black bg-black px-4 py-2 text-sm text-white disabled:opacity-50 dark:border-white dark:bg-white dark:text-black"
        disabled={busy || phase === "done" || !musicKitReady}
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
