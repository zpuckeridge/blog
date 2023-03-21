import { useSession } from "@supabase/auth-helpers-react";
import dateFormat from "dateformat";
import Head from "next/head";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import supabase from "../../../lib/supabase";

export async function getServerSideProps(context: any) {
  const { slug } = context.query;

  const { data, error } = await supabase
    .from("blog")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  data.published_at = dateFormat(data.published_at, "mmmm dS, yyyy");

  return {
    props: {
      data,
    },
  };
}

export default function Edit({ data }: { data: any }) {
  const session = useSession();

  const [saveChanges, setSaveChanges] = useState("Save Changes");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const title = e.target.elements.title.value;
    const content = e.target.elements.content.value;

    const { data: article, error } = await supabase
      .from("blog")
      .update({ title, content })
      .eq("slug", data.slug)
      .single();

    if (error) {
      throw error;
    }

    setSaveChanges("Saved!");

    setTimeout(() => {
      setSaveChanges("Save Changes");
    }, 5000);

    router.push(`/article/${data.slug}`);
  };

  if (session && session.user.email === `contact@sdelta.xyz`) {
    return (
      <>
        <Head>
          <title>Editing {data.title} | Zacchary Puckeridge</title>
          <meta name="description" content={`Editing ${data.title}`} />
        </Head>
        <div className="md:max-w-xl max-w-sm p-4 mt-20">
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold mb-4 text-white">Edit Article</h1>
            <Link href="/dashboard">
              <button className="inline-flex mr-2 mt-4 text-blue-400 hover:text-blue-300">
                <FiArrowLeft className="mr-1 my-auto" /> Back to dashboard
              </button>
            </Link>
          </div>
          <div className="w-full shadow-2xl bg-white/5 border border-zinc-800/50 rounded-lg p-4 text-white">
            <form onSubmit={handleSubmit}>
              <label className="font-bold text-sm mb-1">
                Title<span className="text-red-500">*</span>
                <input
                  className="w-full mr-2 p-2 bg-white/5 border border-zinc-800/50 text-sm mb-4 rounded-lg font-normal"
                  type="text"
                  name="title"
                  defaultValue={data.title}
                  required
                />
              </label>
              <label className="font-bold text-sm mb-1">
                Content<span className="text-red-500">*</span>
                <textarea
                  className="w-full h-[600px] p-2 bg-white/5 border border-zinc-800/50 text-sm mb-4 rounded-lg font-normal"
                  name="content"
                  defaultValue={data.content}
                  required
                />
              </label>

              <button
                className="py-1 px-6 rounded-lg bg-green-600 flex items-center justify-center hover:ring-2 ring-gray-300 transition-all"
                title="Save Changes"
                type="submit">
                {saveChanges}
              </button>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="justify-center text-center xl:max-w-6xl mx-auto mt-10 mb-20">
        <h1 className="font-bold text-2xl text-white">
          Sorry! You are not authorised to view this page!
        </h1>
      </div>
    );
  }
}
