import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  GroupLayout,
  groupTester,
  HorizontalLayout,
  horizontalLayoutTester,
  VerticalLayout,
  verticalLayoutTester,
} from "../layouts"
import { isGroup, rankWith } from "@jsonforms/core"
import type { CustomLayoutProps } from "../util"
import { withCustomProps } from "../util"
import { renderChildren } from "./util"

export const groupTester = rankWith(1, isGroup)

export const GroupLayout = ({
  uischema,
  schema,
  path,
  enabled,
}: CustomLayoutProps) => {
  const layout = uischema as GroupLayout
  return (
    <Card>
      {layout.label && (
        <CardHeader className="pb-2">
          <h3 className="text-lg font-semibold">{layout.label}</h3>
        </CardHeader>
      )}
      <CardContent>
        {renderChildren(layout, schema, "w-full", path, enabled)}
      </CardContent>
    </Card>
  )
}

export default withCustomProps(GroupLayout)
