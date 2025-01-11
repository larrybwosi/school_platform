import {
  Users,
  GraduationCap,
  BookOpen,
  Bell,
  Calendar,
  BarChart,
  Clock,
  ArrowRight,
  Mail,
  FileText,
  HelpCircle,
  Building,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

const PortalsOverview = () => {
  const portalCards = [
    {
      title: "Student Portal",
      icon: GraduationCap,
      description: "Access your courses, grades, and academic resources",
      color: "bg-blue-500",
      features: [
        "Course Registration",
        "Grade Reports",
        "Class Schedule",
        "Academic Calendar",
      ],
      stats: {
        activeUsers: "12,458",
        courses: "245",
      },
      link: "/portals/student",
    },
    {
      title: "Teacher Portal",
      icon: BookOpen,
      description: "Manage your classes, grades, and teaching materials",
      color: "bg-green-500",
      features: [
        "Grade Management",
        "Course Materials",
        "Attendance Tracking",
        "Student Reports",
      ],
      stats: {
        activeUsers: "840",
        courses: "180",
      },
      link: "/portals/teacher",
    },
    {
      title: "Staff Portal",
      icon: Users,
      description: "Access administrative tools and department resources",
      color: "bg-purple-500",
      features: [
        "HR Resources",
        "Department Tools",
        "Reports & Analytics",
        "Document Center",
      ],
      stats: {
        activeUsers: "625",
        departments: "42",
      },
      link: "/portals/staff",
    },
  ];

  const quickLinks = [
    { icon: Calendar, label: "Academic Calendar" },
    { icon: Bell, label: "Announcements" },
    { icon: BarChart, label: "Reports" },
    { icon: Mail, label: "Messages" },
    { icon: FileText, label: "Documents" },
    { icon: HelpCircle, label: "Help Center" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-800 pb-6 mb-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Building className="h-8 w-8 text-blue-500" />
              <h1 className="text-3xl font-bold">University Portals</h1>
            </div>
            <div className="flex items-center gap-4">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-500">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* Welcome Alert */}
          <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 mb-6">
            <AlertDescription className="flex items-center gap-2">
              <span>👋</span> Welcome to the university portal system. Choose
              your portal to get started.
            </AlertDescription>
          </Alert>

          {/* Quick Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {quickLinks.map((link, index) => (
              <button
                key={index}
                className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <link.icon className="h-5 w-5 text-blue-500" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {link.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Portal Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {portalCards.map((portal, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`h-12 w-12 rounded-xl ${portal.color} flex items-center justify-center`}
                  >
                    <portal.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Active Users</div>
                    <div className="font-bold">{portal.stats.activeUsers}</div>
                  </div>
                </div>
                <CardTitle className="text-xl mb-1">{portal.title}</CardTitle>
                <CardDescription>{portal.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    {portal.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Link href={`/portals/${portal.link.split("/").pop()}`} className="w-full flex items-center justify-center gap-2 p-3 mt-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                    Access Portal
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: "Student Portal", status: "Operational" },
                  { label: "Teacher Portal", status: "Operational" },
                  { label: "Staff Portal", status: "Operational" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm text-green-500">
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "System Maintenance", date: "Jan 15, 2024" },
                  { title: "New Features Released", date: "Jan 12, 2024" },
                  { title: "Holiday Schedule", date: "Jan 10, 2024" },
                ].map((announcement, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">
                      {announcement.title}
                    </span>
                    <span className="text-sm text-gray-400">
                      {announcement.date}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 py-8">
          <p>© 2024 University Portal System. All rights reserved.</p>
          <p>Need help? Contact support at support@university.edu</p>
        </div>
      </div>
    </div>
  );
};

export default PortalsOverview;
