import { Input } from "@/components/ui/input"
import {
  CellProps,
  isStringControl,
  RankedTester,
  rankWith,
} from "@jsonforms/core"
import { withJsonFormsCellProps } from "@jsonforms/react"
import { cn } from "../../../utils/cn"

interface ExtendedCellProps extends CellProps {
  className?: string
}

export const TextCell = ({
  config,
  data,
  className,
  id,
  enabled,
  uischema,
  schema,
  path,
  handleChange,
}: ExtendedCellProps) => {
  const maxLength = schema.maxLength
  const appliedUiSchemaOptions = {
    ...config,
    ...uischema.options,
  }

  return (
    <Input
      type={appliedUiSchemaOptions.format === "password" ? "password" : "text"}
      value={data || ""}
      onChange={(ev) =>
        handleChange(path, ev.target.value === "" ? undefined : ev.target.value)
      }
      className={cn("w-full", className)}
      id={id}
      disabled={!enabled}
      autoFocus={appliedUiSchemaOptions.focus}
      placeholder={appliedUiSchemaOptions.placeholder}
      maxLength={appliedUiSchemaOptions.restrict ? maxLength : undefined}
      size={appliedUiSchemaOptions.trim ? maxLength : undefined}
    />
  )
}

/**
 * Default tester for text-based/string controls.
 * @type {RankedTester}
 */
export const textCellTester: RankedTester = rankWith(1, isStringControl)

export default withJsonFormsCellProps(TextCell)
