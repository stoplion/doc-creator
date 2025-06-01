"use client"

import { json } from "@codemirror/lang-json"
import { yaml as yamlLang } from "@codemirror/lang-yaml"
import { oneDark } from "@codemirror/theme-one-dark"
import { EditorView, lineNumbers } from "@codemirror/view"
import Form from "@rjsf/core"
import { UiSchema } from "@rjsf/utils"
import validator from "@rjsf/validator-ajv8"
import CodeMirror from "@uiw/react-codemirror"
import * as jsYaml from "js-yaml"
import { Loader2 } from "lucide-react"
import { useCallback, useMemo, useState } from "react"
import { Case, Switch } from "react-if"
import { zodToJsonSchema } from "zod-to-json-schema"
import { Tables } from "../database.types"
import { resumeSchema } from "../json-schemas/resumeSchema"
import { cn } from "../utils/cn"
import { safeParse } from "../utils/safeParse"
import { FieldErrorTemplate, ObjectFieldTemplate } from "./custom-templates"
import { TextWidget } from "./custom-widgets"
import { FileUploaderBox } from "./misc/FileUploaderBox"
import SwitchGroup from "./misc/SwitchGroup"

const uiSchema: UiSchema = {
  "ui:classNames": "bg-red-500",
}

interface DocumentEditorProps {
  document: Tables<"documents">
  onChange: (value: string) => void
  isSaving?: boolean
}

export function DocumentEditor({
  document,
  onChange,
  isSaving,
}: DocumentEditorProps) {
  const [code, setCode] = useState(JSON.stringify(document.data, null, 2))
  const [yamlCode, setYamlCode] = useState(jsYaml.dump(document.data))
  const [validationError, setValidationError] = useState<string | null>(null)
  const [selected, setSelected] = useState("upload")

  const jsonSchema = useMemo(() => {
    return JSON.stringify(
      zodToJsonSchema(resumeSchema, "resumeSchema"),
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
      const jsonValue =
        typeof value === "string" ? value : JSON.stringify(value, null, 2)
      setCode(jsonValue)
      setYamlCode(jsYaml.dump(JSON.parse(jsonValue)))

      const parsedResult = safeParse(value)
      if (!parsedResult.success) {
        console.error("Failed to parse JSON:", parsedResult.error)
        setValidationError("Invalid JSON format")
        return
      }
      const result = resumeSchema.safeParse(parsedResult.data)

      if (result.success) {
        setValidationError(null)
        onChange(jsonValue)
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

  const handleYamlChange = useCallback(
    (value: string) => {
      try {
        const jsonValue = JSON.stringify(jsYaml.load(value), null, 2)
        setCode(jsonValue)
        setYamlCode(value)
        handleValueChange(jsonValue)
      } catch (error) {
        console.error("Failed to parse YAML:", error)
        setValidationError("Invalid YAML format")
      }
    },
    [handleValueChange]
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

  const yamlExtensions = useMemo(
    () => [
      yamlLang(),
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
    <div className="h-full w-full bg-zinc-900 text-white dark">
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
              options={["form", "upload", "json", "yaml", "jsonschema"]}
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
              <div className="px-2 overflow-scroll absolute top-0 bottom-0 w-full pb-[300px] dark">
                <Form
                  uiSchema={uiSchema}
                  schema={parsedSchema}
                  validator={validator}
                  formData={document.data}
                  onChange={({ formData }) => {
                    handleValueChange(JSON.stringify(formData, null, 2))
                  }}
                  className="text-white"
                  widgets={{
                    TextWidget,
                  }}
                  templates={{
                    ObjectFieldTemplate,
                    FieldErrorTemplate,
                  }}
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
            <Case condition={selected === "yaml"}>
              <CodeMirror
                value={yamlCode}
                theme={oneDark}
                extensions={yamlExtensions}
                onChange={handleYamlChange}
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
