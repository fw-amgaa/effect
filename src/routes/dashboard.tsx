import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
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

  return (
    <div className="flex min-h-screen">
      <AppSidebar user={user} />
      <main className="ml-64 flex flex-1 flex-col">
        <SiteHeader user={user} />
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
