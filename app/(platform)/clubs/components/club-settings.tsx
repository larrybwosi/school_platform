'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Club } from "@/types/club"
import { updateClub } from "@/actions/clubActions"
import {
  Image as ImageIcon,
  Upload
} from "lucide-react";

export function ClubSettings({ club: initialClub }: { club: Club }) {
  const [club, setClub] = useState(initialClub)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const updatedClub = await updateClub(club.id, club)
      setClub(updatedClub)
      alert('Club settings updated successfully!')
    } catch (error) {
      console.error('Failed to update club settings:', error)
      alert('Failed to update club settings. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileUpload = (field: string, e: React.ChangeEvent<HTMLInputElement>)=>{

  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Club Name</Label>
              <Input
                id="name"
                value={club.name}
                onChange={(e) => setClub({ ...club, name: e.target.value })}
                required
              />
            </div>
            
                <div>
                  <h3 className="text-lg font-medium mb-2">Club Media</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Club Icon</Label>
                      <div className="mt-2">
                        <Button variant="outline" className="w-full" asChild>
                          <label>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Icon
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => handleFileUpload("icon", e)}
                            />
                          </label>
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label>Club Banner</Label>
                      <div className="mt-2">
                        <Button variant="outline" className="w-full" asChild>
                          <label>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Banner
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) => handleFileUpload("banner", e)}
                            />
                          </label>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={club.description}
                onChange={(e) => setClub({ ...club, description: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={club.category}
                onChange={(e) => setClub({ ...club, category: e.target.value })}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leadership</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="teacher">Teacher Advisor</Label>
              <Input
                id="teacher"
                value={club.teacher}
                onChange={(e) => setClub({ ...club, teacher: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="president">President</Label>
              <Input
                id="president"
                value={club.president}
                onChange={(e) => setClub({ ...club, president: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secretary">Secretary</Label>
              <Input
                id="secretary"
                value={club.secretary}
                onChange={(e) => setClub({ ...club, secretary: e.target.value })}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meeting Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="meetingSchedule">Meeting Schedule</Label>
              <Input
                id="meetingSchedule"
                value={club.meetingSchedule}
                onChange={(e) => setClub({ ...club, meetingSchedule: e.target.value })}
                required
              />
            </div>
          </CardContent>
          
                <div>
                  <h3 className="text-lg font-medium mb-4">Danger Zone</h3>
                  <div className="border border-red-200 rounded-lg p-4 space-y-4">
                    <div>
                      <h4 className="text-red-600 font-medium">Archive Club</h4>
                      <p className="text-sm text-gray-500 mb-2">
                        Temporarily deactivate the club. This can be reversed.
                      </p>
                      <Button
                        variant="outline"
                        className="text-red-600 border-red-200"
                      >
                        Archive Club
                      </Button>
                    </div>
                    <div>
                      <h4 className="text-red-600 font-medium">Delete Club</h4>
                      <p className="text-sm text-gray-500 mb-2">
                        Permanently delete the club and all its data. This
                        cannot be undone.
                      </p>
                      <Button variant="destructive">Delete Club</Button>
                    </div>
                  </div>
                </div>
        </Card>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Club Settings'}
        </Button>
      </div>
    </form>
  )
}

