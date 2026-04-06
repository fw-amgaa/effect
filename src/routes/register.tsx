import { createFileRoute, redirect, useRouter } from "@tanstack/react-router"
import { getSession } from "@/server/auth"
import { PatientForm } from "@/components/patient-form"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { HugeiconsIcon } from "@hugeicons/react"
import { Logout03Icon, UserIcon } from "@hugeicons/core-free-icons"
import type { User } from "@/lib/db/schema"

export const Route = createFileRoute("/register")({
  beforeLoad: async () => {
    const session = await getSession()
    if (!session) {
      throw redirect({ to: "/login" })
    }
    return { user: session }
  },
  component: RegisterPage,
})

function RegisterPage() {
  const { user } = Route.useRouteContext() as { user: User }
  const router = useRouter()

  async function handleLogout() {
    await authClient.signOut()
    router.navigate({ to: "/login" })
  }

  const today = new Date().toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })

  return (
    <div className="relative flex min-h-svh flex-col custom-scrollbar">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-40">
        <div className="absolute -top-1/2 right-0 h-[600px] w-[600px] translate-x-1/3 rounded-full bg-primary-container/30 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/4 translate-y-1/3 rounded-full bg-surface-container-high/40 blur-[100px]" />
      </div>

      {/* Glass header */}
      <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-surface-container-high/30 bg-background/80 px-10 py-3 backdrop-blur-xl">
        <img
          src="/logo.png"
          alt="Эффект Эмнэлэг"
          className="h-14 w-auto object-contain"
        />
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 rounded-full bg-surface-container-low px-5 py-2">
            <div className="flex size-9 items-center justify-center rounded-full bg-primary-container/20 text-primary">
              <HugeiconsIcon icon={UserIcon} strokeWidth={2} className="size-5" />
            </div>
            <span className="text-sm font-semibold text-muted-foreground">
              {user.name}
            </span>
          </div>
          <Button
            variant="ghost"
            className="gap-2 text-destructive hover:bg-destructive/5"
            onClick={handleLogout}
          >
            <span>Гарах</span>
            <HugeiconsIcon icon={Logout03Icon} strokeWidth={2} className="size-4" />
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 py-10">
        {/* Page title */}
        <div className="mb-10 flex items-end justify-between">
          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
              Өвчтөн бүртгэх
            </h2>
            <p className="text-sm font-medium text-muted-foreground/70">
              Шинэ өвчтөний мэдээлэл болон шинжилгээний төрлийг сонгоно уу.
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
              Өнөөдөр
            </span>
            <p className="text-lg font-bold text-primary">{today}</p>
          </div>
        </div>

        <PatientForm user={user} />
      </main>
    </div>
  )
}
