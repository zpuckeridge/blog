import type { APIRoute } from "astro";

import {
  createVideoAuthToken,
  getVideoAuthCookieName,
  getVideoPassword,
  normalizeVideoRedirect,
} from "@/lib/video-auth";

export const POST: APIRoute = async ({
  request,
  cookies,
  redirect,
  locals,
}) => {
  const formData = await request.formData();
  const redirectTo = normalizeVideoRedirect(
    formData.get("redirectTo")?.toString()
  );
  const submittedPassword = formData.get("password")?.toString();
  const password = getVideoPassword(locals.runtime?.env);

  if (!password) {
    return redirect(`${redirectTo}?error=password-unavailable`);
  }

  if (!submittedPassword || submittedPassword !== password) {
    return redirect(`${redirectTo}?error=incorrect-password`);
  }

  cookies.set(getVideoAuthCookieName(), await createVideoAuthToken(password), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
    secure: import.meta.env.PROD,
  });

  return redirect(redirectTo);
};
