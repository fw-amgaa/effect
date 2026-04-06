import { createFileRoute, useRouter, Link } from "@tanstack/react-router"
import { useState } from "react"
import { getPatient, updatePatient } from "@/server/patients"
import { uploadTestFile, addTestToPatient, deleteTest } from "@/server/tests"
import { sendTestResultEmail } from "@/server/email"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { TEST_TYPES, GENDER_OPTIONS } from "@/lib/constants"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  PencilEdit01Icon,
  Delete02Icon,
  SentIcon,
  Upload04Icon,
  Add01Icon,
  UserIcon,
  File01Icon,
  Analytics01Icon,
} from "@hugeicons/core-free-icons"
import type { Patient, PatientTest } from "@/lib/db/schema"

export const Route = createFileRoute("/dashboard/patients/$patientId")({
  component: PatientDetailPage,
  loader: ({ params }) => getPatient({ data: { id: params.patientId } }),
  staleTime: 15_000,
})

function PatientDetailPage() {
  const data = Route.useLoaderData() as
    | (Patient & { tests: PatientTest[] })
    | null
  const router = useRouter()

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <p className="text-muted-foreground">Өвчтөн олдсонгүй</p>
        <Link to="/dashboard/patients">
          <Button variant="outline">Буцах</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1200px] space-y-8">
      {/* Patient info card */}
      <PatientInfoCard patient={data} onSaved={() => router.invalidate()} />

      {/* Test results section */}
      <TestsSection
        patient={data}
        tests={data.tests}
        onUpdated={() => router.invalidate()}
      />

      {/* Bottom action cards */}
      <AddTestCard patientId={data.id} onAdded={() => router.invalidate()} />
    </div>
  )
}

function PatientInfoCard({
  patient,
  onSaved,
}: {
  patient: Patient
  onSaved: () => void
}) {
  const [editOpen, setEditOpen] = useState(false)
  return (
    <section className="rounded-2xl border border-outline-variant/10 bg-card p-8 shadow-sm">
      {/* Top row: avatar + name + edit button */}
      <div className="mb-10 flex items-start justify-between">
        <div className="flex items-center gap-8">
          <div className="flex size-24 items-center justify-center rounded-2xl border border-outline-variant/10 bg-surface-container-low text-primary/80 shadow-inner">
            <HugeiconsIcon icon={UserIcon} strokeWidth={1.5} className="size-12" />
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              {patient.lastName} {patient.firstName}
            </h2>
            {patient.email && (
              <p className="text-sm text-muted-foreground">{patient.email}</p>
            )}
          </div>
        </div>

        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogTrigger
            render={
              <Button className="gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/10 transition-all hover:bg-primary/90">
                <HugeiconsIcon icon={PencilEdit01Icon} strokeWidth={2} className="size-[18px]" />
                Засах
              </Button>
            }
          />
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Мэдээлэл засах</DialogTitle>
            </DialogHeader>
            <PatientEditForm
              patient={patient}
              onSaved={() => {
                setEditOpen(false)
                onSaved()
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-3">
        <InfoField label="Нас / Хүйс" value={`${patient.age} нас, ${patient.gender === "male" ? "Эрэгтэй" : "Эмэгтэй"}`} />
        <InfoField label="Төрсөн огноо" value={patient.dateOfBirth} />
        <InfoField label="Бүртгүүлсэн огноо" value={new Date(patient.createdAt).toLocaleDateString("mn-MN")} />
        <InfoField label="Утасны дугаар" value={patient.phone} />
        <InfoField label="Цахим шуудан" value={patient.email || "—"} />
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50">
            Статус
          </span>
          <span className="inline-flex w-fit items-center rounded-full border border-green-100 bg-green-50 px-3 py-1 text-[11px] font-bold text-green-700">
            <span className="mr-2 size-1.5 rounded-full bg-green-500" />
            ИДЭВХТЭЙ
          </span>
        </div>
      </div>
    </section>
  )
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50">
        {label}
      </span>
      <span className="text-base font-semibold text-foreground/80">{value}</span>
    </div>
  )
}

function PatientEditForm({
  patient,
  onSaved,
}: {
  patient: Patient
  onSaved: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [gender, setGender] = useState(patient.gender)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    try {
      await updatePatient({
        data: {
          id: patient.id,
          firstName: fd.get("firstName") as string,
          lastName: fd.get("lastName") as string,
          age: Number(fd.get("age")),
          gender: gender as "male" | "female",
          dateOfBirth: fd.get("dateOfBirth") as string,
          phone: fd.get("phone") as string,
          email: (fd.get("email") as string) || undefined,
        },
      })
      toast.success("Мэдээлэл шинэчлэгдлээ")
      onSaved()
    } catch {
      toast.error("Алдаа гарлаа")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="lastName">Овог</FieldLabel>
            <Input id="lastName" name="lastName" defaultValue={patient.lastName} required className="rounded-xl" />
          </Field>
          <Field>
            <FieldLabel htmlFor="firstName">Нэр</FieldLabel>
            <Input id="firstName" name="firstName" defaultValue={patient.firstName} required className="rounded-xl" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="age">Нас</FieldLabel>
            <Input id="age" name="age" type="number" defaultValue={patient.age} required className="rounded-xl" />
          </Field>
          <Field>
            <FieldLabel>Хүйс</FieldLabel>
            <Select
              value={gender}
              onValueChange={(v) => v && setGender(v as "male" | "female")}
              items={{ male: "Эрэгтэй", female: "Эмэгтэй" }}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GENDER_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="dateOfBirth">Төрсөн огноо</FieldLabel>
          <Input id="dateOfBirth" name="dateOfBirth" type="date" defaultValue={patient.dateOfBirth} required className="rounded-xl" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="phone">Утас</FieldLabel>
            <Input id="phone" name="phone" defaultValue={patient.phone} required className="rounded-xl" />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Имэйл</FieldLabel>
            <Input id="email" name="email" type="email" defaultValue={patient.email || ""} className="rounded-xl" />
          </Field>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" className="rounded-xl" />}>
            Болих
          </DialogClose>
          <Button type="submit" disabled={loading} className="rounded-xl bg-primary text-white">
            {loading ? "Хадгалж байна..." : "Хадгалах"}
          </Button>
        </DialogFooter>
      </FieldGroup>
    </form>
  )
}

function TestsSection({
  patient,
  tests,
  onUpdated,
}: {
  patient: Patient
  tests: PatientTest[]
  onUpdated: () => void
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-xl font-bold text-foreground">
          <HugeiconsIcon icon={Analytics01Icon} strokeWidth={2} className="size-5 text-primary" />
          Шинжилгээний үр дүн
        </h3>
        <span className="text-sm font-semibold text-muted-foreground">
          Нийт {tests.length}
        </span>
      </div>

      <div className="ghost-border overflow-hidden rounded-xl bg-card shadow-sm">
        {tests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <HugeiconsIcon icon={File01Icon} strokeWidth={1.5} className="mb-2 size-10" />
            <p className="text-sm">Шинжилгээ бүртгэгдээгүй байна</p>
          </div>
        ) : (
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-outline-variant/10 bg-surface-container-low/50">
                <th className="w-12 px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
                  #
                </th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
                  Шинжилгээний нэр
                </th>
                <th className="px-6 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
                  Төлөв
                </th>
                <th className="px-6 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
                  Файл
                </th>
                <th className="px-6 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
                  Имэйл
                </th>
                <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
                  Үйлдэл
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {tests.map((test, idx) => (
                <TestRow
                  key={test.id}
                  index={idx + 1}
                  test={test}
                  patientEmail={patient.email}
                  onUpdated={onUpdated}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}

function TestRow({
  test,
  index,
  patientEmail,
  onUpdated,
}: {
  test: PatientTest
  index: number
  patientEmail: string | null
  onUpdated: () => void
}) {
  const [uploading, setUploading] = useState(false)
  const [sending, setSending] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("testId", test.id)
      const result = await uploadTestFile({ data: formData })
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Файл амжилттай хуулагдлаа")
        onUpdated()
      }
    } catch {
      toast.error("Файл хуулахад алдаа гарлаа")
    } finally {
      setUploading(false)
    }
  }

  async function handleSendEmail() {
    setSending(true)
    try {
      const result = await sendTestResultEmail({ data: { testId: test.id } })
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Имэйл амжилттай илгээгдлээ")
        onUpdated()
      }
    } catch {
      toast.error("Имэйл илгээхэд алдаа гарлаа")
    } finally {
      setSending(false)
    }
  }

  async function handleDelete() {
    setDeleting(true)
    try {
      await deleteTest({ data: { testId: test.id } })
      toast.success("Шинжилгээ устгагдлаа")
      onUpdated()
    } catch {
      toast.error("Алдаа гарлаа")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <tr className="group transition-colors hover:bg-surface-container-low">
      <td className="px-6 py-5 text-sm font-medium text-muted-foreground/50">
        {String(index).padStart(2, "0")}
      </td>
      <td className="px-6 py-5">
        <span className="text-sm font-bold text-foreground">{test.testType}</span>
      </td>
      <td className="px-6 py-5 text-center">
        {test.status === "complete" ? (
          <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">
            Дууссан
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-700">
            Хүлээгдэж буй
          </span>
        )}
      </td>
      <td className="px-6 py-5 text-center">
        {test.fileUrl ? (
          <a
            href={test.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1960a3] underline decoration-dotted transition-colors hover:text-primary"
          >
            <HugeiconsIcon icon={File01Icon} strokeWidth={2} className="size-5" />
            PDF
          </a>
        ) : (
          <span className="text-muted-foreground/30">
            <HugeiconsIcon icon={File01Icon} strokeWidth={1.5} className="mx-auto size-5" />
          </span>
        )}
      </td>
      <td className="px-6 py-5 text-center">
        {test.emailSent ? (
          <span className="inline-flex items-center rounded-full bg-[#E6F4EA] px-3 py-1 text-[10px] font-bold uppercase text-[#1E4620]">
            Илгээсэн
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full border border-outline-variant/10 bg-surface-container-low px-3 py-1 text-[10px] font-bold uppercase text-muted-foreground/50">
            Илгээгээгүй
          </span>
        )}
      </td>
      <td className="px-6 py-5">
        <div className="flex items-center justify-end gap-2">
          {/* Upload */}
          <label className="cursor-pointer">
            <span className="inline-flex size-8 items-center justify-center rounded-lg text-primary transition-colors hover:bg-surface-container-high">
              <HugeiconsIcon icon={Upload04Icon} strokeWidth={2} className="size-5" />
            </span>
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>

          {/* Send email */}
          {test.fileUrl && patientEmail ? (
            <button
              onClick={handleSendEmail}
              disabled={sending}
              className="inline-flex size-8 items-center justify-center rounded-lg text-primary transition-colors hover:bg-surface-container-high"
              title="Имэйл илгээх"
            >
              <HugeiconsIcon icon={SentIcon} strokeWidth={2} className="size-5" />
            </button>
          ) : (
            <span className="inline-flex size-8 items-center justify-center text-muted-foreground/20">
              <HugeiconsIcon icon={SentIcon} strokeWidth={2} className="size-5" />
            </span>
          )}

          {/* Delete */}
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <button
                  disabled={deleting}
                  className="inline-flex size-8 items-center justify-center rounded-lg text-destructive transition-colors hover:bg-destructive/5"
                  title="Устгах"
                >
                  <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} className="size-5" />
                </button>
              }
            />
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>Шинжилгээ устгах</AlertDialogTitle>
                <AlertDialogDescription>
                  "{test.testType}" шинжилгээг устгахдаа итгэлтэй байна уу?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Болих</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={handleDelete}>
                  Устгах
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </td>
    </tr>
  )
}

function AddTestCard({
  patientId,
  onAdded,
}: {
  patientId: string
  onAdded: () => void
}) {
  const [newTest, setNewTest] = useState("")
  const [adding, setAdding] = useState(false)

  async function handleAdd() {
    if (!newTest) return
    setAdding(true)
    try {
      await addTestToPatient({ data: { patientId, testType: newTest } })
      setNewTest("")
      toast.success("Шинжилгээ нэмэгдлээ")
      onAdded()
    } catch {
      toast.error("Алдаа гарлаа")
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="rounded-xl border border-primary-container/10 bg-surface-container-low p-6">
      <div className="flex items-center gap-5">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-card shadow-sm">
          <HugeiconsIcon icon={Add01Icon} strokeWidth={2} className="size-5 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-foreground">Шинэ шинжилгээ нэмэх</h4>
          <p className="text-xs text-muted-foreground">
            Шинжилгээний төрлийг сонгоно уу
          </p>
        </div>
        <Select
          value={newTest}
          onValueChange={(v) => v && setNewTest(v)}
          items={Object.fromEntries(TEST_TYPES.map((t) => [t, t]))}
        >
          <SelectTrigger className="w-64 rounded-xl border-outline-variant/15 bg-card text-sm">
            <SelectValue placeholder="Шинжилгээ сонгох..." />
          </SelectTrigger>
          <SelectContent>
            {TEST_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={handleAdd}
          disabled={!newTest || adding}
          className="rounded-xl bg-primary-container px-5 text-sm font-semibold text-white"
        >
          Нэмэх
        </Button>
      </div>
    </div>
  )
}
