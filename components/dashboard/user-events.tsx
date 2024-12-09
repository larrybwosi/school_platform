"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";

export function UserEvents() {
  const userEvents = [
    {
      id: "1",
      title: "Coding Competition",
      date: "March 15, 2024",
      location: "Computer Lab",
      club: "Programming Club",
    },
    {
      id: "2",
      title: "Chess Tournament",
      date: "March 20, 2024",
      location: "Main Hall",
      club: "Chess Club",
    },
  ];

  return (
    <div className="space-y-4">
      {userEvents.map((event) => (
        <Card key={event.id}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{event.club}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    {event.location}
                  </div>
                </div>
              </div>
              <Button>View Event</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}