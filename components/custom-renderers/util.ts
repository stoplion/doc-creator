import type { Ajv } from "ajv"
import type { JsonSchema, UISchemaElement } from "@jsonforms/core"
import type { JsonFormsProps } from "@jsonforms/react"

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
  return (props: JsonFormsProps & { ajv: Ajv }) => {
    const { data, path, schema, uischema, visible, enabled, ajv } = props
    return (
      <Component
        {...(props as P)}
        data={data}
        path={path}
        schema={schema}
        uischema={uischema}
        visible={visible}
        enabled={enabled}
        ajv={ajv}
      />
    )
  }
}
