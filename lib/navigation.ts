
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  Users,
} from "lucide-react"

const navigationConfig = {
  user: {
    name: "User Name",
    email: "user@example.com",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      items: [
        { title: "Overview", url: "/dashboard" },
        { title: "Analytics", url: "/dashboard/analytics" },
        { title: "Settings", url: "/dashboard/settings" },
      ]
    },
    {
      title: "Exams",
      url: "/exams",
      icon: BookOpen,
      items: [
        { title: "View Exams", url: "/exams" },
        { title: "Add Exam", url: "/exams/add" },
        { title: "Exam Results", url: "/exams/results" },
      ]
    },
    {
      title: "Portals",
      url: "/portals",
      icon: Command,
      items: [
        { title: "Student Portal", url: "/portals/student" },
        { title: "Teacher Portal", url: "/portals/teacher" },
        { title: "Timetable", url: "/portals/timetable" },
        { title: "Staff Portal", url: "/portals/staff" },
      ]
    },
    {
      title: "Administration",
      url: "/admin",
      icon: Settings2,
      items: [
        { title: "Students", url: "/admin/students" },
        { title: "Courses", url: "/admin/courses" },
        { title: "Teachers", url: "/admin/teachers" },
        { title: "User Management", url: "/admin/users" },
        { title: "Department Settings", url: "/admin/departments" },
        { title: "System Config", url: "/admin/settings" },
      ]
    },
    {
      title: "Departments",
      url: "/departments",
      icon: BookOpen,
      items: [
        { title: "Academic", url: "/departments/academic" },
        { title: "Student Services", url: "/departments/student-services" },
        { title: "Library", url: "/departments/library" },
        { title: "Sports", url: "/departments/sports" },
        { title: "Health", url: "/departments/health" },
        { title: "Social", url: "/departments/social" },
        { title: "Student Affairs", url: "/departments/student-affairs" },
        { title: "Store", url: "/departments/store" },
        { title: "Other", url: "/departments/other" },
      ]
    },
    {
      title: "Clubs",
      url: "#",
      icon: Users,
      items: [
        { title: "View Clubs", url: "/clubs" },
        { title: "Add Club", url: "/clubs/create" },
      ]
    },
    {
      title: "Automation",
      url: "#",
      icon: Bot,
      items: [
        { title: "Automation Dashboard", url: "#" },
        { title: "Automation Settings", url: "#" },
      ]
    }
  ],
  navSecondary: [
    { title: "Support", url: "/support", icon: LifeBuoy },
    { title: "Feedback", url: "/feedback", icon: Send },
  ],
  projects: [
    { name: "Timetable", url: "/timetables", icon: Frame },
    { name: "Exam Tracking", url: "#", icon: PieChart },
    { name: "Student Services", url: "#", icon: Map },
  ]
}

export {
  navigationConfig
}