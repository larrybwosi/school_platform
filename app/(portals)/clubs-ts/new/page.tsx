"use client";

import { ClubForm } from "@/components/clubs/club-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewClubPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create New Club</CardTitle>
        </CardHeader>
        <CardContent>
          <ClubForm />
        </CardContent>
      </Card>
    </div>
  );
}