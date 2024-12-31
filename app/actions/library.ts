'use server'

import { client } from '@/sanity/lib/client'
import { z } from 'zod'


const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  isbn: z.string().min(1, "ISBN is required"),
  category: z.enum(['fiction', 'non-fiction', 'textbook', 'reference']),
  quantity: z.number().min(0),
  subjectId: z.string().optional(),
  coverImage: z.object({
    asset: z.object({
      url: z.string(),
    }),
  }).optional(),
})

const borrowingSchema = z.object({
  bookId: z.string(),
  borrowerId: z.string(),
  borrowDate: z.string(),
  dueDate: z.string(),
})

const textbookAssignmentSchema = z.object({
  studentId: z.string(),
  subjectId: z.string(),
  textbookId: z.string(),
  assignedById: z.string(),
  assignmentDate: z.string(),
  academicYear: z.string(),
})

export async function addBook(data: z.infer<typeof bookSchema>) {
  try {
    const validatedData = bookSchema.parse(data)
    const result = await client.create({
      _type: 'book',
      ...validatedData,
      subject: validatedData.subjectId ? { _type: 'reference', _ref: validatedData.subjectId } : undefined,
    })
    return { success: true, bookId: result._id }
  } catch (error) {
    console.error('Error adding book:', error)
    return { success: false, message: 'Error adding book' }
  }
}

export async function updateBook(id: string, data: Partial<z.infer<typeof bookSchema>>) {
  try {
    const validatedData = bookSchema.partial().parse(data)
    const updateData: any = { ...validatedData }
    if (validatedData.subjectId) {
      updateData.subject = { _type: 'reference', _ref: validatedData.subjectId }
      delete updateData.subjectId
    }
    const result = await client.patch(id).set(updateData).commit()
    return { success: true, bookId: result._id }
  } catch (error) {
    console.error('Error updating book:', error)
    return { success: false, message: 'Error updating book' }
  }
}

export async function deleteBook(id: string) {
  try {
    await client.delete(id)
    return { success: true }
  } catch (error) {
    console.error('Error deleting book:', error)
    return { success: false, message: 'Error deleting book' }
  }
}

export async function getBook(id: string) {
  try {
    const book = await client.fetch(`*[_type == "book" && _id == $id][0]`, { id })
    return { success: true, book }
  } catch (error) {
    console.error('Error fetching book:', error)
    return { success: false, message: 'Error fetching book' }
  }
}

export async function getAllBooks() {
  try {
    const books = await client.fetch(`*[_type == "book"] | order(title asc)`)
    return { success: true, books }
  } catch (error) {
    console.error('Error fetching books:', error)
    return { success: false, message: 'Error fetching books' }
  }
}

export async function borrowBook(data: z.infer<typeof borrowingSchema>) {
  try {
    const validatedData = borrowingSchema.parse(data)
    
    // Check if the user has reached their borrowing limit
    const borrower = await client.fetch(`*[_type in ["student", "teacher"] && _id == $id][0]`, { id: validatedData.borrowerId })
    const borrowingLimit = borrower._type === 'student' ? 3 : 4
    const activeBorrowings = await client.fetch(`count(*[_type == "borrowing" && borrower._ref == $borrowerId && status == "borrowed"])`, { borrowerId: validatedData.borrowerId })
    
    if (activeBorrowings >= borrowingLimit) {
      return { success: false, message: 'Borrowing limit reached' }
    }

    const result = await client.create({
      _type: 'borrowing',
      book: { _type: 'reference', _ref: validatedData.bookId },
      borrower: { _type: 'reference', _ref: validatedData.borrowerId },
      borrowDate: validatedData.borrowDate,
      dueDate: validatedData.dueDate,
      status: 'borrowed',
    })
    return { success: true, borrowingId: result._id }
  } catch (error) {
    console.error('Error borrowing book:', error)
    return { success: false, message: 'Error borrowing book' }
  }
}

export async function returnBook(borrowingId: string) {
  try {
    const result = await client
      .patch(borrowingId)
      .set({
        returnDate: new Date().toISOString().split('T')[0],
        status: 'returned',
      })
      .commit()
    return { success: true, borrowingId: result._id }
  } catch (error) {
    console.error('Error returning book:', error)
    return { success: false, message: 'Error returning book' }
  }
}

export async function assignTextbook(data: z.infer<typeof textbookAssignmentSchema>) {
  try {
    const validatedData = textbookAssignmentSchema.parse(data)
    
    // Check if the student already has a textbook assigned for this subject
    const existingAssignment = await client.fetch(`*[_type == "textbookAssignment" && student._ref == $studentId && subject._ref == $subjectId && status == "assigned"][0]`, {
      studentId: validatedData.studentId,
      subjectId: validatedData.subjectId,
    })

    if (existingAssignment) {
      return { success: false, message: 'Student already has a textbook assigned for this subject' }
    }

    const result = await client.create({
      _type: 'textbookAssignment',
      student: { _type: 'reference', _ref: validatedData.studentId },
      subject: { _type: 'reference', _ref: validatedData.subjectId },
      textbook: { _type: 'reference', _ref: validatedData.textbookId },
      assignedBy: { _type: 'reference', _ref: validatedData.assignedById },
      assignmentDate: validatedData.assignmentDate,
      academicYear: validatedData.academicYear,
      status: 'assigned',
    })
    return { success: true, assignmentId: result._id }
  } catch (error) {
    console.error('Error assigning textbook:', error)
    return { success: false, message: 'Error assigning textbook' }
  }
}

export async function returnTextbook(assignmentId: string) {
  try {
    const result = await client
      .patch(assignmentId)
      .set({
        returnDate: new Date().toISOString().split('T')[0],
        status: 'returned',
      })
      .commit()
    return { success: true, assignmentId: result._id }
  } catch (error) {
    console.error('Error returning textbook:', error)
    return { success: false, message: 'Error returning textbook' }
  }
}

export async function getBorrowingsForUser(userId: string) {
  try {
    const borrowings = await client.fetch(`
      *[_type == "borrowing" && borrower._ref == $userId] {
        _id,
        book->,
        borrowDate,
        dueDate,
        returnDate,
        status
      } | order(borrowDate desc)
    `, { userId })
    return { success: true, borrowings }
  } catch (error) {
    console.error('Error fetching borrowings:', error)
    return { success: false, message: 'Error fetching borrowings' }
  }
}

export async function getTextbookAssignmentsForStudent(studentId: string) {
  try {
    const assignments = await client.fetch(`
      *[_type == "textbookAssignment" && student._ref == $studentId] {
        _id,
        subject->,
        textbook->,
        assignmentDate,
        academicYear,
        returnDate,
        status
      } | order(assignmentDate desc)
    `, { studentId })
    return { success: true, assignments }
  } catch (error) {
    console.error('Error fetching textbook assignments:', error)
    return { success: false, message: 'Error fetching textbook assignments' }
  }
}

export async function getOverdueTextbooks() {
  try {
    const currentDate = new Date().toISOString().split('T')[0]
    const overdueAssignments = await client.fetch(`
      *[_type == "textbookAssignment" && status == "assigned" && academicYear < $currentYear] {
        _id,
        student->,
        subject->,
        textbook->,
        assignmentDate,
        academicYear
      } | order(academicYear asc)
    `, { currentYear: currentDate.substring(0, 4) })
    return { success: true, overdueAssignments }
  } catch (error) {
    console.error('Error fetching overdue textbooks:', error)
    return { success: false, message: 'Error fetching overdue textbooks' }
  }
}

export async function getStudentsWithTextbooksByGrade(gradeId: string) {
  try {
    const students = await client.fetch(`
      *[_type == "student" && grade._ref == $gradeId] {
        _id,
        firstName,
        lastName,
        "textbooks": *[_type == "textbookAssignment" && student._ref == ^._id && status == "assigned"] {
          _id,
          subject->,
          textbook->,
          assignmentDate,
          academicYear
        }
      } | order(lastName asc)
    `, { gradeId })
    return { success: true, students }
  } catch (error) {
    console.error('Error fetching students with textbooks:', error)
    return { success: false, message: 'Error fetching students with textbooks' }
  }
}

export async function getBooks(page: number = 1, pageSize: number = 30, orderBy: string = 'title') {
  try {
    const start = (page - 1) * pageSize
    const end = start + pageSize

    const books = await client.fetch(`
      *[_type == "book"] | order(${orderBy}) [${start}...${end}] {
        _id,
        title,
        author,
        isbn,
        category,
        quantity,
        "coverImage": coverImage.asset->url
      }
    `)

    const totalBooks = await client.fetch('count(*[_type == "book"])')

    return { 
      success: true, 
      books,
      pagination: {
        currentPage: page,
        pageSize,
        totalBooks,
        totalPages: Math.ceil(totalBooks / pageSize)
      }
    }
  } catch (error) {
    console.error('Error fetching books:', error)
    return { success: false, message: 'Error fetching books' }
  }
}

export async function getUserBorrowingStatus(userId: string) {
  try {
    const user = await client.fetch(`
      *[_type in ["student", "teacher"] && _id == $userId][0] {
        _type,
        firstName,
        lastName,
        "activeBorrowings": count(*[_type == "borrowing" && borrower._ref == $userId && status == "borrowed"])
      }
    `, { userId })

    const borrowingLimit = user._type === 'student' ? 3 : 4
    const canBorrow = user.activeBorrowings < borrowingLimit

    return { 
      success: true, 
      user: {
        name: `${user.firstName} ${user.lastName}`,
        type: user._type,
        activeBorrowings: user.activeBorrowings,
        borrowingLimit,
        canBorrow
      }
    }
  } catch (error) {
    console.error('Error fetching user borrowing status:', error)
    return { success: false, message: 'Error fetching user borrowing status' }
  }
}

export async function getGradeBorrowingStatistics() {
  try {
    const statistics = await client.fetch(`
      *[_type == "grade"] {
        _id,
        level,
        "borrowCount": count(*[_type == "borrowing" && borrower->grade._ref == ^._id]),
        "studentCount": count(*[_type == "student" && grade._ref == ^._id]),
        "averageBorrowingsPerStudent": count(*[_type == "borrowing" && borrower->grade._ref == ^._id]) / count(*[_type == "student" && grade._ref == ^._id])
      } | order(averageBorrowingsPerStudent desc)
    `)

    return { success: true, statistics }
  } catch (error) {
    console.error('Error fetching grade borrowing statistics:', error)
    return { success: false, message: 'Error fetching grade borrowing statistics' }
  }
}

export async function getLibraryYearlySummary(year: number) {
  try {
    const summary = await client.fetch(`
      *[_type == "librarySummary" && year == $year][0]
    `, { year })

    return { success: true, summary }
  } catch (error) {
    console.error('Error fetching library yearly summary:', error)
    return { success: false, message: 'Error fetching library yearly summary' }
  }
}

export async function getLibraryRoles() {
  try {
    const roles = await client.fetch(`
      *[_type == "libraryRole" && !defined(endDate)] {
        _id,
        role,
        "person": person->{_id, firstName, lastName, _type},
        startDate
      }
    `)

    return { success: true, roles }
  } catch (error) {
    console.error('Error fetching library roles:', error)
    return { success: false, message: 'Error fetching library roles' }
  }
}

