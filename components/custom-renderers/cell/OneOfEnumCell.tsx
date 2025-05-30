import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  EnumCellProps,
  EnumOption,
  isOneOfEnumControl,
  RankedTester,
  rankWith,
} from "@jsonforms/core"
import {
  TranslateProps,
  withJsonFormsOneOfEnumCellProps,
  withTranslateProps,
} from "@jsonforms/react"
import { useMemo } from "react"

const i18nDefaults = {
  "enum.none": "None",
}

type Props = EnumCellProps & TranslateProps & { className?: string }

export const OneOfEnumCell = (props: Props) => {
  const {
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
  } = props

  const noneOptionLabel = useMemo(
    () => t("enum.none", i18nDefaults["enum.none"], { schema, uischema, path }),
    [t, schema, uischema, path]
  )

  const allOptions: EnumOption[] = [
    ...(uischema.options?.hideEmptyOption === true
      ? []
      : [{ value: "", label: noneOptionLabel }]),
    ...options,
  ]

  return (
    <div className="space-y-2">
      <Select
        value={data || ""}
        onValueChange={(value) =>
          handleChange(path, value === "" ? undefined : value)
        }
        disabled={!enabled}
      >
        <SelectTrigger className={className}>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {allOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

/**
 * Default tester for oneOf enum controls.
 * @type {RankedTester}
 */
export const oneOfEnumCellTester: RankedTester = rankWith(3, isOneOfEnumControl)

export default withJsonFormsOneOfEnumCellProps(
  withTranslateProps(OneOfEnumCell)
)
