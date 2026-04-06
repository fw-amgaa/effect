import { c as createServerRpc, d as db, a as patientTests } from "./index-BQMbZR5s.mjs";
import { U as UTApi } from "../_libs/uploadthing.mjs";
import { c as createServerFn } from "./index.mjs";
import { j as eq } from "../_libs/drizzle-orm.mjs";
import "../_libs/postgres.mjs";
import "os";
import "fs";
import "net";
import "tls";
import "crypto";
import "stream";
import "perf_hooks";
import "../_libs/uploadthing__shared.mjs";
import "../_libs/effect.mjs";
import "../_libs/sqids.mjs";
import "../_libs/effect__platform.mjs";
import "../_libs/@opentelemetry/semantic-conventions.mjs";
import "../_libs/uploadthing__mime-types.mjs";
import "node:async_hooks";
import "node:stream";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "node:stream/web";
import "../_libs/react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "async_hooks";
import "../_libs/isbot.mjs";
const utapi = new UTApi();
const uploadTestFile_createServerFn_handler = createServerRpc({
  id: "eb503ad03f2c4381095c2435a887a3d49e407ae5feed68e43354ce18fe2c2810",
  name: "uploadTestFile",
  filename: "src/server/tests.ts"
}, (opts) => uploadTestFile.__executeServer(opts));
const uploadTestFile = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(uploadTestFile_createServerFn_handler, async ({
  data: formData
}) => {
  const file = formData.get("file");
  const testId = formData.get("testId");
  if (!file || !testId) {
    return {
      error: "Файл эсвэл шинжилгээний ID олдсонгүй"
    };
  }
  try {
    const response = await utapi.uploadFiles(file);
    if (response.error) {
      return {
        error: response.error.message
      };
    }
    const [test] = await db.update(patientTests).set({
      fileUrl: response.data.ufsUrl,
      fileName: file.name,
      status: "complete",
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(patientTests.id, testId)).returning();
    return {
      error: null,
      test
    };
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : "Файл хуулахад алдаа гарлаа"
    };
  }
});
const updateTestFile_createServerFn_handler = createServerRpc({
  id: "6ac3ac6c9787ffe066d9c178e47ed1ec3fae33c46726656722eeaec14d97a90a",
  name: "updateTestFile",
  filename: "src/server/tests.ts"
}, (opts) => updateTestFile.__executeServer(opts));
const updateTestFile = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(updateTestFile_createServerFn_handler, async ({
  data
}) => {
  const [test] = await db.update(patientTests).set({
    fileUrl: data.fileUrl,
    fileName: data.fileName,
    status: "complete",
    updatedAt: /* @__PURE__ */ new Date()
  }).where(eq(patientTests.id, data.testId)).returning();
  return test;
});
const addTestToPatient_createServerFn_handler = createServerRpc({
  id: "39b0fe015538a01424ff04c0e1da2ad7754d4176fae9ba292f12038efd99f556",
  name: "addTestToPatient",
  filename: "src/server/tests.ts"
}, (opts) => addTestToPatient.__executeServer(opts));
const addTestToPatient = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(addTestToPatient_createServerFn_handler, async ({
  data
}) => {
  const [test] = await db.insert(patientTests).values({
    patientId: data.patientId,
    testType: data.testType
  }).returning();
  return test;
});
const deleteTest_createServerFn_handler = createServerRpc({
  id: "958b43e852800dc4e91df3dd3d4a71120afb6d8821562b4341d1afdb4161227e",
  name: "deleteTest",
  filename: "src/server/tests.ts"
}, (opts) => deleteTest.__executeServer(opts));
const deleteTest = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(deleteTest_createServerFn_handler, async ({
  data
}) => {
  await db.delete(patientTests).where(eq(patientTests.id, data.testId));
  return {
    success: true
  };
});
export {
  addTestToPatient_createServerFn_handler,
  deleteTest_createServerFn_handler,
  updateTestFile_createServerFn_handler,
  uploadTestFile_createServerFn_handler
};
