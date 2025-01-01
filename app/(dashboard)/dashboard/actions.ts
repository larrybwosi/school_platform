'use server'

import { Student } from "@/lib/mockData"

export async function getStudentData(): Promise<Student> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  return {
    id: "1",
    name: "Jane Smith",
    email: "jane.smith@school.edu",
    avatar: "/api/placeholder/150/150",
    grade: 11,
    stream: "Science",
    subjects: {
      Mathematics: {
        currentGrade: 92,
        pastGrades: [88, 90, 92, 91],
        lastAssessment: {
          name: "Mid-term Exam",
          score: 94,
          date: "2024-12-15",
        },
      },
      Physics: {
        currentGrade: 88,
        pastGrades: [85, 87, 88, 89],
        lastAssessment: {
          name: "Lab Report",
          score: 90,
          date: "2024-12-10",
        },
      },
      Chemistry: {
        currentGrade: 90,
        pastGrades: [87, 89, 90, 92],
        lastAssessment: {
          name: "Quiz",
          score: 92,
          date: "2024-12-18",
        },
      },
    },
    attendance: 95,
    status: "active",
    behavior: "Excellent",
    parentContact: "+1234567890",
    gender: "Female",
    performance: {
      overallGPA: 3.8,
      semesterCredits: 15,
      extracurriculars: ["Science Club", "Debate Team"],
    },
  }
}

export async function getAssignments(studentId: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))

  return [
    {
      id: 1,
      subject: "Physics",
      title: "Quantum Mechanics Report",
      dueDate: "2024-01-15",
      status: "pending",
      progress: 60,
    },
    {
      id: 2,
      subject: "Mathematics",
      title: "Calculus Assignment",
      dueDate: "2024-01-13",
      status: "completed",
      progress: 100,
    },
  ]
}

export async function getNotifications(studentId: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300))

  return [
    {
      id: 1,
      type: "event",
      title: "Annual Sports Day",
      description: "Annual sports day celebration next week",
      date: "2024-01-15",
      priority: "high",
    },
    {
      id: 2,
      type: "academic",
      title: "Mid-Term Examinations",
      description: "Prepare for upcoming mid-term exams",
      date: "2024-01-20",
      priority: "high",
    },
    {
      id: 3,
      type: "club",
      title: "Science Club Meeting",
      description: "Special guest lecture on Quantum Physics",
      date: "2024-01-10",
      priority: "medium",
    },
  ]
}

export async function getUpcomingEvents(studentId: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 400))

  return [
    {
      id: 1,
      title: "Career Counseling Session",
      date: "2024-01-12",
      time: "10:00 AM",
      location: "Auditorium",
      description: "Get guidance from industry experts",
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      date: "2024-01-18",
      time: "2:00 PM",
      location: "Class 11-A",
      description: "Semester progress discussion",
    },
  ]
}

