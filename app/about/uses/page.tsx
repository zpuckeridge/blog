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
    <div className="max-w-md lg:mx-auto pb-10">
      <div className="text-sm flex flex-col gap-20">
        <div className="text-sm flex flex-col gap-2">
          <p className="font-serif text-2xl italic ">Uses</p>

          <p>A collection of tools and hardware I use regularly.</p>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <div>
            <p>Office</p>
            <hr className="w-full" />
          </div>
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
            <UsesItem title="Glorius Mousepad" description="3XL extended" />
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

        <div className="flex flex-col gap-6 w-full">
          <div>
            <p>Programming</p>
            <hr className="w-full" />
          </div>
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
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <div>
            <p>Self-Hosting</p>
            <hr className="w-full" />
          </div>
          <div className="grid grid-cols-2 gap-2 w-full">
            <UsesItem title="Plausible" description="Analytics" />
            <UsesItem title="Uptime Kuma" description="Status monitoring" />
            <UsesItem title="Pingvin Share" description="File sharing" />
            <UsesItem title="Memos" description="Note taking" />
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <div>
            <p>Tools</p>
            <hr className="w-full" />
          </div>
          <div className="grid grid-cols-2 gap-2 w-full">
            <UsesItem title="Firefox" description="Web browser" />
            <UsesItem title="Proton Pass" description="Password manager" />
            <UsesItem title="Proton Mail" description="Email client" />
            <UsesItem title="Proton Calendar" description="Calendar client" />
            <UsesItem title="Proton VPN" description="VPN client" />
            <UsesItem title="Proton Drive" description="File storage" />
            <UsesItem
              title="Adobe Suite"
              description="Photo and video editing"
            />
            <UsesItem title="Discord" description="Communication" />
            <UsesItem title="Signal" description="Encrypted communication" />
            <UsesItem
              title="Spotify"
              description="Audio and podcast streaming"
            />
            <UsesItem title="OBS" description="Live-streaming and recording" />
            <UsesItem title="PopOS" description="Operating system" />
            <UsesItem title="Windows 11" description="Operating system" />
            <UsesItem
              title="Microsoft PowerToys"
              description="Extra utilities"
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <div>
            <p>Vehicles</p>
            <hr className="w-full" />
          </div>
          <div className="grid grid-cols-2 gap-2 w-full">
            <UsesItem title="Suzuki Grand Vitara" description="2009" />
            <UsesItem title="Honda CB500X" description="2013" />
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <div>
            <p>EDC</p>
            <hr className="w-full" />
          </div>
          <div className="grid grid-cols-2 gap-2 w-full">
            <UsesItem
              title="Google Pixel 6 Pro"
              description="Charcoal, 128GB"
            />
            <UsesItem title="ASUS Zenbook" description={`14.5" OLED laptop`} />
          </div>
        </div>

        <Link
          href="/about"
          className="text-xs text-muted-foreground hover:text-violet-400"
        >
          <ArrowLeftIcon className="inline-flex" /> /about
        </Link>
      </div>
    </div>
  );
}
