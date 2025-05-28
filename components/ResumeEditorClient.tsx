"use client"

import { useState } from "react"
import { updateResumeAction } from "../app/actions/resume"
import { Tables } from "../database.types"
import { ResumeData } from "../schemas/resume"
import { ResumeEditor } from "./ResumeEditor"

interface ResumeEditorClientProps {
  resume: Tables<"resumes">
  resumeId: number
  onResumeChange: (data: ResumeData) => void
}

export function ResumeEditorClient({
  resume,
  resumeId,
  onResumeChange,
}: ResumeEditorClientProps) {
  const [resumeData, setResumeData] = useState(resume.data as ResumeData)
  const [isSaving, setIsSaving] = useState(false)

  const handleDataChange = async (value: string) => {
    try {
      const parsedData = JSON.parse(value)
      setResumeData(parsedData)
      onResumeChange(parsedData)

      // Update the resume in the database using the server action
      setIsSaving(true)
      try {
        await updateResumeAction(resumeId, { data: parsedData })
      } finally {
        setIsSaving(false)
      }
    } catch (error) {
      // If JSON is invalid, don't update the resume
      console.error("Invalid JSON:", error)
    }
  }

  return (
    <ResumeEditor
      resume={resume}
      onChange={handleDataChange}
      isSaving={isSaving}
    />
  )
}
