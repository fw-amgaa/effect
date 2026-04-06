import { createFileRoute, redirect } from "@tanstack/react-router"
import { useState } from "react"
import { getUsers, createUser, updateUserRole, deleteUser } from "@/server/users"
import { getSession } from "@/server/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { ROLES, ROLE_LABELS } from "@/lib/constants"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Add01Icon,
  Delete02Icon,
  UserAdd01Icon,
  Search01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import type { User } from "@/lib/db/schema"
import type { Role } from "@/lib/constants"

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

export const Route = createFileRoute("/dashboard/roles")({
  beforeLoad: async () => {
    const session = await getSession()
    if (!session || session.role !== "admin") {
      throw redirect({ to: "/dashboard/patients" })
    }
  },
  loader: () => getUsers(),
  component: RolesPage,
})

function RolesPage() {
  const users = Route.useLoaderData() as User[]
  const [createOpen, setCreateOpen] = useState(false)
  const [search, setSearch] = useState("")

  const filtered = users.filter(
    (u) =>
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="mx-auto max-w-[1440px] space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="mb-2 text-3xl font-extrabold tracking-tight text-foreground">
            Хэрэглэгчийн жагсаалт
          </h2>
          <p className="font-medium text-muted-foreground">
            Нийт {users.length} хэрэглэгч системд бүртгэлтэй байна.
          </p>
        </div>
        <div className="flex gap-3">
          {/* Search */}
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40">
              <HugeiconsIcon icon={Search01Icon} strokeWidth={2} className="size-[18px]" />
            </span>
            <Input
              placeholder="Хэрэглэгч хайх..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 rounded-xl border-none bg-card pl-10 pr-4 shadow-sm"
            />
          </div>

          {/* Add user button */}
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger
              render={
                <Button className="gap-2 rounded-xl bg-primary-container px-5 py-2.5 text-sm font-semibold text-on-primary-container shadow-sm transition-all hover:shadow-md active:scale-95">
                  <HugeiconsIcon icon={Add01Icon} strokeWidth={2} className="size-5" />
                  Хэрэглэгч нэмэх
                </Button>
              }
            />
            <DialogContent className="overflow-hidden sm:max-w-lg">
              {/* Modal header with gradient */}
              <div className="-m-6 mb-0 bg-gradient-to-br from-surface-container-low to-white px-8 pb-6 pt-8">
                <div className="mb-4 inline-flex rounded-2xl bg-primary-container/20 p-3">
                  <HugeiconsIcon icon={UserAdd01Icon} strokeWidth={2} className="size-5 text-primary" />
                </div>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-extrabold">
                    Шинэ хэрэглэгч нэмэх
                  </DialogTitle>
                </DialogHeader>
                <p className="mt-1 text-sm text-muted-foreground">
                  Системд нэвтрэх эрхтэй шинэ ажилтан бүртгэх.
                </p>
              </div>
              <CreateUserForm
                onCreated={() => {
                  setCreateOpen(false)
                  window.location.reload()
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Table */}
      <div className="ghost-border overflow-hidden rounded-3xl bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-outline-variant/10 bg-surface-container-low/50">
                <th className="px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50">
                  #
                </th>
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50">
                  Нэр
                </th>
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50">
                  Имэйл
                </th>
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50">
                  Эрх
                </th>
                <th className="px-8 py-5 text-right text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50">
                  Үйлдэл
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {filtered.map((user, idx) => (
                <UserRow key={user.id} user={user} index={idx + 1} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="flex items-center justify-between border-t border-outline-variant/10 bg-surface-container-low/20 px-8 py-6">
          <span className="text-sm font-medium text-muted-foreground">
            1-ээс {filtered.length}-р хэрэглэгч харагдаж байна (нийт{" "}
            {users.length})
          </span>
          <div className="flex gap-2">
            <button className="flex size-8 items-center justify-center rounded-lg border border-outline-variant/20 text-muted-foreground/50 transition-colors hover:bg-card">
              <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} className="size-[18px]" />
            </button>
            <button className="flex size-8 items-center justify-center rounded-lg bg-primary-container text-xs font-bold text-on-primary-container">
              1
            </button>
            <button className="flex size-8 items-center justify-center rounded-lg border border-outline-variant/20 text-muted-foreground/50 transition-colors hover:bg-card">
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function CreateUserForm({ onCreated }: { onCreated: () => void }) {
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState<string>("staff")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    try {
      const result = await createUser({
        data: {
          email: fd.get("email") as string,
          password: fd.get("password") as string,
          fullName: fd.get("fullName") as string,
          role: role as Role,
        },
      })
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success("Хэрэглэгч амжилттай үүсгэлээ")
        onCreated()
      }
    } catch {
      toast.error("Алдаа гарлаа")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 pt-2">
      <div className="space-y-1.5">
        <label className="px-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50">
          Нэр
        </label>
        <Input
          name="fullName"
          placeholder="Овог нэр оруулна уу"
          required
          className="rounded-xl border-outline-variant/20 bg-surface-container-low py-3 text-sm"
        />
      </div>
      <div className="space-y-1.5">
        <label className="px-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50">
          Имэйл
        </label>
        <Input
          name="email"
          type="email"
          placeholder="example@effect.mn"
          required
          className="rounded-xl border-outline-variant/20 bg-surface-container-low py-3 text-sm"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="px-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50">
            Нууц үг
          </label>
          <Input
            name="password"
            type="password"
            placeholder="••••••••"
            minLength={6}
            required
            className="rounded-xl border-outline-variant/20 bg-surface-container-low py-3 text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <label className="px-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50">
            Эрх
          </label>
          <Select
            value={role}
            onValueChange={(v) => v && setRole(v)}
            items={ROLE_LABELS}
          >
            <SelectTrigger className="rounded-xl border-outline-variant/20 bg-surface-container-low py-3 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ROLES.map((r) => (
                <SelectItem key={r} value={r}>
                  {ROLE_LABELS[r]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-4 pt-4">
        <DialogClose
          render={
            <Button
              variant="ghost"
              className="flex-1 rounded-xl bg-surface-container-low text-sm font-bold text-muted-foreground hover:bg-surface-container"
            />
          }
        >
          Цуцлах
        </DialogClose>
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-xl bg-primary text-sm font-bold text-white shadow-sm"
        >
          {loading ? "Нэмж байна..." : "Нэмэх"}
        </Button>
      </div>
    </form>
  )
}

function UserRow({ user, index }: { user: User; index: number }) {
  const [role, setRole] = useState(user.role)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleRoleChange(newRole: string) {
    setRole(newRole)
    setSaving(true)
    try {
      await updateUserRole({
        data: { userId: user.id, role: newRole as Role },
      })
      toast.success("Эрх шинэчлэгдлээ")
    } catch {
      toast.error("Алдаа гарлаа")
      setRole(user.role)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    setDeleting(true)
    try {
      await deleteUser({ data: { userId: user.id } })
      toast.success("Хэрэглэгч устгагдлаа")
      window.location.reload()
    } catch {
      toast.error("Алдаа гарлаа")
    } finally {
      setDeleting(false)
    }
  }

  const initials = getInitials(user.name)

  return (
    <tr className="group transition-colors hover:bg-surface-container-low/30">
      <td className="px-8 py-4 text-sm font-bold text-muted-foreground/50">
        {String(index).padStart(2, "0")}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-primary-container/20 text-xs font-bold text-primary">
            {initials}
          </div>
          <span className="font-semibold text-foreground">{user.name}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
      <td className="px-6 py-4">
        <select
          value={role ?? "staff"}
          onChange={(e) => handleRoleChange(e.target.value)}
          disabled={saving}
          className="cursor-pointer rounded-full border-none bg-surface-container-high/50 px-4 py-1.5 text-xs font-bold text-foreground/80 focus:ring-2 focus:ring-primary"
        >
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {ROLE_LABELS[r]}
            </option>
          ))}
        </select>
      </td>
      <td className="px-8 py-4 text-right">
        <AlertDialog>
          <AlertDialogTrigger
            render={
              <button
                disabled={deleting}
                className="rounded-lg p-2 text-muted-foreground/40 opacity-0 transition-all hover:bg-destructive/5 hover:text-destructive group-hover:opacity-100"
              >
                <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} className="size-5" />
              </button>
            }
          />
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Хэрэглэгч устгах</AlertDialogTitle>
              <AlertDialogDescription>
                "{user.name}" хэрэглэгчийг устгахдаа итгэлтэй байна уу?
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
      </td>
    </tr>
  )
}
