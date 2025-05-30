import { cn } from "@/lib/utils"
import type { JsonSchema, Layout } from "@jsonforms/core"
import { JsonFormsDispatch, useJsonForms } from "@jsonforms/react"
import isEmpty from "lodash/isEmpty"

export interface RenderChildrenProps {
  layout: Layout
  schema: JsonSchema
  className: string
  path: string
  enabled?: boolean
}

export const renderChildren = (
  layout: Layout,
  schema: JsonSchema,
  className: string,
  path: string,
  enabled = true
) => {
  if (isEmpty(layout.elements)) {
    return []
  }

  const { renderers, cells } = useJsonForms()

  return layout.elements.map((child, index) => {
    return (
      <div key={`${path}-${index}`} className={cn(className)}>
        <JsonFormsDispatch
          renderers={renderers}
          cells={cells}
          uischema={child}
          schema={schema}
          path={path}
          enabled={enabled}
        />
      </div>
    )
  })
}
