import { CredentialForm } from "./_components/CredentialForm";
import { GithubButton } from "./_components/GithubButton";
import { GoogleButton } from "./_components/GoogleButton";

export default function LoginPage() {
  return (
    <>
      <main className="min-h-svh p-6 sm:flex sm:items-center">
        <div className="w-full max-w-md pt-16 sm:mx-auto sm:pt-0">
          <h1 className="text-xl font-semibold text-slate-950">
            Think it. Do it.
          </h1>
          <h2 className="mb-6 text-xl font-semibold text-slate-500">
            Log in to your account
          </h2>

          <div className="grid gap-3">
            {/* <GoogleButton />
            <GithubButton /> */}
          </div>

          <hr className="my-6 h-0.5 border-none bg-slate-100" />

          <CredentialForm />
        </div>
      </main>
    </>
  );
}
