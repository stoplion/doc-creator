"use client"

import * as jsYaml from "js-yaml"
import { useCallback, useMemo, useState } from "react"
import { Database } from "../database.types"
import type { ResumeData } from "../json-schemas/resumeSchema"
import { resumeSchema } from "../json-schemas/resumeSchema"
import { safeParse } from "../utils/safeParse"
import { DocumentEditor } from "./DocumentEditor"
import { DocumentPreview } from "./DocumentPreview"
import { Panel, PanelGroup, PanelResizeHandle } from "./misc/Resizable"
import { NavbarEditorLeft } from "./navbar/NavbarEditorLeft"
import { NavbarEditorRight } from "./navbar/NavbarEditorRight"

type Document = Database["public"]["Tables"]["documents"]["Row"]

interface DocumentEditorLayoutProps {
  document: Document
  documentId: number
}

export function DocumentEditorLayout({ document }: DocumentEditorLayoutProps) {
  // State management
  const [currentDocumentData, setCurrentDocumentData] = useState<ResumeData>(
    document.data as ResumeData
  )
  const [currentDocument, setCurrentDocument] = useState(document)
  const [selectedTab, setSelectedTab] = useState("form")
  const [validationError, setValidationError] = useState<string | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Memoize initial code values
  const initialCode = useMemo(
    () => JSON.stringify(document.data, null, 2),
    [document.data]
  )
  const initialYamlCode = useMemo(
    () => jsYaml.dump(document.data),
    [document.data]
  )

  const [code, setCode] = useState(initialCode)
  const [yamlCode, setYamlCode] = useState(initialYamlCode)

  // Memoized handlers
  const handleValueChange = useCallback((value: string | object) => {
    const jsonValue =
      typeof value === "string" ? value : JSON.stringify(value, null, 2)
    setCode(jsonValue)
    setYamlCode(jsYaml.dump(JSON.parse(jsonValue)))

    const parsedResult = safeParse(value)
    if (!parsedResult.success) {
      setValidationError("Invalid JSON format")
      return
    }

    const result = resumeSchema.safeParse(parsedResult.data)
    if (result.success) {
      setValidationError(null)
      setCurrentDocumentData(parsedResult.data)
      setCurrentDocument((prev) => ({ ...prev, data: parsedResult.data }))
      setHasUnsavedChanges(true)
    } else {
      const formattedError = result.error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join("\n")
      setValidationError(formattedError)
    }
  }, [])

  const handleYamlChange = useCallback(
    (value: string) => {
      try {
        const jsonValue = JSON.stringify(jsYaml.load(value), null, 2)
        setCode(jsonValue)
        setYamlCode(value)
        handleValueChange(jsonValue)
      } catch (error) {
        setValidationError("Invalid YAML format")
      }
    },
    [handleValueChange]
  )

  const handleTitleChange = useCallback((newTitle: string) => {
    setCurrentDocument((prev) => ({ ...prev, title: newTitle }))
  }, [])

  return (
    <main className="h-screen w-full overflow-hidden">
      <PanelGroup direction="horizontal" className="h-full">
        <Panel defaultSize={40} minSize={0}>
          <NavbarEditorLeft
            document={currentDocument}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            hasUnsavedChanges={hasUnsavedChanges}
            onSaveComplete={() => setHasUnsavedChanges(false)}
          />
          <DocumentEditor
            document={document}
            selectedTab={selectedTab}
            validationError={validationError}
            code={code}
            yamlCode={yamlCode}
            handleValueChange={handleValueChange}
            handleYamlChange={handleYamlChange}
          />
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={60}>
          <NavbarEditorRight
            document={currentDocument}
            onTitleChange={handleTitleChange}
            validationError={validationError}
          />
          <DocumentPreview documentData={currentDocumentData} />
        </Panel>
      </PanelGroup>
    </main>
  )
}
