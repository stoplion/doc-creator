import {
  CellProps,
  isNumberControl,
  RankedTester,
  rankWith,
} from "@jsonforms/core"
import { withJsonFormsCellProps } from "@jsonforms/react"
import { cn } from "../../../utils/cn"
import { Input } from "../../ui/input"

interface ExtendedCellProps extends CellProps {
  className?: string
}

const toNumber = (value: string) => (value === "" ? undefined : Number(value))

export const NumberCell = ({
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
      step="0.1"
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
 * Default tester for number controls.
 * @type {RankedTester}
 */
export const numberCellTester: RankedTester = rankWith(2, isNumberControl)

export default withJsonFormsCellProps(NumberCell)
