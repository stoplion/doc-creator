"use client"

import { json } from "@codemirror/lang-json"
import { oneDark } from "@codemirror/theme-one-dark"
import { EditorView } from "@codemirror/view"
import CodeMirror from "@uiw/react-codemirror"
import { useRouter } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { Tables } from "../database.types"
import { cn } from "../utils/cn"
import { resumeSchema } from "../utils/schema"
import { FileUploaderBox } from "./custom/FileUploaderBox"
import SwitchGroup from "./custom/switch-group"

interface ResumeEditorProps {
  resume: Tables<"resumes">
  onChange: (value: string) => void
}

export function ResumeEditor({ resume, onChange }: ResumeEditorProps) {
  const [code, setCode] = useState(JSON.stringify(resume.data, null, 2))
  const [validationError, setValidationError] = useState<string | null>(null)
  const [selected, setSelected] = useState("upload")
  const router = useRouter()

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

  return (
    <div className="h-full w-full bg-zinc-900 text-white">
      <div className="p-4 h-full flex flex-col">
        <div className="flex justify-end items-center mb-4">
          <div className="flex gap-2 items-center">
            {validationError && (
              <span className="text-red-500 text-sm">Schema Error</span>
            )}
            {/* switch group here */}
            <SwitchGroup
              options={["form", "upload", "json"]}
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
          {selected === "json" ? (
            <CodeMirror
              value={code}
              height="100%"
              theme={oneDark}
              extensions={extensions}
              onChange={handleValueChange}
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
