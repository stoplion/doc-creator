import {
  computeLabel,
  ControlProps,
  isControl,
  isDescriptionHidden,
  NOT_APPLICABLE,
  RankedTester,
  rankWith,
} from "@jsonforms/core"
import { DispatchCell, withJsonFormsControlProps } from "@jsonforms/react"
import maxBy from "lodash/maxBy"
import merge from "lodash/merge"
import React from "react"
import { cn } from "../../../utils/cn"

export const InputControl = ({
  description,
  id,
  errors,
  label,
  uischema,
  schema,
  rootSchema,
  visible,
  enabled,
  required,
  path,
  cells,
  config,
}: ControlProps) => {
  const [isFocused, setIsFocused] = React.useState(false)
  const isValid = errors.length === 0

  const appliedUiSchemaOptions = merge({}, config, uischema.options)
  const showDescription = !isDescriptionHidden(
    visible,
    description,
    isFocused,
    appliedUiSchemaOptions.showUnfocusedDescription
  )

  const testerContext = {
    rootSchema: rootSchema,
    config: config,
  }

  const cell = maxBy(cells, (r) => r.tester(uischema, schema, testerContext))

  if (
    cell === undefined ||
    cell.tester(uischema, schema, testerContext) === NOT_APPLICABLE
  ) {
    console.warn("No applicable cell found.", uischema, schema)
    return null
  }

  if (!visible) {
    return null
  }

  return (
    <div
      className="space-y-2"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      id={id}
    >
      <label
        htmlFor={`${id}-input`}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {computeLabel(
          label,
          required,
          appliedUiSchemaOptions.hideRequiredAsterisk ?? false
        )}
      </label>
      <DispatchCell
        uischema={uischema}
        schema={schema}
        path={path}
        id={`${id}-input`}
        enabled={enabled}
      />
      <div
        className={cn(
          "text-sm",
          !isValid ? "text-destructive" : "text-muted-foreground"
        )}
      >
        {!isValid ? errors : showDescription ? description : null}
      </div>
    </div>
  )
}

export const inputControlTester: RankedTester = rankWith(1, isControl)

export default withJsonFormsControlProps(InputControl)
