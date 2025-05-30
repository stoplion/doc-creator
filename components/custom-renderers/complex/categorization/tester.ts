import { rankWith, UISchemaElement } from "@jsonforms/core"

export const isCategorization = (uischema: UISchemaElement): boolean => {
  return uischema.type === "Categorization"
}

export const categorizationTester = rankWith(1, isCategorization)
