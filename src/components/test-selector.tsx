import { Checkbox } from "@/components/ui/checkbox"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon } from "@hugeicons/core-free-icons"
import type { TestType } from "@/lib/db/schema"

export type TestSelectorProps = {
  activeTestTypes: TestType[]
  selected: string[]
  onChange: (next: string[]) => void
  // Names already attached to the patient — disabled in the grid.
  existingTestNames?: Set<string>
  // Slot rendered at the bottom (e.g. submit/cancel buttons). Hidden if no slot.
  footer?: React.ReactNode
}

export function TestSelector({
  activeTestTypes,
  selected,
  onChange,
  existingTestNames,
  footer,
}: TestSelectorProps) {
  function toggle(name: string) {
    onChange(
      selected.includes(name)
        ? selected.filter((t) => t !== name)
        : [...selected, name],
    )
  }

  return (
    <section className="space-y-6 rounded-2xl border border-primary-container/10 bg-surface-container-low p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <HugeiconsIcon icon={Add01Icon} strokeWidth={2} className="size-5 text-primary" />
          <h3 className="text-lg font-bold text-foreground">Шинэ шинжилгээ нэмэх</h3>
        </div>
        <span className="rounded-full bg-surface-container-high px-3 py-1 text-[10px] font-bold uppercase text-muted-foreground">
          Нийт {activeTestTypes.length} төрөл
          {selected.length > 0 && <> &middot; {selected.length} сонгосон</>}
        </span>
      </div>

      {activeTestTypes.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">
          Идэвхтэй шинжилгээний төрөл бүртгэгдээгүй байна. Шинжилгээний удирдлага хэсгээс нэмнэ үү.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {activeTestTypes.map((testType) => {
            const isChecked = selected.includes(testType.name)
            const alreadyExists = existingTestNames?.has(testType.name) ?? false
            return (
              <label
                key={testType.id}
                className={`group relative flex cursor-pointer items-center gap-4 rounded-2xl border p-4 shadow-sm transition-all ${
                  alreadyExists
                    ? "cursor-default border-transparent bg-card opacity-50"
                    : isChecked
                      ? "border-primary-container/50 bg-card"
                      : "border-transparent bg-card hover:border-primary-container/30"
                }`}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => !alreadyExists && toggle(testType.name)}
                  disabled={alreadyExists}
                  className="size-5"
                />
                <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                  {testType.name}
                </span>
                {alreadyExists && (
                  <span className="ml-auto text-[10px] font-bold uppercase text-muted-foreground/50">
                    Нэмсэн
                  </span>
                )}
              </label>
            )
          })}
        </div>
      )}

      {footer}
    </section>
  )
}
