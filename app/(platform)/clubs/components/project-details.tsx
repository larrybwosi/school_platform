'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Project, Milestone } from "@/types/club"
import { updateProject,  } from "@/actions/clubActions"

export function ProjectDetails({ project: initialProject }: { project: Project }) {
  const [project, setProject] = useState(initialProject)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProject, setEditedProject] = useState(project)

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const updatedProject = await updateProject(project.clubId, project.id, editedProject)
    setProject(updatedProject)
    setIsEditing(false)
  }

  const handleAddMilestone = async (milestone: Omit<Milestone, 'id'>) => {
    // const newMilestone = await addMilestone(project.id, milestone)
    // setProject(prev => ({
    //   ...prev,
    //   milestones: [...prev.milestones, newMilestone]
    // }))
  }

  const completedMilestones = project.milestones.filter(m => m.status === 'COMPLETED').length
  const progress = (completedMilestones / project.milestones.length) * 100

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">{project.name}</CardTitle>
          <Button onClick={() => setIsEditing(true)} disabled={isEditing}>Edit Project</Button>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  value={editedProject.name}
                  onChange={(e) => setEditedProject({ ...editedProject, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editedProject.description}
                  onChange={(e) => setEditedProject({ ...editedProject, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={editedProject.startDate.toISOString().split('T')[0]}
                    onChange={(e) => setEditedProject({ ...editedProject, startDate: new Date(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={editedProject.endDate.toISOString().split('T')[0]}
                    onChange={(e) => setEditedProject({ ...editedProject, endDate: new Date(e.target.value) })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="leadStudent">Lead Student</Label>
                <Input
                  id="leadStudent"
                  value={editedProject.leadStudent}
                  onChange={(e) => setEditedProject({ ...editedProject, leadStudent: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <Input
                  id="budget"
                  type="number"
                  value={editedProject.budget}
                  onChange={(e) => setEditedProject({ ...editedProject, budget: parseFloat(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  value={editedProject.priority}
                  onChange={(e) => setEditedProject({ ...editedProject, priority: e.target.value as Project['priority'] })}
                  className="w-full p-2 border rounded"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <p>{project.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold">Start Date:</span> {project.startDate.toLocaleDateString()}
                </div>
                <div>
                  <span className="font-semibold">End Date:</span> {project.endDate.toLocaleDateString()}
                </div>
                <div>
                  <span className="font-semibold">Lead Student:</span> {project.leadStudent}
                </div>
                <div>
                  <span className="font-semibold">Budget:</span> ${project.budget}
                </div>
                <div>
                  <span className="font-semibold">Priority:</span> {project.priority}
                </div>
                <div>
                  <span className="font-semibold">Status:</span> {project.status}
                </div>
              </div>
              <div>
                <span className="font-semibold">Tags:</span> {project.tags.join(', ')}
              </div>
              <div>
                <span className="font-semibold">Custom Fields:</span>
                <ul>
                  {project.customFields.map((field, index) => (
                    <li key={index}>{field.name}: {field.value}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress value={progress} />
            <p className="text-sm text-gray-500">{completedMilestones} of {project.milestones.length} milestones completed</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="milestones">
        <TabsList>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
        </TabsList>
        <TabsContent value="milestones">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Milestones</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add Milestone</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Milestone</DialogTitle>
                  </DialogHeader>
                  <AddMilestoneForm onSubmit={handleAddMilestone} />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.milestones.map((milestone) => (
                  <Card key={milestone.id}>
                    <CardHeader>
                      <CardTitle>{milestone.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{milestone.description}</p>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <div>
                          <span className="font-semibold">Due Date:</span> {milestone.dueDate.toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-semibold">Status:</span> {milestone.status}
                        </div>
                        <div>
                          <span className="font-semibold">Assigned To:</span> {milestone.assignedTo}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="files">
          <Card>
            <CardHeader>
              <CardTitle>Files</CardTitle>
            </CardHeader>
            <CardContent>
              <p>File management functionality to be implemented.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="discussions">
          <Card>
            <CardHeader>
              <CardTitle>Discussions</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Discussion board functionality to be implemented.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AddMilestoneForm({ onSubmit }: { onSubmit: (milestone: Omit<Milestone, 'id'>) => void }) {
  const [milestone, setMilestone] = useState<Omit<Milestone, 'id'>>({
    projectId: '',
    title: '',
    description: '',
    dueDate: new Date(),
    status: 'NOT_STARTED',
    assignedTo: '',
    customFields: [],
    isCompleted:false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(milestone)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={milestone.title}
          onChange={(e) => setMilestone({ ...milestone, title: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={milestone.description}
          onChange={(e) => setMilestone({ ...milestone, description: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="dueDate">Due Date</Label>
        <Input
          id="dueDate"
          type="date"
          value={milestone.dueDate.toISOString().split('T')[0]}
          onChange={(e) => setMilestone({ ...milestone, dueDate: new Date(e.target.value) })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="assignedTo">Assigned To</Label>
        <Input
          id="assignedTo"
          value={milestone.assignedTo}
          onChange={(e) => setMilestone({ ...milestone, assignedTo: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <select
          id="status"
          value={milestone.status}
          onChange={(e) => setMilestone({ ...milestone, status: e.target.value as Milestone['status'] })}
          className="w-full p-2 border rounded"
          required
        >
          <option value="NOT_STARTED">Not Started</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>
      <Button type="submit">Add Milestone</Button>
    </form>
  )
}

