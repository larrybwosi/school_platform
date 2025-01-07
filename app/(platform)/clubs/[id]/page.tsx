import { Suspense } from 'react'
import { ClubOverview } from '../components/club-overview'
import { ClubMembers } from '../components/club-members'
import { ProjectCard } from '../components/project-card'
import { ProjectDetails } from '../components/project-details'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ImageIcon, Plus, TrendingUp } from 'lucide-react'
import { ClubSettings } from '../components/club-settings'
import { getClub } from '@/actions/clubActions'
import Image from 'next/image'

export default async function ClubDashboard({ params }: { params: { id: string } }) {
  const { id } = await params
  const club = await getClub(id)

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
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
              <Image
                src={club.icon}
                fill
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
              {club.name}
            </h1>
            <p className="text-white shadow-sm">{club.category}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
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
                {club.projects.filter(p => p.status === 'IN_PROGRESS').map(project => (
                  <Suspense key={project.id} fallback={<div>Loading project...</div>}>
                    <ProjectCard project={project} />
                  </Suspense>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">All Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {club.projects.map(project => (
                  <Suspense key={project.id} fallback={<div>Loading project...</div>}>
                    <ProjectCard project={project} />
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
  )
}

