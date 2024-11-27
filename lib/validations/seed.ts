import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

// Utility function to generate a unique random identifier
function generateUniqueId(prefix: string, existingIds: Set<string>): string {
  let id;
  do {
    id = `${prefix}${faker.string.numeric(4)}`;
  } while (existingIds.has(id));
  existingIds.add(id);
  return id;
}

// Seed generation function
export async function generateSchoolSeedData() {
  // Set to track unique IDs
  const usedEmails = new Set<string>();
  const usedStudentIds = new Set<string>();
  const usedStaffIds = new Set<string>();

  // Predefined constants
  const GRADE_LEVELS = ['6', '7', '8', '9', '10', '11', '12'];
  const SECTIONS = ['A', 'B', 'C', 'D'];
  const DEPARTMENTS = [
    'Mathematics', 'Science', 'English', 'Social Studies', 
    'Computer Science', 'Physical Education', 'Art', 'Music'
  ];
  const STAFF_TYPES = ['teaching', 'administrative', 'support'];

  // Roles
  const roles = [
    { name: 'Administrator', description: 'Full system access' },
    { name: 'Teacher', description: 'Classroom instruction' },
    { name: 'Counselor', description: 'Student support' },
    { name: 'Staff', description: 'Administrative support' }
  ];

  // Subjects
  const subjects = [
    { name: 'Mathematics', code: 'MATH101', credits: 5, description: 'Comprehensive mathematics curriculum' },
    { name: 'English Language', code: 'ENG101', credits: 4, description: 'Advanced language and literature' },
    { name: 'Physics', code: 'PHYS101', credits: 4, description: 'Classical and modern physics' },
    { name: 'Chemistry', code: 'CHEM101', credits: 4, description: 'Comprehensive chemical studies' },
    { name: 'Biology', code: 'BIO101', credits: 4, description: 'Life sciences and ecosystems' },
    { name: 'Computer Science', code: 'CS101', credits: 5, description: 'Programming and computational thinking' },
    { name: 'History', code: 'HIST101', credits: 3, description: 'World history and civilizations' },
    { name: 'Geography', code: 'GEO101', credits: 3, description: 'Global geographical studies' }
  ];

  // Password generation function
  async function generatePassword(): Promise<string> {
    return await bcrypt.hash('School2024!', 10);
  }

  // Generate Users
  const users = [];
  const adminPassword = await generatePassword();
  for (let i = 0; i < 50; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.helpers.unique(() => 
      faker.internet.email({ firstName, lastName }).toLowerCase()
    );

    users.push({
      email,
      passwordHash: adminPassword,
      firstName,
      lastName,
      roleId: i < 5 ? 1 : i < 20 ? 2 : i < 30 ? 3 : 4,
      isActive: true
    });
  }

  // Generate Staff
  const staff = [];
  const teacherUsers = users.filter((_, index) => index >= 5 && index < 20);
  
  teacherUsers.forEach((user, index) => {
    staff.push({
      userId: user.id, // will be set after insertion
      staffId: generateUniqueId('STAFF', usedStaffIds),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      department: DEPARTMENTS[index % DEPARTMENTS.length],
      position: faker.person.jobTitle(),
      staffType: 'teaching',
      hireDate: faker.date.past({ years: 10 }),
      qualifications: [
        faker.person.jobDescriptor(),
        faker.person.jobType()
      ],
      specializations: [
        faker.science.discipline(),
        faker.science.subdiscipline()
      ],
      isActive: true
    });
  });

  // Generate Students
  const students = [];
  GRADE_LEVELS.forEach(grade => {
    SECTIONS.forEach(section => {
      for (let i = 0; i < 20; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.helpers.unique(() => 
          faker.internet.email({ firstName, lastName }).toLowerCase()
        );

        const studentUser = {
          email,
          passwordHash: adminPassword,
          firstName,
          lastName,
          roleId: 4, // student role
          isActive: true
        };

        users.push(studentUser);

        students.push({
          userId: studentUser.id, // will be set after insertion
          studentId: generateUniqueId('STU', usedStudentIds),
          dateOfBirth: faker.date.past({ years: 18, refDate: new Date('2010-01-01') }),
          grade,
          section,
          guardianName: faker.person.fullName(),
          guardianPhone: faker.phone.number('+1##########'),
          guardianEmail: faker.internet.email(),
          address: faker.location.streetAddress(true)
        });
      }
    });
  });

  // Generate Timetable Slots
  const timetableSlots = [];
  staff.forEach(teacher => {
    const teachingSubjects = subjects.slice(0, 3); // Each teacher teaches 3 subjects
    teachingSubjects.forEach(subject => {
      for (let dayOfWeek = 1; dayOfWeek <= 5; dayOfWeek++) {
        timetableSlots.push({
          teacherId: teacher.id,
          subjectId: subject.id,
          dayOfWeek,
          startTime: `${9 + Math.floor(Math.random() * 4)}:00`,
          endTime: `${10 + Math.floor(Math.random() * 4)}:30`,
          academicYear: '2024-2025',
          semester: 'Fall',
          roomNumber: `Room ${100 + Math.floor(Math.random() * 200)}`
        });
      }
    });
  });

  // Generate Grades
  const grades = [];
  students.forEach(student => {
    subjects.forEach(subject => {
      grades.push({
        studentId: student.id,
        subjectId: subject.id,
        teacherId: staff[Math.floor(Math.random() * staff.length)].id,
        score: parseFloat((Math.random() * 40 + 60).toFixed(2)), // 60-100 range
        gradeType: 'Semester Exam',
        academicTerm: 'Fall 2024',
        academicYear: '2024-2025'
      });
    });
  });

  // Generate Attendance
  const attendance = [];
  students.forEach(student => {
    for (let i = 0; i < 10; i++) {
      attendance.push({
        studentId: student.id,
        date: faker.date.recent({ days: 30 }),
        status: Math.random() > 0.1 ? 'Present' : 'Absent',
        reason: Math.random() > 0.9 ? faker.lorem.sentence() : null
      });
    }
  });

  return {
    roles,
    users,
    staff,
    students,
    subjects,
    timetableSlots,
    grades,
    attendance
  };
}

// Usage example
async function seedDatabase() {
  const seedData = await generateSchoolSeedData();
  
  // Here you would use your database ORM (like Drizzle) to insert the data
  // This is a placeholder for the actual database insertion logic
  console.log('Seed Data Generated:', seedData);
}

// Optional: Export seed function
export default seedDatabase;