"use client"

import { notFound, useRouter } from "next/navigation"
import { useState } from "react"
import { createDocumentAction } from "../../../app/actions/documentActions"
import { DocumentTypeModal } from "../../../components/misc/DocumentPickerModal"

export default function NewDocumentPage() {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const router = useRouter()

  const handleDocumentTypeSelect = async (docType: { name: string }) => {
    try {
      const document = await createDocumentAction(docType)
      router.push(`/documents/${document.id}`)
    } catch (error) {
      console.error("Error creating document:", error)
      notFound()
    }
  }

  const handleClose = () => {
    setIsModalOpen(false)
    router.back()
  }

  return (
    <DocumentTypeModal
      isOpen={isModalOpen}
      onClose={handleClose}
      onSelect={handleDocumentTypeSelect}
    />
  )
}
