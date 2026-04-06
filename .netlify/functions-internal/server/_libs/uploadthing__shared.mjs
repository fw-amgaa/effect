import { ar as Error$1, ak as isRecord, as as isNumber, at as isString, au as TaggedError, a1 as Tag, av as gen, aw as withTrace, ax as sync, ay as string, az as tryPromise, aA as map, aB as encodeHex, ao as value } from "./effect.mjs";
import { S as Sqids, d as defaultOptions } from "./sqids.mjs";
const ValidContentDispositions = ["inline", "attachment"];
const ValidACLs = ["public-read", "private"];
(class extends TaggedError("InvalidRouteConfig") {
  constructor(type, field) {
    const reason = field ? `Expected route config to have a ${field} for key ${type} but none was found.` : `Encountered an invalid route config during backfilling. ${type} was not found.`;
    super({ reason });
  }
});
(class extends TaggedError("UnknownFileType") {
  constructor(fileName) {
    const reason = `Could not determine type for ${fileName}`;
    super({ reason });
  }
});
(class extends TaggedError("InvalidFileType") {
  constructor(fileType, fileName) {
    const reason = `File type ${fileType} not allowed for ${fileName}`;
    super({ reason });
  }
});
(class extends TaggedError("InvalidFileSize") {
  constructor(fileSize) {
    const reason = `Invalid file size: ${fileSize}`;
    super({ reason });
  }
});
(class extends TaggedError("InvalidURL") {
  constructor(attemptedUrl) {
    super({ reason: `Failed to parse '${attemptedUrl}' as a URL.` });
  }
});
(class extends TaggedError("RetryError") {
});
(class extends TaggedError("FetchError") {
});
(class extends TaggedError("InvalidJson") {
});
(class extends TaggedError("BadRequestError") {
  getMessage() {
    if (isRecord(this.json)) {
      if (typeof this.json.message === "string") return this.json.message;
    }
    return this.message;
  }
});
(class extends TaggedError("UploadAborted") {
});
(class extends TaggedError("UploadAborted") {
});
function filterDefinedObjectValues(obj) {
  return Object.fromEntries(Object.entries(obj).filter((pair) => pair[1] != null));
}
function parseTimeToSeconds(time) {
  if (typeof time === "number") return time;
  const match = time.split(/(\d+)/).filter(Boolean);
  const num = Number(match[0]);
  const unit = (match[1] ?? "s").trim().slice(0, 1);
  const multiplier = {
    s: 1,
    m: 60,
    h: 3600,
    d: 86400
  }[unit];
  return num * multiplier;
}
function messageFromUnknown(cause, fallback) {
  if (typeof cause === "string") return cause;
  if (cause instanceof Error) return cause.message;
  if (cause && typeof cause === "object" && "message" in cause && typeof cause.message === "string") return cause.message;
  return fallback ?? "An unknown error occurred";
}
var UploadThingError = class UploadThingError2 extends Error$1 {
  _tag = "UploadThingError";
  name = "UploadThingError";
  cause;
  code;
  data;
  constructor(initOpts) {
    const opts = typeof initOpts === "string" ? {
      code: "INTERNAL_SERVER_ERROR",
      message: initOpts
    } : initOpts;
    const message = opts.message ?? messageFromUnknown(opts.cause, opts.code);
    super({ message });
    this.code = opts.code;
    this.data = opts.data;
    if (opts.cause instanceof Error) this.cause = opts.cause;
    else if (isRecord(opts.cause) && isNumber(opts.cause.status) && isString(opts.cause.statusText)) this.cause = /* @__PURE__ */ new Error(`Response ${opts.cause.status} ${opts.cause.statusText}`);
    else if (isString(opts.cause)) this.cause = new Error(opts.cause);
    else this.cause = opts.cause;
  }
  static toObject(error) {
    return {
      code: error.code,
      message: error.message,
      data: error.data
    };
  }
  static serialize(error) {
    return JSON.stringify(UploadThingError2.toObject(error));
  }
};
(class extends Tag("uploadthing/Fetch")() {
});
const signaturePrefix = "hmac-sha256=";
const algorithm = {
  name: "HMAC",
  hash: "SHA-256"
};
const encoder = new TextEncoder();
function shuffle(str, seed) {
  const chars = str.split("");
  const seedNum = string(seed);
  let temp;
  let j;
  for (let i = 0; i < chars.length; i++) {
    j = (seedNum % (i + 1) + i) % chars.length;
    temp = chars[i];
    chars[i] = chars[j];
    chars[j] = temp;
  }
  return chars.join("");
}
const signPayload = (payload, secret) => gen(function* () {
  const signingKey = yield* tryPromise({
    try: () => crypto.subtle.importKey("raw", encoder.encode(value(secret)), algorithm, false, ["sign"]),
    catch: (e) => new UploadThingError({
      code: "BAD_REQUEST",
      message: "Invalid signing secret",
      cause: e
    })
  });
  const signature = yield* map(tryPromise({
    try: () => crypto.subtle.sign(algorithm, signingKey, encoder.encode(payload)),
    catch: (e) => new UploadThingError({
      code: "BAD_REQUEST",
      cause: e
    })
  }), (arrayBuffer) => encodeHex(new Uint8Array(arrayBuffer)));
  return `${signaturePrefix}${signature}`;
}).pipe(withTrace("signPayload"));
const generateKey = (file, appId, getHashParts) => sync(() => {
  const hashParts = JSON.stringify([
    file.name,
    file.size,
    file.type,
    file.lastModified,
    Date.now()
  ]);
  const alphabet = shuffle(defaultOptions.alphabet, appId);
  const encodedFileSeed = new Sqids({
    alphabet,
    minLength: 36
  }).encode([Math.abs(string(hashParts))]);
  const encodedAppId = new Sqids({
    alphabet,
    minLength: 12
  }).encode([Math.abs(string(appId))]);
  return encodedAppId + encodedFileSeed;
}).pipe(withTrace("generateKey"));
const generateSignedURL = (url, secretKey, opts) => gen(function* () {
  const parsedURL = new URL(url);
  const ttl = opts.ttlInSeconds ? parseTimeToSeconds(opts.ttlInSeconds) : 3600;
  const expirationTime = Date.now() + ttl * 1e3;
  parsedURL.searchParams.append("expires", expirationTime.toString());
  if (opts.data) Object.entries(opts.data).forEach(([key, value2]) => {
    if (value2 == null) return;
    const encoded = encodeURIComponent(value2);
    parsedURL.searchParams.append(key, encoded);
  });
  const signature = yield* signPayload(parsedURL.toString(), secretKey);
  parsedURL.searchParams.append("signature", signature);
  return parsedURL.href;
}).pipe(withTrace("generateSignedURL"));
export {
  UploadThingError as U,
  ValidContentDispositions as V,
  ValidACLs as a,
  generateKey as b,
  filterDefinedObjectValues as f,
  generateSignedURL as g,
  parseTimeToSeconds as p
};
