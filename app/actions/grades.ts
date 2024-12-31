'use server'

import { z } from 'zod'
import { updateStreamPerformance, updateTeacherPerformance, updateSubjectPerformance, calculateOverallStreamPerformance, calculateOverallTeacherPerformance } from './performance'
import { client } from '@/sanity/lib/client'


const gradeSchema = z.object({
  studentId: z.string(),
  subjectId: z.string(),
  teacherId: z.string(),
  score: z.number().min(0).max(100),
})

export async function submitGrade(data: z.infer<typeof gradeSchema>) {
  try {
    const validatedData = gradeSchema.parse(data)

    // Submit the grade
    const result = await client.create({
      _type: 'grade',
      student: { _type: 'reference', _ref: validatedData.studentId },
      subject: { _type: 'reference', _ref: validatedData.subjectId },
      teacher: { _type: 'reference', _ref: validatedData.teacherId },
      score: validatedData.score,
    })

    // Get the student's stream
    const student = await client.getDocument(validatedData.studentId)
    const streamId = student?.stream._ref

    // Update performance metrics
    await updateStreamPerformance({ streamId, subjectId: validatedData.subjectId, averageScore: validatedData.score })
    await updateTeacherPerformance({ teacherId: validatedData.teacherId, subjectId: validatedData.subjectId, streamId, averageScore: validatedData.score })
    await updateSubjectPerformance({ subjectId: validatedData.subjectId, overallAverageScore: validatedData.score, streamPerformance: [{ streamId, averageScore: validatedData.score }] })

    // Recalculate overall performances
    await calculateOverallStreamPerformance(streamId)
    await calculateOverallTeacherPerformance(validatedData.teacherId)

    return { success: true, gradeId: result._id }
  } catch (error) {
    console.error('Error submitting grade:', error)
    return { success: false, message: 'Error submitting grade' }
  }
}

