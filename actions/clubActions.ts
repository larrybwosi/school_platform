'use server'

import { Club, Project, Milestone } from '@/types/club'
import { connection } from 'next/server';

const mockClubs: Club[] = [
  {
    id: "1",
    name: "Robotics Club",
    description:
      "A club dedicated to building and programming robots for competitions and learning purposes.",
    teacher: "Dr. Sarah Johnson",
    president: "Michael Chang",
    secretary: "Emily Rodriguez",
    createdAt: new Date("2023-09-01"),
    updatedAt: new Date("2024-01-15"),
    category: "Technology",
    meetingSchedule: "Every Tuesday and Thursday, 3:30 PM - 5:00 PM",
    achievements: ["Regional Champions 2024", "Best Innovation Award"],
    tags: ["Engineering", "Programming", "Competition"],
    isPopular: true,
    activeProjects: 3,
    teacherAdvisor: "Dr. Sarah Johnson",
    established: "2022",
    memberCount: 8,
    icon: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    banner:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    members: [
      {
        id: "m1",
        userId: "u1",
        clubId: "1",
        name: "Michael Chang",
        email: "michael.c@school.edu",
        role: "PRESIDENT",
        joinedAt: new Date("2023-09-01"),
        isStudent: true,
      },
      {
        id: "m2",
        userId: "u2",
        clubId: "1",
        name: "Emily Rodriguez",
        email: "emily.r@school.edu",
        role: "SECRETARY",
        joinedAt: new Date("2023-09-01"),
        isStudent: true,
      },
    ],
    projects: [
      {
        id: "p1",
        clubId: "1",
        name: "Battle Bot 2024",
        description:
          "Design and build a competitive battle robot for the regional championship",
        status: "IN_PROGRESS",
        startDate: new Date("2024-01-15"),
        endDate: new Date("2024-05-30"),
        leadStudent: "Michael Chang",
        budget: 2500,
        priority: "HIGH",
        tags: ["robotics", "competition", "engineering"],
        customFields: [
          { name: "Competition Date", value: "May 30, 2024" },
          { name: "Team Size", value: "5" },
        ],
        milestones: [
          {
            id: "ms1",
            projectId: "p1",
            title: "Design Phase",
            description: "Complete robot design and blueprints",
            dueDate: new Date("2024-02-15"),
            status: "COMPLETED",
            completedAt: new Date("2024-02-10"),
            assignedTo: "Emily Rodriguez",
            customFields: [],
            isCompleted: true,
          },
          {
            id: "ms2",
            projectId: "p1",
            title: "Building Phase",
            description:
              "Construct the robot according to design specifications",
            dueDate: new Date("2024-04-15"),
            status: "IN_PROGRESS",
            assignedTo: "Michael Chang",
            customFields: [],
            isCompleted: false,
          },
          {
            id: "ms3",
            projectId: "p1",
            title: "Testing Phase",
            description:
              "Conduct thorough testing and make necessary adjustments",
            dueDate: new Date("2024-05-15"),
            status: "NOT_STARTED",
            assignedTo: "Alex Johnson",
            customFields: [],
            isCompleted: false,
          },
        ],
        coverImage:
          "https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        members: [
          {
            id: "pm1",
            name: "Michael Chang",
            role: "LEAD",
            avatar: "https://i.pravatar.cc/150?img=11",
          },
          {
            id: "pm2",
            name: "Emily Rodriguez",
            role: "MEMBER",
            avatar: "https://i.pravatar.cc/150?img=5",
          },
          {
            id: "pm3",
            name: "Alex Johnson",
            role: "MEMBER",
            avatar: "https://i.pravatar.cc/150?img=68",
          },
        ],
        reputation: 15,
        isPrivate: false,
        mediaGallery: [
          {
            id: "mg1",
            type: "IMAGE",
            url: "https://images.unsplash.com/photo-1561144257-f6a177bf9cde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            caption: "Initial robot design",
          },
          {
            id: "mg2",
            type: "IMAGE",
            url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            caption: "Team working on the robot",
          },
        ],
        highlights: [
          {
            id: "h1",
            title: "Design Completed",
            description:
              "The team finalized the robot design ahead of schedule",
            date: new Date("2024-02-10"),
          },
          {
            id: "h2",
            title: "First Test Run",
            description:
              "Successfully completed the first test run of the robot",
            date: new Date("2024-03-20"),
          },
        ],
        showcaseMode: true,
        gamifiedProgress: 40,
      },
    ],
  },

  {
    id: "2",
    name: "Environmental Science Club",
    description:
      "Dedicated to promoting environmental awareness and sustainability initiatives on campus.",
    teacher: "Prof. Alan Green",
    president: "Sophia Lee",
    secretary: "Daniel Brown",
    createdAt: new Date("2023-08-15"),
    updatedAt: new Date("2024-01-10"),
    category: "Science",
    meetingSchedule: "Every Monday, 4:00 PM - 5:30 PM",
    achievements: ["School Mural Project", "City Art Exhibition"],
    tags: ["Drawing", "Painting", "Digital Art"],
    isPopular: true,
    activeProjects: 2,
    teacherAdvisor: "Ms. Emily Chen",
    memberCount: 38,
    established: "2021",
    icon: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    banner:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    members: [
      {
        id: "m3",
        userId: "u3",
        clubId: "2",
        name: "Sophia Lee",
        email: "sophia.l@school.edu",
        role: "PRESIDENT",
        joinedAt: new Date("2023-08-15"),
        isStudent: true,
      },
      {
        id: "m4",
        userId: "u4",
        clubId: "2",
        name: "Daniel Brown",
        email: "daniel.b@school.edu",
        role: "SECRETARY",
        joinedAt: new Date("2023-08-15"),
        isStudent: true,
      },
    ],
    projects: [
      {
        id: "p2",
        clubId: "2",
        name: "Campus Recycling Initiative",
        description:
          "Implement a comprehensive recycling program across the entire campus",
        status: "IN_PROGRESS",
        startDate: new Date("2024-02-01"),
        endDate: new Date("2024-11-30"),
        leadStudent: "Sophia Lee",
        budget: 1500,
        priority: "MEDIUM",
        tags: ["recycling", "sustainability", "campus-wide"],
        isPrivate: false,
        customFields: [
          { name: "Target Recycling Rate", value: "50%" },
          { name: "Participating Departments", value: "15" },
        ],
        milestones: [
          {
            id: "ms4",
            projectId: "p2",
            title: "Waste Audit",
            description: "Conduct a comprehensive waste audit across campus",
            dueDate: new Date("2024-03-15"),
            status: "COMPLETED",
            completedAt: new Date("2024-03-10"),
            assignedTo: "Daniel Brown",
            customFields: [],
            isCompleted: true,
          },
          {
            id: "ms5",
            projectId: "p2",
            title: "Bin Placement",
            description: "Strategically place recycling bins across campus",
            dueDate: new Date("2024-05-30"),
            status: "IN_PROGRESS",
            assignedTo: "Sophia Lee",
            customFields: [],
            isCompleted: false,
          },
          {
            id: "ms6",
            projectId: "p2",
            title: "Education Campaign",
            description:
              "Launch a campus-wide education campaign on proper recycling practices",
            dueDate: new Date("2024-09-01"),
            status: "NOT_STARTED",
            assignedTo: "Emma Wilson",
            customFields: [],
            isCompleted: false,
          },
        ],
        coverImage:
          "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        members: [
          {
            id: "pm4",
            name: "Sophia Lee",
            role: "LEAD",
            avatar: "https://i.pravatar.cc/150?img=47",
          },
          {
            id: "pm5",
            name: "Daniel Brown",
            role: "MEMBER",
            avatar: "https://i.pravatar.cc/150?img=12",
          },
          {
            id: "pm6",
            name: "Emma Wilson",
            role: "MEMBER",
            avatar: "https://i.pravatar.cc/150?img=23",
          },
        ],
        reputation: 22,
        mediaGallery: [
          {
            id: "mg3",
            type: "IMAGE",
            url: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            caption: "New recycling bins on campus",
          },
          {
            id: "mg4",
            type: "IMAGE",
            url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            caption: "Students participating in waste audit",
          },
        ],
        highlights: [
          {
            id: "h3",
            title: "Waste Audit Completed",
            description:
              "Successfully conducted a comprehensive waste audit across all campus buildings",
            date: new Date("2024-03-10"),
          },
          {
            id: "h4",
            title: "Partnership with Local Recycling Center",
            description:
              "Established a partnership with the local recycling center for efficient waste management",
            date: new Date("2024-04-05"),
          },
        ],
        showcaseMode: true,
        gamifiedProgress: 30,
      },
    ],
  },
];

export async function getClubs(searchParams: {
  [key: string]: string | string[] | undefined;
}): Promise<Club[]> {
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
  await connection();
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
  const club = mockClubs.find(c => c.id === id)
  if (!club) {
    throw new Error("Club not found")
  }
  return club
}

export async function updateClub(id: string, data: Partial<Club>): Promise<Club> {
  await connection();
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
  const clubIndex = mockClubs.findIndex(c => c.id === id)
  if (clubIndex === -1) {
    throw new Error("Club not found")
  }
  mockClubs[clubIndex] = { ...mockClubs[clubIndex], ...data, updatedAt: new Date() }
  return mockClubs[clubIndex]
}

export async function createProject(clubId: string, project: Omit<Project, 'id' | 'clubId'>): Promise<Project> {
  await connection();
  await new Promise(resolve => setTimeout(resolve, 500)) 
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
  await connection();
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
  await connection();
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
  await connection();
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
  await connection();
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
  await connection();
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



export async function addMilestone(
  projectId: string,
  milestone: Omit<Milestone, "id">
): Promise<Milestone> {
  await connection();
  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
  const club = mockClubs.find((c) =>
    c.projects.some((p) => p.id === projectId)
  );
  if (!club) {
    throw new Error("Project not found");
  }
  const project = club.projects.find((p) => p.id === projectId);
  if (!project) {
    throw new Error("Project not found");
  }
  const newMilestone: Milestone = {
    id: `ms${project.milestones.length + 1}`,
    ...milestone,
  };
  project.milestones.push(newMilestone);
  return newMilestone;
}
