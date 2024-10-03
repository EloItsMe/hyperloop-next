import { LoginWithGithub } from "./_clients/LoginWithGithub";
import { LoginWithMagicLink } from "./_clients/LoginWithMagicLink";
import { NextAuthErrors } from "./_clients/NextAuthErrors";

export default function LoginPage() {
  return (
    <>
      <NextAuthErrors />
      <main className="min-h-svh p-6 sm:flex sm:items-center">
        <div className="w-full max-w-md pt-16 sm:mx-auto sm:pt-0">
          <h1 className="text-xl font-semibold text-slate-950">
            Think it. Do it.
          </h1>
          <h2 className="mb-6 text-xl font-semibold text-slate-500">
            Log in to your account
          </h2>

          <LoginWithGithub />

          <hr className="my-6 h-0.5 border-none bg-slate-100" />

          <LoginWithMagicLink />
        </div>
      </main>
    </>
  );
}
