import BackLink from "@/components/back-link";

const UsesItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div>
    <p>{title}</p>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

const UsesPage = () => (
  <div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pb-20">
    <div className="flex flex-col gap-y-20 text-sm">
      <div className="space-y-10">
        <div className="space-y-2">
          <h1 className="font-redaction text-black text-xl dark:text-white">
            Uses
          </h1>
          <p>A summary of the tools and hardware I use on a daily basis.</p>
        </div>

        <div className="flex flex-col gap-12">
          <div className="space-y-4">
            <div className="flex w-full flex-col gap-6 border bg-neutral-50 p-6 dark:bg-neutral-900">
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
            <p className="text-center text-muted-foreground text-sm">Office</p>
          </div>
          <div className="space-y-4">
            <div className="flex w-full flex-col gap-6 border bg-neutral-50 p-6 dark:bg-neutral-900">
              <div className="grid w-full grid-cols-2 gap-2">
                <UsesItem description="Code editor" title="Cursor" />
                <UsesItem description="Site framework" title="Astro" />
                <UsesItem
                  description="Project deployment"
                  title="Cloudflare Workers"
                />
                <UsesItem description="Version control" title="GitHub" />
                <UsesItem description="Content management" title="Directus" />
                <UsesItem description="Remote development" title="Oracle" />
                <UsesItem description="Code sharing" title="Carbon" />
              </div>
            </div>{" "}
            <p className="text-center text-muted-foreground text-sm">
              Programming
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex w-full flex-col gap-6 border bg-neutral-50 p-6 dark:bg-neutral-900">
              <div className="grid w-full grid-cols-2 gap-2">
                <UsesItem description="Product analytics" title="PostHog" />
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
            <p className="text-center text-muted-foreground text-sm">Tools</p>
          </div>
          <div className="space-y-4">
            <div className="flex w-full flex-col gap-6 border bg-neutral-50 p-6 dark:bg-neutral-900">
              <div className="grid w-full grid-cols-2 gap-2">
                <UsesItem
                  description="2009"
                  title="Suzuki Grand Vitara Prestige"
                />
                <UsesItem description="2013" title="Honda CB500X" />
              </div>
            </div>{" "}
            <p className="text-center text-muted-foreground text-sm">
              Vehicles
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex w-full flex-col gap-6 border bg-neutral-50 p-6 dark:bg-neutral-900">
              <div className="grid w-full grid-cols-2 gap-2">
                <UsesItem description="Midnight" title="iPhone 14" />
                <UsesItem description="Midnight" title="Macbook Air M3" />
              </div>
            </div>{" "}
            <p className="text-center text-muted-foreground text-sm">
              Everyday Carry
            </p>
          </div>
        </div>
      </div>

      <BackLink href="/about">../about</BackLink>
    </div>
  </div>
);

export default UsesPage;
