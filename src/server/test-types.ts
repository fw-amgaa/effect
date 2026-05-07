import { createServerFn } from "@tanstack/react-start"
import { db } from "@/lib/db"
import { testTypes } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"

export const getTestTypes = createServerFn({ method: "GET" }).handler(
  async () => {
    return db.select().from(testTypes).orderBy(desc(testTypes.createdAt))
  },
)

export const getActiveTestTypes = createServerFn({ method: "GET" }).handler(
  async () => {
    return db
      .select()
      .from(testTypes)
      .where(eq(testTypes.isActive, true))
      .orderBy(testTypes.name)
  },
)

export const createTestType = createServerFn({ method: "POST" })
  .inputValidator((data: { name: string }) => data)
  .handler(async ({ data }) => {
    const [testType] = await db
      .insert(testTypes)
      .values({ name: data.name })
      .returning()
    return testType
  })

export const updateTestType = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; name: string }) => data)
  .handler(async ({ data }) => {
    const [testType] = await db
      .update(testTypes)
      .set({ name: data.name, updatedAt: new Date() })
      .where(eq(testTypes.id, data.id))
      .returning()
    return testType
  })

export const toggleTestTypeStatus = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; isActive: boolean }) => data)
  .handler(async ({ data }) => {
    const [testType] = await db
      .update(testTypes)
      .set({ isActive: data.isActive, updatedAt: new Date() })
      .where(eq(testTypes.id, data.id))
      .returning()
    return testType
  })

export const deleteTestType = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    await db.delete(testTypes).where(eq(testTypes.id, data.id))
    return { success: true }
  })

export const updateTestTypeOrderNumber = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; currentOrderNumber: number }) => data)
  .handler(async ({ data }) => {
    const [testType] = await db
      .update(testTypes)
      .set({
        currentOrderNumber: data.currentOrderNumber,
        updatedAt: new Date(),
      })
      .where(eq(testTypes.id, data.id))
      .returning()
    return testType
  })
