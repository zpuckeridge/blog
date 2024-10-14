import BlurFade from "@/components/magicui/blur-fade";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Uses",
  description: "A collection of tools and hardware I use.",
};

export default function Uses() {
  const UsesItem = ({ title, description }: any) => {
    return (
      <div>
        <p>{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    );
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-20 pb-20">
      <div className="text-sm flex flex-col gap-20">
        <BlurFade delay={0.1}>
          <p className="font-serif text-2xl italic ">Uses</p>
        </BlurFade>

        <BlurFade delay={0.2}>
          <p>A summary of the tools and hardware I use on a daily basis.</p>
        </BlurFade>

        <div className="flex flex-col gap-12">
          <BlurFade delay={0.3}>
            <div className="space-y-4">
              <div className="flex flex-col gap-6 w-full bg-neutral-50 dark:bg-neutral-900 border rounded-xl p-6">
                <div className="grid grid-cols-2 gap-2 w-full">
                  <UsesItem
                    title="Custom Desktop PC"
                    description="5800X CPU, 6600XT GPU, 64GB RAM"
                  />
                  <UsesItem
                    title="Focusrite Scarlett Solo"
                    description="1st generation"
                  />
                  <UsesItem
                    title="Audio-Technica AT2020"
                    description="XLR cardioid condenser microphone"
                  />
                  <UsesItem
                    title="Beyerdynamic DT 770"
                    description="Wired studio headphones"
                  />
                  <UsesItem
                    title="Koss KPH30i"
                    description="Portable wired headphones"
                  />
                  <UsesItem
                    title="Audio-Technica ATH-AD700X"
                    description="Wired studio headphones"
                  />
                  <UsesItem title="Logitech C920" description="Webcam" />
                  <UsesItem
                    title="Glorius Mousepad"
                    description="3XL extended"
                  />
                  <UsesItem
                    title="Elgato Wave Mic Arm LP"
                    description="Low-profile mic arm"
                  />
                  <UsesItem
                    title="Keychron Q6 QMK"
                    description="Gateron brown switches"
                  />
                </div>
              </div>
              <p className="text-center text-muted-foreground text-xs ">
                Office
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.4}>
            <div className="space-y-4">
              <div className="flex flex-col gap-6 w-full bg-neutral-50 dark:bg-neutral-900 border rounded-xl p-6">
                <div className="grid grid-cols-2 gap-2 w-full">
                  <UsesItem
                    title="Visual Studio Code"
                    description="GitHub Dark theme"
                  />
                  <UsesItem title="Vercel" description="Project deployment" />
                  <UsesItem title="GitHub" description="Version control" />
                  <UsesItem title="Oracle" description="Remote development" />
                  <UsesItem title="Lucide" description="Icons" />
                  <UsesItem title="Carbon" description="Code sharing" />
                  <UsesItem title="Neon" description="Database provider" />
                  <UsesItem title="Clerk" description="User Authentication" />
                </div>
              </div>{" "}
              <p className="text-center text-muted-foreground text-xs ">
                Programming
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.5}>
            <div className="space-y-4">
              <div className="flex flex-col gap-6 w-full bg-neutral-50 dark:bg-neutral-900 border rounded-xl p-6">
                <div className="grid grid-cols-2 gap-2 w-full">
                  <UsesItem title="Umami" description="Analytics" />
                </div>
              </div>{" "}
              <p className="text-center text-muted-foreground text-xs ">
                Self-Hosting
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.6}>
            <div className="space-y-4">
              <div className="flex flex-col gap-6 w-full bg-neutral-50 dark:bg-neutral-900 border rounded-xl p-6">
                <div className="grid grid-cols-2 gap-2 w-full">
                  <UsesItem title="Firefox" description="Web browser" />
                  <UsesItem
                    title="Proton Pass"
                    description="Password manager"
                  />
                  <UsesItem title="Proton Mail" description="Email client" />
                  <UsesItem
                    title="Proton Calendar"
                    description="Calendar client"
                  />
                  <UsesItem title="Proton VPN" description="VPN client" />
                  <UsesItem title="Proton Drive" description="File storage" />
                  <UsesItem
                    title="Adobe Suite"
                    description="Photo and video editing"
                  />
                  <UsesItem title="Discord" description="Communication" />
                  <UsesItem
                    title="Signal"
                    description="Encrypted communication"
                  />
                  <UsesItem
                    title="Spotify"
                    description="Audio and podcast streaming"
                  />
                  <UsesItem
                    title="OBS"
                    description="Live-streaming and recording"
                  />
                  <UsesItem title="PopOS" description="Operating system" />
                  <UsesItem title="Windows 11" description="Operating system" />
                  <UsesItem
                    title="Microsoft PowerToys"
                    description="Extra utilities"
                  />
                </div>
              </div>{" "}
              <p className="text-center text-muted-foreground text-xs ">
                Tools
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.7}>
            <div className="space-y-4">
              <div className="flex flex-col gap-6 w-full bg-neutral-50 dark:bg-neutral-900 border rounded-xl p-6">
                <div className="grid grid-cols-2 gap-2 w-full">
                  <UsesItem
                    title="Suzuki Grand Vitara Prestige"
                    description="2009"
                  />
                  <UsesItem title="Honda CB500X" description="2013" />
                </div>
              </div>{" "}
              <p className="text-center text-muted-foreground text-xs ">
                Vehicles
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.8}>
            <div className="space-y-4">
              <div className="flex flex-col gap-6 w-full bg-neutral-50 dark:bg-neutral-900 border rounded-xl p-6">
                <div className="grid grid-cols-2 gap-2 w-full">
                  <UsesItem
                    title="Google Pixel 6 Pro"
                    description="Charcoal, 128GB"
                  />
                  <UsesItem
                    title="ASUS Zenbook"
                    description={`14.5" OLED laptop`}
                  />
                </div>
              </div>{" "}
              <p className="text-center text-muted-foreground text-xs ">
                Everyday Carry
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.9}>
            <Link
              href="/about"
              className="text-xs text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition"
            >
              <ArrowLeftIcon className="inline-flex" /> /about
            </Link>
          </BlurFade>
        </div>
      </div>
    </div>
  );
}
