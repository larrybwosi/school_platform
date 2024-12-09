"use client";

import { Club } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Calendar } from "lucide-react";
import Link from "next/link";

interface ClubCardProps {
  club: Club;
}

export function ClubCard({ club }: ClubCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{club.name}</CardTitle>
            <CardDescription>{club.description}</CardDescription>
          </div>
          <Badge>{club.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-sm">
            <Users className="h-4 w-4" />
            <span>{club.capacity} members max</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span>{club.meetingFrequency}</span>
          </div>
          <Link href={`/clubs/${club.id}`}>
            <Button className="w-full">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}