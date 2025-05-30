import { Label } from "@/components/ui/label"
import {
  RadioGroupItem,
  RadioGroup as ShadcnRadioGroup,
} from "@/components/ui/radio-group"
import {
  computeLabel,
  ControlProps,
  isDescriptionHidden,
  OwnPropsOfEnum,
} from "@jsonforms/core"
import merge from "lodash/merge"
import { useState } from "react"
import { cn } from "../../../utils/cn"

export const RadioGroup = ({
  id,
  label,
  options = [],
  required = false,
  description,
  errors,
  data,
  uischema,
  visible,
  config,
  enabled,
  path,
  handleChange,
}: ControlProps & OwnPropsOfEnum) => {
  const [isFocused, setFocus] = useState(false)
  const isValid = errors.length === 0
  const appliedUiSchemaOptions = merge({}, config, uischema.options)
  const showDescription = !isDescriptionHidden(
    visible,
    description,
    isFocused,
    appliedUiSchemaOptions.showUnfocusedDescription
  )

  if (!visible) {
    return null
  }

  return (
    <div
      className="space-y-2"
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      {label && (
        <Label htmlFor={id}>
          {computeLabel(
            label,
            required,
            appliedUiSchemaOptions.hideRequiredAsterisk ?? false
          )}
        </Label>
      )}
      <ShadcnRadioGroup
        value={data}
        onValueChange={(value) => handleChange(path, value)}
        disabled={!enabled}
        className={cn(
          "flex gap-4",
          appliedUiSchemaOptions.orientation === "vertical" && "flex-col"
        )}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value}
              id={`${id}-${option.value}`}
              disabled={!enabled}
            />
            <Label htmlFor={`${id}-${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </ShadcnRadioGroup>
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
