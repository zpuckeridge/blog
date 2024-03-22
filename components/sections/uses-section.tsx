import { Separator } from "@/components/ui/separator";

export default function UsesSection() {
  const UsesItem = ({ title, description }: any) => {
    return (
      <div>
        <h3>{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    );
  };

  return (
    <>
      <div className="space-y-8">
        <div className="md:grid space-y-4 md:space-y-0 grid-cols-2 gap-12 w-full">
          <h2 className="text-2xl font-semibold">Office</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
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

        <Separator />

        <div className="md:grid space-y-4 md:space-y-0 grid-cols-2 gap-12 w-full">
          <h2 className="text-2xl font-semibold">Programming</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
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

        <Separator />

        <div className="md:grid space-y-4 md:space-y-0 grid-cols-2 gap-12 w-full">
          <h2 className="text-2xl font-semibold">Self-Hosting</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
            <UsesItem title="Plausible" description="Analytics" />
            <UsesItem title="Uptime Kuma" description="Status monitoring" />
            <UsesItem title="Pingvin Share" description="File sharing" />
            <UsesItem title="Memos" description="Note taking" />
          </div>
        </div>

        <Separator />

        <div className="md:grid space-y-4 md:space-y-0 grid-cols-2 gap-12 w-full">
          <h2 className="text-2xl font-semibold">Tools</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
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

        <Separator />

        <div className="md:grid space-y-4 md:space-y-0 grid-cols-2 gap-12 w-full">
          <h2 className="text-2xl font-semibold">Vehicles</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3  gap-4 w-full">
            <UsesItem title="Land Rover Discovery 1" description="1997" />
            <UsesItem title="Honda CB500X" description="2013" />
          </div>
        </div>

        <Separator />

        <div className="md:grid space-y-4 md:space-y-0 grid-cols-2 gap-12 w-full">
          <h2 className="text-2xl font-semibold">Every Day Carry</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3  gap-4 w-full">
            <UsesItem
              title="Google Pixel 6 Pro"
              description="Charcoal, 128GB"
            />
            <UsesItem title="ASUS Zenbook" description={`14.5" OLED laptop`} />
          </div>
        </div>
      </div>
    </>
  );
}
