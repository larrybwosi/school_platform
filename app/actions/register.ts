'use server'

import { client } from "@/sanity/lib/client"

export async function registerStudent(data: any) {
  try {
    const result = await client.create({
      _type: 'student',
      ...data,
    })
    return { success: true, studentId: result._id }
  } catch (error) {
    console.error('Error registering student:', error)
    return { success: false, message: 'Error registering student' }
  }
}

export async function registerTeacher(data: any) {
  try {
    const result = await client.create({
      _type: 'teacher',
      ...data,
    })
    return { success: true, teacherId: result._id }
  } catch (error) {
    console.error('Error registering teacher:', error)
    return { success: false, message: 'Error registering teacher' }
  }
}

