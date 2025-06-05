// "use client"

import { json } from "@codemirror/lang-json"
import { yaml as yamlLang } from "@codemirror/lang-yaml"
import { oneDark } from "@codemirror/theme-one-dark"
import { EditorView, lineNumbers } from "@codemirror/view"
import TitleField from "./custom-templates/TitleField"
// import Form, { IChangeEvent } from "@rjsf/core"
import { IChangeEvent, withTheme } from "@rjsf/core"
import { Theme as shadcnTheme } from "@rjsf/shadcn"
import { RJSFSchema, UiSchema } from "@rjsf/utils"
import validator from "@rjsf/validator-ajv8"
import CodeMirror from "@uiw/react-codemirror"
import { useCallback, useMemo } from "react"
import { Case, Switch } from "react-if"
import { zodToJsonSchema } from "zod-to-json-schema"
import { Tables } from "../database.types"
import { resumeSchema } from "../json-schemas/resumeSchema"
import { cn } from "../utils/cn"
import ArrayFieldItemTemplate from "./custom-templates/ArrayFieldItemTemplate"
import ArrayFieldTemplate from "./custom-templates/ArrayFieldTemplate"
import ObjectFieldTemplate from "./custom-templates/ObjectFieldTemplate"
import { FileUploaderBox } from "./misc/FileUploaderBox"
import { testSchema } from "./ui-schemas/test"

const Form = withTheme(shadcnTheme)

type Document = Tables<"documents">

const uiSchema: UiSchema = {
  // "ui:classNames": "bg-red-500",
}

interface DocumentEditorProps {
  document: Document
  selectedTab: string
  validationError: string | null
  code: string
  yamlCode: string
  handleValueChange: (value: string | object) => void
  handleYamlChange: (value: string) => void
}

export function DocumentEditor({
  document,
  selectedTab,
  validationError,
  code,
  yamlCode,
  handleValueChange,
  handleYamlChange,
}: DocumentEditorProps) {
  // Memoize JSON schema
  const jsonSchema = useMemo(
    () =>
      JSON.stringify(zodToJsonSchema(resumeSchema, "resumeSchema"), null, 2),
    []
  )

  // Memoize parsed schema
  const parsedSchema = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonSchema)
      return parsed.definitions?.ResumeSchema || parsed
    } catch (error) {
      console.error("Failed to parse JSON schema:", error)
      return {}
    }
  }, [jsonSchema])

  // Memoize common CodeMirror theme
  const commonTheme = useMemo(
    () =>
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
    []
  )

  // Memoize extensions
  const extensions = useMemo(
    () => [json(), lineNumbers(), EditorView.lineWrapping, commonTheme],
    [commonTheme]
  )

  const yamlExtensions = useMemo(
    () => [yamlLang(), lineNumbers(), EditorView.lineWrapping, commonTheme],
    [commonTheme]
  )

  // Memoize editor class name
  const editorClassName = useMemo(
    () =>
      cn(
        "h-full overflow-scroll",
        validationError && "border-2 border-red-500"
      ),
    [validationError]
  )

  // Memoize form change handler
  const handleFormChange = useCallback(
    (event: IChangeEvent<unknown, RJSFSchema>) => {
      if (event.formData) {
        handleValueChange(JSON.stringify(event.formData, null, 2))
      }
    },
    [handleValueChange]
  )

  return (
    <div className="h-full w-full bg-zinc-900 text-white dark">
      <div className="h-full flex flex-col">
        <div className="flex-1 min-h-0 overflow-hidden relative">
          <Switch>
            <Case condition={selectedTab === "form"}>
              <div className="p-4 overflow-scroll absolute top-0 bottom-0 w-full pb-[300px]">
                <Form
                  // uiSchema={uiSchema}
                  schema={parsedSchema}
                  uiSchema={testSchema as UiSchema}
                  validator={validator}
                  formData={document.data}
                  onChange={handleFormChange}
                  className="text-white"
                  templates={{
                    ArrayFieldTemplate,
                    ArrayFieldItemTemplate,
                    TitleFieldTemplate: TitleField,
                    ObjectFieldTemplate,
                  }}
                />
              </div>
            </Case>
            <Case condition={selectedTab === "json"}>
              <CodeMirror
                value={code}
                theme={oneDark}
                extensions={extensions}
                onChange={handleValueChange}
                className={editorClassName}
              />
            </Case>
            <Case condition={selectedTab === "yaml"}>
              <CodeMirror
                value={yamlCode}
                theme={oneDark}
                extensions={yamlExtensions}
                onChange={handleYamlChange}
                className={editorClassName}
              />
            </Case>
            <Case condition={selectedTab === "jsonschema"}>
              <CodeMirror
                value={jsonSchema}
                theme={oneDark}
                extensions={extensions}
                className={editorClassName}
              />
            </Case>
            <Case condition={selectedTab === "upload"}>
              <div className="px-4">
                <FileUploaderBox />
              </div>
            </Case>
          </Switch>
        </div>
      </div>
    </div>
  )
}
