import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Mail01Icon,
  LockIcon,
  ArrowRight01Icon,
  ShieldKeyIcon,
} from "@hugeicons/core-free-icons"

export const Route = createFileRoute("/login")({
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const result = await authClient.signIn.email({ email, password })
      if (result.error) {
        toast.error(result.error.message || "Нэвтрэхэд алдаа гарлаа")
      } else {
        navigate({ to: "/" })
      }
    } catch {
      toast.error("Нэвтрэхэд алдаа гарлаа")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="medical-grid flex min-h-svh flex-col items-center justify-center p-6 selection:bg-primary-container selection:text-on-primary-container">
      {/* Decorative blurs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-1/2 right-0 h-1/3 w-1/3 translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-1/4 w-1/4 -translate-x-1/4 translate-y-1/2 rounded-full bg-primary-container/5 blur-[100px]" />
      </div>

      <main className="z-10 w-full max-w-[440px]">
        <div className="flex flex-col items-center rounded-xl border border-outline-variant/15 bg-card p-8 shadow-sm md:p-10">
          {/* Logo */}
          <div className="mb-8">
            <img
              src="/logo.png"
              alt="Эффект Эмнэлэг"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
              Нэвтрэх
            </h1>
            <p className="text-sm font-medium text-muted-foreground/80">
              Клиникийн дотоод системд нэвтрэх
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="ml-1 text-[10px] font-bold tracking-widest text-muted-foreground/70 uppercase"
              >
                Имэйл хаяг
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground/50">
                  <HugeiconsIcon
                    icon={Mail01Icon}
                    strokeWidth={2}
                    className="size-5"
                  />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@effect.mn"
                  required
                  className="h-12 rounded-xl border-outline-variant/20 bg-surface-container-low pr-4 pl-11 text-sm transition-all focus:border-primary"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <label
                  htmlFor="password"
                  className="ml-0 text-[10px] font-bold tracking-widest text-muted-foreground/70 uppercase"
                >
                  Нууц үг
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-primary transition-colors hover:text-primary-container"
                >
                  Нууц үг мартсан?
                </Link>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground/50">
                  <HugeiconsIcon
                    icon={LockIcon}
                    strokeWidth={2}
                    className="size-5"
                  />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="h-12 rounded-xl border-outline-variant/20 bg-surface-container-low pr-4 pl-11 text-sm transition-all focus:border-primary"
                />
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center space-x-3 px-1">
              <Checkbox id="remember" className="size-4" />
              <label
                htmlFor="remember"
                className="text-sm font-medium text-muted-foreground select-none"
              >
                Намайг санах
              </label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="group h-12 w-full gap-2 rounded-xl bg-primary-container font-bold text-white shadow-sm transition-all hover:brightness-105 active:scale-[0.98]"
            >
              <span className="font-semibold tracking-wide">
                {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
              </span>
              {!loading && (
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  strokeWidth={2}
                  className="size-[18px] transition-transform group-hover:translate-x-1"
                />
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-10 w-full border-t border-outline-variant/10 pt-8 text-center">
            <p className="text-xs font-medium text-muted-foreground/50">
              © {new Date().getFullYear()} ЭФФЕКТ ЭМНЭЛЭГ.
            </p>
          </div>
        </div>

        {/* Subtle branding below card */}
        <div className="mt-8 flex items-center justify-center gap-2 opacity-40 select-none">
          <HugeiconsIcon
            icon={ShieldKeyIcon}
            strokeWidth={2}
            className="size-4 text-primary"
          />
          <span className="text-[10px] font-bold tracking-[0.2em] text-foreground uppercase">
            Secure Clinical Gateway
          </span>
        </div>
      </main>
    </div>
  )
}
