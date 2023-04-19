import { getSinglePost, getPosts } from "../../ghost-client";
import Image from "next/image";
import { format } from "date-fns";

import About from "@/components/About";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function Read({ params }: { params: { slug: string } }) {
  const getPost = await getSinglePost(params.slug);

  return (
    <>
      <div className="flex justify-between px-4 mx-auto max-w-[850px]">
        <article className="mx-auto w-full max-w-2xl prose prose-xl prose-p:text-gray-800  dark:prose-p:text-gray-100 sm:prose-base prose-a:no-underline prose-blue dark:prose-invert">
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
            {getPost?.title}
          </h1>

          <header className="mb-4 lg:mb-6 not-format">
            <address className="flex items-center mb-6 not-italic">
              <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                {getPost?.published_at ? (
                  <time
                    className="text-base font-light text-gray-800 dark:text-white mx-1"
                    dateTime={getPost?.published_at}
                    title={format(
                      new Date(getPost?.published_at),
                      "yyyy-MM-dd"
                    )}
                  >
                    {format(new Date(getPost?.published_at), "dd MMMM, yyyy")}
                  </time>
                ) : (
                  ""
                )}
              </div>
            </address>
          </header>

          <figure>
            <Image
              className="mx-auto rounded-lg shadow-2xl dark:shadow-none"
              width={1000}
              height={250}
              src={
                getPost?.feature_image ??
                "https://images.unsplash.com/photo-1559311648-d46f5d8593d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"
              }
              alt={getPost?.feature_image_alt ?? "Placeholder"}
            />

            {getPost?.feature_image_caption && (
              <figcaption
                className="text-center"
                dangerouslySetInnerHTML={{
                  __html: getPost?.feature_image_caption,
                }}
              />
            )}
          </figure>

          {getPost?.html && (
            <div dangerouslySetInnerHTML={{ __html: getPost?.html }}></div>
          )}
        </article>
      </div>
      <div className="p-4">
        <About />
      </div>
    </>
  );
}
export default Read;
