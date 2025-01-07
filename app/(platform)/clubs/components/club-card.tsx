import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, ChevronRight, Star } from 'lucide-react'
import { Club } from "@/types/club"

interface ClubCardProps {
  club: Club
}

export function ClubCard({ club }: ClubCardProps) {

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardHeader className="relative">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {/* <IconComponent className="w-6 h-6" /> */}
            </div>
            <div>
              <CardTitle className="group-hover:text-primary transition-colors">
                {club?.name}
              </CardTitle>
              <CardDescription>{club?.category}</CardDescription>
            </div>
          </div>
          {club?.isPopular && (
            <div className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-sm">
              <Star className="w-4 h-4 fill-yellow-600" />
              <span>Popular</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-3">{club?.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span>{club?.memberCount} members</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>{club?.meetingSchedule}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {club?.tags?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/5 text-primary rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="pt-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">Est. {club?.established}</div>
          <Button
            variant="ghost"
            className="group-hover:translate-x-1 transition-transform"
          >
            View Club
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

