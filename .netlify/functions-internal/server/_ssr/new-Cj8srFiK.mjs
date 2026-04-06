import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { P as PatientForm } from "./patient-form-DehEBV1h.mjs";
import { e as Route$1 } from "./router-BR745k5G.mjs";
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
import "./input-DpwQ1gn2.mjs";
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
import "./select-COsLrdLe.mjs";
import "../_libs/hugeicons__core-free-icons.mjs";
import "../_libs/hugeicons__react.mjs";
import "./checkbox-uCg1YdH5.mjs";
import "./constants-CNvrnp7p.mjs";
import "../_libs/sonner.mjs";
import "./index.mjs";
import "node:async_hooks";
function NewPatientPage() {
  const {
    user
  } = Route$1.useRouteContext();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PatientForm, { user, onSuccess: () => navigate({
    to: "/dashboard/patients"
  }) }) });
}
export {
  NewPatientPage as component
};
