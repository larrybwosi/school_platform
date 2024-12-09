"use client";

import { Project } from "@/types/project";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      default:
        return 'bg-green-500';
    }
  };

  const getProgress = () => {
    const completed = project.milestones.filter(m => m.status === 'completed').length;
    return (completed / project.milestones.length) * 100;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </div>
          <Badge className={getPriorityColor(project.priority)}>
            {project.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{format(project.startDate, 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>{project.members.length} members</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(getProgress())}%</span>
            </div>
            <Progress value={getProgress()} />
          </div>

          {project.status === 'on-hold' && (
            <div className="flex items-center space-x-2 text-amber-500">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">Project on hold</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}