import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Button, c as cn } from "./input-DpwQ1gn2.mjs";
import { i as dp } from "../_libs/hugeicons__core-free-icons.mjs";
import { H as HugeiconsIcon } from "../_libs/hugeicons__react.mjs";
import { D as DialogRoot, b as DialogTrigger$1, c as DialogPopup, d as DialogClose$1, e as DialogTitle$1, f as DialogPortal$1, g as DialogBackdrop, A as AlertDialogRoot, h as DialogDescription } from "../_libs/base-ui__react.mjs";
function Dialog({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DialogRoot, { "data-slot": "dialog", ...props });
}
function DialogTrigger({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger$1, { "data-slot": "dialog-trigger", ...props });
}
function DialogPortal({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DialogPortal$1, { "data-slot": "dialog-portal", ...props });
}
function DialogClose({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose$1, { "data-slot": "dialog-close", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogBackdrop,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "fixed inset-0 isolate z-50 bg-black/30 duration-100 supports-backdrop-filter:backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DialogPopup,
      {
        "data-slot": "dialog-content",
        className: cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-6 rounded-4xl bg-popover p-6 text-sm text-popover-foreground shadow-xl ring-1 ring-foreground/5 duration-100 outline-none sm:max-w-md dark:ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            DialogClose$1,
            {
              "data-slot": "dialog-close",
              render: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  className: "absolute top-4 right-4 bg-secondary",
                  size: "icon-sm"
                }
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(HugeiconsIcon, { icon: dp, strokeWidth: 2 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-1.5", className),
      ...props
    }
  );
}
function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props,
      children: [
        children,
        showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose$1, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: "Close" })
      ]
    }
  );
}
function DialogTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogTitle$1,
    {
      "data-slot": "dialog-title",
      className: cn(
        "font-heading text-base leading-none font-medium",
        className
      ),
      ...props
    }
  );
}
function AlertDialog({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogRoot, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger$1, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogPortal({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DialogPortal$1, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogBackdrop,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "fixed inset-0 isolate z-50 bg-black/30 duration-100 supports-backdrop-filter:backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogPopup,
      {
        "data-slot": "alert-dialog-content",
        "data-size": size,
        className: cn(
          "group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-6 rounded-4xl bg-popover p-6 text-popover-foreground shadow-xl ring-1 ring-foreground/5 duration-100 outline-none data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-md dark:ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        className
      ),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogTitle$1,
    {
      "data-slot": "alert-dialog-title",
      className: cn(
        "font-heading text-lg font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className
      ),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogDescription,
    {
      "data-slot": "alert-dialog-description",
      className: cn(
        "text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      ),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      "data-slot": "alert-dialog-action",
      className: cn(className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogClose$1,
    {
      "data-slot": "alert-dialog-cancel",
      className: cn(className),
      render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant, size }),
      ...props
    }
  );
}
export {
  AlertDialog as A,
  Dialog as D,
  DialogTrigger as a,
  DialogContent as b,
  DialogHeader as c,
  DialogTitle as d,
  DialogClose as e,
  AlertDialogTrigger as f,
  AlertDialogContent as g,
  AlertDialogHeader as h,
  AlertDialogTitle as i,
  AlertDialogDescription as j,
  AlertDialogFooter as k,
  AlertDialogCancel as l,
  AlertDialogAction as m,
  DialogFooter as n
};
