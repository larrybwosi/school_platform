export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  grade: number;
  borrowedBooks: string[];
}

export const mockStudents: Student[] = [
  {
    id: '1',
    firstName: 'Alice',
    lastName: 'Johnson',
    grade: 10,
    borrowedBooks: ['1', '3']
  },
  {
    id: '2',
    firstName: 'Bob',
    lastName: 'Smith',
    grade: 11,
    borrowedBooks: ['2']
  },
  {
    id: '3',
    firstName: 'Charlie',
    lastName: 'Brown',
    grade: 9,
    borrowedBooks: []
  },
  {
    id: '4',
    firstName: 'Diana',
    lastName: 'Lee',
    grade: 12,
    borrowedBooks: ['4', '5']
  },
  {
    id: '5',
    firstName: 'Ethan',
    lastName: 'Davis',
    grade: 10,
    borrowedBooks: []
  }
];

export function getStudents() {
  return mockStudents;
}

export function getStudentById(id: string) {
  return mockStudents.find(student => student.id === id);
}

export function updateStudent(updatedStudent: Student) {
  const index = mockStudents.findIndex(student => student.id === updatedStudent.id);
  if (index !== -1) {
    mockStudents[index] = updatedStudent;
    return true;
  }
  return false;
}

const mockBorrowRecords = [
  {studentId: '1', bookId: '1', borrowDate: new Date()},
  {studentId: '1', bookId: '3', borrowDate: new Date()},
  {studentId: '2', bookId: '2', borrowDate: new Date()},
  {studentId: '4', bookId: '4', borrowDate: new Date()},
  {studentId: '4', bookId: '5', borrowDate: new Date()},
];

export function getStudentLibraryRecords(studentId: string) {
  const student = getStudentById(studentId);
  if (!student) return null;

  return {
    student,
    borrowRecords: mockBorrowRecords.filter(record => record.studentId === studentId),
  };
}

