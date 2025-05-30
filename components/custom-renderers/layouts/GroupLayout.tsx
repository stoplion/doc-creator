import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/utils/cn"
import {
  GroupLayout as JsonFormsGroupLayout,
  LayoutProps,
  RankedTester,
  rankWith,
  uiTypeIs,
} from "@jsonforms/core"
import { JsonFormsDispatch, withJsonFormsLayoutProps } from "@jsonforms/react"
import React from "react"

export const groupTester: RankedTester = rankWith(1, uiTypeIs("Group"))

export const GroupLayoutRenderer = (props: LayoutProps) => {
  const { data: _data, ...otherProps } = props
  return <GroupLayoutRendererComponent {...otherProps} />
}

const GroupLayoutRendererComponent = React.memo(
  function GroupLayoutRendererComponent({
    schema,
    uischema,
    path,
    enabled,
    visible,
    label,
    renderers,
    cells,
  }: LayoutProps) {
    const group = uischema as JsonFormsGroupLayout
    const elementsSize = group.elements?.length ?? 0

    return (
      <Card className={cn("w-full", visible === false && "hidden")}>
        {label && (
          <CardHeader>
            <CardTitle>{label}</CardTitle>
          </CardHeader>
        )}
        <CardContent className="space-y-4">
          {group.elements?.map((element, index) => (
            <div
              key={`${path}-${index}`}
              className={cn("w-full", index < elementsSize - 1 && "mb-4")}
            >
              <JsonFormsDispatch
                renderers={renderers}
                cells={cells}
                uischema={element}
                schema={schema}
                path={path}
                enabled={enabled}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }
)

export default withJsonFormsLayoutProps(GroupLayoutRenderer)
