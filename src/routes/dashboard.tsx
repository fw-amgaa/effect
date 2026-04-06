import { createFileRoute, Outlet, redirect, useRouterState } from "@tanstack/react-router"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { getSession } from "@/server/auth"
import type { User } from "@/lib/db/schema"

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    const session = await getSession()
    if (!session) {
      throw redirect({ to: "/login" })
    }
    if (session.role === "registrar") {
      throw redirect({ to: "/register" })
    }
    return { user: session }
  },
  component: DashboardLayout,
})

function DashboardLayout() {
  const { user } = Route.useRouteContext() as { user: User }
  const isLoading = useRouterState({ select: (s) => s.isLoading })

  return (
    <div className="flex min-h-screen">
      <AppSidebar user={user} />
      <main className="ml-64 flex flex-1 flex-col">
        <SiteHeader user={user} />
        {/* Route transition bar */}
        {isLoading && (
          <div className="h-0.5 w-full overflow-hidden bg-primary/10">
            <div className="h-full w-1/3 animate-[shimmer_1s_ease-in-out_infinite] bg-primary" />
          </div>
        )}
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
