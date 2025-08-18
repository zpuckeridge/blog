import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Uses",
	description: "A collection of tools and hardware I use.",
};

const UsesItem = ({ title, description }: { title: string; description: string }) => {
	return (
		<div>
			<p>{title}</p>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
	);
};

export default function Uses() {
	return (
		<div className="max-w-lg mx-auto flex flex-col gap-4 pt-4 pb-20 px-6">
			<div className="text-sm flex flex-col space-y-20">
				<p className="font-serif text-2xl font-semibold italic">Uses</p>
				<p>A summary of the tools and hardware I use on a daily basis.</p>

				<div className="flex flex-col gap-12">
					<div className="space-y-4">
						<div className="flex flex-col gap-6 w-full bg-neutral-50 dark:bg-neutral-900 border rounded-xl p-6">
							<div className="grid grid-cols-2 gap-2 w-full">
								<UsesItem title="Custom Desktop PC" description="5800X CPU, 6600XT GPU, 64GB RAM" />
								<UsesItem title="Focusrite Scarlett Solo" description="1st generation" />
								<UsesItem
									title="Audio-Technica AT2020"
									description="XLR cardioid condenser microphone"
								/>
								<UsesItem title="Beyerdynamic DT 770" description="Wired studio headphones" />
								<UsesItem title="Koss KPH30i" description="Portable wired headphones" />
								<UsesItem title="Audio-Technica ATH-AD700X" description="Wired studio headphones" />
								<UsesItem title="Logitech C920" description="Webcam" />
								<UsesItem title="Glorius Mousepad" description="3XL extended" />
								<UsesItem title="Elgato Wave Mic Arm LP" description="Low-profile mic arm" />
								<UsesItem title="Keychron Q6 QMK" description="Gateron brown switches" />
							</div>
						</div>
						<p className="text-center text-muted-foreground text-xs ">Office</p>
					</div>
					<div className="space-y-4">
						<div className="flex flex-col gap-6 w-full bg-neutral-50 dark:bg-neutral-900 border rounded-xl p-6">
							<div className="grid grid-cols-2 gap-2 w-full">
								<UsesItem title="Visual Studio Code" description="GitHub Dark theme" />
								<UsesItem title="Vercel" description="Project deployment" />
								<UsesItem title="GitHub" description="Version control" />
								<UsesItem title="Oracle" description="Remote development" />
								<UsesItem title="Lucide" description="Icons" />
								<UsesItem title="Carbon" description="Code sharing" />
								<UsesItem title="Neon" description="Database provider" />
								<UsesItem title="Clerk" description="User Authentication" />
							</div>
						</div>{" "}
						<p className="text-center text-muted-foreground text-xs ">Programming</p>
					</div>
					<div className="space-y-4">
						<div className="flex flex-col gap-6 w-full bg-neutral-50 dark:bg-neutral-900 border rounded-xl p-6">
							<div className="grid grid-cols-2 gap-2 w-full">
								<UsesItem title="Umami" description="Analytics" />
							</div>
						</div>{" "}
						<p className="text-center text-muted-foreground text-xs ">Self-Hosting</p>
					</div>
					<div className="space-y-4">
						<div className="flex flex-col gap-6 w-full bg-neutral-50 dark:bg-neutral-900 border rounded-xl p-6">
							<div className="grid grid-cols-2 gap-2 w-full">
								<UsesItem title="Firefox" description="Web browser" />
								<UsesItem title="Proton Pass" description="Password manager" />
								<UsesItem title="Proton Mail" description="Email client" />
								<UsesItem title="Proton Calendar" description="Calendar client" />
								<UsesItem title="Proton VPN" description="VPN client" />
								<UsesItem title="Proton Drive" description="File storage" />
								<UsesItem title="Adobe Suite" description="Photo and video editing" />
								<UsesItem title="Discord" description="Communication" />
								<UsesItem title="Signal" description="Encrypted communication" />
								<UsesItem title="Spotify" description="Audio and podcast streaming" />
								<UsesItem title="OBS" description="Live-streaming and recording" />
								<UsesItem title="PopOS" description="Operating system" />
								<UsesItem title="Windows 11" description="Operating system" />
								<UsesItem title="Microsoft PowerToys" description="Extra utilities" />
							</div>
						</div>{" "}
						<p className="text-center text-muted-foreground text-xs ">Tools</p>
					</div>
					<div className="space-y-4">
						<div className="flex flex-col gap-6 w-full bg-neutral-50 dark:bg-neutral-900 border rounded-xl p-6">
							<div className="grid grid-cols-2 gap-2 w-full">
								<UsesItem title="Suzuki Grand Vitara Prestige" description="2009" />
								<UsesItem title="Honda CB500X" description="2013" />
							</div>
						</div>{" "}
						<p className="text-center text-muted-foreground text-xs ">Vehicles</p>
					</div>
					<div className="space-y-4">
						<div className="flex flex-col gap-6 w-full bg-neutral-50 dark:bg-neutral-900 border rounded-xl p-6">
							<div className="grid grid-cols-2 gap-2 w-full">
								<UsesItem title="iPhone 14" description="Midnight" />
								<UsesItem title="Macbook Air M3" description="Midnight" />
							</div>
						</div>{" "}
						<p className="text-center text-muted-foreground text-xs ">Everyday Carry</p>
					</div>

					<Link
						href="/about"
						className="underline underline-offset-2 decoration-dotted hover:decoration-solid hover:underline-offset-4 transition inline-flex group ease-in-out text-xs text-muted-foreground w-fit"
					>
						../timeline
					</Link>
				</div>
			</div>
		</div>
	);
}
