import { createServerFn } from "@tanstack/react-start"
import { db } from "@/lib/db"
import { patientTests, testFiles, testTypes } from "@/lib/db/schema"
import { and, eq, sql } from "drizzle-orm"
import { UTApi } from "uploadthing/server"

const utapi = new UTApi()

export const uploadTestFile = createServerFn({ method: "POST" })
  .inputValidator((data: FormData) => data)
  .handler(async ({ data: formData }) => {
    const file = formData.get("file") as File
    const testId = formData.get("testId") as string

    if (!file || !testId) {
      return { error: "Файл эсвэл шинжилгээний ID олдсонгүй" }
    }

    try {
      const response = await utapi.uploadFiles(file)
      if (response.error) {
        return { error: response.error.message }
      }

      // Insert into testFiles table
      await db.insert(testFiles).values({
        testId,
        fileUrl: response.data.ufsUrl,
        fileName: file.name,
      })

      // Also update legacy columns and mark complete
      await db
        .update(patientTests)
        .set({
          fileUrl: response.data.ufsUrl,
          fileName: file.name,
          status: "complete",
          updatedAt: new Date(),
        })
        .where(eq(patientTests.id, testId))

      return { error: null }
    } catch (e) {
      return {
        error: e instanceof Error ? e.message : "Файл хуулахад алдаа гарлаа",
      }
    }
  })

export const deleteTestFile = createServerFn({ method: "POST" })
  .inputValidator((data: { fileId: string; testId: string }) => data)
  .handler(async ({ data }) => {
    await db.delete(testFiles).where(eq(testFiles.id, data.fileId))

    // Check if any files remain for this test
    const remaining = await db
      .select()
      .from(testFiles)
      .where(eq(testFiles.testId, data.testId))

    if (remaining.length === 0) {
      await db
        .update(patientTests)
        .set({
          fileUrl: null,
          fileName: null,
          status: "pending",
          updatedAt: new Date(),
        })
        .where(eq(patientTests.id, data.testId))
    }

    return { success: true }
  })

export const addTestToPatient = createServerFn({ method: "POST" })
  .inputValidator((data: { patientId: string; testType: string }) => data)
  .handler(async ({ data }) => {
    return db.transaction(async (tx) => {
      const [tt] = await tx
        .update(testTypes)
        .set({
          currentOrderNumber: sql`${testTypes.currentOrderNumber} + 1`,
          updatedAt: new Date(),
        })
        .where(eq(testTypes.name, data.testType))
        .returning({ currentOrderNumber: testTypes.currentOrderNumber })
      const orderNumber = tt?.currentOrderNumber ?? 1
      const [test] = await tx
        .insert(patientTests)
        .values({
          patientId: data.patientId,
          testType: data.testType,
          orderNumber,
        })
        .returning()
      return test
    })
  })

export const addTestsToPatient = createServerFn({ method: "POST" })
  .inputValidator((data: { patientId: string; testTypes: string[] }) => data)
  .handler(async ({ data }) => {
    if (data.testTypes.length === 0) return []
    return db.transaction(async (tx) => {
      const created = []
      for (const testType of data.testTypes) {
        const [tt] = await tx
          .update(testTypes)
          .set({
            currentOrderNumber: sql`${testTypes.currentOrderNumber} + 1`,
            updatedAt: new Date(),
          })
          .where(eq(testTypes.name, testType))
          .returning({ currentOrderNumber: testTypes.currentOrderNumber })
        const orderNumber = tt?.currentOrderNumber ?? 1
        const [test] = await tx
          .insert(patientTests)
          .values({
            patientId: data.patientId,
            testType,
            orderNumber,
          })
          .returning()
        created.push(test)
      }
      return created
    })
  })

export const deleteTest = createServerFn({ method: "POST" })
  .inputValidator((data: { testId: string }) => data)
  .handler(async ({ data }) => {
    return db.transaction(async (tx) => {
      const [test] = await tx
        .select()
        .from(patientTests)
        .where(eq(patientTests.id, data.testId))
      if (!test) return { success: false }

      await tx.delete(patientTests).where(eq(patientTests.id, data.testId))

      // Roll back the test_type counter only if the deleted row was the latest issued.
      await tx
        .update(testTypes)
        .set({
          currentOrderNumber: sql`${testTypes.currentOrderNumber} - 1`,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(testTypes.name, test.testType),
            eq(testTypes.currentOrderNumber, test.orderNumber),
          ),
        )

      return { success: true }
    })
  })

export const updateTestOrderNumber = createServerFn({ method: "POST" })
  .inputValidator((data: { testId: string; orderNumber: number }) => data)
  .handler(async ({ data }) => {
    return db.transaction(async (tx) => {
      const [test] = await tx
        .update(patientTests)
        .set({ orderNumber: data.orderNumber, updatedAt: new Date() })
        .where(eq(patientTests.id, data.testId))
        .returning()

      if (test) {
        // Sync the test_type counter so the next added test increments from here.
        await tx
          .update(testTypes)
          .set({
            currentOrderNumber: data.orderNumber,
            updatedAt: new Date(),
          })
          .where(eq(testTypes.name, test.testType))
      }

      return test
    })
  })
