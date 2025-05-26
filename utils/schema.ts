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
  image: z.string().optional(),
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
  website: z.string().url().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).optional(),
})

const volunteerSchema = z.object({
  organization: z.string(),
  position: z.string(),
  url: z.string().url().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).optional(),
})

const educationSchema = z.object({
  institution: z.string(),
  url: z.string().url().optional(),
  area: z.string().optional(),
  studyType: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  score: z.string().optional(),
  courses: z.array(z.string()).optional(),
})

const awardSchema = z.object({
  title: z.string(),
  date: z.string(),
  awarder: z.string(),
  summary: z.string().optional(),
})

const certificateSchema = z.object({
  name: z.string(),
  date: z.string(),
  issuer: z.string(),
  url: z.string().url().optional(),
})

const publicationSchema = z.object({
  name: z.string(),
  publisher: z.string(),
  releaseDate: z.string(),
  url: z.string().url().optional(),
  summary: z.string().optional(),
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

const interestSchema = z.object({
  name: z.string(),
  keywords: z.array(z.string()).optional(),
})

const referenceSchema = z.object({
  name: z.string(),
  reference: z.string(),
})

const projectSchema = z.object({
  name: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  description: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  url: z.string().url().optional(),
})

export const resumeSchema = z.object({
  basics: basicsSchema,
  work: z.array(workSchema).optional(),
  volunteer: z.array(volunteerSchema).optional(),
  education: z.array(educationSchema).optional(),
  awards: z.array(awardSchema).optional(),
  certificates: z.array(certificateSchema).optional(),
  publications: z.array(publicationSchema).optional(),
  skills: z.array(skillSchema).optional(),
  languages: z.array(languageSchema).optional(),
  interests: z.array(interestSchema).optional(),
  references: z.array(referenceSchema).optional(),
  projects: z.array(projectSchema).optional(),
})

export type ResumeData = z.infer<typeof resumeSchema>
