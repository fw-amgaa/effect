globalThis.__nitro_main__ = import.meta.url;
import { H as HTTPError, d as defineEventHandler, g as getRequestURL, a as getMethod, b as getRequestHeaders, r as readRawBody, s as setResponseStatus, c as setResponseHeaders, e as toEventHandler, f as defineLazyEventHandler, h as H3Core } from "./_libs/h3.mjs";
import { N as NodeResponse } from "./_libs/srvx.mjs";
import { b as betterAuth, a as admin } from "./_libs/better-auth.mjs";
import { P as Postgres } from "./_libs/postgres.mjs";
import { p as pgTable, t as timestamp, m as text, q as boolean, v as uuid, r as date, u as integer, w as drizzle } from "./_libs/drizzle-orm.mjs";
import { R as Resend } from "./_libs/resend.mjs";
import { d as drizzleAdapter } from "./_libs/better-auth__drizzle-adapter.mjs";
import "./_libs/rou3.mjs";
import "node:stream";
import "./_libs/better-auth__core.mjs";
import "./_libs/better-call.mjs";
import "./_libs/better-auth__utils.mjs";
import "./_libs/zod.mjs";
import "./_libs/better-fetch__fetch.mjs";
import "./_libs/jose.mjs";
import "./_libs/@opentelemetry/semantic-conventions.mjs";
import "./_libs/opentelemetry__api.mjs";
import "./_libs/better-auth__kysely-adapter.mjs";
import "./_libs/kysely.mjs";
import "./_libs/defu.mjs";
import "./_libs/noble__hashes.mjs";
import "./_libs/noble__ciphers.mjs";
import "./_libs/better-auth__telemetry.mjs";
import "node:fs";
import "node:fs/promises";
import "node:os";
import "node:path";
import "os";
import "fs";
import "net";
import "tls";
import "crypto";
import "stream";
import "perf_hooks";
import "./_libs/postal-mime.mjs";
import "./_libs/svix.mjs";
import "./_libs/uuid.mjs";
import "node:crypto";
import "./_libs/standardwebhooks.mjs";
import "./_libs/stablelib__base64.mjs";
import "./_libs/fast-sha256.mjs";
function lazyService(loader) {
  let promise, mod;
  return {
    fetch(req) {
      if (mod) {
        return mod.fetch(req);
      }
      if (!promise) {
        promise = loader().then((_mod) => mod = _mod.default || _mod);
      }
      return promise.then((mod2) => mod2.fetch(req));
    }
  };
}
const services = {
  ["ssr"]: lazyService(() => import("./_ssr/index.mjs"))
};
globalThis.__nitro_vite_envs__ = services;
const errorHandler$1 = (error, event) => {
  const res = defaultHandler(error, event);
  return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
  const unhandled = error.unhandled ?? !HTTPError.isError(error);
  const { status = 500, statusText = "" } = unhandled ? {} : error;
  if (status === 404) {
    const url = event.url || new URL(event.req.url);
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      return {
        status: 302,
        headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
      };
    }
  }
  const headers2 = new Headers(unhandled ? {} : error.headers);
  headers2.set("content-type", "application/json; charset=utf-8");
  const jsonBody = unhandled ? {
    status,
    unhandled: true
  } : typeof error.toJSON === "function" ? error.toJSON() : {
    status,
    statusText,
    message: error.message
  };
  return {
    status,
    statusText,
    headers: headers2,
    body: {
      error: true,
      ...jsonBody
    }
  };
}
const errorHandlers = [errorHandler$1];
async function errorHandler(error, event) {
  for (const handler2 of errorHandlers) {
    try {
      const response = await handler2(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch (error2) {
      console.error(error2);
    }
  }
}
const headers = ((m) => function headersRouteRule(event) {
  for (const [key, value] of Object.entries(m.options || {})) {
    event.res.headers.set(key, value);
  }
});
const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  role: text("role").default("staff"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires", { withTimezone: true })
});
const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by")
});
const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", { withTimezone: true }),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { withTimezone: true }),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
});
const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
});
const patients = pgTable("patients", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  age: integer("age").notNull(),
  gender: text("gender", { enum: ["male", "female"] }).notNull(),
  dateOfBirth: date("date_of_birth").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  createdBy: text("created_by").references(() => user.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});
const patientTests = pgTable("patient_tests", {
  id: uuid("id").primaryKey().defaultRandom(),
  patientId: uuid("patient_id").notNull().references(() => patients.id, { onDelete: "cascade" }),
  testType: text("test_type").notNull(),
  status: text("status", { enum: ["pending", "complete"] }).notNull().default("pending"),
  fileUrl: text("file_url"),
  fileName: text("file_name"),
  emailSent: boolean("email_sent").notNull().default(false),
  emailSentAt: timestamp("email_sent_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
});
const schema = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  account,
  patientTests,
  patients,
  session,
  user,
  verification
});
const connectionString = process.env.DATABASE_URL;
const client = Postgres(connectionString, { prepare: false });
const db = drizzle(client, { schema });
const resend = new Resend(process.env.RESEND_API_KEY);
const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg"
  }),
  basePath: "/api/auth",
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user: user2, url }) => {
      await resend.emails.send({
        from: "Effect Med <onboarding@resend.dev>",
        to: user2.email,
        subject: "Нууц үг сэргээх - Эффект Эмнэлэг",
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:#ffffff;border-radius:12px;overflow:hidden;">
        <tr><td style="background-color:#00639c;padding:24px 32px;text-align:center;">
          <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:600;">Эффект Эмнэлэг</h1>
        </td></tr>
        <tr><td style="padding:32px;">
          <h2 style="margin:0 0 16px;font-size:18px;color:#0b1c30;">Нууц үг сэргээх</h2>
          <p style="margin:0 0 24px;font-size:14px;color:#334155;line-height:1.6;">
            Таны бүртгэлтэй имэйл хаягаар нууц үг сэргээх хүсэлт ирлээ. Доорх товч дээр дарж шинэ нууц үг тохируулна уу.
          </p>
          <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
            <tr><td style="background-color:#4a9fe5;border-radius:8px;padding:12px 24px;">
              <a href="${url}" style="color:#ffffff;text-decoration:none;font-size:14px;font-weight:500;">
                Нууц үг сэргээх
              </a>
            </td></tr>
          </table>
          <p style="margin:24px 0 0;font-size:12px;color:#94a3b8;line-height:1.6;">
            Хэрэв та энэ хүсэлтийг илгээгээгүй бол энэ имэйлийг үл тоомсорлоно уу.
          </p>
        </td></tr>
        <tr><td style="padding:20px 32px;border-top:1px solid #e2e8f0;text-align:center;">
          <p style="margin:0;font-size:12px;color:#94a3b8;">Эффект Эмнэлэг</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
      });
    }
  },
  plugins: [admin()],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "staff",
        input: true
      }
    }
  }
});
const _xEe9Ng = defineEventHandler(async (event) => {
  const url = getRequestURL(event);
  if (url.pathname.startsWith("/api/auth")) {
    const method = getMethod(event);
    const headers2 = getRequestHeaders(event);
    const body = method !== "GET" && method !== "HEAD" ? await readRawBody(event) : void 0;
    const request = new Request(url.href, {
      method,
      headers: headers2,
      body: body || void 0
    });
    const response = await auth.handler(request);
    setResponseStatus(event, response.status);
    const responseHeaders = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });
    setResponseHeaders(event, responseHeaders);
    return response.text();
  }
});
const findRouteRules = /* @__PURE__ */ (() => {
  const $0 = [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }];
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    let s = p.split("/"), l = s.length;
    if (l > 1) {
      if (s[1] === "assets") {
        r.unshift({ data: $0, params: { "_": s.slice(2).join("/") } });
      }
    }
    return r;
  };
})();
const _lazy_frz3r6 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_frz3r6 };
  return ((_m, p) => {
    return { data, params: { "_": p.slice(1) } };
  });
})();
const globalMiddleware = [
  toEventHandler(_xEe9Ng)
].filter(Boolean);
const APP_ID = "default";
function useNitroApp() {
  let instance = useNitroApp._instance;
  if (instance) {
    return instance;
  }
  instance = useNitroApp._instance = createNitroApp();
  globalThis.__nitro__ = globalThis.__nitro__ || {};
  globalThis.__nitro__[APP_ID] = instance;
  return instance;
}
function createNitroApp() {
  const hooks = void 0;
  const captureError = (error, errorCtx) => {
    if (errorCtx?.event) {
      const errors = errorCtx.event.req.context?.nitro?.errors;
      if (errors) {
        errors.push({
          error,
          context: errorCtx
        });
      }
    }
  };
  const h3App = createH3App({ onError(error, event) {
    return errorHandler(error, event);
  } });
  let appHandler = (req) => {
    req.context ||= {};
    req.context.nitro = req.context.nitro || { errors: [] };
    return h3App.fetch(req);
  };
  const app = {
    fetch: appHandler,
    h3: h3App,
    hooks,
    captureError
  };
  return app;
}
function createH3App(config) {
  const h3App = new H3Core(config);
  h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
  h3App["~middleware"].push(...globalMiddleware);
  {
    h3App["~getMiddleware"] = (event, route) => {
      const pathname = event.url.pathname;
      const method = event.req.method;
      const middleware = [];
      {
        const routeRules = getRouteRules(method, pathname);
        event.context.routeRules = routeRules?.routeRules;
        if (routeRules?.routeRuleMiddleware.length) {
          middleware.push(...routeRules.routeRuleMiddleware);
        }
      }
      middleware.push(...h3App["~middleware"]);
      if (route?.data?.middleware?.length) {
        middleware.push(...route.data.middleware);
      }
      return middleware;
    };
  }
  return h3App;
}
function getRouteRules(method, pathname) {
  const m = findRouteRules(method, pathname);
  if (!m?.length) {
    return { routeRuleMiddleware: [] };
  }
  const routeRules = {};
  for (const layer of m) {
    for (const rule of layer.data) {
      const currentRule = routeRules[rule.name];
      if (currentRule) {
        if (rule.options === false) {
          delete routeRules[rule.name];
          continue;
        }
        if (typeof currentRule.options === "object" && typeof rule.options === "object") {
          currentRule.options = {
            ...currentRule.options,
            ...rule.options
          };
        } else {
          currentRule.options = rule.options;
        }
        currentRule.route = rule.route;
        currentRule.params = {
          ...currentRule.params,
          ...layer.params
        };
      } else if (rule.options !== false) {
        routeRules[rule.name] = {
          ...rule,
          params: layer.params
        };
      }
    }
  }
  const middleware = [];
  for (const rule of Object.values(routeRules)) {
    if (rule.options === false || !rule.handler) {
      continue;
    }
    middleware.push(rule.handler(rule));
  }
  return {
    routeRules,
    routeRuleMiddleware: middleware
  };
}
const nitroApp = useNitroApp();
const ONE_YEAR_IN_SECONDS = 365 * 24 * 60 * 60;
const handler = async (req) => {
  req.runtime ??= { name: "netlify" };
  req.ip ??= req.headers.get("x-nf-client-connection-ip") || void 0;
  const response = await nitroApp.fetch(req);
  const isr = (req.context?.routeRules || {})?.isr?.options;
  if (isr) {
    const maxAge = typeof isr === "number" ? isr : ONE_YEAR_IN_SECONDS;
    const revalidateDirective = typeof isr === "number" ? `stale-while-revalidate=${ONE_YEAR_IN_SECONDS}` : "must-revalidate";
    if (!response.headers.has("Cache-Control")) {
      response.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
    }
    response.headers.set("Netlify-CDN-Cache-Control", `public, max-age=${maxAge}, ${revalidateDirective}, durable`);
  }
  return response;
};
export {
  handler as default
};
