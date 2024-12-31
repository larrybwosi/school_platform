'use server'

import { client } from '@/sanity/lib/client'
import { z } from 'zod'

const teacherSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  dateOfBirth: z.string(),
  gender: z.enum(['male', 'female', 'other']),
  location: z.string(),
  identificationNumber: z.string(),
  phoneNumber: z.string(),
  subjects: z.array(z.string()),
  previousEmployer: z.string().optional(),
  yearsOfExperience: z.number().min(0),
  qualifications: z.array(z.string()),
  gradesTeaching: z.array(z.string()),
  streamsTeaching: z.array(z.string()),
  academicYear: z.string(),
})

export async function createTeacher(data: z.infer<typeof teacherSchema>) {
  try {
    const validatedData = teacherSchema.parse(data)
    const result = await client.create({
      _type: 'teacher',
      ...validatedData,
    })
    return { success: true, teacherId: result._id }
  } catch (error) {
    console.error('Error creating teacher:', error)
    return { success: false, message: 'Error creating teacher' }
  }
}

export async function updateTeacher(id: string, data: Partial<z.infer<typeof teacherSchema>>) {
  try {
    const validatedData = teacherSchema.partial().parse(data)
    const result = await client.patch(id).set(validatedData).commit()
    return { success: true, teacherId: result._id }
  } catch (error) {
    console.error('Error updating teacher:', error)
    return { success: false, message: 'Error updating teacher' }
  }
}

export async function deleteTeacher(id: string) {
  try {
    await client.delete(id)
    return { success: true }
  } catch (error) {
    console.error('Error deleting teacher:', error)
    return { success: false, message: 'Error deleting teacher' }
  }
}

export async function getTeacher(id: string) {
  try {
    const teacher = await client.getDocument(id)
    return { success: true, teacher }
  } catch (error) {
    console.error('Error fetching teacher:', error)
    return { success: false, message: 'Error fetching teacher' }
  }
}

export async function getAllTeachers() {
  try {
    const teachers = await client.fetch('*[_type == "teacher"]')
    return { success: true, teachers }
  } catch (error) {
    console.error('Error fetching teachers:', error)
    return { success: false, message: 'Error fetching teachers' }
  }
}

