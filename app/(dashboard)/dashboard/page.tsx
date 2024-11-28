"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getOverallInstitutionProgression, getBestPerformedSubject, getTeacherWithIncreasedPerformance, mockSubjects, mockStudents } from "./lib/mockData"
import { TrendingUp, Award, UserCheck, Users } from 'lucide-react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts'
import { motion, useAnimation } from 'framer-motion'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useInView } from "react-intersection-observer"

export default function EnhancedOverview() {
  const [isMobile, setIsMobile] = useState(false)
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const progression = getOverallInstitutionProgression()
  const bestSubject = getBestPerformedSubject()
  const bestTeacher = getTeacherWithIncreasedPerformance()

  const subjectPerformanceData = mockSubjects.map(subject => ({
    name: subject.name,
    averageGrade: subject.averageGrade
  }))

  const studentProgressionData = Array.from({ length: 12 }, (_, i) => {
    const monthData = mockStudents.reduce((acc, student) => {
      const randomProgress = Math.floor(Math.random() * 5) + 1
      return acc + randomProgress
    }, 0) / mockStudents.length

    return {
      month: `M${i + 1}`,
      averageProgress: monthData
    }
  })

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10 
      } 
    }
  }

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        type: "spring", 
        stiffness: 120, 
        damping: 10 
      } 
    }
  }

  const renderMetricCard = (title: string, value: string | number, description: string, icon: React.ReactNode, gradientFrom: string, gradientTo: string, darkFrom: string, darkTo: string) => (
    <motion.div 
      variants={cardVariants} 
      initial="hidden" 
      animate={controls}
      className="transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      <Card 
        className={`
          bg-gradient-to-br ${gradientFrom} ${gradientTo} 
          dark:from-${darkFrom} dark:to-${darkTo} 
          text-white 
          overflow-hidden 
          border-none 
          shadow-xl 
          rounded-2xl 
          hover:ring-4 
          hover:ring-opacity-50 
          hover:ring-white/30
        `}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-6">
          <CardTitle className="text-lg font-semibold tracking-wider">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="text-4xl font-extrabold tracking-tight">{value}</div>
          <p className="text-sm mt-2 opacity-80">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500 dark:from-purple-400 dark:to-blue-300"
        >
          Institution Performance Dashboard
        </motion.h1>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" ref={ref}>
          {renderMetricCard(
            "Overall Progress", 
            `${progression.progression}%`, 
            `From ${progression.previousAverage}% to ${progression.currentAverage}%`, 
            <TrendingUp className="h-7 w-7 opacity-75" />,
            "from-emerald-400 to-teal-500",
            "dark:from-emerald-600 dark:to-teal-700",
            "emerald-600",
            "teal-700"
          )}

          {renderMetricCard(
            "Best Subject", 
            bestSubject.name, 
            `Avg. grade: ${bestSubject.averageGrade}%`, 
            <Award className="h-7 w-7 opacity-75" />,
            "from-sky-400 to-indigo-500",
            "dark:from-sky-600 dark:to-indigo-700",
            "sky-600",
            "indigo-700"
          )}

          {renderMetricCard(
            "Top Teacher", 
            bestTeacher.name, 
            `Perf. increase: ${bestTeacher.performanceIncrease}%`, 
            <UserCheck className="h-7 w-7 opacity-75" />,
            "from-pink-400 to-rose-500",
            "dark:from-pink-600 dark:to-rose-700",
            "pink-600",
            "rose-700"
          )}

          {renderMetricCard(
            "Total Students", 
            mockStudents.length, 
            "Across all grades", 
            <Users className="h-7 w-7 opacity-75" />,
            "from-amber-400 to-orange-500",
            "dark:from-amber-600 dark:to-orange-700",
            "amber-600",
            "orange-700"
          )}
        </div>

        <div className="mt-12 grid gap-8 grid-cols-1 lg:grid-cols-2">
          <motion.div 
            variants={chartVariants} 
            initial="hidden" 
            animate={controls}
          >
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl border-none rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-gray-100 dark:border-gray-700 p-6">
                <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  Subject Performance
                </CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  Comprehensive analysis of subject averages
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ChartContainer
                  config={{
                    averageGrade: {
                      label: "Average Grade",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px] sm:h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subjectPerformanceData} layout={isMobile ? "vertical" : "horizontal"}>
                      {isMobile ? (
                        <XAxis type="number" />
                      ) : (
                        <XAxis dataKey="name" />
                      )}
                      {isMobile ? (
                        <YAxis type="category" dataKey="name" width={100} />
                      ) : (
                        <YAxis />
                      )}
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar 
                        dataKey="averageGrade" 
                        fill="url(#subjectGradient)" 
                        barSize={isMobile ? 20 : 40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 italic">
                  Insights into curriculum performance and subject strengths
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            variants={chartVariants} 
            initial="hidden" 
            animate={controls}
          >
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl border-none rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-gray-100 dark:border-gray-700 p-6">
                <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
                  Student Progression
                </CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400">
                  Student progress tracking over time
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ChartContainer
                  config={{
                    averageProgress: {
                      label: "Average Progress",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px] sm:h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={studentProgressionData}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="averageProgress" 
                        stroke="url(#progressGradient)" 
                        strokeWidth={3} 
                        dot={{ r: 5, strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 italic">
                  Visualizing learning trajectories and growth patterns
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="subjectGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}