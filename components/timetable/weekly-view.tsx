"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const timeSlots = Array.from({ length: 9 }, (_, i) => {
  const hour = i + 8;
  return `${hour.toString().padStart(2, "0")}:00`;
});

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

export type TimetableSlot = {
  dayOfWeek: typeof days[number];
  startTime: typeof timeSlots[number];
  endTime: typeof timeSlots[number];
  teacherSubject: {
    teacher: { name: string };
    subject: { name: string };
  };
  class: { name: string };
};

export function WeeklyView({ slots, userRole, userId }: { slots: TimetableSlot[]; userRole: string; userId: string }) {
  const mockSlots: TimetableSlot[] = [
    { dayOfWeek: "Monday", startTime: "08:00", endTime: "09:00", teacherSubject: { teacher: { name: "John Doe" }, subject: { name: "Math" } }, class: { name: "Class A" } },
    { dayOfWeek: "Monday", startTime: "09:00", endTime: "10:00", teacherSubject: { teacher: { name: "Jane Smith" }, subject: { name: "English" } }, class: { name: "Class B" } },
    { dayOfWeek: "Tuesday", startTime: "08:00", endTime: "09:00", teacherSubject: { teacher: { name: "Bob Johnson" }, subject: { name: "Science" } }, class: { name: "Class C" } },
    { dayOfWeek: "Tuesday", startTime: "09:00", endTime: "10:00", teacherSubject: { teacher: { name: "Alice Williams" }, subject: { name: "History" } }, class: { name: "Class D" } },
    { dayOfWeek: "Wednesday", startTime: "08:00", endTime: "09:00", teacherSubject: { teacher: { name: "Charlie Brown" }, subject: { name: "Geography" } }, class: { name: "Class E" } },
    { dayOfWeek: "Wednesday", startTime: "09:00", endTime: "10:00", teacherSubject: { teacher: { name: "Eva Green" }, subject: { name: "Art" } }, class: { name: "Class F" } },
    { dayOfWeek: "Thursday", startTime: "08:00", endTime: "09:00", teacherSubject: { teacher: { name: "Frank White" }, subject: { name: "Physical Education" } }, class: { name: "Class G" } },
    { dayOfWeek: "Thursday", startTime: "09:00", endTime: "10:00", teacherSubject: { teacher: { name: "Grace Blue" }, subject: { name: "Music" } }, class: { name: "Class H" } },
    { dayOfWeek: "Friday", startTime: "08:00", endTime: "09:00", teacherSubject: { teacher: { name: "Henry Red" }, subject: { name: "Computer Science" } }, class: { name: "Class I" } },
    { dayOfWeek: "Friday", startTime: "09:00", endTime: "10:00", teacherSubject: { teacher: { name: "Ivy Green" }, subject: { name: "Biology" } }, class: { name: "Class J" } },
  ];
  const getSlotContent = (day: typeof days[number], time: typeof timeSlots[number]) => {
    const slot = mockSlots.find(
      (s) =>
        s.dayOfWeek === day && s.startTime === time
    );

    if (!slot) return null;

    return (
      <div className="space-y-1">
        <p className="font-medium">{slot.teacherSubject.subject.name}</p>
        <p className="text-sm text-muted-foreground">
          {slot.class.name} - {slot.teacherSubject.teacher.name}
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Time</TableHead>
            {days.map((day) => (
              <TableHead key={day}>{day}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeSlots.map((time) => (
            <TableRow key={time}>
              <TableCell className="font-medium">{time}</TableCell>
              {days.map((day) => (
                <TableCell key={`${day}-${time}`} className="h-24">
                  {getSlotContent(day, time)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}