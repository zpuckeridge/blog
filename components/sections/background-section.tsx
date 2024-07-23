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
                className="font-semibold underline decoration-wavy decoration-[0.5px] decoration-sky-700 hover:decoration-sky-500"
              >
                Reformed Baptist
              </a>{" "}
              born and raised in{" "}
              <a
                href="https://maps.app.goo.gl/BikC7wpFxkio2f7A8"
                target="_blank"
                className="font-semibold underline decoration-wavy decoration-[0.5px] decoration-sky-700 hover:decoration-sky-500"
              >
                Australia 🇦🇺
              </a>
              . Since childhood, I&apos;ve had a natural affinity for computers,
              diving deep into video games, tinkering and taking apart old
              computers. After graduating high school, I spent about 9 months
              studying a dual degree of Psychology and Criminology.
            </p>
            <p>
              I dropped out of university and travelled to the{" "}
              <a
                href="https://maps.app.goo.gl/7c5H8i3cnLwPFmKq9"
                target="_blank"
                className="font-semibold underline decoration-wavy decoration-[0.5px] decoration-sky-700 hover:decoration-sky-500"
              >
                United States 🇺🇸
              </a>{" "}
              for about 3 months, working at a Methodist Summer Camp in Virginia
              with a mate. We met many wonderful people along the way! We ended
              our trip with a road trip across the country from Loudoun County
              Virginia to Los Angeles California.
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
              After coming back from the United States, I landed a job
              supporting a small web hosting company, thanks to a connection
              through my friend&apos;s brother. It was there that my enthusiasm
              for web development and self-hosting took off.
            </p>
            <p>
              I&apos;ve explored Proxmox, Docker, Kubernetes, and more, finding
              satisfaction in using open-source software to build and host
              applications. Nowadays, I&apos;m all about web development, that
              software being - JavaScript, NextJS, and TailwindCSS.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
