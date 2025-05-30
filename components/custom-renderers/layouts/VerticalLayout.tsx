import { cn } from "@/utils/cn"
import {
  VerticalLayout as JsonFormsVerticalLayout,
  RankedTester,
  rankWith,
  RendererProps,
  uiTypeIs,
} from "@jsonforms/core"
import { JsonFormsDispatch, withJsonFormsLayoutProps } from "@jsonforms/react"
import React from "react"
import { JsonFormsLayout } from "./JsonFormsLayout"

export const verticalLayoutTester: RankedTester = rankWith(
  1,
  uiTypeIs("VerticalLayout")
)

export const VerticalLayoutRenderer = (props: RendererProps) => {
  const { data: _data, ...otherProps } = props
  return <VerticalLayoutRendererComponent {...otherProps} />
}

const VerticalLayoutRendererComponent = React.memo(
  function VerticalLayoutRendererComponent({
    schema,
    uischema,
    path,
    visible,
    enabled,
    renderers,
    cells,
  }: RendererProps) {
    const verticalLayout = uischema as JsonFormsVerticalLayout
    const elementsSize = verticalLayout.elements?.length ?? 0

    return (
      <JsonFormsLayout
        className="space-y-4"
        uischema={uischema}
        schema={schema}
        visible={visible}
        enabled={enabled}
        path={path}
      >
        {verticalLayout.elements?.map((element, index) => (
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
      </JsonFormsLayout>
    )
  }
)

export default withJsonFormsLayoutProps(VerticalLayoutRenderer, false)
