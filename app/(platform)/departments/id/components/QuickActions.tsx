import React from 'react'
import { ArrowUpRight, Calendar, CheckCircle2, FileUp, PlusCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface QuickActionsProps {
  onSubmitExam: () => void
}

export function QuickActions({ onSubmitExam }: QuickActionsProps) {
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
    <Card className="border-none shadow-md bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group relative overflow-hidden"
          >
            <div
              className={`h-10 w-10 bg-${action.color}-50 rounded-lg flex items-center justify-center group-hover:bg-${action.color}-100 transition-colors`}
            >
              <action.icon
                className={`h-5 w-5 text-${action.color}-600`}
              />
            </div>
            <div className="text-left">
              <span className="font-medium block">{action.label}</span>
              <span className="text-sm text-gray-500">
                {action.desc}
              </span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-gray-400 absolute right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-3 group-hover:translate-x-0" />
          </button>
        ))}
      </CardContent>
    </Card>
  )
}

