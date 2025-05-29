"use client"

import { json } from "@codemirror/lang-json"
import { oneDark } from "@codemirror/theme-one-dark"
import { EditorView, lineNumbers } from "@codemirror/view"
import { JsonForms } from "@jsonforms/react"
import { vanillaCells, vanillaRenderers } from "@jsonforms/vanilla-renderers"
import CodeMirror from "@uiw/react-codemirror"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useMemo, useState } from "react"
import { Case, Switch } from "react-if"
import { zodToJsonSchema } from "zod-to-json-schema"
import { Tables } from "../database.types"
import { resumeSchema } from "../schemas/resume"
import { cn } from "../utils/cn"
import { safeParse } from "../utils/safeParse"
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
    (value: string | object) => {
      setCode(
        typeof value === "string" ? value : JSON.stringify(value, null, 2)
      )

      const parsedResult = safeParse(value)
      if (!parsedResult.success) {
        console.error("Failed to parse JSON:", parsedResult.error)
        setValidationError("Invalid JSON format")
        return
      }
      const result = resumeSchema.safeParse(parsedResult.data)

      if (result.success) {
        setValidationError(null)
        onChange(
          typeof value === "string" ? value : JSON.stringify(value, null, 2)
        )
      } else {
        const formattedError = result.error.errors
          .map(
            (err: { path: (string | number)[]; message: string }) =>
              `${err.path.join(".")}: ${err.message}`
          )
          .join("\n")
        setValidationError(formattedError)
      }
    },
    [onChange]
  )

  const extensions = useMemo(
    () => [
      json(),
      lineNumbers(),
      EditorView.lineWrapping,
      EditorView.theme({
        "&": {
          fontSize: "14px",
          height: "100%",
        },
        ".cm-gutters": {
          display: "block",
          backgroundColor: "rgb(24 24 27)",
          color: "rgb(161 161 170)",
          borderRight: "1px solid rgb(63 63 70)",
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
    () =>
      cn(
        "h-full overflow-scroll rounded-md",
        validationError && "border-2 border-red-500"
      ),
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
        <div className="flex-1 min-h-0 overflow-hidden relative">
          <Switch>
            <Case condition={selected === "form"}>
              <div className="overflow-scroll absolute top-0 bottom-0 w-full pb-[300px] bg-white text-black">
                <JsonForms
                  schema={parsedSchema}
                  data={resume.data}
                  onChange={({ data, errors }) => {
                    // handleValueChange(data)
                    console.log(data, errors)
                  }}
                  // onChange={({ data, errors }) => {
                  //   debugger
                  //   console.log(data, errors)
                  // }}
                  renderers={vanillaRenderers}
                  cells={vanillaCells}
                />
              </div>
            </Case>
            <Case condition={selected === "json"}>
              <CodeMirror
                value={code}
                theme={oneDark}
                extensions={extensions}
                onChange={handleValueChange}
                className={editorClassName}
              />
            </Case>
            <Case condition={selected === "jsonschema"}>
              <CodeMirror
                value={jsonSchema}
                theme={oneDark}
                extensions={extensions}
                className={editorClassName}
              />
            </Case>
            <Case condition={selected === "upload"}>
              <FileUploaderBox />
            </Case>
          </Switch>
        </div>
      </div>
    </div>
  )
}
