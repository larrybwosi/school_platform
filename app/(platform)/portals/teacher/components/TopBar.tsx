'use client'

import { User, Search, Sun, Moon, Bell, Settings } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useTheme } from 'next-themes'

interface TeacherInfo {
  name: string
  id: string
  department: string
  officeHours: string
  totalStudents: number
} 
export default function TopBar({ teacherInfo }: { teacherInfo: TeacherInfo }) {
  const { theme, setTheme} = useTheme()
  const isDark = theme ==='dark'
  return (
    <div
      className={`dark:bg-zinc-800 bg-white rounded-xl p-6 shadow-lg mb-6 transition-colors duration-300`}
    >
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{teacherInfo.name}</h1>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1 mt-2 text-sm opacity-75">
              <p>ID: {teacherInfo.id}</p>
              <p>Department: {teacherInfo.department}</p>
              <p>Students: {teacherInfo.totalStudents}</p>
              <p>Office Hours: {teacherInfo.officeHours}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className={`px-4 py-2 rounded-lg dark:bg-zinc-700 bg-slate-100"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 opacity-50" />
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setTheme(isDark?'light':'dark')}
                className="p-2 rounded-lg hover:bg-opacity-10 hover:bg-white"
              >
                {isDark ? (
                  <Sun className="h-6 w-6" />
                ) : (
                  <Moon className="h-6 w-6" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle theme</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2 rounded-lg hover:bg-opacity-10 hover:bg-white">
                <div className="relative">
                  <Bell className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                    3
                  </span>
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2 rounded-lg hover:bg-opacity-10 hover:bg-white">
                <Settings className="h-6 w-6" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

