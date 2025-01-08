'use cache'

import { mockClubs } from '@/app/(platform)/clubs/mock-data'
import { Project, MediaItem, Highlight } from '../types/club'

export async function getProject(clubId: string, projectId: string): Promise<Project | undefined> {
  console.log(clubId)
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  const club = mockClubs.find(c => c.id === clubId)
  if (!club) return undefined
  return club.projects.find(p => p.id === projectId)
}

export async function updateProject(clubId: string, projectId: string, data: Partial<Project>): Promise<Project> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  const club = mockClubs.find(c => c.id === clubId)
  if (!club) throw new Error("Club not found")
  const projectIndex = club.projects.findIndex(p => p.id === projectId)
  if (projectIndex === -1) throw new Error("Project not found")
  club.projects[projectIndex] = { ...club.projects[projectIndex], ...data }
  return club.projects[projectIndex]
}

export async function updateProjectPrivacy(clubId: string, projectId: string, isPrivate: boolean): Promise<Project> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  const club = mockClubs.find(c => c.id === clubId)
  if (!club) throw new Error("Club not found")
  const project = club.projects.find(p => p.id === projectId)
  if (!project) throw new Error("Project not found")
  project.isPrivate = isPrivate
  return project
}

export async function updateProjectReputation(clubId: string, projectId: string): Promise<number> {
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
  const club = mockClubs.find(c => c.id === clubId)
  if (!club) throw new Error("Club not found")
  const project = club.projects.find(p => p.id === projectId)
  if (!project) throw new Error("Project not found")
  if (project.isPrivate) throw new Error("Cannot update reputation for private projects")
  project.reputation += 1
  return project.reputation
}

export async function addMediaItem(clubId: string, projectId: string, mediaItem: Omit<MediaItem, 'id'>): Promise<MediaItem> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  const club = mockClubs.find(c => c.id === clubId)
  if (!club) throw new Error("Club not found")
  const project = club.projects.find(p => p.id === projectId)
  if (!project) throw new Error("Project not found")
  const newMediaItem: MediaItem = {
    id: `media_${Date.now()}`,
    ...mediaItem
  }
  project.mediaGallery.push(newMediaItem)
  return newMediaItem
}

export async function addHighlight(clubId: string, projectId: string, highlight: Omit<Highlight, 'id'>): Promise<Highlight> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  const club = mockClubs.find(c => c.id === clubId)
  if (!club) throw new Error("Club not found")
  const project = club.projects.find(p => p.id === projectId)
  if (!project) throw new Error("Project not found")
  const newHighlight: Highlight = {
    id: `highlight_${Date.now()}`,
    ...highlight
  }
  project.highlights.push(newHighlight)
  return newHighlight
}

export async function updateProjectProgress(clubId: string, projectId: string, progress: number): Promise<number> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  const club = mockClubs.find(c => c.id === clubId)
  if (!club) throw new Error("Club not found")
  const project = club.projects.find(p => p.id === projectId)
  if (!project) throw new Error("Project not found")
  project.gamifiedProgress = Math.min(100, Math.max(0, progress))
  return project.gamifiedProgress
}

