// import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TimetableView } from "@/components/timetable/timetable-view";
import { db } from "@/lib/db";
import { timetableSlots, teacherSubjects, subjects } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function TimetablePage() {
  // const session = await auth();
  
  // if (!session?.user) {
  //   redirect("/login");
  // }

  // const slots = await db.query.timetableSlots.findMany({
  //   with: {
  //     class: true,
  //     teacherSubject: {
  //       with: {
  //         teacher: true,
  //         subject: true,
  //       },
  //     },
  //   },
  // });
  const slots: typeof timetableSlots = [
    {
      id: 1,
      classId: 1,
      teacherSubjectId: 1,
      dayOfWeek: 1,
      startTime: "08:00",
      endTime: "09:00",
    },
    {
      id: 2,
      classId: 1,
      teacherSubjectId: 2,
      dayOfWeek: 2,
      startTime: "09:00",
      endTime: "10:00",
    },
    {
      id: 3,
      classId: 2,
      teacherSubjectId: 3,
      dayOfWeek: 3,
      startTime: "10:00",
      endTime: "11:00",
    },
    {
      id: 4,
      classId: 2,
      teacherSubjectId: 1,
      dayOfWeek: 4,
      startTime: "11:00",
      endTime: "12:00",
    },
    {
      id: 5,
      classId: 3,
      teacherSubjectId: 2,
      dayOfWeek: 5,
      startTime: "12:00",
      endTime: "13:00",
    },
  ];


  return (
    <div className="container mx-auto py-6">
      <TimetableView slots={slots} userRole={'admin'} userId={1} />
    </div>
  );
}