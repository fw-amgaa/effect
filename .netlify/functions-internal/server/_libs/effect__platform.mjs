import { aC as Error$1, aD as dual, aE as appendAll, aF as filter, aG as fromIterable$1, a6 as right, a4 as left, aH as NodeInspectSymbol, aI as format, aJ as isSome, aK as none, aL as some, aM as BaseProto, aN as seconds, aO as pipeArguments, aP as map, aQ as globalValue, aR as symbolRedactable, aS as getOrDefault, aT as make$3, aU as unsafeMake, aV as decodeUnknown, a9 as flatMap, aW as runSync, aX as redact$1, aY as succeed, al as fail, aZ as Class, a_ as fromReadableStream, a$ as fail$1, b0 as tryMap, b1 as tryPromise, b2 as cached, b3 as try_, b4 as effect, b5 as context, ah as map$1, b6 as mapInputContext, b7 as merge$1, b8 as GenericTag, b9 as serviceFunctions, ba as withFiberRuntime, bb as currentTracerEnabled, bc as uninterruptibleMask, bd as matchCauseEffect, be as isInterrupted, bf as failCause, bg as get$3, bh as useSpan, bi as constFalse, bj as suspend, bk as onInterrupt, bl as sync, bm as suspend$1, bn as Reference, bo as withParentSpan, bp as ensuringWith, bq as isInterrupted$1, aa as _void, br as currentContext, bs as toReadableStreamEffect, a1 as Tag } from "./effect.mjs";
import { s as srcExports } from "./@opentelemetry/semantic-conventions.mjs";
const TypeIdError = (typeId, tag2) => {
  class Base extends Error$1 {
    _tag = tag2;
  }
  Base.prototype[typeId] = typeId;
  Base.prototype.name = tag2;
  return Base;
};
const fromInput$1 = (input) => {
  const parsed = fromInputNested(input);
  const out = [];
  for (let i = 0; i < parsed.length; i++) {
    if (Array.isArray(parsed[i][0])) {
      const [keys, value] = parsed[i];
      out.push([`${keys[0]}[${keys.slice(1).join("][")}]`, value]);
    } else {
      out.push(parsed[i]);
    }
  }
  return out;
};
const fromInputNested = (input) => {
  const entries = Symbol.iterator in input ? fromIterable$1(input) : Object.entries(input);
  const out = [];
  for (const [key, value] of entries) {
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        if (value[i] !== void 0) {
          out.push([key, String(value[i])]);
        }
      }
    } else if (typeof value === "object") {
      const nested = fromInputNested(value);
      for (const [k, v] of nested) {
        out.push([[key, ...typeof k === "string" ? [k] : k], v]);
      }
    } else if (value !== void 0) {
      out.push([key, String(value)]);
    }
  }
  return out;
};
const empty$3 = [];
const setAll$1 = /* @__PURE__ */ dual(2, (self, input) => {
  const toSet = fromInput$1(input);
  const keys = toSet.map(([k]) => k);
  return appendAll(filter(self, ([k]) => keys.includes(k)), toSet);
});
const makeUrl = (url, params, hash) => {
  try {
    const urlInstance = new URL(url, baseUrl());
    for (let i = 0; i < params.length; i++) {
      const [key, value] = params[i];
      if (value !== void 0) {
        urlInstance.searchParams.append(key, value);
      }
    }
    if (hash._tag === "Some") {
      urlInstance.hash = hash.value;
    }
    return right(urlInstance);
  } catch (e) {
    return left(e);
  }
};
const baseUrl = () => {
  if ("location" in globalThis && globalThis.location !== void 0 && globalThis.location.origin !== void 0 && globalThis.location.pathname !== void 0) {
    return location.origin + location.pathname;
  }
  return void 0;
};
const TypeId$7 = /* @__PURE__ */ Symbol.for("@effect/platform/HttpBody");
class BodyBase {
  [TypeId$7];
  constructor() {
    this[TypeId$7] = TypeId$7;
  }
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
  toString() {
    return format(this);
  }
}
class EmptyImpl extends BodyBase {
  _tag = "Empty";
  toJSON() {
    return {
      _id: "@effect/platform/HttpBody",
      _tag: "Empty"
    };
  }
}
const empty$2 = /* @__PURE__ */ new EmptyImpl();
class Uint8ArrayImpl extends BodyBase {
  body;
  contentType;
  _tag = "Uint8Array";
  constructor(body, contentType) {
    super();
    this.body = body;
    this.contentType = contentType;
  }
  get contentLength() {
    return this.body.length;
  }
  toJSON() {
    const toString = this.contentType.startsWith("text/") || this.contentType.endsWith("json");
    return {
      _id: "@effect/platform/HttpBody",
      _tag: "Uint8Array",
      body: toString ? new TextDecoder().decode(this.body) : `Uint8Array(${this.body.length})`,
      contentType: this.contentType,
      contentLength: this.contentLength
    };
  }
}
const uint8Array = (body, contentType) => new Uint8ArrayImpl(body, contentType);
const encoder = /* @__PURE__ */ new TextEncoder();
const text = (body, contentType) => uint8Array(encoder.encode(body), contentType);
const unsafeJson = (body) => text(JSON.stringify(body), "application/json");
class FormDataImpl extends BodyBase {
  formData;
  _tag = "FormData";
  constructor(formData2) {
    super();
    this.formData = formData2;
  }
  toJSON() {
    return {
      _id: "@effect/platform/HttpBody",
      _tag: "FormData",
      formData: this.formData
    };
  }
}
const formData = (body) => new FormDataImpl(body);
const TypeId$6 = /* @__PURE__ */ Symbol.for("@effect/platform/Cookies");
const CookieTypeId = /* @__PURE__ */ Symbol.for("@effect/platform/Cookies/Cookie");
const Proto$2 = {
  [TypeId$6]: TypeId$6,
  ...BaseProto,
  toJSON() {
    return {
      _id: "@effect/platform/Cookies",
      cookies: map(this.cookies, (cookie) => cookie.toJSON())
    };
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const fromReadonlyRecord = (cookies) => {
  const self = Object.create(Proto$2);
  self.cookies = cookies;
  return self;
};
const fromIterable = (cookies) => {
  const record = {};
  for (const cookie of cookies) {
    record[cookie.name] = cookie;
  }
  return fromReadonlyRecord(record);
};
const fromSetCookie = (headers) => {
  const arrayHeaders = typeof headers === "string" ? [headers] : headers;
  const cookies = [];
  for (const header of arrayHeaders) {
    const cookie = parseSetCookie(header.trim());
    if (isSome(cookie)) {
      cookies.push(cookie.value);
    }
  }
  return fromIterable(cookies);
};
function parseSetCookie(header) {
  const parts = header.split(";").map((_) => _.trim()).filter((_) => _ !== "");
  if (parts.length === 0) {
    return none();
  }
  const firstEqual = parts[0].indexOf("=");
  if (firstEqual === -1) {
    return none();
  }
  const name = parts[0].slice(0, firstEqual);
  if (!fieldContentRegExp.test(name)) {
    return none();
  }
  const valueEncoded = parts[0].slice(firstEqual + 1);
  const value = tryDecodeURIComponent(valueEncoded);
  if (parts.length === 1) {
    return some(Object.assign(Object.create(CookieProto), {
      name,
      value,
      valueEncoded
    }));
  }
  const options2 = {};
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    const equalIndex = part.indexOf("=");
    const key = equalIndex === -1 ? part : part.slice(0, equalIndex).trim();
    const value2 = equalIndex === -1 ? void 0 : part.slice(equalIndex + 1).trim();
    switch (key.toLowerCase()) {
      case "domain": {
        if (value2 === void 0) {
          break;
        }
        const domain = value2.trim().replace(/^\./, "");
        if (domain) {
          options2.domain = domain;
        }
        break;
      }
      case "expires": {
        if (value2 === void 0) {
          break;
        }
        const date = new Date(value2);
        if (!isNaN(date.getTime())) {
          options2.expires = date;
        }
        break;
      }
      case "max-age": {
        if (value2 === void 0) {
          break;
        }
        const maxAge = parseInt(value2, 10);
        if (!isNaN(maxAge)) {
          options2.maxAge = seconds(maxAge);
        }
        break;
      }
      case "path": {
        if (value2 === void 0) {
          break;
        }
        if (value2[0] === "/") {
          options2.path = value2;
        }
        break;
      }
      case "priority": {
        if (value2 === void 0) {
          break;
        }
        switch (value2.toLowerCase()) {
          case "low":
            options2.priority = "low";
            break;
          case "medium":
            options2.priority = "medium";
            break;
          case "high":
            options2.priority = "high";
            break;
        }
        break;
      }
      case "httponly": {
        options2.httpOnly = true;
        break;
      }
      case "secure": {
        options2.secure = true;
        break;
      }
      case "partitioned": {
        options2.partitioned = true;
        break;
      }
      case "samesite": {
        if (value2 === void 0) {
          break;
        }
        switch (value2.toLowerCase()) {
          case "lax":
            options2.sameSite = "lax";
            break;
          case "strict":
            options2.sameSite = "strict";
            break;
          case "none":
            options2.sameSite = "none";
            break;
        }
        break;
      }
    }
  }
  return some(Object.assign(Object.create(CookieProto), {
    name,
    value,
    valueEncoded,
    options: Object.keys(options2).length > 0 ? options2 : void 0
  }));
}
const fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
const CookieProto = {
  [CookieTypeId]: CookieTypeId,
  ...BaseProto,
  toJSON() {
    return {
      _id: "@effect/platform/Cookies/Cookie",
      name: this.name,
      value: this.value,
      options: this.options
    };
  }
};
const tryDecodeURIComponent = (str) => {
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
};
const HeadersTypeId = /* @__PURE__ */ Symbol.for("@effect/platform/Headers");
const Proto$1 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  [HeadersTypeId]: HeadersTypeId,
  [symbolRedactable](fiberRefs) {
    return redact(this, getOrDefault(fiberRefs, currentRedactedNames));
  }
});
const make$2 = (input) => Object.assign(Object.create(Proto$1), input);
const empty$1 = /* @__PURE__ */ Object.create(Proto$1);
const fromInput = (input) => {
  if (input === void 0) {
    return empty$1;
  } else if (Symbol.iterator in input) {
    const out2 = Object.create(Proto$1);
    for (const [k, v] of input) {
      out2[k.toLowerCase()] = v;
    }
    return out2;
  }
  const out = Object.create(Proto$1);
  for (const [k, v] of Object.entries(input)) {
    if (Array.isArray(v)) {
      out[k.toLowerCase()] = v.join(", ");
    } else if (v !== void 0) {
      out[k.toLowerCase()] = v;
    }
  }
  return out;
};
const unsafeFromRecord = (input) => Object.setPrototypeOf(input, Proto$1);
const set = /* @__PURE__ */ dual(3, (self, key, value) => {
  const out = make$2(self);
  out[key.toLowerCase()] = value;
  return out;
});
const setAll = /* @__PURE__ */ dual(2, (self, headers) => make$2({
  ...self,
  ...fromInput(headers)
}));
const merge = /* @__PURE__ */ dual(2, (self, headers) => {
  const out = make$2(self);
  Object.assign(out, headers);
  return out;
});
const remove = /* @__PURE__ */ dual(2, (self, key) => {
  const out = make$2(self);
  const modify2 = (key2) => {
    if (typeof key2 === "string") {
      const k = key2.toLowerCase();
      if (k in self) {
        delete out[k];
      }
    } else {
      for (const name in self) {
        if (key2.test(name)) {
          delete out[name];
        }
      }
    }
  };
  if (Array.isArray(key)) {
    for (let i = 0; i < key.length; i++) {
      modify2(key[i]);
    }
  } else {
    modify2(key);
  }
  return out;
});
const redact = /* @__PURE__ */ dual(2, (self, key) => {
  const out = {
    ...self
  };
  const modify2 = (key2) => {
    if (typeof key2 === "string") {
      const k = key2.toLowerCase();
      if (k in self) {
        out[k] = make$3(self[k]);
      }
    } else {
      for (const name in self) {
        if (key2.test(name)) {
          out[name] = make$3(self[name]);
        }
      }
    }
  };
  if (Array.isArray(key)) {
    for (let i = 0; i < key.length; i++) {
      modify2(key[i]);
    }
  } else {
    modify2(key);
  }
  return out;
});
const currentRedactedNames = /* @__PURE__ */ globalValue("@effect/platform/Headers/currentRedactedNames", () => unsafeMake(["authorization", "cookie", "set-cookie", "x-api-key"]));
const TypeId$5 = /* @__PURE__ */ Symbol.for("@effect/platform/HttpIncomingMessage");
const schemaBodyJson = (schema, options2) => {
  const parse = decodeUnknown(schema, options2);
  return (self) => flatMap(self.json, parse);
};
const inspect = (self, that) => {
  const contentType = self.headers["content-type"] ?? "";
  let body;
  if (contentType.includes("application/json")) {
    try {
      body = runSync(self.json);
    } catch {
    }
  } else if (contentType.includes("text/") || contentType.includes("urlencoded")) {
    try {
      body = runSync(self.text);
    } catch {
    }
  }
  const obj = {
    ...that,
    headers: redact$1(self.headers),
    remoteAddress: self.remoteAddress.toJSON()
  };
  if (body !== void 0) {
    obj.body = body;
  }
  return obj;
};
const toHeaders = (span) => unsafeFromRecord({
  b3: `${span.traceId}-${span.spanId}-${span.sampled ? "1" : "0"}${span.parent._tag === "Some" ? `-${span.parent.value.spanId}` : ""}`,
  traceparent: `00-${span.traceId}-${span.spanId}-${span.sampled ? "01" : "00"}`
});
const TypeId$4 = /* @__PURE__ */ Symbol.for("@effect/platform/HttpClientError");
const TypeId$3 = TypeId$4;
class RequestError extends (/* @__PURE__ */ TypeIdError(TypeId$3, "RequestError")) {
  get methodAndUrl() {
    return `${this.request.method} ${this.request.url}`;
  }
  get message() {
    return this.description ? `${this.reason}: ${this.description} (${this.methodAndUrl})` : `${this.reason} error (${this.methodAndUrl})`;
  }
}
class ResponseError extends (/* @__PURE__ */ TypeIdError(TypeId$3, "ResponseError")) {
  get methodAndUrl() {
    return `${this.request.method} ${this.request.url}`;
  }
  get message() {
    const info = `${this.response.status} ${this.methodAndUrl}`;
    return this.description ? `${this.reason}: ${this.description} (${info})` : `${this.reason} error (${info})`;
  }
}
const TypeId$2 = /* @__PURE__ */ Symbol.for("@effect/platform/HttpClientRequest");
const Proto = {
  [TypeId$2]: TypeId$2,
  ...BaseProto,
  toJSON() {
    return {
      _id: "@effect/platform/HttpClientRequest",
      method: this.method,
      url: this.url,
      urlParams: this.urlParams,
      hash: this.hash,
      headers: redact$1(this.headers),
      body: this.body.toJSON()
    };
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
function makeInternal(method, url, urlParams, hash, headers, body) {
  const self = Object.create(Proto);
  self.method = method;
  self.url = url;
  self.urlParams = urlParams;
  self.hash = hash;
  self.headers = headers;
  self.body = body;
  return self;
}
const empty = /* @__PURE__ */ makeInternal("GET", "", empty$3, /* @__PURE__ */ none(), empty$1, empty$2);
const make$1 = (method) => (url, options2) => modify$1(empty, {
  method,
  url,
  ...options2 ?? void 0
});
const get$2 = /* @__PURE__ */ make$1("GET");
const post$2 = /* @__PURE__ */ make$1("POST");
const put$2 = /* @__PURE__ */ make$1("PUT");
const patch$1 = /* @__PURE__ */ make$1("PATCH");
const del$1 = /* @__PURE__ */ make$1("DELETE");
const head$1 = /* @__PURE__ */ make$1("HEAD");
const options$1 = /* @__PURE__ */ make$1("OPTIONS");
const modify$1 = /* @__PURE__ */ dual(2, (self, options2) => {
  let result = self;
  if (options2.method) {
    result = setMethod(result, options2.method);
  }
  if (options2.url) {
    result = setUrl(result, options2.url);
  }
  if (options2.headers) {
    result = setHeaders$1(result, options2.headers);
  }
  if (options2.urlParams) {
    result = setUrlParams(result, options2.urlParams);
  }
  if (options2.hash) {
    result = setHash(result, options2.hash);
  }
  if (options2.body) {
    result = setBody(result, options2.body);
  }
  if (options2.accept) {
    result = accept(result, options2.accept);
  }
  if (options2.acceptJson) {
    result = acceptJson(result);
  }
  return result;
});
const setHeader$1 = /* @__PURE__ */ dual(3, (self, key, value) => makeInternal(self.method, self.url, self.urlParams, self.hash, set(self.headers, key, value), self.body));
const setHeaders$1 = /* @__PURE__ */ dual(2, (self, input) => makeInternal(self.method, self.url, self.urlParams, self.hash, setAll(self.headers, input), self.body));
const accept = /* @__PURE__ */ dual(2, (self, mediaType) => setHeader$1(self, "Accept", mediaType));
const acceptJson = /* @__PURE__ */ accept("application/json");
const setMethod = /* @__PURE__ */ dual(2, (self, method) => makeInternal(method, self.url, self.urlParams, self.hash, self.headers, self.body));
const setUrl = /* @__PURE__ */ dual(2, (self, url) => {
  if (typeof url === "string") {
    return makeInternal(self.method, url, self.urlParams, self.hash, self.headers, self.body);
  }
  const clone = new URL(url.toString());
  const urlParams = fromInput$1(clone.searchParams);
  const hash = clone.hash ? some(clone.hash.slice(1)) : none();
  clone.search = "";
  clone.hash = "";
  return makeInternal(self.method, clone.toString(), urlParams, hash, self.headers, self.body);
});
const prependUrl$1 = /* @__PURE__ */ dual(2, (self, url) => makeInternal(self.method, url.endsWith("/") && self.url.startsWith("/") ? url + self.url.slice(1) : url + self.url, self.urlParams, self.hash, self.headers, self.body));
const setUrlParams = /* @__PURE__ */ dual(2, (self, input) => makeInternal(self.method, self.url, setAll$1(self.urlParams, input), self.hash, self.headers, self.body));
const setHash = /* @__PURE__ */ dual(2, (self, hash) => makeInternal(self.method, self.url, self.urlParams, some(hash), self.headers, self.body));
const setBody = /* @__PURE__ */ dual(2, (self, body) => {
  let headers = self.headers;
  if (body._tag === "Empty" || body._tag === "FormData") {
    headers = remove(headers, ["Content-type", "Content-length"]);
  } else {
    const contentType = body.contentType;
    if (contentType) {
      headers = set(headers, "content-type", contentType);
    }
    const contentLength = body.contentLength;
    if (contentLength) {
      headers = set(headers, "content-length", contentLength.toString());
    }
  }
  return makeInternal(self.method, self.url, self.urlParams, self.hash, headers, body);
});
const bodyUnsafeJson$1 = /* @__PURE__ */ dual(2, (self, body) => setBody(self, unsafeJson(body)));
const bodyFormData$1 = /* @__PURE__ */ dual(2, (self, body) => setBody(self, formData(body)));
const TypeId$1 = /* @__PURE__ */ Symbol.for("@effect/platform/HttpClientResponse");
const fromWeb = (request, source) => new ClientResponseImpl(request, source);
class ClientResponseImpl extends Class {
  request;
  source;
  [TypeId$5];
  [TypeId$1];
  constructor(request, source) {
    super();
    this.request = request;
    this.source = source;
    this[TypeId$5] = TypeId$5;
    this[TypeId$1] = TypeId$1;
  }
  toJSON() {
    return inspect(this, {
      _id: "@effect/platform/HttpClientResponse",
      request: this.request.toJSON(),
      status: this.status
    });
  }
  get status() {
    return this.source.status;
  }
  get headers() {
    return fromInput(this.source.headers);
  }
  cachedCookies;
  get cookies() {
    if (this.cachedCookies) {
      return this.cachedCookies;
    }
    return this.cachedCookies = fromSetCookie(this.source.headers.getSetCookie());
  }
  get remoteAddress() {
    return none();
  }
  get stream() {
    return this.source.body ? fromReadableStream(() => this.source.body, (cause) => new ResponseError({
      request: this.request,
      response: this,
      reason: "Decode",
      cause
    })) : fail$1(new ResponseError({
      request: this.request,
      response: this,
      reason: "EmptyBody",
      description: "can not create stream from empty body"
    }));
  }
  get json() {
    return tryMap(this.text, {
      try: (text2) => text2 === "" ? null : JSON.parse(text2),
      catch: (cause) => new ResponseError({
        request: this.request,
        response: this,
        reason: "Decode",
        cause
      })
    });
  }
  textBody;
  get text() {
    return this.textBody ??= tryPromise({
      try: () => this.source.text(),
      catch: (cause) => new ResponseError({
        request: this.request,
        response: this,
        reason: "Decode",
        cause
      })
    }).pipe(cached, runSync);
  }
  get urlParamsBody() {
    return flatMap(this.text, (_) => try_({
      try: () => fromInput$1(new URLSearchParams(_)),
      catch: (cause) => new ResponseError({
        request: this.request,
        response: this,
        reason: "Decode",
        cause
      })
    }));
  }
  formDataBody;
  get formData() {
    return this.formDataBody ??= tryPromise({
      try: () => this.source.formData(),
      catch: (cause) => new ResponseError({
        request: this.request,
        response: this,
        reason: "Decode",
        cause
      })
    }).pipe(cached, runSync);
  }
  arrayBufferBody;
  get arrayBuffer() {
    return this.arrayBufferBody ??= tryPromise({
      try: () => this.source.arrayBuffer(),
      catch: (cause) => new ResponseError({
        request: this.request,
        response: this,
        reason: "Decode",
        cause
      })
    }).pipe(cached, runSync);
  }
}
const filterStatusOk$2 = (self) => self.status >= 200 && self.status < 300 ? succeed(self) : fail(new ResponseError({
  response: self,
  request: self.request,
  reason: "StatusCode",
  description: "non 2xx status code"
}));
const TypeId = /* @__PURE__ */ Symbol.for("@effect/platform/HttpClient");
const tag = /* @__PURE__ */ GenericTag("@effect/platform/HttpClient");
const currentTracerDisabledWhen = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/platform/HttpClient/tracerDisabledWhen"), () => unsafeMake(constFalse));
const currentTracerPropagation = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("@effect/platform/HttpClient/currentTracerPropagation"), () => unsafeMake(true));
const SpanNameGenerator = /* @__PURE__ */ Reference()("@effect/platform/HttpClient/SpanNameGenerator", {
  defaultValue: () => (request) => `http.client ${request.method}`
});
const ClientProto = {
  [TypeId]: TypeId,
  pipe() {
    return pipeArguments(this, arguments);
  },
  ...BaseProto,
  toJSON() {
    return {
      _id: "@effect/platform/HttpClient"
    };
  },
  get(url, options2) {
    return this.execute(get$2(url, options2));
  },
  head(url, options2) {
    return this.execute(head$1(url, options2));
  },
  post(url, options2) {
    return this.execute(post$2(url, options2));
  },
  put(url, options2) {
    return this.execute(put$2(url, options2));
  },
  patch(url, options2) {
    return this.execute(patch$1(url, options2));
  },
  del(url, options2) {
    return this.execute(del$1(url, options2));
  },
  options(url, options2) {
    return this.execute(options$1(url, options2));
  }
};
const makeWith = (postprocess, preprocess) => {
  const self = Object.create(ClientProto);
  self.preprocess = preprocess;
  self.postprocess = postprocess;
  self.execute = function(request) {
    return postprocess(preprocess(request));
  };
  return self;
};
const responseRegistry = /* @__PURE__ */ globalValue("@effect/platform/HttpClient/responseRegistry", () => {
  if ("FinalizationRegistry" in globalThis && globalThis.FinalizationRegistry) {
    const registry = new FinalizationRegistry((controller) => {
      controller.abort();
    });
    return {
      register(response, controller) {
        registry.register(response, controller, response);
      },
      unregister(response) {
        registry.unregister(response);
      }
    };
  }
  const timers = /* @__PURE__ */ new Map();
  return {
    register(response, controller) {
      timers.set(response, setTimeout(() => controller.abort(), 5e3));
    },
    unregister(response) {
      const timer = timers.get(response);
      if (timer === void 0) return;
      clearTimeout(timer);
      timers.delete(response);
    }
  };
});
const scopedRequests = /* @__PURE__ */ globalValue("@effect/platform/HttpClient/scopedRequests", () => /* @__PURE__ */ new WeakMap());
const make = (f) => makeWith((effect2) => flatMap(effect2, (request) => withFiberRuntime((fiber) => {
  const scopedController = scopedRequests.get(request);
  const controller = scopedController ?? new AbortController();
  const urlResult = makeUrl(request.url, request.urlParams, request.hash);
  if (urlResult._tag === "Left") {
    return fail(new RequestError({
      request,
      reason: "InvalidUrl",
      cause: urlResult.left
    }));
  }
  const url = urlResult.right;
  const tracerDisabled = !fiber.getFiberRef(currentTracerEnabled) || fiber.getFiberRef(currentTracerDisabledWhen)(request);
  if (tracerDisabled) {
    const effect3 = f(request, url, controller.signal, fiber);
    if (scopedController) return effect3;
    return uninterruptibleMask((restore) => matchCauseEffect(restore(effect3), {
      onSuccess(response) {
        responseRegistry.register(response, controller);
        return succeed(new InterruptibleResponse(response, controller));
      },
      onFailure(cause) {
        if (isInterrupted(cause)) {
          controller.abort();
        }
        return failCause(cause);
      }
    }));
  }
  const nameGenerator = get$3(fiber.currentContext, SpanNameGenerator);
  return useSpan(nameGenerator(request), {
    kind: "client",
    captureStackTrace: false
  }, (span) => {
    span.attribute(srcExports.ATTR_HTTP_REQUEST_METHOD, request.method);
    span.attribute(srcExports.ATTR_SERVER_ADDRESS, url.origin);
    if (url.port !== "") {
      span.attribute(srcExports.ATTR_SERVER_PORT, +url.port);
    }
    span.attribute(srcExports.ATTR_URL_FULL, url.toString());
    span.attribute(srcExports.ATTR_URL_PATH, url.pathname);
    span.attribute(srcExports.ATTR_URL_SCHEME, url.protocol.slice(0, -1));
    const query = url.search.slice(1);
    if (query !== "") {
      span.attribute(srcExports.ATTR_URL_QUERY, query);
    }
    const redactedHeaderNames = fiber.getFiberRef(currentRedactedNames);
    const redactedHeaders = redact(request.headers, redactedHeaderNames);
    for (const name in redactedHeaders) {
      span.attribute(srcExports.ATTR_HTTP_REQUEST_HEADER(name), String(redactedHeaders[name]));
    }
    request = fiber.getFiberRef(currentTracerPropagation) ? setHeaders$1(request, toHeaders(span)) : request;
    return uninterruptibleMask((restore) => restore(f(request, url, controller.signal, fiber)).pipe(withParentSpan(span), matchCauseEffect({
      onSuccess: (response) => {
        span.attribute(srcExports.ATTR_HTTP_RESPONSE_STATUS_CODE, response.status);
        const redactedHeaders2 = redact(response.headers, redactedHeaderNames);
        for (const name in redactedHeaders2) {
          span.attribute(srcExports.ATTR_HTTP_RESPONSE_HEADER(name), String(redactedHeaders2[name]));
        }
        if (scopedController) return succeed(response);
        responseRegistry.register(response, controller);
        return succeed(new InterruptibleResponse(response, controller));
      },
      onFailure(cause) {
        if (!scopedController && isInterrupted(cause)) {
          controller.abort();
        }
        return failCause(cause);
      }
    })));
  });
})), succeed);
class InterruptibleResponse {
  original;
  controller;
  constructor(original, controller) {
    this.original = original;
    this.controller = controller;
  }
  [TypeId$1] = TypeId$1;
  [TypeId$5] = TypeId$5;
  applyInterrupt(effect2) {
    return suspend(() => {
      responseRegistry.unregister(this.original);
      return onInterrupt(effect2, () => sync(() => {
        this.controller.abort();
      }));
    });
  }
  get request() {
    return this.original.request;
  }
  get status() {
    return this.original.status;
  }
  get headers() {
    return this.original.headers;
  }
  get cookies() {
    return this.original.cookies;
  }
  get remoteAddress() {
    return this.original.remoteAddress;
  }
  get formData() {
    return this.applyInterrupt(this.original.formData);
  }
  get text() {
    return this.applyInterrupt(this.original.text);
  }
  get json() {
    return this.applyInterrupt(this.original.json);
  }
  get urlParamsBody() {
    return this.applyInterrupt(this.original.urlParamsBody);
  }
  get arrayBuffer() {
    return this.applyInterrupt(this.original.arrayBuffer);
  }
  get stream() {
    return suspend$1(() => {
      responseRegistry.unregister(this.original);
      return ensuringWith(this.original.stream, (exit) => {
        if (isInterrupted$1(exit)) {
          this.controller.abort();
        }
        return _void;
      });
    });
  }
  toJSON() {
    return this.original.toJSON();
  }
  [NodeInspectSymbol]() {
    return this.original[NodeInspectSymbol]();
  }
}
const {
  /** @internal */
  del,
  /** @internal */
  execute,
  /** @internal */
  get: get$1,
  /** @internal */
  head,
  /** @internal */
  options,
  /** @internal */
  patch,
  /** @internal */
  post: post$1,
  /** @internal */
  put: put$1
} = /* @__PURE__ */ serviceFunctions(tag);
const filterStatusOk$1 = (self) => transformResponse(self, flatMap(filterStatusOk$2));
const transformResponse = /* @__PURE__ */ dual(2, (self, f) => {
  const client = self;
  return makeWith((request) => f(client.postprocess(request)), client.preprocess);
});
const layerMergedContext = (effect$1) => effect(tag, flatMap(context(), (context2) => map$1(effect$1, (client) => transformResponse(client, mapInputContext((input) => merge$1(context2, input))))));
const HttpClient = tag;
const filterStatusOk = filterStatusOk$1;
const get = get$2;
const post = post$2;
const put = put$2;
const modify = modify$1;
const setHeader = setHeader$1;
const setHeaders = setHeaders$1;
const prependUrl = prependUrl$1;
const bodyUnsafeJson = bodyUnsafeJson$1;
const bodyFormData = bodyFormData$1;
const fetchTagKey = "@effect/platform/FetchHttpClient/Fetch";
const requestInitTagKey = "@effect/platform/FetchHttpClient/FetchOptions";
const fetch = /* @__PURE__ */ make((request, url, signal, fiber) => {
  const context2 = fiber.getFiberRef(currentContext);
  const fetch2 = context2.unsafeMap.get(fetchTagKey) ?? globalThis.fetch;
  const options2 = context2.unsafeMap.get(requestInitTagKey) ?? {};
  const headers = options2.headers ? merge(fromInput(options2.headers), request.headers) : request.headers;
  const send = (body) => map$1(tryPromise({
    try: () => fetch2(url, {
      ...options2,
      method: request.method,
      headers,
      body,
      duplex: request.body._tag === "Stream" ? "half" : void 0,
      signal
    }),
    catch: (cause) => new RequestError({
      request,
      reason: "Transport",
      cause
    })
  }), (response) => fromWeb(request, response));
  switch (request.body._tag) {
    case "Raw":
    case "Uint8Array":
      return send(request.body.body);
    case "FormData":
      return send(request.body.formData);
    case "Stream":
      return flatMap(toReadableStreamEffect(request.body.stream), send);
  }
  return send(void 0);
});
const layer$1 = /* @__PURE__ */ layerMergedContext(/* @__PURE__ */ succeed(fetch));
class Fetch extends (/* @__PURE__ */ Tag(fetchTagKey)()) {
}
const layer = layer$1;
export {
  Fetch as F,
  HttpClient as H,
  prependUrl as a,
  bodyUnsafeJson as b,
  currentRedactedNames as c,
  schemaBodyJson as d,
  put as e,
  filterStatusOk as f,
  get as g,
  bodyFormData as h,
  setHeader as i,
  layer as l,
  modify as m,
  post as p,
  setHeaders as s
};
