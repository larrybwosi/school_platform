'use client'
import { ArrowUpRight, Calendar, CheckCircle2, FileUp, PlusCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from '@/lib/utils';


export function QuickActions() {
  
  const onSubmitExam = () => {};
  const actions = [
    {
      label: "Submit Exam Paper",
      icon: FileUp,
      color: "blue",
      desc: "Upload new examination",
      onClick: onSubmitExam,
    },
    {
      label: "Add New Faculty",
      icon: PlusCircle,
      color: "green",
      desc: "Onboard faculty member",
      onClick: () => {},
    },
    {
      label: "View Exam Schedule",
      icon: Calendar,
      color: "purple",
      desc: "Check upcoming dates",
      onClick: () => {},
    },
    {
      label: "Department Reports",
      icon: CheckCircle2,
      color: "amber",
      desc: "View analytics",
      onClick: () => {},
    },
  ]

  return (
    <Card className="border-none shadow-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="w-full flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 group relative overflow-hidden"
          >
            <div
              className={cn(
                "h-12 w-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110",
                `bg-${action.color}-50 dark:bg-${action.color}-900/20`
              )}
            >
              <action.icon
                className={cn(
                  "h-6 w-6",
                  `text-${action.color}-600 dark:text-${action.color}-400`
                )}
              />
            </div>
            <div className="text-left">
              <span className="font-medium text-gray-900 dark:text-white block">
                {action.label}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {action.desc}
              </span>
            </div>
            <ArrowUpRight className="h-5 w-5 text-gray-400 absolute right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0" />
          </button>
        ))}
      </CardContent>
    </Card>
  );
}

