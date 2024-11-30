import { Club, ClubFormData } from '../types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2 } from 'lucide-react'

const clubFormSchema = z.object({
  name: z.string().min(1, 'Club name is required'),
  description: z.string().min(1, 'Description is required'),
  teacher: z.string().min(1, 'Teacher is required'),
  president: z.string().min(1, 'President is required'),
  secretary: z.string().min(1, 'Secretary is required'),
  category: z.string().min(1, 'Category is required'),
  meetingSchedule: z.string().optional(),
})

interface ClubCreationProps {
  onCreateClub: (club: Club) => void
  isCreating: boolean
}

export function ClubCreation({ onCreateClub, isCreating }: ClubCreationProps) {
  const form = useForm<ClubFormData>({
    resolver: zodResolver(clubFormSchema),
    defaultValues: {
      name: '',
      description: '',
      teacher: '',
      president: '',
      secretary: '',
      category: '',
      meetingSchedule: '',
    },
  })

  const handleCreateClub = (data: ClubFormData) => {
    const newClub: Club = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      members: [],
      projects: [],
    }
    onCreateClub(newClub)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Club</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreateClub)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Club Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="teacher"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teacher</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="president"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>President</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="secretary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secretary</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="meetingSchedule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meeting Schedule</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isCreating}>
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Club
                </>
              ) : (
                'Create Club'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

