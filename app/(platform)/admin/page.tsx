"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  GraduationCap,
  Building,
  TrendingUp,
  Bell,
  Settings,
  Calendar,
  ChevronRight,
  Award,
  Coffee,
  Bookmark,
  FileText,
  UserPlus,
  ClipboardList,
  Briefcase,
  Library,
  School,
  Clock,
  UsersRound,
  Trophy,
  Target,
  Book,
  Database,
} from "lucide-react";

const UnifiedDashboard = () => {
  // Data from both components
  const stats = [
    {
      title: "Total Students",
      value: "12,458",
      change: "+14%",
      icon: Users,
      description: "Active enrollments across all programs",
    },
    {
      title: "Faculty Members",
      value: "486",
      change: "+5%",
      icon: GraduationCap,
      description: "Full-time and adjunct professors",
    },
    {
      title: "Departments",
      value: "24",
      change: "0%",
      icon: Building,
      description: "Academic departments and research centers",
    },
    {
      title: "Course Success Rate",
      value: "92%",
      change: "+3%",
      icon: TrendingUp,
      description: "Average passing rate this semester",
    },
  ];

  const quickLinks = [
    {
      title: "Student Management",
      icon: UserPlus,
      description: "Enrollments, records, and student services",
      color: "bg-blue-500",
      link: "/students",
    },
    {
      title: "Examination Portal",
      icon: ClipboardList,
      description: "Schedule and manage exams",
      color: "bg-purple-500",
      link: "/exams",
    },
    {
      title: "Club Activities",
      icon: Users,
      description: "Student organizations and events",
      color: "bg-green-500",
      link: "/clubs",
    },
    {
      title: "Timetable",
      icon: Clock,
      description: "Course scheduling and room allocation",
      color: "bg-orange-500",
      link: "/timetable",
    },
    {
      title: "Department Portal",
      icon: Building,
      description: "Faculty and department management",
      color: "bg-pink-500",
      link: "/departments",
    },
    {
      title: "System Settings",
      icon: Settings,
      description: "Configuration and permissions",
      color: "bg-gray-500",
      link: "#",
    },
  ];

  const enrollmentData = [
    { month: "Jan", students: 1200, international: 300 },
    { month: "Feb", students: 1350, international: 320 },
    { month: "Mar", students: 1400, international: 350 },
    { month: "Apr", students: 1550, international: 380 },
    { month: "May", students: 1650, international: 400 },
    { month: "Jun", students: 1800, international: 450 },
  ];

  const facultyDistribution = [
    { name: "Engineering", value: 35, color: "#3b82f6" },
    { name: "Sciences", value: 25, color: "#10b981" },
    { name: "Arts", value: 20, color: "#8b5cf6" },
    { name: "Business", value: 20, color: "#f59e0b" },
  ];

  const courses = [
    {
      id: 1,
      name: "Advanced Computer Science",
      faculty: "Engineering",
      enrolled: 145,
      rating: 4.8,
      status: "In Progress",
      completion: 65,
    },
    {
      id: 2,
      name: "Business Analytics",
      faculty: "Business",
      enrolled: 120,
      rating: 4.6,
      status: "In Progress",
      completion: 45,
    },
    {
      id: 3,
      name: "Digital Arts & Design",
      faculty: "Arts",
      enrolled: 95,
      rating: 4.9,
      status: "Starting Soon",
      completion: 0,
    },
  ];

  const alerts = [
    { title: "New Student Applications", count: 156, status: "Pending Review" },
    {
      title: "Course Registration",
      status: "Open",
      deadline: "Closes in 5 days",
    },
    { title: "Faculty Meeting", status: "Scheduled", time: "Tomorrow, 2 PM" },
  ];

  const performanceMetrics = [
    { title: "Average GPA", value: "3.42", trend: "+0.1" },
    { title: "Graduation Rate", value: "94%", trend: "+2%" },
    { title: "Research Publications", value: "847", trend: "+124" },
    { title: "International Students", value: "18%", trend: "+3%" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Notifications */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              University Administration Portal
            </h1>
            <p className="text-muted-foreground mt-2">
              Academic Year 2024-2025
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Bell className="w-6 h-6 text-muted-foreground cursor-pointer" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </div>
            <Settings className="w-6 h-6 text-muted-foreground cursor-pointer" />
          </div>
        </div>

        {/* Enhanced Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const iconName = stat.icon.name?.toLowerCase() || "default";
            return (
              <Card
                key={index}
                className={`bg-gradient-to-br from-${iconName}-500/10 to-${iconName}-600/10 dark:from-${iconName}-500/20 dark:to-${iconName}-600/20 hover:scale-105 transition-transform duration-200`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <stat.icon className={`h-8 w-8 text-${iconName}-500`} />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {stat.title}
                      </p>
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {stat.change} from last semester
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link) => (
            <Card
              key={link.title}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`${link.color} p-3 rounded-lg`}>
                    <link.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {link.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Enrollment Trends</CardTitle>
                  <CardDescription>
                    Monthly student enrollment including international students
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={enrollmentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="students"
                          name="Total Students"
                          stroke="#2563eb"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="international"
                          name="International"
                          stroke="#10b981"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Faculty Distribution</CardTitle>
                  <CardDescription>
                    Student distribution across faculties
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={facultyDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {facultyDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {facultyDistribution.map((faculty, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: faculty.color }}
                          />
                          <span className="text-sm">{faculty.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="hover:shadow-lg transition-shadow duration-200"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold">{course.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {course.faculty}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className={`px-3 py-1 rounded-full text-sm ${
                            course.status === "In Progress"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {course.status}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Enrolled
                        </p>
                        <p className="text-lg font-semibold">
                          {course.enrolled}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Rating</p>
                        <p className="text-lg font-semibold">
                          {course.rating}/5.0
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Completion
                        </p>
                        <p className="text-lg font-semibold">
                          {course.completion}%
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2"
                        style={{ width: `${course.completion}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {performanceMetrics.map((metric) => (
                      <div
                        key={metric.title}
                        className="p-4 bg-secondary rounded-lg"
                      >
                        <p className="text-sm text-muted-foreground">
                          {metric.title}
                        </p>
                        <div className="flex items-end gap-2 mt-1">
                          <span className="text-2xl font-bold">
                            {metric.value}
                          </span>
                          <span className="text-green-500 text-sm">
                            {metric.trend}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resource Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Library Resources</span>
                      <div className="w-48 h-2 bg-secondary rounded-full">
                        <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">75% utilized</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Laboratory Equipment</span>
                      <div className="w-48 h-2 bg-secondary rounded-full">
                        <div className="w-1/2 h-full bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">50% utilized</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Classroom Occupancy</span>
                      <div className="w-48 h-2 bg-secondary rounded-full">
                        <div className="w-4/5 h-full bg-orange-500 rounded-full"></div>
                      </div>
                      <span className="text-sm">80% utilized</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Alerts and Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Priority Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div key={index} className="p-4 bg-secondary rounded-lg">
                    <h4 className="font-medium">{alert.title}</h4>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-muted-foreground">
                        {alert.status}
                      </span>
                      <span className="text-blue-500">
                        {alert.deadline || alert.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 text-center">
                    <p className="text-sm font-bold">JAN</p>
                    <p className="text-xl font-bold">15</p>
                  </div>
                  <div>
                    <p className="font-medium">Board Meeting</p>
                    <p className="text-sm text-muted-foreground">
                      Annual budget review
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 text-center">
                    <p className="text-sm font-bold">JAN</p>
                    <p className="text-xl font-bold">18</p>
                  </div>
                  <div>
                    <p className="font-medium">Semester Start</p>
                    <p className="text-sm text-muted-foreground">Spring 2025</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UnifiedDashboard;
