import { c as createServerRpc } from "./index-BQMbZR5s.mjs";
import { a as auth } from "./index-C9kMosrQ.mjs";
import { c as createServerFn, g as getRequest } from "./index.mjs";
import "../_libs/postgres.mjs";
import "os";
import "fs";
import "net";
import "tls";
import "crypto";
import "stream";
import "perf_hooks";
import "../_libs/drizzle-orm.mjs";
import "./error-codes-DHWAkvSO.mjs";
import "../_libs/zod.mjs";
import "node:fs";
import "node:fs/promises";
import "node:os";
import "node:path";
import "../_libs/resend.mjs";
import "../_libs/postal-mime.mjs";
import "../_libs/svix.mjs";
import "../_libs/uuid.mjs";
import "node:crypto";
import "../_libs/standardwebhooks.mjs";
import "../_libs/stablelib__base64.mjs";
import "../_libs/fast-sha256.mjs";
import "node:async_hooks";
import "node:stream";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "node:stream/web";
import "../_libs/react.mjs";
import "../_libs/@opentelemetry/semantic-conventions.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "../_libs/isbot.mjs";
const getSession_createServerFn_handler = createServerRpc({
  id: "a25ee52c3707674a0708759ce51bbede27783305d5c10599240f3902a9f63a55",
  name: "getSession",
  filename: "src/server/auth.ts"
}, (opts) => getSession.__executeServer(opts));
const getSession = createServerFn({
  method: "GET"
}).handler(getSession_createServerFn_handler, async () => {
  const request = getRequest();
  const session = await auth.api.getSession({
    headers: request.headers
  });
  if (!session) return null;
  return session.user;
});
export {
  getSession_createServerFn_handler
};
