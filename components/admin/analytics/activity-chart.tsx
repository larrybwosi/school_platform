"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Programming', events: 12, attendance: 85 },
  { name: 'Chess', events: 8, attendance: 92 },
  { name: 'Art', events: 15, attendance: 78 },
  { name: 'Sports', events: 20, attendance: 88 },
];

export function ActivityChart() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="events" fill="hsl(var(--primary))" />
          <Bar dataKey="attendance" fill="hsl(var(--secondary))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}