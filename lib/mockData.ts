import { role } from "better-auth/plugins/access";

export interface Teacher {
  id: string;
  name: string;
  email: string;
  role: 'gradeTeacher' | 'subjectTeacher' | 'admin';
  grades?: number[];
  subjects: string[];
  perfomanceIncrease?: string
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  grade: number;
  stream:string,
  subjects: {
    [key: string]: {
      currentGrade: number;
      pastGrades: number[];
      lastAssessment: {
        name: string;
        score: number;
        date: string;
      };
    };
  };
  attendance: number;
  status: 'active' | 'inactive' | 'suspended';
  behavior: string;
  parentContact: string;
  specialNeeds?: string;
  group?: string;
  club?: string;
  performance?: {
    overallGPA: number;
    semesterCredits: number;
    extracurriculars: string[];
  };
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  averageGrade: number;
  isOptional: boolean;
  description?: string;
  teachers?: Teacher[];
}

export const mockTeachers: Teacher[] = [
  {
    id: "T001",
    name: "Alice Johnson",
    email: "alice.j@school.com",
    role: "gradeTeacher",
    grades: [9, 10],
    subjects: ["Math", "Science"],
  },
  {
    id: "T002",
    name: "Bob Smith",
    email: "bob.s@school.com",
    role: "subjectTeacher",
    grades: [9, 10, 11],
    subjects: ["English"],
  },
  {
    id: "T003",
    name: "Carol White",
    email: "carol.w@school.com",
    role: "admin",
    subjects: ["History", "Geography"],
  },
  {
    id: "T004",
    name: "David Brown",
    email: "david.b@school.com",
    role: "subjectTeacher",
    grades: [9, 10],
    subjects: ["Math", "Science"],
  },
  {
    id: "T005",
    name: "Eve Green",
    email: "eve.g@school.com",
    role: "subjectTeacher",
    grades: [9, 10],
    subjects: ["English"],
  },
  {
    id: "T006",
    name: "Frank Davis",
    email: "frank.d@school.com",
    role: "subjectTeacher",
    grades: [9, 10],
    subjects: ["History", "Geography"],
  },
  {
    id: "T007",
    name: "Grace Lee",
    email: "grace.l@school.com",
    role: "subjectTeacher",
    grades: [9, 10],
    subjects: ["Music"],
  },
  {
    id: "T008",
    name: "Henry Taylor",
    email: "henry.t@school.com",
    role: "subjectTeacher",
    grades: [9, 10],
    subjects: ["Computer Science"],
  },
  {
    id: "T009",
    name: "Ivy Clark",
    email: "ivy.c@school.com",
    role: "subjectTeacher",
    grades: [9, 10],
    subjects: ["Math"],
  },
  {
    id: "T010",
    name: "Jack Robinson",
    email: "jack.r@school.com",
    role: "subjectTeacher",
    grades: [9, 10],
    subjects: ["English"],
  },
  {
    id: "T011",
    name: "Kate Martinez",
    email: "kate.m@school.com",
    role: "subjectTeacher",
    grades: [9, 10],
    subjects: ["Biology"],
  },
  {
    id: "T012",
    name: "Liam Wilson",
    email: "liam.w@school.com",
    role: "subjectTeacher",
    grades: [9, 10],
    subjects: ["Chemistry"],
  },
];

export const mockStudents: Student[] = [
  {
    id: "ST001",
    name: "John Smith",
    email: "john.s@school.com",
    avatar: "/avatars/01.png",
    stream:'A',
    grade: 9,
    subjects: { 
      Math: { currentGrade: 92, pastGrades: [90, 88, 94], lastAssessment: { name: "Quiz 3", score: 95, date: "Mar 15, 2024", }, },
      Science: { currentGrade: 88, pastGrades: [85, 87, 90], lastAssessment: {  name: "Lab Report 2", score: 90, date: "Mar 12, 2024", }, },
      English: { currentGrade: 85, pastGrades: [82, 84, 86], lastAssessment: { name: "Essay 1", score: 87, date: "Mar 10, 2024", }, },
    },
    attendance: 98,
    status: "active",
    behavior: "Excellent",
    parentContact: "parent1@email.com",
    specialNeeds: "None",
    group: "A",
  },
  {
    id: "ST002",
    name: "Emma Wilson",
    email: "emma.w@school.com",
    avatar: "/avatars/02.png",
    grade: 9,
    stream:'G',
    subjects: {
      Math: {currentGrade: 88, pastGrades: [85, 87, 89], lastAssessment: { name: "Mid-term", score: 85, date: "Mar 10, 2024", }, },
      Science: { currentGrade: 91, pastGrades: [89, 90, 92], lastAssessment: { name: "Lab Report 2", score: 93, date: "Mar 12, 2024", }, },
      English: {
        currentGrade: 90,
        pastGrades: [88, 89, 91],
        lastAssessment: {
          name: "Essay 1",
          score: 92,
          date: "Mar 10, 2024",
        },
      },
    },
    attendance: 95,
    status: "active",
    behavior: "Good",
    parentContact: "parent2@email.com",
    group: "B",
  },
  {
    id: "ST003",
    name: "Michael Brown",
    email: "michael.b@school.com",
    avatar: "/avatars/03.png",
    stream:'s',
    grade: 10,
    subjects: {
      Math: {
        currentGrade: 75,
        pastGrades: [72, 74, 76],
        lastAssessment: {
          name: "Assignment 2",
          score: 78,
          date: "Mar 8, 2024",
        },
      },
      Science: {
        currentGrade: 80,
        pastGrades: [78, 79, 81],
        lastAssessment: {
          name: "Lab Report 1",
          score: 82,
          date: "Mar 5, 2024",
        },
      },
      English: {
        currentGrade: 82,
        pastGrades: [80, 81, 83],
        lastAssessment: {
          name: "Book Report",
          score: 85,
          date: "Mar 7, 2024",
        },
      },
    },
    attendance: 90,
    status: "inactive",
    behavior: "Needs improvement",
    parentContact: "parent3@email.com",
    specialNeeds: "ADHD",
    group: "A",
  },
  {
    id: "ST004",
    name: "Sophia Lee",
    email: "sophia.l@school.com",
    avatar: "/avatars/04.png",
    grade: 10,
    stream:'A',
    subjects: {
      Math: { currentGrade: 95, pastGrades: [93, 94, 96], lastAssessment: { name: "Final Exam", score: 97, date: "Mar 20, 2024" } },
      Science: { currentGrade: 93, pastGrades: [91, 92, 94], lastAssessment: { name: "Project Presentation", score: 95, date: "Mar 18, 2024" } },
      English: { currentGrade: 91, pastGrades: [89, 90, 92], lastAssessment: { name: "Research Paper", score: 93, date: "Mar 15, 2024" } },
    },
    attendance: 99,
    status: "active",
    behavior: "Excellent",
    parentContact: "parent4@email.com",
    group: "B",
  },
  {
    id: "ST005",
    name: "Oliver Green",
    email: "oliver.g@school.com",
    avatar: "/avatars/05.png",
    grade: 11,
    stream:'A',
    subjects: {
      Math: { currentGrade: 87, pastGrades: [85, 86, 88], lastAssessment: { name: "Quiz 4", score: 89, date: "Mar 22, 2024" } },
      Science: { currentGrade: 89, pastGrades: [87, 88, 90], lastAssessment: { name: "Lab Experiment", score: 91, date: "Mar 19, 2024" } },
      English: { currentGrade: 92, pastGrades: [90, 91, 93], lastAssessment: { name: "Poetry Analysis", score: 94, date: "Mar 17, 2024" } },
    },
    attendance: 97,
    status: "active",
    behavior: "Very Good",
    parentContact: "parent5@email.com",
    group: "C",
  },
  {
    id: "ST006",
    name: "Liam Taylor",
    email: "liam.t@school.com",
    avatar: "/avatars/06.png",
    grade: 11,
    stream:'A',
    subjects: {
      Math: { currentGrade: 88, pastGrades: [85, 87, 90], lastAssessment: { name: "Assignment 3", score: 92, date: "Mar 25, 2024" } },
      Science: { currentGrade: 90, pastGrades: [88, 89, 91], lastAssessment: { name: "Lab Report 3", score: 93, date: "Mar 22, 2024" } },
      English: { currentGrade: 91, pastGrades: [89, 90, 92], lastAssessment: { name: "Essay 2", score: 94, date: "Mar 20, 2024" } },
    },
    attendance: 98,
    status: "active",
    behavior: "Excellent",
    parentContact: "parent6@email.com",
    group: "D",
  },
  {
    id: "ST007",
    name: "Emma Wilson",
    email: "emma.w@school.com",
    avatar: "/avatars/02.png",
    grade: 9,
    stream:'G',
    subjects: {
      Math: { currentGrade: 88, pastGrades: [85, 87, 89], lastAssessment: { name: "Mid-term", score: 85, date: "Mar 10, 2024" } },
      Science: { currentGrade: 91, pastGrades: [89, 90, 92], lastAssessment: { name: "Lab Report 2", score: 93, date: "Mar 12, 2024" } },
      English: { currentGrade: 90, pastGrades: [88, 89, 91], lastAssessment: { name: "Essay 1", score: 92, date: "Mar 10, 2024" } },
    },
    attendance: 95,
    status: "active",
    behavior: "Good",
    parentContact: "parent2@email.com",
    group: "B",
  },
];


export const mockSubjects: Subject[] = [
  {
    id: '1',
    code: "CS101",
    name: "Introduction to Computer Science",
    description: "A basic introduction to computer science concepts.",
    isOptional: false,
    averageGrade: 90,
    teachers: [
      mockTeachers[0],
      mockTeachers[1],
    ],
  },
  {
    id: '2',
    code: "MATH201",
    name: "Calculus I",
    description: "A basic introduction to calculus concepts.",
    isOptional: false,
    averageGrade: 90,
    teachers: [
      mockTeachers[2],
      mockTeachers[3],
    ],
  },
  {
    id: '3',
    code: "PHYS101",
    name: "Physics I",
    description: "A basic introduction to physics concepts.",
    isOptional: false,
    averageGrade: 90,
    teachers: [
      mockTeachers[2],
      mockTeachers[3],
    ],
  },
];

export const mockData = {
  subjects: {
    core: ["Mathematics", "English", "Science", "Social Studies", "Physical Education"],
    optional: ["Computer Science", "Art", "Music", "History", "Geography", "Physics", "Chemistry", "Biology"]
  },
  grades: [ "Grade 9", "Grade 10", "Grade 11", "Grade 12", "Grade 2"],
  bloodGroups: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  religions: ["Christianity", "Islam", "Hinduism", "Buddhism", "Judaism", "Other", "Prefer not to say"],
  relationships: ["Father", "Mother", "Legal Guardian", "Grandparent", "Uncle", "Aunt", "Other"],
  healthConditions: ["Allergies", "Asthma", "Diabetes", "None", "Other"],
  specialNeeds: ["Learning Support", "Physical Support", "Behavioral Support", "None"],
  nationalities: ["American", "British", "Canadian", "Nigerian", "Indian", "Chinese", "Other"],
  departments: ["English", "Mathematics", "Science", "Social Studies", "Physical Education", "Art", "Music", "History", "Geography", "Computer Science", "Physics", "Chemistry", "Biology", "Other"],
  qualifications: ["Bachelor of Education", "Master of Education", "PhD", "Teaching Certificate","Teaching Diploma","Internship", "Other"],
  streams: ["A", "B", "C", "D"],
  roles: ["Administrator", "Grade Teacher", "Subject Teacher", "Non-teaching Staff"],
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
}


export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

export const timeSlots = Array.from({ length: 9 }, (_, i) => {
  const hour = i + 8;
  return `${hour.toString().padStart(2, "0")}:00`;
});

export type TimetableSlot = {
  dayOfWeek: typeof days[number];
  startTime: typeof timeSlots[number];
  endTime: typeof timeSlots[number];
  teacherSubject: {
    teacher: Teacher;
    subject: { name: string };
  };
  class: { name: string };
};
export const mockSlots: TimetableSlot[] = [
  { dayOfWeek: "Monday", startTime: "08:00", endTime: "09:00", teacherSubject: { teacher: mockTeachers[0], subject: { name: "Math" } }, class: { name: "Class A" } },
  { dayOfWeek: "Monday", startTime: "09:00", endTime: "10:00", teacherSubject: { teacher: mockTeachers[1], subject: { name: "English" } }, class: { name: "Class B" } },
  { dayOfWeek: "Tuesday", startTime: "08:00", endTime: "09:00", teacherSubject: { teacher: mockTeachers[2], subject: { name: "Science" } }, class: { name: "Class C" } },
  { dayOfWeek: "Tuesday", startTime: "09:00", endTime: "10:00", teacherSubject: { teacher: mockTeachers[3], subject: { name: "History" } }, class: { name: "Class D" } },
  { dayOfWeek: "Wednesday", startTime: "08:00", endTime: "09:00", teacherSubject: { teacher: mockTeachers[4], subject: { name: "Geography" } }, class: { name: "Class E" } },
  { dayOfWeek: "Wednesday", startTime: "09:00", endTime: "10:00", teacherSubject: { teacher: mockTeachers[5], subject: { name: "Art" } }, class: { name: "Class F" } },
  { dayOfWeek: "Thursday", startTime: "08:00", endTime: "09:00", teacherSubject: { teacher: mockTeachers[6], subject: { name: "Physical Education" } }, class: { name: "Class G" } },
  { dayOfWeek: "Thursday", startTime: "09:00", endTime: "10:00", teacherSubject: { teacher: mockTeachers[7], subject: { name: "Music" } }, class: { name: "Class H" } },
  { dayOfWeek: "Friday", startTime: "08:00", endTime: "09:00", teacherSubject: { teacher: mockTeachers[8], subject: { name: "Computer Science" } }, class: { name: "Class I" } },
  { dayOfWeek: "Friday", startTime: "09:00", endTime: "10:00", teacherSubject: { teacher: mockTeachers[9], subject: { name: "Biology" } }, class: { name: "Class J" } },
];