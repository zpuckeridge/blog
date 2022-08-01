import { NextSeo } from "next-seo";

// import { Listbox } from "@headlessui/react";

// export async function getServerSideProps() {
//   const response = await fetch(
//     "https://api.github.com/users/zpuckeridge/repos",
//     {
//       headers: {
//         authorization: `token ${process.env.GITHUB_PAT}`,
//       },
//     }
//   );

//   const json = await response.json();

//   const repositories = json
//     .map((repo) => {
//       if (!repo.topics.includes("portfolio")) return null;

//       if (repo.archived) return null;

//       return repo;
//     })
//     .filter((project) => project !== null);

//   return {
//     props: {
//       repositories,
//     },
//   };
// }

export default function Projects(repositories) {
  return (
    <>
      <NextSeo
        title="Projects | Zacchary Puckeridge"
        description="View Zacchary's completed and active projects"
      />
      <div className="grid h-screen place-items-center">
        <div className="p-4">
          <h5 className="text-8xl font-extrabold text-gray-900 dark:text-white text-center">
            Projects Coming Soon!? 😱
          </h5>
        </div>
      </div>
      {/* <pre>{JSON.stringify(repositories, null, 4)}</pre> */}
    </>
  );
}
