import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button, I as Input } from "./input-DpwQ1gn2.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-COsLrdLe.mjs";
import { R, p as pkr, N as Nn, m as mn } from "../_libs/hugeicons__core-free-icons.mjs";
import { b as Route$2 } from "./router-BR745k5G.mjs";
import { H as HugeiconsIcon } from "../_libs/hugeicons__react.mjs";
import "../_libs/@opentelemetry/semantic-conventions.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/base-ui__react.mjs";
import "../_libs/base-ui__utils.mjs";
import "../_libs/reselect.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/tabbable.mjs";
import "../_libs/sonner.mjs";
import "./index.mjs";
import "node:async_hooks";
const PAGE_SIZE = 10;
function getInitials(firstName, lastName) {
  return ((lastName?.[0] || "") + (firstName?.[0] || "")).toUpperCase();
}
function PatientsPage() {
  const patients = Route$2.useLoaderData();
  const [search, setSearch] = reactExports.useState("");
  const [genderFilter, setGenderFilter] = reactExports.useState("all");
  const [page, setPage] = reactExports.useState(1);
  const filtered = reactExports.useMemo(() => {
    return patients.filter((p) => {
      const fullName = `${p.lastName} ${p.firstName}`.toLowerCase();
      const q = search.toLowerCase();
      const matchesSearch = !q || fullName.includes(q) || p.phone.includes(search) || p.email && p.email.toLowerCase().includes(q);
      const matchesGender = genderFilter === "all" || p.gender === genderFilter;
      return matchesSearch && matchesGender;
    });
  }, [patients, search, genderFilter]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const startIdx = (currentPage - 1) * PAGE_SIZE + 1;
  const endIdx = Math.min(currentPage * PAGE_SIZE, filtered.length);
  function getPageNumbers() {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1200px] space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-extrabold tracking-tight text-foreground", children: "Өвчтөнүүд" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm font-medium text-muted-foreground", children: [
          "Нийт ",
          patients.length,
          " өвчтөн бүртгэлтэй байна."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/patients/new", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2 rounded-xl bg-primary-container px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 active:scale-95", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: R, strokeWidth: 2, className: "size-[18px]" }),
        "Шинэ өвчтөн"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-12 flex flex-wrap items-end gap-4 rounded-2xl bg-surface-container-low p-6 lg:col-span-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-[200px] flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 ml-1 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60", children: "Хайлт" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: pkr, strokeWidth: 2, className: "size-[18px]" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Өвчтөний нэр, утас хайх...", value: search, onChange: (e) => {
              setSearch(e.target.value);
              setPage(1);
            }, className: "h-10 rounded-xl border-outline-variant/15 bg-card pl-10 pr-4 text-sm" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-[160px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 ml-1 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60", children: "Хүйс" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: genderFilter, onValueChange: (v) => {
            if (v) setGenderFilter(v);
            setPage(1);
          }, items: {
            all: "Бүх хүйс",
            male: "Эрэгтэй",
            female: "Эмэгтэй"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-10 w-full rounded-xl border-outline-variant/15 bg-card px-4 text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "Бүх хүйс" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "male", children: "Эрэгтэй" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "female", children: "Эмэгтэй" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-12 flex flex-col justify-between overflow-hidden rounded-2xl bg-primary p-6 text-white shadow-xl lg:col-span-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-1 text-sm font-medium text-white/80", children: "Нийт бүртгэлтэй өвчтөн" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-4xl font-black tracking-tighter", children: patients.length.toLocaleString() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-white/10 blur-3xl" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ghost-border overflow-hidden rounded-2xl bg-card shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-outline-variant/10 bg-surface-container-low/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-12 px-6 py-5 text-center text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60", children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "min-w-[200px] px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60", children: "Овог нэр" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60", children: "Нас" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60", children: "Хүйс" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60", children: "Утас" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60", children: "Бүртгүүлсэн" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-5 text-right text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60", children: "Үйлдэл" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-outline-variant/5", children: paged.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 7, className: "px-6 py-16 text-center text-sm text-muted-foreground", children: "Өвчтөн олдсонгүй" }) }) : paged.map((patient, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "group cursor-pointer transition-colors hover:bg-surface-container-low", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-5 text-center text-xs font-medium text-muted-foreground/50", children: String(startIdx + idx).padStart(2, "0") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard/patients/$patientId", params: {
            patientId: patient.id
          }, className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-container text-[10px] font-bold text-primary", children: getInitials(patient.firstName, patient.lastName) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-foreground", children: [
                patient.lastName,
                " ",
                patient.firstName
              ] }),
              patient.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/50", children: patient.email })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-5 text-sm font-medium text-muted-foreground", children: patient.age }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-5 text-sm font-medium text-muted-foreground", children: patient.gender === "male" ? "Эрэгтэй" : "Эмэгтэй" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-5 text-sm text-muted-foreground", children: patient.phone }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground", children: new Date(patient.createdAt).toLocaleDateString("mn-MN") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/patients/$patientId", params: {
            patientId: patient.id
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "p-2 text-muted-foreground/40 transition-colors hover:text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: Nn, strokeWidth: 2, className: "size-5" }) }) }) })
        ] }, patient.id)) })
      ] }) }),
      totalPages > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-outline-variant/10 bg-surface-container-low/30 px-6 py-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-muted-foreground", children: [
          "Нийт ",
          filtered.length,
          " өвчтөнөөс ",
          startIdx,
          "-",
          endIdx
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPage((p) => Math.max(1, p - 1)), disabled: currentPage === 1, className: "flex size-8 items-center justify-center rounded-lg text-muted-foreground/50 transition-all hover:bg-card hover:shadow-sm disabled:opacity-30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: mn, strokeWidth: 2, className: "size-[18px]" }) }),
          getPageNumbers().map((p, i) => p === "ellipsis" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 text-muted-foreground/40", children: "..." }, `e-${i}`) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPage(p), className: `flex size-8 items-center justify-center rounded-lg text-xs font-bold transition-all ${p === currentPage ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:bg-card hover:shadow-sm"}`, children: p }, p)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setPage((p) => Math.min(totalPages, p + 1)), disabled: currentPage === totalPages, className: "flex size-8 items-center justify-center rounded-lg text-muted-foreground/50 transition-all hover:bg-card hover:shadow-sm disabled:opacity-30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: Nn, strokeWidth: 2, className: "size-[18px]" }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  PatientsPage as component
};
