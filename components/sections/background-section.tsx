import Image from "next/image";
import Age from "../age";

export default function BackgroundSection() {
  return (
    <div className="flex flex-col gap-8 text-lg leading-8">
      <div>
        <div className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b pb-20">
            <p>
              I&apos;m a <Age /> year old{" "}
              <a
                href="https://1689londonbaptistconfession.com/"
                target="_blank"
                className="font-semibold underline decoration-wavy decoration-[0.5px] decoration-sky-700 hover:decoration-sky-500 transition-all duration-200"
              >
                Reformed Baptist
              </a>{" "}
              born and raised in{" "}
              <a
                href="https://maps.app.goo.gl/BikC7wpFxkio2f7A8"
                target="_blank"
                className="font-semibold underline decoration-wavy decoration-[0.5px] decoration-sky-700 hover:decoration-sky-500 transition-all duration-200"
              >
                Australia 🇦🇺
              </a>
              . From a young age, tinkering with computers quickly became second
              nature to me. Exploring self-hosted and custom built solutions has
              been a passion of mine for a while now. After graduating high
              school, I spent about 9 months studying a dual degree of
              Psychology and Criminology.
            </p>
            <p>
              I dropped that course and instead a close mate and I travelled to
              the{" "}
              <a
                href="https://maps.app.goo.gl/7c5H8i3cnLwPFmKq9"
                target="_blank"
                className="font-semibold underline decoration-wavy decoration-[0.5px] decoration-sky-700 hover:decoration-sky-500 transition-all duration-200"
              >
                United States 🇺🇸
              </a>{" "}
              for ~3 months working on a Methodist Summer Camp in Virginia
              meeting many wonderful people along the way! We ended our trip
              with a road trip across the country from Loudoun County Virginia
              to Los Angeles California.
            </p>
          </div>
          <div className="md:flex md:space-y-0 space-y-4 justify-center py-20 px-8">
            <div className="md:-mr-64 md:mt-40 md:rotate-[2deg]">
              <Image
                src="/roadtrip/Friendsville.jpg"
                width={1000}
                height={1000}
                priority
                alt="Group photo in front of a sign that reads FRIENDSVILLE in Friendsville, Virginia"
                className="w-full md:w-48 rounded-lg border-2 border-muted  z-10 shadow-2xl mx-auto md:mx-0"
              />
              <p className="text-xs text-muted-foreground text-right py-1">
                Friendsville, Virginia
              </p>
            </div>
            <div className="md:-mr-6 md:mt-20 md:-rotate-[10deg]">
              <Image
                src="/roadtrip/P1011186_qkrix9.webp"
                width={1000}
                height={1000}
                priority
                alt="Somewhere in Colorado"
                className="w-full md:w-60 rounded-lg border-2 border-muted  z-30 shadow-2xl mx-auto md:mx-0"
              />
              <p className="text-xs text-muted-foreground py-1">Colorado</p>
            </div>
            <div>
              <Image
                src="/roadtrip/P1011435_hgzmov.jpg"
                width={1000}
                height={1000}
                priority
                alt="Somewhere in the Grand Canyon"
                className="w-full md:w-96 rounded-lg border-2 border-muted z-20 shadow-2xl mx-auto md:mx-0"
              />
              <p className="text-xs text-muted-foreground text-center py-1">
                Grand Canyon
              </p>
            </div>
            <div className="md:-ml-4 md:mt-20 md:rotate-[7deg]">
              <Image
                src="/roadtrip/P1011152_t1mdns.webp"
                width={1000}
                height={1000}
                priority
                alt="Somewhere in the middle of the United States"
                className="w-full md:w-72 rounded-lg border-2 border-muted  z-30 shadow-2xl mx-auto md:mx-0"
              />
              <p className="text-xs text-muted-foreground text-right py-1">
                where the heck is this? 👀
              </p>
            </div>
            <div className="md:-ml-[22rem] md:pt-40 md:-rotate-[3deg]">
              <Image
                src="/roadtrip/P1011212_xh4oep.jpg"
                width={1000}
                height={1000}
                priority
                alt="Picture of rock formations in Arizona"
                className="w-full md:w-48 rounded-lg border-2 border-muted  z-40 shadow-2xl mx-auto md:mx-0"
              />
              <p className="text-xs text-muted-foreground text-right py-1">
                Arizona
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-20">
            <p>
              After returning from the United States, my mates brother hooked me
              up with a job providing support for a small web hosting company
              shortly after I got back. That&apos;s where my passion for web
              development and self-hosting really took off.
            </p>
            <p>
              Everything from Proxmox to Docker, to Kubernetes, I was tinkering
              with it. There is something incredibly satisfying using Open
              Source software to build and host your own applications. Nowadays,
              it&apos;s JavaScript, NextJS and TailwindCSS!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
