import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserDash from "@/components/UserDash";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Next.js redirect helper (from "next/navigation")
    redirect("/login");
  }

  return <UserDash session={session} />;
}