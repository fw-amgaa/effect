import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { HugeiconsIcon } from "@hugeicons/react"
import { LockIcon, Tick02Icon } from "@hugeicons/core-free-icons"

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
})

function ResetPasswordPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      toast.error("Нууц үг таарахгүй байна")
      setLoading(false)
      return
    }

    if (password.length < 6) {
      toast.error("Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой")
      setLoading(false)
      return
    }

    try {
      await authClient.resetPassword({ newPassword: password })
      setSuccess(true)
      setTimeout(() => navigate({ to: "/login" }), 3000)
    } catch {
      toast.error("Алдаа гарлаа. Холбоосын хугацаа дууссан байж магадгүй.")
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
          <div className="mb-8">
            <img
              src="/logo.png"
              alt="Эффект Эмнэлэг"
              className="h-12 w-auto object-contain"
            />
          </div>

          {success ? (
            <div className="w-full text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-50">
                <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} className="size-8 text-green-600" />
              </div>
              <h1 className="mb-2 text-xl font-bold text-foreground">
                Нууц үг амжилттай солигдлоо
              </h1>
              <p className="text-sm text-muted-foreground">
                Нэвтрэх хуудас руу автоматаар шилжинэ...
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8 text-center">
                <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
                  Шинэ нууц үг
                </h1>
                <p className="text-sm font-medium text-muted-foreground/80">
                  Шинэ нууц үгээ оруулна уу
                </p>
              </div>

              <form onSubmit={handleSubmit} className="w-full space-y-6">
                <div className="space-y-2">
                  <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                    Шинэ нууц үг
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground/50">
                      <HugeiconsIcon icon={LockIcon} strokeWidth={2} className="size-5" />
                    </div>
                    <Input
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="h-12 rounded-xl border-outline-variant/20 bg-surface-container-low pl-11 pr-4 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                    Нууц үг давтах
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground/50">
                      <HugeiconsIcon icon={LockIcon} strokeWidth={2} className="size-5" />
                    </div>
                    <Input
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="h-12 rounded-xl border-outline-variant/20 bg-surface-container-low pl-11 pr-4 text-sm"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-full rounded-xl bg-primary-container font-bold text-white shadow-sm hover:brightness-105"
                >
                  {loading ? "Хадгалж байна..." : "Нууц үг хадгалах"}
                </Button>

                <div className="text-center">
                  <Link to="/login" className="text-sm font-semibold text-primary hover:underline">
                    Нэвтрэх хуудас руу буцах
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
