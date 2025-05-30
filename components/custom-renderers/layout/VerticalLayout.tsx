import type { Layout } from "@jsonforms/core"
import { isVerticalLayout, rankWith } from "@jsonforms/core"
import type { CustomLayoutProps } from "../util"
import { withCustomProps } from "../util"
import { renderChildren } from "./util"

export const verticalLayoutTester = rankWith(1, isVerticalLayout)

export const VerticalLayout = ({
  uischema,
  schema,
  path,
  enabled,
}: CustomLayoutProps) => {
  const layout = uischema as Layout
  return (
    <div className="flex flex-col gap-4">
      {renderChildren(layout, schema, "w-full", path, enabled)}
    </div>
  )
}

export default withCustomProps(VerticalLayout)
