import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  CellProps,
  isDateControl,
  RankedTester,
  rankWith,
} from "@jsonforms/core"
import { withJsonFormsCellProps } from "@jsonforms/react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "../../../utils/cn"

interface ExtendedCellProps extends CellProps {
  className?: string
}

export const DateCell = ({
  data,
  className,
  id,
  enabled,
  uischema,
  path,
  handleChange,
}: ExtendedCellProps) => {
  const date = data ? new Date(data) : undefined

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
          disabled={!enabled}
          autoFocus={uischema.options?.focus}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date: Date | undefined) =>
            handleChange(path, date?.toISOString() || "")
          }
          disabled={!enabled}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

/**
 * Default tester for date controls.
 * @type {RankedTester}
 */
export const dateCellTester: RankedTester = rankWith(2, isDateControl)

export default withJsonFormsCellProps(DateCell)
