import Head from "next/head";

export default function Timeline() {
  return (
    <>
      <Head>
        <title>Timeline | Zacchary Puckeridge</title>
        <meta
          name="description"
          content="Learn more my about career to date!"
        />
      </Head>
      <div className="max-w-2xl">
        <h1 className="font-bold text-5xl tracking-tight text-white mt-20">
          Timeline
        </h1>
        <h2 className="text-white mb-8 mt-4">
          This is a timeline of my current and previous roles. It{"'"}s not a
          complete list of everything I{"'"}ve done, but it{"'"}s a good
          overview of my career thus far.
        </h2>
        <div className="p-1 grid place-items-center">
          <ol className="relative border-l border-[#888888]">
            <li className="mb-10 ml-6">
              <span className="flex absolute -left-3 justify-center items-center w-6 h-6 rounded-full text-black bg-[#fff200]">
                <svg
                  aria-hidden="true"
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"></path>
                </svg>
              </span>
              <h3 className="flex items-center mb-1 text-lg font-semibold text-white">
                Rising Sun Pictures{" "}
                <span className="bg-white/5 border border-zinc-800/50 rounded text-sm font-medium mr-2 px-2.5 py-0.5 ml-3">
                  Current
                </span>
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-[#888888]">
                IT Administrator
              </time>
              <time className="block mb-2 text-sm font-normal leading-none text-[#888888]">
                May 2022 → Present
              </time>
              <p className="mb-4 text-base font-normal text-white">
                Currently working towards the building and advancement of the
                Brisbane studio while providing onsite and remote support to
                both Adelaide and Brisbane locations.
              </p>
            </li>
            <li className="mb-10 ml-6">
              <span className="flex absolute -left-3 justify-center items-center w-6 h-6 rounded-full text-white bg-white/5">
                <svg
                  aria-hidden="true"
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"></path>
                </svg>
              </span>
              <h3 className="mb-1 text-lg font-semibold text-white">
                Pixel Zoo
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-[#888888]">
                Systems Administrator
              </time>
              <time className="block mb-2 text-sm font-normal leading-none text-[#888888]">
                Jun 2021 → May 2022
              </time>
              <p className="text-base font-normal text-white">
                Provided effective and efficient support to around 200
                employees, both on-site and remote. Implemented various
                networking and hardware upgrades throughout the studio,
                resulting in improved operational efficiency. Additionally,
                optimised various software and tools. Notably, spearheaded the
                establishment and deployment of a CephFS Cluster, spanning
                approximately 500 terabytes, to upgrade the studio{"'"}s storage
                solution.
              </p>
            </li>
            <li className="mb-10 ml-6">
              <span className="flex absolute -left-3 justify-center items-center w-6 h-6 rounded-full text-white bg-white/5">
                <svg
                  aria-hidden="true"
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"></path>
                </svg>
              </span>
              <h3 className="mb-1 text-lg font-semibold text-white">
                Dev Demand Co
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-[#888888]">
                Junior Cloud Engineer
              </time>
              <time className="block mb-2 text-sm font-normal leading-none text-[#888888]">
                May 2020 → May 2021
              </time>
              <p className="text-base font-normal text-white">
                Acquired proficiency in resolving server-related concerns, while
                contributing towards the documentation and process development
                for a small enterprise. Started down the path of learning the
                intricacies of Kubernetes, while actively engaging in the
                advancement of client-centric projects.
              </p>
            </li>
            <li className="mb-10 ml-6">
              <span className="flex absolute -left-3 justify-center items-center w-6 h-6 rounded-full text-white bg-white/5">
                <svg
                  aria-hidden="true"
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"></path>
                </svg>
              </span>
              <h3 className="mb-1 text-lg font-semibold text-white">Conetix</h3>
              <time className="block mb-2 text-sm font-normal leading-none text-[#888888]">
                Technical Support Staff
              </time>
              <time className="block mb-2 text-sm font-normal leading-none text-[#888888]">
                Sep 2018 → May 2020
              </time>
              <p className="text-base font-normal text-white">
                Delivered professional phone and email assistance, encompassing
                diverse web-related technologies such as WordPress, Office 365,
                Plesk, Windows Server, and Linux. Demonstrated proficiency in
                composing technical processes and procedures, while adeptly
                providing swift and effective support to clients over the phone.
                Contributed towards the maintenance of numerous Windows and
                Linux-based servers.
              </p>
            </li>
            <li className="mb-10 ml-6">
              <span className="flex absolute -left-3 justify-center items-center w-6 h-6 rounded-full text-white bg-white/5">
                <svg
                  aria-hidden="true"
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"></path>
                </svg>
              </span>
              <h3 className="mb-1 text-lg font-semibold text-white">
                Camp Highroad
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-[#888888]">
                Christian Camp Counsellor
              </time>
              <time className="block mb-2 text-sm font-normal leading-none text-[#888888]">
                May 2018 → Sep 2018
              </time>
              <p className="text-base font-normal text-white">
                Took an active role in guiding campers through a diverse range
                of team-building exercises and extracurricular activities.
                Fostered and cultivated significant connections with campers,
                parents, and fellow counselors. Undertook a cross-country
                journey from the East Coast to the West Coast of the United
                States, forging some great friendships along the way.
              </p>
            </li>
            <li className="mb-10 ml-6">
              <span className="flex absolute -left-3 justify-center items-center w-6 h-6 rounded-full text-white bg-white/5">
                <svg
                  aria-hidden="true"
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"></path>
                </svg>
              </span>
              <h3 className="mb-1 text-lg font-semibold text-white">
                Hungry Jack{"'"}s
              </h3>
              <time className="block mb-2 text-sm font-normal leading-none text-[#888888]">
                Crew Member
              </time>
              <time className="block mb-2 text-sm font-normal leading-none text-[#888888]">
                Nov 2016 → May 2018
              </time>
              <p className="text-base font-normal text-white">
                Gained proficiency in time management and developed the capacity
                to operate effectively under pressure while carrying out duties.
                Additionally, contributed towards training crew members on
                relevant protocols and procedures.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </>
  );
}
