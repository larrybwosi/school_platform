import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SubjectsView } from "@/components/subjects/subjects-view";
import { db } from "@/lib/db";

export default async function SubjectsPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
  }

  const subjects = await db.query.subjects.findMany({
    with: {
      teacherSubjects: {
        with: {
          teacher: true,
        },
      },
    },
  });

  return (
    <div className="container mx-auto py-6">
      <SubjectsView subjects={subjects} userRole={session.user.role} />
    </div>
  );
}