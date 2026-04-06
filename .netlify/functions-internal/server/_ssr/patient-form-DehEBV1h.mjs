import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { I as Input, B as Button } from "./input-DpwQ1gn2.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-COsLrdLe.mjs";
import { C as Checkbox } from "./checkbox-uCg1YdH5.mjs";
import { G as GENDER_OPTIONS, T as TEST_TYPES } from "./constants-CNvrnp7p.mjs";
import { f as createPatient } from "./router-BR745k5G.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { b as NIr, z as zL, t as tQ, L as Lyr, f as fer } from "../_libs/hugeicons__core-free-icons.mjs";
import { H as HugeiconsIcon } from "../_libs/hugeicons__react.mjs";
function PatientForm({ user, onSuccess }) {
  const [loading, setLoading] = reactExports.useState(false);
  const [selectedTests, setSelectedTests] = reactExports.useState([]);
  const [gender, setGender] = reactExports.useState("");
  function toggleTest(test) {
    setSelectedTests(
      (prev) => prev.includes(test) ? prev.filter((t) => t !== test) : [...prev, test]
    );
  }
  function resetForm(form) {
    form.reset();
    setSelectedTests([]);
    setGender("");
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    try {
      await createPatient({
        data: {
          lastName: formData.get("lastName"),
          firstName: formData.get("firstName"),
          age: Number(formData.get("age")),
          gender,
          dateOfBirth: formData.get("dateOfBirth"),
          phone: formData.get("phone"),
          email: formData.get("email") || void 0,
          testTypes: selectedTests.length > 0 ? selectedTests : void 0,
          createdBy: user?.id
        }
      });
      toast.success("Өвчтөн амжилттай бүртгэгдлээ");
      resetForm(form);
      onSuccess?.();
    } catch {
      toast.error("Бүртгэхэд алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-8 rounded-3xl bg-surface-container-low p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          HugeiconsIcon,
          {
            icon: NIr,
            strokeWidth: 2,
            className: "size-5 text-primary"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-foreground", children: "Үндсэн мэдээлэл" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "ml-1 block text-[11px] font-bold uppercase text-muted-foreground/80", children: "Овог" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              name: "lastName",
              placeholder: "Овог оруулна уу",
              required: true,
              className: "h-11 rounded-xl border-outline-variant/30 bg-card px-4 text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "ml-1 block text-[11px] font-bold uppercase text-muted-foreground/80", children: "Нэр" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              name: "firstName",
              placeholder: "Нэр оруулна уу",
              required: true,
              className: "h-11 rounded-xl border-outline-variant/30 bg-card px-4 text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "ml-1 block text-[11px] font-bold uppercase text-muted-foreground/80", children: "Нас" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              name: "age",
              type: "number",
              min: 0,
              max: 150,
              placeholder: "Нас",
              required: true,
              className: "h-11 rounded-xl border-outline-variant/30 bg-card px-4 text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "ml-1 block text-[11px] font-bold uppercase text-muted-foreground/80", children: "Хүйс" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: gender,
              onValueChange: (v) => v && setGender(v),
              items: { male: "Эрэгтэй", female: "Эмэгтэй" },
              required: true,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-11 w-full rounded-xl border-outline-variant/30 bg-card px-4 text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Сонгох" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: GENDER_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: opt.value, children: opt.label }, opt.value)) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", name: "gender", value: gender })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "ml-1 block text-[11px] font-bold uppercase text-muted-foreground/80", children: "Төрсөн огноо" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              name: "dateOfBirth",
              type: "date",
              required: true,
              className: "h-11 rounded-xl border-outline-variant/30 bg-card px-4 text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "ml-1 block text-[11px] font-bold uppercase text-muted-foreground/80", children: "Утасны дугаар" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: zL, strokeWidth: 2, className: "size-[18px]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                name: "phone",
                type: "tel",
                placeholder: "0000 0000",
                required: true,
                className: "h-11 rounded-xl border-outline-variant/30 bg-card pl-11 pr-4 text-sm"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-1 space-y-2 md:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "ml-1 block text-[11px] font-bold uppercase text-muted-foreground/80", children: "Имэйл" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: tQ, strokeWidth: 2, className: "size-[18px]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                name: "email",
                type: "email",
                placeholder: "example@clinic.mn",
                className: "h-11 rounded-xl border-outline-variant/30 bg-card pl-11 pr-4 text-sm"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            HugeiconsIcon,
            {
              icon: Lyr,
              strokeWidth: 2,
              className: "size-5 text-primary"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-foreground", children: "Шинжилгээнүүд" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-surface-container-high px-3 py-1 text-[10px] font-bold uppercase text-muted-foreground", children: [
          "Нийт ",
          TEST_TYPES.length,
          " төрөл",
          selectedTests.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            " · ",
            selectedTests.length,
            " сонгосон"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-3", children: TEST_TYPES.map((test) => {
        const isChecked = selectedTests.includes(test);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            className: `group relative flex cursor-pointer items-center gap-4 rounded-2xl border p-4 shadow-sm transition-all hover:border-primary-container/40 hover:bg-background ${isChecked ? "border-primary-container/50 bg-surface-container-low" : "border-transparent bg-card"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  checked: isChecked,
                  onCheckedChange: () => toggleTest(test),
                  className: "size-5"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground transition-colors group-hover:text-primary", children: test })
            ]
          },
          test
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-4 border-t border-surface-container-high pt-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          className: "px-8 text-sm font-semibold",
          onClick: (e) => {
            const form = e.target.closest("form");
            if (form) resetForm(form);
          },
          children: "Цэвэрлэх"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "submit",
          disabled: loading || !gender,
          className: "gap-3 bg-primary-container px-12 py-3.5 text-sm font-bold text-on-primary-container shadow-lg shadow-primary-container/20 transition-all hover:scale-[1.02] hover:bg-primary-container/90 active:scale-95",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: fer, strokeWidth: 2, className: "size-[18px]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: loading ? "Бүртгэж байна..." : "Бүртгэх" })
          ]
        }
      )
    ] })
  ] });
}
export {
  PatientForm as P
};
