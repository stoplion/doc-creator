import { Card } from "@/components/ui/card"
import type { Category, JsonSchema } from "@jsonforms/core"
import { JsonFormsDispatch } from "@jsonforms/react"

export interface CategoryProps {
  category: Category
  schema: JsonSchema
  path: string
}

export const SingleCategory = ({ category, schema, path }: CategoryProps) => (
  <Card className="p-4">
    {(category.elements || []).map((child, index) => (
      <JsonFormsDispatch
        key={`${path}-${index}`}
        uischema={child}
        schema={schema}
        path={path}
      />
    ))}
  </Card>
)
