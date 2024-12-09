"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminStats } from "@/components/admin/admin-stats";
import { AdminClubs } from "@/components/admin/admin-clubs";
import { AdminMembers } from "@/components/admin/admin-members";
import { AdminEvents } from "@/components/admin/admin-events";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <AdminStats />

      <Tabs defaultValue="clubs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="clubs">Clubs</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        <TabsContent value="clubs">
          <AdminClubs />
        </TabsContent>
        <TabsContent value="members">
          <AdminMembers />
        </TabsContent>
        <TabsContent value="events">
          <AdminEvents />
        </TabsContent>
      </Tabs>
    </div>
  );
}