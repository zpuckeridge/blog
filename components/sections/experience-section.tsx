import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function ExperienceSection() {
  return (
    <div className="flex justify-center w-full">
      <div className="space-y-16 w-full">
        <div className="flex text-center flex-col space-y-2 w-full">
          <p className="text-8xl font-bold leading-none tracking-tight text-black dark:text-transparent bg-clip-text bg-gradient-to-b dark:from-[#ffffff] from-10% dark:to-muted">
            9{" "}
            <span className="text-4xl my-auto font-semibold leading-none tracking-tight text-white">
              years
            </span>
          </p>
          <p className="text-xl font-normal leading-none tracking-tight">
            Combined Experience
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-8">
          <div className="flex flex-col space-y-2">
            <p className="text-6xl font-bold leading-none tracking-tight text-black dark:text-transparent bg-clip-text bg-gradient-to-b dark:from-[#ffffff] from-10% dark:to-muted">
              4{" "}
              <span className="text-2xl font-semibold leading-none tracking-tight text-white">
                years
              </span>
            </p>
            <p className="text-lg font-normal leading-none tracking-tight">
              Web Development
            </p>
          </div>

          <div className="flex flex-col space-y-2">
            <p className="text-6xl font-bold leading-none tracking-tight text-black dark:text-transparent bg-clip-text bg-gradient-to-b dark:from-[#ffffff] from-10% dark:to-muted">
              2{" "}
              <span className="text-2xl font-semibold leading-none tracking-tight text-white">
                years
              </span>
            </p>
            <p className="text-lg font-normal leading-none tracking-tight">
              Support Engineer
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-6xl font-bold leading-none tracking-tight text-black dark:text-transparent bg-clip-text bg-gradient-to-b dark:from-[#ffffff] from-10% dark:to-muted">
              3{" "}
              <span className="text-2xl font-semibold leading-none tracking-tight text-white">
                years
              </span>
            </p>
            <p className="text-lg font-normal leading-none tracking-tight">
              Systems Administrator
            </p>
          </div>
        </div>
        <div>
          <Accordion type="multiple" className="lg:flex gap-2">
            <AccordionItem value="item-1" className="w-full mb-2">
              <AccordionTrigger className="w-full text-base py-1 px-2 border-2 border-dotted">
                <div className="flex justify-between w-full px-2">
                  <p>Rising Sun Pictures</p>
                  <div className="flex gap-2">
                    <p className="hidden sm:flex font-mono uppercase text-xs font-semibold px-2 py-1 bg-neutral-900 border-2">
                      IT Administrator
                    </p>
                    <p className="hidden md:flex gap-2 font-mono uppercase text-xs font-semibold px-2 py-1 bg-neutral-900 border-2">
                      May 2022{" "}
                      <ArrowRightIcon className="inline-block w-4 h-4 my-auto" />{" "}
                      Present
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="py-1 px-4 border-b-2 border-l-2 border-r-2 border-dotted">
                <div className="space-y-4 max-w-2xl p-4">
                  <Image
                    src="/logos/rsp.svg"
                    width={500}
                    height={500}
                    alt="Rising Sun Pictures Logo"
                    className="w-40"
                  />
                  <p className="text-base">
                    Worked with Rising Sun Pictures to build out and manage
                    their Brisbane satellite office. As the lone IT
                    Administrator in Brisbane, I facilitated the deployment,
                    planning and management of equipment and facility works
                    related to my field. I helped take the office from 12 people
                    to 65 in the span of a year. Provided support for varying
                    issues related to hardware, networks and user management.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="w-full mb-2">
              <AccordionTrigger className="w-full text-base py-1 px-2 border-2 border-dotted">
                <div className="flex justify-between w-full px-2">
                  <p>Pixel Zoo</p>
                  <div className="flex gap-2">
                    <p className="hidden sm:flex uppercase text-xs font-semibold px-2 py-1 bg-neutral-900 border-2">
                      Systems Administrator
                    </p>
                    <p className="hidden md:flex gap-2 font-mono uppercase text-xs font-semibold px-2 py-1 bg-neutral-900 border-2">
                      June 2021{" "}
                      <ArrowRightIcon className="inline-block w-4 h-4 my-auto" />{" "}
                      May 2022
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="py-1 px-4 border-b-2 border-l-2 border-r-2 border-dotted">
                <div className="space-y-4 max-w-2xl p-4">
                  <Image
                    src="/logos/pixel-zoo.svg"
                    width={500}
                    height={500}
                    alt="Pixel Zoo Logo"
                    className="w-20"
                  />
                  <p className="text-base">
                    Provided clear and concise support for ~200 employee&apos;s
                    both internal and remote. Deployed various networking and
                    hardware upgrades across the studio. Improved the efficiency
                    of various software and tools. Built and deployed a ~500TB
                    CephFS Cluster to upgrade studio&apos;s existing storage
                    solution. Managed internal and external render farms to
                    ensure project deliveries met deadlines.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="multiple" className="lg:flex gap-2">
            <AccordionItem value="item-3" className="w-full mb-2">
              <AccordionTrigger className="w-full text-base py-1 px-2 border-2 border-dotted">
                <div className="flex justify-between w-full px-2">
                  <p>Dev Demand</p>
                  <div className="flex gap-2">
                    <p className="hidden sm:flex font-mono uppercase text-xs font-semibold px-2 py-1 bg-neutral-900 border-2">
                      Junior Cloud Engineer
                    </p>
                    <p className="hidden md:flex gap-2 font-mono uppercase text-xs font-semibold px-2 py-1 bg-neutral-900 border-2">
                      May 2020{" "}
                      <ArrowRightIcon className="inline-block w-4 h-4 my-auto" />{" "}
                      May 2021
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="py-1 px-4 border-b-2 border-l-2 border-r-2 border-dotted">
                <div className="space-y-4 max-w-2xl p-4">
                  <Image
                    src="/logos/dev-demand.png"
                    width={500}
                    height={500}
                    alt="Dev Demand Logo"
                    className="w-36 grayscale invert"
                  />
                  <p className="text-base">
                    Participated in the repair of various server related issues.
                    Worked in the administration of a small business to develop
                    documentation and processes. Assisted in the deployment of
                    Kubernetes and development of client related projects.
                    Management and deployment of K8s.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="w-full mb-2">
              <AccordionTrigger className="w-full text-base py-1 px-2 border-2 border-dotted">
                <div className="flex justify-between w-full px-2">
                  <p>Conetix Web Hosting</p>
                  <div className="flex gap-2">
                    <p className="hidden sm:flex font-mono uppercase text-xs font-semibold px-2 py-1 bg-neutral-900 border-2">
                      Support Engineer
                    </p>
                    <p className="hidden md:flex gap-2 font-mono uppercase text-xs font-semibold px-2 py-1 bg-neutral-900 border-2">
                      September 2018{" "}
                      <ArrowRightIcon className="inline-block w-4 h-4 my-auto" />{" "}
                      May 2020
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="py-1 px-4 border-b-2 border-l-2 border-r-2 border-dotted">
                <div className="space-y-4 max-w-2xl p-4">
                  <Image
                    src="/logos/conetix.png"
                    width={500}
                    height={500}
                    alt="Conetix Logo"
                    className="w-36"
                  />
                  <p className="text-base">
                    Provided professional phone and email support across a wide
                    range of various web related technologies including
                    WordPress, Oce 365, Plesk, Windows Server and Linux. Adept
                    at writing understandable technical processes and
                    procedures. Procient at providing clear and concise support
                    to customers over the phone quickly and eciently.
                    Participated in the maintenance of various Windows and Linux
                    based servers.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
