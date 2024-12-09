"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function UserClubs() {
  const userClubs = [
    {
      id: "1",
      name: "Programming Club",
      role: "Member",
      nextMeeting: "Tomorrow at 3 PM",
    },
    {
      id: "2",
      name: "Chess Club",
      role: "Leader",
      nextMeeting: "Friday at 4 PM",
    },
  ];

  return (
    <div className="space-y-4">
      {userClubs.map((club) => (
        <Card key={club.id}>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="font-semibold">{club.name}</h3>
              <p className="text-sm text-muted-foreground">Role: {club.role}</p>
              <p className="text-sm text-muted-foreground">
                Next Meeting: {club.nextMeeting}
              </p>
            </div>
            <Link href={`/clubs/${club.id}`}>
              <Button variant="ghost">
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}