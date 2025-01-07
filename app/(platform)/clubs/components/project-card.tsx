'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, ThumbsUp, Trash2, Plus, Clock, PlayCircle, PauseCircle, CheckCircle2, XCircle, Lock } from 'lucide-react'
import { Project } from "../types/club"
import Link from 'next/link'

const ProjectStatusBadge = ({ status }: { status: Project['status'] }) => {
  const statusColors = {
    NOT_STARTED: "bg-gray-200 text-gray-700",
    IN_PROGRESS: "bg-blue-100 text-blue-700",
    ON_HOLD: "bg-yellow-100 text-yellow-700",
    COMPLETED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  }

  const statusIcons = {
    NOT_STARTED: <Clock className="w-4 h-4" />,
    IN_PROGRESS: <PlayCircle className="w-4 h-4" />,
    ON_HOLD: <PauseCircle className="w-4 h-4" />,
    COMPLETED: <CheckCircle2 className="w-4 h-4" />,
    CANCELLED: <XCircle className="w-4 h-4" />,
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${statusColors[status]}`}>
      {statusIcons[status]}
      {status.replace("_", " ")}
    </span>
  )
}

export function ProjectCard({ project, isMember }: { project: Project, isMember: boolean }) {
  const [isHovered, setIsHovered] = useState(false)

  if (project.isPrivate && !isMember) {
    return null
  }

  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="relative p-0">
        <img 
          src={project.coverImage}
          alt={project.name} 
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          <ProjectStatusBadge status={project.status} />
          {project.isPrivate && <Lock className="w-4 h-4 text-gray-600" />}
        </div>
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Link href={`/club/${project.clubId}/project/${project.id}`}>
              <Button>View Project</Button>
            </Link>
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-4">
        <CardTitle>{project.name}</CardTitle>
        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
        <div className="mt-4 space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{project.gamifiedProgress}%</span>
            </div>
            <Progress value={project.gamifiedProgress} />
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-semibold">Lead:</span> {project.leadStudent}
            </div>
            <div>
              <span className="font-semibold">Budget:</span> ${project.budget}
            </div>
            <div>
              <span className="font-semibold">Priority:</span> {project.priority}
            </div>
            <div>
              <span className="font-semibold">End Date:</span> {project.endDate.toLocaleDateString()}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex -space-x-2">
              {project.members.slice(0, 3).map((member) => (
                <Avatar key={member.id} className="border-2 border-background">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
              {project.members.length > 3 && (
                <Avatar className="border-2 border-background">
                  <AvatarFallback>+{project.members.length - 3}</AvatarFallback>
                </Avatar>
              )}
            </div>
            {!project.isPrivate && (
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">{project.reputation}</span>
                <ThumbsUp className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

