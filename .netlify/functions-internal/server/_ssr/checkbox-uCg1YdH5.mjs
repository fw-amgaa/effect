import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./input-DpwQ1gn2.mjs";
import { T as TWr } from "../_libs/hugeicons__core-free-icons.mjs";
import { H as HugeiconsIcon } from "../_libs/hugeicons__react.mjs";
import { C as CheckboxRoot, a as CheckboxIndicator } from "../_libs/base-ui__react.mjs";
function Checkbox({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxRoot,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[5px] border border-transparent bg-input/90 transition-shadow outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        CheckboxIndicator,
        {
          "data-slot": "checkbox-indicator",
          className: "grid place-content-center text-current transition-none [&>svg]:size-3.5",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: TWr, strokeWidth: 2 })
        }
      )
    }
  );
}
export {
  Checkbox as C
};
