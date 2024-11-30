'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ClubMember } from '../types'
import { Search, X, ArrowUpDown, UserCircle, Mail, Tag, CalendarDays } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ClubMembersProps {
  members: ClubMember[]
  onUpdateMembers: (members: ClubMember[]) => void
  isAdmin: boolean
}

type SortConfig = {
  key: keyof ClubMember
  direction: 'asc' | 'desc'
} | null

// Role to color mapping
const ROLE_COLORS: Record<string, string> = {
  'PRESIDENT': 'bg-blue-500 text-white',
  'VICE_PRESIDENT': 'bg-purple-500 text-white',
  'SECRETARY': 'bg-green-500 text-white',
  'TREASURER': 'bg-yellow-500 text-black',
  'MEMBER': 'bg-gray-200 text-gray-800',
  'ADMIN': 'bg-red-500 text-white',
  'default': 'bg-gray-200 text-gray-800'
}

export function ClubMembers({ members, onUpdateMembers, isAdmin }: ClubMembersProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMember, setSelectedMember] = useState<ClubMember | null>(null)
  const [sortConfig, setSortConfig] = useState<SortConfig>(null)

  const handleRemoveMember = (memberId: string) => {
    onUpdateMembers(members.filter(member => member.id !== memberId))
  }

  const handleSort = (key: keyof ClubMember) => {
    setSortConfig(current => {
      if (current?.key === key) {
        return { key, direction: current.direction === 'asc' ? 'desc' : 'asc' }
      }
      return { key, direction: 'asc' }
    })
  }

  const sortedMembers = useMemo(() => {
    let sortableMembers = [...members]
    if (sortConfig !== null) {
      sortableMembers.sort((a, b) => {
        const aValue = a[sortConfig.key]!;
        const bValue = b[sortConfig.key]!;
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0
      })
    }
    return sortableMembers
  }, [members, sortConfig])

  const filteredMembers = sortedMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRoleBadgeColor = (role: string) => {
    return ROLE_COLORS[role] || ROLE_COLORS['default']
  }
  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden md:block rounded-md border overflow-hidden">
        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">
                  <Button variant="ghost" onClick={() => handleSort('name')}>
                    Member <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  <Button variant="ghost" onClick={() => handleSort('role')}>
                    Role <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="hidden sm:table-cell">
                  <Button variant="ghost" onClick={() => handleSort('joinedAt')}>
                    Joined <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">No members found.</TableCell>
                </TableRow>
              ) : (
                filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${member.name}`} alt={member.name} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground hidden sm:block">{member.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline">{member.role}</Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">{new Date(member.joinedAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedMember(member)}>
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Member Details</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="flex items-center gap-4">
                                <Avatar className="h-16 w-16">
                                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedMember?.name}`} alt={selectedMember?.name} />
                                  <AvatarFallback>{selectedMember?.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-semibold text-lg">{selectedMember?.name}</h3>
                                  <p className="text-sm text-muted-foreground">{selectedMember?.email}</p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm font-medium">Role</p>
                                  <p>{selectedMember?.role}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Joined</p>
                                  <p>{selectedMember?.joinedAt.toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Student</p>
                                  <p>{selectedMember?.isStudent ? 'Yes' : 'No'}</p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        {isAdmin && (
                          <Button variant="destructive" size="sm" onClick={() => handleRemoveMember(member.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {filteredMembers.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No members found.
          </div>
        ) : (
          filteredMembers.map((member) => (
            <Card key={member.id} className="w-full shadow-sm">
              <CardHeader className="pb-2 flex flex-row items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.name} alt={member.name} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="font-semibold text-base">{member.name}</h2>
                  <p className="text-xs text-muted-foreground">{member.email}</p>
                </div>
                <Badge 
                  className={`${getRoleBadgeColor(member.role)} text-xs px-2 py-1`}
                >
                  {member.role.replace('_', ' ')}
                </Badge>
              </CardHeader>
              <CardContent className="pt-2 pb-2 flex justify-between items-center">
                <div className="text-xs text-muted-foreground flex items-center">
                  <CalendarDays className="h-3 w-3 mr-1" />
                  {new Date(member.joinedAt).toLocaleDateString()}
                </div>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedMember(member)}>
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Member Details</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedMember?.name}`} alt={selectedMember?.name} />
                            <AvatarFallback>{selectedMember?.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-lg">{selectedMember?.name}</h3>
                            <p className="text-sm text-muted-foreground">{selectedMember?.email}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Role</p>
                            <p>{selectedMember?.role}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Joined</p>
                            <p>{selectedMember?.joinedAt.toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Student</p>
                            <p>{selectedMember?.isStudent ? 'Yes' : 'No'}</p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  {isAdmin && (
                    <Button variant="destructive" size="sm" onClick={() => handleRemoveMember(member.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}