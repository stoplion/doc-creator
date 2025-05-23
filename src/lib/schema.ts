import { z } from "zod"

const locationSchema = z.object({
  address: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  countryCode: z.string().optional(),
  region: z.string().optional(),
})

const profileSchema = z.object({
  network: z.string(),
  username: z.string(),
  url: z.string().url(),
})

const basicsSchema = z.object({
  name: z.string(),
  label: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  url: z.string().url().optional(),
  summary: z.string().optional(),
  location: locationSchema.optional(),
  profiles: z.array(profileSchema).optional(),
})

const workSchema = z.object({
  company: z.string(),
  position: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).optional(),
})

const educationSchema = z.object({
  institution: z.string(),
  area: z.string().optional(),
  studyType: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  score: z.string().optional(),
})

const skillSchema = z.object({
  name: z.string(),
  level: z.string().optional(),
  keywords: z.array(z.string()).optional(),
})

const languageSchema = z.object({
  language: z.string(),
  fluency: z.string().optional(),
})

const certificateSchema = z.object({
  name: z.string(),
  date: z.string(),
  issuer: z.string(),
})

const projectSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  url: z.string().url().optional(),
  entity: z.string().optional(),
})

export const resumeSchema = z.object({
  basics: basicsSchema,
  work: z.array(workSchema).optional(),
  education: z.array(educationSchema).optional(),
  skills: z.array(skillSchema).optional(),
  languages: z.array(languageSchema).optional(),
  certificates: z.array(certificateSchema).optional(),
  projects: z.array(projectSchema).optional(),
})

export type ResumeData = z.infer<typeof resumeSchema>
