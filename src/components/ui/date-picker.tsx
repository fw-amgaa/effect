import * as React from "react"
import { format, parse, isValid } from "date-fns"
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
  const [inputValue, setInputValue] = React.useState(value || "")

  React.useEffect(() => {
    setInputValue(value || "")
  }, [value])

  const date = value ? parse(value, "yyyy-MM-dd", new Date()) : undefined

  function handleSelect(day: Date | undefined) {
    if (day) {
      const formatted = format(day, "yyyy-MM-dd")
      onChange?.(formatted)
      setInputValue(formatted)
      setOpen(false)
    }
  }

  function autoFormatDate(raw: string): string {
    // Strip everything except digits
    const digits = raw.replace(/\D/g, "").slice(0, 8)
    if (digits.length <= 4) return digits
    if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4)}`
    return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = autoFormatDate(e.target.value)
    setInputValue(formatted)

    // Commit when we have a full valid date
    if (/^\d{4}-\d{2}-\d{2}$/.test(formatted)) {
      const parsed = parse(formatted, "yyyy-MM-dd", new Date())
      if (isValid(parsed) && parsed.getFullYear() >= 1930 && parsed <= new Date()) {
        onChange?.(formatted)
      }
    }
  }

  function handleInputBlur() {
    if (/^\d{4}-\d{2}-\d{2}$/.test(inputValue)) {
      const parsed = parse(inputValue, "yyyy-MM-dd", new Date())
      if (isValid(parsed) && parsed.getFullYear() >= 1930 && parsed <= new Date()) {
        onChange?.(inputValue)
        return
      }
    }
    // Revert to last valid value
    setInputValue(value || "")
  }

  return (
    <>
      {name && <input type="hidden" name={name} value={value || ""} required={required} />}
      <div className={cn("relative flex items-center", className)}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          required={required}
          className={cn(
            "flex h-11 w-full items-center rounded-xl border border-outline-variant/30 bg-card pl-4 pr-11 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring/30",
            !inputValue && "text-muted-foreground/50"
          )}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-muted-foreground transition-colors"
              >
                <CalendarDays className="size-4" />
              </button>
            }
          />
          <PopoverContent className="w-auto p-0" align="end">
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
      </div>
    </>
  )
}

export { DatePicker }
