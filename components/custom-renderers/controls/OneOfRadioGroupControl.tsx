import {
  and,
  ControlProps,
  isOneOfEnumControl,
  optionIs,
  RankedTester,
  rankWith,
} from "@jsonforms/core"
import { withJsonFormsOneOfEnumProps } from "@jsonforms/react"
import { RadioGroup } from "./RadioGroup"

export const OneOfRadioGroupControl = (props: ControlProps) => {
  return <RadioGroup {...props} />
}

export const oneOfRadioGroupControlTester: RankedTester = rankWith(
  3,
  and(isOneOfEnumControl, optionIs("format", "radio"))
)

export default withJsonFormsOneOfEnumProps(OneOfRadioGroupControl)
