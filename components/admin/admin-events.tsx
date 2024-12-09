"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";

export function AdminEvents() {
  const events = [
    {
      id: "1",
      title: "Coding Competition",
      date: new Date("2024-03-15"),
      location: "Computer Lab",
      club: "Programming Club",
      participants: 20,
      status: "upcoming",
    },
    {
      id: "2",
      title: "Chess Tournament",
      date: new Date("2024-03-20"),
      location: "Main Hall",
      club: "Chess Club",
      participants: 15,
      status: "upcoming",
    },
  ];

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.id}>
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{event.title}</h3>
                <Badge>{event.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{event.club}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {format(event.date, "MMM d, yyyy")}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  {event.location}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}