import { createServerFn } from "@tanstack/react-start"
import { db } from "@/lib/db"
import { patients, patientTests, testFiles, testTypes } from "@/lib/db/schema"
import { eq, desc, ilike, or, and, sql, inArray } from "drizzle-orm"

export const getPatients = createServerFn({ method: "GET" })
  .inputValidator(
    (data: {
      page?: number
      pageSize?: number
      search?: string
      gender?: string
    }) => data,
  )
  .handler(async ({ data }) => {
    const page = data.page ?? 1
    const pageSize = data.pageSize ?? 10
    const offset = (page - 1) * pageSize

    const conditions = []

    if (data.search) {
      const q = `%${data.search}%`
      conditions.push(
        or(
          ilike(patients.firstName, q),
          ilike(patients.lastName, q),
          ilike(patients.phone, q),
          ilike(sql`coalesce(${patients.email}, '')`, q),
        ),
      )
    }

    if (data.gender && data.gender !== "all") {
      conditions.push(eq(patients.gender, data.gender as "male" | "female"))
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined

    const [result, countResult] = await Promise.all([
      db
        .select()
        .from(patients)
        .where(where)
        .orderBy(desc(patients.createdAt))
        .limit(pageSize)
        .offset(offset),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(patients)
        .where(where),
    ])

    const patientIds = result.map((p) => p.id)
    const tests =
      patientIds.length > 0
        ? await db
            .select({
              patientId: patientTests.patientId,
              orderNumber: patientTests.orderNumber,
            })
            .from(patientTests)
            .where(inArray(patientTests.patientId, patientIds))
            .orderBy(desc(patientTests.createdAt))
        : []

    const orderNumbersByPatient = new Map<string, number[]>()
    for (const t of tests) {
      const list = orderNumbersByPatient.get(t.patientId) ?? []
      list.push(t.orderNumber)
      orderNumbersByPatient.set(t.patientId, list)
    }

    const dataWithOrders = result.map((p) => ({
      ...p,
      orderNumbers: orderNumbersByPatient.get(p.id) ?? [],
    }))

    return {
      data: dataWithOrders,
      total: countResult[0]?.count ?? 0,
      page,
      pageSize,
    }
  })

export const getPatient = createServerFn({ method: "GET" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }) => {
    const [patient] = await db
      .select()
      .from(patients)
      .where(eq(patients.id, data.id))

    if (!patient) return null

    const tests = await db
      .select()
      .from(patientTests)
      .where(eq(patientTests.patientId, data.id))
      .orderBy(patientTests.createdAt)

    // Fetch files for all tests
    const testIds = tests.map((t) => t.id)
    const files =
      testIds.length > 0
        ? await db
            .select()
            .from(testFiles)
            .where(inArray(testFiles.testId, testIds))
        : []

    const testsWithFiles = tests.map((test) => ({
      ...test,
      files: files.filter((f) => f.testId === test.id),
    }))

    return { ...patient, tests: testsWithFiles }
  })

export const createPatient = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      firstName: string
      lastName: string
      age: number
      gender: "male" | "female"
      dateOfBirth: string
      phone: string
      email?: string
      testTypes?: string[]
      createdBy?: string
    }) => data,
  )
  .handler(async ({ data }) => {
    return db.transaction(async (tx) => {
      const [patient] = await tx
        .insert(patients)
        .values({
          firstName: data.firstName,
          lastName: data.lastName,
          age: data.age,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth,
          phone: data.phone,
          email: data.email || null,
          createdBy: data.createdBy || null,
        })
        .returning()

      if (data.testTypes && data.testTypes.length > 0) {
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
          await tx.insert(patientTests).values({
            patientId: patient!.id,
            testType,
            orderNumber,
          })
        }
      }

      return patient
    })
  })

export const updatePatient = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      id: string
      firstName: string
      lastName: string
      age: number
      gender: "male" | "female"
      dateOfBirth: string
      phone: string
      email?: string
    }) => data,
  )
  .handler(async ({ data }) => {
    const { id, ...values } = data
    const [patient] = await db
      .update(patients)
      .set({ ...values, email: values.email || null })
      .where(eq(patients.id, id))
      .returning()
    return patient
  })

export const getPatientCount = createServerFn({ method: "GET" }).handler(
  async () => {
    const [result] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(patients)
    return result?.count ?? 0
  },
)
