export const TEST_TYPES = [
  "Харшлын шинжилгээ (AN40)",
  "Харшлын шинжилгээ (AA40)",
  "Цусны нийт IgE эсрэгбиеийн шинжилгээ",
  "Багц үйлчилгээ 1",
  "Багц үйлчилгээ 2",
  "Арьсны харшлын сорил (ОУСБ)",
  "Харшлын арьсны сорил (Ургамал, тоос, амьтан, мөөг)",
  "Арьсан дотор тарих сорил",
  "Уушигны багтаамж тодорхойлох (спирометрийн шинжилгээ)",
  "Гуурсан хоолойг тэлэх сорил (эмтэй сорил)",
  "Гуурсан хоолойг өдөөх сорил (метахолин бодистой)",
  "Амьсгалын замын үрэвсэл тодорхойлох шинжилгээ (FeNO)",
  "Астмын утлага эмчилгээ",
  "Хамрын шүүрэлд үрэвслийн эс тоолох",
  "Цусанд эозинофили тоолох",
] as const

export type TestType = (typeof TEST_TYPES)[number]

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
