import { createFileRoute, redirect } from "@tanstack/react-router"
import { getSession } from "@/server/auth"

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const session = await getSession()
    if (!session) {
      throw redirect({ to: "/login" })
    }
    if (session.role === "registrar") {
      throw redirect({ to: "/register" })
    }
    throw redirect({ to: "/dashboard" })
  },
})
