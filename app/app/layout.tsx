import { redirect } from "next/navigation";
import { AppShell } from "@/components/app/AppShell";
import { getCollegeCoachSession } from "@/lib/college-coach-session";

export default async function CoachAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCollegeCoachSession();
  if (!session) redirect("/sign-in?next=/app");

  return <AppShell coachName={session.displayName}>{children}</AppShell>;
}
