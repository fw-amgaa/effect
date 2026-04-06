import { createServerFn } from "@tanstack/react-start"
import { getRequest } from "@tanstack/react-start/server"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { user } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import type { Role } from "@/lib/constants"

export const getUsers = createServerFn({ method: "GET" }).handler(
  async () => {
    const result = await db.select().from(user).orderBy(user.createdAt)
    return result
  },
)

export const createUser = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      email: string
      password: string
      fullName: string
      role: Role
    }) => data,
  )
  .handler(async ({ data }) => {
    const request = getRequest()
    try {
      const body = {
        email: data.email,
        password: data.password,
        name: data.fullName,
        role: data.role,
      }
      await auth.api.createUser({
        headers: request.headers,
        body: body as typeof body & { role: "admin" },
      })
      return { error: null }
    } catch (e) {
      return {
        error: e instanceof Error ? e.message : "Хэрэглэгч үүсгэхэд алдаа гарлаа",
      }
    }
  })

export const updateUserRole = createServerFn({ method: "POST" })
  .inputValidator((data: { userId: string; role: Role }) => data)
  .handler(async ({ data }) => {
    const [updated] = await db
      .update(user)
      .set({ role: data.role })
      .where(eq(user.id, data.userId))
      .returning()
    return updated
  })

export const deleteUser = createServerFn({ method: "POST" })
  .inputValidator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    const request = getRequest()
    try {
      await auth.api.removeUser({
        headers: request.headers,
        body: { userId: data.userId },
      })
      return { success: true }
    } catch {
      // Fallback: delete directly
      await db.delete(user).where(eq(user.id, data.userId))
      return { success: true }
    }
  })
