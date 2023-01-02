import { NextSeo } from "next-seo";

export default function Timeline() {
  return (
    <>
      <NextSeo
        title="Timeline | Zacchary Puckeridge"
        description="Learn more about Zacchary's Career Path"
      />
      <h1 className="mt-20 max-w-2xl mx-auto font-bold text-3xl md:text-5xl tracking-tight mb-1 text-black dark:text-white">
        Timeline
      </h1>
      <h2 className="text-gray-700 dark:text-gray-200 mb-8 mt-4">
        This is a timeline of my current and previous roles. It{"'"}s not a
        complete list of everything I{"'"}ve done, but it{"'"}s a good overview
        of my career thus far.
      </h2>
      <div className="p-1 grid place-items-center">
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
          <li className="mb-10 ml-6">
            <span className="flex absolute -left-3 justify-center items-center w-6 h-6 rounded-full bg-gray-200 dark:bg-[#1d1f22]">
              <svg
                aria-hidden="true"
                className="w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              Rising Sun Pictures{" "}
              <span className="bg-gray-200 dark:bg-[#1d1f22] text-sm font-medium mr-2 px-2.5 py-0.5 rounded ml-3">
                Current
              </span>
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-600 dark:text-gray-400">
              IT Administrator
            </time>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-600 dark:text-gray-400">
              May 2022 → Present
            </time>
            <p className="mb-4 text-base font-normal text-gray-700 dark:text-gray-200">
              ...
            </p>
          </li>
          <li className="mb-10 ml-6">
            <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full bg-gray-200 dark:bg-[#1d1f22]">
              <svg
                aria-hidden="true"
                className="w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              Pixel Zoo
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-600 dark:text-gray-400">
              Systems Administrator
            </time>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-600 dark:text-gray-400">
              Jun 2021 → May 2022
            </time>
            <p className="text-base font-normal text-gray-700 dark:text-gray-200">
              Provided clear and concise support for ~200 employee{"'"}s both
              internal and remote. Deployed various networking and hardware
              upgrades across the studio. Improved the efficiency of various
              software and tools. Built and deployed a ~500TB CephFS Cluster to
              upgrade studio{"'"}s existing storage solution.
            </p>
          </li>
          <li className="mb-10 ml-6">
            <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full bg-gray-200 dark:bg-[#1d1f22]">
              <svg
                aria-hidden="true"
                className="w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              Dev Demand Co
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-600 dark:text-gray-400">
              Junior Cloud Engineer
            </time>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-600 dark:text-gray-400">
              May 2020 → May 2021
            </time>
            <p className="text-base font-normal text-gray-700 dark:text-gray-200">
              Learned to troubleshoot server related issues. Worked in the
              administration of a small business to develop documentation and
              processes. Began looking into the inner workings of Kubernetes and
              participated in the development of client related projects.
            </p>
          </li>
          <li className="mb-10 ml-6">
            <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full bg-gray-200 dark:bg-[#1d1f22]">
              <svg
                aria-hidden="true"
                className="w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              Conetix
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-600 dark:text-gray-400">
              Technical Support Staff
            </time>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-600 dark:text-gray-400">
              Sep 2018 → May 2020
            </time>
            <p className="text-base font-normal text-gray-700 dark:text-gray-200">
              Provided professional phone and email support across a wide range
              of various web related technologies including WordPress, Office
              365, Plesk, Windows Server and Linux. Adept at the production of
              writing understandable technical processes and procedures.
              Proficient at providing clear and concise support to customers
              over the phone quickly and efficiently. Participated in the
              maintenance of various Windows and Linux based servers.
            </p>
          </li>
          <li className="mb-10 ml-6">
            <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full bg-gray-200 dark:bg-[#1d1f22]">
              <svg
                aria-hidden="true"
                className="w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              Camp Highroad
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-600 dark:text-gray-400">
              Christian Camp Counsellor
            </time>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-600 dark:text-gray-400">
              May 2018 → Sep 2018
            </time>
            <p className="text-base font-normal text-gray-700 dark:text-gray-200">
              Participated in leading campers through various team building and
              extra-curricular activities. Invested and developed meaningful
              relationships with campers, parents and other counsellors.
              Travelled from East Coast to West Coast USA and made great friends
              along the way.
            </p>
          </li>
          <li className="mb-10 ml-6">
            <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full bg-gray-200 dark:bg-[#1d1f22]">
              <svg
                aria-hidden="true"
                className="w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
              Hungry Jack{"'"}s
            </h3>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-600 dark:text-gray-400">
              Crew Member
            </time>
            <time className="block mb-2 text-sm font-normal leading-none text-gray-600 dark:text-gray-400">
              Nov 2016 → May 2018
            </time>
            <p className="text-base font-normal text-gray-700 dark:text-gray-200">
              Picked up strong time management skills and the ability to work in
              a stressful environment. Participated in the training of Crew
              Members in appropriate processes and procedures.
            </p>
          </li>
        </ol>
      </div>
    </>
  );
}
