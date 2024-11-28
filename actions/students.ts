'use server'
import { mockStudents, Student } from "@/lib/mockData";

interface GetStudentsParams {
  page: number
  sort: { key: keyof Student; direction: 'asc' | 'desc' } | null
  filters: {
    grade: string
    stream: string
    status: string
  }
}

export async function getStudents({ page, sort, filters }: GetStudentsParams): Promise<Student[]> {
  // This is a mock implementation. In a real application, you would fetch data from an API or database.


  let filteredStudents = mockStudents

  // Apply filters
  if (filters.grade) {
    filteredStudents = filteredStudents.filter(student => student.grade.toString() === filters.grade)
  }
  if (filters.stream) {
    filteredStudents = filteredStudents.filter(student => student.stream === filters.stream)
  }
  if (filters.status) {
    filteredStudents = filteredStudents.filter(student => student.status === filters.status)
  }

  // Apply sorting
  if (sort) {
    filteredStudents.sort((a, b) => {
      if (a[sort.key] < b[sort.key]) return sort.direction === 'asc' ? -1 : 1
      if (a[sort.key] > b[sort.key]) return sort.direction === 'asc' ? 1 : -1
      return 0
    })
  }

  // Apply pagination
  const itemsPerPage = 10
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  return filteredStudents.slice(startIndex, endIndex)
}

