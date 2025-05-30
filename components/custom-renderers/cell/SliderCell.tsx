import { Slider } from "@/components/ui/slider"
import {
  CellProps,
  isRangeControl,
  RankedTester,
  rankWith,
} from "@jsonforms/core"
import { withJsonFormsCellProps } from "@jsonforms/react"
import { cn } from "../../../utils/cn"

interface ExtendedCellProps extends CellProps {
  className?: string
}

export const SliderCell = ({
  data,
  className,
  id,
  enabled,
  uischema,
  schema,
  path,
  handleChange,
}: ExtendedCellProps) => {
  const min = schema.minimum ?? 0
  const max = schema.maximum ?? 100
  const step = schema.multipleOf ?? 1

  return (
    <div className="flex items-center gap-4">
      <Slider
        id={id}
        value={[data ?? min]}
        min={min}
        max={max}
        step={step}
        disabled={!enabled}
        onValueChange={([value]) => handleChange(path, value)}
        className={cn("flex-1", className)}
        autoFocus={uischema.options?.focus}
      />
      <span className="min-w-[3rem] text-right text-sm text-zinc-400">
        {data ?? min}
      </span>
    </div>
  )
}

/**
 * Default tester for range controls.
 * @type {RankedTester}
 */
export const sliderCellTester: RankedTester = rankWith(4, isRangeControl)

export default withJsonFormsCellProps(SliderCell)
