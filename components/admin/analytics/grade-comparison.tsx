"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const gradeData = [
  { grade: '9th', participation: 75, events: 45, clubs: 8 },
  { grade: '10th', participation: 82, events: 52, clubs: 10 },
  { grade: '11th', participation: 90, events: 60, clubs: 12 },
  { grade: '12th', participation: 85, events: 48, clubs: 9 },
];

export function GradeComparison() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Grade Level Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={gradeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="grade" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="participation" name="Participation Rate (%)" fill="hsl(var(--primary))" />
              <Bar dataKey="events" name="Events Attended" fill="hsl(var(--secondary))" />
              <Bar dataKey="clubs" name="Active Clubs" fill="hsl(var(--accent))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}