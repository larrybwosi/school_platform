import {
  Users,
  BookOpen,
  Bell,
  Settings,
  User,
  FileText,
  CheckSquare,
  Mail,
  Award,
  Folder,
  Clock,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TeacherPortal = () => {
  const teacherInfo = {
    name: "Dr. Sarah Mitchell",
    id: "TCH2025102",
    department: "Computer Science",
    subjects: ["Advanced Programming", "Data Structures", "Web Development"],
    totalStudents: 145,
  };

  const upcomingClasses = [
    {
      id: 1,
      class: "CS-301",
      subject: "Advanced Programming",
      time: "09:00 AM",
      room: "Lab 201",
      students: 45,
    },
    {
      id: 2,
      class: "CS-205",
      subject: "Data Structures",
      time: "11:00 AM",
      room: "Hall 102",
      students: 50,
    },
    {
      id: 3,
      class: "CS-401",
      subject: "Web Development",
      time: "02:00 PM",
      room: "Lab 305",
      students: 40,
    },
  ];

  const submissions = [
    {
      id: 1,
      title: "Assignment 3",
      class: "CS-301",
      pending: 15,
      submitted: 30,
    },
    {
      id: 2,
      title: "Project Phase 1",
      class: "CS-205",
      pending: 10,
      submitted: 40,
    },
    { id: 3, title: "Lab Report", class: "CS-401", pending: 5, submitted: 35 },
  ];

  const alerts = [
    {
      id: 1,
      type: "attendance",
      message: "5 students below 75% attendance in CS-301",
    },
    {
      id: 2,
      type: "performance",
      message: "Grade submission deadline approaching",
    },
    { id: 3, type: "system", message: "Scheduled maintenance on Sunday" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      {/* Top Bar */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {teacherInfo.name}
              </h1>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 mt-2 text-sm text-slate-600">
                <p>ID: {teacherInfo.id}</p>
                <p>Department: {teacherInfo.department}</p>
                <p>Students: {teacherInfo.totalStudents}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-slate-100">
              <Bell className="h-6 w-6 text-slate-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-slate-100">
              <Mail className="h-6 w-6 text-slate-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-slate-100">
              <Settings className="h-6 w-6 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Students</p>
              <p className="text-xl font-bold text-slate-900">145</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Classes Today</p>
              <p className="text-xl font-bold text-slate-900">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <CheckSquare className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Pending Reviews</p>
              <p className="text-xl font-bold text-slate-900">30</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Award className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Average Score</p>
              <p className="text-xl font-bold text-slate-900">85.2%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today&apos;s Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="flex flex-col gap-2 p-3 bg-slate-50 rounded-lg hover:bg-slate-100"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-900">
                      {cls.subject}
                    </span>
                    <span className="text-sm text-slate-600">{cls.time}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>
                      {cls.class} • {cls.room}
                    </span>
                    <span>{cls.students} students</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submissions Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Pending Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-slate-900">
                      {sub.title}
                    </span>
                    <span className="text-sm text-slate-600">{sub.class}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${(sub.submitted / (sub.submitted + sub.pending)) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-green-600">
                      {sub.submitted} Submitted
                    </span>
                    <span className="text-red-600">{sub.pending} Pending</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Important Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 bg-slate-50 rounded-lg border-l-4 border-yellow-500"
                >
                  <p className="text-sm font-medium text-slate-900">
                    {alert.message}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Tap to view details
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Analytics */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Class Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {teacherInfo.subjects.map((subject, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-lg">
                  <h3 className="font-medium text-slate-900 mb-2">{subject}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Average Score</span>
                      <span className="text-slate-900">87%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Attendance</span>
                      <span className="text-slate-900">92%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Submissions</span>
                      <span className="text-slate-900">95%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resource Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              Course Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teacherInfo.subjects.map((subject, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-900">
                      {subject}
                    </span>
                    <span className="text-sm text-slate-600">12 files</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      Slides
                    </span>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                      Notes
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">
                      Labs
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherPortal;
