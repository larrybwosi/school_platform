'use server'

import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!)

// Prompt templates
const PROMPT_TEMPLATES = {
  default: "You are an AI assistant for a teacher. Respond to the following query: {query}",
  timetable: "Here's the teacher's timetable: {timetable}. Now, respond to the following query about the schedule: {query}",
  // Add more templates as needed
}

export async function getAIResponse(query: string, timetable: any) {
  // Choose the appropriate prompt template
  let promptTemplate = PROMPT_TEMPLATES.default
  if (query.toLowerCase().includes('schedule') || query.toLowerCase().includes('timetable')) {
    promptTemplate = PROMPT_TEMPLATES.timetable
  }

  // Prepare the prompt
  const prompt = promptTemplate
    .replace('{query}', query)
    .replace('{timetable}', JSON.stringify(timetable))

  // Generate content
  const model = genAI.getGenerativeModel({ model: "gemini-pro" })
  const result = await model.generateContent(prompt)
  const response = await result.response
  const text = response.text()

  return text
}

