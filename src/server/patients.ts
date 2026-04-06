import { createServerFn } from "@tanstack/react-start"
import { db } from "@/lib/db"
import { patients, patientTests } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"

export const getPatients = createServerFn({ method: "GET" }).handler(
  async () => {
    const result = await db
      .select()
      .from(patients)
      .orderBy(desc(patients.createdAt))
    return result
  },
)

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

    return { ...patient, tests }
  },
)

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
    const [patient] = await db
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
      await db.insert(patientTests).values(
        data.testTypes.map((testType) => ({
          patientId: patient!.id,
          testType,
        })),
      )
    }

    return patient
  },
)

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
  },
)
