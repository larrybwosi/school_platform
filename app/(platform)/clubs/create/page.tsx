"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Club } from '../types'

export default function CreateClubPage() {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)

  const handleClubCreate = (newClub: Club) => {
    setIsCreating(true)
    // Simulate API call
    setTimeout(() => {
      setIsCreating(false)
      router.push('/clubs')
    }, 1000)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create New Club</h1>
    </div>
  )
}

