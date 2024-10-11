import { getCurrentUser } from "@/actions/auth";

export default async function RootPage() {
  console.log(await getCurrentUser());

  return <main></main>;
}
