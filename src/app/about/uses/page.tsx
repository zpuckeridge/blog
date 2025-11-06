import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Uses",
  description: "A collection of tools and hardware I use.",
};

const UsesItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div>
    <p>{title}</p>
    <p className="text-muted-foreground text-xs">{description}</p>
  </div>
);

export default function Uses() {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pt-4 pb-20">
      <div className="flex flex-col space-y-20 text-sm">
        <p className="font-redaction text-white text-xl">Uses</p>
        <p>A summary of the tools and hardware I use on a daily basis.</p>

        <div className="flex flex-col gap-12">
          <div className="space-y-4">
            <div className="flex w-full flex-col gap-6 rounded-xl border bg-neutral-50 p-6 dark:bg-neutral-900">
              <div className="grid w-full grid-cols-2 gap-2">
                <UsesItem
                  description="5800X CPU, 6600XT GPU, 64GB RAM"
                  title="Custom Desktop PC"
                />
                <UsesItem
                  description="1st generation"
                  title="Focusrite Scarlett Solo"
                />
                <UsesItem
                  description="XLR cardioid condenser microphone"
                  title="Audio-Technica AT2020"
                />
                <UsesItem
                  description="Wired studio headphones"
                  title="Beyerdynamic DT 770"
                />
                <UsesItem
                  description="Portable wired headphones"
                  title="Koss KPH30i"
                />
                <UsesItem
                  description="Wired studio headphones"
                  title="Audio-Technica ATH-AD700X"
                />
                <UsesItem description="Webcam" title="Logitech C920" />
                <UsesItem description="3XL extended" title="Glorius Mousepad" />
                <UsesItem
                  description="Low-profile mic arm"
                  title="Elgato Wave Mic Arm LP"
                />
                <UsesItem
                  description="Gateron brown switches"
                  title="Keychron Q6 QMK"
                />
              </div>
            </div>
            <p className="text-center text-muted-foreground text-xs">Office</p>
          </div>
          <div className="space-y-4">
            <div className="flex w-full flex-col gap-6 rounded-xl border bg-neutral-50 p-6 dark:bg-neutral-900">
              <div className="grid w-full grid-cols-2 gap-2">
                <UsesItem
                  description="GitHub Dark theme"
                  title="Visual Studio Code"
                />
                <UsesItem description="Project deployment" title="Vercel" />
                <UsesItem description="Version control" title="GitHub" />
                <UsesItem description="Remote development" title="Oracle" />
                <UsesItem description="Icons" title="Lucide" />
                <UsesItem description="Code sharing" title="Carbon" />
                <UsesItem description="Database provider" title="Neon" />
                <UsesItem description="User Authentication" title="Clerk" />
              </div>
            </div>{" "}
            <p className="text-center text-muted-foreground text-xs">
              Programming
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex w-full flex-col gap-6 rounded-xl border bg-neutral-50 p-6 dark:bg-neutral-900">
              <div className="grid w-full grid-cols-2 gap-2">
                <UsesItem description="Analytics" title="Umami" />
              </div>
            </div>{" "}
            <p className="text-center text-muted-foreground text-xs">
              Self-Hosting
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex w-full flex-col gap-6 rounded-xl border bg-neutral-50 p-6 dark:bg-neutral-900">
              <div className="grid w-full grid-cols-2 gap-2">
                <UsesItem description="Web browser" title="Firefox" />
                <UsesItem description="Password manager" title="Proton Pass" />
                <UsesItem description="Email client" title="Proton Mail" />
                <UsesItem
                  description="Calendar client"
                  title="Proton Calendar"
                />
                <UsesItem description="VPN client" title="Proton VPN" />
                <UsesItem description="File storage" title="Proton Drive" />
                <UsesItem
                  description="Photo and video editing"
                  title="Adobe Suite"
                />
                <UsesItem description="Communication" title="Discord" />
                <UsesItem
                  description="Encrypted communication"
                  title="Signal"
                />
                <UsesItem
                  description="Audio and podcast streaming"
                  title="Spotify"
                />
                <UsesItem
                  description="Live-streaming and recording"
                  title="OBS"
                />
                <UsesItem description="Operating system" title="PopOS" />
                <UsesItem description="Operating system" title="Windows 11" />
                <UsesItem
                  description="Extra utilities"
                  title="Microsoft PowerToys"
                />
              </div>
            </div>{" "}
            <p className="text-center text-muted-foreground text-xs">Tools</p>
          </div>
          <div className="space-y-4">
            <div className="flex w-full flex-col gap-6 rounded-xl border bg-neutral-50 p-6 dark:bg-neutral-900">
              <div className="grid w-full grid-cols-2 gap-2">
                <UsesItem
                  description="2009"
                  title="Suzuki Grand Vitara Prestige"
                />
                <UsesItem description="2013" title="Honda CB500X" />
              </div>
            </div>{" "}
            <p className="text-center text-muted-foreground text-xs">
              Vehicles
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex w-full flex-col gap-6 rounded-xl border bg-neutral-50 p-6 dark:bg-neutral-900">
              <div className="grid w-full grid-cols-2 gap-2">
                <UsesItem description="Midnight" title="iPhone 14" />
                <UsesItem description="Midnight" title="Macbook Air M3" />
              </div>
            </div>{" "}
            <p className="text-center text-muted-foreground text-xs">
              Everyday Carry
            </p>
          </div>

          <Link
            className="group inline-flex w-fit text-muted-foreground text-xs underline decoration-dotted underline-offset-2 transition ease-in-out hover:decoration-solid hover:underline-offset-4"
            href="/about"
          >
            ../timeline
          </Link>
        </div>
      </div>
    </div>
  );
}
