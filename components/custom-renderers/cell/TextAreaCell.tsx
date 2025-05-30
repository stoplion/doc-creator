import { Textarea } from "@/components/ui/textarea"
import {
  CellProps,
  isMultiLineControl,
  RankedTester,
  rankWith,
} from "@jsonforms/core"
import { withJsonFormsCellProps } from "@jsonforms/react"
import { cn } from "../../../utils/cn"

interface ExtendedCellProps extends CellProps {
  className?: string
}

export const TextAreaCell = ({
  data,
  className,
  id,
  enabled,
  config,
  uischema,
  path,
  handleChange,
}: ExtendedCellProps) => {
  const appliedUiSchemaOptions = {
    ...config,
    ...uischema.options,
  }

  return (
    <Textarea
      value={data || ""}
      onChange={(ev) =>
        handleChange(path, ev.target.value === "" ? undefined : ev.target.value)
      }
      className={cn("min-h-[80px] resize-y", className)}
      id={id}
      disabled={!enabled}
      autoFocus={appliedUiSchemaOptions.focus}
      placeholder={appliedUiSchemaOptions.placeholder}
    />
  )
}

/**
 * Tester for a multi-line string control.
 * @type {RankedTester}
 */
export const textAreaCellTester: RankedTester = rankWith(2, isMultiLineControl)

export default withJsonFormsCellProps(TextAreaCell)
