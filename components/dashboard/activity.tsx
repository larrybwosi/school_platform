"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

export function Activity() {
  const activities = [
    {
      id: 1,
      description: "Joined Programming Club",
      date: "2 hours ago",
    },
    {
      id: 2,
      description: "Registered for Coding Competition",
      date: "1 day ago",
    },
    {
      id: 3,
      description: "Submitted project proposal",
      date: "3 days ago",
    },
  ];

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <span>{activity.description}</span>
            <span className="text-sm text-muted-foreground">{activity.date}</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}