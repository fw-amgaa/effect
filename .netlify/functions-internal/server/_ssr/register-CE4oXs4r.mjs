import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useRouter } from "../_libs/tanstack__react-router.mjs";
import { P as PatientForm } from "./patient-form-DehEBV1h.mjs";
import { B as Button } from "./input-DpwQ1gn2.mjs";
import { a as authClient } from "./auth-client-CwgFGSb3.mjs";
import { a as TZr, g as gJ } from "../_libs/hugeicons__core-free-icons.mjs";
import { R as Route$9 } from "./router-BR745k5G.mjs";
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
import "./select-COsLrdLe.mjs";
import "../_libs/base-ui__react.mjs";
import "../_libs/base-ui__utils.mjs";
import "../_libs/reselect.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/tabbable.mjs";
import "./checkbox-uCg1YdH5.mjs";
import "./constants-CNvrnp7p.mjs";
import "../_libs/sonner.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./error-codes-DHWAkvSO.mjs";
import "./index.mjs";
import "node:async_hooks";
function RegisterPage() {
  const {
    user
  } = Route$9.useRouteContext();
  const router = useRouter();
  async function handleLogout() {
    await authClient.signOut();
    router.navigate({
      to: "/login"
    });
  }
  const today = (/* @__PURE__ */ new Date()).toLocaleDateString("mn-MN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-h-svh flex-col custom-scrollbar", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none fixed inset-0 -z-10 opacity-40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-1/2 right-0 h-[600px] w-[600px] translate-x-1/3 rounded-full bg-primary-container/30 blur-[120px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/4 translate-y-1/3 rounded-full bg-surface-container-high/40 blur-[100px]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-50 flex w-full items-center justify-between border-b border-surface-container-high/30 bg-background/80 px-10 py-3 backdrop-blur-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/logo.png", alt: "Эффект Эмнэлэг", className: "h-14 w-auto object-contain" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-full bg-surface-container-low px-5 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-9 items-center justify-center rounded-full bg-primary-container/20 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: TZr, strokeWidth: 2, className: "size-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-muted-foreground", children: user.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", className: "gap-2 text-destructive hover:bg-destructive/5", onClick: handleLogout, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Гарах" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: gJ, strokeWidth: 2, className: "size-4" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto w-full max-w-[1200px] flex-1 px-6 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-extrabold tracking-tight text-foreground", children: "Өвчтөн бүртгэх" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground/70", children: "Шинэ өвчтөний мэдээлэл болон шинжилгээний төрлийг сонгоно уу." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40", children: "Өнөөдөр" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-primary", children: today })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PatientForm, { user })
    ] })
  ] });
}
export {
  RegisterPage as component
};
