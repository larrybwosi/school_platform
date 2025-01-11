import { Users, BookOpen, CheckSquare, Award } from 'lucide-react'

export default function QuickStats({ teacherInfo }) {
  const stats = [
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      label: "Total Students",
      value: teacherInfo.totalStudents,
      bg: "bg-blue-100",
      trend: "+12% this semester",
    },
    {
      icon: <BookOpen className="h-6 w-6 text-green-600" />,
      label: "Classes Today",
      value: "3",
      bg: "bg-green-100",
      trend: "2 labs, 1 lecture",
    },
    {
      icon: <CheckSquare className="h-6 w-6 text-purple-600" />,
      label: "Pending Reviews",
      value: "30",
      bg: "bg-purple-100",
      trend: "Due in 48 hours",
    },
    {
      icon: <Award className="h-6 w-6 text-orange-600" />,
      label: "Average Score",
      value: "85.2%",
      bg: "bg-orange-100",
      trend: "+3.5% from last term",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className={`dark:bg-zinc-800 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-3 ${stat.bg} rounded-lg`}>{stat.icon}</div>
            <div>
              <p className="text-sm opacity-75">{stat.label}</p>
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-xs mt-1 text-green-500">{stat.trend}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

