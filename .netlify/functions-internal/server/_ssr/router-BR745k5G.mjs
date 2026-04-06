import { c as createRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, H as HeadContent, S as Scripts, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { v as redirect } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster } from "../_libs/sonner.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, a as getServerFnById } from "./index.mjs";
import "../_libs/react-dom.mjs";
import "../_libs/@opentelemetry/semantic-conventions.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "node:stream/web";
import "node:async_hooks";
const appCss = "/assets/styles-Do6V1rx5.css";
const Route$b = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "Effect Med"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  component: RootComponent,
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "mn", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { position: "top-right", richColors: true })
  ] });
}
const $$splitComponentImporter$8 = () => import("./reset-password-pIT2rWPC.mjs");
const Route$a = createFileRoute("/reset-password")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var createSsrRpc = (functionId, importer) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getSession = createServerFn({
  method: "GET"
}).handler(createSsrRpc("a25ee52c3707674a0708759ce51bbede27783305d5c10599240f3902a9f63a55"));
const $$splitComponentImporter$7 = () => import("./register-CE4oXs4r.mjs");
const Route$9 = createFileRoute("/register")({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) {
      throw redirect({
        to: "/login"
      });
    }
    return {
      user: session
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./login-CQrShxYQ.mjs");
const Route$8 = createFileRoute("/login")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./forgot-password-nInQaVIh.mjs");
const Route$7 = createFileRoute("/forgot-password")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./dashboard-OvpKU01M.mjs");
const Route$6 = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) {
      throw redirect({
        to: "/login"
      });
    }
    if (session.role === "registrar") {
      throw redirect({
        to: "/register"
      });
    }
    return {
      user: session
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const Route$5 = createFileRoute("/")({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) {
      throw redirect({ to: "/login" });
    }
    if (session.role === "registrar") {
      throw redirect({ to: "/register" });
    }
    throw redirect({ to: "/dashboard" });
  }
});
const Route$4 = createFileRoute("/dashboard/")({
  beforeLoad: () => {
    throw redirect({ to: "/dashboard/patients" });
  }
});
const getUsers = createServerFn({
  method: "GET"
}).handler(createSsrRpc("7660757b97881869d0dcce816e055a8f4aaca7418cb413adc5189b7442f43b2f"));
const createUser = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("10241ab2790d2258d4f3bd091d1ed42e8b296e2992c89607209340ece672a81a"));
const updateUserRole = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("1c0931ac3a64812a7d72eb0d67e2cf0fb0e2a0363126c0f8d4b407c4e25be3a3"));
const deleteUser = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("f93878014dae843adec45fd2df49288c5483906aa680edee208287fc0db4385a"));
const $$splitComponentImporter$3 = () => import("./roles-Bs6RIIE2.mjs");
const Route$3 = createFileRoute("/dashboard/roles")({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session || session.role !== "admin") {
      throw redirect({
        to: "/dashboard/patients"
      });
    }
  },
  loader: () => getUsers(),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const getPatients = createServerFn({
  method: "GET"
}).handler(createSsrRpc("5a937e13e92e0c6e6a228fe017ffc8febc934eeaaeebcdcb0638305331d6723f"));
const getPatient = createServerFn({
  method: "GET"
}).inputValidator((data) => data).handler(createSsrRpc("55d4428e4e5a6fbe50e12d02edd6d7ea4fe01da77e9f00a0b5d4fb46ee1bac99"));
const createPatient = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("375a9302722c176876d86621a13b37a5b2594525c6ca2bae54043c74ada1e2b9"));
const updatePatient = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createSsrRpc("fea45675ad74b16dcaab20939ca48a8f2302e079e0051d5562fcb9e267f77e72"));
const $$splitComponentImporter$2 = () => import("./index-CgC4nwOe.mjs");
const Route$2 = createFileRoute("/dashboard/patients/")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  loader: () => getPatients()
});
const $$splitComponentImporter$1 = () => import("./new-Cj8srFiK.mjs");
const Route$1 = createFileRoute("/dashboard/patients/new")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("../_patientId-DKJbo3yF.mjs");
const Route = createFileRoute("/dashboard/patients/$patientId")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  loader: ({
    params
  }) => getPatient({
    data: {
      id: params.patientId
    }
  })
});
const ResetPasswordRoute = Route$a.update({
  id: "/reset-password",
  path: "/reset-password",
  getParentRoute: () => Route$b
});
const RegisterRoute = Route$9.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$b
});
const LoginRoute = Route$8.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$b
});
const ForgotPasswordRoute = Route$7.update({
  id: "/forgot-password",
  path: "/forgot-password",
  getParentRoute: () => Route$b
});
const DashboardRoute = Route$6.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$b
});
const IndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$b
});
const DashboardIndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => DashboardRoute
});
const DashboardRolesRoute = Route$3.update({
  id: "/roles",
  path: "/roles",
  getParentRoute: () => DashboardRoute
});
const DashboardPatientsIndexRoute = Route$2.update({
  id: "/patients/",
  path: "/patients/",
  getParentRoute: () => DashboardRoute
});
const DashboardPatientsNewRoute = Route$1.update({
  id: "/patients/new",
  path: "/patients/new",
  getParentRoute: () => DashboardRoute
});
const DashboardPatientsPatientIdRoute = Route.update({
  id: "/patients/$patientId",
  path: "/patients/$patientId",
  getParentRoute: () => DashboardRoute
});
const DashboardRouteChildren = {
  DashboardRolesRoute,
  DashboardIndexRoute,
  DashboardPatientsPatientIdRoute,
  DashboardPatientsNewRoute,
  DashboardPatientsIndexRoute
};
const DashboardRouteWithChildren = DashboardRoute._addFileChildren(
  DashboardRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  DashboardRoute: DashboardRouteWithChildren,
  ForgotPasswordRoute,
  LoginRoute,
  RegisterRoute,
  ResetPasswordRoute
};
const routeTree = Route$b._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$9 as R,
  Route$3 as a,
  Route$2 as b,
  createUser as c,
  deleteUser as d,
  Route$1 as e,
  createPatient as f,
  Route$6 as g,
  createSsrRpc as h,
  Route as i,
  updatePatient as j,
  router as r,
  updateUserRole as u
};
