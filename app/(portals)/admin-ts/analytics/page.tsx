"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MembershipChart } from "@/components/admin/analytics/membership-chart";
import { ActivityChart } from "@/components/admin/analytics/activity-chart";
import { EngagementMetrics } from "@/components/admin/analytics/engagement-metrics";
import { StudentActivity } from "@/components/admin/analytics/student-activity";
import { GradeComparison } from "@/components/admin/analytics/grade-comparison";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      
      <EngagementMetrics />

      <Tabs defaultValue="membership" className="space-y-4">
        <TabsList>
          <TabsTrigger value="membership">Membership Growth</TabsTrigger>
          <TabsTrigger value="activity">Activity Trends</TabsTrigger>
          <TabsTrigger value="students">Student Rankings</TabsTrigger>
          <TabsTrigger value="grades">Grade Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="membership">
          <Card>
            <CardHeader>
              <CardTitle>Membership Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <MembershipChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ActivityChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="students">
          <StudentActivity />
        </TabsContent>
        <TabsContent value="grades">
          <GradeComparison />
        </TabsContent>
      </Tabs>
    </div>
  );
}