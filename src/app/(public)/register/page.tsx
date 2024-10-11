import { CredentialForm } from "./_components/CredentialForm";

export default function LoginPage() {
  return (
    <>
      <main className="min-h-svh p-6 sm:flex sm:items-center">
        <div className="w-full max-w-md pt-16 sm:mx-auto sm:pt-0">
          <h1 className="text-xl font-semibold text-slate-950">
            Think it. Do it.
          </h1>
          <h2 className="mb-6 text-xl font-semibold text-slate-500">
            Create your account
          </h2>

          <CredentialForm />
        </div>
      </main>
    </>
  );
}
