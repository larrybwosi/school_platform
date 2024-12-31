'use server'

import { client } from '@/sanity/lib/client'
import { z } from 'zod'


const streamSchema = z.object({
  name: z.string().min(1),
  grade: z.string(),
  gradeTeacher: z.string().optional(),
  gradeRepresentative: z.string().optional(),
})

export async function createStream(data: z.infer<typeof streamSchema>) {
  try {
    const validatedData = streamSchema.parse(data)
    const result = await client.create({
      _type: 'stream',
      ...validatedData,
    })
    return { success: true, streamId: result._id }
  } catch (error) {
    console.error('Error creating stream:', error)
    return { success: false, message: 'Error creating stream' }
  }
}

export async function updateStream(id: string, data: Partial<z.infer<typeof streamSchema>>) {
  try {
    const validatedData = streamSchema.partial().parse(data)
    const result = await client.patch(id).set(validatedData).commit()
    return { success: true, streamId: result._id }
  } catch (error) {
    console.error('Error updating stream:', error)
    return { success: false, message: 'Error updating stream' }
  }
}

export async function deleteStream(id: string) {
  try {
    await client.delete(id)
    return { success: true }
  } catch (error) {
    console.error('Error deleting stream:', error)
    return { success: false, message: 'Error deleting stream' }
  }
}

export async function getStream(id: string) {
  try {
    const stream = await client.getDocument(id)
    return { success: true, stream }
  } catch (error) {
    console.error('Error fetching stream:', error)
    return { success: false, message: 'Error fetching stream' }
  }
}

export async function getAllStreams() {
  try {
    const streams = await client.fetch('*[_type == "stream"]')
    return { success: true, streams }
  } catch (error) {
    console.error('Error fetching streams:', error)
    return { success: false, message: 'Error fetching streams' }
  }
}

