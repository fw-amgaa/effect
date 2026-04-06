import { j as jsxRuntimeExports, r as reactExports } from "./_libs/react.mjs";
import { d as useRouter, L as Link } from "./_libs/tanstack__react-router.mjs";
import { i as Route, j as updatePatient, h as createSsrRpc } from "./_ssr/router-BR745k5G.mjs";
import { c as createServerFn } from "./_ssr/index.mjs";
import { B as Button, I as Input, c as cn } from "./_ssr/input-DpwQ1gn2.mjs";
import { c as cva } from "./_libs/class-variance-authority.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./_ssr/select-COsLrdLe.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, n as DialogFooter, e as DialogClose, A as AlertDialog, f as AlertDialogTrigger, g as AlertDialogContent, h as AlertDialogHeader, i as AlertDialogTitle, j as AlertDialogDescription, k as AlertDialogFooter, l as AlertDialogCancel, m as AlertDialogAction } from "./_ssr/alert-dialog-3K7AMxVe.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { T as TEST_TYPES, G as GENDER_OPTIONS } from "./_ssr/constants-CNvrnp7p.mjs";
import { a as TZr, c as R4, o as ot, d as zB, R, e as IIr, h as osr, M as Mg } from "./_libs/hugeicons__core-free-icons.mjs";
import { H as HugeiconsIcon } from "./_libs/hugeicons__react.mjs";
import "./_libs/@opentelemetry/semantic-conventions.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
import "node:async_hooks";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/base-ui__react.mjs";
import "./_libs/base-ui__utils.mjs";
import "./_libs/reselect.mjs";
import "./_libs/use-sync-external-store.mjs";
import "./_libs/floating-ui__utils.mjs";
import "./_libs/floating-ui__react-dom.mjs";
import "./_libs/floating-ui__dom.mjs";
import "./_libs/floating-ui__core.mjs";
import "./_libs/tabbable.mjs";
const uploadTestFile = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("eb503ad03f2c4381095c2435a887a3d49e407ae5feed68e43354ce18fe2c2810"));
createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("6ac3ac6c9787ffe066d9c178e47ed1ec3fae33c46726656722eeaec14d97a90a"));
const addTestToPatient = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("39b0fe015538a01424ff04c0e1da2ad7754d4176fae9ba292f12038efd99f556"));
const deleteTest = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("958b43e852800dc4e91df3dd3d4a71120afb6d8821562b4341d1afdb4161227e"));
const sendTestResultEmail = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("0a83f78263cee6a9108ef14950de985385ad35a5d0ea25e6cc3b585cdc5be919"));
function Label({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "label",
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function FieldGroup({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "field-group",
      className: cn(
        "group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4",
        className
      ),
      ...props
    }
  );
}
const fieldVariants = cva(
  "group/field flex w-full gap-3 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
        horizontal: "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        responsive: "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
      }
    },
    defaultVariants: {
      orientation: "vertical"
    }
  }
);
function Field({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      role: "group",
      "data-slot": "field",
      "data-orientation": orientation,
      className: cn(fieldVariants({ orientation }), className),
      ...props
    }
  );
}
function FieldLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Label,
    {
      "data-slot": "field-label",
      className: cn(
        "group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-data-checked:bg-input/30 has-[>[data-slot=field]]:rounded-2xl has-[>[data-slot=field]]:border *:data-[slot=field]:p-4",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col",
        className
      ),
      ...props
    }
  );
}
function PatientDetailPage() {
  const data = Route.useLoaderData();
  const router = useRouter();
  if (!data) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Өвчтөн олдсонгүй" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/patients", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "Буцах" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1200px] space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PatientInfoCard, { patient: data, onSaved: () => router.invalidate() }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TestsSection, { patient: data, tests: data.tests, onUpdated: () => router.invalidate() }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddTestCard, { patientId: data.id, onAdded: () => router.invalidate() })
  ] });
}
function PatientInfoCard({
  patient,
  onSaved
}) {
  const [editOpen, setEditOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-outline-variant/10 bg-card p-8 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-24 items-center justify-center rounded-2xl border border-outline-variant/10 bg-surface-container-low text-primary/80 shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: TZr, strokeWidth: 1.5, className: "size-12" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-bold tracking-tight text-foreground", children: [
            patient.lastName,
            " ",
            patient.firstName
          ] }),
          patient.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: patient.email })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: editOpen, onOpenChange: setEditOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/10 transition-all hover:bg-primary/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: R4, strokeWidth: 2, className: "size-[18px]" }),
          "Засах"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Мэдээлэл засах" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PatientEditForm, { patient, onSaved: () => {
            setEditOpen(false);
            onSaved();
          } })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoField, { label: "Нас / Хүйс", value: `${patient.age} нас, ${patient.gender === "male" ? "Эрэгтэй" : "Эмэгтэй"}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoField, { label: "Төрсөн огноо", value: patient.dateOfBirth }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoField, { label: "Бүртгүүлсэн огноо", value: new Date(patient.createdAt).toLocaleDateString("mn-MN") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoField, { label: "Утасны дугаар", value: patient.phone }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InfoField, { label: "Цахим шуудан", value: patient.email || "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50", children: "Статус" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex w-fit items-center rounded-full border border-green-100 bg-green-50 px-3 py-1 text-[11px] font-bold text-green-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-2 size-1.5 rounded-full bg-green-500" }),
          "ИДЭВХТЭЙ"
        ] })
      ] })
    ] })
  ] });
}
function InfoField({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-semibold text-foreground/80", children: value })
  ] });
}
function PatientEditForm({
  patient,
  onSaved
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [gender, setGender] = reactExports.useState(patient.gender);
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      await updatePatient({
        data: {
          id: patient.id,
          firstName: fd.get("firstName"),
          lastName: fd.get("lastName"),
          age: Number(fd.get("age")),
          gender,
          dateOfBirth: fd.get("dateOfBirth"),
          phone: fd.get("phone"),
          email: fd.get("email") || void 0
        }
      });
      toast.success("Мэдээлэл шинэчлэгдлээ");
      onSaved();
    } catch {
      toast.error("Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldGroup, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { htmlFor: "lastName", children: "Овог" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "lastName", name: "lastName", defaultValue: patient.lastName, required: true, className: "rounded-xl" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { htmlFor: "firstName", children: "Нэр" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "firstName", name: "firstName", defaultValue: patient.firstName, required: true, className: "rounded-xl" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { htmlFor: "age", children: "Нас" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "age", name: "age", type: "number", defaultValue: patient.age, required: true, className: "rounded-xl" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "Хүйс" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: gender, onValueChange: (v) => v && setGender(v), items: {
          male: "Эрэгтэй",
          female: "Эмэгтэй"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: GENDER_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt.value, children: opt.label }, opt.value)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { htmlFor: "dateOfBirth", children: "Төрсөн огноо" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "dateOfBirth", name: "dateOfBirth", type: "date", defaultValue: patient.dateOfBirth, required: true, className: "rounded-xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { htmlFor: "phone", children: "Утас" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "phone", name: "phone", defaultValue: patient.phone, required: true, className: "rounded-xl" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { htmlFor: "email", children: "Имэйл" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", name: "email", type: "email", defaultValue: patient.email || "", className: "rounded-xl" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "rounded-xl" }), children: "Болих" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, className: "rounded-xl bg-primary text-white", children: loading ? "Хадгалж байна..." : "Хадгалах" })
    ] })
  ] }) });
}
function TestsSection({
  patient,
  tests,
  onUpdated
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "flex items-center gap-2 text-xl font-bold text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: ot, strokeWidth: 2, className: "size-5 text-primary" }),
        "Шинжилгээний үр дүн"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-muted-foreground", children: [
        "Нийт ",
        tests.length
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ghost-border overflow-hidden rounded-xl bg-card shadow-sm", children: tests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: zB, strokeWidth: 1.5, className: "mb-2 size-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "Шинжилгээ бүртгэгдээгүй байна" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-outline-variant/10 bg-surface-container-low/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-12 px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60", children: "#" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60", children: "Шинжилгээний нэр" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60", children: "Төлөв" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60", children: "Файл" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60", children: "Имэйл" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60", children: "Үйлдэл" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-outline-variant/5", children: tests.map((test, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(TestRow, { index: idx + 1, test, patientEmail: patient.email, onUpdated }, test.id)) })
    ] }) })
  ] });
}
function TestRow({
  test,
  index,
  patientEmail,
  onUpdated
}) {
  const [uploading, setUploading] = reactExports.useState(false);
  const [sending, setSending] = reactExports.useState(false);
  const [deleting, setDeleting] = reactExports.useState(false);
  async function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("testId", test.id);
      const result = await uploadTestFile({
        data: formData
      });
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Файл амжилттай хуулагдлаа");
        onUpdated();
      }
    } catch {
      toast.error("Файл хуулахад алдаа гарлаа");
    } finally {
      setUploading(false);
    }
  }
  async function handleSendEmail() {
    setSending(true);
    try {
      const result = await sendTestResultEmail({
        data: {
          testId: test.id
        }
      });
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Имэйл амжилттай илгээгдлээ");
        onUpdated();
      }
    } catch {
      toast.error("Имэйл илгээхэд алдаа гарлаа");
    } finally {
      setSending(false);
    }
  }
  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteTest({
        data: {
          testId: test.id
        }
      });
      toast.success("Шинжилгээ устгагдлаа");
      onUpdated();
    } catch {
      toast.error("Алдаа гарлаа");
    } finally {
      setDeleting(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "group transition-colors hover:bg-surface-container-low", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-5 text-sm font-medium text-muted-foreground/50", children: String(index).padStart(2, "0") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-foreground", children: test.testType }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-5 text-center", children: test.status === "complete" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700", children: "Дууссан" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full border border-amber-100 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-700", children: "Хүлээгдэж буй" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-5 text-center", children: test.fileUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: test.fileUrl, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1 text-[11px] font-bold text-[#1960a3] underline decoration-dotted transition-colors hover:text-primary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: zB, strokeWidth: 2, className: "size-5" }),
      "PDF"
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: zB, strokeWidth: 1.5, className: "mx-auto size-5" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-5 text-center", children: test.emailSent ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full bg-[#E6F4EA] px-3 py-1 text-[10px] font-bold uppercase text-[#1E4620]", children: "Илгээсэн" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full border border-outline-variant/10 bg-surface-container-low px-3 py-1 text-[10px] font-bold uppercase text-muted-foreground/50", children: "Илгээгээгүй" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "cursor-pointer", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex size-8 items-center justify-center rounded-lg text-primary transition-colors hover:bg-surface-container-high", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: IIr, strokeWidth: 2, className: "size-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", className: "hidden", onChange: handleFileUpload, disabled: uploading })
      ] }),
      test.fileUrl && patientEmail ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSendEmail, disabled: sending, className: "inline-flex size-8 items-center justify-center rounded-lg text-primary transition-colors hover:bg-surface-container-high", title: "Имэйл илгээх", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: osr, strokeWidth: 2, className: "size-5" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex size-8 items-center justify-center text-muted-foreground/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: osr, strokeWidth: 2, className: "size-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: deleting, className: "inline-flex size-8 items-center justify-center rounded-lg text-destructive transition-colors hover:bg-destructive/5", title: "Устгах", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: Mg, strokeWidth: 2, className: "size-5" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { size: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Шинжилгээ устгах" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              '"',
              test.testType,
              '" шинжилгээг устгахдаа итгэлтэй байна уу?'
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Болих" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { variant: "destructive", onClick: handleDelete, children: "Устгах" })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
function AddTestCard({
  patientId,
  onAdded
}) {
  const [newTest, setNewTest] = reactExports.useState("");
  const [adding, setAdding] = reactExports.useState(false);
  async function handleAdd() {
    if (!newTest) return;
    setAdding(true);
    try {
      await addTestToPatient({
        data: {
          patientId,
          testType: newTest
        }
      });
      setNewTest("");
      toast.success("Шинжилгээ нэмэгдлээ");
      onAdded();
    } catch {
      toast.error("Алдаа гарлаа");
    } finally {
      setAdding(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-primary-container/10 bg-surface-container-low p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-12 shrink-0 items-center justify-center rounded-full bg-card shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: R, strokeWidth: 2, className: "size-5 text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-foreground", children: "Шинэ шинжилгээ нэмэх" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Шинжилгээний төрлийг сонгоно уу" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: newTest, onValueChange: (v) => v && setNewTest(v), items: Object.fromEntries(TEST_TYPES.map((t) => [t, t])), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-64 rounded-xl border-outline-variant/15 bg-card text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Шинжилгээ сонгох..." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: TEST_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: t, children: t }, t)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleAdd, disabled: !newTest || adding, className: "rounded-xl bg-primary-container px-5 text-sm font-semibold text-white", children: "Нэмэх" })
  ] }) });
}
export {
  PatientDetailPage as component
};
