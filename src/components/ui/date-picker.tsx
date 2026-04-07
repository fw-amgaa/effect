import * as React from "react"
import { format, parse } from "date-fns"
import { mn } from "date-fns/locale"
import { CalendarDays } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  value?: string // "YYYY-MM-DD" format
  onChange?: (value: string) => void
  placeholder?: string
  className?: string
  required?: boolean
  name?: string
}

function DatePicker({
  value,
  onChange,
  placeholder = "Огноо сонгох",
  className,
  required,
  name,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  const date = value ? parse(value, "yyyy-MM-dd", new Date()) : undefined

  function handleSelect(day: Date | undefined) {
    if (day) {
      onChange?.(format(day, "yyyy-MM-dd"))
      setOpen(false)
    }
  }

  return (
    <>
      {name && <input type="hidden" name={name} value={value || ""} required={required} />}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <button
              type="button"
              className={cn(
                "flex h-11 w-full items-center gap-3 rounded-xl border border-outline-variant/30 bg-card px-4 text-left text-sm transition-colors hover:bg-surface-container-low focus:outline-none focus:ring-2 focus:ring-ring/30",
                !value && "text-muted-foreground/50",
                className
              )}
            >
              <CalendarDays className="size-4 shrink-0 text-muted-foreground/40" />
              <span className="flex-1 truncate">
                {date ? format(date, "yyyy-MM-dd") : placeholder}
              </span>
            </button>
          }
        />
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            captionLayout="dropdown"
            startMonth={new Date(1930, 0)}
            endMonth={new Date()}
            defaultMonth={date || new Date(2000, 0)}
            locale={mn}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}

export { DatePicker }
