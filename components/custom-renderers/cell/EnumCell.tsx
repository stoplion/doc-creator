import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  EnumCellProps,
  isEnumControl,
  RankedTester,
  rankWith,
} from "@jsonforms/core"
import {
  TranslateProps,
  withJsonFormsEnumCellProps,
  withTranslateProps,
} from "@jsonforms/react"
import { useMemo } from "react"
import { cn } from "../../../utils/cn"

type Props = EnumCellProps & TranslateProps & { className?: string }

export const EnumCell = ({
  data,
  className,
  id,
  enabled,
  schema,
  uischema,
  path,
  handleChange,
  options = [],
  t,
}: Props) => {
  const noneOptionLabel = useMemo(
    () => t("enum.none", "None", { schema, uischema, path }),
    [t, schema, uischema, path]
  )

  return (
    <Select
      value={data || ""}
      onValueChange={(value) =>
        handleChange(path, value === "" ? undefined : value)
      }
      disabled={!enabled}
    >
      <SelectTrigger
        id={id}
        className={cn("w-full", className)}
        autoFocus={uischema.options?.focus}
      >
        <SelectValue placeholder={noneOptionLabel} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">{noneOptionLabel}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

/**
 * Default tester for enum controls.
 * @type {RankedTester}
 */
export const enumCellTester: RankedTester = rankWith(2, isEnumControl)

export default withJsonFormsEnumCellProps(withTranslateProps(EnumCell))
