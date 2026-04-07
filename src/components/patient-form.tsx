import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { GENDER_OPTIONS } from "@/lib/constants"
import { createPatient } from "@/server/patients"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  UserAccountIcon,
  Call02Icon,
  Mail01Icon,
  RegisterIcon,
} from "@hugeicons/core-free-icons"
import type { User } from "@/lib/db/schema"

interface PatientFormProps {
  user: User | null
  onSuccess?: () => void
}

export function PatientForm({ user, onSuccess }: PatientFormProps) {
  const [loading, setLoading] = useState(false)
  const [gender, setGender] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")

  function resetForm(form: HTMLFormElement) {
    form.reset()
    setGender("")
    setDateOfBirth("")
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      await createPatient({
        data: {
          lastName: formData.get("lastName") as string,
          firstName: formData.get("firstName") as string,
          age: Number(formData.get("age")),
          gender: gender as "male" | "female",
          dateOfBirth,
          phone: formData.get("phone") as string,
          email: (formData.get("email") as string) || undefined,
          createdBy: user?.id,
        },
      })
      toast.success("Өвчтөн амжилттай бүртгэгдлээ")
      resetForm(form)
      onSuccess?.()
    } catch {
      toast.error("Бүртгэхэд алдаа гарлаа")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Patient info section */}
      <section className="space-y-8 rounded-3xl bg-surface-container-low p-8">
        <div className="flex items-center gap-3">
          <HugeiconsIcon
            icon={UserAccountIcon}
            strokeWidth={2}
            className="size-5 text-primary"
          />
          <h3 className="text-lg font-bold text-foreground">Үндсэн мэдээлэл</h3>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-4">
          {/* Last name */}
          <div className="space-y-2">
            <label className="ml-1 block text-[11px] font-bold uppercase text-muted-foreground/80">
              Овог
            </label>
            <Input
              name="lastName"
              placeholder="Овог оруулна уу"
              required
              className="h-11 rounded-xl border-outline-variant/30 bg-card px-4 text-sm"
            />
          </div>

          {/* First name */}
          <div className="space-y-2">
            <label className="ml-1 block text-[11px] font-bold uppercase text-muted-foreground/80">
              Нэр
            </label>
            <Input
              name="firstName"
              placeholder="Нэр оруулна уу"
              required
              className="h-11 rounded-xl border-outline-variant/30 bg-card px-4 text-sm"
            />
          </div>

          {/* Age */}
          <div className="space-y-2">
            <label className="ml-1 block text-[11px] font-bold uppercase text-muted-foreground/80">
              Нас
            </label>
            <Input
              name="age"
              type="number"
              min={0}
              max={150}
              placeholder="Нас"
              required
              className="h-11 rounded-xl border-outline-variant/30 bg-card px-4 text-sm"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label className="ml-1 block text-[11px] font-bold uppercase text-muted-foreground/80">
              Хүйс
            </label>
            <Select
              value={gender}
              onValueChange={(v) => v && setGender(v)}
              items={{ male: "Эрэгтэй", female: "Эмэгтэй" }}
              required
            >
              <SelectTrigger className="h-11 w-full rounded-xl border-outline-variant/30 bg-card px-4 text-sm">
                <SelectValue placeholder="Сонгох" />
              </SelectTrigger>
              <SelectContent>
                {GENDER_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input type="hidden" name="gender" value={gender} />
          </div>

          {/* Date of birth */}
          <div className="space-y-2">
            <label className="ml-1 block text-[11px] font-bold uppercase text-muted-foreground/80">
              Төрсөн огноо
            </label>
            <DatePicker
              value={dateOfBirth}
              onChange={setDateOfBirth}
              placeholder="Огноо сонгох"
              required
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="ml-1 block text-[11px] font-bold uppercase text-muted-foreground/80">
              Утасны дугаар
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40">
                <HugeiconsIcon icon={Call02Icon} strokeWidth={2} className="size-[18px]" />
              </span>
              <Input
                name="phone"
                type="tel"
                placeholder="0000 0000"
                required
                className="h-11 rounded-xl border-outline-variant/30 bg-card pl-11 pr-4 text-sm"
              />
            </div>
          </div>

          {/* Email */}
          <div className="col-span-1 space-y-2 md:col-span-2">
            <label className="ml-1 block text-[11px] font-bold uppercase text-muted-foreground/80">
              Имэйл
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40">
                <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} className="size-[18px]" />
              </span>
              <Input
                name="email"
                type="email"
                placeholder="example@clinic.mn"
                className="h-11 rounded-xl border-outline-variant/30 bg-card pl-11 pr-4 text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom actions */}
      <div className="flex justify-end gap-4 border-t border-surface-container-high pt-10">
        <Button
          type="button"
          variant="ghost"
          className="px-8 text-sm font-semibold"
          onClick={(e) => {
            const form = (e.target as HTMLElement).closest("form")
            if (form) resetForm(form)
          }}
        >
          Цэвэрлэх
        </Button>
        <Button
          type="submit"
          disabled={loading || !gender || !dateOfBirth}
          className="gap-3 bg-primary-container px-12 py-3.5 text-sm font-bold text-on-primary-container shadow-lg shadow-primary-container/20 transition-all hover:scale-[1.02] hover:bg-primary-container/90 active:scale-95"
        >
          <HugeiconsIcon icon={RegisterIcon} strokeWidth={2} className="size-[18px]" />
          <span>{loading ? "Бүртгэж байна..." : "Бүртгэх"}</span>
        </Button>
      </div>
    </form>
  )
}
