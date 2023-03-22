import { useSession } from "@supabase/auth-helpers-react";
import dateFormat from "dateformat";
import Link from "next/link";
import {
  FiEdit,
  FiEye,
  FiEyeOff,
  FiPlusSquare,
  FiTrash2,
} from "react-icons/fi";
import supabase from "../lib/supabase";
import router from "next/router";
import Head from "next/head";

export async function getServerSideProps() {
  const { data, error } = await supabase
    .from("blog")
    .select("slug, published_at, title, published")
    .order("published_at", { ascending: false });

  data?.forEach((data: any) => {
    data.published_at = dateFormat(data.published_at, "mmmm dS, yyyy");
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    props: {
      data,
    },
  };
}

export default function Dashboard({ data }: { data: any }) {
  const session = useSession();

  const deleteArticle = async (id: string) => {
    // display modal asking for confirmation
    const confirm = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (confirm) {
      const { error } = await supabase.from("blog").delete().eq("slug", id);

      if (error) {
        console.log("error", error);
      }

      // shallow refrehses the page
      router.push("/dashboard");
    }
  };

  if (session && session.user.email === `contact@sdelta.xyz`) {
    return (
      <>
        <Head>
          <title>Dashboard | Zacchary Puckeridge</title>
          <meta name="description" content="Post and manage articles" />
        </Head>
        <div className="max-w-4xl">
          <div className="text-white">
            <h1 className="font-bold text-3xl">Dashboard</h1>
            <div className="flex justify-between">
              <p>Update, modify and create new articles</p>
              <div>
                <Link href="/dashboard/new">
                  <button
                    className="py-1 px-6 text-white rounded-lg flex items-center justify-center bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all"
                    title="Create Article">
                    <FiPlusSquare className="mr-1" /> Create Article
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full mt-2 bg-white/5 rounded-lg border border-zinc-800/50 shadow-2xl">
            <table className="w-full text-white">
              <tbody>
                {data.map((article: any) => (
                  <tr
                    className="bg-[#1d1d1d] border-b border-zinc-800/50 text-sm"
                    key={article.slug}>
                    <td className="px-4 py-1">
                      {article.published ? <FiEye /> : <FiEyeOff />}
                    </td>
                    <td className="px-4 py-1">{article.title}</td>
                    <td className="text-center px-4 py-1">
                      <Link href={`/dashboard/edit/${article.slug}`}>
                        <button className="mr-2 text-blue-500 hover:text-blue-400">
                          <FiEdit />
                        </button>
                      </Link>
                      <button
                        className="text-red-500 hover:text-red-400"
                        value={article.slug}
                        onClick={(e) => deleteArticle(e.currentTarget.value)}>
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
