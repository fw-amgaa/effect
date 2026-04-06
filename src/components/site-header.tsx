import { useLocation } from "@tanstack/react-router"
import type { User } from "@/lib/db/schema"

const BREADCRUMB_MAP: Record<string, string> = {
  "/dashboard/patients": "Өвчтөнүүд",
  "/dashboard/patients/new": "Шинэ өвчтөн",
  "/dashboard/roles": "Хэрэглэгч удирдах",
}

export function SiteHeader({ user }: { user: User }) {
  const location = useLocation()
  const pathname = location.pathname

  // Build breadcrumb
  let breadcrumbLabel = "Өвчтөнүүд"
  let isDetail = false

  if (BREADCRUMB_MAP[pathname]) {
    breadcrumbLabel = BREADCRUMB_MAP[pathname]
  } else if (pathname.startsWith("/dashboard/patients/")) {
    breadcrumbLabel = "Дэлгэрэнгүй"
    isDetail = true
  }

  return (
    <header className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-surface-container-high/15 bg-background/80 px-8 py-4 backdrop-blur-xl">
      <nav className="flex items-center gap-2 text-sm font-medium">
        {isDetail && (
          <>
            <span className="text-muted-foreground/50">Өвчтөнүүд</span>
            <span className="text-xs text-muted-foreground/30">/</span>
          </>
        )}
        {pathname.startsWith("/dashboard/roles") && (
          <>
            <span className="text-muted-foreground/50">Админ</span>
            <span className="text-xs text-muted-foreground/30">/</span>
          </>
        )}
        <span className="font-semibold text-primary">{breadcrumbLabel}</span>
      </nav>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-xs font-bold text-foreground">{user.name}</p>
          <p className="text-[10px] text-muted-foreground">{user.email}</p>
        </div>
        <div className="flex size-9 items-center justify-center rounded-full border-2 border-primary-container/20 bg-surface-container-low text-[10px] font-bold text-primary">
          {user.name
            .trim()
            .split(/\s+/)
            .map((p) => p[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>
      </div>
    </header>
  )
}
