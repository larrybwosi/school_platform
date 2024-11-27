export interface Teacher {
  id: string;
  name: string;
  email: string;
  role: 'gradeTeacher' | 'subjectTeacher' | 'admin';
  grades?: number[];
  subjects: string[];
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  grade: number;
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
    subjects: ["History"],
  },
  {
    id: "T004",
    name: "David Brown",
    email: "david.b@school.com",
    role: "subjectTeacher",
    grades: [9, 10],
    subjects: ["Math"],
  },
];

export const mockStudents: Student[] = [
  {
    id: "ST001",
    name: "John Smith",
    email: "john.s@school.com",
    avatar: "/avatars/01.png",
    grade: 9,
    subjects: {
      Math: {
        currentGrade: 92,
        pastGrades: [90, 88, 94],
        lastAssessment: {
          name: "Quiz 3",
          score: 95,
          date: "Mar 15, 2024",
        },
      },
      Science: {
        currentGrade: 88,
        pastGrades: [85, 87, 90],
        lastAssessment: {
          name: "Lab Report 2",
          score: 90,
          date: "Mar 12, 2024",
        },
      },
      English: {
        currentGrade: 85,
        pastGrades: [82, 84, 86],
        lastAssessment: {
          name: "Essay 1",
          score: 87,
          date: "Mar 10, 2024",
        },
      },
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
    subjects: {
      Math: {
        currentGrade: 88,
        pastGrades: [85, 87, 89],
        lastAssessment: {
          name: "Mid-term",
          score: 85,
          date: "Mar 10, 2024",
        },
      },
      Science: {
        currentGrade: 91,
        pastGrades: [89, 90, 92],
        lastAssessment: {
          name: "Lab Report 2",
          score: 93,
          date: "Mar 12, 2024",
        },
      },
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
    subjects: {
      Math: {
        currentGrade: 95,
        pastGrades: [93, 94, 96],
        lastAssessment: {
          name: "Final Exam",
          score: 97,
          date: "Mar 20, 2024",
        },
      },
      Science: {
        currentGrade: 93,
        pastGrades: [91, 92, 94],
        lastAssessment: {
          name: "Project Presentation",
          score: 95,
          date: "Mar 18, 2024",
        },
      },
      English: {
        currentGrade: 91,
        pastGrades: [89, 90, 92],
        lastAssessment: {
          name: "Research Paper",
          score: 93,
          date: "Mar 15, 2024",
        },
      },
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
    subjects: {
      Math: {
        currentGrade: 87,
        pastGrades: [85, 86, 88],
        lastAssessment: {
          name: "Quiz 4",
          score: 89,
          date: "Mar 22, 2024",
        },
      },
      Science: {
        currentGrade: 89,
        pastGrades: [87, 88, 90],
        lastAssessment: {
          name: "Lab Experiment",
          score: 91,
          date: "Mar 19, 2024",
        },
      },
      English: {
        currentGrade: 92,
        pastGrades: [90, 91, 93],
        lastAssessment: {
          name: "Poetry Analysis",
          score: 94,
          date: "Mar 17, 2024",
        },
      },
    },
    attendance: 97,
    status: "active",
    behavior: "Very Good",
    parentContact: "parent5@email.com",
    group: "C",
  },
];

export const mockData = {
  subjects: {
    core: ["Mathematics", "English", "Science", "Social Studies", "Physical Education"],
    optional: ["Computer Science", "Art", "Music", "History", "Geography", "Physics", "Chemistry", "Biology"]
  },
  grades: ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"],
  bloodGroups: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  religions: ["Christianity", "Islam", "Hinduism", "Buddhism", "Judaism", "Other", "Prefer not to say"],
  relationships: ["Father", "Mother", "Legal Guardian", "Grandparent", "Uncle", "Aunt", "Other"],
  healthConditions: ["Allergies", "Asthma", "Diabetes", "None", "Other"],
  specialNeeds: ["Learning Support", "Physical Support", "Behavioral Support", "None"],
  nationalities: ["American", "British", "Canadian", "Nigerian", "Indian", "Chinese", "Other"],
  qualifications: ["Bachelor of Education", "Master of Education", "PhD", "Teaching Certificate", "Other"]
}
