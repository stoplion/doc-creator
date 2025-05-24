"use client"

import { json } from "@codemirror/lang-json"
import { oneDark } from "@codemirror/theme-one-dark"
import { EditorView } from "@codemirror/view"
import CodeMirror from "@uiw/react-codemirror"
import { useCallback, useMemo, useState } from "react"
import { resumeSchema } from "../lib/schema"
import { cn } from "../lib/utils"
import { FileUploaderBox } from "./ui/FileUploaderBox"
import SwitchGroup from "./ui/switch-group"

interface ResumeEditorProps {
  initialValue: string
  onChange: (value: string) => void
}

export function ResumeEditor({ initialValue, onChange }: ResumeEditorProps) {
  const [code, setCode] = useState(initialValue)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [selected, setSelected] = useState("upload")

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

  const formatJson = useCallback(() => {
    try {
      const parsed = JSON.parse(code)
      const result = resumeSchema.safeParse(parsed)

      if (result.success) {
        const formatted = JSON.stringify(parsed, null, 2)
        setCode(formatted)
        setValidationError(null)
        onChange(formatted)
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
  }, [code, onChange])

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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Resume JSON</h2>
          <div className="flex gap-2 items-center">
            {validationError && (
              <span className="text-red-500 text-sm">Schema Error</span>
            )}
            <button
              onClick={formatJson}
              className="px-3 py-1 bg-zinc-700 hover:bg-zinc-600 rounded text-sm"
            >
              Format
            </button>
            {/* switch group here */}
            <SwitchGroup
              options={["json", "upload"]}
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
