import {
  CellProps,
  Formatted,
  isNumberFormatControl,
  RankedTester,
  rankWith,
} from "@jsonforms/core"
import { withJsonFormsCellProps } from "@jsonforms/react"
import React from "react"
import { cn } from "../../../utils/cn"
import { Input } from "../../ui/input"

type Props = CellProps & Formatted<number | undefined> & { className?: string }

export const NumberFormatCell = ({
  className,
  id,
  enabled,
  uischema,
  path,
  handleChange,
  schema,
  toFormatted,
  fromFormatted,
  data,
}: Props) => {
  const maxLength = schema.maxLength
  const formattedNumber: string = toFormatted(data)

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const validStringNumber = fromFormatted(ev.currentTarget.value)
    handleChange(path, validStringNumber)
  }

  return (
    <Input
      type="text"
      value={formattedNumber}
      onChange={onChange}
      className={cn("w-full", className)}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options?.focus}
      maxLength={uischema.options?.restrict ? maxLength : undefined}
      size={uischema.options?.trim ? maxLength : undefined}
    />
  )
}

/**
 * Default tester for text-based/string controls.
 * @type {RankedTester}
 */
export const numberFormatCellTester: RankedTester = rankWith(
  4,
  isNumberFormatControl
)

// We need to cast the component to satisfy TypeScript's type checking
export default withJsonFormsCellProps(
  NumberFormatCell as React.ComponentType<CellProps>
)
