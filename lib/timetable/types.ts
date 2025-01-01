// types.ts
interface Teacher {
  id: string;
  name: string;
  subjects: string[];
  maxHours: number;
  availability: {
    [key: string]: string[]; // day: timeSlots[]
  };
}

interface Subject {
  id: string;
  name: string;
  hoursPerWeek: number;
  requiredForGrades: string[];
}

interface Grade {
  id: string;
  name: string;
  streams: string[];
  subjects: string[];
}

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  duration: number;
}

// Mock data
const mockTeachers: Teacher[] = [
  {
    id: "1",
    name: "Ms. Smith",
    subjects: ["Mathematics", "Physics"],
    maxHours: 20,
    availability: {
      Monday: ["8:00", "9:00", "10:00"],
      Tuesday: ["8:00", "9:00", "10:00"],
    },
  },
  {
    id: "2",
    name: "Mr. Johnson",
    subjects: ["English", "Literature"],
    maxHours: 18,
    availability: {
      Monday: ["8:00", "9:00", "10:00"],
      Tuesday: ["8:00", "9:00", "10:00"],
    },
  },
];

const mockSubjects: Subject[] = [
  {
    id: "1",
    name: "Mathematics",
    hoursPerWeek: 5,
    requiredForGrades: ["9", "10", "11"],
  },
  {
    id: "2",
    name: "Physics",
    hoursPerWeek: 4,
    requiredForGrades: ["9", "10", "11"],
  },
];

const mockGrades: Grade[] = [
  {
    id: "9",
    name: "Grade 9",
    streams: ["A", "B"],
    subjects: ["Mathematics", "Physics"],
  },
  {
    id: "10",
    name: "Grade 10",
    streams: ["A", "B"],
    subjects: ["Mathematics", "Physics"],
  },
];

const mockTimeSlots: TimeSlot[] = [
  {
    id: "1",
    startTime: "8:00",
    endTime: "8:45",
    duration: 45,
  },
  {
    id: "2",
    startTime: "8:45",
    endTime: "9:30",
    duration: 45,
  },
];

export {
  mockTeachers,
  mockSubjects,
  mockGrades,
  mockTimeSlots,
}