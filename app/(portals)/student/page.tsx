import {
  Bell,
  Book,
  Calendar,
  ChartBar,
  Clock,
  Download,
  FileText,
  Settings,
  User,
  Library,
  Wallet,
  MessageSquare,
  Award,
  Landmark,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StudentPortal = () => {
  const studentInfo = {
    name: "John Doe",
    id: "STD2025001",
    program: "Computer Science",
    semester: "Spring 2025",
    gpa: "3.8",
  };

  const announcements = [
    { id: 1, title: "Mid-term Schedule Released", date: "2025-01-05" },
    { id: 2, title: "Campus Event: Tech Fair", date: "2025-01-10" },
    { id: 3, title: "Library Hours Extended", date: "2025-01-15" },
  ];

  const upcomingClasses = [
    { id: 1, name: "Advanced Mathematics", time: "09:00 AM", room: "Hall 201" },
    { id: 2, name: "Computer Science", time: "11:00 AM", room: "Lab 102" },
    { id: 3, name: "Physics Lab", time: "02:00 PM", room: "Lab 305" },
  ];

  const downloads = [
    { id: 1, name: "Course Syllabus", size: "2.3 MB", type: "PDF" },
    { id: 2, name: "Lab Manual", size: "5.1 MB", type: "PDF" },
    { id: 3, name: "Assignment Template", size: "1.2 MB", type: "DOCX" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header with Student Info */}
      <div className="mb-8 bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {studentInfo.name}
              </h1>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 mt-2 text-sm text-gray-600">
                <p>ID: {studentInfo.id}</p>
                <p>Program: {studentInfo.program}</p>
                <p>Semester: {studentInfo.semester}</p>
                <p>GPA: {studentInfo.gpa}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-blue-500" />
            <MessageSquare className="h-6 w-6 text-gray-600 cursor-pointer hover:text-blue-500" />
            <Settings className="h-6 w-6 text-gray-600 cursor-pointer hover:text-blue-500" />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              <button className="p-3 bg-blue-50 rounded-lg flex flex-col items-center gap-2 hover:bg-blue-100">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="text-xs font-medium">Schedule</span>
              </button>
              <button className="p-3 bg-green-50 rounded-lg flex flex-col items-center gap-2 hover:bg-green-100">
                <Book className="h-5 w-5 text-green-600" />
                <span className="text-xs font-medium">Courses</span>
              </button>
              <button className="p-3 bg-purple-50 rounded-lg flex flex-col items-center gap-2 hover:bg-purple-100">
                <ChartBar className="h-5 w-5 text-purple-600" />
                <span className="text-xs font-medium">Grades</span>
              </button>
              <button className="p-3 bg-orange-50 rounded-lg flex flex-col items-center gap-2 hover:bg-orange-100">
                <Library className="h-5 w-5 text-orange-600" />
                <span className="text-xs font-medium">Library</span>
              </button>
              <button className="p-3 bg-pink-50 rounded-lg flex flex-col items-center gap-2 hover:bg-pink-100">
                <Wallet className="h-5 w-5 text-pink-600" />
                <span className="text-xs font-medium">Fees</span>
              </button>
              <button className="p-3 bg-cyan-50 rounded-lg flex flex-col items-center gap-2 hover:bg-cyan-100">
                <Award className="h-5 w-5 text-cyan-600" />
                <span className="text-xs font-medium">Results</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingClasses.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  <Clock className="h-5 w-5 text-gray-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {lesson.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {lesson.time} • {lesson.room}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Downloads */}
        <Card>
          <CardHeader>
            <CardTitle>Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {downloads.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-600">
                        {file.size} • {file.type}
                      </p>
                    </div>
                  </div>
                  <Download className="h-5 w-5 text-gray-600 hover:text-blue-500" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Financial Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-700">
                    Paid Fees
                  </span>
                  <span className="text-green-700">$8,500</span>
                </div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-red-700">
                    Outstanding
                  </span>
                  <span className="text-red-700">$1,500</span>
                </div>
              </div>
              <button className="w-full mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                Pay Now
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card className="md:col-span-2 lg:col-span-2">
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="border-l-4 border-blue-500 pl-4 py-2"
                >
                  <p className="font-medium text-gray-900">
                    {announcement.title}
                  </p>
                  <p className="text-sm text-gray-600">{announcement.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentPortal;
