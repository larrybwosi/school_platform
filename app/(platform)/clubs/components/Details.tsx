'use client'

import { useState, useCallback } from 'react'
import { Club, ClubProject, ClubMember, ProjectStatus } from '../types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar, Users, BookOpen, Award, Mail, Plus, UserPlus } from 'lucide-react'
import { ClubMembers } from './Members'
import { ClubProjects } from './Projects'
import { motion, AnimatePresence } from 'framer-motion'
import { AddMemberForm } from './Add.Member'

interface ClubDetailsProps {
  club: Club
  onUpdateClub: (club: Club) => void
  isAdmin: boolean
}

export function ClubDetails({ club, onUpdateClub, isAdmin }: ClubDetailsProps) {
  const [activeTab, setActiveTab] = useState('info')
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false)
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false)
  const [newProject, setNewProject] = useState<Partial<ClubProject>>({})
  const [newMember, setNewMember] = useState<Partial<ClubMember>>({})

  const handleAddProject = useCallback(() => {
    if (newProject.name && newProject.description) {
      const projectToAdd: ClubProject = {
        id: Date.now().toString(),
        clubId: club.id,
        name: newProject.name,
        description: newProject.description,
        status: 'NOT_STARTED',
        startDate: new Date(),
        customFields: [],
        milestones: [],
      }
      onUpdateClub({ ...club, projects: [...club.projects, projectToAdd] })
      setNewProject({})
      setIsAddProjectDialogOpen(false)
    }
  }, [club, newProject, onUpdateClub])

  const handleAddMember = useCallback(() => {
    if (newMember.name && newMember.email) {
      const memberToAdd: ClubMember = {
        id: Date.now().toString(),
        userId: Date.now().toString(),
        clubId: club.id,
        name: newMember.name,
        email: newMember.email,
        role: 'MEMBER',
        joinedAt: new Date(),
        isStudent: true,
      }
      onUpdateClub({ ...club, members: [...club.members, memberToAdd] })
      setNewMember({})
      setIsAddMemberDialogOpen(false)
    }
  }, [club, newMember, onUpdateClub])


  return (
    <div className="space-y-6 md:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-4 text-white">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <CardTitle className="text-3xl md:text-4xl font-bold">{club.name}</CardTitle>
              <CardDescription className="text-gray-200">{club.category}</CardDescription>
            </div>
            <Badge variant="secondary" className="text-lg py-1 px-3 bg-white text-blue-600 mt-2 md:mt-0">
              {club.members.length} members
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-muted-foreground mb-6">{club.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { role: 'Teacher', name: club.teacher },
              { role: 'President', name: club.president },
              { role: 'Secretary', name: club.secretary },
            ].map((person) => (
              <div key={person.role} className="flex items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-inner">
                <Avatar className="h-12 w-12 mr-4 border-2 border-blue-500">
                  <AvatarImage src={person.name} alt={person.name} />
                  <AvatarFallback>{person.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-lg">{person.name}</p>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-1">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          {[
            { value: 'info', icon: BookOpen, label: 'Info' },
            { value: 'members', icon: Users, label: 'Members' },
            { value: 'projects', icon: Award, label: 'Projects' },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="py-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all duration-200"
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Club Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center bg-gray-100 dark:bg-gray-700 lg:p-4 p-2 rounded-lg">
                    <Calendar className="w-6 h-6 mr-4 text-blue-500" />
                    <span className="text-lg">Meeting Schedule: {club.meetingSchedule}</span>
                  </div>
                  <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <Mail className="w-6 h-6 mr-4 text-blue-500" />
                    <span className="text-lg">Contact: {club.teacher}</span>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold text-xl mb-2">About the Club</h4>
                    <p className="text-muted-foreground">{club.description}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="members">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Club Members</CardTitle>
                  {isAdmin && (
                    <Dialog open={isAddMemberDialogOpen} onOpenChange={setIsAddMemberDialogOpen}>
                      <DialogTrigger asChild>
                      <Button>
                        <UserPlus className="mr-2 h-4 w-4" /> Add Member
                      </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Member</DialogTitle>
                        </DialogHeader>
                        <AddMemberForm onAddMember={(newMember) => {
                          onUpdateClub({ ...club, members: [...club.members, newMember] })
                          setIsAddMemberDialogOpen(false)
                        }} />
                      </DialogContent>
                    </Dialog>
                  )}
                </CardHeader>
                <CardContent>
                  <ClubMembers
                    members={club.members}
                    onUpdateMembers={(updatedMembers) => onUpdateClub({ ...club, members: updatedMembers })}
                    isAdmin={isAdmin}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="projects">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Club Projects</CardTitle>
                  {isAdmin && (
                    <Dialog open={isAddProjectDialogOpen} onOpenChange={setIsAddProjectDialogOpen}>
                      <DialogTrigger asChild>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Project</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <Input
                            placeholder="Project Name"
                            value={newProject.name || ''}
                            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                          />
                          <Textarea
                            placeholder="Project Description"
                            value={newProject.description || ''}
                            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                          />
                          <Button onClick={handleAddProject} className="w-full bg-blue-500 hover:bg-blue-600">Add Project</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </CardHeader>
                <CardContent>
                  <ClubProjects
                    projects={club.projects} 
                    members={club.members}
                    onUpdateProjects={(updatedProjects) => onUpdateClub({ ...club, projects: updatedProjects })}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  )
}

