import {
  isAllOfControl,
  JsonSchema,
  RankedTester,
  rankWith,
  StatePropsOfCombinator,
} from "@jsonforms/core"
import { JsonFormsDispatch, withJsonFormsAllOfProps } from "@jsonforms/react"
import { useMemo } from "react"

export const AllOfRenderer = ({
  schema,
  rootSchema,
  indexOfFittingSchema,
  visible,
  path,
  enabled,
  renderers,
  cells,
}: StatePropsOfCombinator) => {
  const _schema = useMemo(() => {
    const allOfSchema = schema as JsonSchema
    return indexOfFittingSchema !== undefined && allOfSchema.allOf
      ? allOfSchema.allOf[indexOfFittingSchema]
      : schema
  }, [schema, indexOfFittingSchema])

  if (!visible) {
    return null
  }

  return (
    <JsonFormsDispatch
      schema={_schema}
      path={path}
      enabled={enabled}
      renderers={renderers}
      cells={cells}
    />
  )
}

export const allOfControlTester: RankedTester = rankWith(2, isAllOfControl)

export default withJsonFormsAllOfProps(AllOfRenderer)
