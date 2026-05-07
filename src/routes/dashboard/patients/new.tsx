import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { PatientForm } from "@/components/patient-form"
import { getActiveTestTypes } from "@/server/test-types"
import type { TestType, User } from "@/lib/db/schema"

export const Route = createFileRoute("/dashboard/patients/new")({
  component: NewPatientPage,
  loader: () => getActiveTestTypes(),
  staleTime: 15_000,
})

function NewPatientPage() {
  const { user } = Route.useRouteContext() as { user: User }
  const activeTestTypes = Route.useLoaderData() as TestType[]
  const navigate = useNavigate()

  return (
    <div className="flex justify-center">
      <PatientForm
        user={user}
        activeTestTypes={activeTestTypes}
        onSuccess={() => navigate({ to: "/dashboard/patients" })}
      />
    </div>
  )
}
