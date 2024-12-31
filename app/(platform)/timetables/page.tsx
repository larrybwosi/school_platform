import { getTimetableSlots } from "@/actions/timetable";
import { TimetableView } from "@/components/timetable/timetable-view";
import { days, timeSlots } from "@/lib/mockData";

export default async function TimetablePage() {
  
  const slots: any = await getTimetableSlots();
  const getDays = async()=>{
    return days
  }
  const getTime = async ()=>{
    return timeSlots
  }
  
  return (
    <div className="container mx-auto py-6">
      <TimetableView slots={slots} userRole={'admin'} userId={1} timeSlots={timeSlots} days={days} />
    </div>
  );
}