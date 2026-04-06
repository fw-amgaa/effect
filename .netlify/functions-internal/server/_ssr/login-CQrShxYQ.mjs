import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { I as Input, B as Button } from "./input-DpwQ1gn2.mjs";
import { C as Checkbox } from "./checkbox-uCg1YdH5.mjs";
import { a as authClient } from "./auth-client-CwgFGSb3.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { t as tQ, u as uJ, N as Nn, s as sir } from "../_libs/hugeicons__core-free-icons.mjs";
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
function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = reactExports.useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const result = await authClient.signIn.email({
        email,
        password
      });
      if (result.error) {
        toast.error(result.error.message || "Нэвтрэхэд алдаа гарлаа");
      } else {
        navigate({
          to: "/"
        });
      }
    } catch {
      toast.error("Нэвтрэхэд алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "medical-grid flex min-h-svh flex-col items-center justify-center p-6 selection:bg-primary-container selection:text-on-primary-container", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none fixed inset-0 -z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-1/2 right-0 h-1/3 w-1/3 translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 h-1/4 w-1/4 -translate-x-1/4 translate-y-1/2 rounded-full bg-primary-container/5 blur-[100px]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "z-10 w-full max-w-[440px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center rounded-xl border border-outline-variant/15 bg-card p-8 shadow-sm md:p-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/logo.png", alt: "Эффект Эмнэлэг", className: "h-12 w-auto object-contain" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-2 text-2xl font-bold tracking-tight text-foreground", children: "Нэвтрэх" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground/80", children: "Клиникийн дотоод системд нэвтрэх" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "w-full space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "ml-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70", children: "Имэйл хаяг" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: tQ, strokeWidth: 2, className: "size-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", name: "email", type: "email", placeholder: "example@effect.mn", required: true, className: "h-12 rounded-xl border-outline-variant/20 bg-surface-container-low pl-11 pr-4 text-sm transition-all focus:border-primary" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "password", className: "ml-0 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70", children: "Нууц үг" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/forgot-password", className: "text-xs font-semibold text-primary transition-colors hover:text-primary-container", children: "Нууц үг мартсан?" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: uJ, strokeWidth: 2, className: "size-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "password", name: "password", type: "password", placeholder: "••••••••", required: true, className: "h-12 rounded-xl border-outline-variant/20 bg-surface-container-low pl-11 pr-4 text-sm transition-all focus:border-primary" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 px-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { id: "remember", className: "size-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "remember", className: "select-none text-sm font-medium text-muted-foreground", children: "Намайг санах" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: loading, className: "group h-12 w-full gap-2 rounded-xl bg-primary-container font-bold text-white shadow-sm transition-all hover:brightness-105 active:scale-[0.98]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold tracking-wide", children: loading ? "Нэвтэрч байна..." : "Нэвтрэх" }),
            !loading && /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: Nn, strokeWidth: 2, className: "size-[18px] transition-transform group-hover:translate-x-1" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 w-full border-t border-outline-variant/10 pt-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-muted-foreground/50", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ЭФФЕКТ ЭМНЭЛЭГ. Бүх эрх хуулиар хамгаалагдсан."
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex select-none items-center justify-center gap-2 opacity-40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: sir, strokeWidth: 2, className: "size-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-[0.2em] text-foreground", children: "Secure Clinical Gateway" })
      ] })
    ] })
  ] });
}
export {
  LoginPage as component
};
