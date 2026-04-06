import { Link, useLocation } from "@tanstack/react-router"
import { useRouter } from "@tanstack/react-router"
import { authClient } from "@/lib/auth-client"
import { ROLE_LABELS } from "@/lib/constants"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  UserSearch01Icon,
  UserSettings01Icon,
  Logout03Icon,
} from "@hugeicons/core-free-icons"
import type { User } from "@/lib/db/schema"
import type { Role } from "@/lib/constants"

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

export function AppSidebar({ user }: { user: User }) {
  const location = useLocation()
  const router = useRouter()

  const navItems = [
    {
      title: "Өвчтөнүүд",
      url: "/dashboard/patients",
      icon: UserSearch01Icon,
    },
    ...(user.role === "admin"
      ? [
          {
            title: "Хэрэглэгч удирдах",
            url: "/dashboard/roles",
            icon: UserSettings01Icon,
          },
        ]
      : []),
  ]

  async function handleLogout() {
    await authClient.signOut()
    router.navigate({ to: "/login" })
  }

  return (
    <aside className="fixed top-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-surface-container-high/10 bg-surface-container-low pb-8">
      {/* Logo */}
      <div className="px-6 py-8">
        <div className="mb-6">
          <img
            src="/logo.png"
            alt="Эффект Эмнэлэг"
            className="w-auto object-cover"
          />
        </div>

        {/* Navigation */}
        <nav className="space-y-4">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.url)
            return (
              <Link
                key={item.url}
                to={item.url}
                className={`mx-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary-container text-white shadow-sm"
                    : "text-[#1960a3] hover:bg-surface-container-high"
                }`}
              >
                <HugeiconsIcon
                  icon={item.icon}
                  strokeWidth={2}
                  className="size-5"
                />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="mt-auto border-t border-surface-container-high/20 px-6 py-6">
        <nav className="space-y-1">
          <button
            onClick={handleLogout}
            className="mx-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#1960a3] transition-all duration-200 hover:bg-surface-container-high"
          >
            <HugeiconsIcon
              icon={Logout03Icon}
              strokeWidth={2}
              className="size-5"
            />
            <span>Гарах</span>
          </button>
        </nav>
      </div>
    </aside>
  )
}
