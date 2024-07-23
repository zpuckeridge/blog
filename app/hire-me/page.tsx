import TypewriterEffectHireMe from "@/components/typewriter-hire-me";
import { CalendarIcon, CheckIcon } from "@radix-ui/react-icons";
import { FaInfinity } from "react-icons/fa6";

export default function HireMe() {
  return (
    <div className="max-w-md lg:mx-auto flex flex-col gap-20 pb-20">
      <div className="space-y-2 z-30">
        <div className="rounded-md border-2 bg-background max-w-96 md:w-96 w-full mx-auto h-auto p-4 md:p-8 space-y-8">
          <p className="uppercase font-mono text-center font-semibold">
            Entry Level
          </p>
          <div className="space-y-2">
            <p className="font-bold text-6xl leading-none text-center">$2000</p>
            <div>
              <p className="text-center text-xs text-muted-foreground leading-snug">
                for a single page site
              </p>
              <p className="text-muted-foreground text-xs text-center">
                + $25/m for maintenance
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <ul className="text-sm">
              <li className="flex gap-2">
                <CheckIcon className="w-5 h-5 my-auto text-green-500" />
                Unlimited revisions
              </li>
              <li className="flex gap-2">
                <CheckIcon className="w-5 h-5 my-auto text-green-500" />
                3-5 day turnaround time
              </li>
              <li className="flex gap-2">
                <CheckIcon className="w-5 h-5 my-auto text-green-500" />
                Slack and email updates
              </li>
              <li className="flex gap-2">
                <CheckIcon className="w-5 h-5 my-auto text-green-500" />
                Access to source code
              </li>
              <li className="flex gap-2">
                <CheckIcon className="w-5 h-5 my-auto text-green-500" />
                Responsive design
              </li>
              <li className="flex gap-2">
                <CheckIcon className="w-5 h-5 my-auto text-green-500" />
                24/hr support turnaround
              </li>
              <li className="flex gap-2">
                <CheckIcon className="w-5 h-5 my-auto text-green-500" />
                Next.js / TailwindCSS
              </li>
              <li className="flex gap-2">
                <CheckIcon className="w-5 h-5 my-auto text-green-500" />
                Payments via Stripe
              </li>
            </ul>
          </div>
          <a
            href="https://cal.com/zpuckeridge"
            target="_blank"
            className="flex justify-center gap-2 font-mono uppercase text-sm font-semibold my-auto bg-neutral-900 hover:bg-neutral-800 border-2 px-2 py-1"
          >
            <CalendarIcon className="inline-block w-4 h-4" /> Schedule a Call
          </a>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          Simple pricing, no hidden fees.
        </p>
      </div>

      <div className="space-y-20">
        <div className="max-w-4xl mx-auto z-50 bg-background border-2 p-8 rounded-md md:flex justify-between space-y-6 md:space-y-0 w-full">
          <div className="space-y-4 md:border-r w-full">
            <p className="uppercase text-center font-mono text-muted-foreground text-sm">
              Projects Completed
            </p>
            <p className="font-bold text-6xl leading-none text-center">5</p>
          </div>
          <div className="space-y-4 w-full">
            <p className="uppercase text-center font-mono text-muted-foreground text-sm">
              Revisions
            </p>
            <p className="font-bold text-6xl leading-none text-center">
              <FaInfinity className="mx-auto" />
            </p>
          </div>
          <div className="space-y-4 md:border-l w-full">
            <p className="uppercase text-center font-mono text-muted-foreground text-sm">
              Years of Experience
            </p>
            <p className="font-bold text-6xl leading-none text-center">4</p>
          </div>
        </div>

        <div className="md:flex gap-10 max-w-3xl mx-auto md:space-y-0 space-y-6">
          <div className="md:w-2/5 ">
            <p className="font-bold text-2xl leading-tight">
              Commence your voyage to digital greatness now!
            </p>
          </div>
          <div className="space-y-6 md:w-3/5 text-muted-foreground">
            <p>
              Turn your ideas into reality with a modern, performant, and
              accessible website. I&apos;ll work with you to design and build a
              website that reflects your brand and resonates with your audience.
            </p>
            <p>
              A strong online identity is essential for any business. It can
              make or break your business. Entrust your website to me and
              I&apos;ll work with you to ensure your website is a success.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 border-2 p-8 rounded-md">
              <p className="text-6xl font-bold font-mono">01</p>
              <div className="space-y-1">
                <p className="text-2xl font-bold leading-none tracking-tight">
                  Initial Consultation
                </p>
                <p className="text-muted-foreground font-mono text-xs uppercase">
                  1-2 hours
                </p>
              </div>
              <p className="text-muted-foreground">
                We&apos;ll discuss your goals, requirements, budget and timeline
                to ensure we&apos;re on the same page. We&apos;ll review mood
                board to ensure I understand your vision.
              </p>
            </div>
            <div className="space-y-4 border-2 p-8 rounded-md">
              <p className="text-6xl font-bold font-mono">02</p>
              <div className="space-y-1">
                <p className="text-2xl font-bold leading-none tracking-tight">
                  Audit & Competitor Analysis
                </p>
                <p className="text-muted-foreground font-mono text-xs uppercase">
                  3 days
                </p>
              </div>
              <p className="text-muted-foreground">
                I&apos;ll audit your existing resources and outline any
                recommendations for improvement. I&apos;ll also analyse your
                competitors to identify opportunities for improvement.
              </p>
            </div>
            <div className="space-y-4 border-2 p-8 rounded-md">
              <p className="text-6xl font-bold font-mono">03</p>
              <div className="space-y-1">
                <p className="text-2xl font-bold leading-none tracking-tight">
                  Proposal
                </p>
                <p className="text-muted-foreground font-mono text-xs uppercase">
                  3 days
                </p>
              </div>
              <p className="text-muted-foreground">
                I&apos;ll outline a quote tailored to meet your objectives. If
                your requirements extend beyond a single page, we can negotiate
                pricing based on the scope of work.
              </p>
            </div>
            <div className="space-y-4 border-2 p-8 rounded-md">
              <p className="text-6xl font-bold font-mono">04</p>
              <div className="space-y-1">
                <p className="text-2xl font-bold leading-none tracking-tight">
                  Design Mockup
                </p>
                <p className="text-muted-foreground font-mono text-xs uppercase">
                  1-2 weeks
                </p>
              </div>
              <p className="text-muted-foreground">
                I&apos;ll begin by crafting a mockup based on your requirements.
                Upon your approval, I&apos;ll transition seamlessly into the
                development phase, bringing the approved design to life.
              </p>
            </div>
            <div className="space-y-4 border-2 p-8 rounded-md">
              <p className="text-6xl font-bold font-mono">05</p>
              <div className="space-y-1">
                <p className="text-2xl font-bold leading-none tracking-tight">
                  Website Build
                </p>
                <p className="text-muted-foreground font-mono text-xs uppercase">
                  2-4 weeks
                </p>
              </div>
              <p className="text-muted-foreground">
                I&apos;ll develop your website leveraging Next.js and Tailwind
                to guarantee optimal speed, security, accessibility, and an
                exceptional user experience.
              </p>
            </div>
            <div className="space-y-4 border-2 p-8 rounded-md">
              <p className="text-6xl font-bold font-mono">06</p>
              <div className="space-y-1">
                <p className="text-2xl font-bold leading-none tracking-tight">
                  Review and Launch
                </p>
                <p className="text-muted-foreground font-mono text-xs uppercase">
                  1 day + onwards
                </p>
              </div>
              <p className="text-muted-foreground">
                I&apos;ll present the finished website to you for review. Once
                approved, I&apos;ll launch it and provide ongoing maintenance
                and support.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2 z-30">
          <div className="rounded-md border-2 border-green-500 bg-background max-w-[450px] w-full mx-auto h-auto p-8 space-y-2">
            <p className="text-2xl text-center font-semibold">
              Receive a kickback of
            </p>
            <div className="space-y-2">
              <p className="font-bold text-6xl leading-none text-center text-green-500">
                $500
              </p>
            </div>
            <div>
              <p className="text-center text-muted-foreground">
                For every referral that commits to a website build
              </p>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            A small token of my appreciation!
          </p>
        </div>

        <div className="space-y-8">
          <p className="text-3xl font-bold text-center">
            <TypewriterEffectHireMe />
          </p>
          <a
            href="https://cal.com/zpuckeridge"
            target="_blank"
            className="flex justify-center gap-2 max-w-sm mx-auto font-mono uppercase text-sm font-semibold my-auto bg-neutral-900 hover:bg-neutral-800 border-2 px-2 py-1"
          >
            <CalendarIcon className="inline-block w-4 h-4" /> Schedule a Call
          </a>
        </div>
      </div>
    </div>
  );
}
