import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { PatientForm } from "@/components/patient-form"
import type { User } from "@/lib/db/schema"

export const Route = createFileRoute("/dashboard/patients/new")({
  component: NewPatientPage,
})

function NewPatientPage() {
  const { user } = Route.useRouteContext() as { user: User }
  const navigate = useNavigate()

  return (
    <div className="flex justify-center">
      <PatientForm
        user={user}
        onSuccess={() => navigate({ to: "/dashboard/patients" })}
      />
    </div>
  )
}
