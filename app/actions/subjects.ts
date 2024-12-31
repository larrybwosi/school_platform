'use server'

export async function getSubjectConfig(gradeLevel: string) {
  // For now, return mock data
  return {
    compulsorySubjects: [
      { _id: '1', name: 'Mathematics', code: 'MATH101' },
      { _id: '2', name: 'English', code: 'ENG101' },
      { _id: '3', name: 'Science', code: 'SCI101' },
    ],
    optionalSubjects: [
      { _id: '4', name: 'History', code: 'HIS101' },
      { _id: '5', name: 'Geography', code: 'GEO101' },
      { _id: '6', name: 'Art', code: 'ART101' },
      { _id: '7', name: 'Music', code: 'MUS101' },
    ],
    minOptionalSubjects: 2,
    maxOptionalSubjects: 3,
  }
}

export async function getAllSubjects() {
  // For now, return mock data
  return [
    { _id: '1', name: 'Mathematics', code: 'MATH101' },
    { _id: '2', name: 'English', code: 'ENG101' },
    { _id: '3', name: 'Science', code: 'SCI101' },
    { _id: '4', name: 'History', code: 'HIS101' },
    { _id: '5', name: 'Geography', code: 'GEO101' },
    { _id: '6', name: 'Art', code: 'ART101' },
    { _id: '7', name: 'Music', code: 'MUS101' },
  ]
}

