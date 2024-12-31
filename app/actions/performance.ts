'use server'

import { client } from '@/sanity/lib/client'
import { z } from 'zod'

const performanceSchema = z.object({
  streamId: z.string(),
  subjectId: z.string(),
  averageScore: z.number().min(0).max(100),
})

const teacherPerformanceSchema = z.object({
  teacherId: z.string(),
  subjectId: z.string(),
  streamId: z.string(),
  averageScore: z.number().min(0).max(100),
})

const subjectPerformanceSchema = z.object({
  subjectId: z.string(),
  overallAverageScore: z.number().min(0).max(100),
  streamPerformance: z.array(
    z.object({
      streamId: z.string(),
      averageScore: z.number().min(0).max(100),
    })
  ),
})

export async function updateStreamPerformance(data: z.infer<typeof performanceSchema>) {
  try {
    const validatedData = performanceSchema.parse(data)
    const result = await client
      .patch(validatedData.streamId)
      .setIfMissing({ subjects: [] })
      .insert('after', 'subjects[-1]', [
        {
          subject: {
            _type: 'reference',
            _ref: validatedData.subjectId,
          },
          averageScore: validatedData.averageScore,
        },
      ])
      .commit()

    return { success: true, streamId: result._id }
  } catch (error) {
    console.error('Error updating stream performance:', error)
    return { success: false, message: 'Error updating stream performance' }
  }
}

export async function updateTeacherPerformance(data: z.infer<typeof teacherPerformanceSchema>) {
  try {
    const validatedData = teacherPerformanceSchema.parse(data)
    const result = await client
      .patch(validatedData.teacherId)
      .setIfMissing({ subjectPerformance: [], streamPerformance: [] })
      .insert('after', 'subjectPerformance[-1]', [
        {
          subject: {
            _type: 'reference',
            _ref: validatedData.subjectId,
          },
          averageScore: validatedData.averageScore,
        },
      ])
      .insert('after', 'streamPerformance[-1]', [
        {
          stream: {
            _type: 'reference',
            _ref: validatedData.streamId,
          },
          subject: {
            _type: 'reference',
            _ref: validatedData.subjectId,
          },
          averageScore: validatedData.averageScore,
        },
      ])
      .commit()

    return { success: true, teacherId: result._id }
  } catch (error) {
    console.error('Error updating teacher performance:', error)
    return { success: false, message: 'Error updating teacher performance' }
  }
}

export async function updateSubjectPerformance(data: z.infer<typeof subjectPerformanceSchema>) {
  try {
    const validatedData = subjectPerformanceSchema.parse(data)
    const result = await client
      .patch(validatedData.subjectId)
      .set({
        overallAverageScore: validatedData.overallAverageScore,
        streamPerformance: validatedData.streamPerformance.map(sp => ({
          stream: {
            _type: 'reference',
            _ref: sp.streamId,
          },
          averageScore: sp.averageScore,
        })),
      })
      .commit()

    return { success: true, subjectId: result._id }
  } catch (error) {
    console.error('Error updating subject performance:', error)
    return { success: false, message: 'Error updating subject performance' }
  }
}

export async function calculateOverallStreamPerformance(streamId: string) {
  try {
    const stream = await client.getDocument(streamId)
    if (!stream || !stream.subjects) {
      throw new Error('Stream not found or has no subjects')
    }

    const overallAverage = stream.subjects.reduce((sum, subject) => sum + subject.averageScore, 0) / stream.subjects.length

    const result = await client
      .patch(streamId)
      .set({ overallAverage })
      .commit()

    return { success: true, streamId: result._id, overallAverage }
  } catch (error) {
    console.error('Error calculating overall stream performance:', error)
    return { success: false, message: 'Error calculating overall stream performance' }
  }
}

export async function calculateOverallTeacherPerformance(teacherId: string) {
  try {
    const teacher = await client.getDocument(teacherId)
    if (!teacher || !teacher.subjectPerformance) {
      throw new Error('Teacher not found or has no subject performance data')
    }

    const overallPerformance = teacher.subjectPerformance.reduce((sum, subject) => sum + subject.averageScore, 0) / teacher.subjectPerformance.length

    const result = await client
      .patch(teacherId)
      .set({ overallPerformance })
      .commit()

    return { success: true, teacherId: result._id, overallPerformance }
  } catch (error) {
    console.error('Error calculating overall teacher performance:', error)
    return { success: false, message: 'Error calculating overall teacher performance' }
  }
}

export async function getTopPerformingSubjects(limit: number = 10) {
  try {
    const subjects = await client.fetch(`
      *[_type == "subject"] | order(overallAverageScore desc) [0...${limit}] {
        _id,
        name,
        overallAverageScore
      }
    `)
    return { success: true, subjects }
  } catch (error) {
    console.error('Error fetching top performing subjects:', error)
    return { success: false, message: 'Error fetching top performing subjects' }
  }
}

export async function getTopPerformingTeachers(limit: number = 10) {
  try {
    const teachers = await client.fetch(`
      *[_type == "teacher"] | order(overallPerformance desc) [0...${limit}] {
        _id,
        firstName,
        lastName,
        overallPerformance
      }
    `)
    return { success: true, teachers }
  } catch (error) {
    console.error('Error fetching top performing teachers:', error)
    return { success: false, message: 'Error fetching top performing teachers' }
  }
}

export async function getTopPerformingStreams(limit: number = 10) {
  try {
    const streams = await client.fetch(`
      *[_type == "stream"] | order(overallAverage desc) [0...${limit}] {
        _id,
        name,
        grade->{level},
        overallAverage
      }
    `)
    return { success: true, streams }
  } catch (error) {
    console.error('Error fetching top performing streams:', error)
    return { success: false, message: 'Error fetching top performing streams' }
  }
}

export async function getTopPerformingStudents(options: {
  subjectId?: string,
  gradeId?: string,
  streamId?: string,
  limit?: number
}) {
  const { subjectId, gradeId, streamId, limit = 10 } = options
  let query = '*[_type == "student"]'
  let params = {}

  if (subjectId) {
    query += ' [references($subjectId)]'
    params['subjectId'] = subjectId
  }
  if (gradeId) {
    query += '[grade._ref == $gradeId]'
    params['gradeId'] = gradeId
  }
  if (streamId) {
    query += '[stream._ref == $streamId]'
    params['streamId'] = streamId
  }

  query += ` | order(overallGPA desc) [0...${limit}] {
    _id,
    firstName,
    lastName,
    overallGPA
  }`

  try {
    const students = await client.fetch(query, params)
    return { success: true, students }
  } catch (error) {
    console.error('Error fetching top performing students:', error)
    return { success: false, message: 'Error fetching top performing students' }
  }
}

export async function getLowPerformingStudents(options: {
  subjectId?: string,
  gradeId?: string,
  streamId?: string,
  limit?: number
}) {
  const { subjectId, gradeId, streamId, limit = 10 } = options
  let query = '*[_type == "student"]'
  let params = {}

  if (subjectId) {
    query += ' [references($subjectId)]'
    params['subjectId'] = subjectId
  }
  if (gradeId) {
    query += '[grade._ref == $gradeId]'
    params['gradeId'] = gradeId
  }
  if (streamId) {
    query += '[stream._ref == $streamId]'
    params['streamId'] = streamId
  }

  query += ` | order(overallGPA asc) [0...${limit}] {
    _id,
    firstName,
    lastName,
    overallGPA
  }`

  try {
    const students = await client.fetch(query, params)
    return { success: true, students }
  } catch (error) {
    console.error('Error fetching low performing students:', error)
    return { success: false, message: 'Error fetching low performing students' }
  }
}

export async function getTeacherStreams(teacherId: string) {
  try {
    const streams = await client.fetch(`
      *[_type == "stream" && references($teacherId)] {
        _id,
        name,
        grade->{level}
      }
    `, { teacherId })
    return { success: true, streams }
  } catch (error) {
    console.error('Error fetching teacher streams:', error)
    return { success: false, message: 'Error fetching teacher streams' }
  }
}

export async function getMostImprovedTeachers(limit: number = 10) {
  try {
    const teachers = await client.fetch(`
      *[_type == "teacher"] | order(overallPerformance - coalesce(previousOverallPerformance, 0) desc) [0...${limit}] {
        _id,
        firstName,
        lastName,
        overallPerformance,
        previousOverallPerformance,
        improvement: overallPerformance - coalesce(previousOverallPerformance, 0)
      }
    `)
    return { success: true, teachers }
  } catch (error) {
    console.error('Error fetching most improved teachers:', error)
    return { success: false, message: 'Error fetching most improved teachers' }
  }
}

export async function getMostImprovedStudents(limit: number = 10) {
  try {
    const students = await client.fetch(`
      *[_type == "student"] | order(overallGPA - coalesce(previousOverallGPA, 0) desc) [0...${limit}] {
        _id,
        firstName,
        lastName,
        overallGPA,
        previousOverallGPA,
        improvement: overallGPA - coalesce(previousOverallGPA, 0)
      }
    `)
    return { success: true, students }
  } catch (error) {
    console.error('Error fetching most improved students:', error)
    return { success: false, message: 'Error fetching most improved students' }
  }
}

export async function getStudentSubjectPerformance(studentId: string, subjectId: string) {
  try {
    const performance = await client.fetch(`
      *[_type == "student" && _id == $studentId][0] {
        "performance": performanceHistory[] {
          "exam": exam->{_id, name, type, date},
          "score": subjectPerformance[subject._ref == $subjectId][0].score
        }
      }
    `, { studentId, subjectId })

    return { success: true, performance: performance.performance }
  } catch (error) {
    console.error('Error fetching student subject performance:', error)
    return { success: false, message: 'Error fetching student subject performance' }
  }
}

