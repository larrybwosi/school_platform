'use server'

import { signIn } from '@/lib/authClient'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export async function authenticate(email: string, password: string) {
  try {
    const result = await signIn.email({
      email,
      password,
    })

    if (result?.error) {
      return { success: false, message: result.error }
    }

    return { success: true }
  } catch (error) {
    console.error('Authentication error:', error)
    return { success: false, message: 'An error occurred during authentication' }
  }
}

export async function registerUser(userData: any) {
  try {
    const result = await client.create({
      _type: userData.role,
      ...userData,
    })

    return { success: true, userId: result._id }
  } catch (error) {
    console.error('Registration error:', error)
    return { success: false, message: 'An error occurred during registration' }
  }
}

