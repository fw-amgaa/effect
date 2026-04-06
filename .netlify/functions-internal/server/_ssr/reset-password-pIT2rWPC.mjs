import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { I as Input, B as Button } from "./input-DpwQ1gn2.mjs";
import { a as authClient } from "./auth-client-CwgFGSb3.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { T as TWr, u as uJ } from "../_libs/hugeicons__core-free-icons.mjs";
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
function ResetPasswordPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = reactExports.useState(false);
  const [success, setSuccess] = reactExports.useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    if (password !== confirmPassword) {
      toast.error("Нууц үг таарахгүй байна");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      toast.error("Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой");
      setLoading(false);
      return;
    }
    try {
      await authClient.resetPassword({
        newPassword: password
      });
      setSuccess(true);
      setTimeout(() => navigate({
        to: "/login"
      }), 3e3);
    } catch {
      toast.error("Алдаа гарлаа. Холбоосын хугацаа дууссан байж магадгүй.");
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
      success ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: TWr, strokeWidth: 2, className: "size-8 text-green-600" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-2 text-xl font-bold text-foreground", children: "Нууц үг амжилттай солигдлоо" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Нэвтрэх хуудас руу автоматаар шилжинэ..." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-2 text-2xl font-bold tracking-tight text-foreground", children: "Шинэ нууц үг" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-muted-foreground/80", children: "Шинэ нууц үгээ оруулна уу" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "w-full space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "ml-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70", children: "Шинэ нууц үг" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: uJ, strokeWidth: 2, className: "size-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "password", type: "password", placeholder: "••••••••", required: true, minLength: 6, className: "h-12 rounded-xl border-outline-variant/20 bg-surface-container-low pl-11 pr-4 text-sm" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "ml-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70", children: "Нууц үг давтах" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: uJ, strokeWidth: 2, className: "size-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { name: "confirmPassword", type: "password", placeholder: "••••••••", required: true, minLength: 6, className: "h-12 rounded-xl border-outline-variant/20 bg-surface-container-low pl-11 pr-4 text-sm" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, className: "h-12 w-full rounded-xl bg-primary-container font-bold text-white shadow-sm hover:brightness-105", children: loading ? "Хадгалж байна..." : "Нууц үг хадгалах" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "text-sm font-semibold text-primary hover:underline", children: "Нэвтрэх хуудас руу буцах" }) })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  ResetPasswordPage as component
};
