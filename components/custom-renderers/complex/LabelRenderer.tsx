import { Label } from "@/components/ui/label"
import { LabelProps, RankedTester, rankWith, uiTypeIs } from "@jsonforms/core"
import { withJsonFormsLabelProps } from "@jsonforms/react"

export const labelRendererTester: RankedTester = rankWith(1, uiTypeIs("Label"))

export const LabelRenderer = ({ text, visible }: LabelProps) => {
  if (!visible) {
    return null
  }

  return (
    <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {text}
    </Label>
  )
}

export default withJsonFormsLabelProps(LabelRenderer)
