import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { ClubMember, ClubRole } from '../types'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['TEACHER', 'PRESIDENT', 'SECRETARY', 'MEMBER'] as const),
  isStudent: z.boolean().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface AddMemberFormProps {
  onAddMember: (member: ClubMember) => void
}

export function AddMemberForm({ onAddMember }: AddMemberFormProps) {
  const [isStudent, setIsStudent] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'MEMBER',
      isStudent: false,
    },
  })

  const onSubmit = (data: FormValues) => {
    const newMember: ClubMember = {
      id: Date.now().toString(), // This should be generated on the server in a real application
      userId: Date.now().toString(), // This should be the actual user ID in a real application
      clubId: 'club-id', // This should be the actual club ID
      name: data.name,
      email: data.email,
      role: data.role,
      joinedAt: new Date(),
      isStudent: data.isStudent,
    }
    onAddMember(newMember)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="TEACHER">Teacher</SelectItem>
                  <SelectItem value="PRESIDENT">President</SelectItem>
                  <SelectItem value="SECRETARY">Secretary</SelectItem>
                  <SelectItem value="MEMBER">Member</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isStudent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
              />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Is Student
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  Check this if the member is a student.
                </p>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Add Member</Button>
      </form>
    </Form>
  )
}

