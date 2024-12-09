"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";

export function AdminClubs() {
  const clubs = [
    {
      id: "1",
      name: "Programming Club",
      category: "Technical",
      members: 25,
      status: "active",
    },
    {
      id: "2",
      name: "Chess Club",
      category: "Academic",
      members: 15,
      status: "active",
    },
  ];

  return (
    <div className="space-y-4">
      {clubs.map((club) => (
        <Card key={club.id}>
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-1">
              <h3 className="font-semibold">{club.name}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{club.category}</Badge>
                <span className="text-sm text-muted-foreground">
                  {club.members} members
                </span>
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