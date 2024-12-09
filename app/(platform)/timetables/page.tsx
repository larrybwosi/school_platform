import { getTimetableSlots } from "@/actions/timetable";
import { TimetableView } from "@/components/timetable/timetable-view";

export default async function TimetablePage() {
  
  const slots: any = await getTimetableSlots();
  return (
    <div className="container mx-auto py-6">
      <TimetableView slots={slots} userRole={'admin'} userId={1} />
    </div>
  );
}