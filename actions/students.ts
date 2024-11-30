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
      const aValue = a[sort.key]!
      const bValue = b[sort.key]!

      let compareValue = 0

      if (aValue < bValue) {
        compareValue = -1
      } else if (aValue > bValue) {
        compareValue = 1
      }

      return sort.direction === 'asc' ? compareValue : compareValue * -1
    })

  }

  // Apply pagination
  const itemsPerPage = 10
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  return filteredStudents.slice(startIndex, endIndex)
}

