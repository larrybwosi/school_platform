import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getProject, updateProjectPrivacy } from '@/actions/projectActions'
import { ProjectDetails } from '../../../components/project-details'
import { ProjectMembers } from '../../../components/project-members'
import { ProjectMedia } from '../../../components/project-media'
import { ProjectHighlights } from '../../../components/project-highlights'
import { ProjectReputation } from '../../../components/project-reputation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default async function ProjectPage({ params }: { params: { id: string, projectId: string } }) {
  const { id, projectId } = await params;
  const project = await getProject(id, projectId)
  console.log(projectId); 

  if (!project) {
    notFound()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NOT_STARTED':
        return 'bg-gray-500 text-white'
      case 'IN_PROGRESS':
        return 'bg-blue-500 text-white'
      case 'ON_HOLD':
        return 'bg-yellow-500 text-white'
      case 'COMPLETED':
        return 'bg-green-500 text-white'
      case 'CANCELLED':
        return 'bg-red-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'LOW':
        return 'bg-green-200 text-green-800'
      case 'MEDIUM':
        return 'bg-yellow-200 text-yellow-800'
      case 'HIGH':
        return 'bg-red-200 text-red-800'
      default:
        return 'bg-gray-200 text-gray-800'
    }
  }

  const handlePrivacyToggle = async () => {
    await updateProjectPrivacy(params.id, params.projectId, !project.isPrivate)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="relative w-full h-64 rounded-xl bg-gray-100 overflow-hidden">
        <img
          src={project.coverImage}
          alt={`${project.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
          <h1 className="text-3xl font-bold text-white">{project.name}</h1>
          <p className="text-white mt-2">{project.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
          <Badge className={getPriorityColor(project.priority)}>Priority: {project.priority}</Badge>
          <Badge variant="outline">Budget: ${project.budget}</Badge>
          <Badge variant="outline">Lead: {project.leadStudent}</Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="project-privacy"
            checked={project.isPrivate}
            onCheckedChange={handlePrivacyToggle}
          />
          <Label htmlFor="project-privacy">Private Project</Label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Project Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={project.gamifiedProgress} className="w-full" />
            <p className="text-center mt-2">{project.gamifiedProgress}% Complete</p>
          </CardContent>
        </Card>
        {!project.isPrivate && <ProjectReputation project={project} />}
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="media">Media Gallery</TabsTrigger>
          <TabsTrigger value="highlights">Highlights</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Suspense fallback={<div>Loading project details...</div>}>
            <ProjectDetails project={project} />
          </Suspense>
        </TabsContent>
        <TabsContent value="members">
          <Suspense fallback={<div>Loading project members...</div>}>
            <ProjectMembers members={project.members} />
          </Suspense>
        </TabsContent>
        <TabsContent value="media">
          <Suspense fallback={<div>Loading media gallery...</div>}>
            <ProjectMedia mediaItems={project.mediaGallery} />
          </Suspense>
        </TabsContent>
        <TabsContent value="highlights">
          <Suspense fallback={<div>Loading project highlights...</div>}>
            <ProjectHighlights highlights={project.highlights} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}

