import Image from "next/image";
import Age from "../age";

export default function BackgroundSection() {
  return (
    <div className="flex flex-col gap-8 text-lg">
      <div>
        <div className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <p>
              I&apos;m a <Age /> year old Christian born and raised in Brisbane,
              Australia. From a young age, tinkering with computers quickly
              became second nature to me. Exploring self-hosted and custom built
              solutions has been a passion of mine for a while now. After
              graduating high school, I spent about 9 months studying a dual
              degree of Psychology and Criminology.
            </p>
            <p>
              I dropped that course and instead a close mate and I travelled to
              the United States for ~3 months working on a Methodist Summer Camp
              in Virginia meeting many wonderful people along the way! We ended
              our trip with a road trip across the country from Loudoun County
              Virginia to Los Angeles California.
            </p>
          </div>
          <div className="md:flex md:space-y-0 space-y-4 justify-center py-20">
            <Image
              src="/roadtrip/P1011186_qkrix9.webp"
              width={1000}
              height={1000}
              quality={100}
              priority
              alt=""
              className="w-60 h-full rounded-lg border-2 border-muted md:-rotate-[10deg] z-30 my-auto md:-mr-4 shadow-2xl mx-auto md:mx-0"
            />
            <Image
              src="/roadtrip/P1011348_ugskcv.webp"
              width={1000}
              height={1000}
              quality={100}
              priority
              alt=""
              className="w-96 h-full rounded-lg border-2 border-muted z-20 shadow-2xl mx-auto md:mx-0"
            />
            <Image
              src="/roadtrip/P1011152_t1mdns.webp"
              width={1000}
              height={1000}
              quality={100}
              priority
              alt=""
              className="w-72 h-full rounded-lg border-2 border-muted md:rotate-[7deg] z-30 my-auto md:-ml-10 md:mt-14 shadow-2xl mx-auto md:mx-0"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
