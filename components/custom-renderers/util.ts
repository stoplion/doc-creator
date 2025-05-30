import type {
  JsonSchema,
  RendererProps,
  UISchemaElement,
} from "@jsonforms/core"
import type { Ajv } from "ajv"
import React from "react"

export interface CustomRendererProps {
  data: any
  path: string
  schema: JsonSchema
  uischema: UISchemaElement
  visible?: boolean
  enabled?: boolean
  ajv: Ajv
}

export interface CustomLayoutProps extends CustomRendererProps {
  elements: UISchemaElement[]
}

export const withCustomProps = <P extends CustomRendererProps>(
  Component: React.ComponentType<P>
) => {
  return (props: RendererProps & { ajv: Ajv }) => {
    const { data, path, schema, uischema, visible, enabled, ajv } = props
    const componentProps: P = {
      ...props,
      data,
      path,
      schema,
      uischema,
      visible,
      enabled,
      ajv,
    } as P
    return React.createElement(Component, componentProps)
  }
}
