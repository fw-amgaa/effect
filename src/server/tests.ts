import { createServerFn } from "@tanstack/react-start"
import { db } from "@/lib/db"
import { patientTests } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
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

      const [test] = await db
        .update(patientTests)
        .set({
          fileUrl: response.data.ufsUrl,
          fileName: file.name,
          status: "complete",
          updatedAt: new Date(),
        })
        .where(eq(patientTests.id, testId))
        .returning()

      return { error: null, test }
    } catch (e) {
      return {
        error: e instanceof Error ? e.message : "Файл хуулахад алдаа гарлаа",
      }
    }
  })

export const updateTestFile = createServerFn({ method: "POST" })
  .inputValidator(
    (data: { testId: string; fileUrl: string; fileName: string }) => data,
  )
  .handler(async ({ data }) => {
    const [test] = await db
      .update(patientTests)
      .set({
        fileUrl: data.fileUrl,
        fileName: data.fileName,
        status: "complete",
        updatedAt: new Date(),
      })
      .where(eq(patientTests.id, data.testId))
      .returning()
    return test
  },
)

export const addTestToPatient = createServerFn({ method: "POST" })
  .inputValidator((data: { patientId: string; testType: string }) => data)
  .handler(async ({ data }) => {
    const [test] = await db
      .insert(patientTests)
      .values({
        patientId: data.patientId,
        testType: data.testType,
      })
      .returning()
    return test
  })

export const addTestsToPatient = createServerFn({ method: "POST" })
  .inputValidator((data: { patientId: string; testTypes: string[] }) => data)
  .handler(async ({ data }) => {
    if (data.testTypes.length === 0) return []
    const tests = await db
      .insert(patientTests)
      .values(
        data.testTypes.map((testType) => ({
          patientId: data.patientId,
          testType,
        })),
      )
      .returning()
    return tests
  })

export const deleteTest = createServerFn({ method: "POST" })
  .inputValidator((data: { testId: string }) => data)
  .handler(async ({ data }) => {
    await db.delete(patientTests).where(eq(patientTests.id, data.testId))
    return { success: true }
  },
)
