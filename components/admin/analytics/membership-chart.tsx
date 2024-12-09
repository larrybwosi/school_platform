"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', members: 65 },
  { month: 'Feb', members: 85 },
  { month: 'Mar', members: 110 },
  { month: 'Apr', members: 128 },
];

export function MembershipChart() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="members" stroke="hsl(var(--primary))" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}