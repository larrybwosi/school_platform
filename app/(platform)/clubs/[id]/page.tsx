import { Suspense } from 'react'
import { ClubOverview } from '../components/club-overview'
import { ClubMembers } from '../components/club-members'
import { ProjectCard } from '../components/project-card'
import { ProjectDetails } from '../components/project-details'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ImageIcon, Plus, Settings, TrendingUp, Users } from 'lucide-react'
import { ClubSettings } from '../components/club-settings'
import { getClub } from '@/actions/clubActions'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { connection } from 'next/server'

export default async function ClubDashboard({ params }: { params: { id: string } }) {
  const { id } = await params
  const club = await getClub(id)

  return (
    <div className="p-6 mx-auto space-y-6">
      <div className="relative w-full h-48 rounded-xl bg-gray-100 overflow-hidden">
        {club.banner ? (
          <Image
            src={club.banner}
            fill
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
            {club.icon ? (
              <Avatar>
                <AvatarImage src={club.icon} />
                <AvatarFallback>{club.name}</AvatarFallback>
              </Avatar>
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white shadow-sm">
              {club.name}
            </h1>
            <p className="text-white shadow-sm">{club.category}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsTrigger
          value="overview"
          className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600"
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="members"
          className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600"
        >
          <Users className="w-4 h-4 mr-2" />
          Members
        </TabsTrigger>
        <TabsTrigger
          value="projects"
          className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Projects
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600"
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </TabsTrigger>
        <TabsContent value="overview">
          <Suspense fallback={<div>Loading overview...</div>}>
            <ClubOverview club={club} />
          </Suspense>
        </TabsContent>
        <TabsContent value="members">
          <Suspense fallback={<div>Loading members...</div>}>
            <ClubMembers members={club.members} />
          </Suspense>
        </TabsContent>
        <TabsContent value="projects">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Projects</h2>
              <Button>
                <Plus className="w-4 h-4 mr-1" />
                New Project
              </Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Trending Projects</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {club.projects
                  .filter((p) => p.status === "IN_PROGRESS")
                  .map((project) => (
                    <Suspense
                      key={project.id}
                      fallback={<div>Loading project...</div>}
                    >
                      <ProjectCard isMember project={project} />
                    </Suspense>
                  ))}
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">All Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {club.projects.map((project) => (
                  <Suspense
                    key={project.id}
                    fallback={<div>Loading project...</div>}
                  >
                    <ProjectCard isMember project={project} />
                  </Suspense>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <Suspense fallback={<div>Loading settings...</div>}>
            <ClubSettings club={club} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}

