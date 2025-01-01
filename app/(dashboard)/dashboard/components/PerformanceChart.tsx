'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getStudentData } from '../actions'
import { useEffect, useState } from 'react'
import { Student } from '@/lib/mockData'

export function PerformanceChart({ studentId }: { studentId: string }) {
  const [studentData, setStudentData] = useState<Student | null>(null)

  useEffect(() => {
    getStudentData().then(setStudentData)
  }, [studentId])

  if (!studentData) return <div>Loading...</div>

  const data = Object.entries(studentData.subjects).map(([subject, details]) => ({
    name: subject,
    current: details.currentGrade,
    average:
      details.pastGrades.reduce((a, b) => a + b, 0) /
      details.pastGrades.length,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="current"
          stroke="#8884d8"
          name="Current Grade"
        />
        <Line
          type="monotone"
          dataKey="average"
          stroke="#82ca9d"
          name="Average Grade"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

