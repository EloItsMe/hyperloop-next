import { SignOutButton } from "@/components/app/Auth/SignOutButton";
import { getCurrentUser } from "@/lib/utils/auth";

export default async function RootPage() {
  const currentUser = await getCurrentUser();

  return (
    <div>
      <p>{JSON.stringify(currentUser)}</p>
      <SignOutButton />
    </div>
  );
}
