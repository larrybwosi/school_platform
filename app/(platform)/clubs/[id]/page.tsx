"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Calendar,
  Users,
  Target,
  Clock,
  CheckCircle2,
  XCircle,
  PauseCircle,
  PlayCircle,
  Settings,
  Plus,
  Image as ImageIcon,
  Upload,
  Edit,
  Trash2,
} from "lucide-react";


const mockClub = {
  id: "1",
  name: "Robotics Club",
  description:
    "A club dedicated to building and programming robots for competitions and learning purposes.",
  teacher: "Dr. Sarah Johnson",
  president: "Michael Chang",
  secretary: "Emily Rodriguez",
  createdAt: new Date("2023-09-01"),
  updatedAt: new Date("2024-01-15"),
  category: "Technology",
  meetingSchedule: "Every Tuesday and Thursday, 3:30 PM - 5:00 PM",
  members: [
    {
      id: "m1",
      userId: "u1",
      clubId: "1",
      name: "Michael Chang",
      email: "michael.c@school.edu",
      role: "PRESIDENT",
      joinedAt: new Date("2023-09-01"),
      isStudent: true,
    },
    {
      id: "m2",
      userId: "u2",
      clubId: "1",
      name: "Emily Rodriguez",
      email: "emily.r@school.edu",
      role: "SECRETARY",
      joinedAt: new Date("2023-09-01"),
      isStudent: true,
    },
  ],
  projects: [
    {
      id: "p1",
      clubId: "1",
      name: "Battle Bot 2024",
      description:
        "Design and build a competitive battle robot for the regional championship",
      status: "IN_PROGRESS",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-05-30"),
      leadStudent: "Michael Chang",
      customFields: [
        { name: "Budget", value: "$2500" },
        { name: "Competition Date", value: "May 30, 2024" },
      ],
      milestones: [
        {
          id: "ms1",
          projectId: "p1",
          title: "Design Phase",
          description: "Complete robot design and blueprints",
          dueDate: new Date("2024-02-15"),
          status: "COMPLETED",
          completedAt: new Date("2024-02-10"),
          customFields: [],
          isCompleted: true,
        },
        {
          id: "ms2",
          projectId: "p1",
          title: "Building Phase",
          description: "Construct the robot according to design specifications",
          dueDate: new Date("2024-04-15"),
          status: "IN_PROGRESS",
          customFields: [],
          isCompleted: false,
        },
      ],
    },
  ],
};


const ProjectStatusBadge = ({ status }) => {
  const statusColors = {
    NOT_STARTED: "bg-gray-200 text-gray-700",
    IN_PROGRESS: "bg-blue-100 text-blue-700",
    ON_HOLD: "bg-yellow-100 text-yellow-700",
    COMPLETED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  const statusIcons = {
    NOT_STARTED: <Clock className="w-4 h-4" />,
    IN_PROGRESS: <PlayCircle className="w-4 h-4" />,
    ON_HOLD: <PauseCircle className="w-4 h-4" />,
    COMPLETED: <CheckCircle2 className="w-4 h-4" />,
    CANCELLED: <XCircle className="w-4 h-4" />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${statusColors[status]}`}
    >
      {statusIcons[status]}
      {status.replace("_", " ")}
    </span>
  );
};

const ProjectForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    leadStudent: "",
    status: "NOT_STARTED",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Project Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="leadStudent">Lead Student</Label>
        <Input
          id="leadStudent"
          value={formData.leadStudent}
          onChange={(e) =>
            setFormData({ ...formData, leadStudent: e.target.value })
          }
          required
        />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Create Project</Button>
      </DialogFooter>
    </form>
  );
};

const ProjectCard = ({ project }) => {
  const completedMilestones = project.milestones.filter(
    (m) => m.isCompleted
  ).length;
  const progress = (completedMilestones / project.milestones.length) * 100;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{project.name}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </div>
          <ProjectStatusBadge status={project.status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Project Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Project Details
            </h4>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Start Date
                </dt>
                <dd className="text-gray-900">
                  {project.startDate.toLocaleDateString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">End Date</dt>
                <dd className="text-gray-900">
                  {project.endDate?.toLocaleDateString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">
                  Lead Student
                </dt>
                <dd className="text-gray-900">{project.leadStudent}</dd>
              </div>
            </dl>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-medium text-gray-500">Milestones</h4>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Add Milestone
              </Button>
            </div>
            <div className="space-y-3">
              {project.milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="space-y-1">
                    <h5 className="font-medium text-gray-900">
                      {milestone.title}
                    </h5>
                    <p className="text-sm text-gray-500">
                      {milestone.description}
                    </p>
                    <p className="text-xs text-gray-400">
                      Due: {milestone.dueDate.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        milestone.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : milestone.status === "IN_PROGRESS"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {milestone.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline">
          <Edit className="w-4 h-4 mr-1" />
          Edit Project
        </Button>
        <Button variant="destructive">
          <Trash2 className="w-4 h-4 mr-1" />
          Delete Project
        </Button>
      </CardFooter>
    </Card>
  );
};

const ClubDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [clubSettings, setClubSettings] = useState({
    icon: null,
    banner: null,
    notifications: true,
    visibility: "public",
    joinRequests: "approval",
  });

  const handleFileUpload = (type, e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you'd handle file upload to a server here
      setClubSettings((prev) => ({
        ...prev,
        [type]: URL.createObjectURL(file),
      }));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="relative w-full h-48 rounded-xl bg-gray-100 overflow-hidden">
        {clubSettings.banner ? (
          <img
            src={clubSettings.banner}
            alt="Club banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <div className="absolute bottom-4 left-4 flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white shadow-lg overflow-hidden">
            {clubSettings.icon ? (
              <img
                src={clubSettings.icon}
                alt="Club icon"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white shadow-sm">
              {mockClub.name}
            </h1>
            <p className="text-white shadow-sm">{mockClub.category}</p>
          </div>
        </div>
      </div>

      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Club Details</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Teacher Advisor
                    </dt>
                    <dd className="text-gray-900">{mockClub.teacher}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      President
                    </dt>
                    <dd className="text-gray-900">{mockClub.president}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Secretary
                    </dt>
                    <dd className="text-gray-900">{mockClub.secretary}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Meeting Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-500 mt-1" />
                  <p className="text-gray-700">{mockClub.meetingSchedule}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700">
                      {mockClub.members.length} Members
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-700">
                      {mockClub.projects.length} Active Projects
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{mockClub.description}</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Club Members</CardTitle>
              <CardDescription>All active members of the club</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {mockClub.members.map((member) => (
                  <div
                    key={member.id}
                    className="py-4 flex items-center justify-between hover:bg-gray-50 px-4 rounded-lg"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-gray-500">{member.email}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Projects</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-1" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <DialogDescription>
                    Add a new project to the club. Fill in the project details
                    below.
                  </DialogDescription>
                </DialogHeader>
                <ProjectForm
                  onSubmit={(data) => console.log("New project:", data)}
                  onClose={() => {}}
                />
              </DialogContent>
            </Dialog>
          </div>

          {mockClub.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Club Settings</CardTitle>
              <CardDescription>
                Manage your club's appearance and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Club Media</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Club Icon</Label>
                      <div className="mt-2">
                        <Button variant="outline" className="w-full" asChild>
                          <label>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Icon
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => handleFileUpload("icon", e)}
                            />
                          </label>
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label>Club Banner</Label>
                      <div className="mt-2">
                        <Button variant="outline" className="w-full" asChild>
                          <label>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Banner
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => handleFileUpload("banner", e)}
                            />
                          </label>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Club Description</Label>
                    <Textarea
                      className="mt-1"
                      defaultValue={mockClub.description}
                    />
                  </div>

                  <div>
                    <Label>Meeting Schedule</Label>
                    <Input
                      className="mt-1"
                      defaultValue={mockClub.meetingSchedule}
                    />
                  </div>

                  <div>
                    <Label>Category</Label>
                    <Input className="mt-1" defaultValue={mockClub.category} />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Club Visibility</Label>
                        <p className="text-sm text-gray-500">
                          Control who can see your club
                        </p>
                      </div>
                      <select
                        className="border rounded-md p-2"
                        value={clubSettings.visibility}
                        onChange={(e) =>
                          setClubSettings((prev) => ({
                            ...prev,
                            visibility: e.target.value,
                          }))
                        }
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="unlisted">Unlisted</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Join Requests</Label>
                        <p className="text-sm text-gray-500">
                          How new members can join
                        </p>
                      </div>
                      <select
                        className="border rounded-md p-2"
                        value={clubSettings.joinRequests}
                        onChange={(e) =>
                          setClubSettings((prev) => ({
                            ...prev,
                            joinRequests: e.target.value,
                          }))
                        }
                      >
                        <option value="open">Open to All</option>
                        <option value="approval">Requires Approval</option>
                        <option value="invite">Invite Only</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-500">
                          Receive updates about club activities
                        </p>
                      </div>
                      <Button
                        variant={
                          clubSettings.notifications ? "default" : "outline"
                        }
                        onClick={() =>
                          setClubSettings((prev) => ({
                            ...prev,
                            notifications: !prev.notifications,
                          }))
                        }
                      >
                        {clubSettings.notifications ? "Enabled" : "Disabled"}
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Danger Zone</h3>
                  <div className="border border-red-200 rounded-lg p-4 space-y-4">
                    <div>
                      <h4 className="text-red-600 font-medium">Archive Club</h4>
                      <p className="text-sm text-gray-500 mb-2">
                        Temporarily deactivate the club. This can be reversed.
                      </p>
                      <Button
                        variant="outline"
                        className="text-red-600 border-red-200"
                      >
                        Archive Club
                      </Button>
                    </div>
                    <div>
                      <h4 className="text-red-600 font-medium">Delete Club</h4>
                      <p className="text-sm text-gray-500 mb-2">
                        Permanently delete the club and all its data. This
                        cannot be undone.
                      </p>
                      <Button variant="destructive">Delete Club</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Toast notifications for actions */}
      <div className="fixed bottom-4 right-4 space-y-2">
        {/* Add toast notifications here */}
      </div>
    </div>
  );
};

export default ClubDashboard;
