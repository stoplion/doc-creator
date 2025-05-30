import {
  CellProps,
  isTimeControl,
  RankedTester,
  rankWith,
} from "@jsonforms/core"
import { withJsonFormsCellProps } from "@jsonforms/react"
import { cn } from "../../../utils/cn"
import { Input } from "../../ui/input"

interface ExtendedCellProps extends CellProps {
  className?: string
}

/**
 * AJV 'time' format expects HH:mm:ss while <input type='time'> only returns HH:mm.
 * Therefore we append ':00' when the seconds are missing.
 */
const appendSecondsIfNecessary = (value: unknown) => {
  if (typeof value === "string") {
    const splitValue = value.split(":")
    if (splitValue.length === 2) {
      splitValue.push("00")
    }
    return splitValue.join(":")
  }
  return value
}

export const TimeCell = ({
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
      type="time"
      value={data || ""}
      onChange={(ev) =>
        handleChange(path, appendSecondsIfNecessary(ev.target.value))
      }
      className={cn("w-full", className)}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options?.focus}
    />
  )
}

/**
 * Default tester for time controls.
 * @type {RankedTester}
 */
export const timeCellTester: RankedTester = rankWith(2, isTimeControl)

export default withJsonFormsCellProps(TimeCell)
