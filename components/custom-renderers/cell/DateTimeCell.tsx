import {
  CellProps,
  isDateTimeControl,
  RankedTester,
  rankWith,
} from "@jsonforms/core"
import { withJsonFormsCellProps } from "@jsonforms/react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import React from "react"
import { cn } from "../../../utils/cn"
import { Button } from "../../ui/button"
import { Calendar } from "../../ui/calendar"
import { Input } from "../../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"

interface ExtendedCellProps extends CellProps {
  className?: string
}

export const DateTimeCell = ({
  data,
  className,
  id,
  enabled,
  uischema,
  path,
  handleChange,
}: ExtendedCellProps) => {
  const dateTime = data ? new Date(data) : undefined
  const [time, setTime] = React.useState(
    dateTime ? format(dateTime, "HH:mm") : "00:00"
  )

  const toISOString = (date: Date | undefined, timeStr: string) => {
    if (!date) return ""
    const [hours, minutes] = timeStr.split(":").map(Number)
    const newDate = new Date(date)
    newDate.setHours(hours, minutes)
    return newDate.toISOString()
  }

  const handleDateSelect = (date: Date | undefined) => {
    handleChange(path, toISOString(date, time))
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value
    setTime(newTime)
    if (dateTime) {
      handleChange(path, toISOString(dateTime, newTime))
    }
  }

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !dateTime && "text-muted-foreground",
              className
            )}
            disabled={!enabled}
            autoFocus={uischema.options?.focus}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateTime ? format(dateTime, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateTime}
            onSelect={handleDateSelect}
            disabled={!enabled}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Input
        type="time"
        value={time}
        onChange={handleTimeChange}
        className="w-[120px]"
        disabled={!enabled}
      />
    </div>
  )
}

/**
 * Default tester for datetime controls.
 * @type {RankedTester}
 */
export const dateTimeCellTester: RankedTester = rankWith(2, isDateTimeControl)

export default withJsonFormsCellProps(DateTimeCell)
