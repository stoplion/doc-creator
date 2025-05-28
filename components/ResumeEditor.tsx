"use client"

import { json } from "@codemirror/lang-json"
import { oneDark } from "@codemirror/theme-one-dark"
import { EditorView } from "@codemirror/view"
import { JsonForms } from "@jsonforms/react"
import { vanillaCells, vanillaRenderers } from "@jsonforms/vanilla-renderers"
import CodeMirror from "@uiw/react-codemirror"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { zodToJsonSchema } from "zod-to-json-schema"
import { Tables } from "../database.types"
import { resumeSchema } from "../schemas/resume"
import { cn } from "../utils/cn"
import { FileUploaderBox } from "./custom/FileUploaderBox"
import SwitchGroup from "./custom/switch-group"

interface ResumeEditorProps {
  resume: Tables<"resumes">
  onChange: (value: string) => void
  isSaving?: boolean
}

export function ResumeEditor({
  resume,
  onChange,
  isSaving,
}: ResumeEditorProps) {
  const [code, setCode] = useState(JSON.stringify(resume.data, null, 2))
  const [validationError, setValidationError] = useState<string | null>(null)
  const [selected, setSelected] = useState("upload")
  const router = useRouter()

  const jsonSchema = useMemo(() => {
    return JSON.stringify(
      zodToJsonSchema(resumeSchema, "ResumeSchema"),
      null,
      2
    )
  }, [])

  const parsedSchema = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonSchema)
      return parsed.definitions?.ResumeSchema || parsed
    } catch (error) {
      console.error("Failed to parse JSON schema:", error)
      return {}
    }
  }, [jsonSchema])

  const handleValueChange = useCallback(
    (value: string) => {
      setCode(value)

      try {
        const parsed = JSON.parse(value)
        const result = resumeSchema.safeParse(parsed)

        if (result.success) {
          setValidationError(null)
          onChange(value)
        } else {
          const formattedError = result.error.errors
            .map(
              (err: { path: (string | number)[]; message: string }) =>
                `${err.path.join(".")}: ${err.message}`
            )
            .join("\n")
          setValidationError(formattedError)
        }
      } catch (error) {
        setValidationError("Invalid JSON format")
      }
    },
    [onChange]
  )

  const extensions = useMemo(
    () => [
      json(),
      EditorView.lineWrapping,
      EditorView.theme({
        "&": {
          fontSize: "14px",
          height: "100%",
        },
        ".cm-gutters": {
          display: "none",
        },
        ".cm-content": {
          padding: "0.5rem",
        },
        ".cm-scroller": {
          overflow: "auto",
        },
      }),
    ],
    []
  )

  const editorClassName = useMemo(
    () => cn("h-full rounded-md", validationError && "border-2 border-red-500"),
    [validationError]
  )

  debugger
  // JSON.parse(jsonSchema).definitions.ResumeSchema

  return (
    <div className="h-full w-full bg-zinc-900 text-white">
      <div className="p-4 h-full flex flex-col">
        <div className="flex justify-end items-center mb-4">
          <div className="flex gap-2 items-center">
            {validationError && (
              <span className="text-red-500 text-sm">Schema Error</span>
            )}
            {isSaving && (
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving...</span>
              </div>
            )}
            <SwitchGroup
              options={["form", "upload", "json", "jsonschema"]}
              value={selected}
              onChange={setSelected}
            />
          </div>
        </div>
        {validationError && (
          <div className="mb-4 p-2 bg-red-900/50 rounded text-sm text-red-200 whitespace-pre-wrap">
            {validationError}
          </div>
        )}
        <div className="flex-1 min-h-0 overflow-hidden">
          {selected === "form" && (
            <JsonForms
              schema={parsedSchema}
              data={resume.data}
              onChange={handleValueChange}
              renderers={vanillaRenderers}
              cells={vanillaCells}
            />
          )}
          {selected === "json" ? (
            <CodeMirror
              value={code}
              height="100%"
              theme={oneDark}
              extensions={extensions}
              onChange={handleValueChange}
              className={editorClassName}
            />
          ) : selected === "jsonschema" ? (
            <CodeMirror
              value={jsonSchema}
              height="100%"
              theme={oneDark}
              extensions={extensions}
              className={editorClassName}
            />
          ) : (
            <FileUploaderBox />
          )}
        </div>
      </div>
    </div>
  )
}
