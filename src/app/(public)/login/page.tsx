import CredentialsLoginForm from "@/components/app/auth/CredentialsLoginForm";
import { GithubLoginButton } from "@/components/app/auth/GithubLoginButton";
import { GoogleLoginButton } from "@/components/app/auth/GoogleLoginButton";
import Link from "next/link";
import { NextAuthErrors } from "./_components/NextAuthErrors";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <>
      <NextAuthErrors error={searchParams.error} />
      <main className="min-h-svh p-6 sm:flex sm:items-center">
        <div className="w-full max-w-md pt-16 sm:mx-auto sm:pt-0">
          <h1 className="text-xl font-semibold text-slate-950">
            Think it. Do it.
          </h1>
          <h2 className="mb-6 text-xl font-semibold text-slate-500">
            Log in to your account
          </h2>

          <div className="grid gap-3">
            <GoogleLoginButton />
            <GithubLoginButton />
          </div>

          <hr className="my-6 h-0.5 border-none bg-slate-100" />

          <CredentialsLoginForm />

          <p className="mt-4 text-sm text-slate-500">
            Don{"'"}t have an account?{" "}
            <Link
              href="/register"
              className="text-slate-950 hover:underline hover:underline-offset-2"
            >
              Create an account
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
