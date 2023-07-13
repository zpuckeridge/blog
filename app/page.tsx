import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import prisma from "@/lib/prisma";
import { ArrowRight, Github, Twitter } from "lucide-react";
import Link from "next/link";
import { FaDiscord, FaGithub, FaSpotify } from "react-icons/fa6";

export default async function Home() {
  const posts = await prisma.posts.findMany({
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return (
    <main>
      <div className="mx-auto max-w-2xl my-4 space-y-8">
        <div>
          <div className="flex justify-between">
            <div>
              <p>zpuckeridge</p>
              <p className="text-xs">
                Zacchary /ˈzækəri/ - ˈthe Lord has rememberedˈ
              </p>
            </div>
            <ModeToggle />
          </div>
          <div className="mt-4 space-y-4">
            <p>
              Christian IT Administrator working for{" "}
              <span className="underline">Rising Sun Pictures</span>. Building
              better artist experiences by day. Web Developer by night.
            </p>
            <p>
              Currently building a Christian reformed bookstore called{" "}
              <span className="underline">The Armoury Bookshop</span>.
            </p>
          </div>
        </div>

        <p className="font-semibold">Projects</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-6">
          {siteConfig.projects.map((project) => (
            <div key={project.name} className="space-y-2">
              <a
                href={project.url}
                className="underline underline-offset-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.name}
              </a>
              <p className="text-sm">{project.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between my-auto">
          <p className="my-auto font-semibold">Blog</p>
          <Link href="/blog">
            <Button variant="ghost">
              All articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        <div>
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id}>
                <Link href={`/article/${encodeURIComponent(post.slug)}`}>
                  <div className="flex justify-between">
                    <p>{post.title}</p>

                    <div className="flex gap-2">
                      <p>{post.views} views</p>/
                      <Badge variant="secondary">{post.tag}</Badge>/
                      <p>
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <a
            href="https://twitter.com/zpuckeridge"
            className="border p-4 flex items-center w-full"
          >
            <Twitter className="mr-2" />
            @zpuckeridge
          </a>
          <a
            href="https://discordapp.com/users/181324210876973056"
            className="border p-4 flex items-center w-full"
          >
            <FaDiscord className="mr-2 w-7 h-7" />
            @sdelta
          </a>
          <a
            href="https://github.com/zpuckeridge"
            className="border p-4 flex items-center w-full"
          >
            <Github className="mr-2 w-7 h-7" />
            @zpuckeridge
          </a>
          <a
            href="https://open.spotify.com/user/oid25p8bf0jm4zfezkf765o03?si=f67b4f43e7fa4620"
            className="border p-4 flex items-center w-full"
          >
            <FaSpotify className="mr-2 w-7 h-7" />
            @zpuckeridge
          </a>
        </div>
      </div>
    </main>
  );
}
