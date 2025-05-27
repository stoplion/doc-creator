"use client"

import { ResumeData } from "@/utils/schema"
import { createClient } from "@/utils/supabase/client"
import { useState } from "react"
import { Tables } from "../database.types"
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
  const supabase = createClient()

  const handleDataChange = async (value: string) => {
    try {
      const parsedData = JSON.parse(value)
      setResumeData(parsedData)
      onResumeChange(parsedData)

      // Update the resume in the database
      const { error } = await supabase
        .from("resumes")
        .update({ data: parsedData })
        .eq("id", resumeId)

      if (error) {
        console.error("Error updating resume:", error)
      }
    } catch (error) {
      // If JSON is invalid, don't update the resume
      console.error("Invalid JSON:", error)
    }
  }

  return <ResumeEditor resume={resume} onChange={handleDataChange} />
}
