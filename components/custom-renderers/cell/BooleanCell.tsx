import { Switch } from "@/components/ui/switch"
import {
  CellProps,
  isBooleanControl,
  RankedTester,
  rankWith,
} from "@jsonforms/core"
import { withJsonFormsCellProps } from "@jsonforms/react"
import { cn } from "../../../utils/cn"

interface ExtendedCellProps extends CellProps {
  className?: string
}

export const BooleanCell = ({
  data,
  className,
  id,
  enabled,
  uischema,
  path,
  handleChange,
}: ExtendedCellProps) => {
  return (
    <Switch
      id={id}
      checked={data}
      onCheckedChange={(checked) => handleChange(path, checked)}
      disabled={!enabled}
      className={cn(
        "data-[state=checked]:bg-zinc-900 data-[state=checked]:text-zinc-50",
        className
      )}
      autoFocus={uischema.options?.focus}
    />
  )
}

/**
 * Default tester for boolean controls.
 * @type {RankedTester}
 */
export const booleanCellTester: RankedTester = rankWith(2, isBooleanControl)

export default withJsonFormsCellProps(BooleanCell)
