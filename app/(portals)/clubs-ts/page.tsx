"use client";

import { useEffect } from "react";
import { useClubStore } from "@/lib/store/clubs";
import { ClubCard } from "@/components/clubs/club-card";
import { ClubFilters } from "@/components/clubs/club-filters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
// import { useAuth } from "@clerk/nextjs";

export default function ClubsPage() {
  const { clubs } = useClubStore();
  const router = useRouter();
  // const { user } = useAuth();

  // const isAdmin = user?.publicMetadata?.role === "admin";
  const isAdmin = true;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">School Clubs</h1>
        {isAdmin && (
          <Button onClick={() => router.push("/clubs/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Create Club
          </Button>
        )}
      </div>
      <ClubFilters />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>
    </div>
  );
}