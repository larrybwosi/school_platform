
'use server'
export async function getTeacherInfo() {
  return {
    name: "Dr. Sarah Mitchell",
    id: "TCH2025102",
    department: "Computer Science",
    subjects: ["Advanced Programming", "Data Structures", "Web Development"],
    totalStudents: 145,
    expertise: ["AI/ML", "Full Stack Development", "Database Systems"],
    officeHours: "Mon-Thu: 2:00 PM - 4:00 PM",
    email: "s.mitchell@university.edu",
  }
}

export async function getUpcomingClasses() {
  return [
    {
      id: 1,
      class: "CS-301",
      subject: "Advanced Programming",
      time: "09:00 AM",
      room: "Lab 201",
      students: 45,
      topic: "Neural Networks Implementation",
      materialsReady: true,
    },
    {
      id: 2,
      class: "CS-205",
      subject: "Data Structures",
      time: "11:00 AM",
      room: "Hall 102",
      students: 50,
      topic: "Advanced Tree Structures",
      materialsReady: true,
    },
    {
      id: 3,
      class: "CS-401",
      subject: "Web Development",
      time: "02:00 PM",
      room: "Lab 305",
      students: 40,
      topic: "React State Management",
      materialsReady: false,
    },
  ]
}

export async function getSubmissions() {
  return [
    {
      id: 1,
      title: "Neural Network Implementation",
      class: "CS-301",
      pending: 15,
      submitted: 30,
      dueDate: "2025-01-10",
      type: "Project",
    },
    {
      id: 2,
      title: "Binary Tree Operations",
      class: "CS-205",
      pending: 10,
      submitted: 40,
      dueDate: "2025-01-08",
      type: "Assignment",
    },
    {
      id: 3,
      title: "React Component Development",
      class: "CS-401",
      pending: 5,
      submitted: 35,
      dueDate: "2025-01-15",
      type: "Lab",
    },
  ]
}

export async function getAlerts() {
  return [
    {
      id: 1,
      type: "attendance",
      message: "5 students below 75% attendance in CS-301",
      priority: "high",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "performance",
      message: "Grade submission deadline approaching for CS-205",
      priority: "medium",
      timestamp: "1 day ago",
    },
    {
      id: 3,
      type: "system",
      message: "System maintenance scheduled for Sunday, 2 AM - 6 AM",
      priority: "low",
      timestamp: "2 days ago",
    },
  ]
}

export async function getPerformanceMetrics() {
  return {
    "Advanced Programming": {
      averageScore: 87,
      attendance: 92,
      submissions: 95,
      improvement: 5.2,
      topPerformers: 12,
    },
    "Data Structures": {
      averageScore: 84,
      attendance: 88,
      submissions: 91,
      improvement: 3.8,
      topPerformers: 15,
    },
    "Web Development": {
      averageScore: 89,
      attendance: 94,
      submissions: 97,
      improvement: 6.5,
      topPerformers: 18,
    },
  }
}

export async function getTimetable() {
  return [
    { day: 'Monday', slots: [
      { time: '09:00 AM - 10:30 AM', subject: 'Advanced Programming', room: 'Lab 201' },
      { time: '11:00 AM - 12:30 PM', subject: 'Data Structures', room: 'Hall 102' },
      { time: '02:00 PM - 03:30 PM', subject: 'Office Hours', room: 'Office 305' },
    ]},
    { day: 'Tuesday', slots: [
      { time: '10:00 AM - 11:30 AM', subject: 'Web Development', room: 'Lab 305' },
      { time: '01:00 PM - 02:30 PM', subject: 'Advanced Programming', room: 'Lab 201' },
      { time: '03:00 PM - 04:30 PM', subject: 'Office Hours', room: 'Office 305' },
    ]},
    // Add more days as needed
  ]
}

