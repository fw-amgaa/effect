import { createFileRoute, useRouter, Link } from "@tanstack/react-router"
import { useState } from "react"
import { getPatient, updatePatient } from "@/server/patients"
import { uploadTestFile, addTestsToPatient, deleteTest, deleteTestFile } from "@/server/tests"
import { sendBulkTestResultEmail } from "@/server/email"
import { getActiveTestTypes } from "@/server/test-types"
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
import { DatePicker } from "@/components/ui/date-picker"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
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
import { GENDER_OPTIONS } from "@/lib/constants"
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
  Loading03Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons"
import type { Patient, PatientTest, TestFile, TestType } from "@/lib/db/schema"

type PatientTestWithFiles = PatientTest & { files: TestFile[] }

function calculateAge(dob: string): number {
  const birth = new Date(dob)
  const now = new Date()
  const diffMs = now.getTime() - birth.getTime()
  const age = diffMs / (1000 * 60 * 60 * 24 * 365.25)
  return Math.round(age * 10) / 10
}

export const Route = createFileRoute("/dashboard/patients/$patientId")({
  component: PatientDetailPage,
  loader: async ({ params }) => {
    const [patient, activeTestTypes] = await Promise.all([
      getPatient({ data: { id: params.patientId } }),
      getActiveTestTypes(),
    ])
    return { patient, activeTestTypes }
  },
  staleTime: 15_000,
  pendingComponent: PatientDetailLoading,
  pendingMinMs: 200,
})

function PatientDetailLoading() {
  return (
    <div className="mx-auto max-w-[1200px] space-y-8">
      <div className="rounded-2xl border border-outline-variant/10 bg-card p-8">
        <div className="mb-10 flex items-start gap-8">
          <Skeleton className="size-24 rounded-2xl" />
          <div className="space-y-3">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-12 gap-y-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-32" />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-7 w-48" />
        <div className="rounded-xl bg-card">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 border-b border-outline-variant/5 px-6 py-5">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="ml-auto h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PatientDetailPage() {
  const { patient: data, activeTestTypes } = Route.useLoaderData() as {
    patient: (Patient & { tests: PatientTestWithFiles[] }) | null
    activeTestTypes: TestType[]
  }
  const router = useRouter()

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <p className="text-muted-foreground">Үйлчлүүлэгч олдсонгүй</p>
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
      <AddTestCard
        patientId={data.id}
        existingTests={data.tests}
        activeTestTypes={activeTestTypes}
        onAdded={() => router.invalidate()}
      />
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
  const [dateOfBirth, setDateOfBirth] = useState(patient.dateOfBirth)
  const [age, setAge] = useState(String(patient.age))

  function handleDateOfBirthChange(value: string) {
    setDateOfBirth(value)
    if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const calculated = calculateAge(value)
      if (calculated >= 0 && calculated <= 150) {
        setAge(String(calculated))
      }
    }
  }

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
          age: Number(age),
          gender: gender as "male" | "female",
          dateOfBirth,
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
            <FieldLabel>Төрсөн огноо</FieldLabel>
            <DatePicker
              value={dateOfBirth}
              onChange={handleDateOfBirthChange}
              placeholder="2000-01-15"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="age">Нас</FieldLabel>
            <Input id="age" value={age} readOnly tabIndex={-1} className="rounded-xl bg-card/50 text-muted-foreground" />
          </Field>
        </div>
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
  tests: PatientTestWithFiles[]
  onUpdated: () => void
}) {
  const [selectedTestIds, setSelectedTestIds] = useState<Set<string>>(new Set())
  const [sending, setSending] = useState(false)

  // Only tests with files can be emailed
  const emailableTests = tests.filter((t) => t.files.length > 0)
  const allEmailableSelected =
    emailableTests.length > 0 &&
    emailableTests.every((t) => selectedTestIds.has(t.id))

  function toggleTest(id: string) {
    setSelectedTestIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleAll() {
    if (allEmailableSelected) {
      setSelectedTestIds(new Set())
    } else {
      setSelectedTestIds(new Set(emailableTests.map((t) => t.id)))
    }
  }

  async function handleBulkEmail() {
    if (selectedTestIds.size === 0) return
    setSending(true)
    try {
      const result = await sendBulkTestResultEmail({
        data: {
          testIds: Array.from(selectedTestIds),
          patientId: patient.id,
        },
      })
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(`${selectedTestIds.size} шинжилгээний хариу имэйлээр илгээгдлээ`)
        setSelectedTestIds(new Set())
        onUpdated()
      }
    } catch {
      toast.error("Имэйл илгээхэд алдаа гарлаа")
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-xl font-bold text-foreground">
          <HugeiconsIcon icon={Analytics01Icon} strokeWidth={2} className="size-5 text-primary" />
          Шинжилгээний үр дүн
        </h3>
        <div className="flex items-center gap-3">
          {selectedTestIds.size > 0 && patient.email && (
            <Button
              onClick={handleBulkEmail}
              disabled={sending}
              className="gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm"
            >
              {sending ? (
                <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-4 animate-spin" />
              ) : (
                <HugeiconsIcon icon={SentIcon} strokeWidth={2} className="size-4" />
              )}
              {sending
                ? "Илгээж байна..."
                : `${selectedTestIds.size} шинжилгээ имэйлээр илгээх`}
            </Button>
          )}
          {selectedTestIds.size > 0 && !patient.email && (
            <span className="text-xs font-medium text-amber-600">
              Имэйл хаяг бүртгэгдээгүй
            </span>
          )}
          <span className="text-sm font-semibold text-muted-foreground">
            Нийт {tests.length}
          </span>
        </div>
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
                <th className="w-10 px-4 py-4">
                  <Checkbox
                    checked={allEmailableSelected}
                    onCheckedChange={toggleAll}
                    className="size-4"
                  />
                </th>
                <th className="w-12 px-2 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
                  #
                </th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
                  Шинжилгээний нэр
                </th>
                <th className="px-6 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
                  Төлөв
                </th>
                <th className="px-6 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
                  Файлууд
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
                  selected={selectedTestIds.has(test.id)}
                  onToggleSelect={() => toggleTest(test.id)}
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
  selected,
  onToggleSelect,
  onUpdated,
}: {
  test: PatientTestWithFiles
  index: number
  selected: boolean
  onToggleSelect: () => void
  onUpdated: () => void
}) {
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const canSelect = test.files.length > 0

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files || files.length === 0) return
    setUploading(true)
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("testId", test.id)
        const result = await uploadTestFile({ data: formData })
        if (result.error) {
          toast.error(result.error)
          break
        }
      }
      toast.success("Файл амжилттай хуулагдлаа")
      onUpdated()
    } catch {
      toast.error("Файл хуулахад алдаа гарлаа")
    } finally {
      setUploading(false)
      // Reset input
      e.target.value = ""
    }
  }

  async function handleDeleteFile(fileId: string) {
    try {
      await deleteTestFile({ data: { fileId, testId: test.id } })
      toast.success("Файл устгагдлаа")
      onUpdated()
    } catch {
      toast.error("Алдаа гарлаа")
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
      <td className="px-4 py-5">
        <Checkbox
          checked={selected}
          onCheckedChange={onToggleSelect}
          disabled={!canSelect}
          className="size-4"
        />
      </td>
      <td className="px-2 py-5 text-sm font-medium text-muted-foreground/50">
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
      <td className="px-6 py-5">
        {test.files.length > 0 ? (
          <div className="flex flex-col gap-1.5">
            {test.files.map((file) => (
              <div key={file.id} className="flex items-center justify-center gap-2">
                <a
                  href={file.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1960a3] underline decoration-dotted transition-colors hover:text-primary"
                  title={file.fileName}
                >
                  <HugeiconsIcon icon={File01Icon} strokeWidth={2} className="size-4" />
                  <span className="max-w-[120px] truncate">{file.fileName}</span>
                </a>
                <button
                  onClick={() => handleDeleteFile(file.id)}
                  className="text-muted-foreground/30 hover:text-destructive transition-colors"
                  title="Файл устгах"
                >
                  <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="text-muted-foreground/30">
              <HugeiconsIcon icon={File01Icon} strokeWidth={1.5} className="size-5" />
            </span>
          </div>
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
          <label className={uploading ? "pointer-events-none" : "cursor-pointer"}>
            <span className="inline-flex size-8 items-center justify-center rounded-lg text-primary transition-colors hover:bg-surface-container-high">
              {uploading ? (
                <HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-5 animate-spin" />
              ) : (
                <HugeiconsIcon icon={Upload04Icon} strokeWidth={2} className="size-5" />
              )}
            </span>
            <input
              type="file"
              className="hidden"
              multiple
              accept=".pdf"
              onChange={handleFileUpload}
              disabled={uploading}
            />
          </label>

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
  existingTests,
  activeTestTypes,
  onAdded,
}: {
  patientId: string
  existingTests: PatientTestWithFiles[]
  activeTestTypes: TestType[]
  onAdded: () => void
}) {
  const [selectedTests, setSelectedTests] = useState<string[]>([])
  const [adding, setAdding] = useState(false)

  const existingTestTypeNames = new Set(existingTests.map((t) => t.testType))

  function toggleTest(testName: string) {
    setSelectedTests((prev) =>
      prev.includes(testName)
        ? prev.filter((t) => t !== testName)
        : [...prev, testName],
    )
  }

  async function handleAdd() {
    if (selectedTests.length === 0) return
    setAdding(true)
    try {
      await addTestsToPatient({ data: { patientId, testTypes: selectedTests } })
      setSelectedTests([])
      toast.success(`${selectedTests.length} шинжилгээ нэмэгдлээ`)
      onAdded()
    } catch {
      toast.error("Алдаа гарлаа")
    } finally {
      setAdding(false)
    }
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
          {selectedTests.length > 0 && (
            <> &middot; {selectedTests.length} сонгосон</>
          )}
        </span>
      </div>

      {activeTestTypes.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">
          Идэвхтэй шинжилгээний төрөл бүртгэгдээгүй байна. Шинжилгээний удирдлага хэсгээс нэмнэ үү.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {activeTestTypes.map((testType) => {
            const isChecked = selectedTests.includes(testType.name)
            const alreadyExists = existingTestTypeNames.has(testType.name)
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
                  onCheckedChange={() => !alreadyExists && toggleTest(testType.name)}
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

      {selectedTests.length > 0 && (
        <div className="flex justify-end gap-3 border-t border-outline-variant/10 pt-5">
          <Button
            variant="ghost"
            onClick={() => setSelectedTests([])}
            className="text-sm font-semibold"
          >
            Цуцлах
          </Button>
          <Button
            onClick={handleAdd}
            disabled={adding}
            className="gap-2 rounded-xl bg-primary-container px-6 text-sm font-semibold text-white"
          >
            <HugeiconsIcon icon={Add01Icon} strokeWidth={2} className="size-4" />
            {adding
              ? "Нэмж байна..."
              : `${selectedTests.length} шинжилгээ нэмэх`}
          </Button>
        </div>
      )}
    </section>
  )
}
