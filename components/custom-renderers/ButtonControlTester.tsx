import { and, isControl, rankWith, schemaMatches } from "@jsonforms/core"

export const buttonControlTester = rankWith(
  3, // Higher rank than default renderers
  and(
    isControl,
    schemaMatches((schema) => schema.type === "boolean")
  )
)
