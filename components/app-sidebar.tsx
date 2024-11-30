"use client"
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

import { DatePicker } from "@/components/date-picker"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavSecondary } from "./nav-secondary"

const data = {
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
      url: "/portal",
      icon: Command,
      items: [
        { title: "Student Portal", url: "/portal/student" },
        { title: "Teacher Portal", url: "/portal/teacher" },
        { title: "Staff Portal", url: "/portal/staff" },
      ]
    },
    {
      title: "Administration",
      url: "/admin",
      icon: Settings2,
      items: [
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
      url: "/clubs",
      icon: Users,
      items: [
        { title: "View Clubs", url: "/clubs" },
        { title: "Add Club", url: "/clubs/create" },
      ]
    },
    {
      title: "Automation",
      url: "/automation",
      icon: Bot,
      items: [
        { title: "Automation Dashboard", url: "/automation" },
        { title: "Automation Settings", url: "/automation/settings" },
      ]
    }
  ],
  navSecondary: [
    { title: "Support", url: "/support", icon: LifeBuoy },
    { title: "Feedback", url: "/feedback", icon: Send },
  ],
  projects: [
    { name: "Academic Management", url: "/projects/academic", icon: Frame },
    { name: "Exam Tracking", url: "/projects/exams", icon: PieChart },
    { name: "Student Services", url: "/projects/student-services", icon: Map },
  ]
}

interface Data {

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar> ) {
  return (
    <Sidebar {...props} className="w-fit sidebar-hide-scrollbar">
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />

        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavProjects projects={data.projects} />
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </SidebarContent>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
