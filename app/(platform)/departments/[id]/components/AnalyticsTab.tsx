'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

const performanceData = [
  { subject: 'Math', avgScore: 85, passRate: 92 },
  { subject: 'Science', avgScore: 78, passRate: 88 },
  { subject: 'English', avgScore: 82, passRate: 90 },
  { subject: 'History', avgScore: 75, passRate: 85 },
  { subject: 'Computer Science', avgScore: 90, passRate: 95 },
]

const attendanceData = [
  { month: 'Jan', attendance: 95 },
  { month: 'Feb', attendance: 93 },
  { month: 'Mar', attendance: 97 },
  { month: 'Apr', attendance: 94 },
  { month: 'May', attendance: 96 },
  { month: 'Jun', attendance: 92 },
]

export function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Department Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgScore" fill="#8884d8" name="Average Score" />
                <Bar dataKey="passRate" fill="#82ca9d" name="Pass Rate (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="attendance" stroke="#8884d8" name="Attendance (%)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800">Total Students</h3>
              <p className="text-3xl font-bold text-blue-600">1,234</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">Average GPA</h3>
              <p className="text-3xl font-bold text-green-600">3.7</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800">Faculty Members</h3>
              <p className="text-3xl font-bold text-purple-600">45</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-800">Research Projects</h3>
              <p className="text-3xl font-bold text-yellow-600">23</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

