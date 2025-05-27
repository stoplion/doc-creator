"use client"

import { useState } from "react"
import { Database } from "../database.types"
import type { ResumeData } from "../utils/schema"
import { Panel, PanelGroup, PanelResizeHandle } from "./custom/resizable"
import { NavbarEditorLeft } from "./Navbar/NavbarEditorLeft"
import { NavbarEditorRight } from "./Navbar/NavbarEditorRight"
import { ResumeEditorClient } from "./ResumeEditorClient"
import { ResumePreview } from "./ResumePreview"

interface ResumeEditorLayoutProps {
  resume: Database["public"]["Tables"]["resumes"]["Row"]
  resumeId: number
}

export function ResumeEditorLayout({
  resume,
  resumeId,
}: ResumeEditorLayoutProps) {
  const [currentResumeData, setCurrentResumeData] = useState<ResumeData>(
    resume.data as ResumeData
  )

  const handleResumeChange = (newData: ResumeData) => {
    setCurrentResumeData(newData)
  }

  return (
    <main className="h-screen w-full overflow-hidden">
      <PanelGroup direction="horizontal" className="h-full">
        <Panel defaultSize={40} minSize={0}>
          <NavbarEditorLeft resume={resume} />
          <ResumeEditorClient
            resume={resume}
            resumeId={resumeId}
            onResumeChange={handleResumeChange}
          />
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={60}>
          <NavbarEditorRight resume={resume} />
          <ResumePreview resumeData={currentResumeData} />
        </Panel>
      </PanelGroup>
    </main>
  )
}
