'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThumbsUp } from 'lucide-react'
import { Project } from "@/types/club"
import { updateProjectReputation } from "@/actions/projectActions"

export function ProjectReputation({ project }: { project: Project }) {
  const [reputation, setReputation] = useState(project.reputation)
  const [hasVoted, setHasVoted] = useState(false)

  const handleReputation = async () => {
    if (!hasVoted && !project.isPrivate) {
      try {
        const updatedReputation = await updateProjectReputation(project.clubId, project.id)
        setReputation(updatedReputation)
        setHasVoted(true)
      } catch (error) {
        console.error('Failed to update project reputation:', error)
        alert('Failed to update project reputation. Please try again.')
      }
    }
  }

  if (project.isPrivate) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Reputation</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-4xl font-bold mb-4">{reputation}</p>
        <Button onClick={handleReputation} disabled={hasVoted} className="bg-blue-500 hover:bg-blue-600 text-white">
          <ThumbsUp className="mr-2 h-4 w-4" /> Increase Reputation
        </Button>
      </CardContent>
    </Card>
  )
}

