import NextAuth from "next-auth";
import authConfig from "./auth.config";
const { auth: middleware } = NextAuth(authConfig);

export default middleware(async (req) => {
  const isLoggedIn = !!req.auth;
  const isAuthApiRoute = req.nextUrl.pathname.startsWith("/api/auth");
  const isAuthRoute = ["/login", "/register"].includes(req.nextUrl.pathname);

  if (isAuthApiRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/", req.nextUrl));
    }

    return;
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
