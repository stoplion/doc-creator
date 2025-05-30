import type { UISchemaElement } from "@jsonforms/core"
import { JsonFormsDispatch } from "@jsonforms/react"
import type { CustomRendererProps } from "../util"
import { withCustomProps } from "../util"

export interface JsonFormsLayoutProps extends CustomRendererProps {
  uischema: UISchemaElement
}

export const JsonFormsLayout = ({
  uischema,
  schema,
  path,
  enabled,
}: JsonFormsLayoutProps) => {
  return (
    <JsonFormsDispatch
      uischema={uischema}
      schema={schema}
      path={path}
      enabled={enabled}
    />
  )
}

export default withCustomProps(JsonFormsLayout)
