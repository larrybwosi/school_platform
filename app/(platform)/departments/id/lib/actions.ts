'use server'

import { mockData } from './mockData'

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function fetchQuickStats() {
  await delay(500)
  return mockData.quickStats
}

export async function fetchUpcomingExams() {
  await delay(500)
  return mockData.upcomingExams
}

export async function fetchSubjects() {
  await delay(500)
  return mockData.subjects
}

export async function fetchRecentActivities() {
  await delay(500)
  return mockData.recentActivities
}

export async function fetchAnalyticsSummary() {
  await delay(500)
  return mockData.analyticsSummary
}

export async function fetchTeachers() {
  await delay(500)
  return mockData.teachers
}

export async function fetchCourses() {
  await delay(500)
  return mockData.courses
}

export async function fetchExams() {
  await delay(500)
  return mockData.exams
}

export async function fetchRooms() {
  await delay(500)
  return mockData.rooms
}

export async function fetchInvigilators() {
  await delay(500)
  return mockData.invigilators
}

export async function addCourse(courseData) {
  await delay(500)
  const newCourse = {
    id: mockData.courses.length + 1,
    ...courseData,
    enrolled: 0,
    progress: 0
  }
  mockData.courses.push(newCourse)
  return newCourse
}

export async function searchFaculty(query) {
  await delay(500)
  return mockData.teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(query.toLowerCase()) ||
    teacher.expertise.toLowerCase().includes(query.toLowerCase())
  )
}

