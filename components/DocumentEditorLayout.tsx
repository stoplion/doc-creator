"use client"

import { useState } from "react"
import { Database } from "../database.types"
import type { ResumeData } from "../json-schemas/resumeSchema"
import { DocumentEditorClient } from "./DocumentEditorClient"
import { DocumentPreview } from "./DocumentPreview"
import { Panel, PanelGroup, PanelResizeHandle } from "./misc/Resizable"
import { NavbarEditorLeft } from "./navbar/NavbarEditorLeft"
import { NavbarEditorRight } from "./navbar/NavbarEditorRight"

interface DocumentEditorLayoutProps {
  document: Database["public"]["Tables"]["documents"]["Row"]
  documentId: number
}

export function DocumentEditorLayout({
  document,
  documentId,
}: DocumentEditorLayoutProps) {
  const [currentDocumentData, setCurrentDocumentData] = useState<ResumeData>(
    document.data as ResumeData
  )
  const [currentDocument, setCurrentDocument] = useState(document)
  const [selectedTab, setSelectedTab] = useState("upload")

  const handleDocumentChange = (newData: ResumeData) => {
    setCurrentDocumentData(newData)
    setCurrentDocument((prev) => ({ ...prev, data: newData }))
  }

  const handleTitleChange = (newTitle: string) => {
    setCurrentDocument((prev) => ({ ...prev, title: newTitle }))
  }

  return (
    <main className="h-screen w-full overflow-hidden">
      <PanelGroup direction="horizontal" className="h-full">
        <Panel defaultSize={40} minSize={0}>
          <NavbarEditorLeft
            document={currentDocument}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          <DocumentEditorClient
            document={currentDocument}
            documentId={documentId}
            onDocumentChange={handleDocumentChange}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={60}>
          <NavbarEditorRight
            document={currentDocument}
            onTitleChange={handleTitleChange}
          />
          <DocumentPreview documentData={currentDocumentData} />
        </Panel>
      </PanelGroup>
    </main>
  )
}
