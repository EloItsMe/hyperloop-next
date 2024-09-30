import { SignOutButton } from "@/components/app/Auth/SignOutButton";
import { getCurrentUser } from "@/lib/utils";

export default async function HomePage() {
  const currentUser = await getCurrentUser();
  console.log(currentUser);
  return (
    <>
      <h1>Hello world</h1>
      {currentUser && <SignOutButton />}
    </>
  );
}
