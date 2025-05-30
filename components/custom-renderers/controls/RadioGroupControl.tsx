import {
  and,
  ControlProps,
  isEnumControl,
  optionIs,
  RankedTester,
  rankWith,
} from "@jsonforms/core"
import { withJsonFormsEnumProps } from "@jsonforms/react"
import { RadioGroup } from "./RadioGroup"

export const RadioGroupControl = (props: ControlProps) => {
  return <RadioGroup {...props} />
}

export const radioGroupControlTester: RankedTester = rankWith(
  3,
  and(isEnumControl, optionIs("format", "radio"))
)

export default withJsonFormsEnumProps(RadioGroupControl)
