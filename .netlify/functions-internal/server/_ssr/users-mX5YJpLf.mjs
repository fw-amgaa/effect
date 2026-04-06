import { c as createServerRpc, d as db, u as user } from "./index-BQMbZR5s.mjs";
import { a as auth } from "./index-C9kMosrQ.mjs";
import { c as createServerFn, g as getRequest } from "./index.mjs";
import { j as eq } from "../_libs/drizzle-orm.mjs";
import "../_libs/postgres.mjs";
import "os";
import "fs";
import "net";
import "tls";
import "crypto";
import "stream";
import "perf_hooks";
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
const getUsers_createServerFn_handler = createServerRpc({
  id: "7660757b97881869d0dcce816e055a8f4aaca7418cb413adc5189b7442f43b2f",
  name: "getUsers",
  filename: "src/server/users.ts"
}, (opts) => getUsers.__executeServer(opts));
const getUsers = createServerFn({
  method: "GET"
}).handler(getUsers_createServerFn_handler, async () => {
  const result = await db.select().from(user).orderBy(user.createdAt);
  return result;
});
const createUser_createServerFn_handler = createServerRpc({
  id: "10241ab2790d2258d4f3bd091d1ed42e8b296e2992c89607209340ece672a81a",
  name: "createUser",
  filename: "src/server/users.ts"
}, (opts) => createUser.__executeServer(opts));
const createUser = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createUser_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  try {
    const body = {
      email: data.email,
      password: data.password,
      name: data.fullName,
      role: data.role
    };
    await auth.api.createUser({
      headers: request.headers,
      body
    });
    return {
      error: null
    };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Хэрэглэгч үүсгэхэд алдаа гарлаа"
    };
  }
});
const updateUserRole_createServerFn_handler = createServerRpc({
  id: "1c0931ac3a64812a7d72eb0d67e2cf0fb0e2a0363126c0f8d4b407c4e25be3a3",
  name: "updateUserRole",
  filename: "src/server/users.ts"
}, (opts) => updateUserRole.__executeServer(opts));
const updateUserRole = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(updateUserRole_createServerFn_handler, async ({
  data
}) => {
  const [updated] = await db.update(user).set({
    role: data.role
  }).where(eq(user.id, data.userId)).returning();
  return updated;
});
const deleteUser_createServerFn_handler = createServerRpc({
  id: "f93878014dae843adec45fd2df49288c5483906aa680edee208287fc0db4385a",
  name: "deleteUser",
  filename: "src/server/users.ts"
}, (opts) => deleteUser.__executeServer(opts));
const deleteUser = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(deleteUser_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  try {
    await auth.api.removeUser({
      headers: request.headers,
      body: {
        userId: data.userId
      }
    });
    return {
      success: true
    };
  } catch {
    await db.delete(user).where(eq(user.id, data.userId));
    return {
      success: true
    };
  }
});
export {
  createUser_createServerFn_handler,
  deleteUser_createServerFn_handler,
  getUsers_createServerFn_handler,
  updateUserRole_createServerFn_handler
};
