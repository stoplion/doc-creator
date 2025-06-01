"use client"

import { useState } from "react"
import { updateDocumentAction } from "../app/actions/documentActions"
import { Tables } from "../database.types"
import { ResumeData } from "../json-schemas/resumeSchema"
import { DocumentEditor } from "./DocumentEditor"

interface DocumentEditorClientProps {
  document: Tables<"documents">
  documentId: number
  onDocumentChange: (data: ResumeData) => void
}

export function DocumentEditorClient({
  document,
  documentId,
  onDocumentChange,
}: DocumentEditorClientProps) {
  const [documentData, setDocumentData] = useState(document.data as ResumeData)
  const [isSaving, setIsSaving] = useState(false)

  const handleDataChange = async (value: string) => {
    try {
      const parsedData = JSON.parse(value)
      setDocumentData(parsedData)
      onDocumentChange(parsedData)

      // Update the resume in the database using the server action
      setIsSaving(true)
      try {
        await updateDocumentAction(documentId, { data: parsedData })
      } finally {
        setIsSaving(false)
      }
    } catch (error) {
      // If JSON is invalid, don't update the resume
      console.error("Invalid JSON:", error)
    }
  }

  return (
    <DocumentEditor
      document={document}
      onChange={handleDataChange}
      isSaving={isSaving}
    />
  )
}
