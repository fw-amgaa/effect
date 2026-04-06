import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button, I as Input } from "./input-DpwQ1gn2.mjs";
import { a as authClient } from "./auth-client-CwgFGSb3.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { T as TWr, m as mn, t as tQ } from "../_libs/hugeicons__core-free-icons.mjs";
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
import "./error-codes-DHWAkvSO.mjs";
function ForgotPasswordPage() {
  const [loading, setLoading] = reactExports.useState(false);
  const [sent, setSent] = reactExports.useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    try {
      await authClient.requestPasswordReset({
        email,
        redirectTo: "/reset-password"
      });
      setSent(true);
    } catch {
      toast.error("Алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "medical-grid flex min-h-svh flex-col items-center justify-center p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none fixed inset-0 -z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-1/2 right-0 h-1/3 w-1/3 translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 h-1/4 w-1/4 -translate-x-1/4 translate-y-1/2 rounded-full bg-primary-container/5 blur-[100px]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "z-10 w-full max-w-[440px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center rounded-xl border border-outline-variant/15 bg-card p-8 shadow-sm md:p-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/logo.png", alt: "Эффект Эмнэлэг", className: "h-12 w-auto object-contain" }) }),
      sent ? (
        /* Success state */
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: TWr, strokeWidth: 2, className: "size-8 text-green-600" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-2 text-xl font-bold text-foreground", children: "Имэйл илгээгдлээ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-8 text-sm text-muted-foreground", children: "Нууц үг сэргээх холбоосыг таны имэйл хаяг руу илгээлээ. Имэйлээ шалгана уу." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", className: "gap-2 text-sm font-semibold text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: mn, strokeWidth: 2, className: "size-4" }),
            "Нэвтрэх хуудас руу буцах"
          ] }) })
        ] })
      ) : (
        /* Form state */
        /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-2 text-2xl font-bold tracking-tight text-foreground", children: "Нууц үг сэргээх" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground/80", children: "Бүртгэлтэй имэйл хаягаа оруулна уу" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "w-full space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "ml-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70", children: "Имэйл хаяг" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: tQ, strokeWidth: 2, className: "size-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", name: "email", type: "email", placeholder: "example@effect.mn", required: true, className: "h-12 rounded-xl border-outline-variant/20 bg-surface-container-low pl-11 pr-4 text-sm" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, className: "h-12 w-full rounded-xl bg-primary-container font-bold text-white shadow-sm hover:brightness-105", children: loading ? "Илгээж байна..." : "Сэргээх холбоос илгээх" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", className: "gap-2 text-sm font-semibold text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: mn, strokeWidth: 2, className: "size-4" }),
              "Нэвтрэх хуудас руу буцах"
            ] }) }) })
          ] })
        ] })
      )
    ] }) })
  ] });
}
export {
  ForgotPasswordPage as component
};
