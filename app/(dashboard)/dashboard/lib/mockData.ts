export interface Teacher {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  performanceIncrease: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  grade: number;
  subjects: {
    [key: string]: {
      currentGrade: number;
      previousGrade: number;
    };
  };
}

export interface NonTeachingStaff {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Subject {
  id: string;
  name: string;
  averageGrade: number;
}

export const mockTeachers: Teacher[] = [
  { id: "T1", name: "John Doe", email: "john@school.com", subjects: ["Math", "Physics"], performanceIncrease: 5 },
  { id: "T2", name: "Jane Smith", email: "jane@school.com", subjects: ["English"], performanceIncrease: 3 },
  { id: "T3", name: "Bob Johnson", email: "bob@school.com", subjects: ["Biology", "Chemistry"], performanceIncrease: 7 },
  { id: "T4", name: "Alice Brown", email: "alice@school.com", subjects: ["History"], performanceIncrease: 2 },
  { id: "T5", name: "Charlie Davis", email: "charlie@school.com", subjects: ["Geography"], performanceIncrease: 4 },
  { id: "T6", name: "Eva Wilson", email: "eva@school.com", subjects: ["Art"], performanceIncrease: 6 },
  { id: "T7", name: "Frank Miller", email: "frank@school.com", subjects: ["Physical Education"], performanceIncrease: 1 },
  { id: "T8", name: "Grace Lee", email: "grace@school.com", subjects: ["Music"], performanceIncrease: 8 },
  { id: "T9", name: "Henry Taylor", email: "henry@school.com", subjects: ["Computer Science"], performanceIncrease: 9 },
  { id: "T10", name: "Ivy Clark", email: "ivy@school.com", subjects: ["Math"], performanceIncrease: 3 },
  { id: "T11", name: "Jack Robinson", email: "jack@school.com", subjects: ["English", "History"], performanceIncrease: 5 },
  { id: "T12", name: "Karen White", email: "karen@school.com", subjects: ["Chemistry"], performanceIncrease: 4 },
];

export const mockSubjects: Subject[] = [
  { id: "S1", name: "Math", averageGrade: 82 },
  { id: "S2", name: "English", averageGrade: 78 },
  { id: "S3", name: "Physics", averageGrade: 80 },
  { id: "S4", name: "Chemistry", averageGrade: 75 },
  { id: "S5", name: "Biology", averageGrade: 79 },
  { id: "S6", name: "History", averageGrade: 81 },
  { id: "S7", name: "Geography", averageGrade: 77 },
  { id: "S8", name: "Art", averageGrade: 85 },
];

export const mockStudents: Student[] = Array.from({ length: 48 }, (_, i) => ({
  id: `ST${i + 1}`,
  name: `Student ${i + 1}`,
  email: `student${i + 1}@school.com`,
  grade: Math.floor(i / 12) + 9, // 9, 10, 11, 12
  subjects: Object.fromEntries(
    mockSubjects.map(subject => [
      subject.name,
      {
        currentGrade: Math.floor(Math.random() * 30) + 70,
        previousGrade: Math.floor(Math.random() * 30) + 70,
      }
    ])
  ),
}));

export const mockNonTeachingStaff: NonTeachingStaff[] = [
  { id: "NTS1", name: "Admin 1", email: "admin1@school.com", role: "Administrator" },
  { id: "NTS2", name: "Librarian 1", email: "librarian1@school.com", role: "Librarian" },
  { id: "NTS3", name: "Counselor 1", email: "counselor1@school.com", role: "Counselor" },
  { id: "NTS4", name: "IT Support 1", email: "itsupport1@school.com", role: "IT Support" },
];

export const getTopStudentsPerGrade = () => {
  const topStudents = {};
  for (let grade = 9; grade <= 12; grade++) {
    const gradeStudents = mockStudents.filter(student => student.grade === grade);
    const sortedStudents = gradeStudents.sort((a, b) => {
      const aAvg = Object.values(a.subjects).reduce((sum, { currentGrade }) => sum + currentGrade, 0) / Object.keys(a.subjects).length;
      const bAvg = Object.values(b.subjects).reduce((sum, { currentGrade }) => sum + currentGrade, 0) / Object.keys(b.subjects).length;
      return bAvg - aAvg;
    });
    //@ts-ignore
    topStudents[grade] = sortedStudents.slice(0, 3);
  }
  return topStudents;
};

export const getBestPerformedSubject = () => {
  return mockSubjects.reduce((best, subject) => subject.averageGrade > best.averageGrade ? subject : best);
};

export const getTeacherWithIncreasedPerformance = () => {
  return mockTeachers.reduce((best, teacher) => teacher.performanceIncrease > best.performanceIncrease ? teacher : best);
};

export const getStudentsWithIncreasedPerformance = () => {
  return mockStudents.filter(student => {
    const subjectIncreases = Object.values(student.subjects).filter(({ currentGrade, previousGrade }) => currentGrade > previousGrade);
    return subjectIncreases.length > Object.keys(student.subjects).length / 2;
  });
};

export const getOverallInstitutionProgression = () => {
  const currentAverage = mockStudents.reduce((sum, student) => {
    const studentAvg = Object.values(student.subjects).reduce((subSum, { currentGrade }) => subSum + currentGrade, 0) / Object.keys(student.subjects).length;
    return sum + studentAvg;
  }, 0) / mockStudents.length;

  const previousAverage = mockStudents.reduce((sum, student) => {
    const studentAvg = Object.values(student.subjects).reduce((subSum, { previousGrade }) => subSum + previousGrade, 0) / Object.keys(student.subjects).length;
    return sum + studentAvg;
  }, 0) / mockStudents.length;

  return {
    currentAverage: currentAverage.toFixed(2),
    previousAverage: previousAverage.toFixed(2),
    progression: (currentAverage - previousAverage).toFixed(2),
  };
};

