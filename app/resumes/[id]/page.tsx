"use client"

import { useState } from "react"
import { ResumeEditor } from "../../../src/components/ResumeEditor"
import { ResumePreview } from "../../../src/components/ResumePreview"
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "../../../src/components/custom/resizable"
import { defaultResumeData } from "../../../src/lib/default-data"

export default function Home() {
  const [resumeData, setResumeData] = useState(defaultResumeData)

  const handleDataChange = (value: string) => {
    try {
      const parsedData = JSON.parse(value)
      setResumeData(parsedData)
    } catch (error) {
      // If JSON is invalid, don't update the resume
      console.error("Invalid JSON:", error)
    }
  }

  return (
    <main className="h-screen w-full overflow-hidden">
      <PanelGroup direction="horizontal" className="h-full">
        <Panel defaultSize={40} minSize={0}>
          <ResumeEditor
            initialValue={JSON.stringify(defaultResumeData, null, 2)}
            onChange={handleDataChange}
          />
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={60}>
          <ResumePreview data={resumeData} />
        </Panel>
      </PanelGroup>
    </main>
  )
}
