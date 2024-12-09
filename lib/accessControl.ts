import { Teacher, Student } from './mockData';

export function canViewStudent(teacher: Teacher, student: Student): boolean {
  if (teacher.role === 'admin') return true;
  if (teacher.role === 'gradeTeacher' && teacher.grades?.includes(student.grade)) return true;
  if (teacher.role === 'subjectTeacher') {
    return teacher.subjects.some(subject => subject in student.subjects) && teacher.grades?.includes(student.grade) || false;
  }
  return false;
}

export function canEditGrade(teacher: Teacher, student: Student, subject: string): boolean {
  if (teacher.role === 'admin') return true;
  if (teacher.role === 'subjectTeacher' && teacher.subjects.includes(subject) && teacher.grades?.includes(student.grade)) return true;
  return false;
}

export function getViewableStudents(teacher: Teacher, students: Student[]): Student[] {
  return students.filter(student => canViewStudent(teacher, student));
}

export function getEditableSubjects(teacher: Teacher, student: Student): string[] {
  if (teacher.role === 'admin') return Object.keys(student.subjects);
  if (teacher.role === 'subjectTeacher') {
    return teacher.subjects.filter(subject => 
      subject in student.subjects && teacher.grades?.includes(student.grade)
    );
  }
  return [];
}

export function getViewableSubjects(teacher: Teacher, student: Student): string[] {
  if (teacher.role === 'admin' || teacher.role === 'gradeTeacher') return Object.keys(student.subjects);
  if (teacher.role === 'subjectTeacher') {
    return teacher.subjects.filter(subject => subject in student.subjects);
  }
  return [];
}
