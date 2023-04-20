import Playing from "@/components/Playing";
import Contact from "@/components/Contact";
import LatestArticle from "@/components/LatestArticle";
import Call from "@/components/Call";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Media from "@/components/Media";

export default async function Home() {
  return (
    <>
      <About />
      <div className="mt-6 grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {/* Column 1 */}
        <div>
          <div className="w-full">
            {/* @ts-expect-error Async Server Component */}
            <Playing />
          </div>
          <div className="w-full mt-6">
            <Media />
          </div>
          <div className="w-full mt-6">
            <div className="bg-white shadow-lg dark:shadow-none dark:bg-[#1f1f1f] w-full p-4 rounded-lg">
              <Projects />
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <div className="w-full">
            {/* @ts-expect-error Async Server Component */}
            <LatestArticle />
          </div>
          <div className="w-full mt-6">
            <div className="bg-white shadow-lg dark:shadow-none dark:bg-[#1f1f1f] w-full p-4 rounded-lg">
              <Contact />
            </div>
          </div>
          <div className="w-full mt-6">
            <div className="bg-white shadow-lg dark:shadow-none dark:bg-[#1f1f1f] w-full h-48 p-4 rounded-lg">
              <Call />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
