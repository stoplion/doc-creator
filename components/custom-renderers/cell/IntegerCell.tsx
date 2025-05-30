import {
  CellProps,
  isIntegerControl,
  RankedTester,
  rankWith,
} from "@jsonforms/core"
import { withJsonFormsCellProps } from "@jsonforms/react"
import { cn } from "../../../utils/cn"
import { Input } from "../../ui/input"

interface ExtendedCellProps extends CellProps {
  className?: string
}

const toNumber = (value: string) =>
  value === "" ? undefined : parseInt(value, 10)

export const IntegerCell = ({
  data,
  className,
  id,
  enabled,
  uischema,
  path,
  handleChange,
}: ExtendedCellProps) => {
  return (
    <Input
      type="number"
      step="1"
      value={data ?? ""}
      onChange={(ev) => handleChange(path, toNumber(ev.target.value))}
      className={cn("w-full", className)}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options?.focus}
    />
  )
}

/**
 * Default tester for integer controls.
 * @type {RankedTester}
 */
export const integerCellTester: RankedTester = rankWith(2, isIntegerControl)

export default withJsonFormsCellProps(IntegerCell)
