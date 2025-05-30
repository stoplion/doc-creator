import { Label } from "@/components/ui/label"
import { LabelProps, RankedTester, rankWith, uiTypeIs } from "@jsonforms/core"
import { withJsonFormsLabelProps } from "@jsonforms/react"

export const labelRendererTester: RankedTester = rankWith(1, uiTypeIs("Label"))

export const LabelRenderer = withJsonFormsLabelProps(
  ({ text, visible }: LabelProps) => {
    if (!visible) {
      return null
    }

    return <Label>{text}</Label>
  }
)
