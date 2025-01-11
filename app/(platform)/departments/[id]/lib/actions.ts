'use server'

import { mockData } from './mockData'

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function fetchUpcomingExams() {
  return mockData.upcomingExams
}

export async function fetchSubjects() {
  return mockData.subjects
}

export async function fetchRecentActivities() {
  return mockData.recentActivities
}

export async function fetchAnalyticsSummary() {
  return mockData.analyticsSummary
}

export async function fetchTeachers() {
  return mockData.teachers
}

export async function fetchCourses() {
  return mockData.courses
}

export async function fetchExams() {
  return mockData.exams
}

export async function fetchRooms() {
  return mockData.rooms
}

export async function fetchInvigilators() {
  return mockData.invigilators
}

export async function addCourse(courseData:any) {
  const newCourse = {
    id: mockData.courses.length + 1,
    ...courseData,
    enrolled: 0,
    progress: 0
  }
  mockData.courses.push(newCourse)
  return newCourse
}

export async function searchFaculty(query:string) {
  return mockData.teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(query.toLowerCase()) ||
    teacher.expertise.toLowerCase().includes(query.toLowerCase())
  )
}

export const getDepartmentData = async (id:string)=>{
    const upcomingExams = await fetchUpcomingExams();
    const subjects = await fetchSubjects();
    const recentActivities = await fetchRecentActivities();
    const analyticsSummary = await fetchAnalyticsSummary();
    return {
      upcomingExams,
      subjects,
      recentActivities,
      analyticsSummary,
    };
}