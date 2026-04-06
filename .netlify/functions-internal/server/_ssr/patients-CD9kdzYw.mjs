import { c as createServerRpc, d as db, p as patients, a as patientTests } from "./index-BQMbZR5s.mjs";
import { c as createServerFn } from "./index.mjs";
import { d as desc, j as eq } from "../_libs/drizzle-orm.mjs";
import "../_libs/postgres.mjs";
import "os";
import "fs";
import "net";
import "tls";
import "crypto";
import "stream";
import "perf_hooks";
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
const getPatients_createServerFn_handler = createServerRpc({
  id: "5a937e13e92e0c6e6a228fe017ffc8febc934eeaaeebcdcb0638305331d6723f",
  name: "getPatients",
  filename: "src/server/patients.ts"
}, (opts) => getPatients.__executeServer(opts));
const getPatients = createServerFn({
  method: "GET"
}).handler(getPatients_createServerFn_handler, async () => {
  const result = await db.select().from(patients).orderBy(desc(patients.createdAt));
  return result;
});
const getPatient_createServerFn_handler = createServerRpc({
  id: "55d4428e4e5a6fbe50e12d02edd6d7ea4fe01da77e9f00a0b5d4fb46ee1bac99",
  name: "getPatient",
  filename: "src/server/patients.ts"
}, (opts) => getPatient.__executeServer(opts));
const getPatient = createServerFn({
  method: "GET"
}).inputValidator((data) => data).handler(getPatient_createServerFn_handler, async ({
  data
}) => {
  const [patient] = await db.select().from(patients).where(eq(patients.id, data.id));
  if (!patient) return null;
  const tests = await db.select().from(patientTests).where(eq(patientTests.patientId, data.id)).orderBy(patientTests.createdAt);
  return {
    ...patient,
    tests
  };
});
const createPatient_createServerFn_handler = createServerRpc({
  id: "375a9302722c176876d86621a13b37a5b2594525c6ca2bae54043c74ada1e2b9",
  name: "createPatient",
  filename: "src/server/patients.ts"
}, (opts) => createPatient.__executeServer(opts));
const createPatient = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(createPatient_createServerFn_handler, async ({
  data
}) => {
  const [patient] = await db.insert(patients).values({
    firstName: data.firstName,
    lastName: data.lastName,
    age: data.age,
    gender: data.gender,
    dateOfBirth: data.dateOfBirth,
    phone: data.phone,
    email: data.email || null,
    createdBy: data.createdBy || null
  }).returning();
  if (data.testTypes && data.testTypes.length > 0) {
    await db.insert(patientTests).values(data.testTypes.map((testType) => ({
      patientId: patient.id,
      testType
    })));
  }
  return patient;
});
const updatePatient_createServerFn_handler = createServerRpc({
  id: "fea45675ad74b16dcaab20939ca48a8f2302e079e0051d5562fcb9e267f77e72",
  name: "updatePatient",
  filename: "src/server/patients.ts"
}, (opts) => updatePatient.__executeServer(opts));
const updatePatient = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(updatePatient_createServerFn_handler, async ({
  data
}) => {
  const {
    id,
    ...values
  } = data;
  const [patient] = await db.update(patients).set({
    ...values,
    email: values.email || null
  }).where(eq(patients.id, id)).returning();
  return patient;
});
export {
  createPatient_createServerFn_handler,
  getPatient_createServerFn_handler,
  getPatients_createServerFn_handler,
  updatePatient_createServerFn_handler
};
