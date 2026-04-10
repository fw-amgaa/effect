export const ROLES = ["admin", "staff", "registrar"] as const
export type Role = (typeof ROLES)[number]

export const ROLE_LABELS: Record<Role, string> = {
  admin: "Админ",
  staff: "Ажилтан",
  registrar: "Бүртгэгч",
}

export const GENDER_OPTIONS = [
  { value: "male", label: "Эрэгтэй" },
  { value: "female", label: "Эмэгтэй" },
] as const
