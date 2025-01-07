'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThumbsUp } from 'lucide-react'
import { Project } from "@/types/club"
// import { voteForProject } from "@/actions/projectActions"

export function ProjectVoting({ project }: { project: Project }) {
  const [votes, setVotes] = useState(project?.votes)
  const [hasVoted, setHasVoted] = useState(false)

  const handleVote = async () => {
    // if (!hasVoted) {
    //   try {
    //     const updatedVotes = await voteForProject(project.clubId, project.id)
    //     setVotes(updatedVotes)
    //     setHasVoted(true)
    //   } catch (error) {
    //     console.error('Failed to vote for project:', error)
    //     alert('Failed to vote for project. Please try again.')
    //   }
    // }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Public Voting</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-4xl font-bold mb-4">{votes}</p>
        <Button onClick={handleVote} disabled={hasVoted} className="bg-blue-500 hover:bg-blue-600 text-white">
          <ThumbsUp className="mr-2 h-4 w-4" /> Vote for this project
        </Button>
      </CardContent>
    </Card>
  )
}

