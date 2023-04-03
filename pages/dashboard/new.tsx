import { useSession } from "@supabase/auth-helpers-react";
import Head from "next/head";
import Link from "next/link";
import router from "next/router";
import { Fragment, useRef, useState } from "react";
import TextareaMarkdown, {
  TextareaMarkdownRef,
} from "textarea-markdown-editor";
import {
  FiArrowLeft,
  FiBold,
  FiChevronRight,
  FiCode,
  FiImage,
  FiItalic,
  FiLink,
  FiList,
} from "react-icons/fi";
import { BsTypeStrikethrough } from "react-icons/bs";
import { RiHeading } from "react-icons/ri";
import supabase from "../../lib/supabase";

export default function Edit() {
  const session = useSession();
  const [saveChanges, setSaveChanges] = useState("Publish");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const title = e.target.elements.title.value;
    const content = e.target.elements.content.value;
    const slug = e.target.elements.slug.value;
    const published = e.target.elements.published.value;

    const { data, error } = await supabase
      .from("blog")
      .insert({ title, content, slug, published });

    if (error) {
      throw error;
    }

    setSaveChanges("Published!");

    setTimeout(() => {
      setSaveChanges("Publish");
    }, 5000);

    router.push(`/article/${slug}`);
  };

  const ref = useRef<TextareaMarkdownRef>(null);

  if (session && session.user.email === `contact@sdelta.xyz`) {
    return (
      <>
        <Head>
          <title>Create Article | Zacchary Puckeridge</title>
          <meta name="description" content="Create Article" />
        </Head>
        <div className="sm:max-w-lg">
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold mb-4 text-white">
              Create Article
            </h1>
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
                  className="w-full p-2 bg-white/5 border border-zinc-800/50 text-sm mb-4 rounded-lg font-normal"
                  type="text"
                  name="title"
                  required
                />
              </label>

              <label className="font-bold text-sm mb-1">
                Slug<span className="text-red-500">*</span>
                <input
                  className="w-full p-2 bg-white/5 border border-zinc-800/50 text-sm mb-4 rounded-lg font-normal placeholder:text-[#888888]"
                  type="text"
                  name="slug"
                  placeholder="your-slug-here"
                  required
                />
              </label>

              <label className="w-full font-bold text-sm mb-1">
                Published
                <input
                  type="checkbox"
                  name="published"
                  defaultChecked
                  className="ml-1"
                />
              </label>

              <label className="w-full font-bold text-sm mb-1 block">
                <Fragment>
                  <div className="flex justify-between">
                    <div className="my-auto">
                      Content<span className="text-red-500">*</span>
                    </div>
                    <div className="my-auto mb-1">
                      <button></button>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          ref.current?.trigger("bold");
                        }}
                        className="text-white py-1 px-2 rounded-lg mr-1 bg-white/5 hover:ring-2 ring-gray-300 transition-all">
                        <FiBold />
                      </button>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          ref.current?.trigger("italic");
                        }}
                        className="text-white py-1 px-2 rounded-lg mr-1 bg-white/5 hover:ring-2 ring-gray-300 transition-all">
                        <FiItalic />
                      </button>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          ref.current?.trigger("strike-through");
                        }}
                        className="text-white py-1 px-2 rounded-lg mr-1 bg-white/5 hover:ring-2 ring-gray-300 transition-all">
                        <BsTypeStrikethrough />
                      </button>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          ref.current?.trigger("h1");
                        }}
                        className="text-white py-1 px-2 rounded-lg mr-1 bg-white/5 hover:ring-2 ring-gray-300 transition-all">
                        <RiHeading />
                      </button>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          ref.current?.trigger("unordered-list");
                        }}
                        className="text-white py-1 px-2 rounded-lg mr-1 bg-white/5 hover:ring-2 ring-gray-300 transition-all">
                        <FiList />
                      </button>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          ref.current?.trigger("code");
                        }}
                        className="text-white py-1 px-2 rounded-lg mr-1 bg-white/5 hover:ring-2 ring-gray-300 transition-all">
                        <FiCode className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          ref.current?.trigger("link");
                        }}
                        className="text-white py-1 px-2 rounded-lg mr-1 bg-white/5 hover:ring-2 ring-gray-300 transition-all">
                        <FiLink className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          ref.current?.trigger("image");
                        }}
                        className="text-white py-1 px-2 rounded-lg mr-1 bg-white/5 hover:ring-2 ring-gray-300 transition-all">
                        <FiImage className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          ref.current?.trigger("block-quotes");
                        }}
                        className="text-white py-1 px-2 rounded-lg mr-1 bg-white/5 hover:ring-2 ring-gray-300 transition-all">
                        <FiChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <TextareaMarkdown
                    ref={ref}
                    name="content"
                    className="w-full h-[600px] p-2 bg-white/5 border border-zinc-800/50 text-sm mb-4 rounded-lg font-normal"
                    required
                  />
                </Fragment>
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
