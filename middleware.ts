import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
  afterAuth(auth, req) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  },

  publicRoutes: [
    "/",
    "/gallery",
    "/(article)(.*)",
    "/unauthorised",
    "/sign-in",
    "/sign-up",
    "/hire-me",
    "/not-found",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
