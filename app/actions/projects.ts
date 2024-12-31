'use server'

import { client } from '@/sanity/lib/client'
import { z } from 'zod'

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  clubId: z.string(),
  headId: z.string().optional(),
  startDate: z.string().optional(),
  dueDate: z.string().optional(),
  status: z.enum(['planning', 'in-progress', 'completed']),
})

export async function createProject(data: z.infer<typeof projectSchema>) {
  try {
    const validatedData = projectSchema.parse(data)
    const result = await client.create({
      _type: 'project',
      name: validatedData.name,
      description: validatedData.description,
      club: { _type: 'reference', _ref: validatedData.clubId },
      head: validatedData.headId ? { _type: 'reference', _ref: validatedData.headId } : undefined,
      startDate: validatedData.startDate,
      dueDate: validatedData.dueDate,
      status: validatedData.status,
      milestones: [],
    })
    return { success: true, projectId: result._id }
  } catch (error) {
    console.error('Error creating project:', error)
    return { success: false, message: 'Error creating project' }
  }
}

export async function updateProject(id: string, data: Partial<z.infer<typeof projectSchema>>) {
  try {
    const validatedData = projectSchema.partial().parse(data)
    const updateData: any = { ...validatedData }
    if (validatedData.clubId) {
      updateData.club = { _type: 'reference', _ref: validatedData.clubId }
      delete updateData.clubId
    }
    if (validatedData.headId) {
      updateData.head = { _type: 'reference', _ref: validatedData.headId }
      delete updateData.headId
    }
    const result = await client.patch(id).set(updateData).commit()
    return { success: true, projectId: result._id }
  } catch (error) {
    console.error('Error updating project:', error)
    return { success: false, message: 'Error updating project' }
  }
}

export async function deleteProject(id: string) {
  try {
    await client.delete(id)
    return { success: true }
  } catch (error) {
    console.error('Error deleting project:', error)
    return { success: false, message: 'Error deleting project' }
  }
}

export async function getProject(id: string) {
  try {
    const project = await client.fetch(`
      *[_type == "project" && _id == $id][0] {
        ...,
        club->,
        head->
      }
    `, { id })
    return { success: true, project }
  } catch (error) {
    console.error('Error fetching project:', error)
    return { success: false, message: 'Error fetching project' }
  }
}

export async function addMilestoneToProject(projectId: string, milestone: { title: string, description?: string, dueDate?: string, status: 'not-started' | 'in-progress' | 'completed' }) {
  try {
    const result = await client
      .patch(projectId)
      .setIfMissing({ milestones: [] })
      .append('milestones', [milestone])
      .commit()
    return { success: true, projectId: result._id }
  } catch (error) {
    console.error('Error adding milestone to project:', error)
    return { success: false, message: 'Error adding milestone to project' }
  }
}

export async function updateMilestone(projectId: string, milestoneIndex: number, updatedMilestone: Partial<{ title: string, description: string, dueDate: string, status: 'not-started' | 'in-progress' | 'completed' }>) {
  try {
    const result = await client
      .patch(projectId)
      .setIfMissing({ milestones: [] })
      .set({
        [`milestones[${milestoneIndex}]`]: {
          ...updatedMilestone,
          _type: 'object'
        }
      })
      .commit()
    return { success: true, projectId: result._id }
  } catch (error) {
    console.error('Error updating milestone:', error)
    return { success: false, message: 'Error updating milestone' }
  }
}

export async function removeMilestoneFromProject(projectId: string, milestoneIndex: number) {
  try {
    const result = await client
      .patch(projectId)
      .unset([`milestones[${milestoneIndex}]`])
      .commit()
    return { success: true, projectId: result._id }
  } catch (error) {
    console.error('Error removing milestone from project:', error)
    return { success: false, message: 'Error removing milestone from project' }
  }
}

