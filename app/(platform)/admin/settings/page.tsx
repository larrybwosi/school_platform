"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AcademicSettings } from "./components/academic";
import { ClassRepresentatives } from "./components/classreps";
import { StudentLeader } from "./components/studentleader";
import { useState } from "react";
import { GeneralSettings } from "./components/general";

export default function SettingsPage() {
  const [academicYear, setAcademicYear] = useState("2024");
  const [gradingSystem, setGradingSystem] = useState("letter");
  const [institutionData, setInstitutionData] = useState({
    name: "International School of Excellence",
    type: "K-12",
    foundingYear: "1990",
    motto: "Empowering minds, shaping futures",
    logo: "/placeholder.svg?height=100&width=100",
    email: "contact@school.com",
    phone: "+1 234 567 890",
    address: "123 Education Street, Learning City, 12345",
    website: "https://www.schoolofexcellence.edu",
    socialMedia: {
      facebook: "https://facebook.com/schoolofexcellence",
      twitter: "https://twitter.com/schoolofexcellence",
      instagram: "https://instagram.com/schoolofexcellence",
    },
    accreditations: ["International Baccalaureate", "Cambridge Assessment"],
    facilities: ["Library", "Science Labs", "Sports Complex", "Auditorium"],
  });

  const handleInstitutionDataChange = (newData: Partial<typeof institutionData>) => {
    setInstitutionData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <div className="flex-1 space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
        <GeneralSettings
            institutionData={institutionData}
            onInstitutionDataChange={handleInstitutionDataChange}
          />

        </TabsContent>
        <TabsContent value="academic" className="space-y-4">
          <AcademicSettings
            academicYear={academicYear}
            setAcademicYear={setAcademicYear}
            gradingSystem={gradingSystem}
            setGradingSystem={setGradingSystem}
          />
          <ClassRepresentatives />
          <StudentLeader />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage your notification settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications for important updates
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive SMS alerts for urgent matters
                    </p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive in-app notifications
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security 
                    </p>
                      {/* <boltAction type="file" filePath="app/(dashboard)/dashboard/settings/page.tsx">                    */}
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically log out after inactivity
                    </p>
                  </div>
                  <Select defaultValue="30">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Login History</Label>
                    <p className="text-sm text-muted-foreground">
                      Track all login attempts
                    </p>
                  </div>
                  <Button variant="outline">View History</Button>
                </div>
              </div>
              <Button>Save Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Button variant="outline" className="justify-start">
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="4" />
                      </svg>
                      Light
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z" />
                      </svg>
                      Dark
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                      System
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <Select defaultValue="medium">
                    <SelectTrigger>
                      <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Animations</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable interface animations
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <Button>Save Appearance</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}