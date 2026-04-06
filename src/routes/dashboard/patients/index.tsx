import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useState, useEffect, useRef } from "react"
import { getPatients, getPatientCount } from "@/server/patients"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Search01Icon,
  Add01Icon,
  ArrowRight01Icon,
  ArrowLeft01Icon,
} from "@hugeicons/core-free-icons"
import type { Patient } from "@/lib/db/schema"

const PAGE_SIZE = 10

type SearchParams = {
  page?: number
  search?: string
  gender?: string
}

function getInitials(firstName: string, lastName: string) {
  return ((lastName?.[0] || "") + (firstName?.[0] || "")).toUpperCase()
}

export const Route = createFileRoute("/dashboard/patients/")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    page: Number(search.page) || 1,
    search: (search.search as string) || "",
    gender: (search.gender as string) || "all",
  }),
  loaderDeps: ({ search }) => ({
    page: search.page,
    search: search.search,
    gender: search.gender,
  }),
  loader: async ({ deps }) => {
    const [patients, totalCount] = await Promise.all([
      getPatients({
        data: {
          page: deps.page || 1,
          pageSize: PAGE_SIZE,
          search: deps.search || undefined,
          gender: deps.gender || undefined,
        },
      }),
      getPatientCount(),
    ])
    return { patients, totalCount }
  },
  staleTime: 30_000,
  component: PatientsPage,
  pendingComponent: PatientsLoading,
  pendingMinMs: 200,
})

function PatientsPage() {
  const { patients, totalCount } = Route.useLoaderData()
  const { page = 1, search = "", gender = "all" } = Route.useSearch()
  const navigate = useNavigate()

  // Debounced search
  const [searchInput, setSearchInput] = useState(search)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    setSearchInput(search)
  }, [search])

  function handleSearchChange(value: string) {
    setSearchInput(value)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      navigate({
        to: ".",
        search: (prev: SearchParams) => ({
          ...prev,
          search: value || undefined,
          page: 1,
        }),
        replace: true,
      })
    }, 300)
  }

  function setPage(newPage: number) {
    navigate({
      to: ".",
      search: (prev: SearchParams) => ({ ...prev, page: newPage }),
    })
  }

  function setGender(value: string) {
    navigate({
      to: ".",
      search: (prev: SearchParams) => ({
        ...prev,
        gender: value === "all" ? undefined : value,
        page: 1,
      }),
    })
  }

  const totalPages = Math.max(1, Math.ceil(patients.total / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const startIdx = (currentPage - 1) * PAGE_SIZE + 1
  const endIdx = Math.min(currentPage * PAGE_SIZE, patients.total)

  function getPageNumbers() {
    const pages: (number | "ellipsis")[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push("ellipsis")
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i)
      }
      if (currentPage < totalPages - 2) pages.push("ellipsis")
      pages.push(totalPages)
    }
    return pages
  }

  return (
    <div className="mx-auto max-w-[1200px] space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            Өвчтөнүүд
          </h2>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            Нийт {totalCount} өвчтөн бүртгэлтэй байна.
          </p>
        </div>
        <Link to="/dashboard/patients/new">
          <Button className="gap-2 rounded-xl bg-primary-container px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 active:scale-95">
            <HugeiconsIcon icon={Add01Icon} strokeWidth={2} className="size-[18px]" />
            Шинэ өвчтөн
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 flex flex-wrap items-end gap-4 rounded-2xl bg-surface-container-low p-6 lg:col-span-8">
          {/* Search */}
          <div className="min-w-[200px] flex-1">
            <label className="mb-2 ml-1 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
              Хайлт
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40">
                <HugeiconsIcon icon={Search01Icon} strokeWidth={2} className="size-[18px]" />
              </span>
              <Input
                placeholder="Өвчтөний нэр, утас хайх..."
                value={searchInput}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="h-10 rounded-xl border-outline-variant/15 bg-card pl-10 pr-4 text-sm"
              />
            </div>
          </div>
          {/* Gender filter */}
          <div className="min-w-[160px]">
            <label className="mb-2 ml-1 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
              Хүйс
            </label>
            <Select
              value={gender}
              onValueChange={(v) => {
                if (v) setGender(v)
              }}
              items={{ all: "Бүх хүйс", male: "Эрэгтэй", female: "Эмэгтэй" }}
            >
              <SelectTrigger className="h-10 w-full rounded-xl border-outline-variant/15 bg-card px-4 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Бүх хүйс</SelectItem>
                <SelectItem value="male">Эрэгтэй</SelectItem>
                <SelectItem value="female">Эмэгтэй</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats card */}
        <div className="col-span-12 flex flex-col justify-between overflow-hidden rounded-2xl bg-primary p-6 text-white shadow-xl lg:col-span-4">
          <div>
            <h3 className="mb-1 text-sm font-medium text-white/80">
              Нийт бүртгэлтэй өвчтөн
            </h3>
            <p className="text-4xl font-black tracking-tighter">
              {totalCount.toLocaleString()}
            </p>
          </div>
          <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
        </div>
      </div>

      {/* Table */}
      <div className="ghost-border overflow-hidden rounded-2xl bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-outline-variant/10 bg-surface-container-low/50">
                <th className="w-12 px-6 py-5 text-center text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
                  #
                </th>
                <th className="min-w-[200px] px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
                  Овог нэр
                </th>
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
                  Нас
                </th>
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
                  Хүйс
                </th>
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
                  Утас
                </th>
                <th className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
                  Бүртгүүлсэн
                </th>
                <th className="px-6 py-5 text-right text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">
                  Үйлдэл
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {patients.data.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-16 text-center text-sm text-muted-foreground"
                  >
                    Өвчтөн олдсонгүй
                  </td>
                </tr>
              ) : (
                patients.data.map((patient: Patient, idx: number) => (
                  <tr
                    key={patient.id}
                    className="group cursor-pointer transition-colors hover:bg-surface-container-low"
                  >
                    <td className="px-6 py-5 text-center text-xs font-medium text-muted-foreground/50">
                      {String(startIdx + idx).padStart(2, "0")}
                    </td>
                    <td className="px-6 py-5">
                      <Link
                        to="/dashboard/patients/$patientId"
                        params={{ patientId: patient.id }}
                        className="flex items-center gap-3"
                      >
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-container text-[10px] font-bold text-primary">
                          {getInitials(patient.firstName, patient.lastName)}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">
                            {patient.lastName} {patient.firstName}
                          </p>
                          {patient.email && (
                            <p className="text-[10px] text-muted-foreground/50">
                              {patient.email}
                            </p>
                          )}
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-5 text-sm font-medium text-muted-foreground">
                      {patient.age}
                    </td>
                    <td className="px-6 py-5 text-sm font-medium text-muted-foreground">
                      {patient.gender === "male" ? "Эрэгтэй" : "Эмэгтэй"}
                    </td>
                    <td className="px-6 py-5 text-sm text-muted-foreground">
                      {patient.phone}
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-xs font-medium text-muted-foreground">
                        {new Date(patient.createdAt).toLocaleDateString("mn-MN")}
                      </p>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Link
                        to="/dashboard/patients/$patientId"
                        params={{ patientId: patient.id }}
                      >
                        <button className="p-2 text-muted-foreground/40 transition-colors hover:text-primary">
                          <HugeiconsIcon
                            icon={ArrowRight01Icon}
                            strokeWidth={2}
                            className="size-5"
                          />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {patients.total > 0 && (
          <div className="flex items-center justify-between border-t border-outline-variant/10 bg-surface-container-low/30 px-6 py-5">
            <span className="text-xs font-medium text-muted-foreground">
              Нийт {patients.total} өвчтөнөөс {startIdx}-{endIdx}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground/50 transition-all hover:bg-card hover:shadow-sm disabled:opacity-30"
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} className="size-[18px]" />
              </button>
              {getPageNumbers().map((p, i) =>
                p === "ellipsis" ? (
                  <span key={`e-${i}`} className="px-2 text-muted-foreground/40">
                    ...
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`flex size-8 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                      p === currentPage
                        ? "bg-primary text-white shadow-sm"
                        : "text-muted-foreground hover:bg-card hover:shadow-sm"
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}
              <button
                onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground/50 transition-all hover:bg-card hover:shadow-sm disabled:opacity-30"
              >
                <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} className="size-[18px]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function PatientsLoading() {
  return (
    <div className="mx-auto max-w-[1200px] space-y-6">
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-5 w-64" />
        </div>
        <Skeleton className="h-10 w-36 rounded-xl" />
      </div>
      <div className="grid grid-cols-12 gap-6">
        <Skeleton className="col-span-12 h-28 rounded-2xl lg:col-span-8" />
        <Skeleton className="col-span-12 h-28 rounded-2xl lg:col-span-4" />
      </div>
      <div className="space-y-0 rounded-2xl bg-card">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-b border-outline-variant/5 px-6 py-5">
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="ml-auto h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    </div>
  )
}
