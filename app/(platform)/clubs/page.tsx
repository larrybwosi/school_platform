"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { mockClubs } from '@/lib/mockClubData'
import { ClubList } from './components/club-list'
import { Club } from './types'

export default function ClubsPage() {
  const [clubs, setClubs] = useState<Club[]>(mockClubs)

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Club Management</h1>
        <Link href="/clubs/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Club
          </Button>
        </Link>
      </div>
      <ClubList />
    </div>
  )
}

