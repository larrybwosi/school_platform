'use server'

import { client } from '@/sanity/lib/client'
import { z } from 'zod'


const studentSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  dateOfBirth: z.string(),
  gender: z.enum(['male', 'female', 'other']),
  location: z.string(),
  identificationNumber: z.string(),
  phoneNumber: z.string(),
  parentGuardianName: z.string(),
  parentGuardianContact: z.string(),
  healthCondition: z.string().optional(),
  allergies: z.array(z.string()).optional(),
  grade: z.string(),
  stream: z.string(),
  academicYear: z.string(),
  subjects: z.array(z.object({
    subject: z.string(),
    grade: z.number().min(0).max(100),
  })),
  overallGPA: z.number().min(0).max(4),
})

export async function createStudent(data: z.infer<typeof studentSchema>) {
  try {
    const validatedData = studentSchema.parse(data)
    const result = await client.create({
      _type: 'student',
      ...validatedData,
    })
    return { success: true, studentId: result._id }
  } catch (error) {
    console.error('Error creating student:', error)
    return { success: false, message: 'Error creating student' }
  }
}

export async function updateStudent(id: string, data: Partial<z.infer<typeof studentSchema>>) {
  try {
    const validatedData = studentSchema.partial().parse(data)
    const result = await client.patch(id).set(validatedData).commit()
    return { success: true, studentId: result._id }
  } catch (error) {
    console.error('Error updating student:', error)
    return { success: false, message: 'Error updating student' }
  }
}

export async function deleteStudent(id: string) {
  try {
    await client.delete(id)
    return { success: true }
  } catch (error) {
    console.error('Error deleting student:', error)
    return { success: false, message: 'Error deleting student' }
  }
}

export async function getStudent(id: string) {
  try {
    const student = await client.getDocument(id)
    return { success: true, student }
  } catch (error) {
    console.error('Error fetching student:', error)
    return { success: false, message: 'Error fetching student' }
  }
}

export async function getAllStudents() {
  try {
    const students = await client.fetch('*[_type == "student"]')
    return { success: true, students }
  } catch (error) {
    console.error('Error fetching students:', error)
    return { success: false, message: 'Error fetching students' }
  }
}

