import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as Route$3, c as createUser, u as updateUserRole, d as deleteUser } from "./router-BR745k5G.mjs";
import { I as Input, B as Button } from "./input-DpwQ1gn2.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-COsLrdLe.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogClose, A as AlertDialog, f as AlertDialogTrigger, g as AlertDialogContent, h as AlertDialogHeader, i as AlertDialogTitle, j as AlertDialogDescription, k as AlertDialogFooter, l as AlertDialogCancel, m as AlertDialogAction } from "./alert-dialog-3K7AMxVe.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { R as ROLE_LABELS, a as ROLES } from "./constants-CNvrnp7p.mjs";
import { p as pkr, R, G as GIr, m as mn, N as Nn, M as Mg } from "../_libs/hugeicons__core-free-icons.mjs";
import { H as HugeiconsIcon } from "../_libs/hugeicons__react.mjs";
import "../_libs/@opentelemetry/semantic-conventions.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "./index.mjs";
import "node:async_hooks";
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
function getInitials(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}
function RolesPage() {
  const users = Route$3.useLoaderData();
  const [createOpen, setCreateOpen] = reactExports.useState(false);
  const [search, setSearch] = reactExports.useState("");
  const filtered = users.filter((u) => !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1440px] space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-3xl font-extrabold tracking-tight text-foreground", children: "Хэрэглэгчийн жагсаалт" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-muted-foreground", children: [
          "Нийт ",
          users.length,
          " хэрэглэгч системд бүртгэлтэй байна."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: pkr, strokeWidth: 2, className: "size-[18px]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Хэрэглэгч хайх...", value: search, onChange: (e) => setSearch(e.target.value), className: "w-64 rounded-xl border-none bg-card pl-10 pr-4 shadow-sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: createOpen, onOpenChange: setCreateOpen, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2 rounded-xl bg-primary-container px-5 py-2.5 text-sm font-semibold text-on-primary-container shadow-sm transition-all hover:shadow-md active:scale-95", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: R, strokeWidth: 2, className: "size-5" }),
            "Хэрэглэгч нэмэх"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "overflow-hidden sm:max-w-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "-m-6 mb-0 bg-gradient-to-br from-surface-container-low to-white px-8 pb-6 pt-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 inline-flex rounded-2xl bg-primary-container/20 p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: GIr, strokeWidth: 2, className: "size-5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-2xl font-extrabold", children: "Шинэ хэрэглэгч нэмэх" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Системд нэвтрэх эрхтэй шинэ ажилтан бүртгэх." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreateUserForm, { onCreated: () => {
              setCreateOpen(false);
              window.location.reload();
            } })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ghost-border overflow-hidden rounded-3xl bg-card shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-outline-variant/10 bg-surface-container-low/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-8 py-5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50", children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50", children: "Нэр" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50", children: "Имэйл" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50", children: "Эрх" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-8 py-5 text-right text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50", children: "Үйлдэл" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-outline-variant/5", children: filtered.map((user, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(UserRow, { user, index: idx + 1 }, user.id)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-outline-variant/10 bg-surface-container-low/20 px-8 py-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-muted-foreground", children: [
          "1-ээс ",
          filtered.length,
          "-р хэрэглэгч харагдаж байна (нийт",
          " ",
          users.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "flex size-8 items-center justify-center rounded-lg border border-outline-variant/20 text-muted-foreground/50 transition-colors hover:bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: mn, strokeWidth: 2, className: "size-[18px]" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "flex size-8 items-center justify-center rounded-lg bg-primary-container text-xs font-bold text-on-primary-container", children: "1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "flex size-8 items-center justify-center rounded-lg border border-outline-variant/20 text-muted-foreground/50 transition-colors hover:bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: Nn, strokeWidth: 2, className: "size-[18px]" }) })
        ] })
      ] })
    ] })
  ] });
}
function CreateUserForm({
  onCreated
}) {
  const [loading, setLoading] = reactExports.useState(false);
  const [role, setRole] = reactExports.useState("staff");
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    try {
      const result = await createUser({
        data: {
          email: fd.get("email"),
          password: fd.get("password"),
          fullName: fd.get("fullName"),
          role
        }
      });
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Хэрэглэгч амжилттай үүсгэлээ");
        onCreated();
      }
    } catch {
      toast.error("Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5 pt-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "px-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50", children: "Нэр" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "fullName", placeholder: "Овог нэр оруулна уу", required: true, className: "rounded-xl border-outline-variant/20 bg-surface-container-low py-3 text-sm" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "px-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50", children: "Имэйл" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "email", type: "email", placeholder: "example@effect.mn", required: true, className: "rounded-xl border-outline-variant/20 bg-surface-container-low py-3 text-sm" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "px-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50", children: "Нууц үг" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "password", type: "password", placeholder: "••••••••", minLength: 6, required: true, className: "rounded-xl border-outline-variant/20 bg-surface-container-low py-3 text-sm" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "px-1 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/50", children: "Эрх" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: role, onValueChange: (v) => v && setRole(v), items: ROLE_LABELS, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "rounded-xl border-outline-variant/20 bg-surface-container-low py-3 text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: ROLE_LABELS[r] }, r)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", className: "flex-1 rounded-xl bg-surface-container-low text-sm font-bold text-muted-foreground hover:bg-surface-container" }), children: "Цуцлах" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, className: "flex-1 rounded-xl bg-primary text-sm font-bold text-white shadow-sm", children: loading ? "Нэмж байна..." : "Нэмэх" })
    ] })
  ] });
}
function UserRow({
  user,
  index
}) {
  const [role, setRole] = reactExports.useState(user.role);
  const [saving, setSaving] = reactExports.useState(false);
  const [deleting, setDeleting] = reactExports.useState(false);
  async function handleRoleChange(newRole) {
    setRole(newRole);
    setSaving(true);
    try {
      await updateUserRole({
        data: {
          userId: user.id,
          role: newRole
        }
      });
      toast.success("Эрх шинэчлэгдлээ");
    } catch {
      toast.error("Алдаа гарлаа");
      setRole(user.role);
    } finally {
      setSaving(false);
    }
  }
  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteUser({
        data: {
          userId: user.id
        }
      });
      toast.success("Хэрэглэгч устгагдлаа");
      window.location.reload();
    } catch {
      toast.error("Алдаа гарлаа");
    } finally {
      setDeleting(false);
    }
  }
  const initials = getInitials(user.name);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "group transition-colors hover:bg-surface-container-low/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-8 py-4 text-sm font-bold text-muted-foreground/50", children: String(index).padStart(2, "0") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-8 items-center justify-center rounded-full bg-primary-container/20 text-xs font-bold text-primary", children: initials }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: user.name })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-sm text-muted-foreground", children: user.email }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: role ?? "staff", onChange: (e) => handleRoleChange(e.target.value), disabled: saving, className: "cursor-pointer rounded-full border-none bg-surface-container-high/50 px-4 py-1.5 text-xs font-bold text-foreground/80 focus:ring-2 focus:ring-primary", children: ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r, children: ROLE_LABELS[r] }, r)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-8 py-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { disabled: deleting, className: "rounded-lg p-2 text-muted-foreground/40 opacity-0 transition-all hover:bg-destructive/5 hover:text-destructive group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: Mg, strokeWidth: 2, className: "size-5" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { size: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Хэрэглэгч устгах" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
            '"',
            user.name,
            '" хэрэглэгчийг устгахдаа итгэлтэй байна уу?'
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Болих" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { variant: "destructive", onClick: handleDelete, children: "Устгах" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  RolesPage as component
};
