'use server'

import { mockClubs } from '@/app/(platform)/clubs/mock-data';
import { Club, Project, Milestone } from '@/types/club'
import { connection } from 'next/server';

export async function getClubs(searchParams: {
  [key: string]: string | string[] | undefined;
}): Promise<Club[]> {
  // Simulate API delay
    await connection();
  await new Promise((resolve) => setTimeout(resolve, 500));

  let filteredClubs = [...mockClubs];

  // Apply filters based on searchParams
  if (searchParams.category && searchParams.category !== "All Categories") {
    filteredClubs = filteredClubs.filter(
      (club) => club.category === searchParams.category
    );
  }

  if (searchParams.search) {
    const searchTerm = searchParams.search.toString().toLowerCase();
    filteredClubs = filteredClubs.filter(
      (club) =>
        club.name.toLowerCase().includes(searchTerm) ||
        club.description.toLowerCase().includes(searchTerm)
    );
  }

  // Apply sorting
  if (searchParams.sort) {
    switch (searchParams.sort) {
      case "popular":
        filteredClubs.sort(
          (a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0)
        );
        break;
      case "newest":
        filteredClubs.sort(
          (a, b) => parseInt(b.established) - parseInt(a.established)
        );
        break;
      case "oldest":
        filteredClubs.sort(
          (a, b) => parseInt(a.established) - parseInt(b.established)
        );
        break;
      case "members":
        filteredClubs.sort((a, b) => b.memberCount - a.memberCount);
        break;
    }
  }

  return filteredClubs;
}


export async function getClub(id: string): Promise<Club> {
  // In a real application, you would fetch this data from a database
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
  await connection();
  const club = mockClubs.find(c => c.id === id)
  if (!club) {
    throw new Error("Club not found")
  }
  return club
}

export async function updateClub(id: string, data: Partial<Club>): Promise<Club> {
  // In a real application, you would update the database
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
  await connection();
  const clubIndex = mockClubs.findIndex(c => c.id === id)
  if (clubIndex === -1) {
    throw new Error("Club not found")
  }
  mockClubs[clubIndex] = { ...mockClubs[clubIndex], ...data, updatedAt: new Date() }
  return mockClubs[clubIndex]
}

export async function createProject(clubId: string, project: Omit<Project, 'id' | 'clubId'>): Promise<Project> {
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
  const club = mockClubs.find(c => c.id === clubId)
  if (!club) {
    throw new Error("Club not found")
  }
  const newProject: Project = {
    id: `p${club.projects.length + 1}`,
    clubId,
    ...project,
    milestones: [],
    reputation: 0,
    mediaGallery: [],
    highlights: [],
    showcaseMode: false,
    gamifiedProgress: 0,
  }
  club.projects.push(newProject)
  return newProject
}

export async function updateProject(clubId: string, projectId: string, data: Partial<Project>): Promise<Project> {
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
  const club = mockClubs.find(c => c.id === clubId)
  if (!club) {
    throw new Error("Club not found")
  }
  const projectIndex = club.projects.findIndex(p => p.id === projectId)
  if (projectIndex === -1) {
    throw new Error("Project not found")
  }
  club.projects[projectIndex] = { ...club.projects[projectIndex], ...data }
  return club.projects[projectIndex]
}

export async function deleteProject(clubId: string, projectId: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
  const club = mockClubs.find(c => c.id === clubId)
  if (!club) {
    throw new Error("Club not found")
  }
  const projectIndex = club.projects.findIndex(p => p.id === projectId)
  if (projectIndex === -1) {
    throw new Error("Project not found")
  }
  club.projects.splice(projectIndex, 1)
}

export async function createMilestone(clubId: string, projectId: string, milestone: Omit<Milestone, 'id'>): Promise<Milestone> {
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
  const club = mockClubs.find(c => c.id === clubId)
  if (!club) {
    throw new Error("Club not found")
  }
  const project = club.projects.find(p => p.id === projectId)
  if (!project) {
    throw new Error("Project not found")
  }
  const newMilestone: Milestone = {
    id: `ms${project.milestones.length + 1}`,
    ...milestone
  }
  project.milestones.push(newMilestone)
  return newMilestone
}

export async function updateMilestone(clubId: string, projectId: string, milestoneId: string, data: Partial<Milestone>): Promise<Milestone> {
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
  const club = mockClubs.find(c => c.id === clubId)
  if (!club) {
    throw new Error("Club not found")
  }
  const project = club.projects.find(p => p.id === projectId)
  if (!project) {
    throw new Error("Project not found")
  }
  const milestoneIndex = project.milestones.findIndex(m => m.id === milestoneId)
  if (milestoneIndex === -1) {
    throw new Error("Milestone not found")
  }
  project.milestones[milestoneIndex] = { ...project.milestones[milestoneIndex], ...data }
  return project.milestones[milestoneIndex]
}

export async function deleteMilestone(clubId: string, projectId: string, milestoneId: string): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
  const club = mockClubs.find(c => c.id === clubId)
  if (!club) {
    throw new Error("Club not found")
  }
  const project = club.projects.find(p => p.id === projectId)
  if (!project) {
    throw new Error("Project not found")
  }
  const milestoneIndex = project.milestones.findIndex(m => m.id === milestoneId)
  if (milestoneIndex === -1) {
    throw new Error("Milestone not found")
  }
  project.milestones.splice(milestoneIndex, 1)
}

