"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  createVideoAuthToken,
  getVideoAuthCookieName,
  getVideoPassword,
  normalizeVideoRedirect,
} from "@/lib/video-auth";

export const authenticateVideoAccess = async (
  formData: FormData
): Promise<void> => {
  const redirectTo = normalizeVideoRedirect(
    formData.get("redirectTo")?.toString()
  );
  const submittedPassword = formData.get("password")?.toString();
  const password = getVideoPassword();

  if (!password) {
    redirect(`${redirectTo}?error=password-unavailable`);
  }

  if (!submittedPassword || submittedPassword !== password) {
    redirect(`${redirectTo}?error=incorrect-password`);
  }

  const cookieStore = await cookies();

  cookieStore.set({
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    name: getVideoAuthCookieName(),
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    value: await createVideoAuthToken(password),
  });

  redirect(redirectTo);
};
