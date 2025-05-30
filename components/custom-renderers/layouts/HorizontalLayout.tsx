import { cn } from "@/utils/cn"
import {
  HorizontalLayout as JsonFormsHorizontalLayout,
  RankedTester,
  rankWith,
  RendererProps,
  uiTypeIs,
} from "@jsonforms/core"
import { JsonFormsDispatch, withJsonFormsLayoutProps } from "@jsonforms/react"
import React from "react"
import { JsonFormsLayout } from "./JsonFormsLayout"

export const horizontalLayoutTester: RankedTester = rankWith(
  1,
  uiTypeIs("HorizontalLayout")
)

export const HorizontalLayoutRenderer = (props: RendererProps) => {
  const { data: _data, ...otherProps } = props
  return <HorizontalLayoutRendererComponent {...otherProps} />
}

const HorizontalLayoutRendererComponent = React.memo(
  function HorizontalLayoutRendererComponent({
    schema,
    uischema,
    path,
    visible,
    enabled,
    renderers,
    cells,
  }: RendererProps) {
    const horizontalLayout = uischema as JsonFormsHorizontalLayout
    const elementsSize = horizontalLayout.elements?.length ?? 0

    return (
      <JsonFormsLayout
        className="flex flex-row gap-4"
        uischema={uischema}
        schema={schema}
        visible={visible}
        enabled={enabled}
        path={path}
      >
        {horizontalLayout.elements?.map((element, index) => (
          <div
            key={`${path}-${index}`}
            className={cn("flex-1", index < elementsSize - 1 && "mr-4")}
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
      </JsonFormsLayout>
    )
  }
)

export default withJsonFormsLayoutProps(HorizontalLayoutRenderer, false)
