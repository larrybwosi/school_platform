import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Target, Trophy, Book, MapPin } from 'lucide-react'
import { Club } from "../types/club"

export function ClubOverview({ club }: { club: Club }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{club.members.length}</div>
            <p className="text-xs text-muted-foreground">
              {club.members.filter(m => m.isStudent).length} students, {club.members.filter(m => !m.isStudent).length} staff
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{club.projects.filter(p => p.status === 'IN_PROGRESS').length}</div>
            <p className="text-xs text-muted-foreground">
              Out of {club.projects.length} total projects
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Meeting</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{club.meetingSchedule.split(',')[0]}</div>
            <p className="text-xs text-muted-foreground">
              {club.meetingSchedule.split(',')[1]}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Club Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex items-center">
                <Trophy className="w-4 h-4 mr-2 text-muted-foreground" />
                <dt className="text-sm font-medium text-muted-foreground w-1/3">Teacher Advisor:</dt>
                <dd className="text-sm">{club.teacher}</dd>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                <dt className="text-sm font-medium text-muted-foreground w-1/3">President:</dt>
                <dd className="text-sm">{club.president}</dd>
              </div>
              <div className="flex items-center">
                <Book className="w-4 h-4 mr-2 text-muted-foreground" />
                <dt className="text-sm font-medium text-muted-foreground w-1/3">Secretary:</dt>
                <dd className="text-sm">{club.secretary}</dd>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                <dt className="text-sm font-medium text-muted-foreground w-1/3">Category:</dt>
                <dd className="text-sm">{club.category}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{club.description}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

