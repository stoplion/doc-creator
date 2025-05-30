import { isStringControl, rankWith } from "@jsonforms/core"

export const textInputControlTester = rankWith(
  1, // Higher rank than default renderers
  isStringControl
)
