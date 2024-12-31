"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


type TimetableSlot = {
  dayOfWeek: typeof days[number];
  startTime: typeof timeSlots[number];
  endTime: typeof timeSlots[number];
  teacherSubject: {
    teacher: { name: string };
    subject: { name: string };
  };
  class: { name: string };
};

export function WeeklyView({ slots, days, timeSlots, userRole, userId }: { slots: TimetableSlot[]; userRole: string; userId: string; days:any; timeSlots:any }) {

  const getSlotContent = (day: typeof days[number], time: typeof timeSlots[number]) => {
    const slot = slots.find(
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