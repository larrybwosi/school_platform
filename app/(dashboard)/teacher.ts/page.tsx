'use client'
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Calendar,
  Clock,
  Users,
  BookOpen,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Building,
  Grid,
  Filter,
  X
} from 'lucide-react';


const mockTimeSlots = {
  Monday: [
    {
      id: 1,
      time: '09:00-10:30',
      subject: 'Mathematics',
      room: 'Room 101',
      teacher: 'Dr. Smith',
      type: 'Lecture',
      course: 'BSc Computer Science',
      year: '2nd Year',
      capacity: 120,
      currentEnrollment: 98,
      description: 'Advanced calculus and its applications in computer science.',
      prerequisites: 'Basic Calculus, Linear Algebra',
      materials: 'Textbook: Advanced Mathematics for Computer Science'
    },
    {
      id: 2,
      time: '11:00-12:30',
      subject: 'Physics',
      room: 'Lab 201',
      teacher: 'Prof. Johnson',
      type: 'Lab',
      course: 'BSc Physics',
      year: '1st Year',
      capacity: 30,
      currentEnrollment: 28,
      description: 'Practical experiments in classical mechanics.',
      prerequisites: 'None',
      materials: 'Lab manual, safety equipment'
    }
  ],
  Tuesday: [
    {
      id: 3,
      time: '09:00-10:30',
      subject: 'Chemistry',
      room: 'Lab 202',
      teacher: 'Dr. Wilson',
      type: 'Lab',
      course: 'BSc Chemistry',
      year: '3rd Year',
      capacity: 25,
      currentEnrollment: 22,
      description: 'Advanced organic chemistry experiments.',
      prerequisites: 'Organic Chemistry I',
      materials: 'Lab coat, safety goggles'
    }
  ],
  Wednesday: [
    {
      id: 4,
      time: '10:00-11:30',
      subject: 'Computer Science',
      room: 'Lab 301',
      teacher: 'Dr. Lee',
      type: 'Lab',
      course: 'BSc Computer Science',
      year: '2nd Year',
      capacity: 30,
      currentEnrollment: 28,
      description: 'Practical programming and algorithm implementation.',
      prerequisites: 'Introduction to Programming',
      materials: 'Laptop with required software'
    }
  ],
  Thursday: [
    {
      id: 5,
      time: '09:00-10:30',
      subject: 'Art History',
      room: 'Room 401',
      teacher: 'Ms. Anderson',
      type: 'Lecture',
      course: 'BA Arts',
      year: '1st Year',
      capacity: 150,
      currentEnrollment: 125,
      description: 'Survey of Western art from Renaissance to Modern period.',
      prerequisites: 'None',
      materials: 'Art History Textbook'
    }
  ],
  Friday: [
    {
      id: 6,
      time: '10:00-11:30',
      subject: 'Literature',
      room: 'Room 201',
      teacher: 'Prof. White',
      type: 'Lecture',
      course: 'BA English',
      year: '2nd Year',
      capacity: 100,
      currentEnrollment: 87,
      description: 'Analysis of contemporary literature and its themes.',
      prerequisites: 'Introduction to Literature',
      materials: 'Course reader, selected novels'
    }
  ]
};

const TimeTable = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [viewType, setViewType] = useState("day");
  const [userType, setUserType] = useState("student");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [filters, setFilters] = useState({
    subject: "",
    teacher: "",
    course: "",
  });
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const getUniqueValues = (key) => {
    const values = new Set();
    days.forEach((day) => {
      mockTimeSlots[day].forEach((slot) => {
        values.add(slot[key]);
      });
    });
    return Array.from(values);
  };

  const uniqueSubjects = getUniqueValues("subject");
  const uniqueTeachers = getUniqueValues("teacher");
  const uniqueCourses = getUniqueValues("course");
  

  const getBadgeColor = (type) => {
    switch (type) {
      case "Lecture":
        return "bg-blue-500";
      case "Lab":
        return "bg-green-500";
      case "Tutorial":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const handlePreviousDay = () => {
    const currentIndex = days.indexOf(selectedDay);
    setSelectedDay(
      currentIndex > 0 ? days[currentIndex - 1] : days[days.length - 1]
    );
  };

  const handleNextDay = () => {
    const currentIndex = days.indexOf(selectedDay);
    setSelectedDay(
      currentIndex < days.length - 1 ? days[currentIndex + 1] : days[0]
    );
  };

  const filterTimeSlots = (slots) => {
    return slots.filter((slot) => {
      return (
        (!filters.subject || slot.subject === filters.subject) &&
        (!filters.teacher || slot.teacher === filters.teacher) &&
        (!filters.course || slot.course === filters.course)
      );
    });
  };

  const resetFilters = () => {
    setFilters({
      subject: "",
      teacher: "",
      course: "",
    });
  };

  const TimeSlotCard = ({ slot }) => (
    <div
      className="p-4 rounded-lg border hover:shadow-md transition-shadow bg-white cursor-pointer"
      onClick={() => setSelectedSlot(slot)}
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-gray-500" />
          <span className="font-medium">{slot.time}</span>
        </div>
        <div className="flex gap-2">
          <Badge className={`${getBadgeColor(slot.type)}`}>{slot.type}</Badge>
          <Badge variant="outline">{slot.year}</Badge>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-gray-500" />
          <span className="font-semibold">{slot.subject}</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Building className="h-5 w-5 text-gray-500" />
          <span>{slot.room}</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <GraduationCap className="h-5 w-5 text-gray-500" />
          <span>{slot.teacher}</span>
        </div>
        {userType === "lecturer" && (
          <div className="flex items-center gap-2 mt-2">
            <Users className="h-5 w-5 text-gray-500" />
            <span>
              {slot.currentEnrollment}/{slot.capacity} students
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 mt-2">
          <Grid className="h-5 w-5 text-gray-500" />
          <span>{slot.course}</span>
        </div>
      </div>
    </div>
  );

  const FilterBar = () => (
    <div className="flex flex-wrap gap-4 mb-6">
      <Select
        value={filters.subject}
        onValueChange={(value) => setFilters({ ...filters, subject: value })}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filter by Subject" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Subjects</SelectItem>
          {uniqueSubjects.map((subject) => (
            <SelectItem key={subject} value={subject}>
              {subject}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.teacher}
        onValueChange={(value) => setFilters({ ...filters, teacher: value })}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filter by Teacher" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Teachers</SelectItem>
          {uniqueTeachers.map((teacher) => (
            <SelectItem key={teacher} value={teacher}>
              {teacher}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.course}
        onValueChange={(value) => setFilters({ ...filters, course: value })}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Filter by Course" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Courses</SelectItem>
          {uniqueCourses.map((course) => (
            <SelectItem key={course} value={course}>
              {course}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {(filters.subject || filters.teacher || filters.course) && (
        <Button variant="outline" onClick={resetFilters} className="gap-2">
          <X className="h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  );

  const DayView = () => (
    <div className="grid gap-4">
      {filterTimeSlots(mockTimeSlots[selectedDay]).map((slot) => (
        <TimeSlotCard key={slot.id} slot={slot} />
      ))}
    </div>
  );

  const WeekView = () => (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {days.map((day) => (
        <div key={day} className="space-y-4">
          <div className="font-semibold text-center p-2 bg-gray-100 rounded">
            {day}
          </div>
          <div className="space-y-4">
            {filterTimeSlots(mockTimeSlots[day]).map((slot) => (
              <TimeSlotCard key={slot.id} slot={slot} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader className="border-b">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Timetable
          </CardTitle>
          <div className="flex flex-wrap items-center gap-4">
            <Select value={userType} onValueChange={setUserType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student View</SelectItem>
                <SelectItem value="lecturer">Lecturer View</SelectItem>
              </SelectContent>
            </Select>
            <Tabs value={viewType} onValueChange={setViewType}>
              <TabsList>
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        {viewType === "day" && (
          <div className="flex items-center justify-center gap-2 mt-4">
            <Button variant="outline" size="icon" onClick={handlePreviousDay}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-semibold min-w-[100px] text-center">
              {selectedDay}
            </span>
            <Button variant="outline" size="icon" onClick={handleNextDay}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardHeader>
      <Tabs className="p-6">
        <FilterBar />
        <TabsContent value="day">
          <DayView />
        </TabsContent>
        <TabsContent value="week">
          <WeekView />
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedSlot} onOpenChange={() => setSelectedSlot(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedSlot?.subject}</DialogTitle>
          </DialogHeader>
          {selectedSlot && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Time</p>
                  <p>{selectedSlot.time}</p>
                </div>
                <div>
                  <p className="font-semibold">Room</p>
                  <p>{selectedSlot.room}</p>
                </div>
                <div>
                  <p className="font-semibold">Teacher</p>
                  <p>{selectedSlot.teacher}</p>
                </div>
                <div>
                  <p className="font-semibold">Type</p>
                  <Badge className={`${getBadgeColor(selectedSlot.type)}`}>
                    {selectedSlot.type}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="font-semibold">Description</p>
                <p>{selectedSlot.description}</p>
              </div>

              <div>
                <p className="font-semibold">Prerequisites</p>
                <p>{selectedSlot.prerequisites}</p>
              </div>

              <div>
                <p className="font-semibold">Materials</p>
                <p>{selectedSlot.materials}</p>
              </div>

              {userType === "lecturer" && (
                <div>
                  <p className="font-semibold">Enrollment</p>
                  <p>
                    {selectedSlot.currentEnrollment} / {selectedSlot.capacity}{" "}
                    students
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TimeTable;