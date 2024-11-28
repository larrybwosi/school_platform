import { SubjectsView } from "@/components/subjects/subjects-view";
import { mockSubjects } from "@/lib/mockData";

export default async function SubjectsPage() {

  return (
    <div className="w-full flex-1 mx-auto py-6 min-h-screen">
      <SubjectsView subjects={mockSubjects} userRole={"admin"} />
    </div>
  );
}