import Image from "next/image";
import {
  useUser,
  useSession,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { FaDiscord } from "react-icons/fa";

export default function LoginButton() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const user = useUser();

  // See: https://supabase.com/docs/guides/auth/overview#redirect-urls-and-wildcards
  const getURL = () => {
    let url =
      process?.env?.PAGE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      "http://localhost:3000/";
    // Make sure to include `https://` when not localhost.
    url = url.includes("http") ? url : `https://${url}`;
    // Make sure to including trailing `/`.
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url;
  };

  const handleDiscordSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: getURL(),
      },
    });
    if (error) console.log(error);
  };

  async function signout() {
    const { error } = await supabase.auth.signOut();
  }

  return (
    <>
      {!session ? (
        <button
          className="text-white py-1 px-6 rounded-lg flex items-center justify-center bg-white/5 hover:ring-2 ring-gray-300 transition-all"
          onClick={handleDiscordSignIn}
          title="Login">
          <FaDiscord className="h-6 w-6 mr-1" />
          Sign in
        </button>
      ) : (
        <>
          <button
            className="text-white py-1 px-6 rounded-lg flex items-center justify-center bg-white/5 hover:ring-2 ring-gray-300 transition-all"
            onClick={signout}
            title="Logout">
            <Image
              src={user?.user_metadata.avatar_url}
              alt="Discord Profile Picture"
              className="rounded-full h-6 w-6 mr-2"
              height={40}
              width={40}
            />
            {user?.user_metadata.full_name}
          </button>
        </>
      )}
    </>
  );
}
