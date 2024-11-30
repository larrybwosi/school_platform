"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Club } from '../types'
import { Skeleton } from '@/components/ui/skeleton'
import { mockClubs } from '@/lib/mockClubData'
import { ClubDetails } from '../components/Details'

export default function ClubPage() {
  const { id } = useParams()
  const [club, setClub] = useState<Club | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const sampleClub:Club = {
    id: '1',
    name: 'Robotics Club',
    category: 'Technology',
    createdAt: new Date(),
    updatedAt: new Date(),
    description: 'A club dedicated to exploring and building robots, fostering innovation and technical skills among students.',
    teacher: 'Dr. Jane Smith',
    president: 'Alex Johnson',
    secretary: 'Sam Lee',
    meetingSchedule: 'Every Tuesday, 4:00 PM - 6:00 PM',
    members: [
      { id: '1', userId: '1', clubId: '1', name: 'Alex Johnson', email: 'alex@example.com', role: 'PRESIDENT', joinedAt: new Date(), isStudent: true },
      { id: '2', userId: '2', clubId: '1', name: 'Sam Lee', email: 'sam@example.com', role: 'SECRETARY', joinedAt: new Date(), isStudent: true },
      { id: '3', userId: '3', clubId: '1', name: 'Emily Chen', email: 'emily@example.com', role: 'MEMBER', joinedAt: new Date(), isStudent: true },
    ],
    projects: [
      { id: '1', clubId: '1', name: 'Autonomous Robot', description: 'Building a robot that can navigate obstacles autonomously', status: 'IN_PROGRESS', startDate: new Date(), customFields: [], milestones: [] },
      { id: '2', clubId: '1', name: 'Drone Racing', description: 'Designing and building drones for competitive racing', status: 'NOT_STARTED', startDate: new Date(), customFields: [], milestones: [] },
    ],
  }
  

  useEffect(() => {
    const fetchClub = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      const foundClub = mockClubs.find(c => c.id === id)
      if (foundClub) {
        setClub(foundClub)
      }
      setIsLoading(false)
    }
    fetchClub()
  }, [id])

  const handleClubUpdate = (updatedClub: Club) => {
    setClub(updatedClub)
  }

  if (isLoading) {
    return <ClubSkeleton />
  }

  if (!club) {
    return <div className="container mx-auto p-4">Club not found</div>
  }

  return (
    <div className="container lg:p-4 ">
    <ClubDetails 
      club={sampleClub} 
      onUpdateClub={(updatedClub) => console.log('Club updated:', updatedClub)} 
      isAdmin={true}
    />
    </div>
  )
}

function ClubSkeleton() {
  return (
    <div className="container mx-auto lg:p-4 space-y-4">
      <Skeleton className="h-12 w-3/4" />
      <Skeleton className="h-64 w-full" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  )
}

