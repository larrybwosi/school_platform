'use server'

import { client } from '@/sanity/lib/client'
import { z } from 'zod'

const examSchema = z.object({
  name: z.string(),
  type: z.enum(['cat1', 'cat2', 'endTerm', 'final']),
  date: z.string(),
  academicYear: z.string(),
  subjects: z.array(z.string()),
  grades: z.array(z.string()),
  streams: z.array(z.string()),
})

const examResultSchema = z.object({
  examId: z.string(),
  studentId: z.string(),
  subjectId: z.string(),
  score: z.number().min(0).max(100),
})

export async function createExam(data: z.infer<typeof examSchema>) {
  try {
    const validatedData = examSchema.parse(data)
    const result = await client.create({
      _type: 'exam',
      ...validatedData,
      subjects: validatedData.subjects.map(id => ({ _type: 'reference', _ref: id })),
      grades: validatedData.grades.map(id => ({ _type: 'reference', _ref: id })),
      streams: validatedData.streams.map(id => ({ _type: 'reference', _ref: id })),
    })
    return { success: true, examId: result._id }
  } catch (error) {
    console.error('Error creating exam:', error)
    return { success: false, message: 'Error creating exam' }
  }
}

export async function submitExamResult(data: z.infer<typeof examResultSchema>) {
  try {
    const validatedData = examResultSchema.parse(data)
    const result = await client.create({
      _type: 'examResult',
      exam: { _type: 'reference', _ref: validatedData.examId },
      student: { _type: 'reference', _ref: validatedData.studentId },
      subject: { _type: 'reference', _ref: validatedData.subjectId },
      score: validatedData.score,
    })
    return { success: true, examResultId: result._id }
  } catch (error) {
    console.error('Error submitting exam result:', error)
    return { success: false, message: 'Error submitting exam result' }
  }
}

export async function getExamResults(examId: string) {
  try {
    const results = await client.fetch(`
      *[_type == "examResult" && exam._ref == $examId] {
        _id,
        student->{_id, firstName, lastName},
        subject->{_id, name},
        score
      }
    `, { examId })
    return { success: true, results }
  } catch (error) {
    console.error('Error fetching exam results:', error)
    return { success: false, message: 'Error fetching exam results' }
  }
}

export async function getStudentExamResults(studentId: string) {
  try {
    const results = await client.fetch(`
      *[_type == "examResult" && student._ref == $studentId] {
        _id,
        exam->{_id, name, type, date},
        subject->{_id, name},
        score
      }
    `, { studentId })
    return { success: true, results }
  } catch (error) {
    console.error('Error fetching student exam results:', error)
    return { success: false, message: 'Error fetching student exam results' }
  }
}

export async function getExamPerformance(examId: string) {
  try {
    const exam = await client.fetch(`
      *[_type == "exam" && _id == $examId][0] {
        _id,
        name,
        type,
        date,
        overallPerformance,
        subjectPerformance[]{
          subject->{_id, name},
          averageScore
        },
        teacherPerformance[]{
          teacher->{_id, firstName, lastName},
          averageScore
        },
        gradePerformance[]{
          grade->{_id, level},
          averageScore
        },
        streamPerformance[]{
          stream->{_id, name, grade->{level}},
          averageScore
        }
      }
    `, { examId })
    return { success: true, exam }
  } catch (error) {
    console.error('Error fetching exam performance:', error)
    return { success: false, message: 'Error fetching exam performance' }
  }
}

export async function getExamImprovement(currentExamId: string, previousExamId: string) {
  try {
    const [currentExam, previousExam] = await Promise.all([
      client.fetch(`*[_type == "exam" && _id == $examId][0]`, { examId: currentExamId }),
      client.fetch(`*[_type == "exam" && _id == $examId][0]`, { examId: previousExamId }),
    ])

    const improvement = {
      overall: currentExam.overallPerformance - previousExam.overallPerformance,
      subjects: currentExam.subjectPerformance.map(current => {
        const previous = previousExam.subjectPerformance.find(p => p.subject._ref === current.subject._ref)
        return {
          subject: current.subject,
          improvement: current.averageScore - (previous ? previous.averageScore : 0)
        }
      }),
      teachers: currentExam.teacherPerformance.map(current => {
        const previous = previousExam.teacherPerformance.find(p => p.teacher._ref === current.teacher._ref)
        return {
          teacher: current.teacher,
          improvement: current.averageScore - (previous ? previous.averageScore : 0)
        }
      }),
      grades: currentExam.gradePerformance.map(current => {
        const previous = previousExam.gradePerformance.find(p => p.grade._ref === current.grade._ref)
        return {
          grade: current.grade,
          improvement: current.averageScore - (previous ? previous.averageScore : 0)
        }
      }),
      streams: currentExam.streamPerformance.map(current => {
        const previous = previousExam.streamPerformance.find(p => p.stream._ref === current.stream._ref)
        return {
          stream: current.stream,
          improvement: current.averageScore - (previous ? previous.averageScore : 0)
        }
      }),
    }

    return { success: true, improvement }
  } catch (error) {
    console.error('Error calculating exam improvement:', error)
    return { success: false, message: 'Error calculating exam improvement' }
  }
}

