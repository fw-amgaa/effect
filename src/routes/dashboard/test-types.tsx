import { createFileRoute, useRouter } from "@tanstack/react-router"
import { useState } from "react"
import {
  getTestTypes,
  createTestType,
  updateTestType,
  toggleTestTypeStatus,
  deleteTestType,
} from "@/server/test-types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Add01Icon,
  PencilEdit01Icon,
  Delete02Icon,
  Analytics01Icon,
} from "@hugeicons/core-free-icons"
import type { TestType } from "@/lib/db/schema"

export const Route = createFileRoute("/dashboard/test-types")({
  component: TestTypesPage,
  loader: () => getTestTypes(),
  staleTime: 15_000,
  pendingComponent: TestTypesLoading,
  pendingMinMs: 200,
})

function TestTypesLoading() {
  return (
    <div className="mx-auto max-w-[900px] space-y-6">
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-5 w-80" />
        </div>
        <Skeleton className="h-10 w-44 rounded-xl" />
      </div>
      <div className="rounded-2xl bg-card">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-b border-outline-variant/5 px-6 py-5">
            <Skeleton className="h-5 w-64" />
            <Skeleton className="ml-auto h-6 w-20 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  )
}

function TestTypesPage() {
  const testTypes = Route.useLoaderData() as TestType[]
  const router = useRouter()
  const [createOpen, setCreateOpen] = useState(false)

  const activeCount = testTypes.filter((t) => t.isActive).length

  return (
    <div className="mx-auto max-w-[900px] space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            Шинжилгээний удирдлага
          </h2>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            Нийт {testTypes.length} шинжилгээний төрөл, {activeCount} идэвхтэй.
          </p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger
            render={
              <Button className="gap-2 rounded-xl bg-primary-container px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 active:scale-95">
                <HugeiconsIcon icon={Add01Icon} strokeWidth={2} className="size-[18px]" />
                Шинэ шинжилгээ нэмэх
              </Button>
            }
          />
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Шинэ шинжилгээний төрөл</DialogTitle>
            </DialogHeader>
            <CreateTestTypeForm
              onCreated={() => {
                setCreateOpen(false)
                router.invalidate()
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="ghost-border overflow-hidden rounded-2xl bg-card shadow-sm">
        {testTypes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <HugeiconsIcon icon={Analytics01Icon} strokeWidth={1.5} className="mb-2 size-10" />
            <p className="text-sm">Шинжилгээний төрөл бүртгэгдээгүй байна</p>
          </div>
        ) : (
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-outline-variant/10 bg-surface-container-low/50">
                <th className="w-12 px-6 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
                  #
                </th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
                  Шинжилгээний нэр
                </th>
                <th className="px-6 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
                  Төлөв
                </th>
                <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
                  Үйлдэл
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {testTypes.map((testType, idx) => (
                <TestTypeRow
                  key={testType.id}
                  testType={testType}
                  index={idx + 1}
                  onUpdated={() => router.invalidate()}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

function CreateTestTypeForm({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    try {
      await createTestType({ data: { name: name.trim() } })
      toast.success("Шинжилгээний төрөл нэмэгдлээ")
      onCreated()
    } catch {
      toast.error("Алдаа гарлаа")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="ml-1 block text-[11px] font-bold uppercase text-muted-foreground/80">
          Шинжилгээний нэр
        </label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Жишээ: Цусны ерөнхий шинжилгээ"
          required
          className="h-11 rounded-xl"
        />
      </div>
      <DialogFooter>
        <DialogClose render={<Button variant="outline" className="rounded-xl" />}>
          Болих
        </DialogClose>
        <Button type="submit" disabled={loading || !name.trim()} className="rounded-xl bg-primary text-white">
          {loading ? "Нэмж байна..." : "Нэмэх"}
        </Button>
      </DialogFooter>
    </form>
  )
}

function TestTypeRow({
  testType,
  index,
  onUpdated,
}: {
  testType: TestType
  index: number
  onUpdated: () => void
}) {
  const [editOpen, setEditOpen] = useState(false)
  const [toggling, setToggling] = useState(false)

  async function handleToggle() {
    setToggling(true)
    try {
      await toggleTestTypeStatus({
        data: { id: testType.id, isActive: !testType.isActive },
      })
      toast.success(
        testType.isActive ? "Идэвхгүй болголоо" : "Идэвхжүүллээ",
      )
      onUpdated()
    } catch {
      toast.error("Алдаа гарлаа")
    } finally {
      setToggling(false)
    }
  }

  async function handleDelete() {
    try {
      await deleteTestType({ data: { id: testType.id } })
      toast.success("Шинжилгээний төрөл устгагдлаа")
      onUpdated()
    } catch {
      toast.error("Алдаа гарлаа")
    }
  }

  return (
    <tr className="group transition-colors hover:bg-surface-container-low">
      <td className="px-6 py-5 text-center text-sm font-medium text-muted-foreground/50">
        {String(index).padStart(2, "0")}
      </td>
      <td className="px-6 py-5">
        <span className={`text-sm font-bold ${testType.isActive ? "text-foreground" : "text-muted-foreground/50"}`}>
          {testType.name}
        </span>
      </td>
      <td className="px-6 py-5 text-center">
        <button
          onClick={handleToggle}
          disabled={toggling}
          className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring/30 disabled:opacity-50"
          style={{
            backgroundColor: testType.isActive ? "#16a34a" : "#d1d5db",
          }}
        >
          <span
            className="inline-block size-4 transform rounded-full bg-white shadow-sm transition-transform"
            style={{
              transform: testType.isActive
                ? "translateX(22px)"
                : "translateX(4px)",
            }}
          />
        </button>
      </td>
      <td className="px-6 py-5">
        <div className="flex items-center justify-end gap-2">
          {/* Edit */}
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger
              render={
                <button
                  className="inline-flex size-8 items-center justify-center rounded-lg text-primary transition-colors hover:bg-surface-container-high"
                  title="Засах"
                >
                  <HugeiconsIcon icon={PencilEdit01Icon} strokeWidth={2} className="size-5" />
                </button>
              }
            />
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Шинжилгээний нэр засах</DialogTitle>
              </DialogHeader>
              <EditTestTypeForm
                testType={testType}
                onSaved={() => {
                  setEditOpen(false)
                  onUpdated()
                }}
              />
            </DialogContent>
          </Dialog>

          {/* Delete */}
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <button
                  className="inline-flex size-8 items-center justify-center rounded-lg text-destructive transition-colors hover:bg-destructive/5"
                  title="Устгах"
                >
                  <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} className="size-5" />
                </button>
              }
            />
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>Шинжилгээний төрөл устгах</AlertDialogTitle>
                <AlertDialogDescription>
                  "{testType.name}" шинжилгээний төрлийг устгахдаа итгэлтэй байна уу?
                  Аль хэдийн нэмэгдсэн шинжилгээнүүдэд нөлөөлөхгүй.
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

function EditTestTypeForm({
  testType,
  onSaved,
}: {
  testType: TestType
  onSaved: () => void
}) {
  const [name, setName] = useState(testType.name)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    try {
      await updateTestType({ data: { id: testType.id, name: name.trim() } })
      toast.success("Шинжилгээний нэр шинэчлэгдлээ")
      onSaved()
    } catch {
      toast.error("Алдаа гарлаа")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="ml-1 block text-[11px] font-bold uppercase text-muted-foreground/80">
          Шинжилгээний нэр
        </label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="h-11 rounded-xl"
        />
      </div>
      <DialogFooter>
        <DialogClose render={<Button variant="outline" className="rounded-xl" />}>
          Болих
        </DialogClose>
        <Button type="submit" disabled={loading || !name.trim()} className="rounded-xl bg-primary text-white">
          {loading ? "Хадгалж байна..." : "Хадгалах"}
        </Button>
      </DialogFooter>
    </form>
  )
}
