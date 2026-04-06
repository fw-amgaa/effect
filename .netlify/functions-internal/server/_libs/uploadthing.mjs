import { V as ValidContentDispositions, a as ValidACLs, f as filterDefinedObjectValues, U as UploadThingError, p as parseTimeToSeconds, g as generateSignedURL, b as generateKey } from "./uploadthing__shared.mjs";
import { U as Uint8ArrayFromBase64, c as compose, p as parseJson, t as transform, a as Uint8ArrayFromSelf, S as String$, L as Literal, b as Struct, o as optionalWith, N as NonEmptyArray, R as Redacted, s as startsWith, C as Class, d as Number$, e as optional, f as NullOr, B as Boolean$, g as Unknown, A as Array$, h as provideMerge, i as succeed, j as effectDiscard, u as update, k as provide, m as mergeAll, l as setConfigProvider, n as make, q as fromJson, r as orElse, v as fromEnv, w as fromMap, x as nested, y as constantCase, z as boolean, D as orElse$1, E as succeed$1, F as map, G as withDefault, H as Config, I as catchTags, J as string, K as mapAttempt, M as fn, O as literal, P as Info, Q as andThen, T as minimumLogLevel, V as tapError, W as logError, X as annotateLogs, Y as catchTag, Z as unwrapEffect, _ as gen, $ as Logger, a0 as TaggedError, a1 as Tag, a2 as mapOrFail, a3 as allLevels, a4 as left, a5 as InvalidData, a6 as right, a7 as nested$1, a8 as fromLiteral, a9 as flatMap, aa as _void, ab as logWithLevel, ac as withLogSpan, ad as squash, ae as forEach, af as ensure, ag as match, ah as map$1, ai as tap, aj as logDebug, ak as isRecord, al as fail, am as mapError, an as scoped, ao as value, ap as tapBoth, aq as unsafeCoerce } from "./effect.mjs";
import { l as layer, F as Fetch, c as currentRedactedNames, H as HttpClient, f as filterStatusOk, g as get, m as modify, p as post, a as prependUrl, b as bodyUnsafeJson, s as setHeaders, d as schemaBodyJson, e as put, h as bodyFormData, i as setHeader } from "./effect__platform.mjs";
import { l as lookup } from "./uploadthing__mime-types.mjs";
var version = "7.7.4";
const logDeprecationWarning = (message) => {
  console.warn(`⚠️ [uploadthing][deprecated] ${message}`);
};
Literal(...ValidContentDispositions);
Literal(...ValidACLs);
Literal("upload");
const UploadThingHook = Literal("callback", "error");
const DecodeString = transform(Uint8ArrayFromSelf, String$, {
  decode: (data) => new TextDecoder().decode(data),
  encode: (data) => new TextEncoder().encode(data)
});
const ParsedToken = Struct({
  apiKey: Redacted(String$.pipe(startsWith("sk_"))),
  appId: String$,
  regions: NonEmptyArray(String$),
  ingestHost: String$.pipe(optionalWith({ default: () => "ingest.uploadthing.com" }))
});
const UploadThingToken = Uint8ArrayFromBase64.pipe(compose(DecodeString), compose(parseJson(ParsedToken)));
var FileUploadData = class extends Class("FileUploadData")({
  name: String$,
  size: Number$,
  type: String$,
  lastModified: Number$.pipe(optional)
}) {
};
var FileUploadDataWithCustomId = class extends FileUploadData.extend("FileUploadDataWithCustomId")({ customId: NullOr(String$) }) {
};
(class extends FileUploadDataWithCustomId.extend("UploadedFileData")({
  key: String$,
  url: String$,
  appUrl: String$,
  ufsUrl: String$,
  fileHash: String$
}) {
});
(class extends Class("MetadataFetchStreamPart")({
  payload: String$,
  signature: String$,
  hook: UploadThingHook
}) {
});
(class extends Class("MetadataFetchResponse")({ ok: Boolean$ }) {
});
(class extends Class("CallbackResultResponse")({ ok: Boolean$ }) {
});
(class extends Class("UploadActionPayload")({
  files: Array$(FileUploadData),
  input: Unknown
}) {
});
const __vite_import_meta_env__ = { "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SSR": true, "TSS_DEV_SERVER": "false", "TSS_DEV_SSR_STYLES_BASEPATH": "/", "TSS_DEV_SSR_STYLES_ENABLED": "true", "TSS_ROUTER_BASEPATH": "", "TSS_SERVER_FN_BASE": "/_serverFn/", "VITE_SUPABASE_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxZ3dqc2d5ZXBseHh3eWd3ZWt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMTE5MjcsImV4cCI6MjA5MDg4NzkyN30.U--oopKcIUCvgmdRxGtccPJK3B33Kjxy_QNA_o0F3mk", "VITE_SUPABASE_PASSWORD": "VEionSma90qS0d6C", "VITE_SUPABASE_URL": "https://kqgwjsgyeplxxwygwekt.supabase.co" };
const envProvider = fromEnv().pipe(orElse(() => fromMap(new Map(Object.entries(filterDefinedObjectValues(__vite_import_meta_env__ ?? {}))), { pathDelim: "_" })), nested("uploadthing"), constantCase);
const configProvider = (options) => fromJson(options ?? {}).pipe(orElse(() => envProvider));
const IsDevelopment = boolean("isDev").pipe(orElse$1(() => succeed$1(typeof process !== "undefined" ? "production" : void 0).pipe(map((_) => _ === "development"))), withDefault(false));
const UTToken = Config("token", UploadThingToken).pipe(catchTags({ ConfigError: (e) => new UploadThingError({
  code: e._op === "InvalidData" ? "INVALID_SERVER_CONFIG" : "MISSING_ENV",
  message: e._op === "InvalidData" ? "Invalid token. A token is a base64 encoded JSON object matching { apiKey: string, appId: string, regions: string[] }." : "Missing token. Please set the `UPLOADTHING_TOKEN` environment variable or provide a token manually through config.",
  cause: e
}) }));
const ApiUrl = string("apiUrl").pipe(withDefault("https://api.uploadthing.com"), mapAttempt((_) => new URL(_)), map((url) => url.href.replace(/\/$/, "")));
const IngestUrl = fn(function* (preferredRegion) {
  const { regions, ingestHost } = yield* UTToken;
  const region = preferredRegion ? regions.find((r) => r === preferredRegion) ?? regions[0] : regions[0];
  return yield* string("ingestUrl").pipe(withDefault(`https://${region}.${ingestHost}`), mapAttempt((_) => new URL(_)), map((url) => url.href.replace(/\/$/, "")));
});
string("utfsHost").pipe(withDefault("utfs.io"));
const UfsHost = string("ufsHost").pipe(withDefault("ufs.sh"));
const UfsAppIdLocation = literal("subdomain", "path")("ufsAppIdLocation").pipe(withDefault("subdomain"));
const ConfigLogLevel = (name) => {
  const config = mapOrFail(string(), (literal2) => {
    const level = allLevels.find((level$1) => level$1._tag === literal2);
    return level === void 0 ? left(InvalidData([], `Expected a log level but received ${literal2}`)) : right(level);
  });
  return name === void 0 ? config : nested$1(config, name);
};
const withMinimalLogLevel = ConfigLogLevel("logLevel").pipe(withDefault(Info), andThen((level) => minimumLogLevel(level)), tapError((e) => logError("Invalid log level").pipe(annotateLogs("error", e))), catchTag("ConfigError", (e) => new UploadThingError({
  code: "INVALID_SERVER_CONFIG",
  message: "Invalid server configuration",
  cause: e
})), unwrapEffect);
const LogFormat = literal("json", "logFmt", "structured", "pretty")("logFormat");
const withLogFormat = gen(function* () {
  const isDev = yield* IsDevelopment;
  const logFormat = yield* LogFormat.pipe(withDefault(isDev ? "pretty" : "json"));
  return Logger[logFormat];
}).pipe(catchTag("ConfigError", (e) => new UploadThingError({
  code: "INVALID_SERVER_CONFIG",
  message: "Invalid server configuration",
  cause: e
})), unwrapEffect);
const logHttpClientResponse = (message, opts) => {
  const mixin = opts?.mixin ?? "json";
  const level = fromLiteral(opts?.level ?? "Debug");
  return (response) => flatMap(mixin !== "None" ? response[mixin] : _void, () => logWithLevel(level, `${message} (${response.status})`).pipe(annotateLogs("response", response)));
};
const logHttpClientError = (message) => (err) => err._tag === "ResponseError" ? logHttpClientResponse(message, { level: "Error" })(err.response) : logError(message).pipe(annotateLogs("error", err));
(class extends TaggedError("ParserError") {
  message = "Input validation failed. The original error with it's validation issues is in the error cause.";
});
const makeRuntime = (fetch, config) => {
  const fetchHttpClient = provideMerge(layer, succeed(Fetch, fetch));
  const withRedactedHeaders = effectDiscard(update(currentRedactedNames, (_) => _.concat(["x-uploadthing-api-key"])));
  const layer$1 = provide(mergeAll(withLogFormat, withMinimalLogLevel, fetchHttpClient, withRedactedHeaders), setConfigProvider(configProvider(config)));
  return make(layer$1);
};
(class extends Tag("uploadthing/AdapterArguments")() {
});
var UTFile = class extends Blob {
  name;
  lastModified;
  customId;
  constructor(parts, name, options) {
    const optionsWithDefaults = {
      ...options,
      type: options?.type ?? (lookup(name) || "application/octet-stream"),
      lastModified: options?.lastModified ?? Date.now()
    };
    super(parts, optionsWithDefaults);
    this.name = name;
    this.customId = optionsWithDefaults.customId;
    this.lastModified = optionsWithDefaults.lastModified;
  }
};
const uploadWithoutProgress = (file, presigned) => gen(function* () {
  const formData = new FormData();
  formData.append("file", file);
  const httpClient = (yield* HttpClient).pipe(filterStatusOk);
  const json = yield* put(presigned.url).pipe(bodyFormData(formData), setHeader("Range", "bytes=0-"), setHeader("x-uploadthing-version", version), httpClient.execute, tapError(logHttpClientError("Failed to upload file")), mapError((e) => new UploadThingError({
    code: "UPLOAD_FAILED",
    message: "Failed to upload file",
    cause: e
  })), andThen((_) => _.json), andThen(unsafeCoerce), scoped);
  yield* logDebug(`File ${file.name} uploaded successfully`).pipe(annotateLogs("json", json));
  return {
    ...json,
    get url() {
      logDeprecationWarning("`file.url` is deprecated and will be removed in uploadthing v9. Use `file.ufsUrl` instead.");
      return json.url;
    },
    get appUrl() {
      logDeprecationWarning("`file.appUrl` is deprecated and will be removed in uploadthing v9. Use `file.ufsUrl` instead.");
      return json.appUrl;
    }
  };
});
function guardServerOnly() {
  if (typeof window !== "undefined") throw new UploadThingError({
    code: "INTERNAL_SERVER_ERROR",
    message: "The `utapi` can only be used on the server."
  });
}
const downloadFile = (_url) => gen(function* () {
  let url = isRecord(_url) ? _url.url : _url;
  if (typeof url === "string") {
    if (url.startsWith("data:")) return yield* fail({
      code: "BAD_REQUEST",
      message: "Please use uploadFiles() for data URLs. uploadFilesFromUrl() is intended for use with remote URLs only.",
      data: void 0
    });
  }
  url = new URL(url);
  const { name = url.pathname.split("/").pop() ?? "unknown-filename", customId = void 0 } = isRecord(_url) ? _url : {};
  const httpClient = (yield* HttpClient).pipe(filterStatusOk);
  const arrayBuffer = yield* get(url).pipe(modify({ headers: {} }), httpClient.execute, flatMap((_) => _.arrayBuffer), mapError((cause) => {
    return {
      code: "BAD_REQUEST",
      message: `Failed to download requested file: ${cause.message}`,
      data: cause.toJSON()
    };
  }), scoped);
  return new UTFile([arrayBuffer], name, {
    customId,
    lastModified: Date.now()
  });
}).pipe(withLogSpan("downloadFile"));
const generatePresignedUrl = (file, cd, acl) => gen(function* () {
  const { apiKey, appId } = yield* UTToken;
  const baseUrl = yield* IngestUrl(void 0);
  const key = yield* generateKey(file, appId);
  const url = yield* generateSignedURL(`${baseUrl}/${key}`, apiKey, { data: {
    "x-ut-identifier": appId,
    "x-ut-file-name": file.name,
    "x-ut-file-size": file.size,
    "x-ut-file-type": file.type,
    "x-ut-custom-id": file.customId,
    "x-ut-content-disposition": cd,
    "x-ut-acl": acl
  } });
  return {
    url,
    key
  };
}).pipe(withLogSpan("generatePresignedUrl"));
const uploadFile = (file, opts) => gen(function* () {
  const presigned = yield* generatePresignedUrl(file, opts.contentDisposition ?? "inline", opts.acl).pipe(catchTag("UploadThingError", (e) => fail(UploadThingError.toObject(e))), catchTag("ConfigError", () => fail({
    code: "INVALID_SERVER_CONFIG",
    message: "Failed to generate presigned URL"
  })));
  const response = yield* uploadWithoutProgress(file, presigned).pipe(catchTag("UploadThingError", (e) => fail(UploadThingError.toObject(e))), catchTag("ResponseError", (e) => fail({
    code: "UPLOAD_FAILED",
    message: "Failed to upload file",
    data: e.toJSON()
  })));
  return {
    key: presigned.key,
    url: response.url,
    appUrl: response.appUrl,
    ufsUrl: response.ufsUrl,
    lastModified: file.lastModified ?? Date.now(),
    name: file.name,
    size: file.size,
    type: file.type,
    customId: file.customId ?? null,
    fileHash: response.fileHash
  };
}).pipe(withLogSpan("uploadFile"));
var UTApi = class {
  fetch;
  defaultKeyType;
  runtime;
  opts;
  constructor(options) {
    guardServerOnly();
    this.opts = options ?? {};
    this.fetch = this.opts.fetch ?? globalThis.fetch;
    this.defaultKeyType = this.opts.defaultKeyType ?? "fileKey";
    this.runtime = makeRuntime(this.fetch, this.opts);
  }
  requestUploadThing = (pathname, body, responseSchema) => gen(this, function* () {
    const { apiKey } = yield* UTToken;
    const baseUrl = yield* ApiUrl;
    const httpClient = (yield* HttpClient).pipe(filterStatusOk);
    return yield* post(pathname).pipe(prependUrl(baseUrl), bodyUnsafeJson(body), setHeaders({
      "x-uploadthing-version": version,
      "x-uploadthing-be-adapter": "server-sdk",
      "x-uploadthing-api-key": value(apiKey)
    }), httpClient.execute, tapBoth({
      onSuccess: logHttpClientResponse("UploadThing API Response"),
      onFailure: logHttpClientError("Failed to request UploadThing API")
    }), flatMap(schemaBodyJson(responseSchema)), scoped);
  }).pipe(catchTag("ConfigError", (e) => new UploadThingError({
    code: "INVALID_SERVER_CONFIG",
    message: "There was an error with the server configuration. More info can be found on this error's `cause` property",
    cause: e
  })), withLogSpan("utapi.#requestUploadThing"));
  executeAsync = async (program, signal) => {
    const exit = await program.pipe(withLogSpan("utapi.#executeAsync"), (e) => this.runtime.runPromiseExit(e, signal ? { signal } : void 0));
    if (exit._tag === "Failure") throw squash(exit.cause);
    return exit.value;
  };
  uploadFiles(files, opts) {
    guardServerOnly();
    const concurrency = opts?.concurrency ?? 1;
    if (concurrency < 1 || concurrency > 25) throw new UploadThingError({
      code: "BAD_REQUEST",
      message: "concurrency must be a positive integer between 1 and 25"
    });
    const program = forEach(ensure(files), (file) => uploadFile(file, opts ?? {}).pipe(match({
      onSuccess: (data) => ({
        data,
        error: null
      }),
      onFailure: (error) => ({
        data: null,
        error
      })
    })), { concurrency }).pipe(map$1((ups) => Array.isArray(files) ? ups : ups[0]), tap((res) => logDebug("Finished uploading").pipe(annotateLogs("uploadResult", res))), withLogSpan("uploadFiles"));
    return this.executeAsync(program, opts?.signal);
  }
  uploadFilesFromUrl(urls, opts) {
    guardServerOnly();
    const concurrency = opts?.concurrency ?? 1;
    if (concurrency < 1 || concurrency > 25) throw new UploadThingError({
      code: "BAD_REQUEST",
      message: "concurrency must be a positive integer between 1 and 25"
    });
    const program = forEach(ensure(urls), (url) => downloadFile(url).pipe(flatMap((file) => uploadFile(file, opts ?? {})), match({
      onSuccess: (data) => ({
        data,
        error: null
      }),
      onFailure: (error) => ({
        data: null,
        error
      })
    })), { concurrency }).pipe(map$1((ups) => Array.isArray(urls) ? ups : ups[0]), tap((res) => logDebug("Finished uploading").pipe(annotateLogs("uploadResult", res))), withLogSpan("uploadFiles")).pipe(withLogSpan("uploadFilesFromUrl"));
    return this.executeAsync(program, opts?.signal);
  }
  /**
  * Request to delete files from UploadThing storage.
  * @param {string | string[]} fileKeys
  *
  * @example
  * await deleteFiles("2e0fdb64-9957-4262-8e45-f372ba903ac8_image.jpg");
  *
  * @example
  * await deleteFiles(["2e0fdb64-9957-4262-8e45-f372ba903ac8_image.jpg","1649353b-04ea-48a2-9db7-31de7f562c8d_image2.jpg"])
  *
  * @example
  * await deleteFiles("myCustomIdentifier", { keyType: "customId" })
  */
  deleteFiles = async (keys, opts) => {
    guardServerOnly();
    const { keyType = this.defaultKeyType } = opts ?? {};
    class DeleteFileResponse extends Class("DeleteFileResponse")({
      success: Boolean$,
      deletedCount: Number$
    }) {
    }
    return await this.executeAsync(this.requestUploadThing("/v6/deleteFiles", keyType === "fileKey" ? { fileKeys: ensure(keys) } : { customIds: ensure(keys) }, DeleteFileResponse).pipe(withLogSpan("deleteFiles")));
  };
  /**
  * Request file URLs from UploadThing storage.
  * @param {string | string[]} fileKeys
  *
  * @example
  * const data = await getFileUrls("2e0fdb64-9957-4262-8e45-f372ba903ac8_image.jpg");
  * console.log(data); // [{key: "2e0fdb64-9957-4262-8e45-f372ba903ac8_image.jpg", url: "https://uploadthing.com/f/2e0fdb64-9957-4262-8e45-f372ba903ac8_image.jpg"}]
  *
  * @example
  * const data = await getFileUrls(["2e0fdb64-9957-4262-8e45-f372ba903ac8_image.jpg","1649353b-04ea-48a2-9db7-31de7f562c8d_image2.jpg"])
  * console.log(data) // [{key: "2e0fdb64-9957-4262-8e45-f372ba903ac8_image.jpg", url: "https://uploadthing.com/f/2e0fdb64-9957-4262-8e45-f372ba903ac8_image.jpg" },{key: "1649353b-04ea-48a2-9db7-31de7f562c8d_image2.jpg", url: "https://uploadthing.com/f/1649353b-04ea-48a2-9db7-31de7f562c8d_image2.jpg"}]
  *
  * @deprecated - See https://docs.uploadthing.com/working-with-files#accessing-files for info how to access files
  */
  getFileUrls = async (keys, opts) => {
    guardServerOnly();
    const { keyType = this.defaultKeyType } = opts ?? {};
    class GetFileUrlResponse extends Class("GetFileUrlResponse")({ data: Array$(Struct({
      key: String$,
      url: String$
    })) }) {
    }
    return await this.executeAsync(this.requestUploadThing("/v6/getFileUrl", keyType === "fileKey" ? { fileKeys: ensure(keys) } : { customIds: ensure(keys) }, GetFileUrlResponse).pipe(withLogSpan("getFileUrls")));
  };
  /**
  * Request file list from UploadThing storage.
  * @param {object} opts
  * @param {number} opts.limit The maximum number of files to return
  * @param {number} opts.offset The number of files to skip
  *
  * @example
  * const data = await listFiles({ limit: 1 });
  * console.log(data); // { key: "2e0fdb64-9957-4262-8e45-f372ba903ac8_image.jpg", id: "2e0fdb64-9957-4262-8e45-f372ba903ac8" }
  */
  listFiles = async (opts) => {
    guardServerOnly();
    class ListFileResponse extends Class("ListFileResponse")({
      hasMore: Boolean$,
      files: Array$(Struct({
        id: String$,
        customId: NullOr(String$),
        key: String$,
        name: String$,
        size: Number$,
        status: Literal("Deletion Pending", "Failed", "Uploaded", "Uploading"),
        uploadedAt: Number$
      }))
    }) {
    }
    return await this.executeAsync(this.requestUploadThing("/v6/listFiles", { ...opts }, ListFileResponse).pipe(withLogSpan("listFiles")));
  };
  renameFiles = async (updates) => {
    guardServerOnly();
    class RenameFileResponse extends Class("RenameFileResponse")({ success: Boolean$ }) {
    }
    return await this.executeAsync(this.requestUploadThing("/v6/renameFiles", { updates: ensure(updates) }, RenameFileResponse).pipe(withLogSpan("renameFiles")));
  };
  getUsageInfo = async () => {
    guardServerOnly();
    class GetUsageInfoResponse extends Class("GetUsageInfoResponse")({
      totalBytes: Number$,
      appTotalBytes: Number$,
      filesUploaded: Number$,
      limitBytes: Number$
    }) {
    }
    return await this.executeAsync(this.requestUploadThing("/v6/getUsageInfo", {}, GetUsageInfoResponse).pipe(withLogSpan("getUsageInfo")));
  };
  /**
  * Generate a presigned url for a private file
  * Unlike {@link getSignedURL}, this method does not make a fetch request to the UploadThing API
  * and is the recommended way to generate a presigned url for a private file.
  **/
  generateSignedURL = async (key, opts) => {
    guardServerOnly();
    const expiresIn = parseTimeToSeconds(opts?.expiresIn ?? "5 minutes");
    if (opts?.expiresIn && isNaN(expiresIn)) throw new UploadThingError({
      code: "BAD_REQUEST",
      message: "expiresIn must be a valid time string, for example '1d', '2 days', or a number of seconds."
    });
    if (expiresIn > 86400 * 7) throw new UploadThingError({
      code: "BAD_REQUEST",
      message: "expiresIn must be less than 7 days (604800 seconds)."
    });
    const program = gen(function* () {
      const { apiKey, appId } = yield* UTToken;
      const appIdLocation = yield* UfsAppIdLocation;
      const ufsHost = yield* UfsHost;
      const proto = ufsHost.includes("local") ? "http" : "https";
      const urlBase = appIdLocation === "subdomain" ? `${proto}://${appId}.${ufsHost}/f/${key}` : `${proto}://${ufsHost}/a/${appId}/${key}`;
      const ufsUrl = yield* generateSignedURL(urlBase, apiKey, { ttlInSeconds: expiresIn });
      return { ufsUrl };
    });
    return await this.executeAsync(program.pipe(catchTag("ConfigError", (e) => new UploadThingError({
      code: "INVALID_SERVER_CONFIG",
      message: "There was an error with the server configuration. More info can be found on this error's `cause` property",
      cause: e
    })), withLogSpan("generateSignedURL")));
  };
  /**
  * Request a presigned url for a private file(s)
  * @remarks This method is no longer recommended as it makes a fetch
  * request to the UploadThing API which incurs redundant latency. It
  * will be deprecated in UploadThing v8 and removed in UploadThing v9.
  *
  * @see {@link generateSignedURL} for a more efficient way to generate a presigned url
  **/
  getSignedURL = async (key, opts) => {
    guardServerOnly();
    const expiresIn = opts?.expiresIn ? parseTimeToSeconds(opts.expiresIn) : void 0;
    const { keyType = this.defaultKeyType } = opts ?? {};
    if (opts?.expiresIn && isNaN(expiresIn)) throw new UploadThingError({
      code: "BAD_REQUEST",
      message: "expiresIn must be a valid time string, for example '1d', '2 days', or a number of seconds."
    });
    if (expiresIn && expiresIn > 86400 * 7) throw new UploadThingError({
      code: "BAD_REQUEST",
      message: "expiresIn must be less than 7 days (604800 seconds)."
    });
    class GetSignedUrlResponse extends Class("GetSignedUrlResponse")({
      url: String$,
      ufsUrl: String$
    }) {
    }
    return await this.executeAsync(this.requestUploadThing("/v6/requestFileAccess", keyType === "fileKey" ? {
      fileKey: key,
      expiresIn
    } : {
      customId: key,
      expiresIn
    }, GetSignedUrlResponse).pipe(withLogSpan("getSignedURL")));
  };
  /**
  * Update the ACL of a file or set of files.
  *
  * @example
  * // Make a single file public
  * await utapi.updateACL("2e0fdb64-9957-4262-8e45-f372ba903ac8_image.jpg", "public-read");
  *
  * // Make multiple files private
  * await utapi.updateACL(
  *   [
  *     "2e0fdb64-9957-4262-8e45-f372ba903ac8_image.jpg",
  *     "1649353b-04ea-48a2-9db7-31de7f562c8d_image2.jpg",
  *   ],
  *   "private",
  * );
  */
  updateACL = async (keys, acl, opts) => {
    guardServerOnly();
    const { keyType = this.defaultKeyType } = opts ?? {};
    const updates = ensure(keys).map((key) => {
      return keyType === "fileKey" ? {
        fileKey: key,
        acl
      } : {
        customId: key,
        acl
      };
    });
    const responseSchema = Struct({ success: Boolean$ });
    return await this.executeAsync(this.requestUploadThing("/v6/updateACL", { updates }, responseSchema).pipe(withLogSpan("updateACL")));
  };
};
export {
  UTApi as U
};
