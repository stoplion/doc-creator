import type { Layout } from "@jsonforms/core"
import { isHorizontalLayout, rankWith } from "@jsonforms/core"
import type { CustomLayoutProps } from "../util"
import { withCustomProps } from "../util"
import { renderChildren } from "./util"

export const horizontalLayoutTester = rankWith(1, isHorizontalLayout)

export const HorizontalLayout = ({
  uischema,
  schema,
  path,
  enabled,
}: CustomLayoutProps) => {
  const layout = uischema as Layout
  return (
    <div className="flex flex-row gap-4">
      {renderChildren(layout, schema, "flex-1", path, enabled)}
    </div>
  )
}

export default withCustomProps(HorizontalLayout)
