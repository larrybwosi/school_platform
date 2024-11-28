"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

type TimetableSlot = {
  id: string;
  dayOfWeek: typeof days[number];
  startTime: typeof timeSlots[number];
  endTime: typeof timeSlots[number];
  teacherSubject: {
    teacher: { name: string };
    subject: { name: string };
  };
  class: { name: string };
};

const mockSlots: TimetableSlot[] = [
  {
    id: "1",
    dayOfWeek: "Monday",
    startTime: "09:00",
    endTime: "10:00",
    teacherSubject: { teacher: { name: "Mr. Smith" }, subject: { name: "Mathematics" } },
    class: { name: "Class A" },
  },
  // Add more mock data as needed
];

export function WeeklyView({ slots = mockSlots, userRole, userId }: { slots?: TimetableSlot[]; userRole: string; userId: string }) {
  const [currentDay, setCurrentDay] = useState(0);

  const nextDay = () => setCurrentDay((prev) => (prev + 1) % days.length);
  const prevDay = () => setCurrentDay((prev) => (prev - 1 + days.length) % days.length);

  const getSlotContent = (day: typeof days[number], time: typeof timeSlots[number]) => {
    const slot = slots.find((s) => s.dayOfWeek === day && s.startTime === time);

    if (!slot) return null;

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className={`w-full h-full text-left p-2 rounded-lg bg-gradient-to-br hover:opacity-80 transition-opacity`}
          >
            <div className="space-y-1 text-white">
              <p className="font-medium truncate">{slot.teacherSubject.subject.name}</p>
              <p className="text-sm opacity-80 truncate">{slot.class.name}</p>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{slot.teacherSubject.subject.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Class:</span>
              <span className="col-span-3">{slot.class.name}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Teacher:</span>
              <span className="col-span-3">{slot.teacherSubject.teacher.name}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Time:</span>
              <span className="col-span-3">{`${slot.startTime} - ${slot.endTime}`}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Day:</span>
              <span className="col-span-3">{slot.dayOfWeek}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const DayView = () => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Button onClick={prevDay} variant="outline" size="icon" className="w-8 h-8">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <CardTitle className="text-xl font-bold">{days[currentDay]}</CardTitle>
        <Button onClick={nextDay} variant="outline" size="icon" className="w-8 h-8">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {timeSlots.map((time) => {
            const slot = slots.find((s) => s.dayOfWeek === days[currentDay] && s.startTime === time);
            return (
              <div key={time} className="flex items-center space-x-2">
                <span className="text-sm font-medium w-12">{time}</span>
                <div className="flex-grow">{getSlotContent(days[currentDay], time)}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div className="md:hidden">
        <DayView />
      </div>
      <div className="hidden md:block">
        <Card className="w-full overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Weekly Timetable</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-200px)]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] sticky left-0 bg-background z-20">Time</TableHead>
                    {days.map((day) => (
                      <TableHead key={day} className="min-w-[150px]">{day}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeSlots.map((time) => (
                    <TableRow key={time}>
                      <TableCell className="font-medium sticky left-0 bg-background z-10">{time}</TableCell>
                      {days.map((day) => (
                        <TableCell key={`${day}-${time}`} className="p-1 h-24 min-w-[150px]">
                          {getSlotContent(day, time)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

