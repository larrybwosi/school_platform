"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCog, UserMinus } from "lucide-react";

export function AdminMembers() {
  const members = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "leader",
      clubs: ["Programming Club", "Chess Club"],
      status: "active",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "member",
      clubs: ["Art Club"],
      status: "active",
    },
  ];

  return (
    <div className="space-y-4">
      {members.map((member) => (
        <Card key={member.id}>
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-1">
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge>{member.role}</Badge>
                {member.clubs.map((club) => (
                  <Badge key={club} variant="outline">
                    {club}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <UserCog className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <UserMinus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}