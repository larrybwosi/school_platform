'use server'

import { client } from '@/sanity/lib/client'
import { z } from 'zod'

const clubSchema = z.object({
  name: z.string().min(1, "Club name is required"),
  description: z.string().optional(),
  clubTeacherId: z.string(),
  clubPrefectId: z.string().optional(),
  secretaryId: z.string().optional(),
})

export async function createClub(data: z.infer<typeof clubSchema>) {
  try {
    const validatedData = clubSchema.parse(data)
    const result = await client.create({
      _type: 'club',
      name: validatedData.name,
      description: validatedData.description,
      clubTeacher: { _type: 'reference', _ref: validatedData.clubTeacherId },
      clubPrefect: validatedData.clubPrefectId ? { _type: 'reference', _ref: validatedData.clubPrefectId } : undefined,
      secretary: validatedData.secretaryId ? { _type: 'reference', _ref: validatedData.secretaryId } : undefined,
      members: [],
    })
    return { success: true, clubId: result._id }
  } catch (error) {
    console.error('Error creating club:', error)
    return { success: false, message: 'Error creating club' }
  }
}

export async function updateClub(id: string, data: Partial<z.infer<typeof clubSchema>>) {
  try {
    const validatedData = clubSchema.partial().parse(data)
    const updateData: any = { ...validatedData }
    if (validatedData.clubTeacherId) {
      updateData.clubTeacher = { _type: 'reference', _ref: validatedData.clubTeacherId }
      delete updateData.clubTeacherId
    }
    if (validatedData.clubPrefectId) {
      updateData.clubPrefect = { _type: 'reference', _ref: validatedData.clubPrefectId }
      delete updateData.clubPrefectId
    }
    if (validatedData.secretaryId) {
      updateData.secretary = { _type: 'reference', _ref: validatedData.secretaryId }
      delete updateData.secretaryId
    }
    const result = await client.patch(id).set(updateData).commit()
    return { success: true, clubId: result._id }
  } catch (error) {
    console.error('Error updating club:', error)
    return { success: false, message: 'Error updating club' }
  }
}

export async function deleteClub(id: string) {
  try {
    await client.delete(id)
    return { success: true }
  } catch (error) {
    console.error('Error deleting club:', error)
    return { success: false, message: 'Error deleting club' }
  }
}

export async function getClub(id: string) {
  try {
    const club = await client.fetch(`
      *[_type == "club" && _id == $id][0] {
        ...,
        clubTeacher->,
        clubPrefect->,
        secretary->,
        members[]{
          student->,
          role
        },
        activeProjects[]->,
        completedProjects[]->
      }
    `, { id })
    return { success: true, club }
  } catch (error) {
    console.error('Error fetching club:', error)
    return { success: false, message: 'Error fetching club' }
  }
}

export async function getAllClubs() {
  try {
    const clubs = await client.fetch(`
      *[_type == "club"] {
        _id,
        name,
        description,
        clubTeacher->{firstName, lastName},
        clubPrefect->{firstName, lastName},
        "memberCount": count(members)
      }
    `)
    return { success: true, clubs }
  } catch (error) {
    console.error('Error fetching clubs:', error)
    return { success: false, message: 'Error fetching clubs' }
  }
}

export async function addMemberToClub(clubId: string, studentId: string, role: string) {
  try {
    const result = await client
      .patch(clubId)
      .setIfMissing({ members: [] })
      .append('members', [{ student: { _type: 'reference', _ref: studentId }, role }])
      .commit()
    return { success: true, clubId: result._id }
  } catch (error) {
    console.error('Error adding member to club:', error)
    return { success: false, message: 'Error adding member to club' }
  }
}

export async function removeMemberFromClub(clubId: string, studentId: string) {
  try {
    const result = await client
      .patch(clubId)
      .unset([`members[student._ref == "${studentId}"]`])
      .commit()
    return { success: true, clubId: result._id }
  } catch (error) {
    console.error('Error removing member from club:', error)
    return { success: false, message: 'Error removing member from club' }
  }
}

