import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { O as Outlet, e as useLocation, d as useRouter, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as authClient } from "./auth-client-CwgFGSb3.mjs";
import { I as IZr, F as FZr, g as gJ } from "../_libs/hugeicons__core-free-icons.mjs";
import { g as Route$6 } from "./router-BR745k5G.mjs";
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
import "./error-codes-DHWAkvSO.mjs";
import "../_libs/sonner.mjs";
import "./index.mjs";
import "node:async_hooks";
function AppSidebar({ user }) {
  const location = useLocation();
  const router = useRouter();
  const navItems = [
    {
      title: "Өвчтөнүүд",
      url: "/dashboard/patients",
      icon: IZr
    },
    ...user.role === "admin" ? [
      {
        title: "Хэрэглэгч удирдах",
        url: "/dashboard/roles",
        icon: FZr
      }
    ] : []
  ];
  async function handleLogout() {
    await authClient.signOut();
    router.navigate({ to: "/login" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "fixed top-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-surface-container-high/10 bg-surface-container-low pb-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: "/logo.png",
          alt: "Эффект Эмнэлэг",
          className: "w-auto object-cover"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "space-y-4", children: navItems.map((item) => {
        const isActive = location.pathname.startsWith(item.url);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: item.url,
            className: `mx-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive ? "bg-primary-container text-white shadow-sm" : "text-[#1960a3] hover:bg-surface-container-high"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                HugeiconsIcon,
                {
                  icon: item.icon,
                  strokeWidth: 2,
                  className: "size-5"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.title })
            ]
          },
          item.url
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto border-t border-surface-container-high/20 px-6 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "space-y-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: handleLogout,
        className: "mx-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#1960a3] transition-all duration-200 hover:bg-surface-container-high",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            HugeiconsIcon,
            {
              icon: gJ,
              strokeWidth: 2,
              className: "size-5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Гарах" })
        ]
      }
    ) }) })
  ] });
}
const BREADCRUMB_MAP = {
  "/dashboard/patients": "Өвчтөнүүд",
  "/dashboard/patients/new": "Шинэ өвчтөн",
  "/dashboard/roles": "Хэрэглэгч удирдах"
};
function SiteHeader({ user }) {
  const location = useLocation();
  const pathname = location.pathname;
  let breadcrumbLabel = "Өвчтөнүүд";
  let isDetail = false;
  if (BREADCRUMB_MAP[pathname]) {
    breadcrumbLabel = BREADCRUMB_MAP[pathname];
  } else if (pathname.startsWith("/dashboard/patients/")) {
    breadcrumbLabel = "Дэлгэрэнгүй";
    isDetail = true;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 flex w-full items-center justify-between border-b border-surface-container-high/15 bg-background/80 px-8 py-4 backdrop-blur-xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-2 text-sm font-medium", children: [
      isDetail && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50", children: "Өвчтөнүүд" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground/30", children: "/" })
      ] }),
      pathname.startsWith("/dashboard/roles") && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50", children: "Админ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground/30", children: "/" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: breadcrumbLabel })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-foreground", children: user.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: user.email })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-9 items-center justify-center rounded-full border-2 border-primary-container/20 bg-surface-container-low text-[10px] font-bold text-primary", children: user.name.trim().split(/\s+/).map((p) => p[0]).join("").slice(0, 2).toUpperCase() })
    ] })
  ] });
}
function DashboardLayout() {
  const {
    user
  } = Route$6.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AppSidebar, { user }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "ml-64 flex flex-1 flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, { user }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] })
  ] });
}
export {
  DashboardLayout as component
};
