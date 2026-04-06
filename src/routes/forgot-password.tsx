import { createFileRoute, Link } from "@tanstack/react-router"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import { Mail01Icon, ArrowLeft01Icon, Tick02Icon } from "@hugeicons/core-free-icons"

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
})

function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string

    try {
      await authClient.requestPasswordReset({
        email,
        redirectTo: "/reset-password",
      })
      setSent(true)
    } catch {
      toast.error("Алдаа гарлаа. Дахин оролдоно уу.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="medical-grid flex min-h-svh flex-col items-center justify-center p-6">
      {/* Decorative */}
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

          {sent ? (
            /* Success state */
            <div className="w-full text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-50">
                <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} className="size-8 text-green-600" />
              </div>
              <h1 className="mb-2 text-xl font-bold text-foreground">
                Имэйл илгээгдлээ
              </h1>
              <p className="mb-8 text-sm text-muted-foreground">
                Нууц үг сэргээх холбоосыг таны имэйл хаяг руу илгээлээ. Имэйлээ шалгана уу.
              </p>
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="gap-2 text-sm font-semibold text-primary"
                >
                  <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} className="size-4" />
                  Нэвтрэх хуудас руу буцах
                </Button>
              </Link>
            </div>
          ) : (
            /* Form state */
            <>
              <div className="mb-8 text-center">
                <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
                  Нууц үг сэргээх
                </h1>
                <p className="text-sm font-medium text-muted-foreground/80">
                  Бүртгэлтэй имэйл хаягаа оруулна уу
                </p>
              </div>

              <form onSubmit={handleSubmit} className="w-full space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="ml-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70"
                  >
                    Имэйл хаяг
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground/50">
                      <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} className="size-5" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@effect.mn"
                      required
                      className="h-12 rounded-xl border-outline-variant/20 bg-surface-container-low pl-11 pr-4 text-sm"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-full rounded-xl bg-primary-container font-bold text-white shadow-sm hover:brightness-105"
                >
                  {loading ? "Илгээж байна..." : "Сэргээх холбоос илгээх"}
                </Button>

                <div className="text-center">
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      className="gap-2 text-sm font-semibold text-primary"
                    >
                      <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} className="size-4" />
                      Нэвтрэх хуудас руу буцах
                    </Button>
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
