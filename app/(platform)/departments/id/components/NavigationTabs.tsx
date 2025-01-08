'use client'

import React from 'react'
import { BarChart3, Book, BookOpen, GraduationCap, User } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface NavigationTabsProps {
  selectedTab: string
  setSelectedTab: (tab: string) => void
}

export function NavigationTabs({ selectedTab, setSelectedTab }: NavigationTabsProps) {
  const tabs = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "exams", label: "Exams", icon: Book },
    { id: "faculty", label: "Faculty", icon: User },
    { id: "courses", label: "Courses", icon: GraduationCap },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ]

  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
      <TabsList className="bg-white p-1 rounded-lg shadow-sm w-full justify-start overflow-x-auto">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md"
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

