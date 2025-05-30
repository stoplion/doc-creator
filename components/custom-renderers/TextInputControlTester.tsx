import { isStringControl, rankWith } from "@jsonforms/core"

export const textInputControlTester = rankWith(
  3, // Higher rank than default renderers
  isStringControl
)
