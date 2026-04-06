const isFunction$1 = (input) => typeof input === "function";
const dual = function(arity, body) {
  if (typeof arity === "function") {
    return function() {
      if (arity(arguments)) {
        return body.apply(this, arguments);
      }
      return (self) => body(self, ...arguments);
    };
  }
  switch (arity) {
    case 0:
    case 1:
      throw new RangeError(`Invalid arity ${arity}`);
    case 2:
      return function(a, b) {
        if (arguments.length >= 2) {
          return body(a, b);
        }
        return function(self) {
          return body(self, a);
        };
      };
    case 3:
      return function(a, b, c) {
        if (arguments.length >= 3) {
          return body(a, b, c);
        }
        return function(self) {
          return body(self, a, b);
        };
      };
    case 4:
      return function(a, b, c, d) {
        if (arguments.length >= 4) {
          return body(a, b, c, d);
        }
        return function(self) {
          return body(self, a, b, c);
        };
      };
    case 5:
      return function(a, b, c, d, e) {
        if (arguments.length >= 5) {
          return body(a, b, c, d, e);
        }
        return function(self) {
          return body(self, a, b, c, d);
        };
      };
    default:
      return function() {
        if (arguments.length >= arity) {
          return body.apply(this, arguments);
        }
        const args2 = arguments;
        return function(self) {
          return body(self, ...args2);
        };
      };
  }
};
const identity = (a) => a;
const unsafeCoerce = identity;
const constant = (value2) => () => value2;
const constTrue = /* @__PURE__ */ constant(true);
const constFalse = /* @__PURE__ */ constant(false);
const constUndefined = /* @__PURE__ */ constant(void 0);
const constVoid = constUndefined;
function pipe(a, ab, bc, cd, de, ef, fg, gh, hi) {
  switch (arguments.length) {
    case 1:
      return a;
    case 2:
      return ab(a);
    case 3:
      return bc(ab(a));
    case 4:
      return cd(bc(ab(a)));
    case 5:
      return de(cd(bc(ab(a))));
    case 6:
      return ef(de(cd(bc(ab(a)))));
    case 7:
      return fg(ef(de(cd(bc(ab(a))))));
    case 8:
      return gh(fg(ef(de(cd(bc(ab(a)))))));
    case 9:
      return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
    default: {
      let ret = arguments[0];
      for (let i = 1; i < arguments.length; i++) {
        ret = arguments[i](ret);
      }
      return ret;
    }
  }
}
const make$G = (isEquivalent) => (self, that) => self === that || isEquivalent(self, that);
const mapInput$3 = /* @__PURE__ */ dual(2, (self, f) => make$G((x, y) => self(f(x), f(y))));
const array$1 = (item) => make$G((self, that) => {
  if (self.length !== that.length) {
    return false;
  }
  for (let i = 0; i < self.length; i++) {
    const isEq = item(self[i], that[i]);
    if (!isEq) {
      return false;
    }
  }
  return true;
});
const globalStoreId = `effect/GlobalValue`;
let globalStore;
const globalValue = (id, compute) => {
  if (!globalStore) {
    globalThis[globalStoreId] ??= /* @__PURE__ */ new Map();
    globalStore = globalThis[globalStoreId];
  }
  if (!globalStore.has(id)) {
    globalStore.set(id, compute());
  }
  return globalStore.get(id);
};
const isString = (input) => typeof input === "string";
const isNumber = (input) => typeof input === "number";
const isBoolean = (input) => typeof input === "boolean";
const isBigInt = (input) => typeof input === "bigint";
const isSymbol = (input) => typeof input === "symbol";
const isFunction = isFunction$1;
const isUndefined = (input) => input === void 0;
const isNotUndefined = (input) => input !== void 0;
const isNotNull = (input) => input !== null;
const isNever = (_) => false;
const isRecordOrArray = (input) => typeof input === "object" && input !== null;
const isObject = (input) => isRecordOrArray(input) || isFunction(input);
const hasProperty = /* @__PURE__ */ dual(2, (self, property) => isObject(self) && property in self);
const isTagged = /* @__PURE__ */ dual(2, (self, tag) => hasProperty(self, "_tag") && self["_tag"] === tag);
const isNullable = (input) => input === null || input === void 0;
const isNotNullable = (input) => input !== null && input !== void 0;
const isUint8Array = (input) => input instanceof Uint8Array;
const isDate = (input) => input instanceof Date;
const isIterable = (input) => hasProperty(input, Symbol.iterator);
const isRecord = (input) => isRecordOrArray(input) && !Array.isArray(input);
const isPromiseLike = (input) => hasProperty(input, "then") && isFunction(input.then);
const getBugErrorMessage = (message) => `BUG: ${message} - please report an issue at https://github.com/Effect-TS/effect/issues`;
let SingleShotGen$1 = class SingleShotGen {
  self;
  called = false;
  constructor(self) {
    this.self = self;
  }
  /**
   * @since 2.0.0
   */
  next(a) {
    return this.called ? {
      value: a,
      done: true
    } : (this.called = true, {
      value: this.self,
      done: false
    });
  }
  /**
   * @since 2.0.0
   */
  return(a) {
    return {
      value: a,
      done: true
    };
  }
  /**
   * @since 2.0.0
   */
  throw(e) {
    throw e;
  }
  /**
   * @since 2.0.0
   */
  [Symbol.iterator]() {
    return new SingleShotGen(this.self);
  }
};
const defaultIncHi = 335903614;
const defaultIncLo = 4150755663;
const MUL_HI = 1481765933 >>> 0;
const MUL_LO = 1284865837 >>> 0;
const BIT_53 = 9007199254740992;
const BIT_27 = 134217728;
class PCGRandom {
  _state;
  constructor(seedHi, seedLo, incHi, incLo) {
    if (isNullable(seedLo) && isNullable(seedHi)) {
      seedLo = Math.random() * 4294967295 >>> 0;
      seedHi = 0;
    } else if (isNullable(seedLo)) {
      seedLo = seedHi;
      seedHi = 0;
    }
    if (isNullable(incLo) && isNullable(incHi)) {
      incLo = this._state ? this._state[3] : defaultIncLo;
      incHi = this._state ? this._state[2] : defaultIncHi;
    } else if (isNullable(incLo)) {
      incLo = incHi;
      incHi = 0;
    }
    this._state = new Int32Array([0, 0, incHi >>> 0, ((incLo || 0) | 1) >>> 0]);
    this._next();
    add64(this._state, this._state[0], this._state[1], seedHi >>> 0, seedLo >>> 0);
    this._next();
    return this;
  }
  /**
   * Returns a copy of the internal state of this random number generator as a
   * JavaScript Array.
   *
   * @category getters
   * @since 2.0.0
   */
  getState() {
    return [this._state[0], this._state[1], this._state[2], this._state[3]];
  }
  /**
   * Restore state previously retrieved using `getState()`.
   *
   * @since 2.0.0
   */
  setState(state) {
    this._state[0] = state[0];
    this._state[1] = state[1];
    this._state[2] = state[2];
    this._state[3] = state[3] | 1;
  }
  /**
   * Get a uniformly distributed 32 bit integer between [0, max).
   *
   * @category getter
   * @since 2.0.0
   */
  integer(max) {
    return Math.round(this.number() * Number.MAX_SAFE_INTEGER) % max;
  }
  /**
   * Get a uniformly distributed IEEE-754 double between 0.0 and 1.0, with
   * 53 bits of precision (every bit of the mantissa is randomized).
   *
   * @category getters
   * @since 2.0.0
   */
  number() {
    const hi = (this._next() & 67108863) * 1;
    const lo = (this._next() & 134217727) * 1;
    return (hi * BIT_27 + lo) / BIT_53;
  }
  /** @internal */
  _next() {
    const oldHi = this._state[0] >>> 0;
    const oldLo = this._state[1] >>> 0;
    mul64(this._state, oldHi, oldLo, MUL_HI, MUL_LO);
    add64(this._state, this._state[0], this._state[1], this._state[2], this._state[3]);
    let xsHi = oldHi >>> 18;
    let xsLo = (oldLo >>> 18 | oldHi << 14) >>> 0;
    xsHi = (xsHi ^ oldHi) >>> 0;
    xsLo = (xsLo ^ oldLo) >>> 0;
    const xorshifted = (xsLo >>> 27 | xsHi << 5) >>> 0;
    const rot = oldHi >>> 27;
    const rot2 = (-rot >>> 0 & 31) >>> 0;
    return (xorshifted >>> rot | xorshifted << rot2) >>> 0;
  }
}
function mul64(out, aHi, aLo, bHi, bLo) {
  let c1 = (aLo >>> 16) * (bLo & 65535) >>> 0;
  let c0 = (aLo & 65535) * (bLo >>> 16) >>> 0;
  let lo = (aLo & 65535) * (bLo & 65535) >>> 0;
  let hi = (aLo >>> 16) * (bLo >>> 16) + ((c0 >>> 16) + (c1 >>> 16)) >>> 0;
  c0 = c0 << 16 >>> 0;
  lo = lo + c0 >>> 0;
  if (lo >>> 0 < c0 >>> 0) {
    hi = hi + 1 >>> 0;
  }
  c1 = c1 << 16 >>> 0;
  lo = lo + c1 >>> 0;
  if (lo >>> 0 < c1 >>> 0) {
    hi = hi + 1 >>> 0;
  }
  hi = hi + Math.imul(aLo, bHi) >>> 0;
  hi = hi + Math.imul(aHi, bLo) >>> 0;
  out[0] = hi;
  out[1] = lo;
}
function add64(out, aHi, aLo, bHi, bLo) {
  let hi = aHi + bHi >>> 0;
  const lo = aLo + bLo >>> 0;
  if (lo >>> 0 < aLo >>> 0) {
    hi = hi + 1 | 0;
  }
  out[0] = hi;
  out[1] = lo;
}
const YieldWrapTypeId = /* @__PURE__ */ Symbol.for("effect/Utils/YieldWrap");
class YieldWrap {
  /**
   * @since 3.0.6
   */
  #value;
  constructor(value2) {
    this.#value = value2;
  }
  /**
   * @since 3.0.6
   */
  [YieldWrapTypeId]() {
    return this.#value;
  }
}
function yieldWrapGet(self) {
  if (typeof self === "object" && self !== null && YieldWrapTypeId in self) {
    return self[YieldWrapTypeId]();
  }
  throw new Error(getBugErrorMessage("yieldWrapGet"));
}
const structuralRegionState = /* @__PURE__ */ globalValue("effect/Utils/isStructuralRegion", () => ({
  enabled: false,
  tester: void 0
}));
const standard = {
  effect_internal_function: (body) => {
    return body();
  }
};
const forced = {
  effect_internal_function: (body) => {
    try {
      return body();
    } finally {
    }
  }
};
const isNotOptimizedAway = /* @__PURE__ */ standard.effect_internal_function(() => new Error().stack)?.includes("effect_internal_function") === true;
const internalCall = isNotOptimizedAway ? standard.effect_internal_function : forced.effect_internal_function;
const genConstructor = (function* () {
}).constructor;
const isGeneratorFunction = (u) => isObject(u) && u.constructor === genConstructor;
const randomHashCache = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Hash/randomHashCache"), () => /* @__PURE__ */ new WeakMap());
const symbol$1 = /* @__PURE__ */ Symbol.for("effect/Hash");
const hash = (self) => {
  if (structuralRegionState.enabled === true) {
    return 0;
  }
  switch (typeof self) {
    case "number":
      return number$1(self);
    case "bigint":
      return string$2(self.toString(10));
    case "boolean":
      return string$2(String(self));
    case "symbol":
      return string$2(String(self));
    case "string":
      return string$2(self);
    case "undefined":
      return string$2("undefined");
    case "function":
    case "object": {
      if (self === null) {
        return string$2("null");
      } else if (self instanceof Date) {
        return hash(self.toISOString());
      } else if (self instanceof URL) {
        return hash(self.href);
      } else if (isHash(self)) {
        return self[symbol$1]();
      } else {
        return random(self);
      }
    }
    default:
      throw new Error(`BUG: unhandled typeof ${typeof self} - please report an issue at https://github.com/Effect-TS/effect/issues`);
  }
};
const random = (self) => {
  if (!randomHashCache.has(self)) {
    randomHashCache.set(self, number$1(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)));
  }
  return randomHashCache.get(self);
};
const combine$7 = (b) => (self) => self * 53 ^ b;
const optimize = (n) => n & 3221225471 | n >>> 1 & 1073741824;
const isHash = (u) => hasProperty(u, symbol$1);
const number$1 = (n) => {
  if (n !== n || n === Infinity) {
    return 0;
  }
  let h = n | 0;
  if (h !== n) {
    h ^= n * 4294967295;
  }
  while (n > 4294967295) {
    h ^= n /= 4294967295;
  }
  return optimize(h);
};
const string$2 = (str) => {
  let h = 5381, i = str.length;
  while (i) {
    h = h * 33 ^ str.charCodeAt(--i);
  }
  return optimize(h);
};
const structureKeys = (o, keys2) => {
  let h = 12289;
  for (let i = 0; i < keys2.length; i++) {
    h ^= pipe(string$2(keys2[i]), combine$7(hash(o[keys2[i]])));
  }
  return optimize(h);
};
const structure = (o) => structureKeys(o, Object.keys(o));
const array = (arr) => {
  let h = 6151;
  for (let i = 0; i < arr.length; i++) {
    h = pipe(h, combine$7(hash(arr[i])));
  }
  return optimize(h);
};
const cached$1 = function() {
  if (arguments.length === 1) {
    const self2 = arguments[0];
    return function(hash3) {
      Object.defineProperty(self2, symbol$1, {
        value() {
          return hash3;
        },
        enumerable: false
      });
      return hash3;
    };
  }
  const self = arguments[0];
  const hash2 = arguments[1];
  Object.defineProperty(self, symbol$1, {
    value() {
      return hash2;
    },
    enumerable: false
  });
  return hash2;
};
const symbol = /* @__PURE__ */ Symbol.for("effect/Equal");
function equals$1() {
  if (arguments.length === 1) {
    return (self) => compareBoth(self, arguments[0]);
  }
  return compareBoth(arguments[0], arguments[1]);
}
function compareBoth(self, that) {
  if (self === that) {
    return true;
  }
  const selfType = typeof self;
  if (selfType !== typeof that) {
    return false;
  }
  if (selfType === "object" || selfType === "function") {
    if (self !== null && that !== null) {
      if (isEqual(self) && isEqual(that)) {
        if (hash(self) === hash(that) && self[symbol](that)) {
          return true;
        } else {
          return structuralRegionState.enabled && structuralRegionState.tester ? structuralRegionState.tester(self, that) : false;
        }
      } else if (self instanceof Date && that instanceof Date) {
        return self.toISOString() === that.toISOString();
      } else if (self instanceof URL && that instanceof URL) {
        return self.href === that.href;
      }
    }
    if (structuralRegionState.enabled) {
      if (Array.isArray(self) && Array.isArray(that)) {
        return self.length === that.length && self.every((v, i) => compareBoth(v, that[i]));
      }
      if (Object.getPrototypeOf(self) === Object.prototype && Object.getPrototypeOf(self) === Object.prototype) {
        const keysSelf = Object.keys(self);
        const keysThat = Object.keys(that);
        if (keysSelf.length === keysThat.length) {
          for (const key of keysSelf) {
            if (!(key in that && compareBoth(self[key], that[key]))) {
              return structuralRegionState.tester ? structuralRegionState.tester(self, that) : false;
            }
          }
          return true;
        }
      }
      return structuralRegionState.tester ? structuralRegionState.tester(self, that) : false;
    }
  }
  return structuralRegionState.enabled && structuralRegionState.tester ? structuralRegionState.tester(self, that) : false;
}
const isEqual = (u) => hasProperty(u, symbol);
const equivalence = () => equals$1;
const NodeInspectSymbol = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
const toJSON = (x) => {
  try {
    if (hasProperty(x, "toJSON") && isFunction(x["toJSON"]) && x["toJSON"].length === 0) {
      return x.toJSON();
    } else if (Array.isArray(x)) {
      return x.map(toJSON);
    }
  } catch {
    return {};
  }
  return redact(x);
};
const format$3 = (x) => JSON.stringify(x, null, 2);
const BaseProto = {
  toJSON() {
    return toJSON(this);
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  toString() {
    return format$3(this.toJSON());
  }
};
let Class$3 = class Class {
  /**
   * @since 2.0.0
   */
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
  /**
   * @since 2.0.0
   */
  toString() {
    return format$3(this.toJSON());
  }
};
const toStringUnknown = (u, whitespace = 2) => {
  if (typeof u === "string") {
    return u;
  }
  try {
    return typeof u === "object" ? stringifyCircular(u, whitespace) : String(u);
  } catch {
    return String(u);
  }
};
const stringifyCircular = (obj, whitespace) => {
  let cache = [];
  const retVal = JSON.stringify(obj, (_key, value2) => typeof value2 === "object" && value2 !== null ? cache.includes(value2) ? void 0 : cache.push(value2) && (redactableState.fiberRefs !== void 0 && isRedactable(value2) ? value2[symbolRedactable](redactableState.fiberRefs) : value2) : value2, whitespace);
  cache = void 0;
  return retVal;
};
const symbolRedactable = /* @__PURE__ */ Symbol.for("effect/Inspectable/Redactable");
const isRedactable = (u) => typeof u === "object" && u !== null && symbolRedactable in u;
const redactableState = /* @__PURE__ */ globalValue("effect/Inspectable/redactableState", () => ({
  fiberRefs: void 0
}));
const withRedactableContext = (context2, f) => {
  const prev = redactableState.fiberRefs;
  redactableState.fiberRefs = context2;
  try {
    return f();
  } finally {
    redactableState.fiberRefs = prev;
  }
};
const redact = (u) => {
  if (isRedactable(u) && redactableState.fiberRefs !== void 0) {
    return u[symbolRedactable](redactableState.fiberRefs);
  }
  return u;
};
const pipeArguments = (self, args2) => {
  switch (args2.length) {
    case 0:
      return self;
    case 1:
      return args2[0](self);
    case 2:
      return args2[1](args2[0](self));
    case 3:
      return args2[2](args2[1](args2[0](self)));
    case 4:
      return args2[3](args2[2](args2[1](args2[0](self))));
    case 5:
      return args2[4](args2[3](args2[2](args2[1](args2[0](self)))));
    case 6:
      return args2[5](args2[4](args2[3](args2[2](args2[1](args2[0](self))))));
    case 7:
      return args2[6](args2[5](args2[4](args2[3](args2[2](args2[1](args2[0](self)))))));
    case 8:
      return args2[7](args2[6](args2[5](args2[4](args2[3](args2[2](args2[1](args2[0](self))))))));
    case 9:
      return args2[8](args2[7](args2[6](args2[5](args2[4](args2[3](args2[2](args2[1](args2[0](self)))))))));
    default: {
      let ret = self;
      for (let i = 0, len = args2.length; i < len; i++) {
        ret = args2[i](ret);
      }
      return ret;
    }
  }
};
const OP_ASYNC = "Async";
const OP_COMMIT = "Commit";
const OP_FAILURE = "Failure";
const OP_ON_FAILURE = "OnFailure";
const OP_ON_SUCCESS = "OnSuccess";
const OP_ON_SUCCESS_AND_FAILURE = "OnSuccessAndFailure";
const OP_SUCCESS = "Success";
const OP_SYNC = "Sync";
const OP_TAG = "Tag";
const OP_UPDATE_RUNTIME_FLAGS = "UpdateRuntimeFlags";
const OP_WHILE = "While";
const OP_ITERATOR = "Iterator";
const OP_WITH_RUNTIME = "WithRuntime";
const OP_YIELD$1 = "Yield";
const OP_REVERT_FLAGS = "RevertFlags";
let moduleVersion = "3.17.7";
const getCurrentVersion = () => moduleVersion;
const EffectTypeId$1 = /* @__PURE__ */ Symbol.for("effect/Effect");
const StreamTypeId$1 = /* @__PURE__ */ Symbol.for("effect/Stream");
const SinkTypeId$1 = /* @__PURE__ */ Symbol.for("effect/Sink");
const ChannelTypeId$1 = /* @__PURE__ */ Symbol.for("effect/Channel");
const effectVariance = {
  /* c8 ignore next */
  _R: (_) => _,
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _A: (_) => _,
  _V: /* @__PURE__ */ getCurrentVersion()
};
const sinkVariance$1 = {
  /* c8 ignore next */
  _A: (_) => _,
  /* c8 ignore next */
  _In: (_) => _,
  /* c8 ignore next */
  _L: (_) => _,
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _R: (_) => _
};
const channelVariance$1 = {
  /* c8 ignore next */
  _Env: (_) => _,
  /* c8 ignore next */
  _InErr: (_) => _,
  /* c8 ignore next */
  _InElem: (_) => _,
  /* c8 ignore next */
  _InDone: (_) => _,
  /* c8 ignore next */
  _OutErr: (_) => _,
  /* c8 ignore next */
  _OutElem: (_) => _,
  /* c8 ignore next */
  _OutDone: (_) => _
};
const EffectPrototype$1 = {
  [EffectTypeId$1]: effectVariance,
  [StreamTypeId$1]: effectVariance,
  [SinkTypeId$1]: sinkVariance$1,
  [ChannelTypeId$1]: channelVariance$1,
  [symbol](that) {
    return this === that;
  },
  [symbol$1]() {
    return cached$1(this, random(this));
  },
  [Symbol.iterator]() {
    return new SingleShotGen$1(new YieldWrap(this));
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const StructuralPrototype = {
  [symbol$1]() {
    return cached$1(this, structure(this));
  },
  [symbol](that) {
    const selfKeys = Object.keys(this);
    const thatKeys = Object.keys(that);
    if (selfKeys.length !== thatKeys.length) {
      return false;
    }
    for (const key of selfKeys) {
      if (!(key in that && equals$1(this[key], that[key]))) {
        return false;
      }
    }
    return true;
  }
};
const CommitPrototype$1 = {
  ...EffectPrototype$1,
  _op: OP_COMMIT
};
const StructuralCommitPrototype = {
  ...CommitPrototype$1,
  ...StructuralPrototype
};
const Base$1 = /* @__PURE__ */ (function() {
  function Base2() {
  }
  Base2.prototype = CommitPrototype$1;
  return Base2;
})();
const TypeId$e = /* @__PURE__ */ Symbol.for("effect/Option");
const CommonProto$1 = {
  ...EffectPrototype$1,
  [TypeId$e]: {
    _A: (_) => _
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  toString() {
    return format$3(this.toJSON());
  }
};
const SomeProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto$1), {
  _tag: "Some",
  _op: "Some",
  [symbol](that) {
    return isOption$1(that) && isSome$1(that) && equals$1(this.value, that.value);
  },
  [symbol$1]() {
    return cached$1(this, combine$7(hash(this._tag))(hash(this.value)));
  },
  toJSON() {
    return {
      _id: "Option",
      _tag: this._tag,
      value: toJSON(this.value)
    };
  }
});
const NoneHash = /* @__PURE__ */ hash("None");
const NoneProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto$1), {
  _tag: "None",
  _op: "None",
  [symbol](that) {
    return isOption$1(that) && isNone$1(that);
  },
  [symbol$1]() {
    return NoneHash;
  },
  toJSON() {
    return {
      _id: "Option",
      _tag: this._tag
    };
  }
});
const isOption$1 = (input) => hasProperty(input, TypeId$e);
const isNone$1 = (fa) => fa._tag === "None";
const isSome$1 = (fa) => fa._tag === "Some";
const none$7 = /* @__PURE__ */ Object.create(NoneProto);
const some$1 = (value2) => {
  const a = Object.create(SomeProto);
  a.value = value2;
  return a;
};
const TypeId$d = /* @__PURE__ */ Symbol.for("effect/Either");
const CommonProto = {
  ...EffectPrototype$1,
  [TypeId$d]: {
    _R: (_) => _
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  toString() {
    return format$3(this.toJSON());
  }
};
const RightProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto), {
  _tag: "Right",
  _op: "Right",
  [symbol](that) {
    return isEither$2(that) && isRight$1(that) && equals$1(this.right, that.right);
  },
  [symbol$1]() {
    return combine$7(hash(this._tag))(hash(this.right));
  },
  toJSON() {
    return {
      _id: "Either",
      _tag: this._tag,
      right: toJSON(this.right)
    };
  }
});
const LeftProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(CommonProto), {
  _tag: "Left",
  _op: "Left",
  [symbol](that) {
    return isEither$2(that) && isLeft$1(that) && equals$1(this.left, that.left);
  },
  [symbol$1]() {
    return combine$7(hash(this._tag))(hash(this.left));
  },
  toJSON() {
    return {
      _id: "Either",
      _tag: this._tag,
      left: toJSON(this.left)
    };
  }
});
const isEither$2 = (input) => hasProperty(input, TypeId$d);
const isLeft$1 = (ma) => ma._tag === "Left";
const isRight$1 = (ma) => ma._tag === "Right";
const left$1 = (left2) => {
  const a = Object.create(LeftProto);
  a.left = left2;
  return a;
};
const right$1 = (right2) => {
  const a = Object.create(RightProto);
  a.right = right2;
  return a;
};
const right = right$1;
const left = left$1;
const try_$2 = (evaluate2) => {
  if (isFunction(evaluate2)) {
    try {
      return right(evaluate2());
    } catch (e) {
      return left(e);
    }
  } else {
    try {
      return right(evaluate2.try());
    } catch (e) {
      return left(evaluate2.catch(e));
    }
  }
};
const isEither$1 = isEither$2;
const isLeft = isLeft$1;
const isRight = isRight$1;
const mapBoth$3 = /* @__PURE__ */ dual(2, (self, {
  onLeft,
  onRight
}) => isLeft(self) ? left(onLeft(self.left)) : right(onRight(self.right)));
const mapLeft = /* @__PURE__ */ dual(2, (self, f) => isLeft(self) ? left(f(self.left)) : right(self.right));
const map$j = /* @__PURE__ */ dual(2, (self, f) => isRight(self) ? right(f(self.right)) : left(self.left));
const match$a = /* @__PURE__ */ dual(2, (self, {
  onLeft,
  onRight
}) => isLeft(self) ? onLeft(self.left) : onRight(self.right));
const merge$4 = /* @__PURE__ */ match$a({
  onLeft: identity,
  onRight: identity
});
const getOrThrowWith = /* @__PURE__ */ dual(2, (self, onLeft) => {
  if (isRight(self)) {
    return self.right;
  }
  throw onLeft(self.left);
});
const getOrThrow = /* @__PURE__ */ getOrThrowWith(() => new Error("getOrThrow called on a Left"));
const isNonEmptyArray$1 = (self) => self.length > 0;
const make$F = (compare2) => (self, that) => self === that ? 0 : compare2(self, that);
const number = /* @__PURE__ */ make$F((self, that) => self < that ? -1 : 1);
const mapInput$2 = /* @__PURE__ */ dual(2, (self, f) => make$F((b1, b2) => self(f(b1), f(b2))));
const greaterThan$1 = (O) => dual(2, (self, that) => O(self, that) === 1);
const none$6 = () => none$7;
const some = some$1;
const isOption = isOption$1;
const isNone = isNone$1;
const isSome = isSome$1;
const match$9 = /* @__PURE__ */ dual(2, (self, {
  onNone,
  onSome
}) => isNone(self) ? onNone() : onSome(self.value));
const getOrElse = /* @__PURE__ */ dual(2, (self, onNone) => isNone(self) ? onNone() : self.value);
const orElse$5 = /* @__PURE__ */ dual(2, (self, that) => isNone(self) ? that() : self);
const orElseSome = /* @__PURE__ */ dual(2, (self, onNone) => isNone(self) ? some(onNone()) : self);
const fromNullable = (nullableValue) => nullableValue == null ? none$6() : some(nullableValue);
const getOrUndefined = /* @__PURE__ */ getOrElse(constUndefined);
const liftThrowable = (f) => (...a) => {
  try {
    return some(f(...a));
  } catch {
    return none$6();
  }
};
const map$i = /* @__PURE__ */ dual(2, (self, f) => isNone(self) ? none$6() : some(f(self.value)));
const flatMap$9 = /* @__PURE__ */ dual(2, (self, f) => isNone(self) ? none$6() : f(self.value));
const flatMapNullable = /* @__PURE__ */ dual(2, (self, f) => isNone(self) ? none$6() : fromNullable(f(self.value)));
const all$3 = (input) => {
  if (Symbol.iterator in input) {
    const out2 = [];
    for (const o of input) {
      if (isNone(o)) {
        return none$6();
      }
      out2.push(o.value);
    }
    return some(out2);
  }
  const out = {};
  for (const key of Object.keys(input)) {
    const o = input[key];
    if (isNone(o)) {
      return none$6();
    }
    out[key] = o.value;
  }
  return some(out);
};
const filterMap$1 = flatMap$9;
const filter$3 = /* @__PURE__ */ dual(2, (self, predicate) => filterMap$1(self, (b) => predicate(b) ? some$1(b) : none$7));
const getEquivalence$4 = (isEquivalent) => make$G((x, y) => isNone(x) ? isNone(y) : isNone(y) ? false : isEquivalent(x.value, y.value));
const containsWith = (isEquivalent) => dual(2, (self, a) => isNone(self) ? false : isEquivalent(self.value, a));
const _equivalence$3 = /* @__PURE__ */ equivalence();
const contains = /* @__PURE__ */ containsWith(_equivalence$3);
const exists = /* @__PURE__ */ dual(2, (self, refinement) => isNone(self) ? false : refinement(self.value));
const make$E = (...elements) => elements;
const map$h = /* @__PURE__ */ dual(2, (self, f) => {
  const out = {
    ...self
  };
  for (const key of keys$2(self)) {
    out[key] = f(self[key], key);
  }
  return out;
});
const keys$2 = (self) => Object.keys(self);
const make$D = (...elements) => elements;
const allocate = (n) => new Array(n);
const makeBy = /* @__PURE__ */ dual(2, (n, f) => {
  const max = Math.max(1, Math.floor(n));
  const out = new Array(max);
  for (let i = 0; i < max; i++) {
    out[i] = f(i);
  }
  return out;
});
const fromIterable$6 = (collection) => Array.isArray(collection) ? collection : Array.from(collection);
const ensure = (self) => Array.isArray(self) ? self : [self];
const match$8 = /* @__PURE__ */ dual(2, (self, {
  onEmpty,
  onNonEmpty
}) => isNonEmptyReadonlyArray(self) ? onNonEmpty(self) : onEmpty());
const matchLeft = /* @__PURE__ */ dual(2, (self, {
  onEmpty,
  onNonEmpty
}) => isNonEmptyReadonlyArray(self) ? onNonEmpty(headNonEmpty$1(self), tailNonEmpty$1(self)) : onEmpty());
const prepend$2 = /* @__PURE__ */ dual(2, (self, head2) => [head2, ...self]);
const append$2 = /* @__PURE__ */ dual(2, (self, last2) => [...self, last2]);
const appendAll$2 = /* @__PURE__ */ dual(2, (self, that) => fromIterable$6(self).concat(fromIterable$6(that)));
const isArray = Array.isArray;
const isEmptyArray = (self) => self.length === 0;
const isEmptyReadonlyArray = isEmptyArray;
const isNonEmptyArray = isNonEmptyArray$1;
const isNonEmptyReadonlyArray = isNonEmptyArray$1;
const isOutOfBounds = (i, as2) => i < 0 || i >= as2.length;
const clamp = (i, as2) => Math.floor(Math.min(Math.max(0, i), as2.length));
const get$b = /* @__PURE__ */ dual(2, (self, index) => {
  const i = Math.floor(index);
  return isOutOfBounds(i, self) ? none$6() : some(self[i]);
});
const unsafeGet$3 = /* @__PURE__ */ dual(2, (self, index) => {
  const i = Math.floor(index);
  if (isOutOfBounds(i, self)) {
    throw new Error(`Index ${i} out of bounds`);
  }
  return self[i];
});
const head$1 = /* @__PURE__ */ get$b(0);
const headNonEmpty$1 = /* @__PURE__ */ unsafeGet$3(0);
const last = (self) => isNonEmptyReadonlyArray(self) ? some(lastNonEmpty(self)) : none$6();
const lastNonEmpty = (self) => self[self.length - 1];
const tailNonEmpty$1 = (self) => self.slice(1);
const spanIndex = (self, predicate) => {
  let i = 0;
  for (const a of self) {
    if (!predicate(a, i)) {
      break;
    }
    i++;
  }
  return i;
};
const span = /* @__PURE__ */ dual(2, (self, predicate) => splitAt(self, spanIndex(self, predicate)));
const drop$1 = /* @__PURE__ */ dual(2, (self, n) => {
  const input = fromIterable$6(self);
  return input.slice(clamp(n, input), input.length);
});
const reverse$2 = (self) => Array.from(self).reverse();
const sort = /* @__PURE__ */ dual(2, (self, O) => {
  const out = Array.from(self);
  out.sort(O);
  return out;
});
const zip$6 = /* @__PURE__ */ dual(2, (self, that) => zipWith$3(self, that, make$E));
const zipWith$3 = /* @__PURE__ */ dual(3, (self, that, f) => {
  const as2 = fromIterable$6(self);
  const bs = fromIterable$6(that);
  if (isNonEmptyReadonlyArray(as2) && isNonEmptyReadonlyArray(bs)) {
    const out = [f(headNonEmpty$1(as2), headNonEmpty$1(bs))];
    const len = Math.min(as2.length, bs.length);
    for (let i = 1; i < len; i++) {
      out[i] = f(as2[i], bs[i]);
    }
    return out;
  }
  return [];
});
const _equivalence$2 = /* @__PURE__ */ equivalence();
const splitAt = /* @__PURE__ */ dual(2, (self, n) => {
  const input = Array.from(self);
  const _n = Math.floor(n);
  if (isNonEmptyReadonlyArray(input)) {
    if (_n >= 1) {
      return splitNonEmptyAt(input, _n);
    }
    return [[], input];
  }
  return [input, []];
});
const splitNonEmptyAt = /* @__PURE__ */ dual(2, (self, n) => {
  const _n = Math.max(1, Math.floor(n));
  return _n >= self.length ? [copy$1(self), []] : [prepend$2(self.slice(1, _n), headNonEmpty$1(self)), self.slice(_n)];
});
const copy$1 = (self) => self.slice();
const unionWith = /* @__PURE__ */ dual(3, (self, that, isEquivalent) => {
  const a = fromIterable$6(self);
  const b = fromIterable$6(that);
  if (isNonEmptyReadonlyArray(a)) {
    if (isNonEmptyReadonlyArray(b)) {
      const dedupe2 = dedupeWith(isEquivalent);
      return dedupe2(appendAll$2(a, b));
    }
    return a;
  }
  return b;
});
const union$2 = /* @__PURE__ */ dual(2, (self, that) => unionWith(self, that, _equivalence$2));
const empty$n = () => [];
const of$2 = (a) => [a];
const map$g = /* @__PURE__ */ dual(2, (self, f) => self.map(f));
const flatMap$8 = /* @__PURE__ */ dual(2, (self, f) => {
  if (isEmptyReadonlyArray(self)) {
    return [];
  }
  const out = [];
  for (let i = 0; i < self.length; i++) {
    const inner = f(self[i], i);
    for (let j = 0; j < inner.length; j++) {
      out.push(inner[j]);
    }
  }
  return out;
});
const flatten$7 = /* @__PURE__ */ flatMap$8(identity);
const filterMap = /* @__PURE__ */ dual(2, (self, f) => {
  const as2 = fromIterable$6(self);
  const out = [];
  for (let i = 0; i < as2.length; i++) {
    const o = f(as2[i], i);
    if (isSome(o)) {
      out.push(o.value);
    }
  }
  return out;
});
const filter$2 = /* @__PURE__ */ dual(2, (self, predicate) => {
  const as2 = fromIterable$6(self);
  const out = [];
  for (let i = 0; i < as2.length; i++) {
    if (predicate(as2[i], i)) {
      out.push(as2[i]);
    }
  }
  return out;
});
const reduce$7 = /* @__PURE__ */ dual(3, (self, b, f) => fromIterable$6(self).reduce((b2, a, i) => f(b2, a, i), b));
const unfold$1 = (b, f) => {
  const out = [];
  let next = b;
  let o;
  while (isSome(o = f(next))) {
    const [a, b2] = o.value;
    out.push(a);
    next = b2;
  }
  return out;
};
const getEquivalence$3 = array$1;
const dedupeWith = /* @__PURE__ */ dual(2, (self, isEquivalent) => {
  const input = fromIterable$6(self);
  if (isNonEmptyReadonlyArray(input)) {
    const out = [headNonEmpty$1(input)];
    const rest = tailNonEmpty$1(input);
    for (const r of rest) {
      if (out.every((a) => !isEquivalent(r, a))) {
        out.push(r);
      }
    }
    return out;
  }
  return [];
});
const dedupe = (self) => dedupeWith(self, equivalence());
const join$2 = /* @__PURE__ */ dual(2, (self, sep) => fromIterable$6(self).join(sep));
const TagTypeId = /* @__PURE__ */ Symbol.for("effect/Context/Tag");
const ReferenceTypeId = /* @__PURE__ */ Symbol.for("effect/Context/Reference");
const STMSymbolKey = "effect/STM";
const STMTypeId = /* @__PURE__ */ Symbol.for(STMSymbolKey);
const TagProto = {
  ...EffectPrototype$1,
  _op: "Tag",
  [STMTypeId]: effectVariance,
  [TagTypeId]: {
    _Service: (_) => _,
    _Identifier: (_) => _
  },
  toString() {
    return format$3(this.toJSON());
  },
  toJSON() {
    return {
      _id: "Tag",
      key: this.key,
      stack: this.stack
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  of(self) {
    return self;
  },
  context(self) {
    return make$C(this, self);
  }
};
const ReferenceProto = {
  ...TagProto,
  [ReferenceTypeId]: ReferenceTypeId
};
const makeGenericTag = (key) => {
  const limit = Error.stackTraceLimit;
  Error.stackTraceLimit = 2;
  const creationError = new Error();
  Error.stackTraceLimit = limit;
  const tag = Object.create(TagProto);
  Object.defineProperty(tag, "stack", {
    get() {
      return creationError.stack;
    }
  });
  tag.key = key;
  return tag;
};
const Tag$1 = (id) => () => {
  const limit = Error.stackTraceLimit;
  Error.stackTraceLimit = 2;
  const creationError = new Error();
  Error.stackTraceLimit = limit;
  function TagClass() {
  }
  Object.setPrototypeOf(TagClass, TagProto);
  TagClass.key = id;
  Object.defineProperty(TagClass, "stack", {
    get() {
      return creationError.stack;
    }
  });
  return TagClass;
};
const Reference$1 = () => (id, options) => {
  const limit = Error.stackTraceLimit;
  Error.stackTraceLimit = 2;
  const creationError = new Error();
  Error.stackTraceLimit = limit;
  function ReferenceClass() {
  }
  Object.setPrototypeOf(ReferenceClass, ReferenceProto);
  ReferenceClass.key = id;
  ReferenceClass.defaultValue = options.defaultValue;
  Object.defineProperty(ReferenceClass, "stack", {
    get() {
      return creationError.stack;
    }
  });
  return ReferenceClass;
};
const TypeId$c = /* @__PURE__ */ Symbol.for("effect/Context");
const ContextProto = {
  [TypeId$c]: {
    _Services: (_) => _
  },
  [symbol](that) {
    if (isContext$1(that)) {
      if (this.unsafeMap.size === that.unsafeMap.size) {
        for (const k of this.unsafeMap.keys()) {
          if (!that.unsafeMap.has(k) || !equals$1(this.unsafeMap.get(k), that.unsafeMap.get(k))) {
            return false;
          }
        }
        return true;
      }
    }
    return false;
  },
  [symbol$1]() {
    return cached$1(this, number$1(this.unsafeMap.size));
  },
  pipe() {
    return pipeArguments(this, arguments);
  },
  toString() {
    return format$3(this.toJSON());
  },
  toJSON() {
    return {
      _id: "Context",
      services: Array.from(this.unsafeMap).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
};
const makeContext = (unsafeMap) => {
  const context2 = Object.create(ContextProto);
  context2.unsafeMap = unsafeMap;
  return context2;
};
const serviceNotFoundError = (tag) => {
  const error = new Error(`Service not found${tag.key ? `: ${String(tag.key)}` : ""}`);
  if (tag.stack) {
    const lines = tag.stack.split("\n");
    if (lines.length > 2) {
      const afterAt = lines[2].match(/at (.*)/);
      if (afterAt) {
        error.message = error.message + ` (defined at ${afterAt[1]})`;
      }
    }
  }
  if (error.stack) {
    const lines = error.stack.split("\n");
    lines.splice(1, 3);
    error.stack = lines.join("\n");
  }
  return error;
};
const isContext$1 = (u) => hasProperty(u, TypeId$c);
const isTag$1 = (u) => hasProperty(u, TagTypeId);
const isReference = (u) => hasProperty(u, ReferenceTypeId);
const _empty$6 = /* @__PURE__ */ makeContext(/* @__PURE__ */ new Map());
const empty$m = () => _empty$6;
const make$C = (tag, service) => makeContext(/* @__PURE__ */ new Map([[tag.key, service]]));
const add$4 = /* @__PURE__ */ dual(3, (self, tag, service) => {
  const map2 = new Map(self.unsafeMap);
  map2.set(tag.key, service);
  return makeContext(map2);
});
const defaultValueCache = /* @__PURE__ */ globalValue("effect/Context/defaultValueCache", () => /* @__PURE__ */ new Map());
const getDefaultValue = (tag) => {
  if (defaultValueCache.has(tag.key)) {
    return defaultValueCache.get(tag.key);
  }
  const value2 = tag.defaultValue();
  defaultValueCache.set(tag.key, value2);
  return value2;
};
const unsafeGetReference = (self, tag) => {
  return self.unsafeMap.has(tag.key) ? self.unsafeMap.get(tag.key) : getDefaultValue(tag);
};
const unsafeGet$2 = /* @__PURE__ */ dual(2, (self, tag) => {
  if (!self.unsafeMap.has(tag.key)) {
    if (ReferenceTypeId in tag) return getDefaultValue(tag);
    throw serviceNotFoundError(tag);
  }
  return self.unsafeMap.get(tag.key);
});
const get$a = unsafeGet$2;
const getOption$1 = /* @__PURE__ */ dual(2, (self, tag) => {
  if (!self.unsafeMap.has(tag.key)) {
    return isReference(tag) ? some$1(getDefaultValue(tag)) : none$7;
  }
  return some$1(self.unsafeMap.get(tag.key));
});
const merge$3 = /* @__PURE__ */ dual(2, (self, that) => {
  const map2 = new Map(self.unsafeMap);
  for (const [tag, s] of that.unsafeMap) {
    map2.set(tag, s);
  }
  return makeContext(map2);
});
const GenericTag = makeGenericTag;
const isContext = isContext$1;
const isTag = isTag$1;
const empty$l = empty$m;
const make$B = make$C;
const add$3 = add$4;
const get$9 = get$a;
const unsafeGet$1 = unsafeGet$2;
const getOption = getOption$1;
const merge$2 = merge$3;
const Tag = Tag$1;
const Reference = Reference$1;
const EffectPrototype = EffectPrototype$1;
const CommitPrototype = CommitPrototype$1;
const Base = Base$1;
let Class$2 = class Class2 extends Base {
};
const TypeId$b = /* @__PURE__ */ Symbol.for("effect/Micro");
const MicroExitTypeId = /* @__PURE__ */ Symbol.for("effect/Micro/MicroExit");
const MicroCauseTypeId = /* @__PURE__ */ Symbol.for("effect/Micro/MicroCause");
const microCauseVariance = {
  _E: identity
};
class MicroCauseImpl extends globalThis.Error {
  _tag;
  traces;
  [MicroCauseTypeId];
  constructor(_tag, originalError, traces) {
    const causeName = `MicroCause.${_tag}`;
    let name;
    let message;
    let stack;
    if (originalError instanceof globalThis.Error) {
      name = `(${causeName}) ${originalError.name}`;
      message = originalError.message;
      const messageLines = message.split("\n").length;
      stack = originalError.stack ? `(${causeName}) ${originalError.stack.split("\n").slice(0, messageLines + 3).join("\n")}` : `${name}: ${message}`;
    } else {
      name = causeName;
      message = toStringUnknown(originalError, 0);
      stack = `${name}: ${message}`;
    }
    if (traces.length > 0) {
      stack += `
    ${traces.join("\n    ")}`;
    }
    super(message);
    this._tag = _tag;
    this.traces = traces;
    this[MicroCauseTypeId] = microCauseVariance;
    this.name = name;
    this.stack = stack;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
  toString() {
    return this.stack;
  }
  [NodeInspectSymbol]() {
    return this.stack;
  }
}
class Fail extends MicroCauseImpl {
  error;
  constructor(error, traces = []) {
    super("Fail", error, traces);
    this.error = error;
  }
}
const causeFail = (error, traces = []) => new Fail(error, traces);
class Die extends MicroCauseImpl {
  defect;
  constructor(defect, traces = []) {
    super("Die", defect, traces);
    this.defect = defect;
  }
}
const causeDie = (defect, traces = []) => new Die(defect, traces);
class Interrupt extends MicroCauseImpl {
  constructor(traces = []) {
    super("Interrupt", "interrupted", traces);
  }
}
const causeInterrupt = (traces = []) => new Interrupt(traces);
const causeIsInterrupt = (self) => self._tag === "Interrupt";
const causeWithTrace = /* @__PURE__ */ dual(2, (self, trace) => {
  const traces = [...self.traces, trace];
  switch (self._tag) {
    case "Die":
      return causeDie(self.defect, traces);
    case "Interrupt":
      return causeInterrupt(traces);
    case "Fail":
      return causeFail(self.error, traces);
  }
});
const MicroFiberTypeId = /* @__PURE__ */ Symbol.for("effect/Micro/MicroFiber");
const fiberVariance$1 = {
  _A: identity,
  _E: identity
};
class MicroFiberImpl {
  context;
  interruptible;
  [MicroFiberTypeId];
  _stack = [];
  _observers = [];
  _exit;
  _children;
  currentOpCount = 0;
  constructor(context2, interruptible2 = true) {
    this.context = context2;
    this.interruptible = interruptible2;
    this[MicroFiberTypeId] = fiberVariance$1;
  }
  getRef(ref) {
    return unsafeGetReference(this.context, ref);
  }
  addObserver(cb) {
    if (this._exit) {
      cb(this._exit);
      return constVoid;
    }
    this._observers.push(cb);
    return () => {
      const index = this._observers.indexOf(cb);
      if (index >= 0) {
        this._observers.splice(index, 1);
      }
    };
  }
  _interrupted = false;
  unsafeInterrupt() {
    if (this._exit) {
      return;
    }
    this._interrupted = true;
    if (this.interruptible) {
      this.evaluate(exitInterrupt$1);
    }
  }
  unsafePoll() {
    return this._exit;
  }
  evaluate(effect2) {
    if (this._exit) {
      return;
    } else if (this._yielded !== void 0) {
      const yielded = this._yielded;
      this._yielded = void 0;
      yielded();
    }
    const exit2 = this.runLoop(effect2);
    if (exit2 === Yield) {
      return;
    }
    const interruptChildren = fiberMiddleware.interruptChildren && fiberMiddleware.interruptChildren(this);
    if (interruptChildren !== void 0) {
      return this.evaluate(flatMap$7(interruptChildren, () => exit2));
    }
    this._exit = exit2;
    for (let i = 0; i < this._observers.length; i++) {
      this._observers[i](exit2);
    }
    this._observers.length = 0;
  }
  runLoop(effect2) {
    let yielding = false;
    let current = effect2;
    this.currentOpCount = 0;
    try {
      while (true) {
        this.currentOpCount++;
        if (!yielding && this.getRef(CurrentScheduler).shouldYield(this)) {
          yielding = true;
          const prev = current;
          current = flatMap$7(yieldNow$2, () => prev);
        }
        current = current[evaluate](this);
        if (current === Yield) {
          const yielded = this._yielded;
          if (MicroExitTypeId in yielded) {
            this._yielded = void 0;
            return yielded;
          }
          return Yield;
        }
      }
    } catch (error) {
      if (!hasProperty(current, evaluate)) {
        return exitDie$1(`MicroFiber.runLoop: Not a valid effect: ${String(current)}`);
      }
      return exitDie$1(error);
    }
  }
  getCont(symbol2) {
    while (true) {
      const op = this._stack.pop();
      if (!op) return void 0;
      const cont = op[ensureCont] && op[ensureCont](this);
      if (cont) return {
        [symbol2]: cont
      };
      if (op[symbol2]) return op;
    }
  }
  // cancel the yielded operation, or for the yielded exit value
  _yielded = void 0;
  yieldWith(value2) {
    this._yielded = value2;
    return Yield;
  }
  children() {
    return this._children ??= /* @__PURE__ */ new Set();
  }
}
const fiberMiddleware = /* @__PURE__ */ globalValue("effect/Micro/fiberMiddleware", () => ({
  interruptChildren: void 0
}));
const identifier = /* @__PURE__ */ Symbol.for("effect/Micro/identifier");
const args = /* @__PURE__ */ Symbol.for("effect/Micro/args");
const evaluate = /* @__PURE__ */ Symbol.for("effect/Micro/evaluate");
const successCont = /* @__PURE__ */ Symbol.for("effect/Micro/successCont");
const failureCont = /* @__PURE__ */ Symbol.for("effect/Micro/failureCont");
const ensureCont = /* @__PURE__ */ Symbol.for("effect/Micro/ensureCont");
const Yield = /* @__PURE__ */ Symbol.for("effect/Micro/Yield");
const microVariance = {
  _A: identity,
  _E: identity,
  _R: identity
};
const MicroProto = {
  ...EffectPrototype,
  _op: "Micro",
  [TypeId$b]: microVariance,
  pipe() {
    return pipeArguments(this, arguments);
  },
  [Symbol.iterator]() {
    return new SingleShotGen$1(new YieldWrap(this));
  },
  toJSON() {
    return {
      _id: "Micro",
      op: this[identifier],
      ...args in this ? {
        args: this[args]
      } : void 0
    };
  },
  toString() {
    return format$3(this);
  },
  [NodeInspectSymbol]() {
    return format$3(this);
  }
};
function defaultEvaluate(_fiber) {
  return exitDie$1(`Micro.evaluate: Not implemented`);
}
const makePrimitiveProto = (options) => ({
  ...MicroProto,
  [identifier]: options.op,
  [evaluate]: options.eval ?? defaultEvaluate,
  [successCont]: options.contA,
  [failureCont]: options.contE,
  [ensureCont]: options.ensure
});
const makePrimitive = (options) => {
  const Proto = makePrimitiveProto(options);
  return function() {
    const self = Object.create(Proto);
    self[args] = options.single === false ? arguments : arguments[0];
    return self;
  };
};
const makeExit = (options) => {
  const Proto = {
    ...makePrimitiveProto(options),
    [MicroExitTypeId]: MicroExitTypeId,
    _tag: options.op,
    get [options.prop]() {
      return this[args];
    },
    toJSON() {
      return {
        _id: "MicroExit",
        _tag: options.op,
        [options.prop]: this[args]
      };
    },
    [symbol](that) {
      return isMicroExit(that) && that._tag === options.op && equals$1(this[args], that[args]);
    },
    [symbol$1]() {
      return cached$1(this, combine$7(string$2(options.op))(hash(this[args])));
    }
  };
  return function(value2) {
    const self = Object.create(Proto);
    self[args] = value2;
    self[successCont] = void 0;
    self[failureCont] = void 0;
    self[ensureCont] = void 0;
    return self;
  };
};
const succeed$c = /* @__PURE__ */ makeExit({
  op: "Success",
  prop: "value",
  eval(fiber) {
    const cont = fiber.getCont(successCont);
    return cont ? cont[successCont](this[args], fiber) : fiber.yieldWith(this);
  }
});
const failCause$6 = /* @__PURE__ */ makeExit({
  op: "Failure",
  prop: "cause",
  eval(fiber) {
    let cont = fiber.getCont(failureCont);
    while (causeIsInterrupt(this[args]) && cont && fiber.interruptible) {
      cont = fiber.getCont(failureCont);
    }
    return cont ? cont[failureCont](this[args], fiber) : fiber.yieldWith(this);
  }
});
const fail$a = (error) => failCause$6(causeFail(error));
const sync$5 = /* @__PURE__ */ makePrimitive({
  op: "Sync",
  eval(fiber) {
    const value2 = this[args]();
    const cont = fiber.getCont(successCont);
    return cont ? cont[successCont](value2, fiber) : fiber.yieldWith(exitSucceed$1(value2));
  }
});
const suspend$7 = /* @__PURE__ */ makePrimitive({
  op: "Suspend",
  eval(_fiber) {
    return this[args]();
  }
});
const yieldNowWith = /* @__PURE__ */ makePrimitive({
  op: "Yield",
  eval(fiber) {
    let resumed = false;
    fiber.getRef(CurrentScheduler).scheduleTask(() => {
      if (resumed) return;
      fiber.evaluate(exitVoid$1);
    }, this[args] ?? 0);
    return fiber.yieldWith(() => {
      resumed = true;
    });
  }
});
const yieldNow$2 = /* @__PURE__ */ yieldNowWith(0);
const void_$3 = /* @__PURE__ */ succeed$c(void 0);
const tryPromise$2 = (options) => asyncOptions(function(resume2, signal) {
  try {
    options.try(signal).then((a) => resume2(succeed$c(a)), (e) => resume2(fail$a(options.catch(e))));
  } catch (err) {
    resume2(fail$a(options.catch(err)));
  }
}, options.try.length !== 0);
const withMicroFiber = /* @__PURE__ */ makePrimitive({
  op: "WithMicroFiber",
  eval(fiber) {
    return this[args](fiber);
  }
});
const asyncOptions = /* @__PURE__ */ makePrimitive({
  op: "Async",
  single: false,
  eval(fiber) {
    const register = this[args][0];
    let resumed = false;
    let yielded = false;
    const controller = this[args][1] ? new AbortController() : void 0;
    const onCancel = register((effect2) => {
      if (resumed) return;
      resumed = true;
      if (yielded) {
        fiber.evaluate(effect2);
      } else {
        yielded = effect2;
      }
    }, controller?.signal);
    if (yielded !== false) return yielded;
    yielded = true;
    fiber._yielded = () => {
      resumed = true;
    };
    if (controller === void 0 && onCancel === void 0) {
      return Yield;
    }
    fiber._stack.push(asyncFinalizer(() => {
      resumed = true;
      controller?.abort();
      return onCancel ?? exitVoid$1;
    }));
    return Yield;
  }
});
const asyncFinalizer = /* @__PURE__ */ makePrimitive({
  op: "AsyncFinalizer",
  ensure(fiber) {
    if (fiber.interruptible) {
      fiber.interruptible = false;
      fiber._stack.push(setInterruptible(true));
    }
  },
  contE(cause, _fiber) {
    return causeIsInterrupt(cause) ? flatMap$7(this[args](), () => failCause$6(cause)) : failCause$6(cause);
  }
});
const gen$2 = (...args2) => suspend$7(() => fromIterator$1(args2.length === 1 ? args2[0]() : args2[1].call(args2[0])));
const fromIterator$1 = /* @__PURE__ */ makePrimitive({
  op: "Iterator",
  contA(value2, fiber) {
    const state = this[args].next(value2);
    if (state.done) return succeed$c(state.value);
    fiber._stack.push(this);
    return yieldWrapGet(state.value);
  },
  eval(fiber) {
    return this[successCont](void 0, fiber);
  }
});
const flatMap$7 = /* @__PURE__ */ dual(2, (self, f) => {
  const onSuccess = Object.create(OnSuccessProto);
  onSuccess[args] = self;
  onSuccess[successCont] = f;
  return onSuccess;
});
const OnSuccessProto = /* @__PURE__ */ makePrimitiveProto({
  op: "OnSuccess",
  eval(fiber) {
    fiber._stack.push(this);
    return this[args];
  }
});
const map$f = /* @__PURE__ */ dual(2, (self, f) => flatMap$7(self, (a) => succeed$c(f(a))));
const isMicroExit = (u) => hasProperty(u, MicroExitTypeId);
const exitSucceed$1 = succeed$c;
const exitFailCause$1 = failCause$6;
const exitInterrupt$1 = /* @__PURE__ */ exitFailCause$1(/* @__PURE__ */ causeInterrupt());
const exitDie$1 = (defect) => exitFailCause$1(causeDie(defect));
const exitIsFailure$1 = (self) => self._tag === "Failure";
const exitVoid$1 = /* @__PURE__ */ exitSucceed$1(void 0);
const setImmediate = "setImmediate" in globalThis ? globalThis.setImmediate : (f) => setTimeout(f, 0);
class MicroSchedulerDefault {
  tasks = [];
  running = false;
  /**
   * @since 3.5.9
   */
  scheduleTask(task, _priority) {
    this.tasks.push(task);
    if (!this.running) {
      this.running = true;
      setImmediate(this.afterScheduled);
    }
  }
  /**
   * @since 3.5.9
   */
  afterScheduled = () => {
    this.running = false;
    this.runTasks();
  };
  /**
   * @since 3.5.9
   */
  runTasks() {
    const tasks = this.tasks;
    this.tasks = [];
    for (let i = 0, len = tasks.length; i < len; i++) {
      tasks[i]();
    }
  }
  /**
   * @since 3.5.9
   */
  shouldYield(fiber) {
    return fiber.currentOpCount >= fiber.getRef(MaxOpsBeforeYield);
  }
  /**
   * @since 3.5.9
   */
  flush() {
    while (this.tasks.length > 0) {
      this.runTasks();
    }
  }
}
const updateContext = /* @__PURE__ */ dual(2, (self, f) => withMicroFiber((fiber) => {
  const prev = fiber.context;
  fiber.context = f(prev);
  return onExit$1(self, () => {
    fiber.context = prev;
    return void_$3;
  });
}));
const provideContext$1 = /* @__PURE__ */ dual(2, (self, provided) => updateContext(self, merge$2(provided)));
class MaxOpsBeforeYield extends (/* @__PURE__ */ Reference()("effect/Micro/currentMaxOpsBeforeYield", {
  defaultValue: () => 2048
})) {
}
class CurrentScheduler extends (/* @__PURE__ */ Reference()("effect/Micro/currentScheduler", {
  defaultValue: () => new MicroSchedulerDefault()
})) {
}
const withTrace = function() {
  const prevLimit = globalThis.Error.stackTraceLimit;
  globalThis.Error.stackTraceLimit = 2;
  const error = new globalThis.Error();
  globalThis.Error.stackTraceLimit = prevLimit;
  function generate(name, cause) {
    const stack = error.stack;
    if (!stack) {
      return cause;
    }
    const line = stack.split("\n")[2]?.trim().replace(/^at /, "");
    if (!line) {
      return cause;
    }
    const lineMatch = line.match(/\((.*)\)$/);
    return causeWithTrace(cause, `at ${name} (${lineMatch ? lineMatch[1] : line})`);
  }
  const f = (name) => (self) => onError(self, (cause) => failCause$6(generate(name, cause)));
  if (arguments.length === 2) {
    return f(arguments[1])(arguments[0]);
  }
  return f(arguments[0]);
};
const matchCauseEffect$2 = /* @__PURE__ */ dual(2, (self, options) => {
  const primitive2 = Object.create(OnSuccessAndFailureProto);
  primitive2[args] = self;
  primitive2[successCont] = options.onSuccess;
  primitive2[failureCont] = options.onFailure;
  return primitive2;
});
const OnSuccessAndFailureProto = /* @__PURE__ */ makePrimitiveProto({
  op: "OnSuccessAndFailure",
  eval(fiber) {
    fiber._stack.push(this);
    return this[args];
  }
});
const onExit$1 = /* @__PURE__ */ dual(2, (self, f) => uninterruptibleMask$2((restore) => matchCauseEffect$2(restore(self), {
  onFailure: (cause) => flatMap$7(f(exitFailCause$1(cause)), () => failCause$6(cause)),
  onSuccess: (a) => flatMap$7(f(exitSucceed$1(a)), () => succeed$c(a))
})));
const onExitIf = /* @__PURE__ */ dual(3, (self, refinement, f) => onExit$1(self, (exit2) => refinement(exit2) ? f(exit2) : exitVoid$1));
const onError = /* @__PURE__ */ dual(2, (self, f) => onExitIf(self, exitIsFailure$1, (exit2) => f(exit2.cause)));
const setInterruptible = /* @__PURE__ */ makePrimitive({
  op: "SetInterruptible",
  ensure(fiber) {
    fiber.interruptible = this[args];
    if (fiber._interrupted && fiber.interruptible) {
      return () => exitInterrupt$1;
    }
  }
});
const interruptible$3 = (self) => withMicroFiber((fiber) => {
  if (fiber.interruptible) return self;
  fiber.interruptible = true;
  fiber._stack.push(setInterruptible(false));
  if (fiber._interrupted) return exitInterrupt$1;
  return self;
});
const uninterruptibleMask$2 = (f) => withMicroFiber((fiber) => {
  if (!fiber.interruptible) return f(identity);
  fiber.interruptible = false;
  fiber._stack.push(setInterruptible(true));
  return f(interruptible$3);
});
const runFork$2 = (effect2, options) => {
  const fiber = new MicroFiberImpl(CurrentScheduler.context(new MicroSchedulerDefault()));
  fiber.evaluate(effect2);
  return fiber;
};
const YieldableError$1 = /* @__PURE__ */ (function() {
  class YieldableError2 extends globalThis.Error {
  }
  Object.assign(YieldableError2.prototype, MicroProto, StructuralPrototype, {
    [identifier]: "Failure",
    [evaluate]() {
      return fail$a(this);
    },
    toString() {
      return this.message ? `${this.name}: ${this.message}` : this.name;
    },
    toJSON() {
      return {
        ...this
      };
    },
    [NodeInspectSymbol]() {
      const stack = this.stack;
      if (stack) {
        return `${this.toString()}
${stack.split("\n").slice(1).join("\n")}`;
      }
      return this.toString();
    }
  });
  return YieldableError2;
})();
const Error$3 = /* @__PURE__ */ (function() {
  return class extends YieldableError$1 {
    constructor(args2) {
      super();
      if (args2) {
        Object.assign(this, args2);
      }
    }
  };
})();
const TaggedError$1 = (tag) => {
  class Base2 extends Error$3 {
    _tag = tag;
  }
  Base2.prototype.name = tag;
  return Base2;
};
const DecodeExceptionTypeId = /* @__PURE__ */ Symbol.for("effect/Encoding/errors/Decode");
const DecodeException = (input, message) => {
  const out = {
    _tag: "DecodeException",
    [DecodeExceptionTypeId]: DecodeExceptionTypeId,
    input
  };
  if (isString(message)) {
    out.message = message;
  }
  return out;
};
const encoder = /* @__PURE__ */ new TextEncoder();
const encode$1 = (bytes) => {
  const length2 = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < length2; i += 3) {
    result += base64abc[bytes[i - 2] >> 2];
    result += base64abc[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += base64abc[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += base64abc[bytes[i] & 63];
  }
  if (i === length2 + 1) {
    result += base64abc[bytes[i - 2] >> 2];
    result += base64abc[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === length2) {
    result += base64abc[bytes[i - 2] >> 2];
    result += base64abc[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += base64abc[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
};
const decode$1 = (str) => {
  const stripped = stripCrlf(str);
  const length2 = stripped.length;
  if (length2 % 4 !== 0) {
    return left(DecodeException(stripped, `Length must be a multiple of 4, but is ${length2}`));
  }
  const index = stripped.indexOf("=");
  if (index !== -1 && (index < length2 - 2 || index === length2 - 2 && stripped[length2 - 1] !== "=")) {
    return left(DecodeException(stripped, "Found a '=' character, but it is not at the end"));
  }
  try {
    const missingOctets = stripped.endsWith("==") ? 2 : stripped.endsWith("=") ? 1 : 0;
    const result = new Uint8Array(3 * (length2 / 4) - missingOctets);
    for (let i = 0, j = 0; i < length2; i += 4, j += 3) {
      const buffer = getBase64Code(stripped.charCodeAt(i)) << 18 | getBase64Code(stripped.charCodeAt(i + 1)) << 12 | getBase64Code(stripped.charCodeAt(i + 2)) << 6 | getBase64Code(stripped.charCodeAt(i + 3));
      result[j] = buffer >> 16;
      result[j + 1] = buffer >> 8 & 255;
      result[j + 2] = buffer & 255;
    }
    return right(result);
  } catch (e) {
    return left(DecodeException(stripped, e instanceof Error ? e.message : "Invalid input"));
  }
};
const stripCrlf = (str) => str.replace(/[\n\r]/g, "");
function getBase64Code(charCode) {
  if (charCode >= base64codes.length) {
    throw new TypeError(`Invalid character ${String.fromCharCode(charCode)}`);
  }
  const code = base64codes[charCode];
  if (code === 255) {
    throw new TypeError(`Invalid character ${String.fromCharCode(charCode)}`);
  }
  return code;
}
const base64abc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/"];
const base64codes = [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 62, 255, 255, 255, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 255, 255, 255, 0, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255, 255, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51];
const encode = (bytes) => {
  let result = "";
  for (let i = 0; i < bytes.length; ++i) {
    result += bytesToHex[bytes[i]];
  }
  return result;
};
const bytesToHex = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
const encodeBase64 = (input) => typeof input === "string" ? encode$1(encoder.encode(input)) : encode$1(input);
const decodeBase64 = (str) => decode$1(str);
const encodeHex = (input) => typeof input === "string" ? encode(encoder.encode(input)) : encode(input);
const RedactedSymbolKey = "effect/Redacted";
const redactedRegistry = /* @__PURE__ */ globalValue("effect/Redacted/redactedRegistry", () => /* @__PURE__ */ new WeakMap());
const RedactedTypeId = /* @__PURE__ */ Symbol.for(RedactedSymbolKey);
const proto$c = {
  [RedactedTypeId]: {
    _A: (_) => _
  },
  pipe() {
    return pipeArguments(this, arguments);
  },
  toString() {
    return "<redacted>";
  },
  toJSON() {
    return "<redacted>";
  },
  [NodeInspectSymbol]() {
    return "<redacted>";
  },
  [symbol$1]() {
    return pipe(hash(RedactedSymbolKey), combine$7(hash(redactedRegistry.get(this))), cached$1(this));
  },
  [symbol](that) {
    return isRedacted$1(that) && equals$1(redactedRegistry.get(this), redactedRegistry.get(that));
  }
};
const isRedacted$1 = (u) => hasProperty(u, RedactedTypeId);
const make$A = (value2) => {
  const redacted = Object.create(proto$c);
  redactedRegistry.set(redacted, value2);
  return redacted;
};
const value$1 = (self) => {
  if (redactedRegistry.has(self)) {
    return redactedRegistry.get(self);
  } else {
    throw new Error("Unable to get redacted value");
  }
};
const isRedacted = isRedacted$1;
const make$z = make$A;
const value = value$1;
const getEquivalence$2 = (isEquivalent) => make$G((x, y) => isEquivalent(value(x), value(y)));
const TypeId$a = /* @__PURE__ */ Symbol.for("effect/Chunk");
function copy(src, srcPos, dest, destPos, len) {
  for (let i = srcPos; i < Math.min(src.length, srcPos + len); i++) {
    dest[destPos + i - srcPos] = src[i];
  }
  return dest;
}
const emptyArray = [];
const getEquivalence$1 = (isEquivalent) => make$G((self, that) => self.length === that.length && toReadonlyArray(self).every((value2, i) => isEquivalent(value2, unsafeGet(that, i))));
const _equivalence$1 = /* @__PURE__ */ getEquivalence$1(equals$1);
const ChunkProto = {
  [TypeId$a]: {
    _A: (_) => _
  },
  toString() {
    return format$3(this.toJSON());
  },
  toJSON() {
    return {
      _id: "Chunk",
      values: toReadonlyArray(this).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  [symbol](that) {
    return isChunk(that) && _equivalence$1(this, that);
  },
  [symbol$1]() {
    return cached$1(this, array(toReadonlyArray(this)));
  },
  [Symbol.iterator]() {
    switch (this.backing._tag) {
      case "IArray": {
        return this.backing.array[Symbol.iterator]();
      }
      case "IEmpty": {
        return emptyArray[Symbol.iterator]();
      }
      default: {
        return toReadonlyArray(this)[Symbol.iterator]();
      }
    }
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const makeChunk = (backing) => {
  const chunk = Object.create(ChunkProto);
  chunk.backing = backing;
  switch (backing._tag) {
    case "IEmpty": {
      chunk.length = 0;
      chunk.depth = 0;
      chunk.left = chunk;
      chunk.right = chunk;
      break;
    }
    case "IConcat": {
      chunk.length = backing.left.length + backing.right.length;
      chunk.depth = 1 + Math.max(backing.left.depth, backing.right.depth);
      chunk.left = backing.left;
      chunk.right = backing.right;
      break;
    }
    case "IArray": {
      chunk.length = backing.array.length;
      chunk.depth = 0;
      chunk.left = _empty$5;
      chunk.right = _empty$5;
      break;
    }
    case "ISingleton": {
      chunk.length = 1;
      chunk.depth = 0;
      chunk.left = _empty$5;
      chunk.right = _empty$5;
      break;
    }
    case "ISlice": {
      chunk.length = backing.length;
      chunk.depth = backing.chunk.depth + 1;
      chunk.left = _empty$5;
      chunk.right = _empty$5;
      break;
    }
  }
  return chunk;
};
const isChunk = (u) => hasProperty(u, TypeId$a);
const _empty$5 = /* @__PURE__ */ makeChunk({
  _tag: "IEmpty"
});
const empty$k = () => _empty$5;
const make$y = (...as2) => unsafeFromNonEmptyArray(as2);
const of$1 = (a) => makeChunk({
  _tag: "ISingleton",
  a
});
const fromIterable$5 = (self) => isChunk(self) ? self : unsafeFromArray(fromIterable$6(self));
const copyToArray = (self, array2, initial) => {
  switch (self.backing._tag) {
    case "IArray": {
      copy(self.backing.array, 0, array2, initial, self.length);
      break;
    }
    case "IConcat": {
      copyToArray(self.left, array2, initial);
      copyToArray(self.right, array2, initial + self.left.length);
      break;
    }
    case "ISingleton": {
      array2[initial] = self.backing.a;
      break;
    }
    case "ISlice": {
      let i = 0;
      let j = initial;
      while (i < self.length) {
        array2[j] = unsafeGet(self, i);
        i += 1;
        j += 1;
      }
      break;
    }
  }
};
const toReadonlyArray_ = (self) => {
  switch (self.backing._tag) {
    case "IEmpty": {
      return emptyArray;
    }
    case "IArray": {
      return self.backing.array;
    }
    default: {
      const arr = new Array(self.length);
      copyToArray(self, arr, 0);
      self.backing = {
        _tag: "IArray",
        array: arr
      };
      self.left = _empty$5;
      self.right = _empty$5;
      self.depth = 0;
      return arr;
    }
  }
};
const toReadonlyArray = toReadonlyArray_;
const reverseChunk = (self) => {
  switch (self.backing._tag) {
    case "IEmpty":
    case "ISingleton":
      return self;
    case "IArray": {
      return makeChunk({
        _tag: "IArray",
        array: reverse$2(self.backing.array)
      });
    }
    case "IConcat": {
      return makeChunk({
        _tag: "IConcat",
        left: reverse$1(self.backing.right),
        right: reverse$1(self.backing.left)
      });
    }
    case "ISlice":
      return unsafeFromArray(reverse$2(toReadonlyArray(self)));
  }
};
const reverse$1 = reverseChunk;
const get$8 = /* @__PURE__ */ dual(2, (self, index) => index < 0 || index >= self.length ? none$6() : some(unsafeGet(self, index)));
const unsafeFromArray = (self) => self.length === 0 ? empty$k() : self.length === 1 ? of$1(self[0]) : makeChunk({
  _tag: "IArray",
  array: self
});
const unsafeFromNonEmptyArray = (self) => unsafeFromArray(self);
const unsafeGet = /* @__PURE__ */ dual(2, (self, index) => {
  switch (self.backing._tag) {
    case "IEmpty": {
      throw new Error(`Index out of bounds`);
    }
    case "ISingleton": {
      if (index !== 0) {
        throw new Error(`Index out of bounds`);
      }
      return self.backing.a;
    }
    case "IArray": {
      if (index >= self.length || index < 0) {
        throw new Error(`Index out of bounds`);
      }
      return self.backing.array[index];
    }
    case "IConcat": {
      return index < self.left.length ? unsafeGet(self.left, index) : unsafeGet(self.right, index - self.left.length);
    }
    case "ISlice": {
      return unsafeGet(self.backing.chunk, index + self.backing.offset);
    }
  }
});
const append$1 = /* @__PURE__ */ dual(2, (self, a) => appendAll$1(self, of$1(a)));
const prepend$1 = /* @__PURE__ */ dual(2, (self, elem) => appendAll$1(of$1(elem), self));
const drop = /* @__PURE__ */ dual(2, (self, n) => {
  if (n <= 0) {
    return self;
  } else if (n >= self.length) {
    return _empty$5;
  } else {
    switch (self.backing._tag) {
      case "ISlice": {
        return makeChunk({
          _tag: "ISlice",
          chunk: self.backing.chunk,
          offset: self.backing.offset + n,
          length: self.backing.length - n
        });
      }
      case "IConcat": {
        if (n > self.left.length) {
          return drop(self.right, n - self.left.length);
        }
        return makeChunk({
          _tag: "IConcat",
          left: drop(self.left, n),
          right: self.right
        });
      }
      default: {
        return makeChunk({
          _tag: "ISlice",
          chunk: self,
          offset: n,
          length: self.length - n
        });
      }
    }
  }
});
const appendAll$1 = /* @__PURE__ */ dual(2, (self, that) => {
  if (self.backing._tag === "IEmpty") {
    return that;
  }
  if (that.backing._tag === "IEmpty") {
    return self;
  }
  const diff2 = that.depth - self.depth;
  if (Math.abs(diff2) <= 1) {
    return makeChunk({
      _tag: "IConcat",
      left: self,
      right: that
    });
  } else if (diff2 < -1) {
    if (self.left.depth >= self.right.depth) {
      const nr = appendAll$1(self.right, that);
      return makeChunk({
        _tag: "IConcat",
        left: self.left,
        right: nr
      });
    } else {
      const nrr = appendAll$1(self.right.right, that);
      if (nrr.depth === self.depth - 3) {
        const nr = makeChunk({
          _tag: "IConcat",
          left: self.right.left,
          right: nrr
        });
        return makeChunk({
          _tag: "IConcat",
          left: self.left,
          right: nr
        });
      } else {
        const nl = makeChunk({
          _tag: "IConcat",
          left: self.left,
          right: self.right.left
        });
        return makeChunk({
          _tag: "IConcat",
          left: nl,
          right: nrr
        });
      }
    }
  } else {
    if (that.right.depth >= that.left.depth) {
      const nl = appendAll$1(self, that.left);
      return makeChunk({
        _tag: "IConcat",
        left: nl,
        right: that.right
      });
    } else {
      const nll = appendAll$1(self, that.left.left);
      if (nll.depth === that.depth - 3) {
        const nl = makeChunk({
          _tag: "IConcat",
          left: nll,
          right: that.left.right
        });
        return makeChunk({
          _tag: "IConcat",
          left: nl,
          right: that.right
        });
      } else {
        const nr = makeChunk({
          _tag: "IConcat",
          left: that.left.right,
          right: that.right
        });
        return makeChunk({
          _tag: "IConcat",
          left: nll,
          right: nr
        });
      }
    }
  }
});
const filter$1 = /* @__PURE__ */ dual(2, (self, predicate) => unsafeFromArray(filter$2(self, predicate)));
const isEmpty$7 = (self) => self.length === 0;
const isNonEmpty$3 = (self) => self.length > 0;
const head = /* @__PURE__ */ get$8(0);
const unsafeHead = (self) => unsafeGet(self, 0);
const headNonEmpty = unsafeHead;
const map$e = /* @__PURE__ */ dual(2, (self, f) => self.backing._tag === "ISingleton" ? of$1(f(self.backing.a, 0)) : unsafeFromArray(pipe(toReadonlyArray(self), map$g((a, i) => f(a, i)))));
const tailNonEmpty = (self) => drop(self, 1);
const reduce$6 = reduce$7;
const SIZE = 5;
const BUCKET_SIZE = /* @__PURE__ */ Math.pow(2, SIZE);
const MASK = BUCKET_SIZE - 1;
const MAX_INDEX_NODE = BUCKET_SIZE / 2;
const MIN_ARRAY_NODE = BUCKET_SIZE / 4;
function popcount(x) {
  x -= x >> 1 & 1431655765;
  x = (x & 858993459) + (x >> 2 & 858993459);
  x = x + (x >> 4) & 252645135;
  x += x >> 8;
  x += x >> 16;
  return x & 127;
}
function hashFragment(shift2, h) {
  return h >>> shift2 & MASK;
}
function toBitmap(x) {
  return 1 << x;
}
function fromBitmap(bitmap, bit) {
  return popcount(bitmap & bit - 1);
}
const make$x = (value2, previous) => ({
  value: value2,
  previous
});
function arrayUpdate(mutate2, at, v, arr) {
  let out = arr;
  if (!mutate2) {
    const len = arr.length;
    out = new Array(len);
    for (let i = 0; i < len; ++i) out[i] = arr[i];
  }
  out[at] = v;
  return out;
}
function arraySpliceOut(mutate2, at, arr) {
  const newLen = arr.length - 1;
  let i = 0;
  let g = 0;
  let out = arr;
  if (mutate2) {
    i = g = at;
  } else {
    out = new Array(newLen);
    while (i < at) out[g++] = arr[i++];
  }
  ++i;
  while (i <= newLen) out[g++] = arr[i++];
  if (mutate2) {
    out.length = newLen;
  }
  return out;
}
function arraySpliceIn(mutate2, at, v, arr) {
  const len = arr.length;
  if (mutate2) {
    let i2 = len;
    while (i2 >= at) arr[i2--] = arr[i2];
    arr[at] = v;
    return arr;
  }
  let i = 0, g = 0;
  const out = new Array(len + 1);
  while (i < at) out[g++] = arr[i++];
  out[at] = v;
  while (i < len) out[++g] = arr[i++];
  return out;
}
class EmptyNode {
  _tag = "EmptyNode";
  modify(edit, _shift, f, hash2, key, size2) {
    const v = f(none$6());
    if (isNone(v)) return new EmptyNode();
    ++size2.value;
    return new LeafNode(edit, hash2, key, v);
  }
}
function isEmptyNode(a) {
  return isTagged(a, "EmptyNode");
}
function isLeafNode(node) {
  return isEmptyNode(node) || node._tag === "LeafNode" || node._tag === "CollisionNode";
}
function canEditNode(node, edit) {
  return isEmptyNode(node) ? false : edit === node.edit;
}
class LeafNode {
  edit;
  hash;
  key;
  value;
  _tag = "LeafNode";
  constructor(edit, hash2, key, value2) {
    this.edit = edit;
    this.hash = hash2;
    this.key = key;
    this.value = value2;
  }
  modify(edit, shift2, f, hash2, key, size2) {
    if (equals$1(key, this.key)) {
      const v2 = f(this.value);
      if (v2 === this.value) return this;
      else if (isNone(v2)) {
        --size2.value;
        return new EmptyNode();
      }
      if (canEditNode(this, edit)) {
        this.value = v2;
        return this;
      }
      return new LeafNode(edit, hash2, key, v2);
    }
    const v = f(none$6());
    if (isNone(v)) return this;
    ++size2.value;
    return mergeLeaves(edit, shift2, this.hash, this, hash2, new LeafNode(edit, hash2, key, v));
  }
}
class CollisionNode {
  edit;
  hash;
  children;
  _tag = "CollisionNode";
  constructor(edit, hash2, children) {
    this.edit = edit;
    this.hash = hash2;
    this.children = children;
  }
  modify(edit, shift2, f, hash2, key, size2) {
    if (hash2 === this.hash) {
      const canEdit = canEditNode(this, edit);
      const list = this.updateCollisionList(canEdit, edit, this.hash, this.children, f, key, size2);
      if (list === this.children) return this;
      return list.length > 1 ? new CollisionNode(edit, this.hash, list) : list[0];
    }
    const v = f(none$6());
    if (isNone(v)) return this;
    ++size2.value;
    return mergeLeaves(edit, shift2, this.hash, this, hash2, new LeafNode(edit, hash2, key, v));
  }
  updateCollisionList(mutate2, edit, hash2, list, f, key, size2) {
    const len = list.length;
    for (let i = 0; i < len; ++i) {
      const child = list[i];
      if ("key" in child && equals$1(key, child.key)) {
        const value2 = child.value;
        const newValue2 = f(value2);
        if (newValue2 === value2) return list;
        if (isNone(newValue2)) {
          --size2.value;
          return arraySpliceOut(mutate2, i, list);
        }
        return arrayUpdate(mutate2, i, new LeafNode(edit, hash2, key, newValue2), list);
      }
    }
    const newValue = f(none$6());
    if (isNone(newValue)) return list;
    ++size2.value;
    return arrayUpdate(mutate2, len, new LeafNode(edit, hash2, key, newValue), list);
  }
}
class IndexedNode {
  edit;
  mask;
  children;
  _tag = "IndexedNode";
  constructor(edit, mask, children) {
    this.edit = edit;
    this.mask = mask;
    this.children = children;
  }
  modify(edit, shift2, f, hash2, key, size2) {
    const mask = this.mask;
    const children = this.children;
    const frag = hashFragment(shift2, hash2);
    const bit = toBitmap(frag);
    const indx = fromBitmap(mask, bit);
    const exists2 = mask & bit;
    const canEdit = canEditNode(this, edit);
    if (!exists2) {
      const _newChild = new EmptyNode().modify(edit, shift2 + SIZE, f, hash2, key, size2);
      if (!_newChild) return this;
      return children.length >= MAX_INDEX_NODE ? expand(edit, frag, _newChild, mask, children) : new IndexedNode(edit, mask | bit, arraySpliceIn(canEdit, indx, _newChild, children));
    }
    const current = children[indx];
    const child = current.modify(edit, shift2 + SIZE, f, hash2, key, size2);
    if (current === child) return this;
    let bitmap = mask;
    let newChildren;
    if (isEmptyNode(child)) {
      bitmap &= ~bit;
      if (!bitmap) return new EmptyNode();
      if (children.length <= 2 && isLeafNode(children[indx ^ 1])) {
        return children[indx ^ 1];
      }
      newChildren = arraySpliceOut(canEdit, indx, children);
    } else {
      newChildren = arrayUpdate(canEdit, indx, child, children);
    }
    if (canEdit) {
      this.mask = bitmap;
      this.children = newChildren;
      return this;
    }
    return new IndexedNode(edit, bitmap, newChildren);
  }
}
class ArrayNode {
  edit;
  size;
  children;
  _tag = "ArrayNode";
  constructor(edit, size2, children) {
    this.edit = edit;
    this.size = size2;
    this.children = children;
  }
  modify(edit, shift2, f, hash2, key, size2) {
    let count = this.size;
    const children = this.children;
    const frag = hashFragment(shift2, hash2);
    const child = children[frag];
    const newChild = (child || new EmptyNode()).modify(edit, shift2 + SIZE, f, hash2, key, size2);
    if (child === newChild) return this;
    const canEdit = canEditNode(this, edit);
    let newChildren;
    if (isEmptyNode(child) && !isEmptyNode(newChild)) {
      ++count;
      newChildren = arrayUpdate(canEdit, frag, newChild, children);
    } else if (!isEmptyNode(child) && isEmptyNode(newChild)) {
      --count;
      if (count <= MIN_ARRAY_NODE) {
        return pack(edit, count, frag, children);
      }
      newChildren = arrayUpdate(canEdit, frag, new EmptyNode(), children);
    } else {
      newChildren = arrayUpdate(canEdit, frag, newChild, children);
    }
    if (canEdit) {
      this.size = count;
      this.children = newChildren;
      return this;
    }
    return new ArrayNode(edit, count, newChildren);
  }
}
function pack(edit, count, removed, elements) {
  const children = new Array(count - 1);
  let g = 0;
  let bitmap = 0;
  for (let i = 0, len = elements.length; i < len; ++i) {
    if (i !== removed) {
      const elem = elements[i];
      if (elem && !isEmptyNode(elem)) {
        children[g++] = elem;
        bitmap |= 1 << i;
      }
    }
  }
  return new IndexedNode(edit, bitmap, children);
}
function expand(edit, frag, child, bitmap, subNodes) {
  const arr = [];
  let bit = bitmap;
  let count = 0;
  for (let i = 0; bit; ++i) {
    if (bit & 1) arr[i] = subNodes[count++];
    bit >>>= 1;
  }
  arr[frag] = child;
  return new ArrayNode(edit, count + 1, arr);
}
function mergeLeavesInner(edit, shift2, h1, n1, h2, n2) {
  if (h1 === h2) return new CollisionNode(edit, h1, [n2, n1]);
  const subH1 = hashFragment(shift2, h1);
  const subH2 = hashFragment(shift2, h2);
  if (subH1 === subH2) {
    return (child) => new IndexedNode(edit, toBitmap(subH1) | toBitmap(subH2), [child]);
  } else {
    const children = subH1 < subH2 ? [n1, n2] : [n2, n1];
    return new IndexedNode(edit, toBitmap(subH1) | toBitmap(subH2), children);
  }
}
function mergeLeaves(edit, shift2, h1, n1, h2, n2) {
  let stack = void 0;
  let currentShift = shift2;
  while (true) {
    const res = mergeLeavesInner(edit, currentShift, h1, n1, h2, n2);
    if (typeof res === "function") {
      stack = make$x(res, stack);
      currentShift = currentShift + SIZE;
    } else {
      let final = res;
      while (stack != null) {
        final = stack.value(final);
        stack = stack.previous;
      }
      return final;
    }
  }
}
const HashMapSymbolKey = "effect/HashMap";
const HashMapTypeId = /* @__PURE__ */ Symbol.for(HashMapSymbolKey);
const HashMapProto = {
  [HashMapTypeId]: HashMapTypeId,
  [Symbol.iterator]() {
    return new HashMapIterator(this, (k, v) => [k, v]);
  },
  [symbol$1]() {
    let hash$1 = hash(HashMapSymbolKey);
    for (const item of this) {
      hash$1 ^= pipe(hash(item[0]), combine$7(hash(item[1])));
    }
    return cached$1(this, hash$1);
  },
  [symbol](that) {
    if (isHashMap(that)) {
      if (that._size !== this._size) {
        return false;
      }
      for (const item of this) {
        const elem = pipe(that, getHash(item[0], hash(item[0])));
        if (isNone(elem)) {
          return false;
        } else {
          if (!equals$1(item[1], elem.value)) {
            return false;
          }
        }
      }
      return true;
    }
    return false;
  },
  toString() {
    return format$3(this.toJSON());
  },
  toJSON() {
    return {
      _id: "HashMap",
      values: Array.from(this).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const makeImpl$1 = (editable, edit, root, size2) => {
  const map2 = Object.create(HashMapProto);
  map2._editable = editable;
  map2._edit = edit;
  map2._root = root;
  map2._size = size2;
  return map2;
};
class HashMapIterator {
  map;
  f;
  v;
  constructor(map2, f) {
    this.map = map2;
    this.f = f;
    this.v = visitLazy(this.map._root, this.f, void 0);
  }
  next() {
    if (isNone(this.v)) {
      return {
        done: true,
        value: void 0
      };
    }
    const v0 = this.v.value;
    this.v = applyCont(v0.cont);
    return {
      done: false,
      value: v0.value
    };
  }
  [Symbol.iterator]() {
    return new HashMapIterator(this.map, this.f);
  }
}
const applyCont = (cont) => cont ? visitLazyChildren(cont[0], cont[1], cont[2], cont[3], cont[4]) : none$6();
const visitLazy = (node, f, cont = void 0) => {
  switch (node._tag) {
    case "LeafNode": {
      if (isSome(node.value)) {
        return some({
          value: f(node.key, node.value.value),
          cont
        });
      }
      return applyCont(cont);
    }
    case "CollisionNode":
    case "ArrayNode":
    case "IndexedNode": {
      const children = node.children;
      return visitLazyChildren(children.length, children, 0, f, cont);
    }
    default: {
      return applyCont(cont);
    }
  }
};
const visitLazyChildren = (len, children, i, f, cont) => {
  while (i < len) {
    const child = children[i++];
    if (child && !isEmptyNode(child)) {
      return visitLazy(child, f, [len, children, i, f, cont]);
    }
  }
  return applyCont(cont);
};
const _empty$4 = /* @__PURE__ */ makeImpl$1(false, 0, /* @__PURE__ */ new EmptyNode(), 0);
const empty$j = () => _empty$4;
const fromIterable$4 = (entries) => {
  const map2 = beginMutation$1(empty$j());
  for (const entry of entries) {
    set$4(map2, entry[0], entry[1]);
  }
  return endMutation$1(map2);
};
const isHashMap = (u) => hasProperty(u, HashMapTypeId);
const isEmpty$6 = (self) => self && isEmptyNode(self._root);
const get$7 = /* @__PURE__ */ dual(2, (self, key) => getHash(self, key, hash(key)));
const getHash = /* @__PURE__ */ dual(3, (self, key, hash2) => {
  let node = self._root;
  let shift2 = 0;
  while (true) {
    switch (node._tag) {
      case "LeafNode": {
        return equals$1(key, node.key) ? node.value : none$6();
      }
      case "CollisionNode": {
        if (hash2 === node.hash) {
          const children = node.children;
          for (let i = 0, len = children.length; i < len; ++i) {
            const child = children[i];
            if ("key" in child && equals$1(key, child.key)) {
              return child.value;
            }
          }
        }
        return none$6();
      }
      case "IndexedNode": {
        const frag = hashFragment(shift2, hash2);
        const bit = toBitmap(frag);
        if (node.mask & bit) {
          node = node.children[fromBitmap(node.mask, bit)];
          shift2 += SIZE;
          break;
        }
        return none$6();
      }
      case "ArrayNode": {
        node = node.children[hashFragment(shift2, hash2)];
        if (node) {
          shift2 += SIZE;
          break;
        }
        return none$6();
      }
      default:
        return none$6();
    }
  }
});
const has$3 = /* @__PURE__ */ dual(2, (self, key) => isSome(getHash(self, key, hash(key))));
const set$4 = /* @__PURE__ */ dual(3, (self, key, value2) => modifyAt$1(self, key, () => some(value2)));
const setTree = /* @__PURE__ */ dual(3, (self, newRoot, newSize) => {
  if (self._editable) {
    self._root = newRoot;
    self._size = newSize;
    return self;
  }
  return newRoot === self._root ? self : makeImpl$1(self._editable, self._edit, newRoot, newSize);
});
const keys$1 = (self) => new HashMapIterator(self, (key) => key);
const size$5 = (self) => self._size;
const beginMutation$1 = (self) => makeImpl$1(true, self._edit + 1, self._root, self._size);
const endMutation$1 = (self) => {
  self._editable = false;
  return self;
};
const modifyAt$1 = /* @__PURE__ */ dual(3, (self, key, f) => modifyHash(self, key, hash(key), f));
const modifyHash = /* @__PURE__ */ dual(4, (self, key, hash2, f) => {
  const size2 = {
    value: self._size
  };
  const newRoot = self._root.modify(self._editable ? self._edit : NaN, 0, f, hash2, key, size2);
  return pipe(self, setTree(newRoot, size2.value));
});
const remove$4 = /* @__PURE__ */ dual(2, (self, key) => modifyAt$1(self, key, none$6));
const map$d = /* @__PURE__ */ dual(2, (self, f) => reduce$5(self, empty$j(), (map2, value2, key) => set$4(map2, key, f(value2, key))));
const forEach$4 = /* @__PURE__ */ dual(2, (self, f) => reduce$5(self, void 0, (_, value2, key) => f(value2, key)));
const reduce$5 = /* @__PURE__ */ dual(3, (self, zero2, f) => {
  const root = self._root;
  if (root._tag === "LeafNode") {
    return isSome(root.value) ? f(zero2, root.value.value, root.key) : zero2;
  }
  if (root._tag === "EmptyNode") {
    return zero2;
  }
  const toVisit = [root.children];
  let children;
  while (children = toVisit.pop()) {
    for (let i = 0, len = children.length; i < len; ) {
      const child = children[i++];
      if (child && !isEmptyNode(child)) {
        if (child._tag === "LeafNode") {
          if (isSome(child.value)) {
            zero2 = f(zero2, child.value.value, child.key);
          }
        } else {
          toVisit.push(child.children);
        }
      }
    }
  }
  return zero2;
});
const HashSetSymbolKey = "effect/HashSet";
const HashSetTypeId = /* @__PURE__ */ Symbol.for(HashSetSymbolKey);
const HashSetProto = {
  [HashSetTypeId]: HashSetTypeId,
  [Symbol.iterator]() {
    return keys$1(this._keyMap);
  },
  [symbol$1]() {
    return cached$1(this, combine$7(hash(this._keyMap))(hash(HashSetSymbolKey)));
  },
  [symbol](that) {
    if (isHashSet(that)) {
      return size$5(this._keyMap) === size$5(that._keyMap) && equals$1(this._keyMap, that._keyMap);
    }
    return false;
  },
  toString() {
    return format$3(this.toJSON());
  },
  toJSON() {
    return {
      _id: "HashSet",
      values: Array.from(this).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const makeImpl = (keyMap) => {
  const set2 = Object.create(HashSetProto);
  set2._keyMap = keyMap;
  return set2;
};
const isHashSet = (u) => hasProperty(u, HashSetTypeId);
const _empty$3 = /* @__PURE__ */ makeImpl(/* @__PURE__ */ empty$j());
const empty$i = () => _empty$3;
const fromIterable$3 = (elements) => {
  const set2 = beginMutation(empty$i());
  for (const value2 of elements) {
    add$2(set2, value2);
  }
  return endMutation(set2);
};
const make$w = (...elements) => {
  const set2 = beginMutation(empty$i());
  for (const value2 of elements) {
    add$2(set2, value2);
  }
  return endMutation(set2);
};
const has$2 = /* @__PURE__ */ dual(2, (self, value2) => has$3(self._keyMap, value2));
const size$4 = (self) => size$5(self._keyMap);
const beginMutation = (self) => makeImpl(beginMutation$1(self._keyMap));
const endMutation = (self) => {
  self._keyMap._editable = false;
  return self;
};
const mutate = /* @__PURE__ */ dual(2, (self, f) => {
  const transient = beginMutation(self);
  f(transient);
  return endMutation(transient);
});
const add$2 = /* @__PURE__ */ dual(2, (self, value2) => self._keyMap._editable ? (set$4(value2, true)(self._keyMap), self) : makeImpl(set$4(value2, true)(self._keyMap)));
const remove$3 = /* @__PURE__ */ dual(2, (self, value2) => self._keyMap._editable ? (remove$4(value2)(self._keyMap), self) : makeImpl(remove$4(value2)(self._keyMap)));
const difference$1 = /* @__PURE__ */ dual(2, (self, that) => mutate(self, (set2) => {
  for (const value2 of that) {
    remove$3(set2, value2);
  }
}));
const union$1 = /* @__PURE__ */ dual(2, (self, that) => mutate(empty$i(), (set2) => {
  forEach$3(self, (value2) => add$2(set2, value2));
  for (const value2 of that) {
    add$2(set2, value2);
  }
}));
const forEach$3 = /* @__PURE__ */ dual(2, (self, f) => forEach$4(self._keyMap, (_, k) => f(k)));
const reduce$4 = /* @__PURE__ */ dual(3, (self, zero2, f) => reduce$5(self._keyMap, zero2, (z, _, a) => f(z, a)));
const empty$h = empty$i;
const fromIterable$2 = fromIterable$3;
const make$v = make$w;
const has$1 = has$2;
const size$3 = size$4;
const add$1 = add$2;
const remove$2 = remove$3;
const difference = difference$1;
const union = union$1;
const reduce$3 = reduce$4;
const OP_DIE = "Die";
const OP_EMPTY$2 = "Empty";
const OP_FAIL$2 = "Fail";
const OP_INTERRUPT = "Interrupt";
const OP_PARALLEL$1 = "Parallel";
const OP_SEQUENTIAL$1 = "Sequential";
const CauseSymbolKey = "effect/Cause";
const CauseTypeId = /* @__PURE__ */ Symbol.for(CauseSymbolKey);
const variance$4 = {
  /* c8 ignore next */
  _E: (_) => _
};
const proto$b = {
  [CauseTypeId]: variance$4,
  [symbol$1]() {
    return pipe(hash(CauseSymbolKey), combine$7(hash(flattenCause(this))), cached$1(this));
  },
  [symbol](that) {
    return isCause(that) && causeEquals(this, that);
  },
  pipe() {
    return pipeArguments(this, arguments);
  },
  toJSON() {
    switch (this._tag) {
      case "Empty":
        return {
          _id: "Cause",
          _tag: this._tag
        };
      case "Die":
        return {
          _id: "Cause",
          _tag: this._tag,
          defect: toJSON(this.defect)
        };
      case "Interrupt":
        return {
          _id: "Cause",
          _tag: this._tag,
          fiberId: this.fiberId.toJSON()
        };
      case "Fail":
        return {
          _id: "Cause",
          _tag: this._tag,
          failure: toJSON(this.error)
        };
      case "Sequential":
      case "Parallel":
        return {
          _id: "Cause",
          _tag: this._tag,
          left: toJSON(this.left),
          right: toJSON(this.right)
        };
    }
  },
  toString() {
    return pretty$2(this);
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
};
const empty$g = /* @__PURE__ */ (() => {
  const o = /* @__PURE__ */ Object.create(proto$b);
  o._tag = OP_EMPTY$2;
  return o;
})();
const fail$9 = (error) => {
  const o = Object.create(proto$b);
  o._tag = OP_FAIL$2;
  o.error = error;
  return o;
};
const die$4 = (defect) => {
  const o = Object.create(proto$b);
  o._tag = OP_DIE;
  o.defect = defect;
  return o;
};
const interrupt$4 = (fiberId2) => {
  const o = Object.create(proto$b);
  o._tag = OP_INTERRUPT;
  o.fiberId = fiberId2;
  return o;
};
const parallel$2 = (left2, right2) => {
  const o = Object.create(proto$b);
  o._tag = OP_PARALLEL$1;
  o.left = left2;
  o.right = right2;
  return o;
};
const sequential$2 = (left2, right2) => {
  const o = Object.create(proto$b);
  o._tag = OP_SEQUENTIAL$1;
  o.left = left2;
  o.right = right2;
  return o;
};
const isCause = (u) => hasProperty(u, CauseTypeId);
const isEmptyType = (self) => self._tag === OP_EMPTY$2;
const isFailType$1 = (self) => self._tag === OP_FAIL$2;
const isDieType$1 = (self) => self._tag === OP_DIE;
const isEmpty$5 = (self) => {
  if (self._tag === OP_EMPTY$2) {
    return true;
  }
  return reduce$2(self, true, (acc, cause) => {
    switch (cause._tag) {
      case OP_EMPTY$2: {
        return some(acc);
      }
      case OP_DIE:
      case OP_FAIL$2:
      case OP_INTERRUPT: {
        return some(false);
      }
      default: {
        return none$6();
      }
    }
  });
};
const isInterrupted$2 = (self) => isSome(interruptOption(self));
const isInterruptedOnly = (self) => reduceWithContext$1(void 0, IsInterruptedOnlyCauseReducer)(self);
const failures = (self) => reverse$1(reduce$2(self, empty$k(), (list, cause) => cause._tag === OP_FAIL$2 ? some(pipe(list, prepend$1(cause.error))) : none$6()));
const defects = (self) => reverse$1(reduce$2(self, empty$k(), (list, cause) => cause._tag === OP_DIE ? some(pipe(list, prepend$1(cause.defect))) : none$6()));
const interruptors$1 = (self) => reduce$2(self, empty$h(), (set2, cause) => cause._tag === OP_INTERRUPT ? some(pipe(set2, add$1(cause.fiberId))) : none$6());
const failureOption = (self) => find(self, (cause) => cause._tag === OP_FAIL$2 ? some(cause.error) : none$6());
const failureOrCause$1 = (self) => {
  const option = failureOption(self);
  switch (option._tag) {
    case "None": {
      return right(self);
    }
    case "Some": {
      return left(option.value);
    }
  }
};
const interruptOption = (self) => find(self, (cause) => cause._tag === OP_INTERRUPT ? some(cause.fiberId) : none$6());
const stripFailures = (self) => match$7(self, {
  onEmpty: empty$g,
  onFail: () => empty$g,
  onDie: die$4,
  onInterrupt: interrupt$4,
  onSequential: sequential$2,
  onParallel: parallel$2
});
const electFailures = (self) => match$7(self, {
  onEmpty: empty$g,
  onFail: die$4,
  onDie: die$4,
  onInterrupt: interrupt$4,
  onSequential: sequential$2,
  onParallel: parallel$2
});
const map$c = /* @__PURE__ */ dual(2, (self, f) => flatMap$6(self, (e) => fail$9(f(e))));
const flatMap$6 = /* @__PURE__ */ dual(2, (self, f) => match$7(self, {
  onEmpty: empty$g,
  onFail: (error) => f(error),
  onDie: (defect) => die$4(defect),
  onInterrupt: (fiberId2) => interrupt$4(fiberId2),
  onSequential: (left2, right2) => sequential$2(left2, right2),
  onParallel: (left2, right2) => parallel$2(left2, right2)
}));
const causeEquals = (left2, right2) => {
  let leftStack = of$1(left2);
  let rightStack = of$1(right2);
  while (isNonEmpty$3(leftStack) && isNonEmpty$3(rightStack)) {
    const [leftParallel, leftSequential] = pipe(headNonEmpty(leftStack), reduce$2([empty$h(), empty$k()], ([parallel2, sequential2], cause) => {
      const [par2, seq2] = evaluateCause(cause);
      return some([pipe(parallel2, union(par2)), pipe(sequential2, appendAll$1(seq2))]);
    }));
    const [rightParallel, rightSequential] = pipe(headNonEmpty(rightStack), reduce$2([empty$h(), empty$k()], ([parallel2, sequential2], cause) => {
      const [par2, seq2] = evaluateCause(cause);
      return some([pipe(parallel2, union(par2)), pipe(sequential2, appendAll$1(seq2))]);
    }));
    if (!equals$1(leftParallel, rightParallel)) {
      return false;
    }
    leftStack = leftSequential;
    rightStack = rightSequential;
  }
  return true;
};
const flattenCause = (cause) => {
  return flattenCauseLoop(of$1(cause), empty$k());
};
const flattenCauseLoop = (causes, flattened) => {
  while (1) {
    const [parallel2, sequential2] = pipe(causes, reduce$7([empty$h(), empty$k()], ([parallel3, sequential3], cause) => {
      const [par2, seq2] = evaluateCause(cause);
      return [pipe(parallel3, union(par2)), pipe(sequential3, appendAll$1(seq2))];
    }));
    const updated = size$3(parallel2) > 0 ? pipe(flattened, prepend$1(parallel2)) : flattened;
    if (isEmpty$7(sequential2)) {
      return reverse$1(updated);
    }
    causes = sequential2;
    flattened = updated;
  }
  throw new Error(getBugErrorMessage("Cause.flattenCauseLoop"));
};
const find = /* @__PURE__ */ dual(2, (self, pf) => {
  const stack = [self];
  while (stack.length > 0) {
    const item = stack.pop();
    const option = pf(item);
    switch (option._tag) {
      case "None": {
        switch (item._tag) {
          case OP_SEQUENTIAL$1:
          case OP_PARALLEL$1: {
            stack.push(item.right);
            stack.push(item.left);
            break;
          }
        }
        break;
      }
      case "Some": {
        return option;
      }
    }
  }
  return none$6();
});
const evaluateCause = (self) => {
  let cause = self;
  const stack = [];
  let _parallel = empty$h();
  let _sequential = empty$k();
  while (cause !== void 0) {
    switch (cause._tag) {
      case OP_EMPTY$2: {
        if (stack.length === 0) {
          return [_parallel, _sequential];
        }
        cause = stack.pop();
        break;
      }
      case OP_FAIL$2: {
        _parallel = add$1(_parallel, make$y(cause._tag, cause.error));
        if (stack.length === 0) {
          return [_parallel, _sequential];
        }
        cause = stack.pop();
        break;
      }
      case OP_DIE: {
        _parallel = add$1(_parallel, make$y(cause._tag, cause.defect));
        if (stack.length === 0) {
          return [_parallel, _sequential];
        }
        cause = stack.pop();
        break;
      }
      case OP_INTERRUPT: {
        _parallel = add$1(_parallel, make$y(cause._tag, cause.fiberId));
        if (stack.length === 0) {
          return [_parallel, _sequential];
        }
        cause = stack.pop();
        break;
      }
      case OP_SEQUENTIAL$1: {
        switch (cause.left._tag) {
          case OP_EMPTY$2: {
            cause = cause.right;
            break;
          }
          case OP_SEQUENTIAL$1: {
            cause = sequential$2(cause.left.left, sequential$2(cause.left.right, cause.right));
            break;
          }
          case OP_PARALLEL$1: {
            cause = parallel$2(sequential$2(cause.left.left, cause.right), sequential$2(cause.left.right, cause.right));
            break;
          }
          default: {
            _sequential = prepend$1(_sequential, cause.right);
            cause = cause.left;
            break;
          }
        }
        break;
      }
      case OP_PARALLEL$1: {
        stack.push(cause.right);
        cause = cause.left;
        break;
      }
    }
  }
  throw new Error(getBugErrorMessage("Cause.evaluateCauseLoop"));
};
const IsInterruptedOnlyCauseReducer = {
  emptyCase: constTrue,
  failCase: constFalse,
  dieCase: constFalse,
  interruptCase: constTrue,
  sequentialCase: (_, left2, right2) => left2 && right2,
  parallelCase: (_, left2, right2) => left2 && right2
};
const OP_SEQUENTIAL_CASE = "SequentialCase";
const OP_PARALLEL_CASE = "ParallelCase";
const match$7 = /* @__PURE__ */ dual(2, (self, {
  onDie,
  onEmpty,
  onFail,
  onInterrupt: onInterrupt2,
  onParallel,
  onSequential
}) => {
  return reduceWithContext$1(self, void 0, {
    emptyCase: () => onEmpty,
    failCase: (_, error) => onFail(error),
    dieCase: (_, defect) => onDie(defect),
    interruptCase: (_, fiberId2) => onInterrupt2(fiberId2),
    sequentialCase: (_, left2, right2) => onSequential(left2, right2),
    parallelCase: (_, left2, right2) => onParallel(left2, right2)
  });
});
const reduce$2 = /* @__PURE__ */ dual(3, (self, zero2, pf) => {
  let accumulator = zero2;
  let cause = self;
  const causes = [];
  while (cause !== void 0) {
    const option = pf(accumulator, cause);
    accumulator = isSome(option) ? option.value : accumulator;
    switch (cause._tag) {
      case OP_SEQUENTIAL$1: {
        causes.push(cause.right);
        cause = cause.left;
        break;
      }
      case OP_PARALLEL$1: {
        causes.push(cause.right);
        cause = cause.left;
        break;
      }
      default: {
        cause = void 0;
        break;
      }
    }
    if (cause === void 0 && causes.length > 0) {
      cause = causes.pop();
    }
  }
  return accumulator;
});
const reduceWithContext$1 = /* @__PURE__ */ dual(3, (self, context2, reducer) => {
  const input = [self];
  const output = [];
  while (input.length > 0) {
    const cause = input.pop();
    switch (cause._tag) {
      case OP_EMPTY$2: {
        output.push(right(reducer.emptyCase(context2)));
        break;
      }
      case OP_FAIL$2: {
        output.push(right(reducer.failCase(context2, cause.error)));
        break;
      }
      case OP_DIE: {
        output.push(right(reducer.dieCase(context2, cause.defect)));
        break;
      }
      case OP_INTERRUPT: {
        output.push(right(reducer.interruptCase(context2, cause.fiberId)));
        break;
      }
      case OP_SEQUENTIAL$1: {
        input.push(cause.right);
        input.push(cause.left);
        output.push(left({
          _tag: OP_SEQUENTIAL_CASE
        }));
        break;
      }
      case OP_PARALLEL$1: {
        input.push(cause.right);
        input.push(cause.left);
        output.push(left({
          _tag: OP_PARALLEL_CASE
        }));
        break;
      }
    }
  }
  const accumulator = [];
  while (output.length > 0) {
    const either2 = output.pop();
    switch (either2._tag) {
      case "Left": {
        switch (either2.left._tag) {
          case OP_SEQUENTIAL_CASE: {
            const left2 = accumulator.pop();
            const right2 = accumulator.pop();
            const value2 = reducer.sequentialCase(context2, left2, right2);
            accumulator.push(value2);
            break;
          }
          case OP_PARALLEL_CASE: {
            const left2 = accumulator.pop();
            const right2 = accumulator.pop();
            const value2 = reducer.parallelCase(context2, left2, right2);
            accumulator.push(value2);
            break;
          }
        }
        break;
      }
      case "Right": {
        accumulator.push(either2.right);
        break;
      }
    }
  }
  if (accumulator.length === 0) {
    throw new Error("BUG: Cause.reduceWithContext - please report an issue at https://github.com/Effect-TS/effect/issues");
  }
  return accumulator.pop();
});
const pretty$2 = (cause, options) => {
  if (isInterruptedOnly(cause)) {
    return "All fibers interrupted without errors.";
  }
  return prettyErrors(cause).map(function(e) {
    if (options?.renderErrorCause !== true || e.cause === void 0) {
      return e.stack;
    }
    return `${e.stack} {
${renderErrorCause(e.cause, "  ")}
}`;
  }).join("\n");
};
const renderErrorCause = (cause, prefix) => {
  const lines = cause.stack.split("\n");
  let stack = `${prefix}[cause]: ${lines[0]}`;
  for (let i = 1, len = lines.length; i < len; i++) {
    stack += `
${prefix}${lines[i]}`;
  }
  if (cause.cause) {
    stack += ` {
${renderErrorCause(cause.cause, `${prefix}  `)}
${prefix}}`;
  }
  return stack;
};
class PrettyError extends globalThis.Error {
  span = void 0;
  constructor(originalError) {
    const originalErrorIsObject = typeof originalError === "object" && originalError !== null;
    const prevLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = 1;
    super(prettyErrorMessage(originalError), originalErrorIsObject && "cause" in originalError && typeof originalError.cause !== "undefined" ? {
      cause: new PrettyError(originalError.cause)
    } : void 0);
    if (this.message === "") {
      this.message = "An error has occurred";
    }
    Error.stackTraceLimit = prevLimit;
    this.name = originalError instanceof Error ? originalError.name : "Error";
    if (originalErrorIsObject) {
      if (spanSymbol in originalError) {
        this.span = originalError[spanSymbol];
      }
      Object.keys(originalError).forEach((key) => {
        if (!(key in this)) {
          this[key] = originalError[key];
        }
      });
    }
    this.stack = prettyErrorStack(`${this.name}: ${this.message}`, originalError instanceof Error && originalError.stack ? originalError.stack : "", this.span);
  }
}
const prettyErrorMessage = (u) => {
  if (typeof u === "string") {
    return u;
  }
  if (typeof u === "object" && u !== null && u instanceof Error) {
    return u.message;
  }
  try {
    if (hasProperty(u, "toString") && isFunction(u["toString"]) && u["toString"] !== Object.prototype.toString && u["toString"] !== globalThis.Array.prototype.toString) {
      return u["toString"]();
    }
  } catch {
  }
  return stringifyCircular(u);
};
const locationRegex = /\((.*)\)/g;
const spanToTrace = /* @__PURE__ */ globalValue("effect/Tracer/spanToTrace", () => /* @__PURE__ */ new WeakMap());
const prettyErrorStack = (message, stack, span2) => {
  const out = [message];
  const lines = stack.startsWith(message) ? stack.slice(message.length).split("\n") : stack.split("\n");
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].includes(" at new BaseEffectError") || lines[i].includes(" at new YieldableError")) {
      i++;
      continue;
    }
    if (lines[i].includes("Generator.next")) {
      break;
    }
    if (lines[i].includes("effect_internal_function")) {
      break;
    }
    out.push(lines[i].replace(/at .*effect_instruction_i.*\((.*)\)/, "at $1").replace(/EffectPrimitive\.\w+/, "<anonymous>"));
  }
  if (span2) {
    let current = span2;
    let i = 0;
    while (current && current._tag === "Span" && i < 10) {
      const stackFn = spanToTrace.get(current);
      if (typeof stackFn === "function") {
        const stack2 = stackFn();
        if (typeof stack2 === "string") {
          const locationMatchAll = stack2.matchAll(locationRegex);
          let match2 = false;
          for (const [, location] of locationMatchAll) {
            match2 = true;
            out.push(`    at ${current.name} (${location})`);
          }
          if (!match2) {
            out.push(`    at ${current.name} (${stack2.replace(/^at /, "")})`);
          }
        } else {
          out.push(`    at ${current.name}`);
        }
      } else {
        out.push(`    at ${current.name}`);
      }
      current = getOrUndefined(current.parent);
      i++;
    }
  }
  return out.join("\n");
};
const spanSymbol = /* @__PURE__ */ Symbol.for("effect/SpanAnnotation");
const prettyErrors = (cause) => reduceWithContext$1(cause, void 0, {
  emptyCase: () => [],
  dieCase: (_, unknownError) => {
    return [new PrettyError(unknownError)];
  },
  failCase: (_, error) => {
    return [new PrettyError(error)];
  },
  interruptCase: () => [],
  parallelCase: (_, l, r) => [...l, ...r],
  sequentialCase: (_, l, r) => [...l, ...r]
});
const TypeId$9 = /* @__PURE__ */ Symbol.for("effect/Duration");
const bigint0$2 = /* @__PURE__ */ BigInt(0);
const bigint24 = /* @__PURE__ */ BigInt(24);
const bigint60 = /* @__PURE__ */ BigInt(60);
const bigint1e3 = /* @__PURE__ */ BigInt(1e3);
const bigint1e6 = /* @__PURE__ */ BigInt(1e6);
const bigint1e9 = /* @__PURE__ */ BigInt(1e9);
const DURATION_REGEX = /^(-?\d+(?:\.\d+)?)\s+(nanos?|micros?|millis?|seconds?|minutes?|hours?|days?|weeks?)$/;
const decode = (input) => {
  if (isDuration(input)) {
    return input;
  } else if (isNumber(input)) {
    return millis(input);
  } else if (isBigInt(input)) {
    return nanos(input);
  } else if (Array.isArray(input) && input.length === 2 && input.every(isNumber)) {
    if (input[0] === -Infinity || input[1] === -Infinity || Number.isNaN(input[0]) || Number.isNaN(input[1])) {
      return zero;
    }
    if (input[0] === Infinity || input[1] === Infinity) {
      return infinity;
    }
    return nanos(BigInt(Math.round(input[0] * 1e9)) + BigInt(Math.round(input[1])));
  } else if (isString(input)) {
    const match2 = DURATION_REGEX.exec(input);
    if (match2) {
      const [_, valueStr, unit] = match2;
      const value2 = Number(valueStr);
      switch (unit) {
        case "nano":
        case "nanos":
          return nanos(BigInt(valueStr));
        case "micro":
        case "micros":
          return micros(BigInt(valueStr));
        case "milli":
        case "millis":
          return millis(value2);
        case "second":
        case "seconds":
          return seconds(value2);
        case "minute":
        case "minutes":
          return minutes(value2);
        case "hour":
        case "hours":
          return hours(value2);
        case "day":
        case "days":
          return days(value2);
        case "week":
        case "weeks":
          return weeks(value2);
      }
    }
  }
  throw new Error("Invalid DurationInput");
};
const zeroValue = {
  _tag: "Millis",
  millis: 0
};
const infinityValue = {
  _tag: "Infinity"
};
const DurationProto = {
  [TypeId$9]: TypeId$9,
  [symbol$1]() {
    return cached$1(this, structure(this.value));
  },
  [symbol](that) {
    return isDuration(that) && equals(this, that);
  },
  toString() {
    return `Duration(${format$2(this)})`;
  },
  toJSON() {
    switch (this.value._tag) {
      case "Millis":
        return {
          _id: "Duration",
          _tag: "Millis",
          millis: this.value.millis
        };
      case "Nanos":
        return {
          _id: "Duration",
          _tag: "Nanos",
          hrtime: toHrTime(this)
        };
      case "Infinity":
        return {
          _id: "Duration",
          _tag: "Infinity"
        };
    }
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const make$u = (input) => {
  const duration = Object.create(DurationProto);
  if (isNumber(input)) {
    if (isNaN(input) || input <= 0) {
      duration.value = zeroValue;
    } else if (!Number.isFinite(input)) {
      duration.value = infinityValue;
    } else if (!Number.isInteger(input)) {
      duration.value = {
        _tag: "Nanos",
        nanos: BigInt(Math.round(input * 1e6))
      };
    } else {
      duration.value = {
        _tag: "Millis",
        millis: input
      };
    }
  } else if (input <= bigint0$2) {
    duration.value = zeroValue;
  } else {
    duration.value = {
      _tag: "Nanos",
      nanos: input
    };
  }
  return duration;
};
const isDuration = (u) => hasProperty(u, TypeId$9);
const isZero = (self) => {
  switch (self.value._tag) {
    case "Millis": {
      return self.value.millis === 0;
    }
    case "Nanos": {
      return self.value.nanos === bigint0$2;
    }
    case "Infinity": {
      return false;
    }
  }
};
const zero = /* @__PURE__ */ make$u(0);
const infinity = /* @__PURE__ */ make$u(Infinity);
const nanos = (nanos2) => make$u(nanos2);
const micros = (micros2) => make$u(micros2 * bigint1e3);
const millis = (millis2) => make$u(millis2);
const seconds = (seconds2) => make$u(seconds2 * 1e3);
const minutes = (minutes2) => make$u(minutes2 * 6e4);
const hours = (hours2) => make$u(hours2 * 36e5);
const days = (days2) => make$u(days2 * 864e5);
const weeks = (weeks2) => make$u(weeks2 * 6048e5);
const toMillis = (self) => match$6(self, {
  onMillis: (millis2) => millis2,
  onNanos: (nanos2) => Number(nanos2) / 1e6
});
const unsafeToNanos = (self) => {
  const _self = decode(self);
  switch (_self.value._tag) {
    case "Infinity":
      throw new Error("Cannot convert infinite duration to nanos");
    case "Nanos":
      return _self.value.nanos;
    case "Millis":
      return BigInt(Math.round(_self.value.millis * 1e6));
  }
};
const toHrTime = (self) => {
  const _self = decode(self);
  switch (_self.value._tag) {
    case "Infinity":
      return [Infinity, 0];
    case "Nanos":
      return [Number(_self.value.nanos / bigint1e9), Number(_self.value.nanos % bigint1e9)];
    case "Millis":
      return [Math.floor(_self.value.millis / 1e3), Math.round(_self.value.millis % 1e3 * 1e6)];
  }
};
const match$6 = /* @__PURE__ */ dual(2, (self, options) => {
  const _self = decode(self);
  switch (_self.value._tag) {
    case "Nanos":
      return options.onNanos(_self.value.nanos);
    case "Infinity":
      return options.onMillis(Infinity);
    case "Millis":
      return options.onMillis(_self.value.millis);
  }
});
const matchWith = /* @__PURE__ */ dual(3, (self, that, options) => {
  const _self = decode(self);
  const _that = decode(that);
  if (_self.value._tag === "Infinity" || _that.value._tag === "Infinity") {
    return options.onMillis(toMillis(_self), toMillis(_that));
  } else if (_self.value._tag === "Nanos" || _that.value._tag === "Nanos") {
    const selfNanos = _self.value._tag === "Nanos" ? _self.value.nanos : BigInt(Math.round(_self.value.millis * 1e6));
    const thatNanos = _that.value._tag === "Nanos" ? _that.value.nanos : BigInt(Math.round(_that.value.millis * 1e6));
    return options.onNanos(selfNanos, thatNanos);
  }
  return options.onMillis(_self.value.millis, _that.value.millis);
});
const Equivalence = (self, that) => matchWith(self, that, {
  onMillis: (self2, that2) => self2 === that2,
  onNanos: (self2, that2) => self2 === that2
});
const lessThanOrEqualTo = /* @__PURE__ */ dual(2, (self, that) => matchWith(self, that, {
  onMillis: (self2, that2) => self2 <= that2,
  onNanos: (self2, that2) => self2 <= that2
}));
const greaterThanOrEqualTo = /* @__PURE__ */ dual(2, (self, that) => matchWith(self, that, {
  onMillis: (self2, that2) => self2 >= that2,
  onNanos: (self2, that2) => self2 >= that2
}));
const equals = /* @__PURE__ */ dual(2, (self, that) => Equivalence(decode(self), decode(that)));
const parts = (self) => {
  const duration = decode(self);
  if (duration.value._tag === "Infinity") {
    return {
      days: Infinity,
      hours: Infinity,
      minutes: Infinity,
      seconds: Infinity,
      millis: Infinity,
      nanos: Infinity
    };
  }
  const nanos2 = unsafeToNanos(duration);
  const ms = nanos2 / bigint1e6;
  const sec = ms / bigint1e3;
  const min2 = sec / bigint60;
  const hr = min2 / bigint60;
  const days2 = hr / bigint24;
  return {
    days: Number(days2),
    hours: Number(hr % bigint24),
    minutes: Number(min2 % bigint60),
    seconds: Number(sec % bigint60),
    millis: Number(ms % bigint1e3),
    nanos: Number(nanos2 % bigint1e6)
  };
};
const format$2 = (self) => {
  const duration = decode(self);
  if (duration.value._tag === "Infinity") {
    return "Infinity";
  }
  if (isZero(duration)) {
    return "0";
  }
  const fragments = parts(duration);
  const pieces = [];
  if (fragments.days !== 0) {
    pieces.push(`${fragments.days}d`);
  }
  if (fragments.hours !== 0) {
    pieces.push(`${fragments.hours}h`);
  }
  if (fragments.minutes !== 0) {
    pieces.push(`${fragments.minutes}m`);
  }
  if (fragments.seconds !== 0) {
    pieces.push(`${fragments.seconds}s`);
  }
  if (fragments.millis !== 0) {
    pieces.push(`${fragments.millis}ms`);
  }
  if (fragments.nanos !== 0) {
    pieces.push(`${fragments.nanos}ns`);
  }
  return pieces.join(" ");
};
const TypeId$8 = /* @__PURE__ */ Symbol.for("effect/MutableRef");
const MutableRefProto = {
  [TypeId$8]: TypeId$8,
  toString() {
    return format$3(this.toJSON());
  },
  toJSON() {
    return {
      _id: "MutableRef",
      current: toJSON(this.current)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const make$t = (value2) => {
  const ref = Object.create(MutableRefProto);
  ref.current = value2;
  return ref;
};
const compareAndSet = /* @__PURE__ */ dual(3, (self, oldValue, newValue) => {
  if (equals$1(oldValue, self.current)) {
    self.current = newValue;
    return true;
  }
  return false;
});
const get$6 = (self) => self.current;
const set$3 = /* @__PURE__ */ dual(2, (self, value2) => {
  self.current = value2;
  return self;
});
const FiberIdSymbolKey = "effect/FiberId";
const FiberIdTypeId = /* @__PURE__ */ Symbol.for(FiberIdSymbolKey);
const OP_NONE = "None";
const OP_RUNTIME = "Runtime";
const OP_COMPOSITE = "Composite";
const emptyHash = /* @__PURE__ */ string$2(`${FiberIdSymbolKey}-${OP_NONE}`);
let None$2 = class None {
  [FiberIdTypeId] = FiberIdTypeId;
  _tag = OP_NONE;
  id = -1;
  startTimeMillis = -1;
  [symbol$1]() {
    return emptyHash;
  }
  [symbol](that) {
    return isFiberId(that) && that._tag === OP_NONE;
  }
  toString() {
    return format$3(this.toJSON());
  }
  toJSON() {
    return {
      _id: "FiberId",
      _tag: this._tag
    };
  }
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
};
class Runtime {
  id;
  startTimeMillis;
  [FiberIdTypeId] = FiberIdTypeId;
  _tag = OP_RUNTIME;
  constructor(id, startTimeMillis) {
    this.id = id;
    this.startTimeMillis = startTimeMillis;
  }
  [symbol$1]() {
    return cached$1(this, string$2(`${FiberIdSymbolKey}-${this._tag}-${this.id}-${this.startTimeMillis}`));
  }
  [symbol](that) {
    return isFiberId(that) && that._tag === OP_RUNTIME && this.id === that.id && this.startTimeMillis === that.startTimeMillis;
  }
  toString() {
    return format$3(this.toJSON());
  }
  toJSON() {
    return {
      _id: "FiberId",
      _tag: this._tag,
      id: this.id,
      startTimeMillis: this.startTimeMillis
    };
  }
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
}
let Composite$1 = class Composite {
  left;
  right;
  [FiberIdTypeId] = FiberIdTypeId;
  _tag = OP_COMPOSITE;
  constructor(left2, right2) {
    this.left = left2;
    this.right = right2;
  }
  _hash;
  [symbol$1]() {
    return pipe(string$2(`${FiberIdSymbolKey}-${this._tag}`), combine$7(hash(this.left)), combine$7(hash(this.right)), cached$1(this));
  }
  [symbol](that) {
    return isFiberId(that) && that._tag === OP_COMPOSITE && equals$1(this.left, that.left) && equals$1(this.right, that.right);
  }
  toString() {
    return format$3(this.toJSON());
  }
  toJSON() {
    return {
      _id: "FiberId",
      _tag: this._tag,
      left: toJSON(this.left),
      right: toJSON(this.right)
    };
  }
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
};
const none$5 = /* @__PURE__ */ new None$2();
const isFiberId = (self) => hasProperty(self, FiberIdTypeId);
const combine$6 = /* @__PURE__ */ dual(2, (self, that) => {
  if (self._tag === OP_NONE) {
    return that;
  }
  if (that._tag === OP_NONE) {
    return self;
  }
  return new Composite$1(self, that);
});
const combineAll$1 = (fiberIds) => {
  return pipe(fiberIds, reduce$3(none$5, (a, b) => combine$6(b)(a)));
};
const ids$1 = (self) => {
  switch (self._tag) {
    case OP_NONE: {
      return empty$h();
    }
    case OP_RUNTIME: {
      return make$v(self.id);
    }
    case OP_COMPOSITE: {
      return pipe(ids$1(self.left), union(ids$1(self.right)));
    }
  }
};
const _fiberCounter = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Fiber/Id/_fiberCounter"), () => make$t(0));
const threadName$1 = (self) => {
  const identifiers = Array.from(ids$1(self)).map((n) => `#${n}`).join(",");
  return identifiers;
};
const unsafeMake$7 = () => {
  const id = get$6(_fiberCounter);
  pipe(_fiberCounter, set$3(id + 1));
  return new Runtime(id, Date.now());
};
const none$4 = none$5;
const combine$5 = combine$6;
const combineAll = combineAll$1;
const ids = ids$1;
const threadName = threadName$1;
const unsafeMake$6 = unsafeMake$7;
const empty$f = empty$j;
const fromIterable$1 = fromIterable$4;
const isEmpty$4 = isEmpty$6;
const get$5 = get$7;
const set$2 = set$4;
const keys = keys$1;
const size$2 = size$5;
const modifyAt = modifyAt$1;
const map$b = map$d;
const forEach$2 = forEach$4;
const reduce$1 = reduce$5;
const TypeId$7 = /* @__PURE__ */ Symbol.for("effect/List");
const toArray = (self) => fromIterable$6(self);
const getEquivalence = (isEquivalent) => mapInput$3(getEquivalence$3(isEquivalent), toArray);
const _equivalence = /* @__PURE__ */ getEquivalence(equals$1);
const ConsProto = {
  [TypeId$7]: TypeId$7,
  _tag: "Cons",
  toString() {
    return format$3(this.toJSON());
  },
  toJSON() {
    return {
      _id: "List",
      _tag: "Cons",
      values: toArray(this).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  [symbol](that) {
    return isList(that) && this._tag === that._tag && _equivalence(this, that);
  },
  [symbol$1]() {
    return cached$1(this, array(toArray(this)));
  },
  [Symbol.iterator]() {
    let done2 = false;
    let self = this;
    return {
      next() {
        if (done2) {
          return this.return();
        }
        if (self._tag === "Nil") {
          done2 = true;
          return this.return();
        }
        const value2 = self.head;
        self = self.tail;
        return {
          done: done2,
          value: value2
        };
      },
      return(value2) {
        if (!done2) {
          done2 = true;
        }
        return {
          done: true,
          value: value2
        };
      }
    };
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const makeCons = (head2, tail) => {
  const cons2 = Object.create(ConsProto);
  cons2.head = head2;
  cons2.tail = tail;
  return cons2;
};
const NilHash = /* @__PURE__ */ string$2("Nil");
const NilProto = {
  [TypeId$7]: TypeId$7,
  _tag: "Nil",
  toString() {
    return format$3(this.toJSON());
  },
  toJSON() {
    return {
      _id: "List",
      _tag: "Nil"
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  [symbol$1]() {
    return NilHash;
  },
  [symbol](that) {
    return isList(that) && this._tag === that._tag;
  },
  [Symbol.iterator]() {
    return {
      next() {
        return {
          done: true,
          value: void 0
        };
      }
    };
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const _Nil = /* @__PURE__ */ Object.create(NilProto);
const isList = (u) => hasProperty(u, TypeId$7);
const isNil = (self) => self._tag === "Nil";
const isCons = (self) => self._tag === "Cons";
const nil = () => _Nil;
const cons = (head2, tail) => makeCons(head2, tail);
const empty$e = nil;
const of = (value2) => makeCons(value2, _Nil);
const appendAll = /* @__PURE__ */ dual(2, (self, that) => prependAll(that, self));
const prepend = /* @__PURE__ */ dual(2, (self, element) => cons(element, self));
const prependAll = /* @__PURE__ */ dual(2, (self, prefix) => {
  if (isNil(self)) {
    return prefix;
  } else if (isNil(prefix)) {
    return self;
  } else {
    const result = makeCons(prefix.head, self);
    let curr = result;
    let that = prefix.tail;
    while (!isNil(that)) {
      const temp = makeCons(that.head, self);
      curr.tail = temp;
      curr = temp;
      that = that.tail;
    }
    return result;
  }
});
const reduce = /* @__PURE__ */ dual(3, (self, zero2, f) => {
  let acc = zero2;
  let these = self;
  while (!isNil(these)) {
    acc = f(acc, these.head);
    these = these.tail;
  }
  return acc;
});
const reverse = (self) => {
  let result = empty$e();
  let these = self;
  while (!isNil(these)) {
    result = prepend(result, these.head);
    these = these.tail;
  }
  return result;
};
const Structural = /* @__PURE__ */ (function() {
  function Structural2(args2) {
    if (args2) {
      Object.assign(this, args2);
    }
  }
  Structural2.prototype = StructuralPrototype;
  return Structural2;
})();
const ContextPatchTypeId = /* @__PURE__ */ Symbol.for("effect/DifferContextPatch");
function variance$3(a) {
  return a;
}
const PatchProto$2 = {
  ...Structural.prototype,
  [ContextPatchTypeId]: {
    _Value: variance$3,
    _Patch: variance$3
  }
};
const EmptyProto$2 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto$2), {
  _tag: "Empty"
});
const _empty$2 = /* @__PURE__ */ Object.create(EmptyProto$2);
const empty$d = () => _empty$2;
const AndThenProto$2 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto$2), {
  _tag: "AndThen"
});
const makeAndThen$2 = (first, second) => {
  const o = Object.create(AndThenProto$2);
  o.first = first;
  o.second = second;
  return o;
};
const AddServiceProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto$2), {
  _tag: "AddService"
});
const makeAddService = (key, service) => {
  const o = Object.create(AddServiceProto);
  o.key = key;
  o.service = service;
  return o;
};
const RemoveServiceProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto$2), {
  _tag: "RemoveService"
});
const makeRemoveService = (key) => {
  const o = Object.create(RemoveServiceProto);
  o.key = key;
  return o;
};
const UpdateServiceProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto$2), {
  _tag: "UpdateService"
});
const makeUpdateService = (key, update2) => {
  const o = Object.create(UpdateServiceProto);
  o.key = key;
  o.update = update2;
  return o;
};
const diff$6 = (oldValue, newValue) => {
  const missingServices = new Map(oldValue.unsafeMap);
  let patch2 = empty$d();
  for (const [tag, newService] of newValue.unsafeMap.entries()) {
    if (missingServices.has(tag)) {
      const old = missingServices.get(tag);
      missingServices.delete(tag);
      if (!equals$1(old, newService)) {
        patch2 = combine$4(makeUpdateService(tag, () => newService))(patch2);
      }
    } else {
      missingServices.delete(tag);
      patch2 = combine$4(makeAddService(tag, newService))(patch2);
    }
  }
  for (const [tag] of missingServices.entries()) {
    patch2 = combine$4(makeRemoveService(tag))(patch2);
  }
  return patch2;
};
const combine$4 = /* @__PURE__ */ dual(2, (self, that) => makeAndThen$2(self, that));
const patch$7 = /* @__PURE__ */ dual(2, (self, context2) => {
  if (self._tag === "Empty") {
    return context2;
  }
  let wasServiceUpdated = false;
  let patches = of$1(self);
  const updatedContext = new Map(context2.unsafeMap);
  while (isNonEmpty$3(patches)) {
    const head2 = headNonEmpty(patches);
    const tail = tailNonEmpty(patches);
    switch (head2._tag) {
      case "Empty": {
        patches = tail;
        break;
      }
      case "AddService": {
        updatedContext.set(head2.key, head2.service);
        patches = tail;
        break;
      }
      case "AndThen": {
        patches = prepend$1(prepend$1(tail, head2.second), head2.first);
        break;
      }
      case "RemoveService": {
        updatedContext.delete(head2.key);
        patches = tail;
        break;
      }
      case "UpdateService": {
        updatedContext.set(head2.key, head2.update(updatedContext.get(head2.key)));
        wasServiceUpdated = true;
        patches = tail;
        break;
      }
    }
  }
  if (!wasServiceUpdated) {
    return makeContext(updatedContext);
  }
  const map2 = /* @__PURE__ */ new Map();
  for (const [tag] of context2.unsafeMap) {
    if (updatedContext.has(tag)) {
      map2.set(tag, updatedContext.get(tag));
      updatedContext.delete(tag);
    }
  }
  for (const [tag, s] of updatedContext) {
    map2.set(tag, s);
  }
  return makeContext(map2);
});
const HashSetPatchTypeId = /* @__PURE__ */ Symbol.for("effect/DifferHashSetPatch");
function variance$2(a) {
  return a;
}
const PatchProto$1 = {
  ...Structural.prototype,
  [HashSetPatchTypeId]: {
    _Value: variance$2,
    _Key: variance$2,
    _Patch: variance$2
  }
};
const EmptyProto$1 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto$1), {
  _tag: "Empty"
});
const _empty$1 = /* @__PURE__ */ Object.create(EmptyProto$1);
const empty$c = () => _empty$1;
const AndThenProto$1 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto$1), {
  _tag: "AndThen"
});
const makeAndThen$1 = (first, second) => {
  const o = Object.create(AndThenProto$1);
  o.first = first;
  o.second = second;
  return o;
};
const AddProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto$1), {
  _tag: "Add"
});
const makeAdd = (value2) => {
  const o = Object.create(AddProto);
  o.value = value2;
  return o;
};
const RemoveProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto$1), {
  _tag: "Remove"
});
const makeRemove = (value2) => {
  const o = Object.create(RemoveProto);
  o.value = value2;
  return o;
};
const diff$5 = (oldValue, newValue) => {
  const [removed, patch2] = reduce$3([oldValue, empty$c()], ([set2, patch3], value2) => {
    if (has$1(value2)(set2)) {
      return [remove$2(value2)(set2), patch3];
    }
    return [set2, combine$3(makeAdd(value2))(patch3)];
  })(newValue);
  return reduce$3(patch2, (patch3, value2) => combine$3(makeRemove(value2))(patch3))(removed);
};
const combine$3 = /* @__PURE__ */ dual(2, (self, that) => makeAndThen$1(self, that));
const patch$6 = /* @__PURE__ */ dual(2, (self, oldValue) => {
  if (self._tag === "Empty") {
    return oldValue;
  }
  let set2 = oldValue;
  let patches = of$1(self);
  while (isNonEmpty$3(patches)) {
    const head2 = headNonEmpty(patches);
    const tail = tailNonEmpty(patches);
    switch (head2._tag) {
      case "Empty": {
        patches = tail;
        break;
      }
      case "AndThen": {
        patches = prepend$1(head2.first)(prepend$1(head2.second)(tail));
        break;
      }
      case "Add": {
        set2 = add$1(head2.value)(set2);
        patches = tail;
        break;
      }
      case "Remove": {
        set2 = remove$2(head2.value)(set2);
        patches = tail;
      }
    }
  }
  return set2;
});
const ReadonlyArrayPatchTypeId = /* @__PURE__ */ Symbol.for("effect/DifferReadonlyArrayPatch");
function variance$1(a) {
  return a;
}
const PatchProto = {
  ...Structural.prototype,
  [ReadonlyArrayPatchTypeId]: {
    _Value: variance$1,
    _Patch: variance$1
  }
};
const EmptyProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto), {
  _tag: "Empty"
});
const _empty = /* @__PURE__ */ Object.create(EmptyProto);
const empty$b = () => _empty;
const AndThenProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto), {
  _tag: "AndThen"
});
const makeAndThen = (first, second) => {
  const o = Object.create(AndThenProto);
  o.first = first;
  o.second = second;
  return o;
};
const AppendProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto), {
  _tag: "Append"
});
const makeAppend = (values) => {
  const o = Object.create(AppendProto);
  o.values = values;
  return o;
};
const SliceProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto), {
  _tag: "Slice"
});
const makeSlice = (from, until) => {
  const o = Object.create(SliceProto);
  o.from = from;
  o.until = until;
  return o;
};
const UpdateProto = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(PatchProto), {
  _tag: "Update"
});
const makeUpdate = (index, patch2) => {
  const o = Object.create(UpdateProto);
  o.index = index;
  o.patch = patch2;
  return o;
};
const diff$4 = (options) => {
  let i = 0;
  let patch2 = empty$b();
  while (i < options.oldValue.length && i < options.newValue.length) {
    const oldElement = options.oldValue[i];
    const newElement = options.newValue[i];
    const valuePatch = options.differ.diff(oldElement, newElement);
    if (!equals$1(valuePatch, options.differ.empty)) {
      patch2 = combine$2(patch2, makeUpdate(i, valuePatch));
    }
    i = i + 1;
  }
  if (i < options.oldValue.length) {
    patch2 = combine$2(patch2, makeSlice(0, i));
  }
  if (i < options.newValue.length) {
    patch2 = combine$2(patch2, makeAppend(drop$1(i)(options.newValue)));
  }
  return patch2;
};
const combine$2 = /* @__PURE__ */ dual(2, (self, that) => makeAndThen(self, that));
const patch$5 = /* @__PURE__ */ dual(3, (self, oldValue, differ2) => {
  if (self._tag === "Empty") {
    return oldValue;
  }
  let readonlyArray2 = oldValue.slice();
  let patches = of$2(self);
  while (isNonEmptyArray(patches)) {
    const head2 = headNonEmpty$1(patches);
    const tail = tailNonEmpty$1(patches);
    switch (head2._tag) {
      case "Empty": {
        patches = tail;
        break;
      }
      case "AndThen": {
        tail.unshift(head2.first, head2.second);
        patches = tail;
        break;
      }
      case "Append": {
        for (const value2 of head2.values) {
          readonlyArray2.push(value2);
        }
        patches = tail;
        break;
      }
      case "Slice": {
        readonlyArray2 = readonlyArray2.slice(head2.from, head2.until);
        patches = tail;
        break;
      }
      case "Update": {
        readonlyArray2[head2.index] = differ2.patch(head2.patch, readonlyArray2[head2.index]);
        patches = tail;
        break;
      }
    }
  }
  return readonlyArray2;
});
const DifferTypeId = /* @__PURE__ */ Symbol.for("effect/Differ");
const DifferProto = {
  [DifferTypeId]: {
    _P: identity,
    _V: identity
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const make$s = (params) => {
  const differ2 = Object.create(DifferProto);
  differ2.empty = params.empty;
  differ2.diff = params.diff;
  differ2.combine = params.combine;
  differ2.patch = params.patch;
  return differ2;
};
const environment = () => make$s({
  empty: empty$d(),
  combine: (first, second) => combine$4(second)(first),
  diff: (oldValue, newValue) => diff$6(oldValue, newValue),
  patch: (patch2, oldValue) => patch$7(oldValue)(patch2)
});
const hashSet = () => make$s({
  empty: empty$c(),
  combine: (first, second) => combine$3(second)(first),
  diff: (oldValue, newValue) => diff$5(oldValue, newValue),
  patch: (patch2, oldValue) => patch$6(oldValue)(patch2)
});
const readonlyArray = (differ2) => make$s({
  empty: empty$b(),
  combine: (first, second) => combine$2(first, second),
  diff: (oldValue, newValue) => diff$4({
    oldValue,
    newValue,
    differ: differ2
  }),
  patch: (patch2, oldValue) => patch$5(patch2, oldValue, differ2)
});
const update$4 = () => updateWith((_, a) => a);
const updateWith = (f) => make$s({
  empty: identity,
  combine: (first, second) => {
    if (first === identity) {
      return second;
    }
    if (second === identity) {
      return first;
    }
    return (a) => second(first(a));
  },
  diff: (oldValue, newValue) => {
    if (equals$1(oldValue, newValue)) {
      return identity;
    }
    return constant(newValue);
  },
  patch: (patch2, oldValue) => f(oldValue, patch2(oldValue))
});
const BIT_MASK = 255;
const BIT_SHIFT = 8;
const active = (patch2) => patch2 & BIT_MASK;
const enabled = (patch2) => patch2 >> BIT_SHIFT & BIT_MASK;
const make$r = (active2, enabled2) => (active2 & BIT_MASK) + ((enabled2 & active2 & BIT_MASK) << BIT_SHIFT);
const empty$a = /* @__PURE__ */ make$r(0, 0);
const enable$2 = (flag) => make$r(flag, flag);
const disable$2 = (flag) => make$r(flag, 0);
const exclude$1 = /* @__PURE__ */ dual(2, (self, flag) => make$r(active(self) & ~flag, enabled(self)));
const andThen$3 = /* @__PURE__ */ dual(2, (self, that) => self | that);
const invert = (n) => ~n >>> 0 & BIT_MASK;
const None$1 = 0;
const Interruption = 1 << 0;
const OpSupervision = 1 << 1;
const RuntimeMetrics = 1 << 2;
const WindDown = 1 << 4;
const CooperativeYielding = 1 << 5;
const cooperativeYielding = (self) => isEnabled(self, CooperativeYielding);
const disable$1 = /* @__PURE__ */ dual(2, (self, flag) => self & ~flag);
const enable$1 = /* @__PURE__ */ dual(2, (self, flag) => self | flag);
const interruptible$2 = (self) => interruption(self) && !windDown(self);
const interruption = (self) => isEnabled(self, Interruption);
const isEnabled = /* @__PURE__ */ dual(2, (self, flag) => (self & flag) !== 0);
const make$q = (...flags) => flags.reduce((a, b) => a | b, 0);
const none$3 = /* @__PURE__ */ make$q(None$1);
const runtimeMetrics = (self) => isEnabled(self, RuntimeMetrics);
const windDown = (self) => isEnabled(self, WindDown);
const diff$3 = /* @__PURE__ */ dual(2, (self, that) => make$r(self ^ that, that));
const patch$4 = /* @__PURE__ */ dual(2, (self, patch2) => self & (invert(active(patch2)) | enabled(patch2)) | active(patch2) & enabled(patch2));
const differ$1 = /* @__PURE__ */ make$s({
  empty: empty$a,
  diff: (oldValue, newValue) => diff$3(oldValue, newValue),
  combine: (first, second) => andThen$3(second)(first),
  patch: (_patch, oldValue) => patch$4(oldValue, _patch)
});
const enable = enable$2;
const disable = disable$2;
const exclude = exclude$1;
const par = (self, that) => ({
  _tag: "Par",
  left: self,
  right: that
});
const seq = (self, that) => ({
  _tag: "Seq",
  left: self,
  right: that
});
const flatten$6 = (self) => {
  let current = of(self);
  let updated = empty$e();
  while (1) {
    const [parallel2, sequential2] = reduce(current, [parallelCollectionEmpty(), empty$e()], ([parallel3, sequential3], blockedRequest) => {
      const [par2, seq2] = step$1(blockedRequest);
      return [parallelCollectionCombine(parallel3, par2), appendAll(sequential3, seq2)];
    });
    updated = merge$1(updated, parallel2);
    if (isNil(sequential2)) {
      return reverse(updated);
    }
    current = sequential2;
  }
  throw new Error("BUG: BlockedRequests.flatten - please report an issue at https://github.com/Effect-TS/effect/issues");
};
const step$1 = (requests) => {
  let current = requests;
  let parallel2 = parallelCollectionEmpty();
  let stack = empty$e();
  let sequential2 = empty$e();
  while (1) {
    switch (current._tag) {
      case "Empty": {
        if (isNil(stack)) {
          return [parallel2, sequential2];
        }
        current = stack.head;
        stack = stack.tail;
        break;
      }
      case "Par": {
        stack = cons(current.right, stack);
        current = current.left;
        break;
      }
      case "Seq": {
        const left2 = current.left;
        const right2 = current.right;
        switch (left2._tag) {
          case "Empty": {
            current = right2;
            break;
          }
          case "Par": {
            const l = left2.left;
            const r = left2.right;
            current = par(seq(l, right2), seq(r, right2));
            break;
          }
          case "Seq": {
            const l = left2.left;
            const r = left2.right;
            current = seq(l, seq(r, right2));
            break;
          }
          case "Single": {
            current = left2;
            sequential2 = cons(right2, sequential2);
            break;
          }
        }
        break;
      }
      case "Single": {
        parallel2 = parallelCollectionAdd(parallel2, current);
        if (isNil(stack)) {
          return [parallel2, sequential2];
        }
        current = stack.head;
        stack = stack.tail;
        break;
      }
    }
  }
  throw new Error("BUG: BlockedRequests.step - please report an issue at https://github.com/Effect-TS/effect/issues");
};
const merge$1 = (sequential2, parallel2) => {
  if (isNil(sequential2)) {
    return of(parallelCollectionToSequentialCollection(parallel2));
  }
  if (parallelCollectionIsEmpty(parallel2)) {
    return sequential2;
  }
  const seqHeadKeys = sequentialCollectionKeys(sequential2.head);
  const parKeys = parallelCollectionKeys(parallel2);
  if (seqHeadKeys.length === 1 && parKeys.length === 1 && equals$1(seqHeadKeys[0], parKeys[0])) {
    return cons(sequentialCollectionCombine(sequential2.head, parallelCollectionToSequentialCollection(parallel2)), sequential2.tail);
  }
  return cons(parallelCollectionToSequentialCollection(parallel2), sequential2);
};
const RequestBlockParallelTypeId = /* @__PURE__ */ Symbol.for("effect/RequestBlock/RequestBlockParallel");
const parallelVariance = {
  /* c8 ignore next */
  _R: (_) => _
};
class ParallelImpl {
  map;
  [RequestBlockParallelTypeId] = parallelVariance;
  constructor(map2) {
    this.map = map2;
  }
}
const parallelCollectionEmpty = () => new ParallelImpl(empty$f());
const parallelCollectionAdd = (self, blockedRequest) => new ParallelImpl(modifyAt(self.map, blockedRequest.dataSource, (_) => orElseSome(map$i(_, append$1(blockedRequest.blockedRequest)), () => of$1(blockedRequest.blockedRequest))));
const parallelCollectionCombine = (self, that) => new ParallelImpl(reduce$1(self.map, that.map, (map2, value2, key) => set$2(map2, key, match$9(get$5(map2, key), {
  onNone: () => value2,
  onSome: (other) => appendAll$1(value2, other)
}))));
const parallelCollectionIsEmpty = (self) => isEmpty$4(self.map);
const parallelCollectionKeys = (self) => Array.from(keys(self.map));
const parallelCollectionToSequentialCollection = (self) => sequentialCollectionMake(map$b(self.map, (x) => of$1(x)));
const SequentialCollectionTypeId = /* @__PURE__ */ Symbol.for("effect/RequestBlock/RequestBlockSequential");
const sequentialVariance = {
  /* c8 ignore next */
  _R: (_) => _
};
class SequentialImpl {
  map;
  [SequentialCollectionTypeId] = sequentialVariance;
  constructor(map2) {
    this.map = map2;
  }
}
const sequentialCollectionMake = (map2) => new SequentialImpl(map2);
const sequentialCollectionCombine = (self, that) => new SequentialImpl(reduce$1(that.map, self.map, (map2, value2, key) => set$2(map2, key, match$9(get$5(map2, key), {
  onNone: () => empty$k(),
  onSome: (a) => appendAll$1(a, value2)
}))));
const sequentialCollectionKeys = (self) => Array.from(keys(self.map));
const sequentialCollectionToChunk = (self) => Array.from(self.map);
const OP_STATE_PENDING = "Pending";
const OP_STATE_DONE$1 = "Done";
const DeferredSymbolKey = "effect/Deferred";
const DeferredTypeId = /* @__PURE__ */ Symbol.for(DeferredSymbolKey);
const deferredVariance = {
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _A: (_) => _
};
const pending = (joiners) => {
  return {
    _tag: OP_STATE_PENDING,
    joiners
  };
};
const done$4 = (effect2) => {
  return {
    _tag: OP_STATE_DONE$1,
    effect: effect2
  };
};
class SingleShotGen2 {
  self;
  called = false;
  constructor(self) {
    this.self = self;
  }
  next(a) {
    return this.called ? {
      value: a,
      done: true
    } : (this.called = true, {
      value: this.self,
      done: false
    });
  }
  return(a) {
    return {
      value: a,
      done: true
    };
  }
  throw(e) {
    throw e;
  }
  [Symbol.iterator]() {
    return new SingleShotGen2(this.self);
  }
}
const blocked = (blockedRequests, _continue2) => {
  const effect2 = new EffectPrimitive("Blocked");
  effect2.effect_instruction_i0 = blockedRequests;
  effect2.effect_instruction_i1 = _continue2;
  return effect2;
};
const runRequestBlock = (blockedRequests) => {
  const effect2 = new EffectPrimitive("RunBlocked");
  effect2.effect_instruction_i0 = blockedRequests;
  return effect2;
};
const EffectTypeId = /* @__PURE__ */ Symbol.for("effect/Effect");
class RevertFlags {
  patch;
  op;
  _op = OP_REVERT_FLAGS;
  constructor(patch2, op) {
    this.patch = patch2;
    this.op = op;
  }
}
class EffectPrimitive {
  _op;
  effect_instruction_i0 = void 0;
  effect_instruction_i1 = void 0;
  effect_instruction_i2 = void 0;
  trace = void 0;
  [EffectTypeId] = effectVariance;
  constructor(_op) {
    this._op = _op;
  }
  [symbol](that) {
    return this === that;
  }
  [symbol$1]() {
    return cached$1(this, random(this));
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
  toJSON() {
    return {
      _id: "Effect",
      _op: this._op,
      effect_instruction_i0: toJSON(this.effect_instruction_i0),
      effect_instruction_i1: toJSON(this.effect_instruction_i1),
      effect_instruction_i2: toJSON(this.effect_instruction_i2)
    };
  }
  toString() {
    return format$3(this.toJSON());
  }
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
  [Symbol.iterator]() {
    return new SingleShotGen2(new YieldWrap(this));
  }
}
class EffectPrimitiveFailure {
  _op;
  effect_instruction_i0 = void 0;
  effect_instruction_i1 = void 0;
  effect_instruction_i2 = void 0;
  trace = void 0;
  [EffectTypeId] = effectVariance;
  constructor(_op) {
    this._op = _op;
    this._tag = _op;
  }
  [symbol](that) {
    return exitIsExit(that) && that._op === "Failure" && // @ts-expect-error
    equals$1(this.effect_instruction_i0, that.effect_instruction_i0);
  }
  [symbol$1]() {
    return pipe(
      // @ts-expect-error
      string$2(this._tag),
      // @ts-expect-error
      combine$7(hash(this.effect_instruction_i0)),
      cached$1(this)
    );
  }
  get cause() {
    return this.effect_instruction_i0;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
  toJSON() {
    return {
      _id: "Exit",
      _tag: this._op,
      cause: this.cause.toJSON()
    };
  }
  toString() {
    return format$3(this.toJSON());
  }
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
  [Symbol.iterator]() {
    return new SingleShotGen2(new YieldWrap(this));
  }
}
class EffectPrimitiveSuccess {
  _op;
  effect_instruction_i0 = void 0;
  effect_instruction_i1 = void 0;
  effect_instruction_i2 = void 0;
  trace = void 0;
  [EffectTypeId] = effectVariance;
  constructor(_op) {
    this._op = _op;
    this._tag = _op;
  }
  [symbol](that) {
    return exitIsExit(that) && that._op === "Success" && // @ts-expect-error
    equals$1(this.effect_instruction_i0, that.effect_instruction_i0);
  }
  [symbol$1]() {
    return pipe(
      // @ts-expect-error
      string$2(this._tag),
      // @ts-expect-error
      combine$7(hash(this.effect_instruction_i0)),
      cached$1(this)
    );
  }
  get value() {
    return this.effect_instruction_i0;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
  toJSON() {
    return {
      _id: "Exit",
      _tag: this._op,
      value: toJSON(this.value)
    };
  }
  toString() {
    return format$3(this.toJSON());
  }
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
  [Symbol.iterator]() {
    return new SingleShotGen2(new YieldWrap(this));
  }
}
const isEffect$1 = (u) => hasProperty(u, EffectTypeId);
const withFiberRuntime$1 = (withRuntime) => {
  const effect2 = new EffectPrimitive(OP_WITH_RUNTIME);
  effect2.effect_instruction_i0 = withRuntime;
  return effect2;
};
const acquireUseRelease$1 = /* @__PURE__ */ dual(3, (acquire, use, release) => uninterruptibleMask$1((restore) => flatMap$5(acquire, (a) => flatMap$5(exit$1(suspend$6(() => restore(use(a)))), (exit2) => {
  return suspend$6(() => release(a, exit2)).pipe(matchCauseEffect$1({
    onFailure: (cause) => {
      switch (exit2._tag) {
        case OP_FAILURE:
          return failCause$5(sequential$2(exit2.effect_instruction_i0, cause));
        case OP_SUCCESS:
          return failCause$5(cause);
      }
    },
    onSuccess: () => exit2
  }));
}))));
const as$1 = /* @__PURE__ */ dual(2, (self, value2) => flatMap$5(self, () => succeed$b(value2)));
const asVoid$1 = (self) => as$1(self, void 0);
const custom = function() {
  const wrapper = new EffectPrimitive(OP_COMMIT);
  switch (arguments.length) {
    case 2: {
      wrapper.effect_instruction_i0 = arguments[0];
      wrapper.commit = arguments[1];
      break;
    }
    case 3: {
      wrapper.effect_instruction_i0 = arguments[0];
      wrapper.effect_instruction_i1 = arguments[1];
      wrapper.commit = arguments[2];
      break;
    }
    case 4: {
      wrapper.effect_instruction_i0 = arguments[0];
      wrapper.effect_instruction_i1 = arguments[1];
      wrapper.effect_instruction_i2 = arguments[2];
      wrapper.commit = arguments[3];
      break;
    }
    default: {
      throw new Error(getBugErrorMessage("you're not supposed to end up here"));
    }
  }
  return wrapper;
};
const unsafeAsync = (register, blockingOn = none$4) => {
  const effect2 = new EffectPrimitive(OP_ASYNC);
  let cancelerRef = void 0;
  effect2.effect_instruction_i0 = (resume2) => {
    cancelerRef = register(resume2);
  };
  effect2.effect_instruction_i1 = blockingOn;
  return onInterrupt$1(effect2, (_) => isEffect$1(cancelerRef) ? cancelerRef : void_$2);
};
const asyncInterrupt = (register, blockingOn = none$4) => suspend$6(() => unsafeAsync(register, blockingOn));
const async_ = (resume2, blockingOn = none$4) => {
  return custom(resume2, function() {
    let backingResume = void 0;
    let pendingEffect = void 0;
    function proxyResume(effect3) {
      if (backingResume) {
        backingResume(effect3);
      } else if (pendingEffect === void 0) {
        pendingEffect = effect3;
      }
    }
    const effect2 = new EffectPrimitive(OP_ASYNC);
    effect2.effect_instruction_i0 = (resume3) => {
      backingResume = resume3;
      if (pendingEffect) {
        resume3(pendingEffect);
      }
    };
    effect2.effect_instruction_i1 = blockingOn;
    let cancelerRef = void 0;
    let controllerRef = void 0;
    if (this.effect_instruction_i0.length !== 1) {
      controllerRef = new AbortController();
      cancelerRef = internalCall(() => this.effect_instruction_i0(proxyResume, controllerRef.signal));
    } else {
      cancelerRef = internalCall(() => this.effect_instruction_i0(proxyResume));
    }
    return cancelerRef || controllerRef ? onInterrupt$1(effect2, (_) => {
      if (controllerRef) {
        controllerRef.abort();
      }
      return cancelerRef ?? void_$2;
    }) : effect2;
  });
};
const catchAllCause$1 = /* @__PURE__ */ dual(2, (self, f) => {
  const effect2 = new EffectPrimitive(OP_ON_FAILURE);
  effect2.effect_instruction_i0 = self;
  effect2.effect_instruction_i1 = f;
  return effect2;
});
const catchAll$1 = /* @__PURE__ */ dual(2, (self, f) => matchEffect(self, {
  onFailure: f,
  onSuccess: succeed$b
}));
const catchIf = /* @__PURE__ */ dual(3, (self, predicate, f) => catchAllCause$1(self, (cause) => {
  const either2 = failureOrCause$1(cause);
  switch (either2._tag) {
    case "Left":
      return predicate(either2.left) ? f(either2.left) : failCause$5(cause);
    case "Right":
      return failCause$5(either2.right);
  }
}));
const originalSymbol = /* @__PURE__ */ Symbol.for("effect/OriginalAnnotation");
const capture = (obj, span2) => {
  if (isSome(span2)) {
    return new Proxy(obj, {
      has(target, p) {
        return p === spanSymbol || p === originalSymbol || p in target;
      },
      get(target, p) {
        if (p === spanSymbol) {
          return span2.value;
        }
        if (p === originalSymbol) {
          return obj;
        }
        return target[p];
      }
    });
  }
  return obj;
};
const die$3 = (defect) => isObject(defect) && !(spanSymbol in defect) ? withFiberRuntime$1((fiber) => failCause$5(die$4(capture(defect, currentSpanFromFiber(fiber))))) : failCause$5(die$4(defect));
const dieMessage$1 = (message) => failCauseSync$1(() => die$4(new RuntimeException(message)));
const either$1 = (self) => matchEffect(self, {
  onFailure: (e) => succeed$b(left(e)),
  onSuccess: (a) => succeed$b(right(a))
});
const exit$1 = (self) => matchCause$2(self, {
  onFailure: exitFailCause,
  onSuccess: exitSucceed
});
const fail$8 = (error) => isObject(error) && !(spanSymbol in error) ? withFiberRuntime$1((fiber) => failCause$5(fail$9(capture(error, currentSpanFromFiber(fiber))))) : failCause$5(fail$9(error));
const failSync = (evaluate2) => flatMap$5(sync$4(evaluate2), fail$8);
const failCause$5 = (cause) => {
  const effect2 = new EffectPrimitiveFailure(OP_FAILURE);
  effect2.effect_instruction_i0 = cause;
  return effect2;
};
const failCauseSync$1 = (evaluate2) => flatMap$5(sync$4(evaluate2), failCause$5);
const fiberId = /* @__PURE__ */ withFiberRuntime$1((state) => succeed$b(state.id()));
const fiberIdWith$1 = (f) => withFiberRuntime$1((state) => f(state.id()));
const flatMap$5 = /* @__PURE__ */ dual(2, (self, f) => {
  const effect2 = new EffectPrimitive(OP_ON_SUCCESS);
  effect2.effect_instruction_i0 = self;
  effect2.effect_instruction_i1 = f;
  return effect2;
});
const andThen$2 = /* @__PURE__ */ dual(2, (self, f) => flatMap$5(self, (a) => {
  const b = typeof f === "function" ? f(a) : f;
  if (isEffect$1(b)) {
    return b;
  } else if (isPromiseLike(b)) {
    return unsafeAsync((resume2) => {
      b.then((a2) => resume2(succeed$b(a2)), (e) => resume2(fail$8(new UnknownException(e, "An unknown error occurred in Effect.andThen"))));
    });
  }
  return succeed$b(b);
}));
const step = (self) => {
  const effect2 = new EffectPrimitive("OnStep");
  effect2.effect_instruction_i0 = self;
  return effect2;
};
const flatten$5 = (self) => flatMap$5(self, identity);
const matchCause$2 = /* @__PURE__ */ dual(2, (self, options) => matchCauseEffect$1(self, {
  onFailure: (cause) => succeed$b(options.onFailure(cause)),
  onSuccess: (a) => succeed$b(options.onSuccess(a))
}));
const matchCauseEffect$1 = /* @__PURE__ */ dual(2, (self, options) => {
  const effect2 = new EffectPrimitive(OP_ON_SUCCESS_AND_FAILURE);
  effect2.effect_instruction_i0 = self;
  effect2.effect_instruction_i1 = options.onFailure;
  effect2.effect_instruction_i2 = options.onSuccess;
  return effect2;
});
const matchEffect = /* @__PURE__ */ dual(2, (self, options) => matchCauseEffect$1(self, {
  onFailure: (cause) => {
    const defects$1 = defects(cause);
    if (defects$1.length > 0) {
      return failCause$5(electFailures(cause));
    }
    const failures$1 = failures(cause);
    if (failures$1.length > 0) {
      return options.onFailure(unsafeHead(failures$1));
    }
    return failCause$5(cause);
  },
  onSuccess: options.onSuccess
}));
const forEachSequential = /* @__PURE__ */ dual(2, (self, f) => suspend$6(() => {
  const arr = fromIterable$6(self);
  const ret = allocate(arr.length);
  let i = 0;
  return as$1(whileLoop({
    while: () => i < arr.length,
    body: () => f(arr[i], i),
    step: (b) => {
      ret[i++] = b;
    }
  }), ret);
}));
const forEachSequentialDiscard = /* @__PURE__ */ dual(2, (self, f) => suspend$6(() => {
  const arr = fromIterable$6(self);
  let i = 0;
  return whileLoop({
    while: () => i < arr.length,
    body: () => f(arr[i], i),
    step: () => {
      i++;
    }
  });
}));
const interrupt$3 = /* @__PURE__ */ flatMap$5(fiberId, (fiberId2) => interruptWith(fiberId2));
const interruptWith = (fiberId2) => failCause$5(interrupt$4(fiberId2));
const interruptible$1 = (self) => {
  const effect2 = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect2.effect_instruction_i0 = enable(Interruption);
  effect2.effect_instruction_i1 = () => self;
  return effect2;
};
const intoDeferred$1 = /* @__PURE__ */ dual(2, (self, deferred) => uninterruptibleMask$1((restore) => flatMap$5(exit$1(restore(self)), (exit2) => deferredDone(deferred, exit2))));
const map$a = /* @__PURE__ */ dual(2, (self, f) => flatMap$5(self, (a) => sync$4(() => f(a))));
const mapBoth$2 = /* @__PURE__ */ dual(2, (self, options) => matchEffect(self, {
  onFailure: (e) => failSync(() => options.onFailure(e)),
  onSuccess: (a) => sync$4(() => options.onSuccess(a))
}));
const mapError$2 = /* @__PURE__ */ dual(2, (self, f) => matchCauseEffect$1(self, {
  onFailure: (cause) => {
    const either2 = failureOrCause$1(cause);
    switch (either2._tag) {
      case "Left": {
        return failSync(() => f(either2.left));
      }
      case "Right": {
        return failCause$5(either2.right);
      }
    }
  },
  onSuccess: succeed$b
}));
const onExit = /* @__PURE__ */ dual(2, (self, cleanup) => uninterruptibleMask$1((restore) => matchCauseEffect$1(restore(self), {
  onFailure: (cause1) => {
    const result = exitFailCause(cause1);
    return matchCauseEffect$1(cleanup(result), {
      onFailure: (cause2) => exitFailCause(sequential$2(cause1, cause2)),
      onSuccess: () => result
    });
  },
  onSuccess: (success) => {
    const result = exitSucceed(success);
    return zipRight$5(cleanup(result), result);
  }
})));
const onInterrupt$1 = /* @__PURE__ */ dual(2, (self, cleanup) => onExit(self, exitMatch({
  onFailure: (cause) => isInterruptedOnly(cause) ? asVoid$1(cleanup(interruptors$1(cause))) : void_$2,
  onSuccess: () => void_$2
})));
const orDie = (self) => orDieWith(self, identity);
const orDieWith = /* @__PURE__ */ dual(2, (self, f) => matchEffect(self, {
  onFailure: (e) => die$3(f(e)),
  onSuccess: succeed$b
}));
const runtimeFlags = /* @__PURE__ */ withFiberRuntime$1((_, status) => succeed$b(status.runtimeFlags));
const succeed$b = (value2) => {
  const effect2 = new EffectPrimitiveSuccess(OP_SUCCESS);
  effect2.effect_instruction_i0 = value2;
  return effect2;
};
const suspend$6 = (evaluate2) => {
  const effect2 = new EffectPrimitive(OP_COMMIT);
  effect2.commit = evaluate2;
  return effect2;
};
const sync$4 = (thunk) => {
  const effect2 = new EffectPrimitive(OP_SYNC);
  effect2.effect_instruction_i0 = thunk;
  return effect2;
};
const tap$1 = /* @__PURE__ */ dual((args2) => args2.length === 3 || args2.length === 2 && !(isObject(args2[1]) && "onlyEffect" in args2[1]), (self, f) => flatMap$5(self, (a) => {
  const b = typeof f === "function" ? f(a) : f;
  if (isEffect$1(b)) {
    return as$1(b, a);
  } else if (isPromiseLike(b)) {
    return unsafeAsync((resume2) => {
      b.then((_) => resume2(succeed$b(a)), (e) => resume2(fail$8(new UnknownException(e, "An unknown error occurred in Effect.tap"))));
    });
  }
  return succeed$b(a);
}));
const transplant = (f) => withFiberRuntime$1((state) => {
  const scopeOverride = state.getFiberRef(currentForkScopeOverride);
  const scope2 = pipe(scopeOverride, getOrElse(() => state.scope()));
  return f(fiberRefLocally(currentForkScopeOverride, some(scope2)));
});
const uninterruptible$1 = (self) => {
  const effect2 = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect2.effect_instruction_i0 = disable(Interruption);
  effect2.effect_instruction_i1 = () => self;
  return effect2;
};
const uninterruptibleMask$1 = (f) => custom(f, function() {
  const effect2 = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect2.effect_instruction_i0 = disable(Interruption);
  effect2.effect_instruction_i1 = (oldFlags) => interruption(oldFlags) ? internalCall(() => this.effect_instruction_i0(interruptible$1)) : internalCall(() => this.effect_instruction_i0(uninterruptible$1));
  return effect2;
});
const void_$2 = /* @__PURE__ */ succeed$b(void 0);
const updateRuntimeFlags = (patch2) => {
  const effect2 = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect2.effect_instruction_i0 = patch2;
  effect2.effect_instruction_i1 = void 0;
  return effect2;
};
const whenEffect = /* @__PURE__ */ dual(2, (self, condition) => flatMap$5(condition, (b) => {
  if (b) {
    return pipe(self, map$a(some));
  }
  return succeed$b(none$6());
}));
const whileLoop = (options) => {
  const effect2 = new EffectPrimitive(OP_WHILE);
  effect2.effect_instruction_i0 = options.while;
  effect2.effect_instruction_i1 = options.body;
  effect2.effect_instruction_i2 = options.step;
  return effect2;
};
const fromIterator = (iterator) => suspend$6(() => {
  const effect2 = new EffectPrimitive(OP_ITERATOR);
  effect2.effect_instruction_i0 = iterator();
  return effect2;
});
const gen$1 = function() {
  const f = arguments.length === 1 ? arguments[0] : arguments[1].bind(arguments[0]);
  return fromIterator(() => f(pipe));
};
const withRuntimeFlags = /* @__PURE__ */ dual(2, (self, update2) => {
  const effect2 = new EffectPrimitive(OP_UPDATE_RUNTIME_FLAGS);
  effect2.effect_instruction_i0 = update2;
  effect2.effect_instruction_i1 = () => self;
  return effect2;
});
const yieldNow$1 = (options) => {
  const effect2 = new EffectPrimitive(OP_YIELD$1);
  return typeof options?.priority !== "undefined" ? withSchedulingPriority(effect2, options.priority) : effect2;
};
const zip$5 = /* @__PURE__ */ dual(2, (self, that) => flatMap$5(self, (a) => map$a(that, (b) => [a, b])));
const zipLeft$3 = /* @__PURE__ */ dual(2, (self, that) => flatMap$5(self, (a) => as$1(that, a)));
const zipRight$5 = /* @__PURE__ */ dual(2, (self, that) => flatMap$5(self, () => that));
const zipWith$2 = /* @__PURE__ */ dual(3, (self, that, f) => flatMap$5(self, (a) => map$a(that, (b) => f(a, b))));
const interruptFiber = (self) => flatMap$5(fiberId, (fiberId2) => pipe(self, interruptAsFiber(fiberId2)));
const interruptAsFiber = /* @__PURE__ */ dual(2, (self, fiberId2) => flatMap$5(self.interruptAsFork(fiberId2), () => self.await));
const logLevelAll = {
  _tag: "All",
  syslog: 0,
  label: "ALL",
  ordinal: Number.MIN_SAFE_INTEGER,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const logLevelFatal = {
  _tag: "Fatal",
  syslog: 2,
  label: "FATAL",
  ordinal: 5e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const logLevelError = {
  _tag: "Error",
  syslog: 3,
  label: "ERROR",
  ordinal: 4e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const logLevelWarning = {
  _tag: "Warning",
  syslog: 4,
  label: "WARN",
  ordinal: 3e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const logLevelInfo = {
  _tag: "Info",
  syslog: 6,
  label: "INFO",
  ordinal: 2e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const logLevelDebug = {
  _tag: "Debug",
  syslog: 7,
  label: "DEBUG",
  ordinal: 1e4,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const logLevelTrace = {
  _tag: "Trace",
  syslog: 7,
  label: "TRACE",
  ordinal: 0,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const logLevelNone = {
  _tag: "None",
  syslog: 7,
  label: "OFF",
  ordinal: Number.MAX_SAFE_INTEGER,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const allLogLevels = [logLevelAll, logLevelTrace, logLevelDebug, logLevelInfo, logLevelWarning, logLevelError, logLevelFatal, logLevelNone];
const FiberRefSymbolKey = "effect/FiberRef";
const FiberRefTypeId = /* @__PURE__ */ Symbol.for(FiberRefSymbolKey);
const fiberRefVariance = {
  /* c8 ignore next */
  _A: (_) => _
};
const fiberRefGet = (self) => withFiberRuntime$1((fiber) => exitSucceed(fiber.getFiberRef(self)));
const fiberRefGetWith = /* @__PURE__ */ dual(2, (self, f) => flatMap$5(fiberRefGet(self), f));
const fiberRefSet = /* @__PURE__ */ dual(2, (self, value2) => fiberRefModify(self, () => [void 0, value2]));
const fiberRefModify = /* @__PURE__ */ dual(2, (self, f) => withFiberRuntime$1((state) => {
  const [b, a] = f(state.getFiberRef(self));
  state.setFiberRef(self, a);
  return succeed$b(b);
}));
const fiberRefUpdate = /* @__PURE__ */ dual(2, (self, f) => fiberRefModify(self, (v) => [void 0, f(v)]));
const fiberRefLocally = /* @__PURE__ */ dual(3, (use, self, value2) => acquireUseRelease$1(zipLeft$3(fiberRefGet(self), fiberRefSet(self, value2)), () => use, (oldValue) => fiberRefSet(self, oldValue)));
const fiberRefLocallyWith = /* @__PURE__ */ dual(3, (use, self, f) => fiberRefGetWith(self, (a) => fiberRefLocally(use, self, f(a))));
const fiberRefUnsafeMake = (initial, options) => fiberRefUnsafeMakePatch(initial, {
  differ: update$4(),
  fork: options?.fork ?? identity,
  join: options?.join
});
const fiberRefUnsafeMakeHashSet = (initial) => {
  const differ2 = hashSet();
  return fiberRefUnsafeMakePatch(initial, {
    differ: differ2,
    fork: differ2.empty
  });
};
const fiberRefUnsafeMakeReadonlyArray = (initial) => {
  const differ2 = readonlyArray(update$4());
  return fiberRefUnsafeMakePatch(initial, {
    differ: differ2,
    fork: differ2.empty
  });
};
const fiberRefUnsafeMakeContext = (initial) => {
  const differ2 = environment();
  return fiberRefUnsafeMakePatch(initial, {
    differ: differ2,
    fork: differ2.empty
  });
};
const fiberRefUnsafeMakePatch = (initial, options) => {
  const _fiberRef = {
    ...CommitPrototype$1,
    [FiberRefTypeId]: fiberRefVariance,
    initial,
    commit() {
      return fiberRefGet(this);
    },
    diff: (oldValue, newValue) => options.differ.diff(oldValue, newValue),
    combine: (first, second) => options.differ.combine(first, second),
    patch: (patch2) => (oldValue) => options.differ.patch(patch2, oldValue),
    fork: options.fork,
    join: options.join ?? ((_, n) => n)
  };
  return _fiberRef;
};
const fiberRefUnsafeMakeRuntimeFlags = (initial) => fiberRefUnsafeMakePatch(initial, {
  differ: differ$1,
  fork: differ$1.empty
});
const currentContext$1 = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentContext"), () => fiberRefUnsafeMakeContext(empty$l()));
const currentSchedulingPriority = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentSchedulingPriority"), () => fiberRefUnsafeMake(0));
const currentMaxOpsBeforeYield = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentMaxOpsBeforeYield"), () => fiberRefUnsafeMake(2048));
const currentLogAnnotations = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentLogAnnotation"), () => fiberRefUnsafeMake(empty$f()));
const currentLogLevel = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentLogLevel"), () => fiberRefUnsafeMake(logLevelInfo));
const currentLogSpan = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentLogSpan"), () => fiberRefUnsafeMake(empty$e()));
const withSchedulingPriority = /* @__PURE__ */ dual(2, (self, scheduler) => fiberRefLocally(self, currentSchedulingPriority, scheduler));
const currentConcurrency = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentConcurrency"), () => fiberRefUnsafeMake("unbounded"));
const currentRequestBatching = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentRequestBatching"), () => fiberRefUnsafeMake(true));
const currentUnhandledErrorLogLevel = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentUnhandledErrorLogLevel"), () => fiberRefUnsafeMake(some(logLevelDebug)));
const currentVersionMismatchErrorLogLevel = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/versionMismatchErrorLogLevel"), () => fiberRefUnsafeMake(some(logLevelWarning)));
const currentMetricLabels = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentMetricLabels"), () => fiberRefUnsafeMakeReadonlyArray(empty$n()));
const currentForkScopeOverride = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentForkScopeOverride"), () => fiberRefUnsafeMake(none$6(), {
  fork: () => none$6(),
  join: (parent, _) => parent
}));
const currentInterruptedCause = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentInterruptedCause"), () => fiberRefUnsafeMake(empty$g, {
  fork: () => empty$g,
  join: (parent, _) => parent
}));
const currentTracerEnabled$1 = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentTracerEnabled"), () => fiberRefUnsafeMake(true));
const currentTracerTimingEnabled = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentTracerTiming"), () => fiberRefUnsafeMake(true));
const currentTracerSpanAnnotations = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentTracerSpanAnnotations"), () => fiberRefUnsafeMake(empty$f()));
const currentTracerSpanLinks = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentTracerSpanLinks"), () => fiberRefUnsafeMake(empty$k()));
const ScopeTypeId = /* @__PURE__ */ Symbol.for("effect/Scope");
const CloseableScopeTypeId = /* @__PURE__ */ Symbol.for("effect/CloseableScope");
const scopeAddFinalizer = (self, finalizer) => self.addFinalizer(() => asVoid$1(finalizer));
const scopeAddFinalizerExit = (self, finalizer) => self.addFinalizer(finalizer);
const scopeClose = (self, exit2) => self.close(exit2);
const scopeFork = (self, strategy) => self.fork(strategy);
const causeSquash = (self) => {
  return causeSquashWith(identity)(self);
};
const causeSquashWith = /* @__PURE__ */ dual(2, (self, f) => {
  const option = pipe(self, failureOption, map$i(f));
  switch (option._tag) {
    case "None": {
      return pipe(defects(self), head, match$9({
        onNone: () => {
          const interrupts = fromIterable$6(interruptors$1(self)).flatMap((fiberId2) => fromIterable$6(ids(fiberId2)).map((id) => `#${id}`));
          return new InterruptedException(interrupts ? `Interrupted by fibers: ${interrupts.join(", ")}` : void 0);
        },
        onSome: identity
      }));
    }
    case "Some": {
      return option.value;
    }
  }
});
const YieldableError = /* @__PURE__ */ (function() {
  class YieldableError2 extends globalThis.Error {
    commit() {
      return fail$8(this);
    }
    toJSON() {
      const obj = {
        ...this
      };
      if (this.message) obj.message = this.message;
      if (this.cause) obj.cause = this.cause;
      return obj;
    }
    [NodeInspectSymbol]() {
      if (this.toString !== globalThis.Error.prototype.toString) {
        return this.stack ? `${this.toString()}
${this.stack.split("\n").slice(1).join("\n")}` : this.toString();
      } else if ("Bun" in globalThis) {
        return pretty$2(fail$9(this), {
          renderErrorCause: true
        });
      }
      return this;
    }
  }
  Object.assign(YieldableError2.prototype, StructuralCommitPrototype);
  return YieldableError2;
})();
const makeException = (proto2, tag) => {
  class Base2 extends YieldableError {
    _tag = tag;
  }
  Object.assign(Base2.prototype, proto2);
  Base2.prototype.name = tag;
  return Base2;
};
const RuntimeExceptionTypeId = /* @__PURE__ */ Symbol.for("effect/Cause/errors/RuntimeException");
const RuntimeException = /* @__PURE__ */ makeException({
  [RuntimeExceptionTypeId]: RuntimeExceptionTypeId
}, "RuntimeException");
const InterruptedExceptionTypeId = /* @__PURE__ */ Symbol.for("effect/Cause/errors/InterruptedException");
const InterruptedException = /* @__PURE__ */ makeException({
  [InterruptedExceptionTypeId]: InterruptedExceptionTypeId
}, "InterruptedException");
const isInterruptedException = (u) => hasProperty(u, InterruptedExceptionTypeId);
const NoSuchElementExceptionTypeId = /* @__PURE__ */ Symbol.for("effect/Cause/errors/NoSuchElement");
const NoSuchElementException = /* @__PURE__ */ makeException({
  [NoSuchElementExceptionTypeId]: NoSuchElementExceptionTypeId
}, "NoSuchElementException");
const UnknownExceptionTypeId = /* @__PURE__ */ Symbol.for("effect/Cause/errors/UnknownException");
const UnknownException = /* @__PURE__ */ (function() {
  class UnknownException2 extends YieldableError {
    _tag = "UnknownException";
    error;
    constructor(cause, message) {
      super(message ?? "An unknown error occurred", {
        cause
      });
      this.error = cause;
    }
  }
  Object.assign(UnknownException2.prototype, {
    [UnknownExceptionTypeId]: UnknownExceptionTypeId,
    name: "UnknownException"
  });
  return UnknownException2;
})();
const exitIsExit = (u) => isEffect$1(u) && "_tag" in u && (u._tag === "Success" || u._tag === "Failure");
const exitIsFailure = (self) => self._tag === "Failure";
const exitIsSuccess = (self) => self._tag === "Success";
const exitIsInterrupted = (self) => {
  switch (self._tag) {
    case OP_FAILURE:
      return isInterrupted$2(self.effect_instruction_i0);
    case OP_SUCCESS:
      return false;
  }
};
const exitAs = /* @__PURE__ */ dual(2, (self, value2) => {
  switch (self._tag) {
    case OP_FAILURE: {
      return exitFailCause(self.effect_instruction_i0);
    }
    case OP_SUCCESS: {
      return exitSucceed(value2);
    }
  }
});
const exitAsVoid = (self) => exitAs(self, void 0);
const exitCollectAll = (exits, options) => exitCollectAllInternal(exits, options?.parallel ? parallel$2 : sequential$2);
const exitDie = (defect) => exitFailCause(die$4(defect));
const exitFail = (error) => exitFailCause(fail$9(error));
const exitFailCause = (cause) => {
  const effect2 = new EffectPrimitiveFailure(OP_FAILURE);
  effect2.effect_instruction_i0 = cause;
  return effect2;
};
const exitFlatMap = /* @__PURE__ */ dual(2, (self, f) => {
  switch (self._tag) {
    case OP_FAILURE: {
      return exitFailCause(self.effect_instruction_i0);
    }
    case OP_SUCCESS: {
      return f(self.effect_instruction_i0);
    }
  }
});
const exitFlatten = (self) => pipe(self, exitFlatMap(identity));
const exitInterrupt = (fiberId2) => exitFailCause(interrupt$4(fiberId2));
const exitMap = /* @__PURE__ */ dual(2, (self, f) => {
  switch (self._tag) {
    case OP_FAILURE:
      return exitFailCause(self.effect_instruction_i0);
    case OP_SUCCESS:
      return exitSucceed(f(self.effect_instruction_i0));
  }
});
const exitMatch = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => {
  switch (self._tag) {
    case OP_FAILURE:
      return onFailure(self.effect_instruction_i0);
    case OP_SUCCESS:
      return onSuccess(self.effect_instruction_i0);
  }
});
const exitMatchEffect = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => {
  switch (self._tag) {
    case OP_FAILURE:
      return onFailure(self.effect_instruction_i0);
    case OP_SUCCESS:
      return onSuccess(self.effect_instruction_i0);
  }
});
const exitSucceed = (value2) => {
  const effect2 = new EffectPrimitiveSuccess(OP_SUCCESS);
  effect2.effect_instruction_i0 = value2;
  return effect2;
};
const exitVoid = /* @__PURE__ */ exitSucceed(void 0);
const exitZip = /* @__PURE__ */ dual(2, (self, that) => exitZipWith(self, that, {
  onSuccess: (a, a2) => [a, a2],
  onFailure: sequential$2
}));
const exitZipRight = /* @__PURE__ */ dual(2, (self, that) => exitZipWith(self, that, {
  onSuccess: (_, a2) => a2,
  onFailure: sequential$2
}));
const exitZipWith = /* @__PURE__ */ dual(3, (self, that, {
  onFailure,
  onSuccess
}) => {
  switch (self._tag) {
    case OP_FAILURE: {
      switch (that._tag) {
        case OP_SUCCESS:
          return exitFailCause(self.effect_instruction_i0);
        case OP_FAILURE: {
          return exitFailCause(onFailure(self.effect_instruction_i0, that.effect_instruction_i0));
        }
      }
    }
    case OP_SUCCESS: {
      switch (that._tag) {
        case OP_SUCCESS:
          return exitSucceed(onSuccess(self.effect_instruction_i0, that.effect_instruction_i0));
        case OP_FAILURE:
          return exitFailCause(that.effect_instruction_i0);
      }
    }
  }
});
const exitCollectAllInternal = (exits, combineCauses) => {
  const list = fromIterable$5(exits);
  if (!isNonEmpty$3(list)) {
    return none$6();
  }
  return pipe(tailNonEmpty(list), reduce$7(pipe(headNonEmpty(list), exitMap(of$1)), (accumulator, current) => pipe(accumulator, exitZipWith(current, {
    onSuccess: (list2, value2) => pipe(list2, prepend$1(value2)),
    onFailure: combineCauses
  }))), exitMap(reverse$1), exitMap((chunk) => toReadonlyArray(chunk)), some);
};
const deferredUnsafeMake = (fiberId2) => {
  const _deferred = {
    ...CommitPrototype$1,
    [DeferredTypeId]: deferredVariance,
    state: make$t(pending([])),
    commit() {
      return deferredAwait(this);
    },
    blockingOn: fiberId2
  };
  return _deferred;
};
const deferredMake = () => flatMap$5(fiberId, (id) => deferredMakeAs(id));
const deferredMakeAs = (fiberId2) => sync$4(() => deferredUnsafeMake(fiberId2));
const deferredAwait = (self) => asyncInterrupt((resume2) => {
  const state = get$6(self.state);
  switch (state._tag) {
    case OP_STATE_DONE$1: {
      return resume2(state.effect);
    }
    case OP_STATE_PENDING: {
      state.joiners.push(resume2);
      return deferredInterruptJoiner(self, resume2);
    }
  }
}, self.blockingOn);
const deferredCompleteWith = /* @__PURE__ */ dual(2, (self, effect2) => sync$4(() => {
  const state = get$6(self.state);
  switch (state._tag) {
    case OP_STATE_DONE$1: {
      return false;
    }
    case OP_STATE_PENDING: {
      set$3(self.state, done$4(effect2));
      for (let i = 0, len = state.joiners.length; i < len; i++) {
        state.joiners[i](effect2);
      }
      return true;
    }
  }
}));
const deferredDone = /* @__PURE__ */ dual(2, (self, exit2) => deferredCompleteWith(self, exit2));
const deferredFailCause = /* @__PURE__ */ dual(2, (self, cause) => deferredCompleteWith(self, failCause$5(cause)));
const deferredInterruptWith = /* @__PURE__ */ dual(2, (self, fiberId2) => deferredCompleteWith(self, interruptWith(fiberId2)));
const deferredIsDone = (self) => sync$4(() => get$6(self.state)._tag === OP_STATE_DONE$1);
const deferredSucceed = /* @__PURE__ */ dual(2, (self, value2) => deferredCompleteWith(self, succeed$b(value2)));
const deferredUnsafeDone = (self, effect2) => {
  const state = get$6(self.state);
  if (state._tag === OP_STATE_PENDING) {
    set$3(self.state, done$4(effect2));
    for (let i = 0, len = state.joiners.length; i < len; i++) {
      state.joiners[i](effect2);
    }
  }
};
const deferredInterruptJoiner = (self, joiner) => sync$4(() => {
  const state = get$6(self.state);
  if (state._tag === OP_STATE_PENDING) {
    const index = state.joiners.indexOf(joiner);
    if (index >= 0) {
      state.joiners.splice(index, 1);
    }
  }
});
const constContext = /* @__PURE__ */ withFiberRuntime$1((fiber) => exitSucceed(fiber.currentContext));
const context$2 = () => constContext;
const contextWithEffect = (f) => flatMap$5(context$2(), f);
const provideContext = /* @__PURE__ */ dual(2, (self, context2) => fiberRefLocally(currentContext$1, context2)(self));
const provideSomeContext = /* @__PURE__ */ dual(2, (self, context2) => fiberRefLocallyWith(currentContext$1, (parent) => merge$2(parent, context2))(self));
const mapInputContext$1 = /* @__PURE__ */ dual(2, (self, f) => contextWithEffect((context2) => provideContext(self, f(context2))));
const currentSpanFromFiber = (fiber) => {
  const span2 = fiber.currentSpan;
  return span2 !== void 0 && span2._tag === "Span" ? some(span2) : none$6();
};
const NoopSpanProto = {
  _tag: "Span",
  spanId: "noop",
  traceId: "noop",
  sampled: false,
  status: {
    _tag: "Ended",
    startTime: /* @__PURE__ */ BigInt(0),
    endTime: /* @__PURE__ */ BigInt(0),
    exit: exitVoid
  },
  attributes: /* @__PURE__ */ new Map(),
  links: [],
  kind: "internal",
  attribute() {
  },
  event() {
  },
  end() {
  },
  addLinks() {
  }
};
const noopSpan = (options) => Object.assign(Object.create(NoopSpanProto), options);
const empty$9 = empty$g;
const fail$7 = fail$9;
const die$2 = die$4;
const interrupt$2 = interrupt$4;
const isFailType = isFailType$1;
const isDieType = isDieType$1;
const isInterrupted$1 = isInterrupted$2;
const interruptors = interruptors$1;
const failureOrCause = failureOrCause$1;
const map$9 = map$c;
const squash = causeSquash;
const pretty$1 = pretty$2;
const OP_AND = "And";
const OP_OR = "Or";
const OP_INVALID_DATA = "InvalidData";
const OP_MISSING_DATA = "MissingData";
const OP_SOURCE_UNAVAILABLE = "SourceUnavailable";
const OP_UNSUPPORTED = "Unsupported";
const ConfigErrorSymbolKey = "effect/ConfigError";
const ConfigErrorTypeId = /* @__PURE__ */ Symbol.for(ConfigErrorSymbolKey);
const proto$a = {
  _tag: "ConfigError",
  [ConfigErrorTypeId]: ConfigErrorTypeId
};
const And = (self, that) => {
  const error = Object.create(proto$a);
  error._op = OP_AND;
  error.left = self;
  error.right = that;
  Object.defineProperty(error, "toString", {
    enumerable: false,
    value() {
      return `${this.left} and ${this.right}`;
    }
  });
  Object.defineProperty(error, "message", {
    enumerable: false,
    get() {
      return this.toString();
    }
  });
  return error;
};
const Or = (self, that) => {
  const error = Object.create(proto$a);
  error._op = OP_OR;
  error.left = self;
  error.right = that;
  Object.defineProperty(error, "toString", {
    enumerable: false,
    value() {
      return `${this.left} or ${this.right}`;
    }
  });
  Object.defineProperty(error, "message", {
    enumerable: false,
    get() {
      return this.toString();
    }
  });
  return error;
};
const InvalidData$1 = (path, message, options = {
  pathDelim: "."
}) => {
  const error = Object.create(proto$a);
  error._op = OP_INVALID_DATA;
  error.path = path;
  error.message = message;
  Object.defineProperty(error, "toString", {
    enumerable: false,
    value() {
      const path2 = pipe(this.path, join$2(options.pathDelim));
      return `(Invalid data at ${path2}: "${this.message}")`;
    }
  });
  return error;
};
const MissingData = (path, message, options = {
  pathDelim: "."
}) => {
  const error = Object.create(proto$a);
  error._op = OP_MISSING_DATA;
  error.path = path;
  error.message = message;
  Object.defineProperty(error, "toString", {
    enumerable: false,
    value() {
      const path2 = pipe(this.path, join$2(options.pathDelim));
      return `(Missing data at ${path2}: "${this.message}")`;
    }
  });
  return error;
};
const SourceUnavailable = (path, message, cause, options = {
  pathDelim: "."
}) => {
  const error = Object.create(proto$a);
  error._op = OP_SOURCE_UNAVAILABLE;
  error.path = path;
  error.message = message;
  error.cause = cause;
  Object.defineProperty(error, "toString", {
    enumerable: false,
    value() {
      const path2 = pipe(this.path, join$2(options.pathDelim));
      return `(Source unavailable at ${path2}: "${this.message}")`;
    }
  });
  return error;
};
const Unsupported = (path, message, options = {
  pathDelim: "."
}) => {
  const error = Object.create(proto$a);
  error._op = OP_UNSUPPORTED;
  error.path = path;
  error.message = message;
  Object.defineProperty(error, "toString", {
    enumerable: false,
    value() {
      const path2 = pipe(this.path, join$2(options.pathDelim));
      return `(Unsupported operation at ${path2}: "${this.message}")`;
    }
  });
  return error;
};
const prefixed = /* @__PURE__ */ dual(2, (self, prefix) => {
  switch (self._op) {
    case OP_AND: {
      return And(prefixed(self.left, prefix), prefixed(self.right, prefix));
    }
    case OP_OR: {
      return Or(prefixed(self.left, prefix), prefixed(self.right, prefix));
    }
    case OP_INVALID_DATA: {
      return InvalidData$1([...prefix, ...self.path], self.message);
    }
    case OP_MISSING_DATA: {
      return MissingData([...prefix, ...self.path], self.message);
    }
    case OP_SOURCE_UNAVAILABLE: {
      return SourceUnavailable([...prefix, ...self.path], self.message, self.cause);
    }
    case OP_UNSUPPORTED: {
      return Unsupported([...prefix, ...self.path], self.message);
    }
  }
});
const IsMissingDataOnlyReducer = {
  andCase: (_, left2, right2) => left2 && right2,
  orCase: (_, left2, right2) => left2 && right2,
  invalidDataCase: constFalse,
  missingDataCase: constTrue,
  sourceUnavailableCase: constFalse,
  unsupportedCase: constFalse
};
const reduceWithContext = /* @__PURE__ */ dual(3, (self, context2, reducer) => {
  const input = [self];
  const output = [];
  while (input.length > 0) {
    const error = input.pop();
    switch (error._op) {
      case OP_AND: {
        input.push(error.right);
        input.push(error.left);
        output.push(left({
          _op: "AndCase"
        }));
        break;
      }
      case OP_OR: {
        input.push(error.right);
        input.push(error.left);
        output.push(left({
          _op: "OrCase"
        }));
        break;
      }
      case OP_INVALID_DATA: {
        output.push(right(reducer.invalidDataCase(context2, error.path, error.message)));
        break;
      }
      case OP_MISSING_DATA: {
        output.push(right(reducer.missingDataCase(context2, error.path, error.message)));
        break;
      }
      case OP_SOURCE_UNAVAILABLE: {
        output.push(right(reducer.sourceUnavailableCase(context2, error.path, error.message, error.cause)));
        break;
      }
      case OP_UNSUPPORTED: {
        output.push(right(reducer.unsupportedCase(context2, error.path, error.message)));
        break;
      }
    }
  }
  const accumulator = [];
  while (output.length > 0) {
    const either2 = output.pop();
    switch (either2._op) {
      case "Left": {
        switch (either2.left._op) {
          case "AndCase": {
            const left2 = accumulator.pop();
            const right2 = accumulator.pop();
            const value2 = reducer.andCase(context2, left2, right2);
            accumulator.push(value2);
            break;
          }
          case "OrCase": {
            const left2 = accumulator.pop();
            const right2 = accumulator.pop();
            const value2 = reducer.orCase(context2, left2, right2);
            accumulator.push(value2);
            break;
          }
        }
        break;
      }
      case "Right": {
        accumulator.push(either2.right);
        break;
      }
    }
  }
  if (accumulator.length === 0) {
    throw new Error("BUG: ConfigError.reduceWithContext - please report an issue at https://github.com/Effect-TS/effect/issues");
  }
  return accumulator.pop();
});
const isMissingDataOnly$1 = (self) => reduceWithContext(self, void 0, IsMissingDataOnlyReducer);
const InvalidData = InvalidData$1;
const isMissingDataOnly = isMissingDataOnly$1;
const ClockSymbolKey = "effect/Clock";
const ClockTypeId = /* @__PURE__ */ Symbol.for(ClockSymbolKey);
const clockTag = /* @__PURE__ */ GenericTag("effect/Clock");
const MAX_TIMER_MILLIS = 2 ** 31 - 1;
const globalClockScheduler = {
  unsafeSchedule(task, duration) {
    const millis2 = toMillis(duration);
    if (millis2 > MAX_TIMER_MILLIS) {
      return constFalse;
    }
    let completed = false;
    const handle = setTimeout(() => {
      completed = true;
      task();
    }, millis2);
    return () => {
      clearTimeout(handle);
      return !completed;
    };
  }
};
const performanceNowNanos = /* @__PURE__ */ (function() {
  const bigint1e62 = /* @__PURE__ */ BigInt(1e6);
  if (typeof performance === "undefined") {
    return () => BigInt(Date.now()) * bigint1e62;
  }
  let origin;
  return () => {
    if (origin === void 0) {
      origin = BigInt(Date.now()) * bigint1e62 - BigInt(Math.round(performance.now() * 1e6));
    }
    return origin + BigInt(Math.round(performance.now() * 1e6));
  };
})();
const processOrPerformanceNow = /* @__PURE__ */ (function() {
  const processHrtime = typeof process === "object" && "hrtime" in process && typeof process.hrtime.bigint === "function" ? process.hrtime : void 0;
  if (!processHrtime) {
    return performanceNowNanos;
  }
  const origin = /* @__PURE__ */ performanceNowNanos() - /* @__PURE__ */ processHrtime.bigint();
  return () => origin + processHrtime.bigint();
})();
class ClockImpl {
  [ClockTypeId] = ClockTypeId;
  unsafeCurrentTimeMillis() {
    return Date.now();
  }
  unsafeCurrentTimeNanos() {
    return processOrPerformanceNow();
  }
  currentTimeMillis = /* @__PURE__ */ sync$4(() => this.unsafeCurrentTimeMillis());
  currentTimeNanos = /* @__PURE__ */ sync$4(() => this.unsafeCurrentTimeNanos());
  scheduler() {
    return succeed$b(globalClockScheduler);
  }
  sleep(duration) {
    return async_((resume2) => {
      const canceler = globalClockScheduler.unsafeSchedule(() => resume2(void_$2), duration);
      return asVoid$1(sync$4(canceler));
    });
  }
}
const make$p = () => new ClockImpl();
const Order$1 = number;
const escape = (string2) => string2.replace(/[/\\^$*+?.()|[\]{}]/g, "\\$&");
const empty$8 = {
  _tag: "Empty"
};
const andThen$1 = /* @__PURE__ */ dual(2, (self, that) => ({
  _tag: "AndThen",
  first: self,
  second: that
}));
const mapName = /* @__PURE__ */ dual(2, (self, f) => andThen$1(self, {
  _tag: "MapName",
  f
}));
const nested$4 = /* @__PURE__ */ dual(2, (self, name) => andThen$1(self, {
  _tag: "Nested",
  name
}));
const patch$3 = /* @__PURE__ */ dual(2, (path, patch2) => {
  let input = of(patch2);
  let output = path;
  while (isCons(input)) {
    const patch3 = input.head;
    switch (patch3._tag) {
      case "Empty": {
        input = input.tail;
        break;
      }
      case "AndThen": {
        input = cons(patch3.first, cons(patch3.second, input.tail));
        break;
      }
      case "MapName": {
        output = map$g(output, patch3.f);
        input = input.tail;
        break;
      }
      case "Nested": {
        output = prepend$2(output, patch3.name);
        input = input.tail;
        break;
      }
      case "Unnested": {
        const containsName = pipe(head$1(output), contains(patch3.name));
        if (containsName) {
          output = tailNonEmpty$1(output);
          input = input.tail;
        } else {
          return left(MissingData(output, `Expected ${patch3.name} to be in path in ConfigProvider#unnested`));
        }
        break;
      }
    }
  }
  return right(output);
});
const OP_CONSTANT = "Constant";
const OP_FAIL$1 = "Fail";
const OP_FALLBACK = "Fallback";
const OP_DESCRIBED = "Described";
const OP_LAZY = "Lazy";
const OP_MAP_OR_FAIL = "MapOrFail";
const OP_NESTED = "Nested";
const OP_PRIMITIVE = "Primitive";
const OP_SEQUENCE = "Sequence";
const OP_HASHMAP = "HashMap";
const OP_ZIP_WITH$1 = "ZipWith";
const lowerCase = (str) => str.toLowerCase();
const upperCase = (str) => str.toUpperCase();
const replace$1 = (input, re, value2) => re instanceof RegExp ? input.replace(re, value2) : re.reduce((input2, re2) => input2.replace(re2, value2), input);
const DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
const DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
const noCase = (input, options = {}) => {
  const {
    delimiter = " ",
    splitRegexp = DEFAULT_SPLIT_REGEXP,
    stripRegexp = DEFAULT_STRIP_REGEXP,
    transform: transform2 = lowerCase
  } = options;
  const result = replace$1(replace$1(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
  let start2 = 0;
  let end2 = result.length;
  while (result.charAt(start2) === "\0") {
    start2++;
  }
  while (result.charAt(end2 - 1) === "\0") {
    end2--;
  }
  return result.slice(start2, end2).split("\0").map(transform2).join(delimiter);
};
const constantCase$2 = (input, options) => noCase(input, {
  delimiter: "_",
  transform: upperCase,
  ...options
});
const concat = (l, r) => [...l, ...r];
const ConfigProviderSymbolKey = "effect/ConfigProvider";
const ConfigProviderTypeId = /* @__PURE__ */ Symbol.for(ConfigProviderSymbolKey);
const configProviderTag = /* @__PURE__ */ GenericTag("effect/ConfigProvider");
const FlatConfigProviderSymbolKey = "effect/ConfigProviderFlat";
const FlatConfigProviderTypeId = /* @__PURE__ */ Symbol.for(FlatConfigProviderSymbolKey);
const make$o = (options) => ({
  [ConfigProviderTypeId]: ConfigProviderTypeId,
  pipe() {
    return pipeArguments(this, arguments);
  },
  ...options
});
const makeFlat = (options) => ({
  [FlatConfigProviderTypeId]: FlatConfigProviderTypeId,
  patch: options.patch,
  load: (path, config2, split = true) => options.load(path, config2, split),
  enumerateChildren: options.enumerateChildren
});
const fromFlat = (flat) => make$o({
  load: (config2) => flatMap$5(fromFlatLoop(flat, empty$n(), config2, false), (chunk) => match$9(head$1(chunk), {
    onNone: () => fail$8(MissingData(empty$n(), `Expected a single value having structure: ${config2}`)),
    onSome: succeed$b
  })),
  flattened: flat
});
const fromEnv$1 = (options) => {
  const {
    pathDelim,
    seqDelim
  } = Object.assign({}, {
    pathDelim: "_",
    seqDelim: ","
  }, options);
  const makePathString = (path) => pipe(path, join$2(pathDelim));
  const unmakePathString = (pathString) => pathString.split(pathDelim);
  const getEnv = () => typeof process !== "undefined" && "env" in process && typeof process.env === "object" ? process.env : {};
  const load = (path, primitive2, split = true) => {
    const pathString = makePathString(path);
    const current = getEnv();
    const valueOpt = pathString in current ? some(current[pathString]) : none$6();
    return pipe(valueOpt, mapError$2(() => MissingData(path, `Expected ${pathString} to exist in the process context`)), flatMap$5((value2) => parsePrimitive(value2, path, primitive2, seqDelim, split)));
  };
  const enumerateChildren = (path) => sync$4(() => {
    const current = getEnv();
    const keys2 = Object.keys(current);
    const keyPaths = keys2.map((value2) => unmakePathString(value2.toUpperCase()));
    const filteredKeyPaths = keyPaths.filter((keyPath) => {
      for (let i = 0; i < path.length; i++) {
        const pathComponent = pipe(path, unsafeGet$3(i));
        const currentElement = keyPath[i];
        if (currentElement === void 0 || pathComponent !== currentElement) {
          return false;
        }
      }
      return true;
    }).flatMap((keyPath) => keyPath.slice(path.length, path.length + 1));
    return fromIterable$2(filteredKeyPaths);
  });
  return fromFlat(makeFlat({
    load,
    enumerateChildren,
    patch: empty$8
  }));
};
const fromMap$1 = (map2, config2) => {
  const {
    pathDelim,
    seqDelim
  } = Object.assign({
    seqDelim: ",",
    pathDelim: "."
  }, config2);
  const makePathString = (path) => pipe(path, join$2(pathDelim));
  const unmakePathString = (pathString) => pathString.split(pathDelim);
  const mapWithIndexSplit = splitIndexInKeys(map2, (str) => unmakePathString(str), makePathString);
  const load = (path, primitive2, split = true) => {
    const pathString = makePathString(path);
    const valueOpt = mapWithIndexSplit.has(pathString) ? some(mapWithIndexSplit.get(pathString)) : none$6();
    return pipe(valueOpt, mapError$2(() => MissingData(path, `Expected ${pathString} to exist in the provided map`)), flatMap$5((value2) => parsePrimitive(value2, path, primitive2, seqDelim, split)));
  };
  const enumerateChildren = (path) => sync$4(() => {
    const keyPaths = fromIterable$6(mapWithIndexSplit.keys()).map(unmakePathString);
    const filteredKeyPaths = keyPaths.filter((keyPath) => {
      for (let i = 0; i < path.length; i++) {
        const pathComponent = pipe(path, unsafeGet$3(i));
        const currentElement = keyPath[i];
        if (currentElement === void 0 || pathComponent !== currentElement) {
          return false;
        }
      }
      return true;
    }).flatMap((keyPath) => keyPath.slice(path.length, path.length + 1));
    return fromIterable$2(filteredKeyPaths);
  });
  return fromFlat(makeFlat({
    load,
    enumerateChildren,
    patch: empty$8
  }));
};
const extend$2 = (leftDef, rightDef, left2, right2) => {
  const leftPad = unfold$1(left2.length, (index) => index >= right2.length ? none$6() : some([leftDef(index), index + 1]));
  const rightPad = unfold$1(right2.length, (index) => index >= left2.length ? none$6() : some([rightDef(index), index + 1]));
  const leftExtension = concat(left2, leftPad);
  const rightExtension = concat(right2, rightPad);
  return [leftExtension, rightExtension];
};
const appendConfigPath = (path, config2) => {
  let op = config2;
  if (op._tag === "Nested") {
    const out = path.slice();
    while (op._tag === "Nested") {
      out.push(op.name);
      op = op.config;
    }
    return out;
  }
  return path;
};
const fromFlatLoop = (flat, prefix, config2, split) => {
  const op = config2;
  switch (op._tag) {
    case OP_CONSTANT: {
      return succeed$b(of$2(op.value));
    }
    case OP_DESCRIBED: {
      return suspend$6(() => fromFlatLoop(flat, prefix, op.config, split));
    }
    case OP_FAIL$1: {
      return fail$8(MissingData(prefix, op.message));
    }
    case OP_FALLBACK: {
      return pipe(suspend$6(() => fromFlatLoop(flat, prefix, op.first, split)), catchAll$1((error1) => {
        if (op.condition(error1)) {
          return pipe(fromFlatLoop(flat, prefix, op.second, split), catchAll$1((error2) => fail$8(Or(error1, error2))));
        }
        return fail$8(error1);
      }));
    }
    case OP_LAZY: {
      return suspend$6(() => fromFlatLoop(flat, prefix, op.config(), split));
    }
    case OP_MAP_OR_FAIL: {
      return suspend$6(() => pipe(fromFlatLoop(flat, prefix, op.original, split), flatMap$5(forEachSequential((a) => pipe(op.mapOrFail(a), mapError$2(prefixed(appendConfigPath(prefix, op.original))))))));
    }
    case OP_NESTED: {
      return suspend$6(() => fromFlatLoop(flat, concat(prefix, of$2(op.name)), op.config, split));
    }
    case OP_PRIMITIVE: {
      return pipe(patch$3(prefix, flat.patch), flatMap$5((prefix2) => pipe(flat.load(prefix2, op, split), flatMap$5((values) => {
        if (values.length === 0) {
          const name = pipe(last(prefix2), getOrElse(() => "<n/a>"));
          return fail$8(MissingData([], `Expected ${op.description} with name ${name}`));
        }
        return succeed$b(values);
      }))));
    }
    case OP_SEQUENCE: {
      return pipe(patch$3(prefix, flat.patch), flatMap$5((patchedPrefix) => pipe(flat.enumerateChildren(patchedPrefix), flatMap$5(indicesFrom), flatMap$5((indices) => {
        if (indices.length === 0) {
          return suspend$6(() => map$a(fromFlatLoop(flat, prefix, op.config, true), of$2));
        }
        return pipe(forEachSequential(indices, (index) => fromFlatLoop(flat, append$2(prefix, `[${index}]`), op.config, true)), map$a((chunkChunk) => {
          const flattened = flatten$7(chunkChunk);
          if (flattened.length === 0) {
            return of$2(empty$n());
          }
          return of$2(flattened);
        }));
      }))));
    }
    case OP_HASHMAP: {
      return suspend$6(() => pipe(patch$3(prefix, flat.patch), flatMap$5((prefix2) => pipe(flat.enumerateChildren(prefix2), flatMap$5((keys2) => {
        return pipe(keys2, forEachSequential((key) => fromFlatLoop(flat, concat(prefix2, of$2(key)), op.valueConfig, split)), map$a((matrix) => {
          if (matrix.length === 0) {
            return of$2(empty$f());
          }
          return pipe(transpose(matrix), map$g((values) => fromIterable$1(zip$6(fromIterable$6(keys2), values))));
        }));
      })))));
    }
    case OP_ZIP_WITH$1: {
      return suspend$6(() => pipe(fromFlatLoop(flat, prefix, op.left, split), either$1, flatMap$5((left2) => pipe(fromFlatLoop(flat, prefix, op.right, split), either$1, flatMap$5((right$12) => {
        if (isLeft(left2) && isLeft(right$12)) {
          return fail$8(And(left2.left, right$12.left));
        }
        if (isLeft(left2) && isRight(right$12)) {
          return fail$8(left2.left);
        }
        if (isRight(left2) && isLeft(right$12)) {
          return fail$8(right$12.left);
        }
        if (isRight(left2) && isRight(right$12)) {
          const path = pipe(prefix, join$2("."));
          const fail2 = fromFlatLoopFail(prefix, path);
          const [lefts, rights] = extend$2(fail2, fail2, pipe(left2.right, map$g(right)), pipe(right$12.right, map$g(right)));
          return pipe(lefts, zip$6(rights), forEachSequential(([left3, right2]) => pipe(zip$5(left3, right2), map$a(([left4, right3]) => op.zip(left4, right3)))));
        }
        throw new Error("BUG: ConfigProvider.fromFlatLoop - please report an issue at https://github.com/Effect-TS/effect/issues");
      })))));
    }
  }
};
const fromFlatLoopFail = (prefix, path) => (index) => left(MissingData(prefix, `The element at index ${index} in a sequence at path "${path}" was missing`));
const mapInputPath = /* @__PURE__ */ dual(2, (self, f) => fromFlat(mapInputPathFlat(self.flattened, f)));
const mapInputPathFlat = (self, f) => makeFlat({
  load: (path, config2, split = true) => self.load(path, config2, split),
  enumerateChildren: (path) => self.enumerateChildren(path),
  patch: mapName(self.patch, f)
});
const nested$3 = /* @__PURE__ */ dual(2, (self, name) => fromFlat(makeFlat({
  load: (path, config2) => self.flattened.load(path, config2, true),
  enumerateChildren: (path) => self.flattened.enumerateChildren(path),
  patch: nested$4(self.flattened.patch, name)
})));
const orElse$4 = /* @__PURE__ */ dual(2, (self, that) => fromFlat(orElseFlat(self.flattened, () => that().flattened)));
const orElseFlat = (self, that) => makeFlat({
  load: (path, config2, split) => pipe(patch$3(path, self.patch), flatMap$5((patch2) => self.load(patch2, config2, split)), catchAll$1((error1) => pipe(sync$4(that), flatMap$5((that2) => pipe(patch$3(path, that2.patch), flatMap$5((patch2) => that2.load(patch2, config2, split)), catchAll$1((error2) => fail$8(Or(error1, error2)))))))),
  enumerateChildren: (path) => pipe(patch$3(path, self.patch), flatMap$5((patch2) => self.enumerateChildren(patch2)), either$1, flatMap$5((left2) => pipe(sync$4(that), flatMap$5((that2) => pipe(patch$3(path, that2.patch), flatMap$5((patch2) => that2.enumerateChildren(patch2)), either$1, flatMap$5((right2) => {
    if (isLeft(left2) && isLeft(right2)) {
      return fail$8(And(left2.left, right2.left));
    }
    if (isLeft(left2) && isRight(right2)) {
      return succeed$b(right2.right);
    }
    if (isRight(left2) && isLeft(right2)) {
      return succeed$b(left2.right);
    }
    if (isRight(left2) && isRight(right2)) {
      return succeed$b(pipe(left2.right, union(right2.right)));
    }
    throw new Error("BUG: ConfigProvider.orElseFlat - please report an issue at https://github.com/Effect-TS/effect/issues");
  })))))),
  patch: empty$8
});
const constantCase$1 = (self) => mapInputPath(self, constantCase$2);
const splitPathString = (text, delim) => {
  const split = text.split(new RegExp(`\\s*${escape(delim)}\\s*`));
  return split;
};
const parsePrimitive = (text, path, primitive2, delimiter, split) => {
  if (!split) {
    return pipe(primitive2.parse(text), mapBoth$2({
      onFailure: prefixed(path),
      onSuccess: of$2
    }));
  }
  return pipe(splitPathString(text, delimiter), forEachSequential((char) => primitive2.parse(char.trim())), mapError$2(prefixed(path)));
};
const transpose = (array2) => {
  return Object.keys(array2[0]).map((column) => array2.map((row) => row[column]));
};
const indicesFrom = (quotedIndices) => pipe(forEachSequential(quotedIndices, parseQuotedIndex), mapBoth$2({
  onFailure: () => empty$n(),
  onSuccess: sort(Order$1)
}), either$1, map$a(merge$4));
const STR_INDEX_REGEX = /(^.+)(\[(\d+)\])$/;
const QUOTED_INDEX_REGEX = /^(\[(\d+)\])$/;
const parseQuotedIndex = (str) => {
  const match2 = str.match(QUOTED_INDEX_REGEX);
  if (match2 !== null) {
    const matchedIndex = match2[2];
    return pipe(matchedIndex !== void 0 && matchedIndex.length > 0 ? some(matchedIndex) : none$6(), flatMap$9(parseInteger));
  }
  return none$6();
};
const splitIndexInKeys = (map2, unmakePathString, makePathString) => {
  const newMap = /* @__PURE__ */ new Map();
  for (const [pathString, value2] of map2) {
    const keyWithIndex = pipe(unmakePathString(pathString), flatMap$8((key) => match$9(splitIndexFrom(key), {
      onNone: () => of$2(key),
      onSome: ([key2, index]) => make$D(key2, `[${index}]`)
    })));
    newMap.set(makePathString(keyWithIndex), value2);
  }
  return newMap;
};
const splitIndexFrom = (key) => {
  const match2 = key.match(STR_INDEX_REGEX);
  if (match2 !== null) {
    const matchedString = match2[1];
    const matchedIndex = match2[3];
    const optionalString = matchedString !== void 0 && matchedString.length > 0 ? some(matchedString) : none$6();
    const optionalIndex = pipe(matchedIndex !== void 0 && matchedIndex.length > 0 ? some(matchedIndex) : none$6(), flatMap$9(parseInteger));
    return all$3([optionalString, optionalIndex]);
  }
  return none$6();
};
const parseInteger = (str) => {
  const parsedIndex = Number.parseInt(str);
  return Number.isNaN(parsedIndex) ? none$6() : some(parsedIndex);
};
const keyName = (name) => ({
  _tag: "KeyName",
  name
});
const keyIndex = (index) => ({
  _tag: "KeyIndex",
  index
});
const fromJson$1 = (json2) => {
  const hiddenDelimiter = "\uFEFF";
  const indexedEntries = map$g(getIndexedEntries(json2), ([key, value2]) => [configPathToString(key).join(hiddenDelimiter), value2]);
  return fromMap$1(new Map(indexedEntries), {
    pathDelim: hiddenDelimiter,
    seqDelim: hiddenDelimiter
  });
};
const configPathToString = (path) => {
  const output = [];
  let i = 0;
  while (i < path.length) {
    const component = path[i];
    if (component._tag === "KeyName") {
      if (i + 1 < path.length) {
        const nextComponent = path[i + 1];
        if (nextComponent._tag === "KeyIndex") {
          output.push(`${component.name}[${nextComponent.index}]`);
          i += 2;
        } else {
          output.push(component.name);
          i += 1;
        }
      } else {
        output.push(component.name);
        i += 1;
      }
    }
  }
  return output;
};
const getIndexedEntries = (config2) => {
  const loopAny = (path, value2) => {
    if (typeof value2 === "string") {
      return make$D([path, value2]);
    }
    if (typeof value2 === "number" || typeof value2 === "boolean") {
      return make$D([path, String(value2)]);
    }
    if (isArray(value2)) {
      return loopArray(path, value2);
    }
    if (typeof value2 === "object" && value2 !== null) {
      return loopObject(path, value2);
    }
    return empty$n();
  };
  const loopArray = (path, values) => match$8(values, {
    onEmpty: () => make$D([path, "<nil>"]),
    onNonEmpty: flatMap$8((value2, index) => loopAny(append$2(path, keyIndex(index)), value2))
  });
  const loopObject = (path, value2) => Object.entries(value2).filter(([, value3]) => isNotNullable(value3)).flatMap(([key, value3]) => {
    const newPath = append$2(path, keyName(key));
    const result = loopAny(newPath, value3);
    if (isEmptyReadonlyArray(result)) {
      return make$D([newPath, ""]);
    }
    return result;
  });
  return loopObject(empty$n(), config2);
};
const TypeId$6 = /* @__PURE__ */ Symbol.for("effect/Console");
const consoleTag = /* @__PURE__ */ GenericTag("effect/Console");
const defaultConsole = {
  [TypeId$6]: TypeId$6,
  assert(condition, ...args2) {
    return sync$4(() => {
      console.assert(condition, ...args2);
    });
  },
  clear: /* @__PURE__ */ sync$4(() => {
    console.clear();
  }),
  count(label) {
    return sync$4(() => {
      console.count(label);
    });
  },
  countReset(label) {
    return sync$4(() => {
      console.countReset(label);
    });
  },
  debug(...args2) {
    return sync$4(() => {
      console.debug(...args2);
    });
  },
  dir(item, options) {
    return sync$4(() => {
      console.dir(item, options);
    });
  },
  dirxml(...args2) {
    return sync$4(() => {
      console.dirxml(...args2);
    });
  },
  error(...args2) {
    return sync$4(() => {
      console.error(...args2);
    });
  },
  group(options) {
    return options?.collapsed ? sync$4(() => console.groupCollapsed(options?.label)) : sync$4(() => console.group(options?.label));
  },
  groupEnd: /* @__PURE__ */ sync$4(() => {
    console.groupEnd();
  }),
  info(...args2) {
    return sync$4(() => {
      console.info(...args2);
    });
  },
  log(...args2) {
    return sync$4(() => {
      console.log(...args2);
    });
  },
  table(tabularData, properties) {
    return sync$4(() => {
      console.table(tabularData, properties);
    });
  },
  time(label) {
    return sync$4(() => console.time(label));
  },
  timeEnd(label) {
    return sync$4(() => console.timeEnd(label));
  },
  timeLog(label, ...args2) {
    return sync$4(() => {
      console.timeLog(label, ...args2);
    });
  },
  trace(...args2) {
    return sync$4(() => {
      console.trace(...args2);
    });
  },
  warn(...args2) {
    return sync$4(() => {
      console.warn(...args2);
    });
  },
  unsafe: console
};
const RandomSymbolKey = "effect/Random";
const RandomTypeId = /* @__PURE__ */ Symbol.for(RandomSymbolKey);
const randomTag = /* @__PURE__ */ GenericTag("effect/Random");
class RandomImpl {
  seed;
  [RandomTypeId] = RandomTypeId;
  PRNG;
  constructor(seed) {
    this.seed = seed;
    this.PRNG = new PCGRandom(seed);
  }
  get next() {
    return sync$4(() => this.PRNG.number());
  }
  get nextBoolean() {
    return map$a(this.next, (n) => n > 0.5);
  }
  get nextInt() {
    return sync$4(() => this.PRNG.integer(Number.MAX_SAFE_INTEGER));
  }
  nextRange(min2, max) {
    return map$a(this.next, (n) => (max - min2) * n + min2);
  }
  nextIntBetween(min2, max) {
    return sync$4(() => this.PRNG.integer(max - min2) + min2);
  }
  shuffle(elements) {
    return shuffleWith(elements, (n) => this.nextIntBetween(0, n));
  }
}
const shuffleWith = (elements, nextIntBounded) => {
  return suspend$6(() => pipe(sync$4(() => Array.from(elements)), flatMap$5((buffer) => {
    const numbers = [];
    for (let i = buffer.length; i >= 2; i = i - 1) {
      numbers.push(i);
    }
    return pipe(numbers, forEachSequentialDiscard((n) => pipe(nextIntBounded(n), map$a((k) => swap(buffer, n - 1, k)))), as$1(fromIterable$5(buffer)));
  })));
};
const swap = (buffer, index1, index2) => {
  const tmp = buffer[index1];
  buffer[index1] = buffer[index2];
  buffer[index2] = tmp;
  return buffer;
};
const make$n = (seed) => new RandomImpl(hash(seed));
const TracerTypeId = /* @__PURE__ */ Symbol.for("effect/Tracer");
const make$m = (options) => ({
  [TracerTypeId]: TracerTypeId,
  ...options
});
const tracerTag = /* @__PURE__ */ GenericTag("effect/Tracer");
const spanTag = /* @__PURE__ */ GenericTag("effect/ParentSpan");
const randomHexString = /* @__PURE__ */ (function() {
  const characters = "abcdef0123456789";
  const charactersLength = characters.length;
  return function(length2) {
    let result = "";
    for (let i = 0; i < length2; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
})();
class NativeSpan {
  name;
  parent;
  context;
  startTime;
  kind;
  _tag = "Span";
  spanId;
  traceId = "native";
  sampled = true;
  status;
  attributes;
  events = [];
  links;
  constructor(name, parent, context2, links, startTime, kind) {
    this.name = name;
    this.parent = parent;
    this.context = context2;
    this.startTime = startTime;
    this.kind = kind;
    this.status = {
      _tag: "Started",
      startTime
    };
    this.attributes = /* @__PURE__ */ new Map();
    this.traceId = parent._tag === "Some" ? parent.value.traceId : randomHexString(32);
    this.spanId = randomHexString(16);
    this.links = Array.from(links);
  }
  end(endTime, exit2) {
    this.status = {
      _tag: "Ended",
      endTime,
      exit: exit2,
      startTime: this.status.startTime
    };
  }
  attribute(key, value2) {
    this.attributes.set(key, value2);
  }
  event(name, startTime, attributes) {
    this.events.push([name, startTime, attributes ?? {}]);
  }
  addLinks(links) {
    this.links.push(...links);
  }
}
const nativeTracer = /* @__PURE__ */ make$m({
  span: (name, parent, context2, links, startTime, kind) => new NativeSpan(name, parent, context2, links, startTime, kind),
  context: (f) => f()
});
const addSpanStackTrace = (options) => {
  if (options?.captureStackTrace === false) {
    return options;
  } else if (options?.captureStackTrace !== void 0 && typeof options.captureStackTrace !== "boolean") {
    return options;
  }
  const limit = Error.stackTraceLimit;
  Error.stackTraceLimit = 3;
  const traceError = new Error();
  Error.stackTraceLimit = limit;
  let cache = false;
  return {
    ...options,
    captureStackTrace: () => {
      if (cache !== false) {
        return cache;
      }
      if (traceError.stack !== void 0) {
        const stack = traceError.stack.split("\n");
        if (stack[3] !== void 0) {
          cache = stack[3].trim();
          return cache;
        }
      }
    }
  };
};
const DisablePropagation = /* @__PURE__ */ Reference()("effect/Tracer/DisablePropagation", {
  defaultValue: constFalse
});
const liveServices = /* @__PURE__ */ pipe(/* @__PURE__ */ empty$l(), /* @__PURE__ */ add$3(clockTag, /* @__PURE__ */ make$p()), /* @__PURE__ */ add$3(consoleTag, defaultConsole), /* @__PURE__ */ add$3(randomTag, /* @__PURE__ */ make$n(/* @__PURE__ */ Math.random())), /* @__PURE__ */ add$3(configProviderTag, /* @__PURE__ */ fromEnv$1()), /* @__PURE__ */ add$3(tracerTag, nativeTracer));
const currentServices = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/DefaultServices/currentServices"), () => fiberRefUnsafeMakeContext(liveServices));
const sleep$2 = (duration) => {
  const decodedDuration = decode(duration);
  return clockWith((clock) => clock.sleep(decodedDuration));
};
const defaultServicesWith = (f) => withFiberRuntime$1((fiber) => f(fiber.currentDefaultServices));
const clockWith = (f) => defaultServicesWith((services) => f(services.unsafeMap.get(clockTag.key)));
const currentTimeMillis$1 = /* @__PURE__ */ clockWith((clock) => clock.currentTimeMillis);
const configProviderWith = (f) => defaultServicesWith((services) => f(services.unsafeMap.get(configProviderTag.key)));
const config = (config2) => configProviderWith((_) => _.load(config2));
const ConfigSymbolKey = "effect/Config";
const ConfigTypeId = /* @__PURE__ */ Symbol.for(ConfigSymbolKey);
const configVariance = {
  /* c8 ignore next */
  _A: (_) => _
};
const proto$9 = {
  ...CommitPrototype$1,
  [ConfigTypeId]: configVariance,
  commit() {
    return config(this);
  }
};
const boolean$1 = (name) => {
  const config2 = primitive("a boolean property", (text) => {
    switch (text) {
      case "true":
      case "yes":
      case "on":
      case "1": {
        return right(true);
      }
      case "false":
      case "no":
      case "off":
      case "0": {
        return right(false);
      }
      default: {
        const error = InvalidData$1([], `Expected a boolean value but received ${text}`);
        return left(error);
      }
    }
  });
  return name === void 0 ? config2 : nested$2(config2, name);
};
const literal$1 = (...literals) => (name) => {
  const valuesString = literals.map(String).join(", ");
  const config2 = primitive(`one of (${valuesString})`, (text) => {
    const found = literals.find((value2) => String(value2) === text);
    if (found === void 0) {
      return left(InvalidData$1([], `Expected one of (${valuesString}) but received ${text}`));
    }
    return right(found);
  });
  return name === void 0 ? config2 : nested$2(config2, name);
};
const map$8 = /* @__PURE__ */ dual(2, (self, f) => mapOrFail$1(self, (a) => right(f(a))));
const mapAttempt$1 = /* @__PURE__ */ dual(2, (self, f) => mapOrFail$1(self, (a) => {
  try {
    return right(f(a));
  } catch (error) {
    return left(InvalidData$1([], error instanceof Error ? error.message : `${error}`));
  }
}));
const mapOrFail$1 = /* @__PURE__ */ dual(2, (self, f) => {
  const mapOrFail2 = Object.create(proto$9);
  mapOrFail2._tag = OP_MAP_OR_FAIL;
  mapOrFail2.original = self;
  mapOrFail2.mapOrFail = f;
  return mapOrFail2;
});
const nested$2 = /* @__PURE__ */ dual(2, (self, name) => {
  const nested2 = Object.create(proto$9);
  nested2._tag = OP_NESTED;
  nested2.name = name;
  nested2.config = self;
  return nested2;
});
const orElse$3 = /* @__PURE__ */ dual(2, (self, that) => {
  const fallback = Object.create(proto$9);
  fallback._tag = OP_FALLBACK;
  fallback.first = self;
  fallback.second = suspend$5(that);
  fallback.condition = constTrue;
  return fallback;
});
const orElseIf = /* @__PURE__ */ dual(2, (self, options) => {
  const fallback = Object.create(proto$9);
  fallback._tag = OP_FALLBACK;
  fallback.first = self;
  fallback.second = suspend$5(options.orElse);
  fallback.condition = options.if;
  return fallback;
});
const primitive = (description, parse) => {
  const primitive2 = Object.create(proto$9);
  primitive2._tag = OP_PRIMITIVE;
  primitive2.description = description;
  primitive2.parse = parse;
  return primitive2;
};
const string$1 = (name) => {
  const config2 = primitive("a text property", right);
  return name === void 0 ? config2 : nested$2(config2, name);
};
const succeed$a = (value2) => {
  const constant2 = Object.create(proto$9);
  constant2._tag = OP_CONSTANT;
  constant2.value = value2;
  constant2.parse = () => right(value2);
  return constant2;
};
const suspend$5 = (config2) => {
  const lazy = Object.create(proto$9);
  lazy._tag = OP_LAZY;
  lazy.config = config2;
  return lazy;
};
const withDefault$1 = /* @__PURE__ */ dual(2, (self, def) => orElseIf(self, {
  orElse: () => succeed$a(def),
  if: isMissingDataOnly
}));
const boolean = boolean$1;
const literal = literal$1;
const map$7 = map$8;
const mapAttempt = mapAttempt$1;
const mapOrFail = mapOrFail$1;
const nested$1 = nested$2;
const orElse$2 = orElse$3;
const string = string$1;
const succeed$9 = succeed$a;
const withDefault = withDefault$1;
const Class$1 = Structural;
const Error$2 = /* @__PURE__ */ (function() {
  const plainArgsSymbol = /* @__PURE__ */ Symbol.for("effect/Data/Error/plainArgs");
  const O = {
    BaseEffectError: class extends YieldableError {
      constructor(args2) {
        super(args2?.message, args2?.cause ? {
          cause: args2.cause
        } : void 0);
        if (args2) {
          Object.assign(this, args2);
          Object.defineProperty(this, plainArgsSymbol, {
            value: args2,
            enumerable: false
          });
        }
      }
      toJSON() {
        return {
          ...this[plainArgsSymbol],
          ...this
        };
      }
    }
  };
  return O.BaseEffectError;
})();
const TaggedError = (tag) => {
  const O = {
    BaseEffectError: class extends Error$2 {
      _tag = tag;
    }
  };
  O.BaseEffectError.prototype.name = tag;
  return O.BaseEffectError;
};
const make$l = deferredMake;
const _await$2 = deferredAwait;
const failCause$4 = deferredFailCause;
const isDone$4 = deferredIsDone;
const succeed$8 = deferredSucceed;
const OP_SEQUENTIAL = "Sequential";
const OP_PARALLEL = "Parallel";
const OP_PARALLEL_N = "ParallelN";
const sequential$1 = {
  _tag: OP_SEQUENTIAL
};
const parallel$1 = {
  _tag: OP_PARALLEL
};
const parallelN$1 = (parallelism) => ({
  _tag: OP_PARALLEL_N,
  parallelism
});
const isSequential = (self) => self._tag === OP_SEQUENTIAL;
const isParallel = (self) => self._tag === OP_PARALLEL;
const sequential = sequential$1;
const parallel = parallel$1;
const parallelN = parallelN$1;
function unsafeMake$5(fiberRefLocals) {
  return new FiberRefsImpl(fiberRefLocals);
}
function empty$7() {
  return unsafeMake$5(/* @__PURE__ */ new Map());
}
const FiberRefsSym = /* @__PURE__ */ Symbol.for("effect/FiberRefs");
class FiberRefsImpl {
  locals;
  [FiberRefsSym] = FiberRefsSym;
  constructor(locals) {
    this.locals = locals;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const findAncestor = (_ref, _parentStack, _childStack, _childModified = false) => {
  const ref = _ref;
  let parentStack = _parentStack;
  let childStack = _childStack;
  let childModified = _childModified;
  let ret = void 0;
  while (ret === void 0) {
    if (isNonEmptyReadonlyArray(parentStack) && isNonEmptyReadonlyArray(childStack)) {
      const parentFiberId = headNonEmpty$1(parentStack)[0];
      const parentAncestors = tailNonEmpty$1(parentStack);
      const childFiberId = headNonEmpty$1(childStack)[0];
      const childRefValue = headNonEmpty$1(childStack)[1];
      const childAncestors = tailNonEmpty$1(childStack);
      if (parentFiberId.startTimeMillis < childFiberId.startTimeMillis) {
        childStack = childAncestors;
        childModified = true;
      } else if (parentFiberId.startTimeMillis > childFiberId.startTimeMillis) {
        parentStack = parentAncestors;
      } else {
        if (parentFiberId.id < childFiberId.id) {
          childStack = childAncestors;
          childModified = true;
        } else if (parentFiberId.id > childFiberId.id) {
          parentStack = parentAncestors;
        } else {
          ret = [childRefValue, childModified];
        }
      }
    } else {
      ret = [ref.initial, true];
    }
  }
  return ret;
};
const joinAs = /* @__PURE__ */ dual(3, (self, fiberId2, that) => {
  const parentFiberRefs = new Map(self.locals);
  that.locals.forEach((childStack, fiberRef) => {
    const childValue = childStack[0][1];
    if (!childStack[0][0][symbol](fiberId2)) {
      if (!parentFiberRefs.has(fiberRef)) {
        if (equals$1(childValue, fiberRef.initial)) {
          return;
        }
        parentFiberRefs.set(fiberRef, [[fiberId2, fiberRef.join(fiberRef.initial, childValue)]]);
        return;
      }
      const parentStack = parentFiberRefs.get(fiberRef);
      const [ancestor, wasModified] = findAncestor(fiberRef, parentStack, childStack);
      if (wasModified) {
        const patch2 = fiberRef.diff(ancestor, childValue);
        const oldValue = parentStack[0][1];
        const newValue = fiberRef.join(oldValue, fiberRef.patch(patch2)(oldValue));
        if (!equals$1(oldValue, newValue)) {
          let newStack;
          const parentFiberId = parentStack[0][0];
          if (parentFiberId[symbol](fiberId2)) {
            newStack = [[parentFiberId, newValue], ...parentStack.slice(1)];
          } else {
            newStack = [[fiberId2, newValue], ...parentStack];
          }
          parentFiberRefs.set(fiberRef, newStack);
        }
      }
    }
  });
  return new FiberRefsImpl(parentFiberRefs);
});
const forkAs = /* @__PURE__ */ dual(2, (self, childId) => {
  const map2 = /* @__PURE__ */ new Map();
  unsafeForkAs(self, map2, childId);
  return new FiberRefsImpl(map2);
});
const unsafeForkAs = (self, map2, fiberId2) => {
  self.locals.forEach((stack, fiberRef) => {
    const oldValue = stack[0][1];
    const newValue = fiberRef.patch(fiberRef.fork)(oldValue);
    if (equals$1(oldValue, newValue)) {
      map2.set(fiberRef, stack);
    } else {
      map2.set(fiberRef, [[fiberId2, newValue], ...stack]);
    }
  });
};
const delete_ = /* @__PURE__ */ dual(2, (self, fiberRef) => {
  const locals = new Map(self.locals);
  locals.delete(fiberRef);
  return new FiberRefsImpl(locals);
});
const get$4 = /* @__PURE__ */ dual(2, (self, fiberRef) => {
  if (!self.locals.has(fiberRef)) {
    return none$6();
  }
  return some(headNonEmpty$1(self.locals.get(fiberRef))[1]);
});
const getOrDefault$1 = /* @__PURE__ */ dual(2, (self, fiberRef) => pipe(get$4(self, fiberRef), getOrElse(() => fiberRef.initial)));
const updateAs = /* @__PURE__ */ dual(2, (self, {
  fiberId: fiberId2,
  fiberRef,
  value: value2
}) => {
  if (self.locals.size === 0) {
    return new FiberRefsImpl(/* @__PURE__ */ new Map([[fiberRef, [[fiberId2, value2]]]]));
  }
  const locals = new Map(self.locals);
  unsafeUpdateAs(locals, fiberId2, fiberRef, value2);
  return new FiberRefsImpl(locals);
});
const unsafeUpdateAs = (locals, fiberId2, fiberRef, value2) => {
  const oldStack = locals.get(fiberRef) ?? [];
  let newStack;
  if (isNonEmptyReadonlyArray(oldStack)) {
    const [currentId, currentValue] = headNonEmpty$1(oldStack);
    if (currentId[symbol](fiberId2)) {
      if (equals$1(currentValue, value2)) {
        return;
      } else {
        newStack = [[fiberId2, value2], ...oldStack.slice(1)];
      }
    } else {
      newStack = [[fiberId2, value2], ...oldStack];
    }
  } else {
    newStack = [[fiberId2, value2]];
  }
  locals.set(fiberRef, newStack);
};
const updateManyAs$1 = /* @__PURE__ */ dual(2, (self, {
  entries,
  forkAs: forkAs2
}) => {
  if (self.locals.size === 0) {
    return new FiberRefsImpl(new Map(entries));
  }
  const locals = new Map(self.locals);
  if (forkAs2 !== void 0) {
    unsafeForkAs(self, locals, forkAs2);
  }
  entries.forEach(([fiberRef, values]) => {
    if (values.length === 1) {
      unsafeUpdateAs(locals, values[0][0], fiberRef, values[0][1]);
    } else {
      values.forEach(([fiberId2, value2]) => {
        unsafeUpdateAs(locals, fiberId2, fiberRef, value2);
      });
    }
  });
  return new FiberRefsImpl(locals);
});
const get$3 = get$4;
const getOrDefault = getOrDefault$1;
const updateManyAs = updateManyAs$1;
const empty$6 = empty$7;
const OP_EMPTY$1 = "Empty";
const OP_ADD = "Add";
const OP_REMOVE = "Remove";
const OP_UPDATE = "Update";
const OP_AND_THEN$1 = "AndThen";
const empty$5 = {
  _tag: OP_EMPTY$1
};
const diff$2 = (oldValue, newValue) => {
  const missingLocals = new Map(oldValue.locals);
  let patch2 = empty$5;
  for (const [fiberRef, pairs] of newValue.locals.entries()) {
    const newValue2 = headNonEmpty$1(pairs)[1];
    const old = missingLocals.get(fiberRef);
    if (old !== void 0) {
      const oldValue2 = headNonEmpty$1(old)[1];
      if (!equals$1(oldValue2, newValue2)) {
        patch2 = combine$1({
          _tag: OP_UPDATE,
          fiberRef,
          patch: fiberRef.diff(oldValue2, newValue2)
        })(patch2);
      }
    } else {
      patch2 = combine$1({
        _tag: OP_ADD,
        fiberRef,
        value: newValue2
      })(patch2);
    }
    missingLocals.delete(fiberRef);
  }
  for (const [fiberRef] of missingLocals.entries()) {
    patch2 = combine$1({
      _tag: OP_REMOVE,
      fiberRef
    })(patch2);
  }
  return patch2;
};
const combine$1 = /* @__PURE__ */ dual(2, (self, that) => ({
  _tag: OP_AND_THEN$1,
  first: self,
  second: that
}));
const patch$2 = /* @__PURE__ */ dual(3, (self, fiberId2, oldValue) => {
  let fiberRefs2 = oldValue;
  let patches = of$2(self);
  while (isNonEmptyReadonlyArray(patches)) {
    const head2 = headNonEmpty$1(patches);
    const tail = tailNonEmpty$1(patches);
    switch (head2._tag) {
      case OP_EMPTY$1: {
        patches = tail;
        break;
      }
      case OP_ADD: {
        fiberRefs2 = updateAs(fiberRefs2, {
          fiberId: fiberId2,
          fiberRef: head2.fiberRef,
          value: head2.value
        });
        patches = tail;
        break;
      }
      case OP_REMOVE: {
        fiberRefs2 = delete_(fiberRefs2, head2.fiberRef);
        patches = tail;
        break;
      }
      case OP_UPDATE: {
        const value2 = getOrDefault$1(fiberRefs2, head2.fiberRef);
        fiberRefs2 = updateAs(fiberRefs2, {
          fiberId: fiberId2,
          fiberRef: head2.fiberRef,
          value: head2.fiberRef.patch(head2.patch)(value2)
        });
        patches = tail;
        break;
      }
      case OP_AND_THEN$1: {
        patches = prepend$2(head2.first)(prepend$2(head2.second)(tail));
        break;
      }
    }
  }
  return fiberRefs2;
});
const diff$1 = diff$2;
const patch$1 = patch$2;
const FiberStatusSymbolKey = "effect/FiberStatus";
const FiberStatusTypeId = /* @__PURE__ */ Symbol.for(FiberStatusSymbolKey);
const OP_DONE$3 = "Done";
const OP_RUNNING = "Running";
const OP_SUSPENDED = "Suspended";
const DoneHash = /* @__PURE__ */ string$2(`${FiberStatusSymbolKey}-${OP_DONE$3}`);
let Done$1 = class Done {
  [FiberStatusTypeId] = FiberStatusTypeId;
  _tag = OP_DONE$3;
  [symbol$1]() {
    return DoneHash;
  }
  [symbol](that) {
    return isFiberStatus(that) && that._tag === OP_DONE$3;
  }
};
class Running {
  runtimeFlags;
  [FiberStatusTypeId] = FiberStatusTypeId;
  _tag = OP_RUNNING;
  constructor(runtimeFlags2) {
    this.runtimeFlags = runtimeFlags2;
  }
  [symbol$1]() {
    return pipe(hash(FiberStatusSymbolKey), combine$7(hash(this._tag)), combine$7(hash(this.runtimeFlags)), cached$1(this));
  }
  [symbol](that) {
    return isFiberStatus(that) && that._tag === OP_RUNNING && this.runtimeFlags === that.runtimeFlags;
  }
}
class Suspended {
  runtimeFlags;
  blockingOn;
  [FiberStatusTypeId] = FiberStatusTypeId;
  _tag = OP_SUSPENDED;
  constructor(runtimeFlags2, blockingOn) {
    this.runtimeFlags = runtimeFlags2;
    this.blockingOn = blockingOn;
  }
  [symbol$1]() {
    return pipe(hash(FiberStatusSymbolKey), combine$7(hash(this._tag)), combine$7(hash(this.runtimeFlags)), combine$7(hash(this.blockingOn)), cached$1(this));
  }
  [symbol](that) {
    return isFiberStatus(that) && that._tag === OP_SUSPENDED && this.runtimeFlags === that.runtimeFlags && equals$1(this.blockingOn, that.blockingOn);
  }
}
const done$3 = /* @__PURE__ */ new Done$1();
const running$1 = (runtimeFlags2) => new Running(runtimeFlags2);
const suspended$1 = (runtimeFlags2, blockingOn) => new Suspended(runtimeFlags2, blockingOn);
const isFiberStatus = (u) => hasProperty(u, FiberStatusTypeId);
const isDone$3 = (self) => self._tag === OP_DONE$3;
const done$2 = done$3;
const running = running$1;
const suspended = suspended$1;
const isDone$2 = isDone$3;
const All = logLevelAll;
const Fatal = logLevelFatal;
const Error$1 = logLevelError;
const Warning = logLevelWarning;
const Info = logLevelInfo;
const Debug = logLevelDebug;
const Trace = logLevelTrace;
const None2 = logLevelNone;
const allLevels = allLogLevels;
const Order = /* @__PURE__ */ pipe(Order$1, /* @__PURE__ */ mapInput$2((level) => level.ordinal));
const greaterThan = /* @__PURE__ */ greaterThan$1(Order);
const fromLiteral = (literal2) => {
  switch (literal2) {
    case "All":
      return All;
    case "Debug":
      return Debug;
    case "Error":
      return Error$1;
    case "Fatal":
      return Fatal;
    case "Info":
      return Info;
    case "Trace":
      return Trace;
    case "None":
      return None2;
    case "Warning":
      return Warning;
  }
};
const TypeId$5 = /* @__PURE__ */ Symbol.for("effect/Readable");
const RefTypeId = /* @__PURE__ */ Symbol.for("effect/Ref");
const refVariance = {
  /* c8 ignore next */
  _A: (_) => _
};
class RefImpl extends Class$2 {
  ref;
  commit() {
    return this.get;
  }
  [RefTypeId] = refVariance;
  [TypeId$5] = TypeId$5;
  constructor(ref) {
    super();
    this.ref = ref;
    this.get = sync$4(() => get$6(this.ref));
  }
  get;
  modify(f) {
    return sync$4(() => {
      const current = get$6(this.ref);
      const [b, a] = f(current);
      if (current !== a) {
        set$3(a)(this.ref);
      }
      return b;
    });
  }
}
const unsafeMake$4 = (value2) => new RefImpl(make$t(value2));
const make$k = (value2) => sync$4(() => unsafeMake$4(value2));
const get$2 = (self) => self.get;
const set$1 = /* @__PURE__ */ dual(2, (self, value2) => self.modify(() => [void 0, value2]));
const getAndSet$1 = /* @__PURE__ */ dual(2, (self, value2) => self.modify((a) => [a, value2]));
const modify$1 = /* @__PURE__ */ dual(2, (self, f) => self.modify(f));
const update$3 = /* @__PURE__ */ dual(2, (self, f) => self.modify((a) => [void 0, f(a)]));
const make$j = make$k;
const get$1 = get$2;
const getAndSet = getAndSet$1;
const modify = modify$1;
const update$2 = update$3;
class PriorityBuckets {
  /**
   * @since 2.0.0
   */
  buckets = [];
  /**
   * @since 2.0.0
   */
  scheduleTask(task, priority) {
    const length2 = this.buckets.length;
    let bucket = void 0;
    let index = 0;
    for (; index < length2; index++) {
      if (this.buckets[index][0] <= priority) {
        bucket = this.buckets[index];
      } else {
        break;
      }
    }
    if (bucket && bucket[0] === priority) {
      bucket[1].push(task);
    } else if (index === length2) {
      this.buckets.push([priority, [task]]);
    } else {
      this.buckets.splice(index, 0, [priority, [task]]);
    }
  }
}
class MixedScheduler {
  maxNextTickBeforeTimer;
  /**
   * @since 2.0.0
   */
  running = false;
  /**
   * @since 2.0.0
   */
  tasks = /* @__PURE__ */ new PriorityBuckets();
  constructor(maxNextTickBeforeTimer) {
    this.maxNextTickBeforeTimer = maxNextTickBeforeTimer;
  }
  /**
   * @since 2.0.0
   */
  starveInternal(depth) {
    const tasks = this.tasks.buckets;
    this.tasks.buckets = [];
    for (const [_, toRun] of tasks) {
      for (let i = 0; i < toRun.length; i++) {
        toRun[i]();
      }
    }
    if (this.tasks.buckets.length === 0) {
      this.running = false;
    } else {
      this.starve(depth);
    }
  }
  /**
   * @since 2.0.0
   */
  starve(depth = 0) {
    if (depth >= this.maxNextTickBeforeTimer) {
      setTimeout(() => this.starveInternal(0), 0);
    } else {
      Promise.resolve(void 0).then(() => this.starveInternal(depth + 1));
    }
  }
  /**
   * @since 2.0.0
   */
  shouldYield(fiber) {
    return fiber.currentOpCount > fiber.getFiberRef(currentMaxOpsBeforeYield) ? fiber.getFiberRef(currentSchedulingPriority) : false;
  }
  /**
   * @since 2.0.0
   */
  scheduleTask(task, priority) {
    this.tasks.scheduleTask(task, priority);
    if (!this.running) {
      this.running = true;
      this.starve();
    }
  }
}
const defaultScheduler = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Scheduler/defaultScheduler"), () => new MixedScheduler(2048));
class SyncScheduler {
  /**
   * @since 2.0.0
   */
  tasks = /* @__PURE__ */ new PriorityBuckets();
  /**
   * @since 2.0.0
   */
  deferred = false;
  /**
   * @since 2.0.0
   */
  scheduleTask(task, priority) {
    if (this.deferred) {
      defaultScheduler.scheduleTask(task, priority);
    } else {
      this.tasks.scheduleTask(task, priority);
    }
  }
  /**
   * @since 2.0.0
   */
  shouldYield(fiber) {
    return fiber.currentOpCount > fiber.getFiberRef(currentMaxOpsBeforeYield) ? fiber.getFiberRef(currentSchedulingPriority) : false;
  }
  /**
   * @since 2.0.0
   */
  flush() {
    while (this.tasks.buckets.length > 0) {
      const tasks = this.tasks.buckets;
      this.tasks.buckets = [];
      for (const [_, toRun] of tasks) {
        for (let i = 0; i < toRun.length; i++) {
          toRun[i]();
        }
      }
    }
    this.deferred = true;
  }
}
const currentScheduler = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentScheduler"), () => fiberRefUnsafeMake(defaultScheduler));
const currentRequestMap = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentRequestMap"), () => fiberRefUnsafeMake(/* @__PURE__ */ new Map()));
const match$5 = (concurrency, sequential2, unbounded2, bounded2) => {
  switch (concurrency) {
    case void 0:
      return sequential2();
    case "unbounded":
      return unbounded2();
    case "inherit":
      return fiberRefGetWith(currentConcurrency, (concurrency2) => concurrency2 === "unbounded" ? unbounded2() : concurrency2 > 1 ? bounded2(concurrency2) : sequential2());
    default:
      return concurrency > 1 ? bounded2(concurrency) : sequential2();
  }
};
const sleep$1 = sleep$2;
const currentTimeMillis = currentTimeMillis$1;
const Clock = clockTag;
const make$i = (label, startTime) => ({
  label,
  startTime
});
const formatLabel = (key) => key.replace(/[\s="]/g, "_");
const render = (now) => (self) => {
  const label = formatLabel(self.label);
  return `${label}=${now - self.startTime}ms`;
};
const make$h = make$i;
const MetricLabelSymbolKey = "effect/MetricLabel";
const MetricLabelTypeId = /* @__PURE__ */ Symbol.for(MetricLabelSymbolKey);
class MetricLabelImpl {
  key;
  value;
  [MetricLabelTypeId] = MetricLabelTypeId;
  _hash;
  constructor(key, value2) {
    this.key = key;
    this.value = value2;
    this._hash = string$2(MetricLabelSymbolKey + this.key + this.value);
  }
  [symbol$1]() {
    return this._hash;
  }
  [symbol](that) {
    return isMetricLabel(that) && this.key === that.key && this.value === that.value;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const make$g = (key, value2) => {
  return new MetricLabelImpl(key, value2);
};
const isMetricLabel = (u) => hasProperty(u, MetricLabelTypeId);
const annotateLogs$1 = /* @__PURE__ */ dual((args2) => isEffect$1(args2[0]), function() {
  const args2 = arguments;
  return fiberRefLocallyWith(args2[0], currentLogAnnotations, typeof args2[1] === "string" ? set$2(args2[1], args2[2]) : (annotations2) => Object.entries(args2[1]).reduce((acc, [key, value2]) => set$2(acc, key, value2), annotations2));
});
const asSome = (self) => map$a(self, some);
const try_$1 = (arg) => {
  let evaluate2;
  let onFailure = void 0;
  if (typeof arg === "function") {
    evaluate2 = arg;
  } else {
    evaluate2 = arg.try;
    onFailure = arg.catch;
  }
  return suspend$6(() => {
    try {
      return succeed$b(internalCall(evaluate2));
    } catch (error) {
      return fail$8(onFailure ? internalCall(() => onFailure(error)) : new UnknownException(error, "An unknown error occurred in Effect.try"));
    }
  });
};
const catchTag$1 = /* @__PURE__ */ dual((args2) => isEffect$1(args2[0]), (self, ...args2) => {
  const f = args2[args2.length - 1];
  let predicate;
  if (args2.length === 2) {
    predicate = isTagged(args2[0]);
  } else {
    predicate = (e) => {
      const tag = hasProperty(e, "_tag") ? e["_tag"] : void 0;
      if (!tag) return false;
      for (let i = 0; i < args2.length - 1; i++) {
        if (args2[i] === tag) return true;
      }
      return false;
    };
  }
  return catchIf(self, predicate, f);
});
const catchTags$1 = /* @__PURE__ */ dual(2, (self, cases) => {
  let keys2;
  return catchIf(self, (e) => {
    keys2 ??= Object.keys(cases);
    return hasProperty(e, "_tag") && isString(e["_tag"]) && keys2.includes(e["_tag"]);
  }, (e) => cases[e["_tag"]](e));
});
const diffFiberRefs = (self) => summarized(self, fiberRefs, diff$2);
const diffFiberRefsAndRuntimeFlags = (self) => summarized(self, zip$5(fiberRefs, runtimeFlags), ([refs, flags], [refsNew, flagsNew]) => [diff$2(refs, refsNew), diff$3(flags, flagsNew)]);
const match$4 = /* @__PURE__ */ dual(2, (self, options) => matchEffect(self, {
  onFailure: (e) => succeed$b(options.onFailure(e)),
  onSuccess: (a) => succeed$b(options.onSuccess(a))
}));
const forever$1 = (self) => {
  const loop = flatMap$5(flatMap$5(self, () => yieldNow$1()), () => loop);
  return loop;
};
const fiberRefs = /* @__PURE__ */ withFiberRuntime$1((state) => succeed$b(state.getFiberRefs()));
const ignore$1 = (self) => match$4(self, {
  onFailure: constVoid,
  onSuccess: constVoid
});
const logWithLevel$1 = (level) => (...message) => {
  const levelOption = fromNullable(level);
  let cause = void 0;
  for (let i = 0, len = message.length; i < len; i++) {
    const msg = message[i];
    if (isCause(msg)) {
      if (cause !== void 0) {
        cause = sequential$2(cause, msg);
      } else {
        cause = msg;
      }
      message = [...message.slice(0, i), ...message.slice(i + 1)];
      i--;
    }
  }
  if (cause === void 0) {
    cause = empty$g;
  }
  return withFiberRuntime$1((fiberState) => {
    fiberState.log(message, cause, levelOption);
    return void_$2;
  });
};
const logDebug$1 = /* @__PURE__ */ logWithLevel$1(Debug);
const logError$1 = /* @__PURE__ */ logWithLevel$1(Error$1);
const withLogSpan$1 = /* @__PURE__ */ dual(2, (effect2, label) => flatMap$5(currentTimeMillis, (now) => fiberRefLocallyWith(effect2, currentLogSpan, prepend(make$h(label, now)))));
const mapErrorCause = /* @__PURE__ */ dual(2, (self, f) => matchCauseEffect$1(self, {
  onFailure: (c) => failCauseSync$1(() => f(c)),
  onSuccess: succeed$b
}));
const memoize = (self) => pipe(deferredMake(), flatMap$5((deferred) => pipe(diffFiberRefsAndRuntimeFlags(self), intoDeferred$1(deferred), once, map$a((complete2) => zipRight$5(complete2, pipe(deferredAwait(deferred), flatMap$5(([patch2, a]) => as$1(zip$5(patchFiberRefs(patch2[0]), updateRuntimeFlags(patch2[1])), a))))))));
const negate = (self) => map$a(self, (b) => !b);
const once = (self) => map$a(make$j(true), (ref) => asVoid$1(whenEffect(self, getAndSet(ref, false))));
const patchFiberRefs = (patch2) => updateFiberRefs((fiberId2, fiberRefs2) => pipe(patch2, patch$2(fiberId2, fiberRefs2)));
const promise$1 = (evaluate2) => evaluate2.length >= 1 ? async_((resolve, signal) => {
  try {
    evaluate2(signal).then((a) => resolve(exitSucceed(a)), (e) => resolve(exitDie(e)));
  } catch (e) {
    resolve(exitDie(e));
  }
}) : async_((resolve) => {
  try {
    ;
    evaluate2().then((a) => resolve(exitSucceed(a)), (e) => resolve(exitDie(e)));
  } catch (e) {
    resolve(exitDie(e));
  }
});
const provideService = /* @__PURE__ */ dual(3, (self, tag, service) => contextWithEffect((env) => provideContext(self, add$3(env, tag, service))));
const provideServiceEffect = /* @__PURE__ */ dual(3, (self, tag, effect2) => contextWithEffect((env) => flatMap$5(effect2, (service) => provideContext(self, pipe(env, add$3(tag, service))))));
const sleep = sleep$1;
const succeedNone = /* @__PURE__ */ succeed$b(/* @__PURE__ */ none$6());
const summarized = /* @__PURE__ */ dual(3, (self, summary2, f) => flatMap$5(summary2, (start2) => flatMap$5(self, (value2) => map$a(summary2, (end2) => [f(start2, end2), value2]))));
const tapBoth$1 = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => matchCauseEffect$1(self, {
  onFailure: (cause) => {
    const either2 = failureOrCause$1(cause);
    switch (either2._tag) {
      case "Left": {
        return zipRight$5(onFailure(either2.left), failCause$5(cause));
      }
      case "Right": {
        return failCause$5(cause);
      }
    }
  },
  onSuccess: (a) => as$1(onSuccess(a), a)
}));
const tapError$1 = /* @__PURE__ */ dual(2, (self, f) => matchCauseEffect$1(self, {
  onFailure: (cause) => {
    const either2 = failureOrCause$1(cause);
    switch (either2._tag) {
      case "Left":
        return zipRight$5(f(either2.left), failCause$5(cause));
      case "Right":
        return failCause$5(cause);
    }
  },
  onSuccess: succeed$b
}));
const tapErrorCause$1 = /* @__PURE__ */ dual(2, (self, f) => matchCauseEffect$1(self, {
  onFailure: (cause) => zipRight$5(f(cause), failCause$5(cause)),
  onSuccess: succeed$b
}));
const tryPromise$1 = (arg) => {
  let evaluate2;
  let catcher = void 0;
  if (typeof arg === "function") {
    evaluate2 = arg;
  } else {
    evaluate2 = arg.try;
    catcher = arg.catch;
  }
  const fail2 = (e) => catcher ? failSync(() => catcher(e)) : fail$8(new UnknownException(e, "An unknown error occurred in Effect.tryPromise"));
  if (evaluate2.length >= 1) {
    return async_((resolve, signal) => {
      try {
        evaluate2(signal).then((a) => resolve(exitSucceed(a)), (e) => resolve(fail2(e)));
      } catch (e) {
        resolve(fail2(e));
      }
    });
  }
  return async_((resolve) => {
    try {
      evaluate2().then((a) => resolve(exitSucceed(a)), (e) => resolve(fail2(e)));
    } catch (e) {
      resolve(fail2(e));
    }
  });
};
const tryMap$1 = /* @__PURE__ */ dual(2, (self, options) => flatMap$5(self, (a) => try_$1({
  try: () => options.try(a),
  catch: options.catch
})));
const updateFiberRefs = (f) => withFiberRuntime$1((state) => {
  state.setFiberRefs(f(state.id(), state.getFiberRefs()));
  return void_$2;
});
const when$1 = /* @__PURE__ */ dual(2, (self, condition) => suspend$6(() => condition() ? map$a(self, some) : succeed$b(none$6())));
const serviceFunctions$1 = (getService) => new Proxy({}, {
  get(_target, prop, _receiver) {
    return (...args2) => flatMap$5(getService, (s) => s[prop](...args2));
  }
});
const bigint0$1 = /* @__PURE__ */ BigInt(0);
const filterDisablePropagation = /* @__PURE__ */ flatMap$9((span2) => get$9(span2.context, DisablePropagation) ? span2._tag === "Span" ? filterDisablePropagation(span2.parent) : none$6() : some(span2));
const unsafeMakeSpan = (fiber, name, options) => {
  const disablePropagation = !fiber.getFiberRef(currentTracerEnabled$1) || options.context && get$9(options.context, DisablePropagation);
  const context2 = fiber.getFiberRef(currentContext$1);
  const parent = options.parent ? some(options.parent) : options.root ? none$6() : filterDisablePropagation(getOption(context2, spanTag));
  let span2;
  if (disablePropagation) {
    span2 = noopSpan({
      name,
      parent,
      context: add$3(options.context ?? empty$l(), DisablePropagation, true)
    });
  } else {
    const services = fiber.getFiberRef(currentServices);
    const tracer = get$9(services, tracerTag);
    const clock = get$9(services, Clock);
    const timingEnabled = fiber.getFiberRef(currentTracerTimingEnabled);
    const fiberRefs2 = fiber.getFiberRefs();
    const annotationsFromEnv = get$3(fiberRefs2, currentTracerSpanAnnotations);
    const linksFromEnv = get$3(fiberRefs2, currentTracerSpanLinks);
    const links = linksFromEnv._tag === "Some" ? options.links !== void 0 ? [...toReadonlyArray(linksFromEnv.value), ...options.links ?? []] : toReadonlyArray(linksFromEnv.value) : options.links ?? empty$n();
    span2 = tracer.span(name, parent, options.context ?? empty$l(), links, timingEnabled ? clock.unsafeCurrentTimeNanos() : bigint0$1, options.kind ?? "internal");
    if (annotationsFromEnv._tag === "Some") {
      forEach$2(annotationsFromEnv.value, (value2, key) => span2.attribute(key, value2));
    }
    if (options.attributes !== void 0) {
      Object.entries(options.attributes).forEach(([k, v]) => span2.attribute(k, v));
    }
  }
  if (typeof options.captureStackTrace === "function") {
    spanToTrace.set(span2, options.captureStackTrace);
  }
  return span2;
};
const endSpan = (span2, exit2, clock, timingEnabled) => sync$4(() => {
  if (span2.status._tag === "Ended") {
    return;
  }
  if (exitIsFailure(exit2) && spanToTrace.has(span2)) {
    span2.attribute("code.stacktrace", spanToTrace.get(span2)());
  }
  span2.end(timingEnabled ? clock.unsafeCurrentTimeNanos() : bigint0$1, exit2);
});
const useSpan$1 = (name, ...args2) => {
  const options = addSpanStackTrace(args2.length === 1 ? void 0 : args2[0]);
  const evaluate2 = args2[args2.length - 1];
  return withFiberRuntime$1((fiber) => {
    const span2 = unsafeMakeSpan(fiber, name, options);
    const timingEnabled = fiber.getFiberRef(currentTracerTimingEnabled);
    const clock = get$9(fiber.getFiberRef(currentServices), clockTag);
    return onExit(evaluate2(span2), (exit2) => endSpan(span2, exit2, clock, timingEnabled));
  });
};
const withParentSpan$1 = /* @__PURE__ */ dual(2, (self, span2) => provideService(self, spanTag, span2));
const withSpan$1 = function() {
  const dataFirst = typeof arguments[0] !== "string";
  const name = dataFirst ? arguments[1] : arguments[0];
  const options = addSpanStackTrace(dataFirst ? arguments[2] : arguments[1]);
  if (dataFirst) {
    const self = arguments[0];
    return useSpan$1(name, options, (span2) => withParentSpan$1(self, span2));
  }
  return (self) => useSpan$1(name, options, (span2) => withParentSpan$1(self, span2));
};
const isFailure = exitIsFailure;
const isSuccess = exitIsSuccess;
const isInterrupted = exitIsInterrupted;
const all$2 = exitCollectAll;
const die$1 = exitDie;
const fail$6 = exitFail;
const failCause$3 = exitFailCause;
const flatten$4 = exitFlatten;
const map$6 = exitMap;
const match$3 = exitMatch;
const succeed$7 = exitSucceed;
const void_$1 = exitVoid;
const zip$4 = exitZip;
const zipRight$4 = exitZipRight;
const OP_INTERRUPT_SIGNAL = "InterruptSignal";
const OP_STATEFUL = "Stateful";
const OP_RESUME = "Resume";
const OP_YIELD_NOW = "YieldNow";
const interruptSignal = (cause) => ({
  _tag: OP_INTERRUPT_SIGNAL,
  cause
});
const stateful = (onFiber) => ({
  _tag: OP_STATEFUL,
  onFiber
});
const resume = (effect2) => ({
  _tag: OP_RESUME,
  effect: effect2
});
const yieldNow = () => ({
  _tag: OP_YIELD_NOW
});
const FiberScopeSymbolKey = "effect/FiberScope";
const FiberScopeTypeId = /* @__PURE__ */ Symbol.for(FiberScopeSymbolKey);
class Global {
  [FiberScopeTypeId] = FiberScopeTypeId;
  fiberId = none$4;
  roots = /* @__PURE__ */ new Set();
  add(_runtimeFlags, child) {
    this.roots.add(child);
    child.addObserver(() => {
      this.roots.delete(child);
    });
  }
}
class Local {
  fiberId;
  parent;
  [FiberScopeTypeId] = FiberScopeTypeId;
  constructor(fiberId2, parent) {
    this.fiberId = fiberId2;
    this.parent = parent;
  }
  add(_runtimeFlags, child) {
    this.parent.tell(stateful((parentFiber) => {
      parentFiber.addChild(child);
      child.addObserver(() => {
        parentFiber.removeChild(child);
      });
    }));
  }
}
const unsafeMake$3 = (fiber) => {
  return new Local(fiber.id(), fiber);
};
const globalScope = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberScope/Global"), () => new Global());
const FiberSymbolKey = "effect/Fiber";
const FiberTypeId = /* @__PURE__ */ Symbol.for(FiberSymbolKey);
const fiberVariance = {
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _A: (_) => _
};
const RuntimeFiberSymbolKey = "effect/Fiber";
const RuntimeFiberTypeId = /* @__PURE__ */ Symbol.for(RuntimeFiberSymbolKey);
const _await$1 = (self) => self.await;
const inheritAll$1 = (self) => self.inheritAll;
const join$1 = (self) => zipLeft$3(flatten$5(self.await), self.inheritAll);
({
  ...CommitPrototype$1
});
const currentFiberURI = "effect/FiberCurrent";
const LoggerSymbolKey = "effect/Logger";
const LoggerTypeId$1 = /* @__PURE__ */ Symbol.for(LoggerSymbolKey);
const loggerVariance = {
  /* c8 ignore next */
  _Message: (_) => _,
  /* c8 ignore next */
  _Output: (_) => _
};
const makeLogger = (log) => ({
  [LoggerTypeId$1]: loggerVariance,
  log,
  pipe() {
    return pipeArguments(this, arguments);
  }
});
const mapInput$1 = /* @__PURE__ */ dual(2, (self, f) => makeLogger((options) => self.log({
  ...options,
  message: f(options.message)
})));
const mapInputOptions$1 = /* @__PURE__ */ dual(2, (self, f) => makeLogger((options) => self.log(f(options))));
const filterLogLevel$1 = /* @__PURE__ */ dual(2, (self, f) => makeLogger((options) => f(options.logLevel) ? some(self.log(options)) : none$6()));
const map$5 = /* @__PURE__ */ dual(2, (self, f) => makeLogger((options) => f(self.log(options))));
const none$2 = {
  [LoggerTypeId$1]: loggerVariance,
  log: constVoid,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const simple$1 = (log) => ({
  [LoggerTypeId$1]: loggerVariance,
  log: ({
    message
  }) => log(message),
  pipe() {
    return pipeArguments(this, arguments);
  }
});
const succeed$6 = (value2) => {
  return simple$1(() => value2);
};
const sync$3 = (evaluate2) => {
  return simple$1(evaluate2);
};
const zip$3 = /* @__PURE__ */ dual(2, (self, that) => makeLogger((options) => [self.log(options), that.log(options)]));
const zipLeft$2 = /* @__PURE__ */ dual(2, (self, that) => map$5(zip$3(self, that), (tuple) => tuple[0]));
const zipRight$3 = /* @__PURE__ */ dual(2, (self, that) => map$5(zip$3(self, that), (tuple) => tuple[1]));
const textOnly = /^[^\s"=]*$/;
const format$1 = (quoteValue, whitespace) => ({
  annotations: annotations2,
  cause,
  date,
  fiberId: fiberId2,
  logLevel,
  message,
  spans
}) => {
  const formatValue = (value2) => value2.match(textOnly) ? value2 : quoteValue(value2);
  const format2 = (label, value2) => `${formatLabel(label)}=${formatValue(value2)}`;
  const append2 = (label, value2) => " " + format2(label, value2);
  let out = format2("timestamp", date.toISOString());
  out += append2("level", logLevel.label);
  out += append2("fiber", threadName$1(fiberId2));
  const messages = ensure(message);
  for (let i = 0; i < messages.length; i++) {
    out += append2("message", toStringUnknown(messages[i], whitespace));
  }
  if (!isEmptyType(cause)) {
    out += append2("cause", pretty$2(cause, {
      renderErrorCause: true
    }));
  }
  for (const span2 of spans) {
    out += " " + render(date.getTime())(span2);
  }
  for (const [label, value2] of annotations2) {
    out += append2(label, toStringUnknown(value2, whitespace));
  }
  return out;
};
const escapeDoubleQuotes = (s) => `"${s.replace(/\\([\s\S])|(")/g, "\\$1$2")}"`;
const stringLogger$1 = /* @__PURE__ */ makeLogger(/* @__PURE__ */ format$1(escapeDoubleQuotes));
const logfmtLogger$1 = /* @__PURE__ */ makeLogger(/* @__PURE__ */ format$1(JSON.stringify, 0));
const structuredLogger$2 = /* @__PURE__ */ makeLogger(({
  annotations: annotations2,
  cause,
  date,
  fiberId: fiberId2,
  logLevel,
  message,
  spans
}) => {
  const now = date.getTime();
  const annotationsObj = {};
  const spansObj = {};
  if (size$2(annotations2) > 0) {
    for (const [k, v] of annotations2) {
      annotationsObj[k] = structuredMessage(v);
    }
  }
  if (isCons(spans)) {
    for (const span2 of spans) {
      spansObj[span2.label] = now - span2.startTime;
    }
  }
  const messageArr = ensure(message);
  return {
    message: messageArr.length === 1 ? structuredMessage(messageArr[0]) : messageArr.map(structuredMessage),
    logLevel: logLevel.label,
    timestamp: date.toISOString(),
    cause: isEmpty$5(cause) ? void 0 : pretty$2(cause, {
      renderErrorCause: true
    }),
    annotations: annotationsObj,
    spans: spansObj,
    fiberId: threadName$1(fiberId2)
  };
});
const structuredMessage = (u) => {
  switch (typeof u) {
    case "bigint":
    case "function":
    case "symbol": {
      return String(u);
    }
    default: {
      return toJSON(u);
    }
  }
};
const jsonLogger$2 = /* @__PURE__ */ map$5(structuredLogger$2, stringifyCircular);
const isLogger$1 = (u) => {
  return typeof u === "object" && u != null && LoggerTypeId$1 in u;
};
const withColor = (text, ...colors2) => {
  let out = "";
  for (let i = 0; i < colors2.length; i++) {
    out += `\x1B[${colors2[i]}m`;
  }
  return out + text + "\x1B[0m";
};
const withColorNoop = (text, ..._colors) => text;
const colors = {
  bold: "1",
  red: "31",
  green: "32",
  yellow: "33",
  blue: "34",
  cyan: "36",
  white: "37",
  gray: "90",
  black: "30",
  bgBrightRed: "101"
};
const logLevelColors = {
  None: [],
  All: [],
  Trace: [colors.gray],
  Debug: [colors.blue],
  Info: [colors.green],
  Warning: [colors.yellow],
  Error: [colors.red],
  Fatal: [colors.bgBrightRed, colors.black]
};
const logLevelStyle = {
  None: "",
  All: "",
  Trace: "color:gray",
  Debug: "color:blue",
  Info: "color:green",
  Warning: "color:orange",
  Error: "color:red",
  Fatal: "background-color:red;color:white"
};
const defaultDateFormat = (date) => `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}.${date.getMilliseconds().toString().padStart(3, "0")}`;
const hasProcessStdout = typeof process === "object" && process !== null && typeof process.stdout === "object" && process.stdout !== null;
const processStdoutIsTTY = hasProcessStdout && process.stdout.isTTY === true;
const hasProcessStdoutOrDeno = hasProcessStdout || "Deno" in globalThis;
const prettyLogger$2 = (options) => {
  const mode_ = options?.mode ?? "auto";
  const mode = mode_ === "auto" ? hasProcessStdoutOrDeno ? "tty" : "browser" : mode_;
  const isBrowser = mode === "browser";
  const showColors = typeof options?.colors === "boolean" ? options.colors : processStdoutIsTTY || isBrowser;
  const formatDate2 = options?.formatDate ?? defaultDateFormat;
  return isBrowser ? prettyLoggerBrowser({
    colors: showColors,
    formatDate: formatDate2
  }) : prettyLoggerTty({
    colors: showColors,
    formatDate: formatDate2,
    stderr: options?.stderr === true
  });
};
const prettyLoggerTty = (options) => {
  const processIsBun = typeof process === "object" && "isBun" in process && process.isBun === true;
  const color = options.colors ? withColor : withColorNoop;
  return makeLogger(({
    annotations: annotations2,
    cause,
    context: context2,
    date,
    fiberId: fiberId2,
    logLevel,
    message: message_,
    spans
  }) => {
    const services = getOrDefault(context2, currentServices);
    const console2 = get$9(services, consoleTag).unsafe;
    const log = options.stderr === true ? console2.error : console2.log;
    const message = ensure(message_);
    let firstLine = color(`[${options.formatDate(date)}]`, colors.white) + ` ${color(logLevel.label, ...logLevelColors[logLevel._tag])} (${threadName$1(fiberId2)})`;
    if (isCons(spans)) {
      const now = date.getTime();
      const render$1 = render(now);
      for (const span2 of spans) {
        firstLine += " " + render$1(span2);
      }
    }
    firstLine += ":";
    let messageIndex = 0;
    if (message.length > 0) {
      const firstMaybeString = structuredMessage(message[0]);
      if (typeof firstMaybeString === "string") {
        firstLine += " " + color(firstMaybeString, colors.bold, colors.cyan);
        messageIndex++;
      }
    }
    log(firstLine);
    if (!processIsBun) console2.group();
    if (!isEmpty$5(cause)) {
      log(pretty$2(cause, {
        renderErrorCause: true
      }));
    }
    if (messageIndex < message.length) {
      for (; messageIndex < message.length; messageIndex++) {
        log(redact(message[messageIndex]));
      }
    }
    if (size$2(annotations2) > 0) {
      for (const [key, value2] of annotations2) {
        log(color(`${key}:`, colors.bold, colors.white), redact(value2));
      }
    }
    if (!processIsBun) console2.groupEnd();
  });
};
const prettyLoggerBrowser = (options) => {
  const color = options.colors ? "%c" : "";
  return makeLogger(({
    annotations: annotations2,
    cause,
    context: context2,
    date,
    fiberId: fiberId2,
    logLevel,
    message: message_,
    spans
  }) => {
    const services = getOrDefault(context2, currentServices);
    const console2 = get$9(services, consoleTag).unsafe;
    const message = ensure(message_);
    let firstLine = `${color}[${options.formatDate(date)}]`;
    const firstParams = [];
    if (options.colors) {
      firstParams.push("color:gray");
    }
    firstLine += ` ${color}${logLevel.label}${color} (${threadName$1(fiberId2)})`;
    if (options.colors) {
      firstParams.push(logLevelStyle[logLevel._tag], "");
    }
    if (isCons(spans)) {
      const now = date.getTime();
      const render$1 = render(now);
      for (const span2 of spans) {
        firstLine += " " + render$1(span2);
      }
    }
    firstLine += ":";
    let messageIndex = 0;
    if (message.length > 0) {
      const firstMaybeString = structuredMessage(message[0]);
      if (typeof firstMaybeString === "string") {
        firstLine += ` ${color}${firstMaybeString}`;
        if (options.colors) {
          firstParams.push("color:deepskyblue");
        }
        messageIndex++;
      }
    }
    console2.groupCollapsed(firstLine, ...firstParams);
    if (!isEmpty$5(cause)) {
      console2.error(pretty$2(cause, {
        renderErrorCause: true
      }));
    }
    if (messageIndex < message.length) {
      for (; messageIndex < message.length; messageIndex++) {
        console2.log(redact(message[messageIndex]));
      }
    }
    if (size$2(annotations2) > 0) {
      for (const [key, value2] of annotations2) {
        const redacted = redact(value2);
        if (options.colors) {
          console2.log(`%c${key}:`, "color:gray", redacted);
        } else {
          console2.log(`${key}:`, redacted);
        }
      }
    }
    console2.groupEnd();
  });
};
const prettyLoggerDefault$1 = /* @__PURE__ */ globalValue("effect/Logger/prettyLoggerDefault", () => prettyLogger$2());
const MetricBoundariesSymbolKey = "effect/MetricBoundaries";
const MetricBoundariesTypeId = /* @__PURE__ */ Symbol.for(MetricBoundariesSymbolKey);
class MetricBoundariesImpl {
  values;
  [MetricBoundariesTypeId] = MetricBoundariesTypeId;
  constructor(values) {
    this.values = values;
    this._hash = pipe(string$2(MetricBoundariesSymbolKey), combine$7(array(this.values)));
  }
  _hash;
  [symbol$1]() {
    return this._hash;
  }
  [symbol](u) {
    return isMetricBoundaries(u) && equals$1(this.values, u.values);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const isMetricBoundaries = (u) => hasProperty(u, MetricBoundariesTypeId);
const fromIterable = (iterable) => {
  const values = pipe(iterable, appendAll$2(of$1(Number.POSITIVE_INFINITY)), dedupe);
  return new MetricBoundariesImpl(values);
};
const exponential = (options) => pipe(makeBy(options.count - 1, (i) => options.start * Math.pow(options.factor, i)), unsafeFromArray, fromIterable);
const MetricKeyTypeSymbolKey = "effect/MetricKeyType";
const MetricKeyTypeTypeId = /* @__PURE__ */ Symbol.for(MetricKeyTypeSymbolKey);
const CounterKeyTypeSymbolKey = "effect/MetricKeyType/Counter";
const CounterKeyTypeTypeId = /* @__PURE__ */ Symbol.for(CounterKeyTypeSymbolKey);
const FrequencyKeyTypeSymbolKey = "effect/MetricKeyType/Frequency";
const FrequencyKeyTypeTypeId = /* @__PURE__ */ Symbol.for(FrequencyKeyTypeSymbolKey);
const GaugeKeyTypeSymbolKey = "effect/MetricKeyType/Gauge";
const GaugeKeyTypeTypeId = /* @__PURE__ */ Symbol.for(GaugeKeyTypeSymbolKey);
const HistogramKeyTypeSymbolKey = "effect/MetricKeyType/Histogram";
const HistogramKeyTypeTypeId = /* @__PURE__ */ Symbol.for(HistogramKeyTypeSymbolKey);
const SummaryKeyTypeSymbolKey = "effect/MetricKeyType/Summary";
const SummaryKeyTypeTypeId = /* @__PURE__ */ Symbol.for(SummaryKeyTypeSymbolKey);
const metricKeyTypeVariance = {
  /* c8 ignore next */
  _In: (_) => _,
  /* c8 ignore next */
  _Out: (_) => _
};
class CounterKeyType {
  incremental;
  bigint;
  [MetricKeyTypeTypeId] = metricKeyTypeVariance;
  [CounterKeyTypeTypeId] = CounterKeyTypeTypeId;
  constructor(incremental, bigint) {
    this.incremental = incremental;
    this.bigint = bigint;
    this._hash = string$2(CounterKeyTypeSymbolKey);
  }
  _hash;
  [symbol$1]() {
    return this._hash;
  }
  [symbol](that) {
    return isCounterKey(that);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
class HistogramKeyType {
  boundaries;
  [MetricKeyTypeTypeId] = metricKeyTypeVariance;
  [HistogramKeyTypeTypeId] = HistogramKeyTypeTypeId;
  constructor(boundaries) {
    this.boundaries = boundaries;
    this._hash = pipe(string$2(HistogramKeyTypeSymbolKey), combine$7(hash(this.boundaries)));
  }
  _hash;
  [symbol$1]() {
    return this._hash;
  }
  [symbol](that) {
    return isHistogramKey(that) && equals$1(this.boundaries, that.boundaries);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const counter$4 = (options) => new CounterKeyType(options?.incremental ?? false, options?.bigint ?? false);
const histogram$4 = (boundaries) => {
  return new HistogramKeyType(boundaries);
};
const isCounterKey = (u) => hasProperty(u, CounterKeyTypeTypeId);
const isFrequencyKey = (u) => hasProperty(u, FrequencyKeyTypeTypeId);
const isGaugeKey = (u) => hasProperty(u, GaugeKeyTypeTypeId);
const isHistogramKey = (u) => hasProperty(u, HistogramKeyTypeTypeId);
const isSummaryKey = (u) => hasProperty(u, SummaryKeyTypeTypeId);
const MetricKeySymbolKey = "effect/MetricKey";
const MetricKeyTypeId = /* @__PURE__ */ Symbol.for(MetricKeySymbolKey);
const metricKeyVariance = {
  /* c8 ignore next */
  _Type: (_) => _
};
const arrayEquivilence = /* @__PURE__ */ getEquivalence$3(equals$1);
class MetricKeyImpl {
  name;
  keyType;
  description;
  tags;
  [MetricKeyTypeId] = metricKeyVariance;
  constructor(name, keyType, description, tags = []) {
    this.name = name;
    this.keyType = keyType;
    this.description = description;
    this.tags = tags;
    this._hash = pipe(string$2(this.name + this.description), combine$7(hash(this.keyType)), combine$7(array(this.tags)));
  }
  _hash;
  [symbol$1]() {
    return this._hash;
  }
  [symbol](u) {
    return isMetricKey(u) && this.name === u.name && equals$1(this.keyType, u.keyType) && equals$1(this.description, u.description) && arrayEquivilence(this.tags, u.tags);
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const isMetricKey = (u) => hasProperty(u, MetricKeyTypeId);
const counter$3 = (name, options) => new MetricKeyImpl(name, counter$4(options), fromNullable(options?.description));
const histogram$3 = (name, boundaries, description) => new MetricKeyImpl(name, histogram$4(boundaries), fromNullable(description));
const taggedWithLabels$1 = /* @__PURE__ */ dual(2, (self, extraTags) => extraTags.length === 0 ? self : new MetricKeyImpl(self.name, self.keyType, self.description, union$2(self.tags, extraTags)));
const TypeId$4 = /* @__PURE__ */ Symbol.for("effect/MutableHashMap");
const MutableHashMapProto = {
  [TypeId$4]: TypeId$4,
  [Symbol.iterator]() {
    return new MutableHashMapIterator(this);
  },
  toString() {
    return format$3(this.toJSON());
  },
  toJSON() {
    return {
      _id: "MutableHashMap",
      values: Array.from(this).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
class MutableHashMapIterator {
  self;
  referentialIterator;
  bucketIterator;
  constructor(self) {
    this.self = self;
    this.referentialIterator = self.referential[Symbol.iterator]();
  }
  next() {
    if (this.bucketIterator !== void 0) {
      return this.bucketIterator.next();
    }
    const result = this.referentialIterator.next();
    if (result.done) {
      this.bucketIterator = new BucketIterator(this.self.buckets.values());
      return this.next();
    }
    return result;
  }
  [Symbol.iterator]() {
    return new MutableHashMapIterator(this.self);
  }
}
class BucketIterator {
  backing;
  constructor(backing) {
    this.backing = backing;
  }
  currentBucket;
  next() {
    if (this.currentBucket === void 0) {
      const result2 = this.backing.next();
      if (result2.done) {
        return result2;
      }
      this.currentBucket = result2.value[Symbol.iterator]();
    }
    const result = this.currentBucket.next();
    if (result.done) {
      this.currentBucket = void 0;
      return this.next();
    }
    return result;
  }
}
const empty$4 = () => {
  const self = Object.create(MutableHashMapProto);
  self.referential = /* @__PURE__ */ new Map();
  self.buckets = /* @__PURE__ */ new Map();
  self.bucketsSize = 0;
  return self;
};
const get = /* @__PURE__ */ dual(2, (self, key) => {
  if (isEqual(key) === false) {
    return self.referential.has(key) ? some(self.referential.get(key)) : none$6();
  }
  const hash2 = key[symbol$1]();
  const bucket = self.buckets.get(hash2);
  if (bucket === void 0) {
    return none$6();
  }
  return getFromBucket(self, bucket, key);
});
const getFromBucket = (self, bucket, key, remove2 = false) => {
  for (let i = 0, len = bucket.length; i < len; i++) {
    if (key[symbol](bucket[i][0])) {
      const value2 = bucket[i][1];
      if (remove2) {
        bucket.splice(i, 1);
        self.bucketsSize--;
      }
      return some(value2);
    }
  }
  return none$6();
};
const has = /* @__PURE__ */ dual(2, (self, key) => isSome(get(self, key)));
const set = /* @__PURE__ */ dual(3, (self, key, value2) => {
  if (isEqual(key) === false) {
    self.referential.set(key, value2);
    return self;
  }
  const hash2 = key[symbol$1]();
  const bucket = self.buckets.get(hash2);
  if (bucket === void 0) {
    self.buckets.set(hash2, [[key, value2]]);
    self.bucketsSize++;
    return self;
  }
  removeFromBucket(self, bucket, key);
  bucket.push([key, value2]);
  self.bucketsSize++;
  return self;
});
const removeFromBucket = (self, bucket, key) => {
  for (let i = 0, len = bucket.length; i < len; i++) {
    if (key[symbol](bucket[i][0])) {
      bucket.splice(i, 1);
      self.bucketsSize--;
      return;
    }
  }
};
const MetricStateSymbolKey = "effect/MetricState";
const MetricStateTypeId = /* @__PURE__ */ Symbol.for(MetricStateSymbolKey);
const CounterStateSymbolKey = "effect/MetricState/Counter";
const CounterStateTypeId = /* @__PURE__ */ Symbol.for(CounterStateSymbolKey);
const FrequencyStateSymbolKey = "effect/MetricState/Frequency";
const FrequencyStateTypeId = /* @__PURE__ */ Symbol.for(FrequencyStateSymbolKey);
const GaugeStateSymbolKey = "effect/MetricState/Gauge";
const GaugeStateTypeId = /* @__PURE__ */ Symbol.for(GaugeStateSymbolKey);
const HistogramStateSymbolKey = "effect/MetricState/Histogram";
const HistogramStateTypeId = /* @__PURE__ */ Symbol.for(HistogramStateSymbolKey);
const SummaryStateSymbolKey = "effect/MetricState/Summary";
const SummaryStateTypeId = /* @__PURE__ */ Symbol.for(SummaryStateSymbolKey);
const metricStateVariance = {
  /* c8 ignore next */
  _A: (_) => _
};
class CounterState {
  count;
  [MetricStateTypeId] = metricStateVariance;
  [CounterStateTypeId] = CounterStateTypeId;
  constructor(count) {
    this.count = count;
  }
  [symbol$1]() {
    return pipe(hash(CounterStateSymbolKey), combine$7(hash(this.count)), cached$1(this));
  }
  [symbol](that) {
    return isCounterState(that) && this.count === that.count;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const arrayEquals = /* @__PURE__ */ getEquivalence$3(equals$1);
class FrequencyState {
  occurrences;
  [MetricStateTypeId] = metricStateVariance;
  [FrequencyStateTypeId] = FrequencyStateTypeId;
  constructor(occurrences) {
    this.occurrences = occurrences;
  }
  _hash;
  [symbol$1]() {
    return pipe(string$2(FrequencyStateSymbolKey), combine$7(array(fromIterable$6(this.occurrences.entries()))), cached$1(this));
  }
  [symbol](that) {
    return isFrequencyState(that) && arrayEquals(fromIterable$6(this.occurrences.entries()), fromIterable$6(that.occurrences.entries()));
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
class GaugeState {
  value;
  [MetricStateTypeId] = metricStateVariance;
  [GaugeStateTypeId] = GaugeStateTypeId;
  constructor(value2) {
    this.value = value2;
  }
  [symbol$1]() {
    return pipe(hash(GaugeStateSymbolKey), combine$7(hash(this.value)), cached$1(this));
  }
  [symbol](u) {
    return isGaugeState(u) && this.value === u.value;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
class HistogramState {
  buckets;
  count;
  min;
  max;
  sum;
  [MetricStateTypeId] = metricStateVariance;
  [HistogramStateTypeId] = HistogramStateTypeId;
  constructor(buckets, count, min2, max, sum) {
    this.buckets = buckets;
    this.count = count;
    this.min = min2;
    this.max = max;
    this.sum = sum;
  }
  [symbol$1]() {
    return pipe(hash(HistogramStateSymbolKey), combine$7(hash(this.buckets)), combine$7(hash(this.count)), combine$7(hash(this.min)), combine$7(hash(this.max)), combine$7(hash(this.sum)), cached$1(this));
  }
  [symbol](that) {
    return isHistogramState(that) && equals$1(this.buckets, that.buckets) && this.count === that.count && this.min === that.min && this.max === that.max && this.sum === that.sum;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
class SummaryState {
  error;
  quantiles;
  count;
  min;
  max;
  sum;
  [MetricStateTypeId] = metricStateVariance;
  [SummaryStateTypeId] = SummaryStateTypeId;
  constructor(error, quantiles, count, min2, max, sum) {
    this.error = error;
    this.quantiles = quantiles;
    this.count = count;
    this.min = min2;
    this.max = max;
    this.sum = sum;
  }
  [symbol$1]() {
    return pipe(hash(SummaryStateSymbolKey), combine$7(hash(this.error)), combine$7(hash(this.quantiles)), combine$7(hash(this.count)), combine$7(hash(this.min)), combine$7(hash(this.max)), combine$7(hash(this.sum)), cached$1(this));
  }
  [symbol](that) {
    return isSummaryState(that) && this.error === that.error && equals$1(this.quantiles, that.quantiles) && this.count === that.count && this.min === that.min && this.max === that.max && this.sum === that.sum;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const counter$2 = (count) => new CounterState(count);
const frequency$1 = (occurrences) => {
  return new FrequencyState(occurrences);
};
const gauge$1 = (count) => new GaugeState(count);
const histogram$2 = (options) => new HistogramState(options.buckets, options.count, options.min, options.max, options.sum);
const summary$1 = (options) => new SummaryState(options.error, options.quantiles, options.count, options.min, options.max, options.sum);
const isCounterState = (u) => hasProperty(u, CounterStateTypeId);
const isFrequencyState = (u) => hasProperty(u, FrequencyStateTypeId);
const isGaugeState = (u) => hasProperty(u, GaugeStateTypeId);
const isHistogramState = (u) => hasProperty(u, HistogramStateTypeId);
const isSummaryState = (u) => hasProperty(u, SummaryStateTypeId);
const MetricHookSymbolKey = "effect/MetricHook";
const MetricHookTypeId = /* @__PURE__ */ Symbol.for(MetricHookSymbolKey);
const metricHookVariance = {
  /* c8 ignore next */
  _In: (_) => _,
  /* c8 ignore next */
  _Out: (_) => _
};
const make$f = (options) => ({
  [MetricHookTypeId]: metricHookVariance,
  pipe() {
    return pipeArguments(this, arguments);
  },
  ...options
});
const bigint0 = /* @__PURE__ */ BigInt(0);
const counter$1 = (key) => {
  let sum = key.keyType.bigint ? bigint0 : 0;
  const canUpdate = key.keyType.incremental ? key.keyType.bigint ? (value2) => value2 >= bigint0 : (value2) => value2 >= 0 : (_value) => true;
  const update2 = (value2) => {
    if (canUpdate(value2)) {
      sum = sum + value2;
    }
  };
  return make$f({
    get: () => counter$2(sum),
    update: update2,
    modify: update2
  });
};
const frequency = (key) => {
  const values = /* @__PURE__ */ new Map();
  for (const word of key.keyType.preregisteredWords) {
    values.set(word, 0);
  }
  const update2 = (word) => {
    const slotCount = values.get(word) ?? 0;
    values.set(word, slotCount + 1);
  };
  return make$f({
    get: () => frequency$1(values),
    update: update2,
    modify: update2
  });
};
const gauge = (_key, startAt) => {
  let value2 = startAt;
  return make$f({
    get: () => gauge$1(value2),
    update: (v) => {
      value2 = v;
    },
    modify: (v) => {
      value2 = value2 + v;
    }
  });
};
const histogram$1 = (key) => {
  const bounds = key.keyType.boundaries.values;
  const size2 = bounds.length;
  const values = new Uint32Array(size2 + 1);
  const boundaries = new Float32Array(size2);
  let count = 0;
  let sum = 0;
  let min2 = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;
  pipe(bounds, sort(Order$1), map$g((n, i) => {
    boundaries[i] = n;
  }));
  const update2 = (value2) => {
    let from = 0;
    let to = size2;
    while (from !== to) {
      const mid = Math.floor(from + (to - from) / 2);
      const boundary = boundaries[mid];
      if (value2 <= boundary) {
        to = mid;
      } else {
        from = mid;
      }
      if (to === from + 1) {
        if (value2 <= boundaries[from]) {
          to = from;
        } else {
          from = to;
        }
      }
    }
    values[from] = values[from] + 1;
    count = count + 1;
    sum = sum + value2;
    if (value2 < min2) {
      min2 = value2;
    }
    if (value2 > max) {
      max = value2;
    }
  };
  const getBuckets = () => {
    const builder = allocate(size2);
    let cumulated = 0;
    for (let i = 0; i < size2; i++) {
      const boundary = boundaries[i];
      const value2 = values[i];
      cumulated = cumulated + value2;
      builder[i] = [boundary, cumulated];
    }
    return builder;
  };
  return make$f({
    get: () => histogram$2({
      buckets: getBuckets(),
      count,
      min: min2,
      max,
      sum
    }),
    update: update2,
    modify: update2
  });
};
const summary = (key) => {
  const {
    error,
    maxAge,
    maxSize,
    quantiles
  } = key.keyType;
  const sortedQuantiles = pipe(quantiles, sort(Order$1));
  const values = allocate(maxSize);
  let head2 = 0;
  let count = 0;
  let sum = 0;
  let min2 = 0;
  let max = 0;
  const snapshot = (now) => {
    const builder = [];
    let i = 0;
    while (i !== maxSize - 1) {
      const item = values[i];
      if (item != null) {
        const [t, v] = item;
        const age = millis(now - t);
        if (greaterThanOrEqualTo(age, zero) && lessThanOrEqualTo(age, maxAge)) {
          builder.push(v);
        }
      }
      i = i + 1;
    }
    return calculateQuantiles(error, sortedQuantiles, sort(builder, Order$1));
  };
  const observe = (value2, timestamp) => {
    if (maxSize > 0) {
      head2 = head2 + 1;
      const target = head2 % maxSize;
      values[target] = [timestamp, value2];
    }
    min2 = count === 0 ? value2 : Math.min(min2, value2);
    max = count === 0 ? value2 : Math.max(max, value2);
    count = count + 1;
    sum = sum + value2;
  };
  return make$f({
    get: () => summary$1({
      error,
      quantiles: snapshot(Date.now()),
      count,
      min: min2,
      max,
      sum
    }),
    update: ([value2, timestamp]) => observe(value2, timestamp),
    modify: ([value2, timestamp]) => observe(value2, timestamp)
  });
};
const calculateQuantiles = (error, sortedQuantiles, sortedSamples) => {
  const sampleCount = sortedSamples.length;
  if (!isNonEmptyReadonlyArray(sortedQuantiles)) {
    return empty$n();
  }
  const head2 = sortedQuantiles[0];
  const tail = sortedQuantiles.slice(1);
  const resolvedHead = resolveQuantile(error, sampleCount, none$6(), 0, head2, sortedSamples);
  const resolved = of$2(resolvedHead);
  tail.forEach((quantile) => {
    resolved.push(resolveQuantile(error, sampleCount, resolvedHead.value, resolvedHead.consumed, quantile, resolvedHead.rest));
  });
  return map$g(resolved, (rq) => [rq.quantile, rq.value]);
};
const resolveQuantile = (error, sampleCount, current, consumed, quantile, rest) => {
  let error_1 = error;
  let sampleCount_1 = sampleCount;
  let current_1 = current;
  let consumed_1 = consumed;
  let quantile_1 = quantile;
  let rest_1 = rest;
  let error_2 = error;
  let sampleCount_2 = sampleCount;
  let current_2 = current;
  let consumed_2 = consumed;
  let quantile_2 = quantile;
  let rest_2 = rest;
  while (1) {
    if (!isNonEmptyReadonlyArray(rest_1)) {
      return {
        quantile: quantile_1,
        value: none$6(),
        consumed: consumed_1,
        rest: []
      };
    }
    if (quantile_1 === 1) {
      return {
        quantile: quantile_1,
        value: some(lastNonEmpty(rest_1)),
        consumed: consumed_1 + rest_1.length,
        rest: []
      };
    }
    const headValue = headNonEmpty$1(rest_1);
    const sameHead = span(rest_1, (n) => n === headValue);
    const desired = quantile_1 * sampleCount_1;
    const allowedError = error_1 / 2 * desired;
    const candConsumed = consumed_1 + sameHead[0].length;
    const candError = Math.abs(candConsumed - desired);
    if (candConsumed < desired - allowedError) {
      error_2 = error_1;
      sampleCount_2 = sampleCount_1;
      current_2 = head$1(rest_1);
      consumed_2 = candConsumed;
      quantile_2 = quantile_1;
      rest_2 = sameHead[1];
      error_1 = error_2;
      sampleCount_1 = sampleCount_2;
      current_1 = current_2;
      consumed_1 = consumed_2;
      quantile_1 = quantile_2;
      rest_1 = rest_2;
      continue;
    }
    if (candConsumed > desired + allowedError) {
      const valueToReturn = isNone(current_1) ? some(headValue) : current_1;
      return {
        quantile: quantile_1,
        value: valueToReturn,
        consumed: consumed_1,
        rest: rest_1
      };
    }
    switch (current_1._tag) {
      case "None": {
        error_2 = error_1;
        sampleCount_2 = sampleCount_1;
        current_2 = head$1(rest_1);
        consumed_2 = candConsumed;
        quantile_2 = quantile_1;
        rest_2 = sameHead[1];
        error_1 = error_2;
        sampleCount_1 = sampleCount_2;
        current_1 = current_2;
        consumed_1 = consumed_2;
        quantile_1 = quantile_2;
        rest_1 = rest_2;
        continue;
      }
      case "Some": {
        const prevError = Math.abs(desired - current_1.value);
        if (candError < prevError) {
          error_2 = error_1;
          sampleCount_2 = sampleCount_1;
          current_2 = head$1(rest_1);
          consumed_2 = candConsumed;
          quantile_2 = quantile_1;
          rest_2 = sameHead[1];
          error_1 = error_2;
          sampleCount_1 = sampleCount_2;
          current_1 = current_2;
          consumed_1 = consumed_2;
          quantile_1 = quantile_2;
          rest_1 = rest_2;
          continue;
        }
        return {
          quantile: quantile_1,
          value: some(current_1.value),
          consumed: consumed_1,
          rest: rest_1
        };
      }
    }
  }
  throw new Error("BUG: MetricHook.resolveQuantiles - please report an issue at https://github.com/Effect-TS/effect/issues");
};
const MetricPairSymbolKey = "effect/MetricPair";
const MetricPairTypeId = /* @__PURE__ */ Symbol.for(MetricPairSymbolKey);
const metricPairVariance = {
  /* c8 ignore next */
  _Type: (_) => _
};
const unsafeMake$2 = (metricKey, metricState) => {
  return {
    [MetricPairTypeId]: metricPairVariance,
    metricKey,
    metricState,
    pipe() {
      return pipeArguments(this, arguments);
    }
  };
};
const MetricRegistrySymbolKey = "effect/MetricRegistry";
const MetricRegistryTypeId = /* @__PURE__ */ Symbol.for(MetricRegistrySymbolKey);
class MetricRegistryImpl {
  [MetricRegistryTypeId] = MetricRegistryTypeId;
  map = /* @__PURE__ */ empty$4();
  snapshot() {
    const result = [];
    for (const [key, hook] of this.map) {
      result.push(unsafeMake$2(key, hook.get()));
    }
    return result;
  }
  get(key) {
    const hook = pipe(this.map, get(key), getOrUndefined);
    if (hook == null) {
      if (isCounterKey(key.keyType)) {
        return this.getCounter(key);
      }
      if (isGaugeKey(key.keyType)) {
        return this.getGauge(key);
      }
      if (isFrequencyKey(key.keyType)) {
        return this.getFrequency(key);
      }
      if (isHistogramKey(key.keyType)) {
        return this.getHistogram(key);
      }
      if (isSummaryKey(key.keyType)) {
        return this.getSummary(key);
      }
      throw new Error("BUG: MetricRegistry.get - unknown MetricKeyType - please report an issue at https://github.com/Effect-TS/effect/issues");
    } else {
      return hook;
    }
  }
  getCounter(key) {
    let value2 = pipe(this.map, get(key), getOrUndefined);
    if (value2 == null) {
      const counter2 = counter$1(key);
      if (!pipe(this.map, has(key))) {
        pipe(this.map, set(key, counter2));
      }
      value2 = counter2;
    }
    return value2;
  }
  getFrequency(key) {
    let value2 = pipe(this.map, get(key), getOrUndefined);
    if (value2 == null) {
      const frequency$12 = frequency(key);
      if (!pipe(this.map, has(key))) {
        pipe(this.map, set(key, frequency$12));
      }
      value2 = frequency$12;
    }
    return value2;
  }
  getGauge(key) {
    let value2 = pipe(this.map, get(key), getOrUndefined);
    if (value2 == null) {
      const gauge$12 = gauge(key, key.keyType.bigint ? BigInt(0) : 0);
      if (!pipe(this.map, has(key))) {
        pipe(this.map, set(key, gauge$12));
      }
      value2 = gauge$12;
    }
    return value2;
  }
  getHistogram(key) {
    let value2 = pipe(this.map, get(key), getOrUndefined);
    if (value2 == null) {
      const histogram2 = histogram$1(key);
      if (!pipe(this.map, has(key))) {
        pipe(this.map, set(key, histogram2));
      }
      value2 = histogram2;
    }
    return value2;
  }
  getSummary(key) {
    let value2 = pipe(this.map, get(key), getOrUndefined);
    if (value2 == null) {
      const summary$12 = summary(key);
      if (!pipe(this.map, has(key))) {
        pipe(this.map, set(key, summary$12));
      }
      value2 = summary$12;
    }
    return value2;
  }
}
const make$e = () => {
  return new MetricRegistryImpl();
};
const MetricSymbolKey = "effect/Metric";
const MetricTypeId = /* @__PURE__ */ Symbol.for(MetricSymbolKey);
const metricVariance = {
  /* c8 ignore next */
  _Type: (_) => _,
  /* c8 ignore next */
  _In: (_) => _,
  /* c8 ignore next */
  _Out: (_) => _
};
const globalMetricRegistry = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Metric/globalMetricRegistry"), () => make$e());
const make$d = function(keyType, unsafeUpdate, unsafeValue, unsafeModify) {
  const metric = Object.assign((effect2) => tap$1(effect2, (a) => update$1(metric, a)), {
    [MetricTypeId]: metricVariance,
    keyType,
    unsafeUpdate,
    unsafeValue,
    unsafeModify,
    register() {
      this.unsafeValue([]);
      return this;
    },
    pipe() {
      return pipeArguments(this, arguments);
    }
  });
  return metric;
};
const counter = (name, options) => fromMetricKey(counter$3(name, options));
const fromMetricKey = (key) => {
  let untaggedHook;
  const hookCache = /* @__PURE__ */ new WeakMap();
  const hook = (extraTags) => {
    if (extraTags.length === 0) {
      if (untaggedHook !== void 0) {
        return untaggedHook;
      }
      untaggedHook = globalMetricRegistry.get(key);
      return untaggedHook;
    }
    let hook2 = hookCache.get(extraTags);
    if (hook2 !== void 0) {
      return hook2;
    }
    hook2 = globalMetricRegistry.get(taggedWithLabels$1(key, extraTags));
    hookCache.set(extraTags, hook2);
    return hook2;
  };
  return make$d(key.keyType, (input, extraTags) => hook(extraTags).update(input), (extraTags) => hook(extraTags).get(), (input, extraTags) => hook(extraTags).modify(input));
};
const histogram = (name, boundaries, description) => fromMetricKey(histogram$3(name, boundaries, description));
const tagged = /* @__PURE__ */ dual(3, (self, key, value2) => taggedWithLabels(self, [make$g(key, value2)]));
const taggedWithLabels = /* @__PURE__ */ dual(2, (self, extraTags) => {
  return make$d(self.keyType, (input, extraTags1) => self.unsafeUpdate(input, union$2(extraTags, extraTags1)), (extraTags1) => self.unsafeValue(union$2(extraTags, extraTags1)), (input, extraTags1) => self.unsafeModify(input, union$2(extraTags, extraTags1)));
});
const update$1 = /* @__PURE__ */ dual(2, (self, input) => fiberRefGetWith(currentMetricLabels, (tags) => sync$4(() => self.unsafeUpdate(input, tags))));
({
  ...StructuralPrototype
});
const complete = /* @__PURE__ */ dual(2, (self, result) => fiberRefGetWith(currentRequestMap, (map2) => sync$4(() => {
  if (map2.has(self)) {
    const entry = map2.get(self);
    if (!entry.state.completed) {
      entry.state.completed = true;
      deferredUnsafeDone(entry.result, result);
    }
  }
})));
const SupervisorSymbolKey = "effect/Supervisor";
const SupervisorTypeId = /* @__PURE__ */ Symbol.for(SupervisorSymbolKey);
const supervisorVariance = {
  /* c8 ignore next */
  _T: (_) => _
};
class ProxySupervisor {
  underlying;
  value0;
  [SupervisorTypeId] = supervisorVariance;
  constructor(underlying, value0) {
    this.underlying = underlying;
    this.value0 = value0;
  }
  get value() {
    return this.value0;
  }
  onStart(context2, effect2, parent, fiber) {
    this.underlying.onStart(context2, effect2, parent, fiber);
  }
  onEnd(value2, fiber) {
    this.underlying.onEnd(value2, fiber);
  }
  onEffect(fiber, effect2) {
    this.underlying.onEffect(fiber, effect2);
  }
  onSuspend(fiber) {
    this.underlying.onSuspend(fiber);
  }
  onResume(fiber) {
    this.underlying.onResume(fiber);
  }
  map(f) {
    return new ProxySupervisor(this, pipe(this.value, map$a(f)));
  }
  zip(right2) {
    return new Zip(this, right2);
  }
}
class Zip {
  left;
  right;
  _tag = "Zip";
  [SupervisorTypeId] = supervisorVariance;
  constructor(left2, right2) {
    this.left = left2;
    this.right = right2;
  }
  get value() {
    return zip$5(this.left.value, this.right.value);
  }
  onStart(context2, effect2, parent, fiber) {
    this.left.onStart(context2, effect2, parent, fiber);
    this.right.onStart(context2, effect2, parent, fiber);
  }
  onEnd(value2, fiber) {
    this.left.onEnd(value2, fiber);
    this.right.onEnd(value2, fiber);
  }
  onEffect(fiber, effect2) {
    this.left.onEffect(fiber, effect2);
    this.right.onEffect(fiber, effect2);
  }
  onSuspend(fiber) {
    this.left.onSuspend(fiber);
    this.right.onSuspend(fiber);
  }
  onResume(fiber) {
    this.left.onResume(fiber);
    this.right.onResume(fiber);
  }
  map(f) {
    return new ProxySupervisor(this, pipe(this.value, map$a(f)));
  }
  zip(right2) {
    return new Zip(this, right2);
  }
}
const isZip = (self) => hasProperty(self, SupervisorTypeId) && isTagged(self, "Zip");
class Const {
  effect;
  [SupervisorTypeId] = supervisorVariance;
  constructor(effect2) {
    this.effect = effect2;
  }
  get value() {
    return this.effect;
  }
  onStart(_context, _effect, _parent, _fiber) {
  }
  onEnd(_value, _fiber) {
  }
  onEffect(_fiber, _effect) {
  }
  onSuspend(_fiber) {
  }
  onResume(_fiber) {
  }
  map(f) {
    return new ProxySupervisor(this, pipe(this.value, map$a(f)));
  }
  zip(right2) {
    return new Zip(this, right2);
  }
  onRun(execution, _fiber) {
    return execution();
  }
}
const fromEffect$5 = (effect2) => {
  return new Const(effect2);
};
const none$1 = /* @__PURE__ */ globalValue("effect/Supervisor/none", () => fromEffect$5(void_$2));
const make$c = make$s;
const OP_EMPTY = "Empty";
const OP_ADD_SUPERVISOR = "AddSupervisor";
const OP_REMOVE_SUPERVISOR = "RemoveSupervisor";
const OP_AND_THEN = "AndThen";
const empty$3 = {
  _tag: OP_EMPTY
};
const combine = (self, that) => {
  return {
    _tag: OP_AND_THEN,
    first: self,
    second: that
  };
};
const patch = (self, supervisor) => {
  return patchLoop(supervisor, of$1(self));
};
const patchLoop = (_supervisor, _patches) => {
  let supervisor = _supervisor;
  let patches = _patches;
  while (isNonEmpty$3(patches)) {
    const head2 = headNonEmpty(patches);
    switch (head2._tag) {
      case OP_EMPTY: {
        patches = tailNonEmpty(patches);
        break;
      }
      case OP_ADD_SUPERVISOR: {
        supervisor = supervisor.zip(head2.supervisor);
        patches = tailNonEmpty(patches);
        break;
      }
      case OP_REMOVE_SUPERVISOR: {
        supervisor = removeSupervisor(supervisor, head2.supervisor);
        patches = tailNonEmpty(patches);
        break;
      }
      case OP_AND_THEN: {
        patches = prepend$1(head2.first)(prepend$1(head2.second)(tailNonEmpty(patches)));
        break;
      }
    }
  }
  return supervisor;
};
const removeSupervisor = (self, that) => {
  if (equals$1(self, that)) {
    return none$1;
  } else {
    if (isZip(self)) {
      return removeSupervisor(self.left, that).zip(removeSupervisor(self.right, that));
    } else {
      return self;
    }
  }
};
const toSet = (self) => {
  if (equals$1(self, none$1)) {
    return empty$h();
  } else {
    if (isZip(self)) {
      return pipe(toSet(self.left), union(toSet(self.right)));
    } else {
      return make$v(self);
    }
  }
};
const diff = (oldValue, newValue) => {
  if (equals$1(oldValue, newValue)) {
    return empty$3;
  }
  const oldSupervisors = toSet(oldValue);
  const newSupervisors = toSet(newValue);
  const added = pipe(newSupervisors, difference(oldSupervisors), reduce$3(empty$3, (patch2, supervisor) => combine(patch2, {
    _tag: OP_ADD_SUPERVISOR,
    supervisor
  })));
  const removed = pipe(oldSupervisors, difference(newSupervisors), reduce$3(empty$3, (patch2, supervisor) => combine(patch2, {
    _tag: OP_REMOVE_SUPERVISOR,
    supervisor
  })));
  return combine(added, removed);
};
const differ = /* @__PURE__ */ make$c({
  empty: empty$3,
  patch,
  combine,
  diff
});
const fiberStarted = /* @__PURE__ */ counter("effect_fiber_started", {
  incremental: true
});
const fiberActive = /* @__PURE__ */ counter("effect_fiber_active");
const fiberSuccesses = /* @__PURE__ */ counter("effect_fiber_successes", {
  incremental: true
});
const fiberFailures = /* @__PURE__ */ counter("effect_fiber_failures", {
  incremental: true
});
const fiberLifetimes = /* @__PURE__ */ tagged(/* @__PURE__ */ histogram("effect_fiber_lifetimes", /* @__PURE__ */ exponential({
  start: 0.5,
  factor: 2,
  count: 35
})), "time_unit", "milliseconds");
const EvaluationSignalContinue = "Continue";
const EvaluationSignalDone = "Done";
const EvaluationSignalYieldNow = "Yield";
const runtimeFiberVariance = {
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _A: (_) => _
};
const absurd = (_) => {
  throw new Error(`BUG: FiberRuntime - ${toStringUnknown(_)} - please report an issue at https://github.com/Effect-TS/effect/issues`);
};
const YieldedOp = /* @__PURE__ */ Symbol.for("effect/internal/fiberRuntime/YieldedOp");
const yieldedOpChannel = /* @__PURE__ */ globalValue("effect/internal/fiberRuntime/yieldedOpChannel", () => ({
  currentOp: null
}));
const contOpSuccess = {
  [OP_ON_SUCCESS]: (_, cont, value2) => {
    return internalCall(() => cont.effect_instruction_i1(value2));
  },
  ["OnStep"]: (_, _cont, value2) => {
    return exitSucceed(exitSucceed(value2));
  },
  [OP_ON_SUCCESS_AND_FAILURE]: (_, cont, value2) => {
    return internalCall(() => cont.effect_instruction_i2(value2));
  },
  [OP_REVERT_FLAGS]: (self, cont, value2) => {
    self.patchRuntimeFlags(self.currentRuntimeFlags, cont.patch);
    if (interruptible$2(self.currentRuntimeFlags) && self.isInterrupted()) {
      return exitFailCause(self.getInterruptedCause());
    } else {
      return exitSucceed(value2);
    }
  },
  [OP_WHILE]: (self, cont, value2) => {
    internalCall(() => cont.effect_instruction_i2(value2));
    if (internalCall(() => cont.effect_instruction_i0())) {
      self.pushStack(cont);
      return internalCall(() => cont.effect_instruction_i1());
    } else {
      return void_$2;
    }
  },
  [OP_ITERATOR]: (self, cont, value2) => {
    const state = internalCall(() => cont.effect_instruction_i0.next(value2));
    if (state.done) return exitSucceed(state.value);
    self.pushStack(cont);
    return yieldWrapGet(state.value);
  }
};
const drainQueueWhileRunningTable = {
  [OP_INTERRUPT_SIGNAL]: (self, runtimeFlags2, cur, message) => {
    self.processNewInterruptSignal(message.cause);
    return interruptible$2(runtimeFlags2) ? exitFailCause(message.cause) : cur;
  },
  [OP_RESUME]: (_self, _runtimeFlags, _cur, _message) => {
    throw new Error("It is illegal to have multiple concurrent run loops in a single fiber");
  },
  [OP_STATEFUL]: (self, runtimeFlags2, cur, message) => {
    message.onFiber(self, running(runtimeFlags2));
    return cur;
  },
  [OP_YIELD_NOW]: (_self, _runtimeFlags, cur, _message) => {
    return flatMap$5(yieldNow$1(), () => cur);
  }
};
const runBlockedRequests = (self) => forEachSequentialDiscard(flatten$6(self), (requestsByRequestResolver) => forEachConcurrentDiscard(sequentialCollectionToChunk(requestsByRequestResolver), ([dataSource, sequential2]) => {
  const map2 = /* @__PURE__ */ new Map();
  const arr = [];
  for (const block of sequential2) {
    arr.push(toReadonlyArray(block));
    for (const entry of block) {
      map2.set(entry.request, entry);
    }
  }
  const flat = arr.flat();
  return fiberRefLocally(invokeWithInterrupt(dataSource.runAll(arr), flat, () => flat.forEach((entry) => {
    entry.listeners.interrupted = true;
  })), currentRequestMap, map2);
}, false, false));
const _version = /* @__PURE__ */ getCurrentVersion();
class FiberRuntime extends Class$2 {
  [FiberTypeId] = fiberVariance;
  [RuntimeFiberTypeId] = runtimeFiberVariance;
  _fiberRefs;
  _fiberId;
  _queue = /* @__PURE__ */ new Array();
  _children = null;
  _observers = /* @__PURE__ */ new Array();
  _running = false;
  _stack = [];
  _asyncInterruptor = null;
  _asyncBlockingOn = null;
  _exitValue = null;
  _steps = [];
  _isYielding = false;
  currentRuntimeFlags;
  currentOpCount = 0;
  currentSupervisor;
  currentScheduler;
  currentTracer;
  currentSpan;
  currentContext;
  currentDefaultServices;
  constructor(fiberId2, fiberRefs0, runtimeFlags0) {
    super();
    this.currentRuntimeFlags = runtimeFlags0;
    this._fiberId = fiberId2;
    this._fiberRefs = fiberRefs0;
    if (runtimeMetrics(runtimeFlags0)) {
      const tags = this.getFiberRef(currentMetricLabels);
      fiberStarted.unsafeUpdate(1, tags);
      fiberActive.unsafeUpdate(1, tags);
    }
    this.refreshRefCache();
  }
  commit() {
    return join$1(this);
  }
  /**
   * The identity of the fiber.
   */
  id() {
    return this._fiberId;
  }
  /**
   * Begins execution of the effect associated with this fiber on in the
   * background. This can be called to "kick off" execution of a fiber after
   * it has been created.
   */
  resume(effect2) {
    this.tell(resume(effect2));
  }
  /**
   * The status of the fiber.
   */
  get status() {
    return this.ask((_, status) => status);
  }
  /**
   * Gets the fiber runtime flags.
   */
  get runtimeFlags() {
    return this.ask((state, status) => {
      if (isDone$2(status)) {
        return state.currentRuntimeFlags;
      }
      return status.runtimeFlags;
    });
  }
  /**
   * Returns the current `FiberScope` for the fiber.
   */
  scope() {
    return unsafeMake$3(this);
  }
  /**
   * Retrieves the immediate children of the fiber.
   */
  get children() {
    return this.ask((fiber) => Array.from(fiber.getChildren()));
  }
  /**
   * Gets the fiber's set of children.
   */
  getChildren() {
    if (this._children === null) {
      this._children = /* @__PURE__ */ new Set();
    }
    return this._children;
  }
  /**
   * Retrieves the interrupted cause of the fiber, which will be `Cause.empty`
   * if the fiber has not been interrupted.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  getInterruptedCause() {
    return this.getFiberRef(currentInterruptedCause);
  }
  /**
   * Retrieves the whole set of fiber refs.
   */
  fiberRefs() {
    return this.ask((fiber) => fiber.getFiberRefs());
  }
  /**
   * Returns an effect that will contain information computed from the fiber
   * state and status while running on the fiber.
   *
   * This allows the outside world to interact safely with mutable fiber state
   * without locks or immutable data.
   */
  ask(f) {
    return suspend$6(() => {
      const deferred = deferredUnsafeMake(this._fiberId);
      this.tell(stateful((fiber, status) => {
        deferredUnsafeDone(deferred, sync$4(() => f(fiber, status)));
      }));
      return deferredAwait(deferred);
    });
  }
  /**
   * Adds a message to be processed by the fiber on the fiber.
   */
  tell(message) {
    this._queue.push(message);
    if (!this._running) {
      this._running = true;
      this.drainQueueLaterOnExecutor();
    }
  }
  get await() {
    return async_((resume2) => {
      const cb = (exit2) => resume2(succeed$b(exit2));
      this.tell(stateful((fiber, _) => {
        if (fiber._exitValue !== null) {
          cb(this._exitValue);
        } else {
          fiber.addObserver(cb);
        }
      }));
      return sync$4(() => this.tell(stateful((fiber, _) => {
        fiber.removeObserver(cb);
      })));
    }, this.id());
  }
  get inheritAll() {
    return withFiberRuntime$1((parentFiber, parentStatus) => {
      const parentFiberId = parentFiber.id();
      const parentFiberRefs = parentFiber.getFiberRefs();
      const parentRuntimeFlags = parentStatus.runtimeFlags;
      const childFiberRefs = this.getFiberRefs();
      const updatedFiberRefs = joinAs(parentFiberRefs, parentFiberId, childFiberRefs);
      parentFiber.setFiberRefs(updatedFiberRefs);
      const updatedRuntimeFlags = parentFiber.getFiberRef(currentRuntimeFlags);
      const patch2 = pipe(
        diff$3(parentRuntimeFlags, updatedRuntimeFlags),
        // Do not inherit WindDown or Interruption!
        exclude(Interruption),
        exclude(WindDown)
      );
      return updateRuntimeFlags(patch2);
    });
  }
  /**
   * Tentatively observes the fiber, but returns immediately if it is not
   * already done.
   */
  get poll() {
    return sync$4(() => fromNullable(this._exitValue));
  }
  /**
   * Unsafely observes the fiber, but returns immediately if it is not
   * already done.
   */
  unsafePoll() {
    return this._exitValue;
  }
  /**
   * In the background, interrupts the fiber as if interrupted from the specified fiber.
   */
  interruptAsFork(fiberId2) {
    return sync$4(() => this.tell(interruptSignal(interrupt$4(fiberId2))));
  }
  /**
   * In the background, interrupts the fiber as if interrupted from the specified fiber.
   */
  unsafeInterruptAsFork(fiberId2) {
    this.tell(interruptSignal(interrupt$4(fiberId2)));
  }
  /**
   * Adds an observer to the list of observers.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  addObserver(observer) {
    if (this._exitValue !== null) {
      observer(this._exitValue);
    } else {
      this._observers.push(observer);
    }
  }
  /**
   * Removes the specified observer from the list of observers that will be
   * notified when the fiber exits.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  removeObserver(observer) {
    this._observers = this._observers.filter((o) => o !== observer);
  }
  /**
   * Retrieves all fiber refs of the fiber.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  getFiberRefs() {
    this.setFiberRef(currentRuntimeFlags, this.currentRuntimeFlags);
    return this._fiberRefs;
  }
  /**
   * Deletes the specified fiber ref.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  unsafeDeleteFiberRef(fiberRef) {
    this._fiberRefs = delete_(this._fiberRefs, fiberRef);
  }
  /**
   * Retrieves the state of the fiber ref, or else its initial value.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  getFiberRef(fiberRef) {
    if (this._fiberRefs.locals.has(fiberRef)) {
      return this._fiberRefs.locals.get(fiberRef)[0][1];
    }
    return fiberRef.initial;
  }
  /**
   * Sets the fiber ref to the specified value.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  setFiberRef(fiberRef, value2) {
    this._fiberRefs = updateAs(this._fiberRefs, {
      fiberId: this._fiberId,
      fiberRef,
      value: value2
    });
    this.refreshRefCache();
  }
  refreshRefCache() {
    this.currentDefaultServices = this.getFiberRef(currentServices);
    this.currentTracer = this.currentDefaultServices.unsafeMap.get(tracerTag.key);
    this.currentSupervisor = this.getFiberRef(currentSupervisor);
    this.currentScheduler = this.getFiberRef(currentScheduler);
    this.currentContext = this.getFiberRef(currentContext$1);
    this.currentSpan = this.currentContext.unsafeMap.get(spanTag.key);
  }
  /**
   * Wholesale replaces all fiber refs of this fiber.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  setFiberRefs(fiberRefs2) {
    this._fiberRefs = fiberRefs2;
    this.refreshRefCache();
  }
  /**
   * Adds a reference to the specified fiber inside the children set.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  addChild(child) {
    this.getChildren().add(child);
  }
  /**
   * Removes a reference to the specified fiber inside the children set.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  removeChild(child) {
    this.getChildren().delete(child);
  }
  /**
   * Transfers all children of this fiber that are currently running to the
   * specified fiber scope.
   *
   * **NOTE**: This method must be invoked by the fiber itself after it has
   * evaluated the effects but prior to exiting.
   */
  transferChildren(scope2) {
    const children = this._children;
    this._children = null;
    if (children !== null && children.size > 0) {
      for (const child of children) {
        if (child._exitValue === null) {
          scope2.add(this.currentRuntimeFlags, child);
        }
      }
    }
  }
  /**
   * On the current thread, executes all messages in the fiber's inbox. This
   * method may return before all work is done, in the event the fiber executes
   * an asynchronous operation.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  drainQueueOnCurrentThread() {
    let recurse = true;
    while (recurse) {
      let evaluationSignal = EvaluationSignalContinue;
      const prev = globalThis[currentFiberURI];
      globalThis[currentFiberURI] = this;
      try {
        while (evaluationSignal === EvaluationSignalContinue) {
          evaluationSignal = this._queue.length === 0 ? EvaluationSignalDone : this.evaluateMessageWhileSuspended(this._queue.splice(0, 1)[0]);
        }
      } finally {
        this._running = false;
        globalThis[currentFiberURI] = prev;
      }
      if (this._queue.length > 0 && !this._running) {
        this._running = true;
        if (evaluationSignal === EvaluationSignalYieldNow) {
          this.drainQueueLaterOnExecutor();
          recurse = false;
        } else {
          recurse = true;
        }
      } else {
        recurse = false;
      }
    }
  }
  /**
   * Schedules the execution of all messages in the fiber's inbox.
   *
   * This method will return immediately after the scheduling
   * operation is completed, but potentially before such messages have been
   * executed.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  drainQueueLaterOnExecutor() {
    this.currentScheduler.scheduleTask(this.run, this.getFiberRef(currentSchedulingPriority));
  }
  /**
   * Drains the fiber's message queue while the fiber is actively running,
   * returning the next effect to execute, which may be the input effect if no
   * additional effect needs to be executed.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  drainQueueWhileRunning(runtimeFlags2, cur0) {
    let cur = cur0;
    while (this._queue.length > 0) {
      const message = this._queue.splice(0, 1)[0];
      cur = drainQueueWhileRunningTable[message._tag](this, runtimeFlags2, cur, message);
    }
    return cur;
  }
  /**
   * Determines if the fiber is interrupted.
   *
   * **NOTE**: This method is safe to invoke on any fiber, but if not invoked
   * on this fiber, then values derived from the fiber's state (including the
   * log annotations and log level) may not be up-to-date.
   */
  isInterrupted() {
    return !isEmpty$5(this.getFiberRef(currentInterruptedCause));
  }
  /**
   * Adds an interruptor to the set of interruptors that are interrupting this
   * fiber.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  addInterruptedCause(cause) {
    const oldSC = this.getFiberRef(currentInterruptedCause);
    this.setFiberRef(currentInterruptedCause, sequential$2(oldSC, cause));
  }
  /**
   * Processes a new incoming interrupt signal.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  processNewInterruptSignal(cause) {
    this.addInterruptedCause(cause);
    this.sendInterruptSignalToAllChildren();
  }
  /**
   * Interrupts all children of the current fiber, returning an effect that will
   * await the exit of the children. This method will return null if the fiber
   * has no children.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  sendInterruptSignalToAllChildren() {
    if (this._children === null || this._children.size === 0) {
      return false;
    }
    let told = false;
    for (const child of this._children) {
      child.tell(interruptSignal(interrupt$4(this.id())));
      told = true;
    }
    return told;
  }
  /**
   * Interrupts all children of the current fiber, returning an effect that will
   * await the exit of the children. This method will return null if the fiber
   * has no children.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  interruptAllChildren() {
    if (this.sendInterruptSignalToAllChildren()) {
      const it = this._children.values();
      this._children = null;
      let isDone2 = false;
      const body = () => {
        const next = it.next();
        if (!next.done) {
          return asVoid$1(next.value.await);
        } else {
          return sync$4(() => {
            isDone2 = true;
          });
        }
      };
      return whileLoop({
        while: () => !isDone2,
        body,
        step: () => {
        }
      });
    }
    return null;
  }
  reportExitValue(exit2) {
    if (runtimeMetrics(this.currentRuntimeFlags)) {
      const tags = this.getFiberRef(currentMetricLabels);
      const startTimeMillis = this.id().startTimeMillis;
      const endTimeMillis = Date.now();
      fiberLifetimes.unsafeUpdate(endTimeMillis - startTimeMillis, tags);
      fiberActive.unsafeUpdate(-1, tags);
      switch (exit2._tag) {
        case OP_SUCCESS: {
          fiberSuccesses.unsafeUpdate(1, tags);
          break;
        }
        case OP_FAILURE: {
          fiberFailures.unsafeUpdate(1, tags);
          break;
        }
      }
    }
    if (exit2._tag === "Failure") {
      const level = this.getFiberRef(currentUnhandledErrorLogLevel);
      if (!isInterruptedOnly(exit2.cause) && level._tag === "Some") {
        this.log("Fiber terminated with an unhandled error", exit2.cause, level);
      }
    }
  }
  setExitValue(exit2) {
    this._exitValue = exit2;
    this.reportExitValue(exit2);
    for (let i = this._observers.length - 1; i >= 0; i--) {
      this._observers[i](exit2);
    }
    this._observers = [];
  }
  getLoggers() {
    return this.getFiberRef(currentLoggers);
  }
  log(message, cause, overrideLogLevel) {
    const logLevel = isSome(overrideLogLevel) ? overrideLogLevel.value : this.getFiberRef(currentLogLevel);
    const minimumLogLevel2 = this.getFiberRef(currentMinimumLogLevel);
    if (greaterThan(minimumLogLevel2, logLevel)) {
      return;
    }
    const spans = this.getFiberRef(currentLogSpan);
    const annotations2 = this.getFiberRef(currentLogAnnotations);
    const loggers = this.getLoggers();
    const contextMap = this.getFiberRefs();
    if (size$3(loggers) > 0) {
      const clockService = get$9(this.getFiberRef(currentServices), clockTag);
      const date = new Date(clockService.unsafeCurrentTimeMillis());
      withRedactableContext(contextMap, () => {
        for (const logger of loggers) {
          logger.log({
            fiberId: this.id(),
            logLevel,
            message,
            cause,
            context: contextMap,
            spans,
            annotations: annotations2,
            date
          });
        }
      });
    }
  }
  /**
   * Evaluates a single message on the current thread, while the fiber is
   * suspended. This method should only be called while evaluation of the
   * fiber's effect is suspended due to an asynchronous operation.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  evaluateMessageWhileSuspended(message) {
    switch (message._tag) {
      case OP_YIELD_NOW: {
        return EvaluationSignalYieldNow;
      }
      case OP_INTERRUPT_SIGNAL: {
        this.processNewInterruptSignal(message.cause);
        if (this._asyncInterruptor !== null) {
          this._asyncInterruptor(exitFailCause(message.cause));
          this._asyncInterruptor = null;
        }
        return EvaluationSignalContinue;
      }
      case OP_RESUME: {
        this._asyncInterruptor = null;
        this._asyncBlockingOn = null;
        this.evaluateEffect(message.effect);
        return EvaluationSignalContinue;
      }
      case OP_STATEFUL: {
        message.onFiber(this, this._exitValue !== null ? done$2 : suspended(this.currentRuntimeFlags, this._asyncBlockingOn));
        return EvaluationSignalContinue;
      }
      default: {
        return absurd(message);
      }
    }
  }
  /**
   * Evaluates an effect until completion, potentially asynchronously.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  evaluateEffect(effect0) {
    this.currentSupervisor.onResume(this);
    try {
      let effect2 = interruptible$2(this.currentRuntimeFlags) && this.isInterrupted() ? exitFailCause(this.getInterruptedCause()) : effect0;
      while (effect2 !== null) {
        const eff = effect2;
        const exit2 = this.runLoop(eff);
        if (exit2 === YieldedOp) {
          const op = yieldedOpChannel.currentOp;
          yieldedOpChannel.currentOp = null;
          if (op._op === OP_YIELD$1) {
            if (cooperativeYielding(this.currentRuntimeFlags)) {
              this.tell(yieldNow());
              this.tell(resume(exitVoid));
              effect2 = null;
            } else {
              effect2 = exitVoid;
            }
          } else if (op._op === OP_ASYNC) {
            effect2 = null;
          }
        } else {
          this.currentRuntimeFlags = pipe(this.currentRuntimeFlags, enable$1(WindDown));
          const interruption2 = this.interruptAllChildren();
          if (interruption2 !== null) {
            effect2 = flatMap$5(interruption2, () => exit2);
          } else {
            if (this._queue.length === 0) {
              this.setExitValue(exit2);
            } else {
              this.tell(resume(exit2));
            }
            effect2 = null;
          }
        }
      }
    } finally {
      this.currentSupervisor.onSuspend(this);
    }
  }
  /**
   * Begins execution of the effect associated with this fiber on the current
   * thread. This can be called to "kick off" execution of a fiber after it has
   * been created, in hopes that the effect can be executed synchronously.
   *
   * This is not the normal way of starting a fiber, but it is useful when the
   * express goal of executing the fiber is to synchronously produce its exit.
   */
  start(effect2) {
    if (!this._running) {
      this._running = true;
      const prev = globalThis[currentFiberURI];
      globalThis[currentFiberURI] = this;
      try {
        this.evaluateEffect(effect2);
      } finally {
        this._running = false;
        globalThis[currentFiberURI] = prev;
        if (this._queue.length > 0) {
          this.drainQueueLaterOnExecutor();
        }
      }
    } else {
      this.tell(resume(effect2));
    }
  }
  /**
   * Begins execution of the effect associated with this fiber on in the
   * background, and on the correct thread pool. This can be called to "kick
   * off" execution of a fiber after it has been created, in hopes that the
   * effect can be executed synchronously.
   */
  startFork(effect2) {
    this.tell(resume(effect2));
  }
  /**
   * Takes the current runtime flags, patches them to return the new runtime
   * flags, and then makes any changes necessary to fiber state based on the
   * specified patch.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  patchRuntimeFlags(oldRuntimeFlags, patch2) {
    const newRuntimeFlags = patch$4(oldRuntimeFlags, patch2);
    globalThis[currentFiberURI] = this;
    this.currentRuntimeFlags = newRuntimeFlags;
    return newRuntimeFlags;
  }
  /**
   * Initiates an asynchronous operation, by building a callback that will
   * resume execution, and then feeding that callback to the registration
   * function, handling error cases and repeated resumptions appropriately.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  initiateAsync(runtimeFlags2, asyncRegister) {
    let alreadyCalled = false;
    const callback = (effect2) => {
      if (!alreadyCalled) {
        alreadyCalled = true;
        this.tell(resume(effect2));
      }
    };
    if (interruptible$2(runtimeFlags2)) {
      this._asyncInterruptor = callback;
    }
    try {
      asyncRegister(callback);
    } catch (e) {
      callback(failCause$5(die$4(e)));
    }
  }
  pushStack(cont) {
    this._stack.push(cont);
    if (cont._op === "OnStep") {
      this._steps.push({
        refs: this.getFiberRefs(),
        flags: this.currentRuntimeFlags
      });
    }
  }
  popStack() {
    const item = this._stack.pop();
    if (item) {
      if (item._op === "OnStep") {
        this._steps.pop();
      }
      return item;
    }
    return;
  }
  getNextSuccessCont() {
    let frame = this.popStack();
    while (frame) {
      if (frame._op !== OP_ON_FAILURE) {
        return frame;
      }
      frame = this.popStack();
    }
  }
  getNextFailCont() {
    let frame = this.popStack();
    while (frame) {
      if (frame._op !== OP_ON_SUCCESS && frame._op !== OP_WHILE && frame._op !== OP_ITERATOR) {
        return frame;
      }
      frame = this.popStack();
    }
  }
  [OP_TAG](op) {
    return sync$4(() => unsafeGet$1(this.currentContext, op));
  }
  ["Left"](op) {
    return fail$8(op.left);
  }
  ["None"](_) {
    return fail$8(new NoSuchElementException());
  }
  ["Right"](op) {
    return exitSucceed(op.right);
  }
  ["Some"](op) {
    return exitSucceed(op.value);
  }
  ["Micro"](op) {
    return unsafeAsync((microResume) => {
      let resume2 = microResume;
      const fiber = runFork$2(provideContext$1(op, this.currentContext));
      fiber.addObserver((exit2) => {
        if (exit2._tag === "Success") {
          return resume2(exitSucceed(exit2.value));
        }
        switch (exit2.cause._tag) {
          case "Interrupt": {
            return resume2(exitFailCause(interrupt$4(none$4)));
          }
          case "Fail": {
            return resume2(fail$8(exit2.cause.error));
          }
          case "Die": {
            return resume2(die$3(exit2.cause.defect));
          }
        }
      });
      return unsafeAsync((abortResume) => {
        resume2 = (_) => {
          abortResume(void_$2);
        };
        fiber.unsafeInterrupt();
      });
    });
  }
  [OP_SYNC](op) {
    const value2 = internalCall(() => op.effect_instruction_i0());
    const cont = this.getNextSuccessCont();
    if (cont !== void 0) {
      if (!(cont._op in contOpSuccess)) {
        absurd(cont);
      }
      return contOpSuccess[cont._op](this, cont, value2);
    } else {
      yieldedOpChannel.currentOp = exitSucceed(value2);
      return YieldedOp;
    }
  }
  [OP_SUCCESS](op) {
    const oldCur = op;
    const cont = this.getNextSuccessCont();
    if (cont !== void 0) {
      if (!(cont._op in contOpSuccess)) {
        absurd(cont);
      }
      return contOpSuccess[cont._op](this, cont, oldCur.effect_instruction_i0);
    } else {
      yieldedOpChannel.currentOp = oldCur;
      return YieldedOp;
    }
  }
  [OP_FAILURE](op) {
    const cause = op.effect_instruction_i0;
    const cont = this.getNextFailCont();
    if (cont !== void 0) {
      switch (cont._op) {
        case OP_ON_FAILURE:
        case OP_ON_SUCCESS_AND_FAILURE: {
          if (!(interruptible$2(this.currentRuntimeFlags) && this.isInterrupted())) {
            return internalCall(() => cont.effect_instruction_i1(cause));
          } else {
            return exitFailCause(stripFailures(cause));
          }
        }
        case "OnStep": {
          if (!(interruptible$2(this.currentRuntimeFlags) && this.isInterrupted())) {
            return exitSucceed(exitFailCause(cause));
          } else {
            return exitFailCause(stripFailures(cause));
          }
        }
        case OP_REVERT_FLAGS: {
          this.patchRuntimeFlags(this.currentRuntimeFlags, cont.patch);
          if (interruptible$2(this.currentRuntimeFlags) && this.isInterrupted()) {
            return exitFailCause(sequential$2(cause, this.getInterruptedCause()));
          } else {
            return exitFailCause(cause);
          }
        }
        default: {
          absurd(cont);
        }
      }
    } else {
      yieldedOpChannel.currentOp = exitFailCause(cause);
      return YieldedOp;
    }
  }
  [OP_WITH_RUNTIME](op) {
    return internalCall(() => op.effect_instruction_i0(this, running(this.currentRuntimeFlags)));
  }
  ["Blocked"](op) {
    const refs = this.getFiberRefs();
    const flags = this.currentRuntimeFlags;
    if (this._steps.length > 0) {
      const frames = [];
      const snap = this._steps[this._steps.length - 1];
      let frame = this.popStack();
      while (frame && frame._op !== "OnStep") {
        frames.push(frame);
        frame = this.popStack();
      }
      this.setFiberRefs(snap.refs);
      this.currentRuntimeFlags = snap.flags;
      const patchRefs = diff$1(snap.refs, refs);
      const patchFlags = diff$3(snap.flags, flags);
      return exitSucceed(blocked(op.effect_instruction_i0, withFiberRuntime$1((newFiber) => {
        while (frames.length > 0) {
          newFiber.pushStack(frames.pop());
        }
        newFiber.setFiberRefs(patch$1(newFiber.id(), newFiber.getFiberRefs())(patchRefs));
        newFiber.currentRuntimeFlags = patch$4(patchFlags)(newFiber.currentRuntimeFlags);
        return op.effect_instruction_i1;
      })));
    }
    return uninterruptibleMask$1((restore) => flatMap$5(forkDaemon$1(runRequestBlock(op.effect_instruction_i0)), () => restore(op.effect_instruction_i1)));
  }
  ["RunBlocked"](op) {
    return runBlockedRequests(op.effect_instruction_i0);
  }
  [OP_UPDATE_RUNTIME_FLAGS](op) {
    const updateFlags = op.effect_instruction_i0;
    const oldRuntimeFlags = this.currentRuntimeFlags;
    const newRuntimeFlags = patch$4(oldRuntimeFlags, updateFlags);
    if (interruptible$2(newRuntimeFlags) && this.isInterrupted()) {
      return exitFailCause(this.getInterruptedCause());
    } else {
      this.patchRuntimeFlags(this.currentRuntimeFlags, updateFlags);
      if (op.effect_instruction_i1) {
        const revertFlags = diff$3(newRuntimeFlags, oldRuntimeFlags);
        this.pushStack(new RevertFlags(revertFlags, op));
        return internalCall(() => op.effect_instruction_i1(oldRuntimeFlags));
      } else {
        return exitVoid;
      }
    }
  }
  [OP_ON_SUCCESS](op) {
    this.pushStack(op);
    return op.effect_instruction_i0;
  }
  ["OnStep"](op) {
    this.pushStack(op);
    return op.effect_instruction_i0;
  }
  [OP_ON_FAILURE](op) {
    this.pushStack(op);
    return op.effect_instruction_i0;
  }
  [OP_ON_SUCCESS_AND_FAILURE](op) {
    this.pushStack(op);
    return op.effect_instruction_i0;
  }
  [OP_ASYNC](op) {
    this._asyncBlockingOn = op.effect_instruction_i1;
    this.initiateAsync(this.currentRuntimeFlags, op.effect_instruction_i0);
    yieldedOpChannel.currentOp = op;
    return YieldedOp;
  }
  [OP_YIELD$1](op) {
    this._isYielding = false;
    yieldedOpChannel.currentOp = op;
    return YieldedOp;
  }
  [OP_WHILE](op) {
    const check2 = op.effect_instruction_i0;
    const body = op.effect_instruction_i1;
    if (check2()) {
      this.pushStack(op);
      return body();
    } else {
      return exitVoid;
    }
  }
  [OP_ITERATOR](op) {
    return contOpSuccess[OP_ITERATOR](this, op, void 0);
  }
  [OP_COMMIT](op) {
    return internalCall(() => op.commit());
  }
  /**
   * The main run-loop for evaluating effects.
   *
   * **NOTE**: This method must be invoked by the fiber itself.
   */
  runLoop(effect0) {
    let cur = effect0;
    this.currentOpCount = 0;
    while (true) {
      if ((this.currentRuntimeFlags & OpSupervision) !== 0) {
        this.currentSupervisor.onEffect(this, cur);
      }
      if (this._queue.length > 0) {
        cur = this.drainQueueWhileRunning(this.currentRuntimeFlags, cur);
      }
      if (!this._isYielding) {
        this.currentOpCount += 1;
        const shouldYield = this.currentScheduler.shouldYield(this);
        if (shouldYield !== false) {
          this._isYielding = true;
          this.currentOpCount = 0;
          const oldCur = cur;
          cur = flatMap$5(yieldNow$1({
            priority: shouldYield
          }), () => oldCur);
        }
      }
      try {
        cur = this.currentTracer.context(() => {
          if (_version !== cur[EffectTypeId]._V) {
            const level = this.getFiberRef(currentVersionMismatchErrorLogLevel);
            if (level._tag === "Some") {
              const effectVersion = cur[EffectTypeId]._V;
              this.log(`Executing an Effect versioned ${effectVersion} with a Runtime of version ${getCurrentVersion()}, you may want to dedupe the effect dependencies, you can use the language service plugin to detect this at compile time: https://github.com/Effect-TS/language-service`, empty$g, level);
            }
          }
          return this[cur._op](cur);
        }, this);
        if (cur === YieldedOp) {
          const op = yieldedOpChannel.currentOp;
          if (op._op === OP_YIELD$1 || op._op === OP_ASYNC) {
            return YieldedOp;
          }
          yieldedOpChannel.currentOp = null;
          return op._op === OP_SUCCESS || op._op === OP_FAILURE ? op : exitFailCause(die$4(op));
        }
      } catch (e) {
        if (cur !== YieldedOp && !hasProperty(cur, "_op") || !(cur._op in this)) {
          cur = dieMessage$1(`Not a valid effect: ${toStringUnknown(cur)}`);
        } else if (isInterruptedException(e)) {
          cur = exitFailCause(sequential$2(die$4(e), interrupt$4(none$4)));
        } else {
          cur = die$3(e);
        }
      }
    }
  }
  run = () => {
    this.drainQueueOnCurrentThread();
  };
}
const currentMinimumLogLevel = /* @__PURE__ */ globalValue("effect/FiberRef/currentMinimumLogLevel", () => fiberRefUnsafeMake(fromLiteral("Info")));
const loggerWithConsoleLog = (self) => makeLogger((opts) => {
  const services = getOrDefault(opts.context, currentServices);
  get$9(services, consoleTag).unsafe.log(self.log(opts));
});
const loggerWithLeveledLog = (self) => makeLogger((opts) => {
  const services = getOrDefault(opts.context, currentServices);
  const unsafeLogger = get$9(services, consoleTag).unsafe;
  switch (opts.logLevel._tag) {
    case "Debug":
      return unsafeLogger.debug(self.log(opts));
    case "Info":
      return unsafeLogger.info(self.log(opts));
    case "Trace":
      return unsafeLogger.trace(self.log(opts));
    case "Warning":
      return unsafeLogger.warn(self.log(opts));
    case "Error":
    case "Fatal":
      return unsafeLogger.error(self.log(opts));
    default:
      return unsafeLogger.log(self.log(opts));
  }
});
const loggerWithConsoleError = (self) => makeLogger((opts) => {
  const services = getOrDefault(opts.context, currentServices);
  get$9(services, consoleTag).unsafe.error(self.log(opts));
});
const defaultLogger$1 = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Logger/defaultLogger"), () => loggerWithConsoleLog(stringLogger$1));
const jsonLogger$1 = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Logger/jsonLogger"), () => loggerWithConsoleLog(jsonLogger$2));
const logFmtLogger = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Logger/logFmtLogger"), () => loggerWithConsoleLog(logfmtLogger$1));
const prettyLogger$1 = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Logger/prettyLogger"), () => prettyLoggerDefault$1);
const structuredLogger$1 = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Logger/structuredLogger"), () => loggerWithConsoleLog(structuredLogger$2));
const tracerLogger$1 = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Logger/tracerLogger"), () => makeLogger(({
  annotations: annotations2,
  cause,
  context: context2,
  fiberId: fiberId2,
  logLevel,
  message
}) => {
  const span2 = getOption(getOrDefault$1(context2, currentContext$1), spanTag);
  if (span2._tag === "None" || span2.value._tag === "ExternalSpan") {
    return;
  }
  const clockService = unsafeGet$1(getOrDefault$1(context2, currentServices), clockTag);
  const attributes = {};
  for (const [key, value2] of annotations2) {
    attributes[key] = value2;
  }
  attributes["effect.fiberId"] = threadName(fiberId2);
  attributes["effect.logLevel"] = logLevel.label;
  if (cause !== null && cause._tag !== "Empty") {
    attributes["effect.cause"] = pretty$2(cause, {
      renderErrorCause: true
    });
  }
  span2.value.event(toStringUnknown(Array.isArray(message) ? message[0] : message), clockService.unsafeCurrentTimeNanos(), attributes);
}));
const loggerWithSpanAnnotations = (self) => mapInputOptions$1(self, (options) => {
  const span2 = flatMap$9(get$4(options.context, currentContext$1), getOption(spanTag));
  if (span2._tag === "None") {
    return options;
  }
  return {
    ...options,
    annotations: pipe(options.annotations, set$2("effect.traceId", span2.value.traceId), set$2("effect.spanId", span2.value.spanId), span2.value._tag === "Span" ? set$2("effect.spanName", span2.value.name) : identity)
  };
});
const currentLoggers = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/FiberRef/currentLoggers"), () => fiberRefUnsafeMakeHashSet(make$v(defaultLogger$1, tracerLogger$1)));
const batchedLogger = /* @__PURE__ */ dual(3, (self, window, f) => flatMap$5(scope$1, (scope2) => {
  let buffer = [];
  const flush = suspend$6(() => {
    if (buffer.length === 0) {
      return void_$2;
    }
    const arr = buffer;
    buffer = [];
    return f(arr);
  });
  return uninterruptibleMask$1((restore) => pipe(sleep(window), zipRight$5(flush), forever$1, restore, forkDaemon$1, flatMap$5((fiber) => scopeAddFinalizer(scope2, interruptFiber(fiber))), zipRight$5(addFinalizer$1(() => flush)), as$1(makeLogger((options) => {
    buffer.push(self.log(options));
  }))));
}));
const acquireRelease$1 = /* @__PURE__ */ dual((args2) => isEffect$1(args2[0]), (acquire, release) => uninterruptible$1(tap$1(acquire, (a) => addFinalizer$1((exit2) => release(a, exit2)))));
const addFinalizer$1 = (finalizer) => withFiberRuntime$1((runtime2) => {
  const acquireRefs = runtime2.getFiberRefs();
  const acquireFlags = disable$1(runtime2.currentRuntimeFlags, Interruption);
  return flatMap$5(scope$1, (scope2) => scopeAddFinalizerExit(scope2, (exit2) => withFiberRuntime$1((runtimeFinalizer) => {
    const preRefs = runtimeFinalizer.getFiberRefs();
    const preFlags = runtimeFinalizer.currentRuntimeFlags;
    const patchRefs = diff$1(preRefs, acquireRefs);
    const patchFlags = diff$3(preFlags, acquireFlags);
    const inverseRefs = diff$1(acquireRefs, preRefs);
    runtimeFinalizer.setFiberRefs(patch$1(patchRefs, runtimeFinalizer.id(), acquireRefs));
    return ensuring$2(withRuntimeFlags(finalizer(exit2), patchFlags), sync$4(() => {
      runtimeFinalizer.setFiberRefs(patch$1(inverseRefs, runtimeFinalizer.id(), runtimeFinalizer.getFiberRefs()));
    }));
  })));
});
const allResolveInput = (input) => {
  if (Array.isArray(input) || isIterable(input)) {
    return [input, none$6()];
  }
  const keys2 = Object.keys(input);
  const size2 = keys2.length;
  return [keys2.map((k) => input[k]), some((values) => {
    const res = {};
    for (let i = 0; i < size2; i++) {
      res[keys2[i]] = values[i];
    }
    return res;
  })];
};
const allValidate = (effects, reconcile, options) => {
  const eitherEffects = [];
  for (const effect2 of effects) {
    eitherEffects.push(either$1(effect2));
  }
  return flatMap$5(forEach$1(eitherEffects, identity, {
    concurrency: options?.concurrency,
    batching: options?.batching,
    concurrentFinalizers: options?.concurrentFinalizers
  }), (eithers) => {
    const none2 = none$6();
    const size2 = eithers.length;
    const errors = new Array(size2);
    const successes = new Array(size2);
    let errored = false;
    for (let i = 0; i < size2; i++) {
      const either2 = eithers[i];
      if (either2._tag === "Left") {
        errors[i] = some(either2.left);
        errored = true;
      } else {
        successes[i] = either2.right;
        errors[i] = none2;
      }
    }
    if (errored) {
      return reconcile._tag === "Some" ? fail$8(reconcile.value(errors)) : fail$8(errors);
    } else if (options?.discard) {
      return void_$2;
    }
    return reconcile._tag === "Some" ? succeed$b(reconcile.value(successes)) : succeed$b(successes);
  });
};
const allEither = (effects, reconcile, options) => {
  const eitherEffects = [];
  for (const effect2 of effects) {
    eitherEffects.push(either$1(effect2));
  }
  if (options?.discard) {
    return forEach$1(eitherEffects, identity, {
      concurrency: options?.concurrency,
      batching: options?.batching,
      discard: true,
      concurrentFinalizers: options?.concurrentFinalizers
    });
  }
  return map$a(forEach$1(eitherEffects, identity, {
    concurrency: options?.concurrency,
    batching: options?.batching,
    concurrentFinalizers: options?.concurrentFinalizers
  }), (eithers) => reconcile._tag === "Some" ? reconcile.value(eithers) : eithers);
};
const all$1 = (arg, options) => {
  const [effects, reconcile] = allResolveInput(arg);
  if (options?.mode === "validate") {
    return allValidate(effects, reconcile, options);
  } else if (options?.mode === "either") {
    return allEither(effects, reconcile, options);
  }
  return options?.discard !== true && reconcile._tag === "Some" ? map$a(forEach$1(effects, identity, options), reconcile.value) : forEach$1(effects, identity, options);
};
const forEach$1 = /* @__PURE__ */ dual((args2) => isIterable(args2[0]), (self, f, options) => withFiberRuntime$1((r) => {
  const isRequestBatchingEnabled = options?.batching === true || options?.batching === "inherit" && r.getFiberRef(currentRequestBatching);
  if (options?.discard) {
    return match$5(options.concurrency, () => finalizersMaskInternal(sequential, options?.concurrentFinalizers)((restore) => isRequestBatchingEnabled ? forEachConcurrentDiscard(self, (a, i) => restore(f(a, i)), true, false, 1) : forEachSequentialDiscard(self, (a, i) => restore(f(a, i)))), () => finalizersMaskInternal(parallel, options?.concurrentFinalizers)((restore) => forEachConcurrentDiscard(self, (a, i) => restore(f(a, i)), isRequestBatchingEnabled, false)), (n) => finalizersMaskInternal(parallelN(n), options?.concurrentFinalizers)((restore) => forEachConcurrentDiscard(self, (a, i) => restore(f(a, i)), isRequestBatchingEnabled, false, n)));
  }
  return match$5(options?.concurrency, () => finalizersMaskInternal(sequential, options?.concurrentFinalizers)((restore) => isRequestBatchingEnabled ? forEachParN(self, 1, (a, i) => restore(f(a, i)), true) : forEachSequential(self, (a, i) => restore(f(a, i)))), () => finalizersMaskInternal(parallel, options?.concurrentFinalizers)((restore) => forEachParUnbounded(self, (a, i) => restore(f(a, i)), isRequestBatchingEnabled)), (n) => finalizersMaskInternal(parallelN(n), options?.concurrentFinalizers)((restore) => forEachParN(self, n, (a, i) => restore(f(a, i)), isRequestBatchingEnabled)));
}));
const forEachParUnbounded = (self, f, batching) => suspend$6(() => {
  const as2 = fromIterable$6(self);
  const array2 = new Array(as2.length);
  const fn2 = (a, i) => flatMap$5(f(a, i), (b) => sync$4(() => array2[i] = b));
  return zipRight$5(forEachConcurrentDiscard(as2, fn2, batching, false), succeed$b(array2));
});
const forEachConcurrentDiscard = (self, f, batching, processAll, n) => uninterruptibleMask$1((restore) => transplant((graft) => withFiberRuntime$1((parent) => {
  let todos = Array.from(self).reverse();
  let target = todos.length;
  if (target === 0) {
    return void_$2;
  }
  let counter2 = 0;
  let interrupted = false;
  const fibersCount = n ? Math.min(todos.length, n) : todos.length;
  const fibers = /* @__PURE__ */ new Set();
  const results = new Array();
  const interruptAll = () => fibers.forEach((fiber) => {
    fiber.currentScheduler.scheduleTask(() => {
      fiber.unsafeInterruptAsFork(parent.id());
    }, 0);
  });
  const startOrder = new Array();
  const joinOrder = new Array();
  const residual = new Array();
  const collectExits = () => {
    const exits = results.filter(({
      exit: exit2
    }) => exit2._tag === "Failure").sort((a, b) => a.index < b.index ? -1 : a.index === b.index ? 0 : 1).map(({
      exit: exit2
    }) => exit2);
    if (exits.length === 0) {
      exits.push(exitVoid);
    }
    return exits;
  };
  const runFiber = (eff, interruptImmediately = false) => {
    const runnable = uninterruptible$1(graft(eff));
    const fiber = unsafeForkUnstarted(runnable, parent, parent.currentRuntimeFlags, globalScope);
    parent.currentScheduler.scheduleTask(() => {
      if (interruptImmediately) {
        fiber.unsafeInterruptAsFork(parent.id());
      }
      fiber.resume(runnable);
    }, 0);
    return fiber;
  };
  const onInterruptSignal = () => {
    if (!processAll) {
      target -= todos.length;
      todos = [];
    }
    interrupted = true;
    interruptAll();
  };
  const stepOrExit = batching ? step : exit$1;
  const processingFiber = runFiber(async_((resume2) => {
    const pushResult = (res, index) => {
      if (res._op === "Blocked") {
        residual.push(res);
      } else {
        results.push({
          index,
          exit: res
        });
        if (res._op === "Failure" && !interrupted) {
          onInterruptSignal();
        }
      }
    };
    const next = () => {
      if (todos.length > 0) {
        const a = todos.pop();
        let index = counter2++;
        const returnNextElement = () => {
          const a2 = todos.pop();
          index = counter2++;
          return flatMap$5(yieldNow$1(), () => flatMap$5(stepOrExit(restore(f(a2, index))), onRes));
        };
        const onRes = (res) => {
          if (todos.length > 0) {
            pushResult(res, index);
            if (todos.length > 0) {
              return returnNextElement();
            }
          }
          return succeed$b(res);
        };
        const todo = flatMap$5(stepOrExit(restore(f(a, index))), onRes);
        const fiber = runFiber(todo);
        startOrder.push(fiber);
        fibers.add(fiber);
        if (interrupted) {
          fiber.currentScheduler.scheduleTask(() => {
            fiber.unsafeInterruptAsFork(parent.id());
          }, 0);
        }
        fiber.addObserver((wrapped) => {
          let exit2;
          if (wrapped._op === "Failure") {
            exit2 = wrapped;
          } else {
            exit2 = wrapped.effect_instruction_i0;
          }
          joinOrder.push(fiber);
          fibers.delete(fiber);
          pushResult(exit2, index);
          if (results.length === target) {
            resume2(succeed$b(getOrElse(exitCollectAll(collectExits(), {
              parallel: true
            }), () => exitVoid)));
          } else if (residual.length + results.length === target) {
            const exits = collectExits();
            const requests = residual.map((blocked2) => blocked2.effect_instruction_i0).reduce(par);
            resume2(succeed$b(blocked(requests, forEachConcurrentDiscard([getOrElse(exitCollectAll(exits, {
              parallel: true
            }), () => exitVoid), ...residual.map((blocked2) => blocked2.effect_instruction_i1)], (i) => i, batching, true, n))));
          } else {
            next();
          }
        });
      }
    };
    for (let i = 0; i < fibersCount; i++) {
      next();
    }
  }));
  return asVoid$1(onExit(flatten$5(restore(join$1(processingFiber))), exitMatch({
    onFailure: (cause) => {
      onInterruptSignal();
      const target2 = residual.length + 1;
      const concurrency = Math.min(typeof n === "number" ? n : residual.length, residual.length);
      const toPop = Array.from(residual);
      return async_((cb) => {
        let count = 0;
        let index = 0;
        const check2 = (index2, hitNext) => (exit2) => {
          count++;
          if (count === target2) {
            cb(exitSucceed(exitFailCause(cause)));
          }
          if (toPop.length > 0 && hitNext) {
            next();
          }
        };
        const next = () => {
          runFiber(toPop.pop(), true).addObserver(check2(index, true));
          index++;
        };
        processingFiber.addObserver(check2(index, false));
        index++;
        for (let i = 0; i < concurrency; i++) {
          next();
        }
      });
    },
    onSuccess: () => forEachSequential(joinOrder, (f2) => f2.inheritAll)
  })));
})));
const forEachParN = (self, n, f, batching) => suspend$6(() => {
  const as2 = fromIterable$6(self);
  const array2 = new Array(as2.length);
  const fn2 = (a, i) => map$a(f(a, i), (b) => array2[i] = b);
  return zipRight$5(forEachConcurrentDiscard(as2, fn2, batching, false, n), succeed$b(array2));
});
const forkDaemon$1 = (self) => forkWithScopeOverride(self, globalScope);
const unsafeFork$1 = (effect2, parentFiber, parentRuntimeFlags, overrideScope = null) => {
  const childFiber = unsafeMakeChildFiber(effect2, parentFiber, parentRuntimeFlags, overrideScope);
  childFiber.resume(effect2);
  return childFiber;
};
const unsafeForkUnstarted = (effect2, parentFiber, parentRuntimeFlags, overrideScope = null) => {
  const childFiber = unsafeMakeChildFiber(effect2, parentFiber, parentRuntimeFlags, overrideScope);
  return childFiber;
};
const unsafeMakeChildFiber = (effect2, parentFiber, parentRuntimeFlags, overrideScope = null) => {
  const childId = unsafeMake$6();
  const parentFiberRefs = parentFiber.getFiberRefs();
  const childFiberRefs = forkAs(parentFiberRefs, childId);
  const childFiber = new FiberRuntime(childId, childFiberRefs, parentRuntimeFlags);
  const childContext = getOrDefault$1(childFiberRefs, currentContext$1);
  const supervisor = childFiber.currentSupervisor;
  supervisor.onStart(childContext, effect2, some(parentFiber), childFiber);
  childFiber.addObserver((exit2) => supervisor.onEnd(exit2, childFiber));
  const parentScope = overrideScope !== null ? overrideScope : pipe(parentFiber.getFiberRef(currentForkScopeOverride), getOrElse(() => parentFiber.scope()));
  parentScope.add(parentRuntimeFlags, childFiber);
  return childFiber;
};
const forkWithScopeOverride = (self, scopeOverride) => withFiberRuntime$1((parentFiber, parentStatus) => succeed$b(unsafeFork$1(self, parentFiber, parentStatus.runtimeFlags, scopeOverride)));
const parallelFinalizers = (self) => contextWithEffect((context2) => match$9(getOption(context2, scopeTag), {
  onNone: () => self,
  onSome: (scope2) => {
    switch (scope2.strategy._tag) {
      case "Parallel":
        return self;
      case "Sequential":
      case "ParallelN":
        return flatMap$5(scopeFork(scope2, parallel), (inner) => scopeExtend(self, inner));
    }
  }
}));
const parallelNFinalizers = (parallelism) => (self) => contextWithEffect((context2) => match$9(getOption(context2, scopeTag), {
  onNone: () => self,
  onSome: (scope2) => {
    if (scope2.strategy._tag === "ParallelN" && scope2.strategy.parallelism === parallelism) {
      return self;
    }
    return flatMap$5(scopeFork(scope2, parallelN(parallelism)), (inner) => scopeExtend(self, inner));
  }
}));
const finalizersMaskInternal = (strategy, concurrentFinalizers) => (self) => contextWithEffect((context2) => match$9(getOption(context2, scopeTag), {
  onNone: () => self(identity),
  onSome: (scope2) => {
    if (concurrentFinalizers === true) {
      const patch2 = strategy._tag === "Parallel" ? parallelFinalizers : strategy._tag === "Sequential" ? sequentialFinalizers : parallelNFinalizers(strategy.parallelism);
      switch (scope2.strategy._tag) {
        case "Parallel":
          return patch2(self(parallelFinalizers));
        case "Sequential":
          return patch2(self(sequentialFinalizers));
        case "ParallelN":
          return patch2(self(parallelNFinalizers(scope2.strategy.parallelism)));
      }
    } else {
      return self(identity);
    }
  }
}));
const scopeWith = (f) => flatMap$5(scopeTag, f);
const scopedWith$2 = (f) => flatMap$5(scopeMake(), (scope2) => onExit(f(scope2), (exit2) => scope2.close(exit2)));
const scopedEffect = (effect2) => flatMap$5(scopeMake(), (scope2) => scopeUse(effect2, scope2));
const sequentialFinalizers = (self) => contextWithEffect((context2) => match$9(getOption(context2, scopeTag), {
  onNone: () => self,
  onSome: (scope2) => {
    switch (scope2.strategy._tag) {
      case "Sequential":
        return self;
      case "Parallel":
      case "ParallelN":
        return flatMap$5(scopeFork(scope2, sequential), (inner) => scopeExtend(self, inner));
    }
  }
}));
const withConfigProviderScoped = (provider) => fiberRefLocallyScopedWith(currentServices, add$3(configProviderTag, provider));
const zipOptions = /* @__PURE__ */ dual((args2) => isEffect$1(args2[1]), (self, that, options) => zipWithOptions(self, that, (a, b) => [a, b], options));
const zipLeftOptions = /* @__PURE__ */ dual((args2) => isEffect$1(args2[1]), (self, that, options) => {
  if (options?.concurrent !== true && (options?.batching === void 0 || options.batching === false)) {
    return zipLeft$3(self, that);
  }
  return zipWithOptions(self, that, (a, _) => a, options);
});
const zipRightOptions = /* @__PURE__ */ dual((args2) => isEffect$1(args2[1]), (self, that, options) => {
  if (options?.concurrent !== true && (options?.batching === void 0 || options.batching === false)) {
    return zipRight$5(self, that);
  }
  return zipWithOptions(self, that, (_, b) => b, options);
});
const zipWithOptions = /* @__PURE__ */ dual((args2) => isEffect$1(args2[1]), (self, that, f, options) => map$a(all$1([self, that], {
  concurrency: options?.concurrent ? 2 : 1,
  batching: options?.batching,
  concurrentFinalizers: options?.concurrentFinalizers
}), ([a, a2]) => f(a, a2)));
const scopeTag = /* @__PURE__ */ GenericTag("effect/Scope");
const scope$1 = scopeTag;
const scopeUnsafeAddFinalizer = (scope2, fin) => {
  if (scope2.state._tag === "Open") {
    scope2.state.finalizers.set({}, fin);
  }
};
const ScopeImplProto = {
  [ScopeTypeId]: ScopeTypeId,
  [CloseableScopeTypeId]: CloseableScopeTypeId,
  pipe() {
    return pipeArguments(this, arguments);
  },
  fork(strategy) {
    return sync$4(() => {
      const newScope = scopeUnsafeMake(strategy);
      if (this.state._tag === "Closed") {
        newScope.state = this.state;
        return newScope;
      }
      const key = {};
      const fin = (exit2) => newScope.close(exit2);
      this.state.finalizers.set(key, fin);
      scopeUnsafeAddFinalizer(newScope, (_) => sync$4(() => {
        if (this.state._tag === "Open") {
          this.state.finalizers.delete(key);
        }
      }));
      return newScope;
    });
  },
  close(exit2) {
    return suspend$6(() => {
      if (this.state._tag === "Closed") {
        return void_$2;
      }
      const finalizers = Array.from(this.state.finalizers.values()).reverse();
      this.state = {
        _tag: "Closed",
        exit: exit2
      };
      if (finalizers.length === 0) {
        return void_$2;
      }
      return isSequential(this.strategy) ? pipe(forEachSequential(finalizers, (fin) => exit$1(fin(exit2))), flatMap$5((results) => pipe(exitCollectAll(results), map$i(exitAsVoid), getOrElse(() => exitVoid)))) : isParallel(this.strategy) ? pipe(forEachParUnbounded(finalizers, (fin) => exit$1(fin(exit2)), false), flatMap$5((results) => pipe(exitCollectAll(results, {
        parallel: true
      }), map$i(exitAsVoid), getOrElse(() => exitVoid)))) : pipe(forEachParN(finalizers, this.strategy.parallelism, (fin) => exit$1(fin(exit2)), false), flatMap$5((results) => pipe(exitCollectAll(results, {
        parallel: true
      }), map$i(exitAsVoid), getOrElse(() => exitVoid))));
    });
  },
  addFinalizer(fin) {
    return suspend$6(() => {
      if (this.state._tag === "Closed") {
        return fin(this.state.exit);
      }
      this.state.finalizers.set({}, fin);
      return void_$2;
    });
  }
};
const scopeUnsafeMake = (strategy = sequential$1) => {
  const scope2 = Object.create(ScopeImplProto);
  scope2.strategy = strategy;
  scope2.state = {
    _tag: "Open",
    finalizers: /* @__PURE__ */ new Map()
  };
  return scope2;
};
const scopeMake = (strategy = sequential$1) => sync$4(() => scopeUnsafeMake(strategy));
const scopeExtend = /* @__PURE__ */ dual(2, (effect2, scope2) => mapInputContext$1(
  effect2,
  // @ts-expect-error
  merge$2(make$B(scopeTag, scope2))
));
const scopeUse = /* @__PURE__ */ dual(2, (effect2, scope2) => pipe(effect2, scopeExtend(scope2), onExit((exit2) => scope2.close(exit2))));
const fiberRefUnsafeMakeSupervisor = (initial) => fiberRefUnsafeMakePatch(initial, {
  differ,
  fork: empty$3
});
const fiberRefLocallyScoped = /* @__PURE__ */ dual(2, (self, value2) => asVoid$1(acquireRelease$1(flatMap$5(fiberRefGet(self), (oldValue) => as$1(fiberRefSet(self, value2), oldValue)), (oldValue) => fiberRefSet(self, oldValue))));
const fiberRefLocallyScopedWith = /* @__PURE__ */ dual(2, (self, f) => fiberRefGetWith(self, (a) => fiberRefLocallyScoped(self, f(a))));
const currentRuntimeFlags = /* @__PURE__ */ fiberRefUnsafeMakeRuntimeFlags(none$3);
const currentSupervisor = /* @__PURE__ */ fiberRefUnsafeMakeSupervisor(none$1);
const raceWith$1 = /* @__PURE__ */ dual(3, (self, other, options) => raceFibersWith(self, other, {
  onSelfWin: (winner, loser) => flatMap$5(winner.await, (exit2) => {
    switch (exit2._tag) {
      case OP_SUCCESS: {
        return flatMap$5(winner.inheritAll, () => options.onSelfDone(exit2, loser));
      }
      case OP_FAILURE: {
        return options.onSelfDone(exit2, loser);
      }
    }
  }),
  onOtherWin: (winner, loser) => flatMap$5(winner.await, (exit2) => {
    switch (exit2._tag) {
      case OP_SUCCESS: {
        return flatMap$5(winner.inheritAll, () => options.onOtherDone(exit2, loser));
      }
      case OP_FAILURE: {
        return options.onOtherDone(exit2, loser);
      }
    }
  })
}));
const race$1 = /* @__PURE__ */ dual(2, (self, that) => fiberIdWith$1((parentFiberId) => raceWith$1(self, that, {
  onSelfDone: (exit2, right2) => exitMatchEffect(exit2, {
    onFailure: (cause) => pipe(join$1(right2), mapErrorCause((cause2) => parallel$2(cause, cause2))),
    onSuccess: (value2) => pipe(right2, interruptAsFiber(parentFiberId), as$1(value2))
  }),
  onOtherDone: (exit2, left2) => exitMatchEffect(exit2, {
    onFailure: (cause) => pipe(join$1(left2), mapErrorCause((cause2) => parallel$2(cause2, cause))),
    onSuccess: (value2) => pipe(left2, interruptAsFiber(parentFiberId), as$1(value2))
  })
})));
const raceFibersWith = /* @__PURE__ */ dual(3, (self, other, options) => withFiberRuntime$1((parentFiber, parentStatus) => {
  const parentRuntimeFlags = parentStatus.runtimeFlags;
  const raceIndicator = make$t(true);
  const leftFiber = unsafeMakeChildFiber(self, parentFiber, parentRuntimeFlags, options.selfScope);
  const rightFiber = unsafeMakeChildFiber(other, parentFiber, parentRuntimeFlags, options.otherScope);
  return async_((cb) => {
    leftFiber.addObserver(() => completeRace(leftFiber, rightFiber, options.onSelfWin, raceIndicator, cb));
    rightFiber.addObserver(() => completeRace(rightFiber, leftFiber, options.onOtherWin, raceIndicator, cb));
    leftFiber.startFork(self);
    rightFiber.startFork(other);
  }, combine$5(leftFiber.id(), rightFiber.id()));
}));
const completeRace = (winner, loser, cont, ab, cb) => {
  if (compareAndSet(true, false)(ab)) {
    cb(cont(winner, loser));
  }
};
const ensuring$2 = /* @__PURE__ */ dual(2, (self, finalizer) => uninterruptibleMask$1((restore) => matchCauseEffect$1(restore(self), {
  onFailure: (cause1) => matchCauseEffect$1(finalizer, {
    onFailure: (cause2) => failCause$5(sequential$2(cause1, cause2)),
    onSuccess: () => failCause$5(cause1)
  }),
  onSuccess: (a) => as$1(finalizer, a)
})));
const invokeWithInterrupt = (self, entries, onInterrupt2) => fiberIdWith$1((id) => flatMap$5(flatMap$5(forkDaemon$1(interruptible$1(self)), (processing) => async_((cb) => {
  const counts = entries.map((_) => _.listeners.count);
  const checkDone = () => {
    if (counts.every((count) => count === 0)) {
      if (entries.every((_) => {
        if (_.result.state.current._tag === "Pending") {
          return true;
        } else if (_.result.state.current._tag === "Done" && exitIsExit(_.result.state.current.effect) && _.result.state.current.effect._tag === "Failure" && isInterrupted$2(_.result.state.current.effect.cause)) {
          return true;
        } else {
          return false;
        }
      })) {
        cleanup.forEach((f) => f());
        onInterrupt2?.();
        cb(interruptFiber(processing));
      }
    }
  };
  processing.addObserver((exit2) => {
    cleanup.forEach((f) => f());
    cb(exit2);
  });
  const cleanup = entries.map((r, i) => {
    const observer = (count) => {
      counts[i] = count;
      checkDone();
    };
    r.listeners.addObserver(observer);
    return () => r.listeners.removeObserver(observer);
  });
  checkDone();
  return sync$4(() => {
    cleanup.forEach((f) => f());
  });
})), () => suspend$6(() => {
  const residual = entries.flatMap((entry) => {
    if (!entry.state.completed) {
      return [entry];
    }
    return [];
  });
  return forEachSequentialDiscard(residual, (entry) => complete(entry.request, exitInterrupt(id)));
})));
const IntervalSymbolKey = "effect/ScheduleInterval";
const IntervalTypeId = /* @__PURE__ */ Symbol.for(IntervalSymbolKey);
const empty$2 = {
  [IntervalTypeId]: IntervalTypeId,
  startMillis: 0,
  endMillis: 0
};
const make$b = (startMillis, endMillis) => {
  if (startMillis > endMillis) {
    return empty$2;
  }
  return {
    [IntervalTypeId]: IntervalTypeId,
    startMillis,
    endMillis
  };
};
const lessThan$3 = /* @__PURE__ */ dual(2, (self, that) => min(self, that) === self);
const min = /* @__PURE__ */ dual(2, (self, that) => {
  if (self.endMillis <= that.startMillis) return self;
  if (that.endMillis <= self.startMillis) return that;
  if (self.startMillis < that.startMillis) return self;
  if (that.startMillis < self.startMillis) return that;
  if (self.endMillis <= that.endMillis) return self;
  return that;
});
const isEmpty$3 = (self) => {
  return self.startMillis >= self.endMillis;
};
const intersect$4 = /* @__PURE__ */ dual(2, (self, that) => {
  const start2 = Math.max(self.startMillis, that.startMillis);
  const end2 = Math.min(self.endMillis, that.endMillis);
  return make$b(start2, end2);
});
const after$1 = (startMilliseconds) => {
  return make$b(startMilliseconds, Number.POSITIVE_INFINITY);
};
const empty$1 = empty$2;
const lessThan$2 = lessThan$3;
const isEmpty$2 = isEmpty$3;
const intersect$3 = intersect$4;
const after = after$1;
const IntervalsSymbolKey = "effect/ScheduleIntervals";
const IntervalsTypeId = /* @__PURE__ */ Symbol.for(IntervalsSymbolKey);
const make$a = (intervals) => {
  return {
    [IntervalsTypeId]: IntervalsTypeId,
    intervals
  };
};
const intersect$2 = /* @__PURE__ */ dual(2, (self, that) => intersectLoop(self.intervals, that.intervals, empty$k()));
const intersectLoop = (_left, _right, _acc) => {
  let left2 = _left;
  let right2 = _right;
  let acc = _acc;
  while (isNonEmpty$3(left2) && isNonEmpty$3(right2)) {
    const interval = pipe(headNonEmpty(left2), intersect$3(headNonEmpty(right2)));
    const intervals = isEmpty$2(interval) ? acc : pipe(acc, prepend$1(interval));
    if (pipe(headNonEmpty(left2), lessThan$2(headNonEmpty(right2)))) {
      left2 = tailNonEmpty(left2);
    } else {
      right2 = tailNonEmpty(right2);
    }
    acc = intervals;
  }
  return make$a(reverse$1(acc));
};
const start$1 = (self) => {
  return pipe(self.intervals, head, getOrElse(() => empty$1)).startMillis;
};
const end$1 = (self) => {
  return pipe(self.intervals, head, getOrElse(() => empty$1)).endMillis;
};
const lessThan$1 = /* @__PURE__ */ dual(2, (self, that) => start$1(self) < start$1(that));
const isNonEmpty$2 = (self) => {
  return isNonEmpty$3(self.intervals);
};
const make$9 = make$a;
const intersect$1 = intersect$2;
const start = start$1;
const end = end$1;
const lessThan = lessThan$1;
const isNonEmpty$1 = isNonEmpty$2;
const OP_CONTINUE$1 = "Continue";
const OP_DONE$2 = "Done";
const _continue$1 = (intervals) => {
  return {
    _tag: OP_CONTINUE$1,
    intervals
  };
};
const continueWith$1 = (interval) => {
  return {
    _tag: OP_CONTINUE$1,
    intervals: make$9(of$1(interval))
  };
};
const done$1 = {
  _tag: OP_DONE$2
};
const isContinue$1 = (self) => {
  return self._tag === OP_CONTINUE$1;
};
const isDone$1 = (self) => {
  return self._tag === OP_DONE$2;
};
const _continue = _continue$1;
const continueWith = continueWith$1;
const done = done$1;
const isContinue = isContinue$1;
const isDone = isDone$1;
const addFinalizer = scopeAddFinalizer;
const addFinalizerExit = scopeAddFinalizerExit;
const close = scopeClose;
const extend$1 = scopeExtend;
const fork = scopeFork;
const make$8 = scopeMake;
class Semaphore {
  permits;
  waiters = /* @__PURE__ */ new Set();
  taken = 0;
  constructor(permits) {
    this.permits = permits;
  }
  get free() {
    return this.permits - this.taken;
  }
  take = (n) => asyncInterrupt((resume2) => {
    if (this.free < n) {
      const observer = () => {
        if (this.free < n) {
          return;
        }
        this.waiters.delete(observer);
        this.taken += n;
        resume2(succeed$b(n));
      };
      this.waiters.add(observer);
      return sync$4(() => {
        this.waiters.delete(observer);
      });
    }
    this.taken += n;
    return resume2(succeed$b(n));
  });
  updateTaken = (f) => withFiberRuntime$1((fiber) => {
    this.taken = f(this.taken);
    if (this.waiters.size > 0) {
      fiber.getFiberRef(currentScheduler).scheduleTask(() => {
        const iter = this.waiters.values();
        let item = iter.next();
        while (item.done === false && this.free > 0) {
          item.value();
          item = iter.next();
        }
      }, fiber.getFiberRef(currentSchedulingPriority));
    }
    return succeed$b(this.free);
  });
  release = (n) => this.updateTaken((taken) => taken - n);
  releaseAll = /* @__PURE__ */ this.updateTaken((_) => 0);
  withPermits = (n) => (self) => uninterruptibleMask$1((restore) => flatMap$5(restore(this.take(n)), (permits) => ensuring$2(restore(self), this.release(permits))));
  withPermitsIfAvailable = (n) => (self) => uninterruptibleMask$1((restore) => suspend$6(() => {
    if (this.free < n) {
      return succeedNone;
    }
    this.taken += n;
    return ensuring$2(restore(asSome(self)), this.release(n));
  }));
}
const unsafeMakeSemaphore = (permits) => new Semaphore(permits);
const makeSemaphore$1 = (permits) => sync$4(() => unsafeMakeSemaphore(permits));
class Latch extends Class$2 {
  isOpen;
  waiters = [];
  scheduled = false;
  constructor(isOpen) {
    super();
    this.isOpen = isOpen;
  }
  commit() {
    return this.await;
  }
  unsafeSchedule(fiber) {
    if (this.scheduled || this.waiters.length === 0) {
      return void_$2;
    }
    this.scheduled = true;
    fiber.currentScheduler.scheduleTask(this.flushWaiters, fiber.getFiberRef(currentSchedulingPriority));
    return void_$2;
  }
  flushWaiters = () => {
    this.scheduled = false;
    const waiters = this.waiters;
    this.waiters = [];
    for (let i = 0; i < waiters.length; i++) {
      waiters[i](exitVoid);
    }
  };
  open = /* @__PURE__ */ withFiberRuntime$1((fiber) => {
    if (this.isOpen) {
      return void_$2;
    }
    this.isOpen = true;
    return this.unsafeSchedule(fiber);
  });
  unsafeOpen() {
    if (this.isOpen) return;
    this.isOpen = true;
    this.flushWaiters();
  }
  release = /* @__PURE__ */ withFiberRuntime$1((fiber) => {
    if (this.isOpen) {
      return void_$2;
    }
    return this.unsafeSchedule(fiber);
  });
  await = /* @__PURE__ */ asyncInterrupt((resume2) => {
    if (this.isOpen) {
      return resume2(void_$2);
    }
    this.waiters.push(resume2);
    return sync$4(() => {
      const index = this.waiters.indexOf(resume2);
      if (index !== -1) {
        this.waiters.splice(index, 1);
      }
    });
  });
  unsafeClose() {
    this.isOpen = false;
  }
  close = /* @__PURE__ */ sync$4(() => {
    this.isOpen = false;
  });
  whenOpen = (self) => {
    return zipRight$5(this.await, self);
  };
}
const unsafeMakeLatch$1 = (open) => new Latch(open ?? false);
const forkIn$1 = /* @__PURE__ */ dual(2, (self, scope2) => withFiberRuntime$1((parent, parentStatus) => {
  const scopeImpl = scope2;
  const fiber = unsafeFork$1(self, parent, parentStatus.runtimeFlags, globalScope);
  if (scopeImpl.state._tag === "Open") {
    const finalizer = () => fiberIdWith$1((fiberId2) => equals$1(fiberId2, fiber.id()) ? void_$2 : asVoid$1(interruptFiber(fiber)));
    const key = {};
    scopeImpl.state.finalizers.set(key, finalizer);
    fiber.addObserver(() => {
      if (scopeImpl.state._tag === "Closed") return;
      scopeImpl.state.finalizers.delete(key);
    });
  } else {
    fiber.unsafeInterruptAsFork(parent.id());
  }
  return succeed$b(fiber);
}));
const SynchronizedSymbolKey = "effect/Ref/SynchronizedRef";
const SynchronizedTypeId = /* @__PURE__ */ Symbol.for(SynchronizedSymbolKey);
const synchronizedVariance = {
  /* c8 ignore next */
  _A: (_) => _
};
class SynchronizedImpl extends Class$2 {
  ref;
  withLock;
  [SynchronizedTypeId] = synchronizedVariance;
  [RefTypeId] = refVariance;
  [TypeId$5] = TypeId$5;
  constructor(ref, withLock) {
    super();
    this.ref = ref;
    this.withLock = withLock;
    this.get = get$2(this.ref);
  }
  get;
  commit() {
    return this.get;
  }
  modify(f) {
    return this.modifyEffect((a) => succeed$b(f(a)));
  }
  modifyEffect(f) {
    return this.withLock(pipe(flatMap$5(get$2(this.ref), f), flatMap$5(([b, a]) => as$1(set$1(this.ref, a), b))));
  }
}
const makeSynchronized = (value2) => sync$4(() => unsafeMakeSynchronized(value2));
const unsafeMakeSynchronized = (value2) => {
  const ref = unsafeMake$4(value2);
  const sem = unsafeMakeSemaphore(1);
  return new SynchronizedImpl(ref, sem.withPermits(1));
};
const TypeId$3 = /* @__PURE__ */ Symbol.for("effect/ManagedRuntime");
const OP_FOLD$1 = "Fold";
const OP_FRESH = "Fresh";
const OP_FROM_EFFECT$2 = "FromEffect";
const OP_SCOPED = "Scoped";
const OP_SUSPEND$1 = "Suspend";
const OP_PROVIDE$1 = "Provide";
const OP_PROVIDE_MERGE = "ProvideMerge";
const OP_ZIP_WITH = "ZipWith";
const _await = _await$1;
const inheritAll = inheritAll$1;
const interrupt$1 = interruptFiber;
const interruptAs = interruptAsFiber;
const join = join$1;
const makeDual = (f) => function() {
  if (arguments.length === 1) {
    const runtime2 = arguments[0];
    return (effect2, ...args2) => f(runtime2, effect2, ...args2);
  }
  return f.apply(this, arguments);
};
const unsafeFork = /* @__PURE__ */ makeDual((runtime2, self, options) => {
  const fiberId2 = unsafeMake$6();
  const fiberRefUpdates = [[currentContext$1, [[fiberId2, runtime2.context]]]];
  if (options?.scheduler) {
    fiberRefUpdates.push([currentScheduler, [[fiberId2, options.scheduler]]]);
  }
  let fiberRefs2 = updateManyAs(runtime2.fiberRefs, {
    entries: fiberRefUpdates,
    forkAs: fiberId2
  });
  if (options?.updateRefs) {
    fiberRefs2 = options.updateRefs(fiberRefs2, fiberId2);
  }
  const fiberRuntime = new FiberRuntime(fiberId2, fiberRefs2, runtime2.runtimeFlags);
  let effect2 = self;
  if (options?.scope) {
    effect2 = flatMap$5(fork(options.scope, sequential$1), (closeableScope) => zipRight$5(scopeAddFinalizer(closeableScope, fiberIdWith$1((id) => equals$1(id, fiberRuntime.id()) ? void_$2 : interruptAsFiber(fiberRuntime, id))), onExit(self, (exit2) => close(closeableScope, exit2))));
  }
  const supervisor = fiberRuntime.currentSupervisor;
  if (supervisor !== none$1) {
    supervisor.onStart(runtime2.context, effect2, none$6(), fiberRuntime);
    fiberRuntime.addObserver((exit2) => supervisor.onEnd(exit2, fiberRuntime));
  }
  globalScope.add(runtime2.runtimeFlags, fiberRuntime);
  if (options?.immediate === false) {
    fiberRuntime.resume(effect2);
  } else {
    fiberRuntime.start(effect2);
  }
  return fiberRuntime;
});
const unsafeRunCallback = /* @__PURE__ */ makeDual((runtime2, effect2, options = {}) => {
  const fiberRuntime = unsafeFork(runtime2, effect2, options);
  if (options.onExit) {
    fiberRuntime.addObserver((exit2) => {
      options.onExit(exit2);
    });
  }
  return (id, cancelOptions) => unsafeRunCallback(runtime2)(pipe(fiberRuntime, interruptAs(id ?? none$4)), {
    ...cancelOptions,
    onExit: cancelOptions?.onExit ? (exit2) => cancelOptions.onExit(flatten$4(exit2)) : void 0
  });
});
const unsafeRunSync = /* @__PURE__ */ makeDual((runtime2, effect2) => {
  const result = unsafeRunSyncExit(runtime2)(effect2);
  if (result._tag === "Failure") {
    throw fiberFailure(result.effect_instruction_i0);
  }
  return result.effect_instruction_i0;
});
class AsyncFiberExceptionImpl extends Error {
  fiber;
  _tag = "AsyncFiberException";
  constructor(fiber) {
    super(`Fiber #${fiber.id().id} cannot be resolved synchronously. This is caused by using runSync on an effect that performs async work`);
    this.fiber = fiber;
    this.name = this._tag;
    this.stack = this.message;
  }
}
const asyncFiberException = (fiber) => {
  const limit = Error.stackTraceLimit;
  Error.stackTraceLimit = 0;
  const error = new AsyncFiberExceptionImpl(fiber);
  Error.stackTraceLimit = limit;
  return error;
};
const FiberFailureId = /* @__PURE__ */ Symbol.for("effect/Runtime/FiberFailure");
const FiberFailureCauseId = /* @__PURE__ */ Symbol.for("effect/Runtime/FiberFailure/Cause");
class FiberFailureImpl extends Error {
  [FiberFailureId];
  [FiberFailureCauseId];
  constructor(cause) {
    const head2 = prettyErrors(cause)[0];
    super(head2?.message || "An error has occurred");
    this[FiberFailureId] = FiberFailureId;
    this[FiberFailureCauseId] = cause;
    this.name = head2 ? `(FiberFailure) ${head2.name}` : "FiberFailure";
    if (head2?.stack) {
      this.stack = head2.stack;
    }
  }
  toJSON() {
    return {
      _id: "FiberFailure",
      cause: this[FiberFailureCauseId].toJSON()
    };
  }
  toString() {
    return "(FiberFailure) " + pretty$2(this[FiberFailureCauseId], {
      renderErrorCause: true
    });
  }
  [NodeInspectSymbol]() {
    return this.toString();
  }
}
const fiberFailure = (cause) => {
  const limit = Error.stackTraceLimit;
  Error.stackTraceLimit = 0;
  const error = new FiberFailureImpl(cause);
  Error.stackTraceLimit = limit;
  return error;
};
const fastPath = (effect2) => {
  const op = effect2;
  switch (op._op) {
    case "Failure":
    case "Success": {
      return op;
    }
    case "Left": {
      return exitFail(op.left);
    }
    case "Right": {
      return exitSucceed(op.right);
    }
    case "Some": {
      return exitSucceed(op.value);
    }
    case "None": {
      return exitFail(NoSuchElementException());
    }
  }
};
const unsafeRunSyncExit = /* @__PURE__ */ makeDual((runtime2, effect2) => {
  const op = fastPath(effect2);
  if (op) {
    return op;
  }
  const scheduler = new SyncScheduler();
  const fiberRuntime = unsafeFork(runtime2)(effect2, {
    scheduler
  });
  scheduler.flush();
  const result = fiberRuntime.unsafePoll();
  if (result) {
    return result;
  }
  return exitDie(capture(asyncFiberException(fiberRuntime), currentSpanFromFiber(fiberRuntime)));
});
const unsafeRunPromise = /* @__PURE__ */ makeDual((runtime2, effect2, options) => unsafeRunPromiseExit(runtime2, effect2, options).then((result) => {
  switch (result._tag) {
    case OP_SUCCESS: {
      return result.effect_instruction_i0;
    }
    case OP_FAILURE: {
      throw fiberFailure(result.effect_instruction_i0);
    }
  }
}));
const unsafeRunPromiseExit = /* @__PURE__ */ makeDual((runtime2, effect2, options) => new Promise((resolve) => {
  const op = fastPath(effect2);
  if (op) {
    resolve(op);
  }
  const fiber = unsafeFork(runtime2)(effect2);
  fiber.addObserver((exit2) => {
    resolve(exit2);
  });
  if (options?.signal !== void 0) {
    if (options.signal.aborted) {
      fiber.unsafeInterruptAsFork(fiber.id());
    } else {
      options.signal.addEventListener("abort", () => {
        fiber.unsafeInterruptAsFork(fiber.id());
      }, {
        once: true
      });
    }
  }
}));
class RuntimeImpl {
  context;
  runtimeFlags;
  fiberRefs;
  constructor(context2, runtimeFlags2, fiberRefs2) {
    this.context = context2;
    this.runtimeFlags = runtimeFlags2;
    this.fiberRefs = fiberRefs2;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const make$7 = (options) => new RuntimeImpl(options.context, options.runtimeFlags, options.fiberRefs);
const runtime$1 = () => withFiberRuntime$1((state, status) => succeed$b(new RuntimeImpl(state.getFiberRef(currentContext$1), status.runtimeFlags, state.getFiberRefs())));
const defaultRuntimeFlags = /* @__PURE__ */ make$q(Interruption, CooperativeYielding, RuntimeMetrics);
const defaultRuntime = /* @__PURE__ */ make$7({
  context: /* @__PURE__ */ empty$l(),
  runtimeFlags: defaultRuntimeFlags,
  fiberRefs: /* @__PURE__ */ empty$6()
});
const unsafeForkEffect = /* @__PURE__ */ unsafeFork(defaultRuntime);
const unsafeRunPromiseEffect = /* @__PURE__ */ unsafeRunPromise(defaultRuntime);
const unsafeRunPromiseExitEffect = /* @__PURE__ */ unsafeRunPromiseExit(defaultRuntime);
const unsafeRunSyncEffect = /* @__PURE__ */ unsafeRunSync(defaultRuntime);
const unsafeRunSyncExitEffect = /* @__PURE__ */ unsafeRunSyncExit(defaultRuntime);
const modifyEffect = /* @__PURE__ */ dual(2, (self, f) => self.modifyEffect(f));
const LayerSymbolKey = "effect/Layer";
const LayerTypeId = /* @__PURE__ */ Symbol.for(LayerSymbolKey);
const layerVariance = {
  /* c8 ignore next */
  _RIn: (_) => _,
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _ROut: (_) => _
};
const proto$8 = {
  [LayerTypeId]: layerVariance,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const MemoMapTypeIdKey = "effect/Layer/MemoMap";
const MemoMapTypeId = /* @__PURE__ */ Symbol.for(MemoMapTypeIdKey);
const CurrentMemoMap = /* @__PURE__ */ Reference()("effect/Layer/CurrentMemoMap", {
  defaultValue: () => unsafeMakeMemoMap()
});
const isLayer = (u) => hasProperty(u, LayerTypeId);
const isFresh = (self) => {
  return self._op_layer === OP_FRESH;
};
class MemoMapImpl {
  ref;
  [MemoMapTypeId];
  constructor(ref) {
    this.ref = ref;
    this[MemoMapTypeId] = MemoMapTypeId;
  }
  /**
   * Checks the memo map to see if a layer exists. If it is, immediately
   * returns it. Otherwise, obtains the layer, stores it in the memo map,
   * and adds a finalizer to the `Scope`.
   */
  getOrElseMemoize(layer, scope2) {
    return pipe(modifyEffect(this.ref, (map2) => {
      const inMap = map2.get(layer);
      if (inMap !== void 0) {
        const [acquire, release] = inMap;
        const cached2 = pipe(acquire, flatMap$5(([patch2, b]) => pipe(patchFiberRefs(patch2), as$1(b))), onExit(exitMatch({
          onFailure: () => void_$2,
          onSuccess: () => scopeAddFinalizerExit(scope2, release)
        })));
        return succeed$b([cached2, map2]);
      }
      return pipe(make$k(0), flatMap$5((observers) => pipe(deferredMake(), flatMap$5((deferred) => pipe(make$k(() => void_$2), map$a((finalizerRef) => {
        const resource = uninterruptibleMask$1((restore) => pipe(scopeMake(), flatMap$5((innerScope) => pipe(restore(flatMap$5(makeBuilder(layer, innerScope, true), (f) => diffFiberRefs(f(this)))), exit$1, flatMap$5((exit2) => {
          switch (exit2._tag) {
            case OP_FAILURE: {
              return pipe(deferredFailCause(deferred, exit2.effect_instruction_i0), zipRight$5(scopeClose(innerScope, exit2)), zipRight$5(failCause$5(exit2.effect_instruction_i0)));
            }
            case OP_SUCCESS: {
              return pipe(set$1(finalizerRef, (exit3) => pipe(scopeClose(innerScope, exit3), whenEffect(modify$1(observers, (n) => [n === 1, n - 1])), asVoid$1)), zipRight$5(update$3(observers, (n) => n + 1)), zipRight$5(scopeAddFinalizerExit(scope2, (exit3) => pipe(sync$4(() => map2.delete(layer)), zipRight$5(get$2(finalizerRef)), flatMap$5((finalizer) => finalizer(exit3))))), zipRight$5(deferredSucceed(deferred, exit2.effect_instruction_i0)), as$1(exit2.effect_instruction_i0[1]));
            }
          }
        })))));
        const memoized = [pipe(deferredAwait(deferred), onExit(exitMatchEffect({
          onFailure: () => void_$2,
          onSuccess: () => update$3(observers, (n) => n + 1)
        }))), (exit2) => pipe(get$2(finalizerRef), flatMap$5((finalizer) => finalizer(exit2)))];
        return [resource, isFresh(layer) ? map2 : map2.set(layer, memoized)];
      }))))));
    }), flatten$5);
  }
}
const makeMemoMap = /* @__PURE__ */ suspend$6(() => map$a(makeSynchronized(/* @__PURE__ */ new Map()), (ref) => new MemoMapImpl(ref)));
const unsafeMakeMemoMap = () => new MemoMapImpl(unsafeMakeSynchronized(/* @__PURE__ */ new Map()));
const buildWithScope = /* @__PURE__ */ dual(2, (self, scope2) => flatMap$5(makeMemoMap, (memoMap) => buildWithMemoMap(self, memoMap, scope2)));
const buildWithMemoMap = /* @__PURE__ */ dual(3, (self, memoMap, scope2) => flatMap$5(makeBuilder(self, scope2), (run2) => provideService(run2(memoMap), CurrentMemoMap, memoMap)));
const makeBuilder = (self, scope2, inMemoMap = false) => {
  const op = self;
  switch (op._op_layer) {
    case "Locally": {
      return sync$4(() => (memoMap) => op.f(memoMap.getOrElseMemoize(op.self, scope2)));
    }
    case "ExtendScope": {
      return sync$4(() => (memoMap) => scopeWith((scope3) => memoMap.getOrElseMemoize(op.layer, scope3)));
    }
    case "Fold": {
      return sync$4(() => (memoMap) => pipe(memoMap.getOrElseMemoize(op.layer, scope2), matchCauseEffect$1({
        onFailure: (cause) => memoMap.getOrElseMemoize(op.failureK(cause), scope2),
        onSuccess: (value2) => memoMap.getOrElseMemoize(op.successK(value2), scope2)
      })));
    }
    case "Fresh": {
      return sync$4(() => (_) => pipe(op.layer, buildWithScope(scope2)));
    }
    case "FromEffect": {
      return inMemoMap ? sync$4(() => (_) => op.effect) : sync$4(() => (memoMap) => memoMap.getOrElseMemoize(self, scope2));
    }
    case "Provide": {
      return sync$4(() => (memoMap) => pipe(memoMap.getOrElseMemoize(op.first, scope2), flatMap$5((env) => pipe(memoMap.getOrElseMemoize(op.second, scope2), provideContext(env)))));
    }
    case "Scoped": {
      return inMemoMap ? sync$4(() => (_) => scopeExtend(op.effect, scope2)) : sync$4(() => (memoMap) => memoMap.getOrElseMemoize(self, scope2));
    }
    case "Suspend": {
      return sync$4(() => (memoMap) => memoMap.getOrElseMemoize(op.evaluate(), scope2));
    }
    case "ProvideMerge": {
      return sync$4(() => (memoMap) => pipe(memoMap.getOrElseMemoize(op.first, scope2), zipWith$2(memoMap.getOrElseMemoize(op.second, scope2), op.zipK)));
    }
    case "ZipWith": {
      return sync$4(() => (memoMap) => pipe(memoMap.getOrElseMemoize(op.first, scope2), zipWithOptions(memoMap.getOrElseMemoize(op.second, scope2), op.zipK, {
        concurrent: true
      })));
    }
  }
};
const context$1 = () => fromEffectContext(context$2());
const fail$5 = (error) => failCause$2(fail$7(error));
const failCause$2 = (cause) => fromEffectContext(failCause$5(cause));
const flatMap$4 = /* @__PURE__ */ dual(2, (self, f) => match$2(self, {
  onFailure: fail$5,
  onSuccess: f
}));
const fromEffect$4 = /* @__PURE__ */ dual(2, (a, b) => {
  const tagFirst = isTag(a);
  const tag = tagFirst ? a : b;
  const effect2 = tagFirst ? b : a;
  return fromEffectContext(map$a(effect2, (service) => make$B(tag, service)));
});
const fromEffectDiscard = (effect2) => fromEffectContext(map$a(effect2, () => empty$l()));
function fromEffectContext(effect2) {
  const fromEffect2 = Object.create(proto$8);
  fromEffect2._op_layer = OP_FROM_EFFECT$2;
  fromEffect2.effect = effect2;
  return fromEffect2;
}
const matchCause$1 = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => {
  const fold = Object.create(proto$8);
  fold._op_layer = OP_FOLD$1;
  fold.layer = self;
  fold.failureK = onFailure;
  fold.successK = onSuccess;
  return fold;
});
const match$2 = /* @__PURE__ */ dual(2, (self, {
  onFailure,
  onSuccess
}) => matchCause$1(self, {
  onFailure: (cause) => {
    const failureOrCause$12 = failureOrCause(cause);
    switch (failureOrCause$12._tag) {
      case "Left": {
        return onFailure(failureOrCause$12.left);
      }
      case "Right": {
        return failCause$2(failureOrCause$12.right);
      }
    }
  },
  onSuccess
}));
const merge = /* @__PURE__ */ dual(2, (self, that) => zipWith$1(self, that, (a, b) => merge$2(a, b)));
const mergeAll$2 = (...layers) => {
  let final = layers[0];
  for (let i = 1; i < layers.length; i++) {
    final = merge(final, layers[i]);
  }
  return final;
};
const scoped$3 = /* @__PURE__ */ dual(2, (a, b) => {
  const tagFirst = isTag(a);
  const tag = tagFirst ? a : b;
  const effect2 = tagFirst ? b : a;
  return scopedContext(map$a(effect2, (service) => make$B(tag, service)));
});
const scopedDiscard = (effect2) => scopedContext(pipe(effect2, as$1(empty$l())));
const scopedContext = (effect2) => {
  const scoped2 = Object.create(proto$8);
  scoped2._op_layer = OP_SCOPED;
  scoped2.effect = effect2;
  return scoped2;
};
const succeed$5 = /* @__PURE__ */ dual(2, (a, b) => {
  const tagFirst = isTag(a);
  const tag = tagFirst ? a : b;
  const resource = tagFirst ? b : a;
  return fromEffectContext(succeed$b(make$B(tag, resource)));
});
const suspend$4 = (evaluate2) => {
  const suspend2 = Object.create(proto$8);
  suspend2._op_layer = OP_SUSPEND$1;
  suspend2.evaluate = evaluate2;
  return suspend2;
};
const toRuntimeWithMemoMap = /* @__PURE__ */ dual(2, (self, memoMap) => flatMap$5(scopeWith((scope2) => buildWithMemoMap(self, memoMap, scope2)), (context2) => pipe(runtime$1(), provideContext(context2))));
const provide$3 = /* @__PURE__ */ dual(2, (self, that) => suspend$4(() => {
  const provideTo = Object.create(proto$8);
  provideTo._op_layer = OP_PROVIDE$1;
  provideTo.first = Object.create(proto$8, {
    _op_layer: {
      value: OP_PROVIDE_MERGE,
      enumerable: true
    },
    first: {
      value: context$1(),
      enumerable: true
    },
    second: {
      value: Array.isArray(that) ? mergeAll$2(...that) : that
    },
    zipK: {
      value: (a, b) => pipe(a, merge$2(b))
    }
  });
  provideTo.second = self;
  return provideTo;
}));
const provideMerge$1 = /* @__PURE__ */ dual(2, (that, self) => {
  const zipWith2 = Object.create(proto$8);
  zipWith2._op_layer = OP_PROVIDE_MERGE;
  zipWith2.first = self;
  zipWith2.second = provide$3(that, self);
  zipWith2.zipK = (a, b) => {
    return pipe(a, merge$2(b));
  };
  return zipWith2;
});
const zipWith$1 = /* @__PURE__ */ dual(3, (self, that, f) => suspend$4(() => {
  const zipWith2 = Object.create(proto$8);
  zipWith2._op_layer = OP_ZIP_WITH;
  zipWith2.first = self;
  zipWith2.second = that;
  zipWith2.zipK = f;
  return zipWith2;
}));
const unwrapEffect$1 = (self) => {
  const tag = GenericTag("effect/Layer/unwrapEffect/Layer.Layer<R1, E1, A>");
  return flatMap$4(fromEffect$4(tag, self), (context2) => get$9(context2, tag));
};
const unwrapScoped$2 = (self) => {
  const tag = GenericTag("effect/Layer/unwrapScoped/Layer.Layer<R1, E1, A>");
  return flatMap$4(scoped$3(tag, self), (context2) => get$9(context2, tag));
};
const provideSomeLayer = /* @__PURE__ */ dual(2, (self, layer) => scopedWith$2((scope2) => flatMap$5(buildWithScope(layer, scope2), (context2) => provideSomeContext(self, context2))));
const provideSomeRuntime = /* @__PURE__ */ dual(2, (self, rt) => {
  const patchRefs = diff$1(defaultRuntime.fiberRefs, rt.fiberRefs);
  const patchFlags = diff$3(defaultRuntime.runtimeFlags, rt.runtimeFlags);
  return uninterruptibleMask$1((restore) => withFiberRuntime$1((fiber) => {
    const oldContext = fiber.getFiberRef(currentContext$1);
    const oldRefs = fiber.getFiberRefs();
    const newRefs = patch$1(fiber.id(), oldRefs)(patchRefs);
    const oldFlags = fiber.currentRuntimeFlags;
    const newFlags = patch$4(patchFlags)(oldFlags);
    const rollbackRefs = diff$1(newRefs, oldRefs);
    const rollbackFlags = diff$3(newFlags, oldFlags);
    fiber.setFiberRefs(newRefs);
    fiber.currentRuntimeFlags = newFlags;
    return ensuring$2(provideSomeContext(restore(self), merge$2(oldContext, rt.context)), withFiberRuntime$1((fiber2) => {
      fiber2.setFiberRefs(patch$1(fiber2.id(), fiber2.getFiberRefs())(rollbackRefs));
      fiber2.currentRuntimeFlags = patch$4(rollbackFlags)(fiber2.currentRuntimeFlags);
      return void_$2;
    }));
  }));
});
const effect_provide = /* @__PURE__ */ dual(2, (self, source) => {
  if (Array.isArray(source)) {
    return provideSomeLayer(self, mergeAll$2(...source));
  } else if (isLayer(source)) {
    return provideSomeLayer(self, source);
  } else if (isContext(source)) {
    return provideSomeContext(self, source);
  } else if (TypeId$3 in source) {
    return flatMap$5(source.runtimeEffect, (rt) => provideSomeRuntime(self, rt));
  } else {
    return provideSomeRuntime(self, source);
  }
});
const ScheduleSymbolKey = "effect/Schedule";
const ScheduleTypeId = /* @__PURE__ */ Symbol.for(ScheduleSymbolKey);
const isSchedule = (u) => hasProperty(u, ScheduleTypeId);
const ScheduleDriverSymbolKey = "effect/ScheduleDriver";
const ScheduleDriverTypeId = /* @__PURE__ */ Symbol.for(ScheduleDriverSymbolKey);
const defaultIterationMetadata = {
  start: 0,
  now: 0,
  input: void 0,
  output: void 0,
  elapsed: zero,
  elapsedSincePrevious: zero,
  recurrence: 0
};
const CurrentIterationMetadata = /* @__PURE__ */ Reference()("effect/Schedule/CurrentIterationMetadata", {
  defaultValue: () => defaultIterationMetadata
});
const scheduleVariance = {
  /* c8 ignore next */
  _Out: (_) => _,
  /* c8 ignore next */
  _In: (_) => _,
  /* c8 ignore next */
  _R: (_) => _
};
const scheduleDriverVariance = {
  /* c8 ignore next */
  _Out: (_) => _,
  /* c8 ignore next */
  _In: (_) => _,
  /* c8 ignore next */
  _R: (_) => _
};
class ScheduleImpl {
  initial;
  step;
  [ScheduleTypeId] = scheduleVariance;
  constructor(initial, step2) {
    this.initial = initial;
    this.step = step2;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const updateInfo = (iterationMetaRef, now, input, output) => update$3(iterationMetaRef, (prev) => prev.recurrence === 0 ? {
  now,
  input,
  output,
  recurrence: prev.recurrence + 1,
  elapsed: zero,
  elapsedSincePrevious: zero,
  start: now
} : {
  now,
  input,
  output,
  recurrence: prev.recurrence + 1,
  elapsed: millis(now - prev.start),
  elapsedSincePrevious: millis(now - prev.now),
  start: prev.start
});
class ScheduleDriverImpl {
  schedule;
  ref;
  [ScheduleDriverTypeId] = scheduleDriverVariance;
  constructor(schedule, ref) {
    this.schedule = schedule;
    this.ref = ref;
  }
  get state() {
    return map$a(get$2(this.ref), (tuple) => tuple[1]);
  }
  get last() {
    return flatMap$5(get$2(this.ref), ([element, _]) => {
      switch (element._tag) {
        case "None": {
          return failSync(() => new NoSuchElementException());
        }
        case "Some": {
          return succeed$b(element.value);
        }
      }
    });
  }
  iterationMeta = /* @__PURE__ */ unsafeMake$4(defaultIterationMetadata);
  get reset() {
    return set$1(this.ref, [none$6(), this.schedule.initial]).pipe(zipLeft$3(set$1(this.iterationMeta, defaultIterationMetadata)));
  }
  next(input) {
    return pipe(map$a(get$2(this.ref), (tuple) => tuple[1]), flatMap$5((state) => pipe(currentTimeMillis, flatMap$5((now) => pipe(suspend$6(() => this.schedule.step(now, input, state)), flatMap$5(([state2, out, decision]) => {
      const setState = set$1(this.ref, [some(out), state2]);
      if (isDone(decision)) {
        return setState.pipe(zipRight$5(fail$8(none$6())));
      }
      const millis$1 = start(decision.intervals) - now;
      if (millis$1 <= 0) {
        return setState.pipe(zipRight$5(updateInfo(this.iterationMeta, now, input, out)), as$1(out));
      }
      const duration = millis(millis$1);
      return pipe(setState, zipRight$5(updateInfo(this.iterationMeta, now, input, out)), zipRight$5(sleep(duration)), as$1(out));
    }))))));
  }
}
const makeWithState = (initial, step2) => new ScheduleImpl(initial, step2);
const check = /* @__PURE__ */ dual(2, (self, test2) => checkEffect(self, (input, out) => sync$4(() => test2(input, out))));
const checkEffect = /* @__PURE__ */ dual(2, (self, test2) => makeWithState(self.initial, (now, input, state) => flatMap$5(self.step(now, input, state), ([state2, out, decision]) => {
  if (isDone(decision)) {
    return succeed$b([state2, out, done]);
  }
  return map$a(test2(input, out), (cont) => cont ? [state2, out, decision] : [state2, out, done]);
})));
const driver = (self) => pipe(make$k([none$6(), self.initial]), map$a((ref) => new ScheduleDriverImpl(self, ref)));
const intersect = /* @__PURE__ */ dual(2, (self, that) => intersectWith(self, that, intersect$1));
const intersectWith = /* @__PURE__ */ dual(3, (self, that, f) => makeWithState([self.initial, that.initial], (now, input, state) => pipe(zipWith$2(self.step(now, input, state[0]), that.step(now, input, state[1]), (a, b) => [a, b]), flatMap$5(([[lState, out, lDecision], [rState, out2, rDecision]]) => {
  if (isContinue(lDecision) && isContinue(rDecision)) {
    return intersectWithLoop(self, that, input, lState, out, lDecision.intervals, rState, out2, rDecision.intervals, f);
  }
  return succeed$b([[lState, rState], [out, out2], done]);
}))));
const intersectWithLoop = (self, that, input, lState, out, lInterval, rState, out2, rInterval, f) => {
  const combined = f(lInterval, rInterval);
  if (isNonEmpty$1(combined)) {
    return succeed$b([[lState, rState], [out, out2], _continue(combined)]);
  }
  if (pipe(lInterval, lessThan(rInterval))) {
    return flatMap$5(self.step(end(lInterval), input, lState), ([lState2, out3, decision]) => {
      if (isDone(decision)) {
        return succeed$b([[lState2, rState], [out3, out2], done]);
      }
      return intersectWithLoop(self, that, input, lState2, out3, decision.intervals, rState, out2, rInterval, f);
    });
  }
  return flatMap$5(that.step(end(rInterval), input, rState), ([rState2, out22, decision]) => {
    if (isDone(decision)) {
      return succeed$b([[lState, rState2], [out, out22], done]);
    }
    return intersectWithLoop(self, that, input, lState, out, lInterval, rState2, out22, decision.intervals, f);
  });
};
const map$4 = /* @__PURE__ */ dual(2, (self, f) => mapEffect(self, (out) => sync$4(() => f(out))));
const mapEffect = /* @__PURE__ */ dual(2, (self, f) => makeWithState(self.initial, (now, input, state) => flatMap$5(self.step(now, input, state), ([state2, out, decision]) => map$a(f(out), (out2) => [state2, out2, decision]))));
const passthrough = (self) => makeWithState(self.initial, (now, input, state) => pipe(self.step(now, input, state), map$a(([state2, _, decision]) => [state2, input, decision])));
const recurs = (n) => whileOutput(forever, (out) => out < n);
const unfold = (initial, f) => makeWithState(initial, (now, _, state) => sync$4(() => [f(state), state, continueWith(after(now))]));
const untilInputEffect = /* @__PURE__ */ dual(2, (self, f) => checkEffect(self, (input, _) => negate(f(input))));
const whileInputEffect = /* @__PURE__ */ dual(2, (self, f) => checkEffect(self, (input, _) => f(input)));
const whileOutput = /* @__PURE__ */ dual(2, (self, f) => check(self, (_, out) => f(out)));
const ScheduleDefectTypeId = /* @__PURE__ */ Symbol.for("effect/Schedule/ScheduleDefect");
class ScheduleDefect {
  error;
  [ScheduleDefectTypeId];
  constructor(error) {
    this.error = error;
    this[ScheduleDefectTypeId] = ScheduleDefectTypeId;
  }
}
const isScheduleDefect = (u) => hasProperty(u, ScheduleDefectTypeId);
const scheduleDefectWrap = (self) => catchAll$1(self, (e) => die$3(new ScheduleDefect(e)));
const scheduleDefectRefailCause = (cause) => match$9(find(cause, (_) => isDieType$1(_) && isScheduleDefect(_.defect) ? some(_.defect) : none$6()), {
  onNone: () => cause,
  onSome: (error) => fail$9(error.error)
});
const scheduleDefectRefail = (effect2) => catchAllCause$1(effect2, (cause) => failCause$5(scheduleDefectRefailCause(cause)));
const repeat_Effect = /* @__PURE__ */ dual(2, (self, schedule) => repeatOrElse_Effect(self, schedule, (e, _) => fail$8(e)));
const repeat_combined = /* @__PURE__ */ dual(2, (self, options) => {
  if (isSchedule(options)) {
    return repeat_Effect(self, options);
  }
  const base = options.schedule ?? passthrough(forever);
  const withWhile = options.while ? whileInputEffect(base, (a) => {
    const applied = options.while(a);
    if (typeof applied === "boolean") {
      return succeed$b(applied);
    }
    return scheduleDefectWrap(applied);
  }) : base;
  const withUntil = options.until ? untilInputEffect(withWhile, (a) => {
    const applied = options.until(a);
    if (typeof applied === "boolean") {
      return succeed$b(applied);
    }
    return scheduleDefectWrap(applied);
  }) : withWhile;
  const withTimes = options.times ? intersect(withUntil, recurs(options.times)).pipe(map$4((intersectionPair) => intersectionPair[0])) : withUntil;
  return scheduleDefectRefail(repeat_Effect(self, withTimes));
});
const repeatOrElse_Effect = /* @__PURE__ */ dual(3, (self, schedule, orElse2) => flatMap$5(driver(schedule), (driver2) => matchEffect(self, {
  onFailure: (error) => orElse2(error, none$6()),
  onSuccess: (value2) => repeatOrElseEffectLoop(provideServiceEffect(self, CurrentIterationMetadata, get$2(driver2.iterationMeta)), driver2, (error, option) => provideServiceEffect(orElse2(error, option), CurrentIterationMetadata, get$2(driver2.iterationMeta)), value2)
})));
const repeatOrElseEffectLoop = (self, driver2, orElse2, value2) => matchEffect(driver2.next(value2), {
  onFailure: () => orDie(driver2.last),
  onSuccess: (b) => matchEffect(self, {
    onFailure: (error) => orElse2(error, some(b)),
    onSuccess: (value3) => repeatOrElseEffectLoop(self, driver2, orElse2, value3)
  })
});
const forever = /* @__PURE__ */ unfold(0, (n) => n + 1);
const TypeId$2 = /* @__PURE__ */ Symbol.for("effect/MutableList");
const MutableListProto = {
  [TypeId$2]: TypeId$2,
  [Symbol.iterator]() {
    let done2 = false;
    let head2 = this.head;
    return {
      next() {
        if (done2) {
          return this.return();
        }
        if (head2 == null) {
          done2 = true;
          return this.return();
        }
        const value2 = head2.value;
        head2 = head2.next;
        return {
          done: done2,
          value: value2
        };
      },
      return(value2) {
        if (!done2) {
          done2 = true;
        }
        return {
          done: true,
          value: value2
        };
      }
    };
  },
  toString() {
    return format$3(this.toJSON());
  },
  toJSON() {
    return {
      _id: "MutableList",
      values: Array.from(this).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const makeNode = (value2) => ({
  value: value2,
  removed: false,
  prev: void 0,
  next: void 0
});
const empty = () => {
  const list = Object.create(MutableListProto);
  list.head = void 0;
  list.tail = void 0;
  list._length = 0;
  return list;
};
const isEmpty$1 = (self) => length$1(self) === 0;
const length$1 = (self) => self._length;
const append = /* @__PURE__ */ dual(2, (self, value2) => {
  const node = makeNode(value2);
  if (self.head === void 0) {
    self.head = node;
  }
  if (self.tail === void 0) {
    self.tail = node;
  } else {
    self.tail.next = node;
    node.prev = self.tail;
    self.tail = node;
  }
  self._length += 1;
  return self;
});
const shift = (self) => {
  const head2 = self.head;
  if (head2 !== void 0) {
    remove$1(self, head2);
    return head2.value;
  }
  return void 0;
};
const remove$1 = (self, node) => {
  if (node.removed) {
    return;
  }
  node.removed = true;
  if (node.prev !== void 0 && node.next !== void 0) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  } else if (node.prev !== void 0) {
    self.tail = node.prev;
    node.prev.next = void 0;
  } else if (node.next !== void 0) {
    self.head = node.next;
    node.next.prev = void 0;
  } else {
    self.tail = void 0;
    self.head = void 0;
  }
  if (self._length > 0) {
    self._length -= 1;
  }
};
const TypeId$1 = /* @__PURE__ */ Symbol.for("effect/MutableQueue");
const EmptyMutableQueue = /* @__PURE__ */ Symbol.for("effect/mutable/MutableQueue/Empty");
const MutableQueueProto = {
  [TypeId$1]: TypeId$1,
  [Symbol.iterator]() {
    return Array.from(this.queue)[Symbol.iterator]();
  },
  toString() {
    return format$3(this.toJSON());
  },
  toJSON() {
    return {
      _id: "MutableQueue",
      values: Array.from(this).map(toJSON)
    };
  },
  [NodeInspectSymbol]() {
    return this.toJSON();
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const make$6 = (capacity2) => {
  const queue = Object.create(MutableQueueProto);
  queue.queue = empty();
  queue.capacity = capacity2;
  return queue;
};
const bounded$2 = (capacity2) => make$6(capacity2);
const unbounded$2 = () => make$6(void 0);
const length = (self) => length$1(self.queue);
const isEmpty = (self) => isEmpty$1(self.queue);
const capacity = (self) => self.capacity === void 0 ? Infinity : self.capacity;
const offer$2 = /* @__PURE__ */ dual(2, (self, value2) => {
  const queueLength = length$1(self.queue);
  if (self.capacity !== void 0 && queueLength === self.capacity) {
    return false;
  }
  append(value2)(self.queue);
  return true;
});
const offerAll = /* @__PURE__ */ dual(2, (self, values) => {
  const iterator = values[Symbol.iterator]();
  let next;
  let remainder = empty$k();
  let offering = true;
  while (offering && (next = iterator.next()) && !next.done) {
    offering = offer$2(next.value)(self);
  }
  while (next != null && !next.done) {
    remainder = prepend$1(next.value)(remainder);
    next = iterator.next();
  }
  return reverse$1(remainder);
});
const poll = /* @__PURE__ */ dual(2, (self, def) => {
  if (isEmpty$1(self.queue)) {
    return def;
  }
  return shift(self.queue);
});
const pollUpTo = /* @__PURE__ */ dual(2, (self, n) => {
  let result = empty$k();
  let count = 0;
  while (count < n) {
    const element = poll(EmptyMutableQueue)(self);
    if (element === EmptyMutableQueue) {
      break;
    }
    result = prepend$1(element)(result);
    count += 1;
  }
  return reverse$1(result);
});
const isEffect = isEffect$1;
const cached = memoize;
const all = all$1;
const forEach = forEach$1;
const withFiberRuntime = withFiberRuntime$1;
const fail$4 = fail$8;
const failCause$1 = failCause$5;
const die = die$3;
const dieMessage = dieMessage$1;
const gen = gen$1;
const promise = promise$1;
const succeed$4 = succeed$b;
const suspend$3 = suspend$6;
const sync$2 = sync$4;
const _void = void_$2;
const catchAll = catchAll$1;
const catchAllCause = catchAllCause$1;
const catchTag = catchTag$1;
const catchTags = catchTags$1;
const ignore = ignore$1;
const try_ = try_$1;
const tryMap = tryMap$1;
const tryPromise = tryPromise$1;
const interrupt = interrupt$3;
const interruptible = interruptible$1;
const onInterrupt = onInterrupt$1;
const uninterruptible = uninterruptible$1;
const uninterruptibleMask = uninterruptibleMask$1;
const as = as$1;
const asVoid = asVoid$1;
const map$3 = map$a;
const mapBoth$1 = mapBoth$2;
const mapError$1 = mapError$2;
const acquireRelease = acquireRelease$1;
const acquireUseRelease = acquireUseRelease$1;
const ensuring$1 = ensuring$2;
const scope = scope$1;
const scopedWith$1 = scopedWith$2;
const scoped$2 = scopedEffect;
const fiberIdWith = fiberIdWith$1;
const forkDaemon = forkDaemon$1;
const forkIn = forkIn$1;
const context = context$2;
const mapInputContext = mapInputContext$1;
const provide$2 = effect_provide;
const serviceFunctions = serviceFunctions$1;
const either = either$1;
const exit = exit$1;
const intoDeferred = intoDeferred$1;
const when = when$1;
const flatMap$3 = flatMap$5;
const andThen = andThen$2;
const flatten$3 = flatten$5;
const race = race$1;
const raceWith = raceWith$1;
const tap = tap$1;
const tapBoth = tapBoth$1;
const tapError = tapError$1;
const tapErrorCause = tapErrorCause$1;
const repeat = repeat_combined;
const match$1 = match$4;
const matchCause = matchCause$2;
const matchCauseEffect = matchCauseEffect$1;
const logWithLevel = (level, ...message) => logWithLevel$1(level)(...message);
const logDebug = logDebug$1;
const logError = logError$1;
const withLogSpan = withLogSpan$1;
const annotateLogs = annotateLogs$1;
const runtime = runtime$1;
const makeSemaphore = makeSemaphore$1;
const unsafeMakeLatch = unsafeMakeLatch$1;
const runFork$1 = unsafeForkEffect;
const runPromise = unsafeRunPromiseEffect;
const runSync = unsafeRunSyncEffect;
const zip$2 = zipOptions;
const zipLeft$1 = zipLeftOptions;
const zipRight$2 = zipRightOptions;
const zipWith = zipWithOptions;
const useSpan = useSpan$1;
const withSpan = withSpan$1;
const withParentSpan = withParentSpan$1;
const fn = function(nameOrBody, ...pipeables) {
  const limit = Error.stackTraceLimit;
  Error.stackTraceLimit = 2;
  const errorDef = new Error();
  Error.stackTraceLimit = limit;
  if (typeof nameOrBody !== "string") {
    return defineLength(nameOrBody.length, function(...args2) {
      const limit2 = Error.stackTraceLimit;
      Error.stackTraceLimit = 2;
      const errorCall = new Error();
      Error.stackTraceLimit = limit2;
      return fnApply({
        self: this,
        body: nameOrBody,
        args: args2,
        pipeables,
        spanName: "<anonymous>",
        spanOptions: {
          context: DisablePropagation.context(true)
        },
        errorDef,
        errorCall
      });
    });
  }
  const name = nameOrBody;
  const options = pipeables[0];
  return (body, ...pipeables2) => defineLength(body.length, {
    [name](...args2) {
      const limit2 = Error.stackTraceLimit;
      Error.stackTraceLimit = 2;
      const errorCall = new Error();
      Error.stackTraceLimit = limit2;
      return fnApply({
        self: this,
        body,
        args: args2,
        pipeables: pipeables2,
        spanName: name,
        spanOptions: options,
        errorDef,
        errorCall
      });
    }
  }[name]);
};
function defineLength(length2, fn2) {
  return Object.defineProperty(fn2, "length", {
    value: length2,
    configurable: true
  });
}
function fnApply(options) {
  let effect2;
  let fnError = void 0;
  if (isGeneratorFunction(options.body)) {
    effect2 = fromIterator(() => options.body.apply(options.self, options.args));
  } else {
    try {
      effect2 = options.body.apply(options.self, options.args);
    } catch (error) {
      fnError = error;
      effect2 = die(error);
    }
  }
  if (options.pipeables.length > 0) {
    try {
      for (const x of options.pipeables) {
        effect2 = x(effect2, ...options.args);
      }
    } catch (error) {
      effect2 = fnError ? failCause$1(sequential$2(die$4(fnError), die$4(error))) : die(error);
    }
  }
  let cache = false;
  const captureStackTrace = () => {
    if (cache !== false) {
      return cache;
    }
    if (options.errorCall.stack) {
      const stackDef = options.errorDef.stack.trim().split("\n");
      const stackCall = options.errorCall.stack.trim().split("\n");
      let endStackDef = stackDef.slice(2).join("\n").trim();
      if (!endStackDef.includes(`(`)) {
        endStackDef = endStackDef.replace(/at (.*)/, "at ($1)");
      }
      let endStackCall = stackCall.slice(2).join("\n").trim();
      if (!endStackCall.includes(`(`)) {
        endStackCall = endStackCall.replace(/at (.*)/, "at ($1)");
      }
      cache = `${endStackDef}
${endStackCall}`;
      return cache;
    }
  };
  const opts = options.spanOptions && "captureStackTrace" in options.spanOptions ? options.spanOptions : {
    captureStackTrace,
    ...options.spanOptions
  };
  return withSpan(effect2, options.spanName, opts);
}
const minimumLogLevel$1 = (level) => scopedDiscard(fiberRefLocallyScoped(currentMinimumLogLevel, level));
const withMinimumLogLevel$1 = /* @__PURE__ */ dual(2, (self, level) => fiberRefLocally(currentMinimumLogLevel, level)(self));
const addLogger = (logger) => scopedDiscard(fiberRefLocallyScopedWith(currentLoggers, add$1(logger)));
const addLoggerEffect = (effect2) => unwrapEffect$1(map$a(effect2, addLogger));
const addLoggerScoped = (effect2) => unwrapScoped$2(map$a(effect2, addLogger));
const removeLogger = (logger) => scopedDiscard(fiberRefLocallyScopedWith(currentLoggers, remove$2(logger)));
const replaceLogger = /* @__PURE__ */ dual(2, (self, that) => flatMap$4(removeLogger(self), () => addLogger(that)));
const replaceLoggerEffect = /* @__PURE__ */ dual(2, (self, that) => flatMap$4(removeLogger(self), () => addLoggerEffect(that)));
const replaceLoggerScoped = /* @__PURE__ */ dual(2, (self, that) => flatMap$4(removeLogger(self), () => addLoggerScoped(that)));
const setConfigProvider$1 = (configProvider) => scopedDiscard(withConfigProviderScoped(configProvider));
const effect$1 = fromEffect$4;
const effectDiscard = fromEffectDiscard;
const mergeAll$1 = mergeAll$2;
const succeed$3 = succeed$5;
const provide$1 = provide$3;
const provideMerge = provideMerge$1;
const unwrapEffect = unwrapEffect$1;
const setConfigProvider = setConfigProvider$1;
const getKeysForIndexSignature = (input, parameter) => {
  switch (parameter._tag) {
    case "StringKeyword":
    case "TemplateLiteral":
      return Object.keys(input);
    case "SymbolKeyword":
      return Object.getOwnPropertySymbols(input);
    case "Refinement":
      return getKeysForIndexSignature(input, parameter.from);
  }
};
const ownKeys = (o) => Object.keys(o).concat(Object.getOwnPropertySymbols(o));
const memoizeThunk = (f) => {
  let done2 = false;
  let a;
  return () => {
    if (done2) {
      return a;
    }
    a = f();
    done2 = true;
    return a;
  };
};
const formatDate = (date) => {
  try {
    return date.toISOString();
  } catch {
    return String(date);
  }
};
const formatUnknown = (u, checkCircular = true) => {
  if (Array.isArray(u)) {
    return `[${u.map((i) => formatUnknown(i, checkCircular)).join(",")}]`;
  }
  if (isDate(u)) {
    return formatDate(u);
  }
  if (hasProperty(u, "toString") && isFunction(u["toString"]) && u["toString"] !== Object.prototype.toString) {
    return u["toString"]();
  }
  if (isString(u)) {
    return JSON.stringify(u);
  }
  if (isNumber(u) || u == null || isBoolean(u) || isSymbol(u)) {
    return String(u);
  }
  if (isBigInt(u)) {
    return String(u) + "n";
  }
  if (isIterable(u)) {
    return `${u.constructor.name}(${formatUnknown(Array.from(u), checkCircular)})`;
  }
  try {
    if (checkCircular) {
      JSON.stringify(u);
    }
    const pojo = `{${ownKeys(u).map((k) => `${isString(k) ? JSON.stringify(k) : String(k)}:${formatUnknown(u[k], false)}`).join(",")}}`;
    const name = u.constructor.name;
    return u.constructor !== Object.prototype.constructor ? `${name}(${pojo})` : pojo;
  } catch {
    return "<circular structure>";
  }
};
const formatPropertyKey$1 = (name) => typeof name === "string" ? JSON.stringify(name) : String(name);
const isNonEmpty = (x) => Array.isArray(x);
const isSingle = (x) => !Array.isArray(x);
const formatPathKey = (key) => `[${formatPropertyKey$1(key)}]`;
const formatPath = (path) => isNonEmpty(path) ? path.map(formatPathKey).join("") : formatPathKey(path);
const getErrorMessage$1 = (reason, details, path, ast) => {
  let out = reason;
  if (path && isNonEmptyReadonlyArray(path)) {
    out += `
at path: ${formatPath(path)}`;
  }
  if (details !== void 0) {
    out += `
details: ${details}`;
  }
  if (ast) {
    out += `
schema (${ast._tag}): ${ast}`;
  }
  return out;
};
const getSchemaExtendErrorMessage = (x, y, path) => getErrorMessage$1("Unsupported schema or overlapping types", `cannot extend ${x} with ${y}`, path);
const getASTUnsupportedKeySchemaErrorMessage = (ast) => getErrorMessage$1("Unsupported key schema", void 0, void 0, ast);
const getASTUnsupportedLiteralErrorMessage = (literal2) => getErrorMessage$1("Unsupported literal", `literal value: ${formatUnknown(literal2)}`);
const getASTDuplicateIndexSignatureErrorMessage = (type) => getErrorMessage$1("Duplicate index signature", `${type} index signature`);
const getASTIndexSignatureParameterErrorMessage = /* @__PURE__ */ getErrorMessage$1("Unsupported index signature parameter", "An index signature parameter type must be `string`, `symbol`, a template literal type or a refinement of the previous types");
const getASTRequiredElementFollowinAnOptionalElementErrorMessage = /* @__PURE__ */ getErrorMessage$1("Invalid element", "A required element cannot follow an optional element. ts(1257)");
const getASTDuplicatePropertySignatureTransformationErrorMessage = (key) => getErrorMessage$1("Duplicate property signature transformation", `Duplicate key ${formatUnknown(key)}`);
const getASTDuplicatePropertySignatureErrorMessage = (key) => getErrorMessage$1("Duplicate property signature", `Duplicate key ${formatUnknown(key)}`);
const BrandAnnotationId = /* @__PURE__ */ Symbol.for("effect/annotation/Brand");
const SchemaIdAnnotationId = /* @__PURE__ */ Symbol.for("effect/annotation/SchemaId");
const MessageAnnotationId = /* @__PURE__ */ Symbol.for("effect/annotation/Message");
const MissingMessageAnnotationId = /* @__PURE__ */ Symbol.for("effect/annotation/MissingMessage");
const IdentifierAnnotationId = /* @__PURE__ */ Symbol.for("effect/annotation/Identifier");
const TitleAnnotationId = /* @__PURE__ */ Symbol.for("effect/annotation/Title");
const AutoTitleAnnotationId = /* @__PURE__ */ Symbol.for("effect/annotation/AutoTitle");
const DescriptionAnnotationId = /* @__PURE__ */ Symbol.for("effect/annotation/Description");
const ExamplesAnnotationId = /* @__PURE__ */ Symbol.for("effect/annotation/Examples");
const DefaultAnnotationId = /* @__PURE__ */ Symbol.for("effect/annotation/Default");
const JSONSchemaAnnotationId = /* @__PURE__ */ Symbol.for("effect/annotation/JSONSchema");
const ArbitraryAnnotationId = /* @__PURE__ */ Symbol.for("effect/annotation/Arbitrary");
const PrettyAnnotationId = /* @__PURE__ */ Symbol.for("effect/annotation/Pretty");
const EquivalenceAnnotationId = /* @__PURE__ */ Symbol.for("effect/annotation/Equivalence");
const DocumentationAnnotationId = /* @__PURE__ */ Symbol.for("effect/annotation/Documentation");
const ConcurrencyAnnotationId = /* @__PURE__ */ Symbol.for("effect/annotation/Concurrency");
const BatchingAnnotationId = /* @__PURE__ */ Symbol.for("effect/annotation/Batching");
const ParseIssueTitleAnnotationId = /* @__PURE__ */ Symbol.for("effect/annotation/ParseIssueTitle");
const ParseOptionsAnnotationId = /* @__PURE__ */ Symbol.for("effect/annotation/ParseOptions");
const DecodingFallbackAnnotationId = /* @__PURE__ */ Symbol.for("effect/annotation/DecodingFallback");
const SurrogateAnnotationId = /* @__PURE__ */ Symbol.for("effect/annotation/Surrogate");
const StableFilterAnnotationId = /* @__PURE__ */ Symbol.for("effect/annotation/StableFilter");
const getAnnotation = /* @__PURE__ */ dual(2, (annotated, key) => Object.prototype.hasOwnProperty.call(annotated.annotations, key) ? some(annotated.annotations[key]) : none$6());
const getBrandAnnotation = /* @__PURE__ */ getAnnotation(BrandAnnotationId);
const getMessageAnnotation = /* @__PURE__ */ getAnnotation(MessageAnnotationId);
const getMissingMessageAnnotation = /* @__PURE__ */ getAnnotation(MissingMessageAnnotationId);
const getTitleAnnotation = /* @__PURE__ */ getAnnotation(TitleAnnotationId);
const getAutoTitleAnnotation = /* @__PURE__ */ getAnnotation(AutoTitleAnnotationId);
const getIdentifierAnnotation = /* @__PURE__ */ getAnnotation(IdentifierAnnotationId);
const getDescriptionAnnotation = /* @__PURE__ */ getAnnotation(DescriptionAnnotationId);
const getConcurrencyAnnotation = /* @__PURE__ */ getAnnotation(ConcurrencyAnnotationId);
const getBatchingAnnotation = /* @__PURE__ */ getAnnotation(BatchingAnnotationId);
const getParseIssueTitleAnnotation$1 = /* @__PURE__ */ getAnnotation(ParseIssueTitleAnnotationId);
const getParseOptionsAnnotation = /* @__PURE__ */ getAnnotation(ParseOptionsAnnotationId);
const getDecodingFallbackAnnotation = /* @__PURE__ */ getAnnotation(DecodingFallbackAnnotationId);
const getSurrogateAnnotation = /* @__PURE__ */ getAnnotation(SurrogateAnnotationId);
const getStableFilterAnnotation = /* @__PURE__ */ getAnnotation(StableFilterAnnotationId);
const hasStableFilter = (annotated) => exists(getStableFilterAnnotation(annotated), (b) => b === true);
const JSONIdentifierAnnotationId = /* @__PURE__ */ Symbol.for("effect/annotation/JSONIdentifier");
const getJSONIdentifierAnnotation = /* @__PURE__ */ getAnnotation(JSONIdentifierAnnotationId);
const getJSONIdentifier = (annotated) => orElse$5(getJSONIdentifierAnnotation(annotated), () => getIdentifierAnnotation(annotated));
const ParseJsonSchemaId = /* @__PURE__ */ Symbol.for("effect/schema/ParseJson");
class Declaration {
  typeParameters;
  decodeUnknown;
  encodeUnknown;
  annotations;
  /**
   * @since 3.10.0
   */
  _tag = "Declaration";
  constructor(typeParameters, decodeUnknown2, encodeUnknown2, annotations2 = {}) {
    this.typeParameters = typeParameters;
    this.decodeUnknown = decodeUnknown2;
    this.encodeUnknown = encodeUnknown2;
    this.annotations = annotations2;
  }
  /**
   * @since 3.10.0
   */
  toString() {
    return getOrElse(getExpected(this), () => "<declaration schema>");
  }
  /**
   * @since 3.10.0
   */
  toJSON() {
    return {
      _tag: this._tag,
      typeParameters: this.typeParameters.map((ast) => ast.toJSON()),
      annotations: toJSONAnnotations(this.annotations)
    };
  }
}
const createASTGuard = (tag) => (ast) => ast._tag === tag;
let Literal$1 = class Literal {
  literal;
  annotations;
  /**
   * @since 3.10.0
   */
  _tag = "Literal";
  constructor(literal2, annotations2 = {}) {
    this.literal = literal2;
    this.annotations = annotations2;
  }
  /**
   * @since 3.10.0
   */
  toString() {
    return getOrElse(getExpected(this), () => formatUnknown(this.literal));
  }
  /**
   * @since 3.10.0
   */
  toJSON() {
    return {
      _tag: this._tag,
      literal: isBigInt(this.literal) ? String(this.literal) : this.literal,
      annotations: toJSONAnnotations(this.annotations)
    };
  }
};
const isLiteral = /* @__PURE__ */ createASTGuard("Literal");
const $null = /* @__PURE__ */ new Literal$1(null);
class UniqueSymbol {
  symbol;
  annotations;
  /**
   * @since 3.10.0
   */
  _tag = "UniqueSymbol";
  constructor(symbol2, annotations2 = {}) {
    this.symbol = symbol2;
    this.annotations = annotations2;
  }
  /**
   * @since 3.10.0
   */
  toString() {
    return getOrElse(getExpected(this), () => formatUnknown(this.symbol));
  }
  /**
   * @since 3.10.0
   */
  toJSON() {
    return {
      _tag: this._tag,
      symbol: String(this.symbol),
      annotations: toJSONAnnotations(this.annotations)
    };
  }
}
class UndefinedKeyword {
  annotations;
  /**
   * @since 3.10.0
   */
  _tag = "UndefinedKeyword";
  constructor(annotations2 = {}) {
    this.annotations = annotations2;
  }
  /**
   * @since 3.10.0
   */
  toString() {
    return formatKeyword(this);
  }
  /**
   * @since 3.10.0
   */
  toJSON() {
    return {
      _tag: this._tag,
      annotations: toJSONAnnotations(this.annotations)
    };
  }
}
const undefinedKeyword = /* @__PURE__ */ new UndefinedKeyword({
  [TitleAnnotationId]: "undefined"
});
class NeverKeyword {
  annotations;
  /**
   * @since 3.10.0
   */
  _tag = "NeverKeyword";
  constructor(annotations2 = {}) {
    this.annotations = annotations2;
  }
  /**
   * @since 3.10.0
   */
  toString() {
    return formatKeyword(this);
  }
  /**
   * @since 3.10.0
   */
  toJSON() {
    return {
      _tag: this._tag,
      annotations: toJSONAnnotations(this.annotations)
    };
  }
}
const neverKeyword = /* @__PURE__ */ new NeverKeyword({
  [TitleAnnotationId]: "never"
});
class UnknownKeyword {
  annotations;
  /**
   * @since 3.10.0
   */
  _tag = "UnknownKeyword";
  constructor(annotations2 = {}) {
    this.annotations = annotations2;
  }
  /**
   * @since 3.10.0
   */
  toString() {
    return formatKeyword(this);
  }
  /**
   * @since 3.10.0
   */
  toJSON() {
    return {
      _tag: this._tag,
      annotations: toJSONAnnotations(this.annotations)
    };
  }
}
const unknownKeyword = /* @__PURE__ */ new UnknownKeyword({
  [TitleAnnotationId]: "unknown"
});
class AnyKeyword {
  annotations;
  /**
   * @since 3.10.0
   */
  _tag = "AnyKeyword";
  constructor(annotations2 = {}) {
    this.annotations = annotations2;
  }
  /**
   * @since 3.10.0
   */
  toString() {
    return formatKeyword(this);
  }
  /**
   * @since 3.10.0
   */
  toJSON() {
    return {
      _tag: this._tag,
      annotations: toJSONAnnotations(this.annotations)
    };
  }
}
const anyKeyword = /* @__PURE__ */ new AnyKeyword({
  [TitleAnnotationId]: "any"
});
class StringKeyword {
  annotations;
  /**
   * @since 3.10.0
   */
  _tag = "StringKeyword";
  constructor(annotations2 = {}) {
    this.annotations = annotations2;
  }
  /**
   * @since 3.10.0
   */
  toString() {
    return formatKeyword(this);
  }
  /**
   * @since 3.10.0
   */
  toJSON() {
    return {
      _tag: this._tag,
      annotations: toJSONAnnotations(this.annotations)
    };
  }
}
const stringKeyword = /* @__PURE__ */ new StringKeyword({
  [TitleAnnotationId]: "string",
  [DescriptionAnnotationId]: "a string"
});
const isStringKeyword = /* @__PURE__ */ createASTGuard("StringKeyword");
class NumberKeyword {
  annotations;
  /**
   * @since 3.10.0
   */
  _tag = "NumberKeyword";
  constructor(annotations2 = {}) {
    this.annotations = annotations2;
  }
  /**
   * @since 3.10.0
   */
  toString() {
    return formatKeyword(this);
  }
  /**
   * @since 3.10.0
   */
  toJSON() {
    return {
      _tag: this._tag,
      annotations: toJSONAnnotations(this.annotations)
    };
  }
}
const numberKeyword = /* @__PURE__ */ new NumberKeyword({
  [TitleAnnotationId]: "number",
  [DescriptionAnnotationId]: "a number"
});
const isNumberKeyword = /* @__PURE__ */ createASTGuard("NumberKeyword");
class BooleanKeyword {
  annotations;
  /**
   * @since 3.10.0
   */
  _tag = "BooleanKeyword";
  constructor(annotations2 = {}) {
    this.annotations = annotations2;
  }
  /**
   * @since 3.10.0
   */
  toString() {
    return formatKeyword(this);
  }
  /**
   * @since 3.10.0
   */
  toJSON() {
    return {
      _tag: this._tag,
      annotations: toJSONAnnotations(this.annotations)
    };
  }
}
const booleanKeyword = /* @__PURE__ */ new BooleanKeyword({
  [TitleAnnotationId]: "boolean",
  [DescriptionAnnotationId]: "a boolean"
});
const isBooleanKeyword = /* @__PURE__ */ createASTGuard("BooleanKeyword");
const isSymbolKeyword = /* @__PURE__ */ createASTGuard("SymbolKeyword");
let Type$1 = class Type {
  type;
  annotations;
  constructor(type, annotations2 = {}) {
    this.type = type;
    this.annotations = annotations2;
  }
  /**
   * @since 3.10.0
   */
  toJSON() {
    return {
      type: this.type.toJSON(),
      annotations: toJSONAnnotations(this.annotations)
    };
  }
  /**
   * @since 3.10.0
   */
  toString() {
    return String(this.type);
  }
};
class OptionalType extends Type$1 {
  isOptional;
  constructor(type, isOptional, annotations2 = {}) {
    super(type, annotations2);
    this.isOptional = isOptional;
  }
  /**
   * @since 3.10.0
   */
  toJSON() {
    return {
      type: this.type.toJSON(),
      isOptional: this.isOptional,
      annotations: toJSONAnnotations(this.annotations)
    };
  }
  /**
   * @since 3.10.0
   */
  toString() {
    return String(this.type) + (this.isOptional ? "?" : "");
  }
}
const getRestASTs = (rest) => rest.map((annotatedAST) => annotatedAST.type);
class TupleType {
  elements;
  rest;
  isReadonly;
  annotations;
  /**
   * @since 3.10.0
   */
  _tag = "TupleType";
  constructor(elements, rest, isReadonly, annotations2 = {}) {
    this.elements = elements;
    this.rest = rest;
    this.isReadonly = isReadonly;
    this.annotations = annotations2;
    let hasOptionalElement = false;
    let hasIllegalRequiredElement = false;
    for (const e of elements) {
      if (e.isOptional) {
        hasOptionalElement = true;
      } else if (hasOptionalElement) {
        hasIllegalRequiredElement = true;
        break;
      }
    }
    if (hasIllegalRequiredElement || hasOptionalElement && rest.length > 1) {
      throw new Error(getASTRequiredElementFollowinAnOptionalElementErrorMessage);
    }
  }
  /**
   * @since 3.10.0
   */
  toString() {
    return getOrElse(getExpected(this), () => formatTuple(this));
  }
  /**
   * @since 3.10.0
   */
  toJSON() {
    return {
      _tag: this._tag,
      elements: this.elements.map((e) => e.toJSON()),
      rest: this.rest.map((ast) => ast.toJSON()),
      isReadonly: this.isReadonly,
      annotations: toJSONAnnotations(this.annotations)
    };
  }
}
const formatTuple = (ast) => {
  const formattedElements = ast.elements.map(String).join(", ");
  return matchLeft(ast.rest, {
    onEmpty: () => `readonly [${formattedElements}]`,
    onNonEmpty: (head2, tail) => {
      const formattedHead = String(head2);
      const wrappedHead = formattedHead.includes(" | ") ? `(${formattedHead})` : formattedHead;
      if (tail.length > 0) {
        const formattedTail = tail.map(String).join(", ");
        if (ast.elements.length > 0) {
          return `readonly [${formattedElements}, ...${wrappedHead}[], ${formattedTail}]`;
        } else {
          return `readonly [...${wrappedHead}[], ${formattedTail}]`;
        }
      } else {
        if (ast.elements.length > 0) {
          return `readonly [${formattedElements}, ...${wrappedHead}[]]`;
        } else {
          return `ReadonlyArray<${formattedHead}>`;
        }
      }
    }
  });
};
class PropertySignature extends OptionalType {
  name;
  isReadonly;
  constructor(name, type, isOptional, isReadonly, annotations2) {
    super(type, isOptional, annotations2);
    this.name = name;
    this.isReadonly = isReadonly;
  }
  /**
   * @since 3.10.0
   */
  toString() {
    return (this.isReadonly ? "readonly " : "") + String(this.name) + (this.isOptional ? "?" : "") + ": " + this.type;
  }
  /**
   * @since 3.10.0
   */
  toJSON() {
    return {
      name: String(this.name),
      type: this.type.toJSON(),
      isOptional: this.isOptional,
      isReadonly: this.isReadonly,
      annotations: toJSONAnnotations(this.annotations)
    };
  }
}
const isParameter = (ast) => {
  switch (ast._tag) {
    case "StringKeyword":
    case "SymbolKeyword":
    case "TemplateLiteral":
      return true;
    case "Refinement":
      return isParameter(ast.from);
  }
  return false;
};
class IndexSignature {
  type;
  isReadonly;
  /**
   * @since 3.10.0
   */
  parameter;
  constructor(parameter, type, isReadonly) {
    this.type = type;
    this.isReadonly = isReadonly;
    if (isParameter(parameter)) {
      this.parameter = parameter;
    } else {
      throw new Error(getASTIndexSignatureParameterErrorMessage);
    }
  }
  /**
   * @since 3.10.0
   */
  toString() {
    return (this.isReadonly ? "readonly " : "") + `[x: ${this.parameter}]: ${this.type}`;
  }
  /**
   * @since 3.10.0
   */
  toJSON() {
    return {
      parameter: this.parameter.toJSON(),
      type: this.type.toJSON(),
      isReadonly: this.isReadonly
    };
  }
}
class TypeLiteral {
  annotations;
  /**
   * @since 3.10.0
   */
  _tag = "TypeLiteral";
  /**
   * @since 3.10.0
   */
  propertySignatures;
  /**
   * @since 3.10.0
   */
  indexSignatures;
  constructor(propertySignatures, indexSignatures, annotations2 = {}) {
    this.annotations = annotations2;
    const keys2 = {};
    for (let i = 0; i < propertySignatures.length; i++) {
      const name = propertySignatures[i].name;
      if (Object.prototype.hasOwnProperty.call(keys2, name)) {
        throw new Error(getASTDuplicatePropertySignatureErrorMessage(name));
      }
      keys2[name] = null;
    }
    const parameters = {
      string: false,
      symbol: false
    };
    for (let i = 0; i < indexSignatures.length; i++) {
      const encodedParameter = getEncodedParameter(indexSignatures[i].parameter);
      if (isStringKeyword(encodedParameter)) {
        if (parameters.string) {
          throw new Error(getASTDuplicateIndexSignatureErrorMessage("string"));
        }
        parameters.string = true;
      } else if (isSymbolKeyword(encodedParameter)) {
        if (parameters.symbol) {
          throw new Error(getASTDuplicateIndexSignatureErrorMessage("symbol"));
        }
        parameters.symbol = true;
      }
    }
    this.propertySignatures = propertySignatures;
    this.indexSignatures = indexSignatures;
  }
  /**
   * @since 3.10.0
   */
  toString() {
    return getOrElse(getExpected(this), () => formatTypeLiteral(this));
  }
  /**
   * @since 3.10.0
   */
  toJSON() {
    return {
      _tag: this._tag,
      propertySignatures: this.propertySignatures.map((ps) => ps.toJSON()),
      indexSignatures: this.indexSignatures.map((ps) => ps.toJSON()),
      annotations: toJSONAnnotations(this.annotations)
    };
  }
}
const formatIndexSignatures = (iss) => iss.map(String).join("; ");
const formatTypeLiteral = (ast) => {
  if (ast.propertySignatures.length > 0) {
    const pss = ast.propertySignatures.map(String).join("; ");
    if (ast.indexSignatures.length > 0) {
      return `{ ${pss}; ${formatIndexSignatures(ast.indexSignatures)} }`;
    } else {
      return `{ ${pss} }`;
    }
  } else {
    if (ast.indexSignatures.length > 0) {
      return `{ ${formatIndexSignatures(ast.indexSignatures)} }`;
    } else {
      return "{}";
    }
  }
};
const isTypeLiteral = /* @__PURE__ */ createASTGuard("TypeLiteral");
const sortCandidates = /* @__PURE__ */ sort(/* @__PURE__ */ mapInput$2(Order$1, (ast) => {
  switch (ast._tag) {
    case "AnyKeyword":
      return 0;
    case "UnknownKeyword":
      return 1;
    case "ObjectKeyword":
      return 2;
    case "StringKeyword":
    case "NumberKeyword":
    case "BooleanKeyword":
    case "BigIntKeyword":
    case "SymbolKeyword":
      return 3;
  }
  return 4;
}));
const literalMap = {
  string: "StringKeyword",
  number: "NumberKeyword",
  boolean: "BooleanKeyword",
  bigint: "BigIntKeyword"
};
const flatten$2 = (candidates) => flatMap$8(candidates, (ast) => isUnion(ast) ? flatten$2(ast.types) : [ast]);
const unify = (candidates) => {
  const cs = sortCandidates(candidates);
  const out = [];
  const uniques = {};
  const literals = [];
  for (const ast of cs) {
    switch (ast._tag) {
      case "NeverKeyword":
        break;
      case "AnyKeyword":
        return [anyKeyword];
      case "UnknownKeyword":
        return [unknownKeyword];
      // uniques
      case "ObjectKeyword":
      case "UndefinedKeyword":
      case "VoidKeyword":
      case "StringKeyword":
      case "NumberKeyword":
      case "BooleanKeyword":
      case "BigIntKeyword":
      case "SymbolKeyword": {
        if (!uniques[ast._tag]) {
          uniques[ast._tag] = ast;
          out.push(ast);
        }
        break;
      }
      case "Literal": {
        const type = typeof ast.literal;
        switch (type) {
          case "string":
          case "number":
          case "bigint":
          case "boolean": {
            const _tag = literalMap[type];
            if (!uniques[_tag] && !literals.includes(ast.literal)) {
              literals.push(ast.literal);
              out.push(ast);
            }
            break;
          }
          // null
          case "object": {
            if (!literals.includes(ast.literal)) {
              literals.push(ast.literal);
              out.push(ast);
            }
            break;
          }
        }
        break;
      }
      case "UniqueSymbol": {
        if (!uniques["SymbolKeyword"] && !literals.includes(ast.symbol)) {
          literals.push(ast.symbol);
          out.push(ast);
        }
        break;
      }
      case "TupleType": {
        if (!uniques["ObjectKeyword"]) {
          out.push(ast);
        }
        break;
      }
      case "TypeLiteral": {
        if (ast.propertySignatures.length === 0 && ast.indexSignatures.length === 0) {
          if (!uniques["{}"]) {
            uniques["{}"] = ast;
            out.push(ast);
          }
        } else if (!uniques["ObjectKeyword"]) {
          out.push(ast);
        }
        break;
      }
      default:
        out.push(ast);
    }
  }
  return out;
};
let Union$1 = class Union {
  types;
  annotations;
  static make = (types, annotations2) => {
    return isMembers(types) ? new Union(types, annotations2) : types.length === 1 ? types[0] : neverKeyword;
  };
  /** @internal */
  static unify = (candidates, annotations2) => {
    return Union.make(unify(flatten$2(candidates)), annotations2);
  };
  /**
   * @since 3.10.0
   */
  _tag = "Union";
  constructor(types, annotations2 = {}) {
    this.types = types;
    this.annotations = annotations2;
  }
  /**
   * @since 3.10.0
   */
  toString() {
    return getOrElse(getExpected(this), () => this.types.map(String).join(" | "));
  }
  /**
   * @since 3.10.0
   */
  toJSON() {
    return {
      _tag: this._tag,
      types: this.types.map((ast) => ast.toJSON()),
      annotations: toJSONAnnotations(this.annotations)
    };
  }
};
const mapMembers = (members, f) => members.map(f);
const isMembers = (as2) => as2.length > 1;
const isUnion = /* @__PURE__ */ createASTGuard("Union");
const toJSONMemoMap = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/Schema/AST/toJSONMemoMap"), () => /* @__PURE__ */ new WeakMap());
class Suspend {
  f;
  annotations;
  /**
   * @since 3.10.0
   */
  _tag = "Suspend";
  constructor(f, annotations2 = {}) {
    this.f = f;
    this.annotations = annotations2;
    this.f = memoizeThunk(f);
  }
  /**
   * @since 3.10.0
   */
  toString() {
    return getExpected(this).pipe(orElse$5(() => flatMap$9(liftThrowable(this.f)(), (ast) => getExpected(ast))), getOrElse(() => "<suspended schema>"));
  }
  /**
   * @since 3.10.0
   */
  toJSON() {
    const ast = this.f();
    let out = toJSONMemoMap.get(ast);
    if (out) {
      return out;
    }
    toJSONMemoMap.set(ast, {
      _tag: this._tag
    });
    out = {
      _tag: this._tag,
      ast: ast.toJSON(),
      annotations: toJSONAnnotations(this.annotations)
    };
    toJSONMemoMap.set(ast, out);
    return out;
  }
}
let Refinement$1 = class Refinement {
  from;
  filter;
  annotations;
  /**
   * @since 3.10.0
   */
  _tag = "Refinement";
  constructor(from, filter2, annotations2 = {}) {
    this.from = from;
    this.filter = filter2;
    this.annotations = annotations2;
  }
  /**
   * @since 3.10.0
   */
  toString() {
    return getIdentifierAnnotation(this).pipe(getOrElse(() => match$9(getOrElseExpected(this), {
      onNone: () => `{ ${this.from} | filter }`,
      onSome: (expected) => isRefinement$1(this.from) ? String(this.from) + " & " + expected : expected
    })));
  }
  /**
   * @since 3.10.0
   */
  toJSON() {
    return {
      _tag: this._tag,
      from: this.from.toJSON(),
      annotations: toJSONAnnotations(this.annotations)
    };
  }
};
const isRefinement$1 = /* @__PURE__ */ createASTGuard("Refinement");
const defaultParseOption = {};
let Transformation$1 = class Transformation {
  from;
  to;
  transformation;
  annotations;
  /**
   * @since 3.10.0
   */
  _tag = "Transformation";
  constructor(from, to, transformation, annotations2 = {}) {
    this.from = from;
    this.to = to;
    this.transformation = transformation;
    this.annotations = annotations2;
  }
  /**
   * @since 3.10.0
   */
  toString() {
    return getOrElse(getExpected(this), () => `(${String(this.from)} <-> ${String(this.to)})`);
  }
  /**
   * @since 3.10.0
   */
  toJSON() {
    return {
      _tag: this._tag,
      from: this.from.toJSON(),
      to: this.to.toJSON(),
      annotations: toJSONAnnotations(this.annotations)
    };
  }
};
const isTransformation$1 = /* @__PURE__ */ createASTGuard("Transformation");
class FinalTransformation {
  decode;
  encode;
  /**
   * @since 3.10.0
   */
  _tag = "FinalTransformation";
  constructor(decode2, encode2) {
    this.decode = decode2;
    this.encode = encode2;
  }
}
const createTransformationGuard = (tag) => (ast) => ast._tag === tag;
class ComposeTransformation {
  /**
   * @since 3.10.0
   */
  _tag = "ComposeTransformation";
}
const composeTransformation = /* @__PURE__ */ new ComposeTransformation();
let PropertySignatureTransformation$1 = class PropertySignatureTransformation {
  from;
  to;
  decode;
  encode;
  constructor(from, to, decode2, encode2) {
    this.from = from;
    this.to = to;
    this.decode = decode2;
    this.encode = encode2;
  }
};
class TypeLiteralTransformation {
  propertySignatureTransformations;
  /**
   * @since 3.10.0
   */
  _tag = "TypeLiteralTransformation";
  constructor(propertySignatureTransformations) {
    this.propertySignatureTransformations = propertySignatureTransformations;
    const fromKeys = {};
    const toKeys = {};
    for (const pst of propertySignatureTransformations) {
      const from = pst.from;
      if (fromKeys[from]) {
        throw new Error(getASTDuplicatePropertySignatureTransformationErrorMessage(from));
      }
      fromKeys[from] = true;
      const to = pst.to;
      if (toKeys[to]) {
        throw new Error(getASTDuplicatePropertySignatureTransformationErrorMessage(to));
      }
      toKeys[to] = true;
    }
  }
}
const isTypeLiteralTransformation = /* @__PURE__ */ createTransformationGuard("TypeLiteralTransformation");
const annotations = (ast, overrides) => {
  const d = Object.getOwnPropertyDescriptors(ast);
  const value2 = {
    ...ast.annotations,
    ...overrides
  };
  const surrogate = getSurrogateAnnotation(ast);
  if (isSome(surrogate)) {
    value2[SurrogateAnnotationId] = annotations(surrogate.value, overrides);
  }
  d.annotations.value = value2;
  return Object.create(Object.getPrototypeOf(ast), d);
};
const STRING_KEYWORD_PATTERN = "[\\s\\S]*?";
const NUMBER_KEYWORD_PATTERN = "[+-]?\\d*\\.?\\d+(?:[Ee][+-]?\\d+)?";
const getTemplateLiteralSpanTypePattern = (type, capture2) => {
  switch (type._tag) {
    case "Literal":
      return escape(String(type.literal));
    case "StringKeyword":
      return STRING_KEYWORD_PATTERN;
    case "NumberKeyword":
      return NUMBER_KEYWORD_PATTERN;
    case "TemplateLiteral":
      return getTemplateLiteralPattern(type);
    case "Union":
      return type.types.map((type2) => getTemplateLiteralSpanTypePattern(type2)).join("|");
  }
};
const handleTemplateLiteralSpanTypeParens = (type, s, capture2, top) => {
  if (isUnion(type)) ;
  else {
    return s;
  }
  return `(${s})`;
};
const getTemplateLiteralPattern = (ast, capture2, top) => {
  let pattern = ``;
  if (ast.head !== "") {
    const head2 = escape(ast.head);
    pattern += head2;
  }
  for (const span2 of ast.spans) {
    const spanPattern = getTemplateLiteralSpanTypePattern(span2.type);
    pattern += handleTemplateLiteralSpanTypeParens(span2.type, spanPattern);
    if (span2.literal !== "") {
      const literal2 = escape(span2.literal);
      pattern += literal2;
    }
  }
  return pattern;
};
const getTemplateLiteralRegExp = (ast) => new RegExp(`^${getTemplateLiteralPattern(ast)}$`);
const record = (key, value2) => {
  const propertySignatures = [];
  const indexSignatures = [];
  const go2 = (key2) => {
    switch (key2._tag) {
      case "NeverKeyword":
        break;
      case "StringKeyword":
      case "SymbolKeyword":
      case "TemplateLiteral":
      case "Refinement":
        indexSignatures.push(new IndexSignature(key2, value2, true));
        break;
      case "Literal":
        if (isString(key2.literal) || isNumber(key2.literal)) {
          propertySignatures.push(new PropertySignature(key2.literal, value2, false, true));
        } else {
          throw new Error(getASTUnsupportedLiteralErrorMessage(key2.literal));
        }
        break;
      case "Enums": {
        for (const [_, name] of key2.enums) {
          propertySignatures.push(new PropertySignature(name, value2, false, true));
        }
        break;
      }
      case "UniqueSymbol":
        propertySignatures.push(new PropertySignature(key2.symbol, value2, false, true));
        break;
      case "Union":
        key2.types.forEach(go2);
        break;
      default:
        throw new Error(getASTUnsupportedKeySchemaErrorMessage(key2));
    }
  };
  go2(key);
  return {
    propertySignatures,
    indexSignatures
  };
};
const pickAnnotations = (annotationIds) => (annotated) => {
  let out = void 0;
  for (const id of annotationIds) {
    if (Object.prototype.hasOwnProperty.call(annotated.annotations, id)) {
      if (out === void 0) {
        out = {};
      }
      out[id] = annotated.annotations[id];
    }
  }
  return out;
};
const omitAnnotations = (annotationIds) => (annotated) => {
  const out = {
    ...annotated.annotations
  };
  for (const id of annotationIds) {
    delete out[id];
  }
  return out;
};
const preserveTransformationAnnotations = /* @__PURE__ */ pickAnnotations([ExamplesAnnotationId, DefaultAnnotationId, JSONSchemaAnnotationId, ArbitraryAnnotationId, PrettyAnnotationId, EquivalenceAnnotationId]);
const typeAST = (ast) => {
  switch (ast._tag) {
    case "Declaration": {
      const typeParameters = changeMap(ast.typeParameters, typeAST);
      return typeParameters === ast.typeParameters ? ast : new Declaration(typeParameters, ast.decodeUnknown, ast.encodeUnknown, ast.annotations);
    }
    case "TupleType": {
      const elements = changeMap(ast.elements, (e) => {
        const type = typeAST(e.type);
        return type === e.type ? e : new OptionalType(type, e.isOptional);
      });
      const restASTs = getRestASTs(ast.rest);
      const rest = changeMap(restASTs, typeAST);
      return elements === ast.elements && rest === restASTs ? ast : new TupleType(elements, rest.map((type) => new Type$1(type)), ast.isReadonly, ast.annotations);
    }
    case "TypeLiteral": {
      const propertySignatures = changeMap(ast.propertySignatures, (p) => {
        const type = typeAST(p.type);
        return type === p.type ? p : new PropertySignature(p.name, type, p.isOptional, p.isReadonly);
      });
      const indexSignatures = changeMap(ast.indexSignatures, (is2) => {
        const type = typeAST(is2.type);
        return type === is2.type ? is2 : new IndexSignature(is2.parameter, type, is2.isReadonly);
      });
      return propertySignatures === ast.propertySignatures && indexSignatures === ast.indexSignatures ? ast : new TypeLiteral(propertySignatures, indexSignatures, ast.annotations);
    }
    case "Union": {
      const types = changeMap(ast.types, typeAST);
      return types === ast.types ? ast : Union$1.make(types, ast.annotations);
    }
    case "Suspend":
      return new Suspend(() => typeAST(ast.f()), ast.annotations);
    case "Refinement": {
      const from = typeAST(ast.from);
      return from === ast.from ? ast : new Refinement$1(from, ast.filter, ast.annotations);
    }
    case "Transformation": {
      const preserve = preserveTransformationAnnotations(ast);
      return typeAST(preserve !== void 0 ? annotations(ast.to, preserve) : ast.to);
    }
  }
  return ast;
};
const createJSONIdentifierAnnotation = (annotated) => match$9(getJSONIdentifier(annotated), {
  onNone: () => void 0,
  onSome: (identifier2) => ({
    [JSONIdentifierAnnotationId]: identifier2
  })
});
function changeMap(as2, f) {
  let changed = false;
  const out = allocate(as2.length);
  for (let i = 0; i < as2.length; i++) {
    const a = as2[i];
    const fa = f(a);
    if (fa !== a) {
      changed = true;
    }
    out[i] = fa;
  }
  return changed ? out : as2;
}
const encodedAST_ = (ast, isBound) => {
  switch (ast._tag) {
    case "Declaration": {
      const typeParameters = changeMap(ast.typeParameters, (ast2) => encodedAST_(ast2));
      return typeParameters === ast.typeParameters ? ast : new Declaration(typeParameters, ast.decodeUnknown, ast.encodeUnknown, ast.annotations);
    }
    case "TupleType": {
      const elements = changeMap(ast.elements, (e) => {
        const type = encodedAST_(e.type);
        return type === e.type ? e : new OptionalType(type, e.isOptional);
      });
      const restASTs = getRestASTs(ast.rest);
      const rest = changeMap(restASTs, (ast2) => encodedAST_(ast2));
      return elements === ast.elements && rest === restASTs ? ast : new TupleType(elements, rest.map((ast2) => new Type$1(ast2)), ast.isReadonly, createJSONIdentifierAnnotation(ast));
    }
    case "TypeLiteral": {
      const propertySignatures = changeMap(ast.propertySignatures, (ps) => {
        const type = encodedAST_(ps.type);
        return type === ps.type ? ps : new PropertySignature(ps.name, type, ps.isOptional, ps.isReadonly);
      });
      const indexSignatures = changeMap(ast.indexSignatures, (is2) => {
        const type = encodedAST_(is2.type);
        return type === is2.type ? is2 : new IndexSignature(is2.parameter, type, is2.isReadonly);
      });
      return propertySignatures === ast.propertySignatures && indexSignatures === ast.indexSignatures ? ast : new TypeLiteral(propertySignatures, indexSignatures, createJSONIdentifierAnnotation(ast));
    }
    case "Union": {
      const types = changeMap(ast.types, (ast2) => encodedAST_(ast2));
      return types === ast.types ? ast : Union$1.make(types, createJSONIdentifierAnnotation(ast));
    }
    case "Suspend":
      return new Suspend(() => encodedAST_(ast.f()), createJSONIdentifierAnnotation(ast));
    case "Refinement": {
      const from = encodedAST_(ast.from);
      const identifier2 = createJSONIdentifierAnnotation(ast);
      return identifier2 ? annotations(from, identifier2) : from;
    }
    case "Transformation": {
      const identifier2 = createJSONIdentifierAnnotation(ast);
      return encodedAST_(identifier2 ? annotations(ast.from, identifier2) : ast.from);
    }
  }
  return ast;
};
const encodedAST = (ast) => encodedAST_(ast);
const toJSONAnnotations = (annotations2) => {
  const out = {};
  for (const k of Object.getOwnPropertySymbols(annotations2)) {
    out[String(k)] = annotations2[k];
  }
  return out;
};
const getEncodedParameter = (ast) => {
  switch (ast._tag) {
    case "StringKeyword":
    case "SymbolKeyword":
    case "TemplateLiteral":
      return ast;
    case "Refinement":
      return getEncodedParameter(ast.from);
  }
};
const compose$1 = (ab, cd) => new Transformation$1(ab, cd, composeTransformation);
const formatKeyword = (ast) => getOrElse(getExpected(ast), () => ast._tag);
function getBrands(ast) {
  return match$9(getBrandAnnotation(ast), {
    onNone: () => "",
    onSome: (brands) => brands.map((brand) => ` & Brand<${formatUnknown(brand)}>`).join("")
  });
}
const getOrElseExpected = (ast) => getTitleAnnotation(ast).pipe(orElse$5(() => getDescriptionAnnotation(ast)), orElse$5(() => getAutoTitleAnnotation(ast)), map$i((s) => s + getBrands(ast)));
const getExpected = (ast) => orElse$5(getIdentifierAnnotation(ast), () => getOrElseExpected(ast));
class Pointer {
  path;
  actual;
  issue;
  /**
   * @since 3.10.0
   */
  _tag = "Pointer";
  constructor(path, actual, issue) {
    this.path = path;
    this.actual = actual;
    this.issue = issue;
  }
}
class Unexpected {
  actual;
  message;
  /**
   * @since 3.10.0
   */
  _tag = "Unexpected";
  constructor(actual, message) {
    this.actual = actual;
    this.message = message;
  }
}
class Missing {
  ast;
  message;
  /**
   * @since 3.10.0
   */
  _tag = "Missing";
  /**
   * @since 3.10.0
   */
  actual = void 0;
  constructor(ast, message) {
    this.ast = ast;
    this.message = message;
  }
}
class Composite2 {
  ast;
  actual;
  issues;
  output;
  /**
   * @since 3.10.0
   */
  _tag = "Composite";
  constructor(ast, actual, issues, output) {
    this.ast = ast;
    this.actual = actual;
    this.issues = issues;
    this.output = output;
  }
}
class Refinement2 {
  ast;
  actual;
  kind;
  issue;
  /**
   * @since 3.10.0
   */
  _tag = "Refinement";
  constructor(ast, actual, kind, issue) {
    this.ast = ast;
    this.actual = actual;
    this.kind = kind;
    this.issue = issue;
  }
}
class Transformation2 {
  ast;
  actual;
  kind;
  issue;
  /**
   * @since 3.10.0
   */
  _tag = "Transformation";
  constructor(ast, actual, kind, issue) {
    this.ast = ast;
    this.actual = actual;
    this.kind = kind;
    this.issue = issue;
  }
}
class Type2 {
  ast;
  actual;
  message;
  /**
   * @since 3.10.0
   */
  _tag = "Type";
  constructor(ast, actual, message) {
    this.ast = ast;
    this.actual = actual;
    this.message = message;
  }
}
class Forbidden {
  ast;
  actual;
  message;
  /**
   * @since 3.10.0
   */
  _tag = "Forbidden";
  constructor(ast, actual, message) {
    this.ast = ast;
    this.actual = actual;
    this.message = message;
  }
}
const ParseErrorTypeId = /* @__PURE__ */ Symbol.for("effect/Schema/ParseErrorTypeId");
class ParseError extends (/* @__PURE__ */ TaggedError("ParseError")) {
  /**
   * @since 3.10.0
   */
  [ParseErrorTypeId] = ParseErrorTypeId;
  get message() {
    return this.toString();
  }
  /**
   * @since 3.10.0
   */
  toString() {
    return TreeFormatter.formatIssueSync(this.issue);
  }
  /**
   * @since 3.10.0
   */
  toJSON() {
    return {
      _id: "ParseError",
      message: this.toString()
    };
  }
  /**
   * @since 3.10.0
   */
  [NodeInspectSymbol]() {
    return this.toJSON();
  }
}
const parseError = (issue) => new ParseError({
  issue
});
const succeed$2 = right;
const fail$3 = left;
const _try = try_$2;
const isEither = isEither$1;
const flatMap$2 = /* @__PURE__ */ dual(2, (self, f) => {
  return isEither(self) ? match$a(self, {
    onLeft: left,
    onRight: f
  }) : flatMap$3(self, f);
});
const map$2 = /* @__PURE__ */ dual(2, (self, f) => {
  return isEither(self) ? map$j(self, f) : map$3(self, f);
});
const mapError = /* @__PURE__ */ dual(2, (self, f) => {
  return isEither(self) ? mapLeft(self, f) : mapError$1(self, f);
});
const mapBoth = /* @__PURE__ */ dual(2, (self, options) => {
  return isEither(self) ? mapBoth$3(self, {
    onLeft: options.onFailure,
    onRight: options.onSuccess
  }) : mapBoth$1(self, options);
});
const orElse$1 = /* @__PURE__ */ dual(2, (self, f) => {
  return isEither(self) ? match$a(self, {
    onLeft: f,
    onRight: right
  }) : catchAll(self, f);
});
const mergeInternalOptions = (options, overrideOptions) => {
  if (overrideOptions === void 0 || isNumber(overrideOptions)) {
    return options;
  }
  if (options === void 0) {
    return overrideOptions;
  }
  return {
    ...options,
    ...overrideOptions
  };
};
const getEither = (ast, isDecoding, options) => {
  const parser = goMemo(ast, isDecoding);
  return (u, overrideOptions) => parser(u, mergeInternalOptions(options, overrideOptions));
};
const getSync = (ast, isDecoding, options) => {
  const parser = getEither(ast, isDecoding, options);
  return (input, overrideOptions) => getOrThrowWith(parser(input, overrideOptions), parseError);
};
const getEffect = (ast, isDecoding, options) => {
  const parser = goMemo(ast, isDecoding);
  return (input, overrideOptions) => parser(input, {
    ...mergeInternalOptions(options, overrideOptions),
    isEffectAllowed: true
  });
};
const decodeUnknownEither = (schema, options) => getEither(schema.ast, true, options);
const decodeUnknown$1 = (schema, options) => getEffect(schema.ast, true, options);
const encodeUnknown = (schema, options) => getEffect(schema.ast, false, options);
const validateSync = (schema, options) => getSync(typeAST(schema.ast), true, options);
const is = (schema, options) => {
  const parser = goMemo(typeAST(schema.ast), true);
  return (u, overrideOptions) => isRight(parser(u, {
    exact: true,
    ...mergeInternalOptions(options, overrideOptions)
  }));
};
const decodeMemoMap = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/ParseResult/decodeMemoMap"), () => /* @__PURE__ */ new WeakMap());
const encodeMemoMap = /* @__PURE__ */ globalValue(/* @__PURE__ */ Symbol.for("effect/ParseResult/encodeMemoMap"), () => /* @__PURE__ */ new WeakMap());
const goMemo = (ast, isDecoding) => {
  const memoMap = isDecoding ? decodeMemoMap : encodeMemoMap;
  const memo = memoMap.get(ast);
  if (memo) {
    return memo;
  }
  const raw = go(ast, isDecoding);
  const parseOptionsAnnotation = getParseOptionsAnnotation(ast);
  const parserWithOptions = isSome(parseOptionsAnnotation) ? (i, options) => raw(i, mergeInternalOptions(options, parseOptionsAnnotation.value)) : raw;
  const decodingFallbackAnnotation = getDecodingFallbackAnnotation(ast);
  const parser = isDecoding && isSome(decodingFallbackAnnotation) ? (i, options) => handleForbidden(orElse$1(parserWithOptions(i, options), decodingFallbackAnnotation.value), ast, i, options) : parserWithOptions;
  memoMap.set(ast, parser);
  return parser;
};
const getConcurrency = (ast) => getOrUndefined(getConcurrencyAnnotation(ast));
const getBatching = (ast) => getOrUndefined(getBatchingAnnotation(ast));
const go = (ast, isDecoding) => {
  switch (ast._tag) {
    case "Refinement": {
      if (isDecoding) {
        const from = goMemo(ast.from, true);
        return (i, options) => {
          options = options ?? defaultParseOption;
          const allErrors = options?.errors === "all";
          const result = flatMap$2(orElse$1(from(i, options), (ef) => {
            const issue = new Refinement2(ast, i, "From", ef);
            if (allErrors && hasStableFilter(ast) && isComposite(ef)) {
              return match$9(ast.filter(i, options, ast), {
                onNone: () => left(issue),
                onSome: (ep) => left(new Composite2(ast, i, [issue, new Refinement2(ast, i, "Predicate", ep)]))
              });
            }
            return left(issue);
          }), (a) => match$9(ast.filter(a, options, ast), {
            onNone: () => right(a),
            onSome: (ep) => left(new Refinement2(ast, i, "Predicate", ep))
          }));
          return handleForbidden(result, ast, i, options);
        };
      } else {
        const from = goMemo(typeAST(ast), true);
        const to = goMemo(dropRightRefinement(ast.from), false);
        return (i, options) => handleForbidden(flatMap$2(from(i, options), (a) => to(a, options)), ast, i, options);
      }
    }
    case "Transformation": {
      const transform2 = getFinalTransformation(ast.transformation, isDecoding);
      const from = isDecoding ? goMemo(ast.from, true) : goMemo(ast.to, false);
      const to = isDecoding ? goMemo(ast.to, true) : goMemo(ast.from, false);
      return (i, options) => handleForbidden(flatMap$2(mapError(from(i, options), (e) => new Transformation2(ast, i, isDecoding ? "Encoded" : "Type", e)), (a) => flatMap$2(mapError(transform2(a, options ?? defaultParseOption, ast, i), (e) => new Transformation2(ast, i, "Transformation", e)), (i2) => mapError(to(i2, options), (e) => new Transformation2(ast, i, isDecoding ? "Type" : "Encoded", e)))), ast, i, options);
    }
    case "Declaration": {
      const parse = isDecoding ? ast.decodeUnknown(...ast.typeParameters) : ast.encodeUnknown(...ast.typeParameters);
      return (i, options) => handleForbidden(parse(i, options ?? defaultParseOption, ast), ast, i, options);
    }
    case "Literal":
      return fromRefinement(ast, (u) => u === ast.literal);
    case "UniqueSymbol":
      return fromRefinement(ast, (u) => u === ast.symbol);
    case "UndefinedKeyword":
      return fromRefinement(ast, isUndefined);
    case "NeverKeyword":
      return fromRefinement(ast, isNever);
    case "UnknownKeyword":
    case "AnyKeyword":
    case "VoidKeyword":
      return right;
    case "StringKeyword":
      return fromRefinement(ast, isString);
    case "NumberKeyword":
      return fromRefinement(ast, isNumber);
    case "BooleanKeyword":
      return fromRefinement(ast, isBoolean);
    case "BigIntKeyword":
      return fromRefinement(ast, isBigInt);
    case "SymbolKeyword":
      return fromRefinement(ast, isSymbol);
    case "ObjectKeyword":
      return fromRefinement(ast, isObject);
    case "Enums":
      return fromRefinement(ast, (u) => ast.enums.some(([_, value2]) => value2 === u));
    case "TemplateLiteral": {
      const regex = getTemplateLiteralRegExp(ast);
      return fromRefinement(ast, (u) => isString(u) && regex.test(u));
    }
    case "TupleType": {
      const elements = ast.elements.map((e) => goMemo(e.type, isDecoding));
      const rest = ast.rest.map((annotatedAST) => goMemo(annotatedAST.type, isDecoding));
      let requiredTypes = ast.elements.filter((e) => !e.isOptional);
      if (ast.rest.length > 0) {
        requiredTypes = requiredTypes.concat(ast.rest.slice(1));
      }
      const requiredLen = requiredTypes.length;
      const expectedIndexes = ast.elements.length > 0 ? ast.elements.map((_, i) => i).join(" | ") : "never";
      const concurrency = getConcurrency(ast);
      const batching = getBatching(ast);
      return (input, options) => {
        if (!isArray(input)) {
          return left(new Type2(ast, input));
        }
        const allErrors = options?.errors === "all";
        const es = [];
        let stepKey = 0;
        const output = [];
        const len = input.length;
        for (let i2 = len; i2 <= requiredLen - 1; i2++) {
          const e = new Pointer(i2, input, new Missing(requiredTypes[i2 - len]));
          if (allErrors) {
            es.push([stepKey++, e]);
            continue;
          } else {
            return left(new Composite2(ast, input, e, output));
          }
        }
        if (ast.rest.length === 0) {
          for (let i2 = ast.elements.length; i2 <= len - 1; i2++) {
            const e = new Pointer(i2, input, new Unexpected(input[i2], `is unexpected, expected: ${expectedIndexes}`));
            if (allErrors) {
              es.push([stepKey++, e]);
              continue;
            } else {
              return left(new Composite2(ast, input, e, output));
            }
          }
        }
        let i = 0;
        let queue = void 0;
        for (; i < elements.length; i++) {
          if (len < i + 1) {
            if (ast.elements[i].isOptional) {
              continue;
            }
          } else {
            const parser = elements[i];
            const te = parser(input[i], options);
            if (isEither(te)) {
              if (isLeft(te)) {
                const e = new Pointer(i, input, te.left);
                if (allErrors) {
                  es.push([stepKey++, e]);
                  continue;
                } else {
                  return left(new Composite2(ast, input, e, sortByIndex(output)));
                }
              }
              output.push([stepKey++, te.right]);
            } else {
              const nk = stepKey++;
              const index = i;
              if (!queue) {
                queue = [];
              }
              queue.push(({
                es: es2,
                output: output2
              }) => flatMap$3(either(te), (t) => {
                if (isLeft(t)) {
                  const e = new Pointer(index, input, t.left);
                  if (allErrors) {
                    es2.push([nk, e]);
                    return _void;
                  } else {
                    return left(new Composite2(ast, input, e, sortByIndex(output2)));
                  }
                }
                output2.push([nk, t.right]);
                return _void;
              }));
            }
          }
        }
        if (isNonEmptyReadonlyArray(rest)) {
          const [head2, ...tail] = rest;
          for (; i < len - tail.length; i++) {
            const te = head2(input[i], options);
            if (isEither(te)) {
              if (isLeft(te)) {
                const e = new Pointer(i, input, te.left);
                if (allErrors) {
                  es.push([stepKey++, e]);
                  continue;
                } else {
                  return left(new Composite2(ast, input, e, sortByIndex(output)));
                }
              } else {
                output.push([stepKey++, te.right]);
              }
            } else {
              const nk = stepKey++;
              const index = i;
              if (!queue) {
                queue = [];
              }
              queue.push(({
                es: es2,
                output: output2
              }) => flatMap$3(either(te), (t) => {
                if (isLeft(t)) {
                  const e = new Pointer(index, input, t.left);
                  if (allErrors) {
                    es2.push([nk, e]);
                    return _void;
                  } else {
                    return left(new Composite2(ast, input, e, sortByIndex(output2)));
                  }
                } else {
                  output2.push([nk, t.right]);
                  return _void;
                }
              }));
            }
          }
          for (let j = 0; j < tail.length; j++) {
            i += j;
            if (len < i + 1) {
              continue;
            } else {
              const te = tail[j](input[i], options);
              if (isEither(te)) {
                if (isLeft(te)) {
                  const e = new Pointer(i, input, te.left);
                  if (allErrors) {
                    es.push([stepKey++, e]);
                    continue;
                  } else {
                    return left(new Composite2(ast, input, e, sortByIndex(output)));
                  }
                }
                output.push([stepKey++, te.right]);
              } else {
                const nk = stepKey++;
                const index = i;
                if (!queue) {
                  queue = [];
                }
                queue.push(({
                  es: es2,
                  output: output2
                }) => flatMap$3(either(te), (t) => {
                  if (isLeft(t)) {
                    const e = new Pointer(index, input, t.left);
                    if (allErrors) {
                      es2.push([nk, e]);
                      return _void;
                    } else {
                      return left(new Composite2(ast, input, e, sortByIndex(output2)));
                    }
                  }
                  output2.push([nk, t.right]);
                  return _void;
                }));
              }
            }
          }
        }
        const computeResult = ({
          es: es2,
          output: output2
        }) => isNonEmptyArray(es2) ? left(new Composite2(ast, input, sortByIndex(es2), sortByIndex(output2))) : right(sortByIndex(output2));
        if (queue && queue.length > 0) {
          const cqueue = queue;
          return suspend$3(() => {
            const state = {
              es: copy$1(es),
              output: copy$1(output)
            };
            return flatMap$3(forEach(cqueue, (f) => f(state), {
              concurrency,
              batching,
              discard: true
            }), () => computeResult(state));
          });
        }
        return computeResult({
          output,
          es
        });
      };
    }
    case "TypeLiteral": {
      if (ast.propertySignatures.length === 0 && ast.indexSignatures.length === 0) {
        return fromRefinement(ast, isNotNullable);
      }
      const propertySignatures = [];
      const expectedKeysMap = {};
      const expectedKeys = [];
      for (const ps of ast.propertySignatures) {
        propertySignatures.push([goMemo(ps.type, isDecoding), ps]);
        expectedKeysMap[ps.name] = null;
        expectedKeys.push(ps.name);
      }
      const indexSignatures = ast.indexSignatures.map((is2) => [goMemo(is2.parameter, isDecoding), goMemo(is2.type, isDecoding), is2.parameter]);
      const expectedAST = Union$1.make(ast.indexSignatures.map((is2) => is2.parameter).concat(expectedKeys.map((key) => isSymbol(key) ? new UniqueSymbol(key) : new Literal$1(key))));
      const expected = goMemo(expectedAST, isDecoding);
      const concurrency = getConcurrency(ast);
      const batching = getBatching(ast);
      return (input, options) => {
        if (!isRecord(input)) {
          return left(new Type2(ast, input));
        }
        const allErrors = options?.errors === "all";
        const es = [];
        let stepKey = 0;
        const onExcessPropertyError = options?.onExcessProperty === "error";
        const onExcessPropertyPreserve = options?.onExcessProperty === "preserve";
        const output = {};
        let inputKeys;
        if (onExcessPropertyError || onExcessPropertyPreserve) {
          inputKeys = ownKeys(input);
          for (const key of inputKeys) {
            const te = expected(key, options);
            if (isEither(te) && isLeft(te)) {
              if (onExcessPropertyError) {
                const e = new Pointer(key, input, new Unexpected(input[key], `is unexpected, expected: ${String(expectedAST)}`));
                if (allErrors) {
                  es.push([stepKey++, e]);
                  continue;
                } else {
                  return left(new Composite2(ast, input, e, output));
                }
              } else {
                output[key] = input[key];
              }
            }
          }
        }
        let queue = void 0;
        const isExact = options?.exact === true;
        for (let i = 0; i < propertySignatures.length; i++) {
          const ps = propertySignatures[i][1];
          const name = ps.name;
          const hasKey = Object.prototype.hasOwnProperty.call(input, name);
          if (!hasKey) {
            if (ps.isOptional) {
              continue;
            } else if (isExact) {
              const e = new Pointer(name, input, new Missing(ps));
              if (allErrors) {
                es.push([stepKey++, e]);
                continue;
              } else {
                return left(new Composite2(ast, input, e, output));
              }
            }
          }
          const parser = propertySignatures[i][0];
          const te = parser(input[name], options);
          if (isEither(te)) {
            if (isLeft(te)) {
              const e = new Pointer(name, input, hasKey ? te.left : new Missing(ps));
              if (allErrors) {
                es.push([stepKey++, e]);
                continue;
              } else {
                return left(new Composite2(ast, input, e, output));
              }
            }
            output[name] = te.right;
          } else {
            const nk = stepKey++;
            const index = name;
            if (!queue) {
              queue = [];
            }
            queue.push(({
              es: es2,
              output: output2
            }) => flatMap$3(either(te), (t) => {
              if (isLeft(t)) {
                const e = new Pointer(index, input, hasKey ? t.left : new Missing(ps));
                if (allErrors) {
                  es2.push([nk, e]);
                  return _void;
                } else {
                  return left(new Composite2(ast, input, e, output2));
                }
              }
              output2[index] = t.right;
              return _void;
            }));
          }
        }
        for (let i = 0; i < indexSignatures.length; i++) {
          const indexSignature = indexSignatures[i];
          const parameter = indexSignature[0];
          const type = indexSignature[1];
          const keys2 = getKeysForIndexSignature(input, indexSignature[2]);
          for (const key of keys2) {
            const keu = parameter(key, options);
            if (isEither(keu) && isRight(keu)) {
              const vpr = type(input[key], options);
              if (isEither(vpr)) {
                if (isLeft(vpr)) {
                  const e = new Pointer(key, input, vpr.left);
                  if (allErrors) {
                    es.push([stepKey++, e]);
                    continue;
                  } else {
                    return left(new Composite2(ast, input, e, output));
                  }
                } else {
                  if (!Object.prototype.hasOwnProperty.call(expectedKeysMap, key)) {
                    output[key] = vpr.right;
                  }
                }
              } else {
                const nk = stepKey++;
                const index = key;
                if (!queue) {
                  queue = [];
                }
                queue.push(({
                  es: es2,
                  output: output2
                }) => flatMap$3(either(vpr), (tv) => {
                  if (isLeft(tv)) {
                    const e = new Pointer(index, input, tv.left);
                    if (allErrors) {
                      es2.push([nk, e]);
                      return _void;
                    } else {
                      return left(new Composite2(ast, input, e, output2));
                    }
                  } else {
                    if (!Object.prototype.hasOwnProperty.call(expectedKeysMap, key)) {
                      output2[key] = tv.right;
                    }
                    return _void;
                  }
                }));
              }
            }
          }
        }
        const computeResult = ({
          es: es2,
          output: output2
        }) => {
          if (isNonEmptyArray(es2)) {
            return left(new Composite2(ast, input, sortByIndex(es2), output2));
          }
          if (options?.propertyOrder === "original") {
            const keys2 = inputKeys || ownKeys(input);
            for (const name of expectedKeys) {
              if (keys2.indexOf(name) === -1) {
                keys2.push(name);
              }
            }
            const out = {};
            for (const key of keys2) {
              if (Object.prototype.hasOwnProperty.call(output2, key)) {
                out[key] = output2[key];
              }
            }
            return right(out);
          }
          return right(output2);
        };
        if (queue && queue.length > 0) {
          const cqueue = queue;
          return suspend$3(() => {
            const state = {
              es: copy$1(es),
              output: Object.assign({}, output)
            };
            return flatMap$3(forEach(cqueue, (f) => f(state), {
              concurrency,
              batching,
              discard: true
            }), () => computeResult(state));
          });
        }
        return computeResult({
          es,
          output
        });
      };
    }
    case "Union": {
      const searchTree = getSearchTree(ast.types, isDecoding);
      const ownKeys$1 = ownKeys(searchTree.keys);
      const ownKeysLen = ownKeys$1.length;
      const astTypesLen = ast.types.length;
      const map2 = /* @__PURE__ */ new Map();
      for (let i = 0; i < astTypesLen; i++) {
        map2.set(ast.types[i], goMemo(ast.types[i], isDecoding));
      }
      const concurrency = getConcurrency(ast) ?? 1;
      const batching = getBatching(ast);
      return (input, options) => {
        const es = [];
        let stepKey = 0;
        let candidates = [];
        if (ownKeysLen > 0) {
          if (isRecordOrArray(input)) {
            for (let i = 0; i < ownKeysLen; i++) {
              const name = ownKeys$1[i];
              const buckets = searchTree.keys[name].buckets;
              if (Object.prototype.hasOwnProperty.call(input, name)) {
                const literal2 = String(input[name]);
                if (Object.prototype.hasOwnProperty.call(buckets, literal2)) {
                  candidates = candidates.concat(buckets[literal2]);
                } else {
                  const {
                    candidates: candidates2,
                    literals
                  } = searchTree.keys[name];
                  const literalsUnion = Union$1.make(literals);
                  const errorAst = candidates2.length === astTypesLen ? new TypeLiteral([new PropertySignature(name, literalsUnion, false, true)], []) : Union$1.make(candidates2);
                  es.push([stepKey++, new Composite2(errorAst, input, new Pointer(name, input, new Type2(literalsUnion, input[name])))]);
                }
              } else {
                const {
                  candidates: candidates2,
                  literals
                } = searchTree.keys[name];
                const fakePropertySignature = new PropertySignature(name, Union$1.make(literals), false, true);
                const errorAst = candidates2.length === astTypesLen ? new TypeLiteral([fakePropertySignature], []) : Union$1.make(candidates2);
                es.push([stepKey++, new Composite2(errorAst, input, new Pointer(name, input, new Missing(fakePropertySignature)))]);
              }
            }
          } else {
            const errorAst = searchTree.candidates.length === astTypesLen ? ast : Union$1.make(searchTree.candidates);
            es.push([stepKey++, new Type2(errorAst, input)]);
          }
        }
        if (searchTree.otherwise.length > 0) {
          candidates = candidates.concat(searchTree.otherwise);
        }
        let queue = void 0;
        for (let i = 0; i < candidates.length; i++) {
          const candidate = candidates[i];
          const pr = map2.get(candidate)(input, options);
          if (isEither(pr) && (!queue || queue.length === 0)) {
            if (isRight(pr)) {
              return pr;
            } else {
              es.push([stepKey++, pr.left]);
            }
          } else {
            const nk = stepKey++;
            if (!queue) {
              queue = [];
            }
            queue.push((state) => suspend$3(() => {
              if ("finalResult" in state) {
                return _void;
              } else {
                return flatMap$3(either(pr), (t) => {
                  if (isRight(t)) {
                    state.finalResult = t;
                  } else {
                    state.es.push([nk, t.left]);
                  }
                  return _void;
                });
              }
            }));
          }
        }
        const computeResult = (es2) => isNonEmptyArray(es2) ? es2.length === 1 && es2[0][1]._tag === "Type" ? left(es2[0][1]) : left(new Composite2(ast, input, sortByIndex(es2))) : (
          // this should never happen
          left(new Type2(ast, input))
        );
        if (queue && queue.length > 0) {
          const cqueue = queue;
          return suspend$3(() => {
            const state = {
              es: copy$1(es)
            };
            return flatMap$3(forEach(cqueue, (f) => f(state), {
              concurrency,
              batching,
              discard: true
            }), () => {
              if ("finalResult" in state) {
                return state.finalResult;
              }
              return computeResult(state.es);
            });
          });
        }
        return computeResult(es);
      };
    }
    case "Suspend": {
      const get2 = memoizeThunk(() => goMemo(annotations(ast.f(), ast.annotations), isDecoding));
      return (a, options) => get2()(a, options);
    }
  }
};
const fromRefinement = (ast, refinement) => (u) => refinement(u) ? right(u) : left(new Type2(ast, u));
const getLiterals = (ast, isDecoding) => {
  switch (ast._tag) {
    case "Declaration": {
      const annotation = getSurrogateAnnotation(ast);
      if (isSome(annotation)) {
        return getLiterals(annotation.value, isDecoding);
      }
      break;
    }
    case "TypeLiteral": {
      const out = [];
      for (let i = 0; i < ast.propertySignatures.length; i++) {
        const propertySignature = ast.propertySignatures[i];
        const type = isDecoding ? encodedAST(propertySignature.type) : typeAST(propertySignature.type);
        if (isLiteral(type) && !propertySignature.isOptional) {
          out.push([propertySignature.name, type]);
        }
      }
      return out;
    }
    case "TupleType": {
      const out = [];
      for (let i = 0; i < ast.elements.length; i++) {
        const element = ast.elements[i];
        const type = isDecoding ? encodedAST(element.type) : typeAST(element.type);
        if (isLiteral(type) && !element.isOptional) {
          out.push([i, type]);
        }
      }
      return out;
    }
    case "Refinement":
      return getLiterals(ast.from, isDecoding);
    case "Suspend":
      return getLiterals(ast.f(), isDecoding);
    case "Transformation":
      return getLiterals(isDecoding ? ast.from : ast.to, isDecoding);
  }
  return [];
};
const getSearchTree = (members, isDecoding) => {
  const keys2 = {};
  const otherwise = [];
  const candidates = [];
  for (let i = 0; i < members.length; i++) {
    const member = members[i];
    const tags = getLiterals(member, isDecoding);
    if (tags.length > 0) {
      candidates.push(member);
      for (let j = 0; j < tags.length; j++) {
        const [key, literal2] = tags[j];
        const hash2 = String(literal2.literal);
        keys2[key] = keys2[key] || {
          buckets: {},
          literals: [],
          candidates: []
        };
        const buckets = keys2[key].buckets;
        if (Object.prototype.hasOwnProperty.call(buckets, hash2)) {
          if (j < tags.length - 1) {
            continue;
          }
          buckets[hash2].push(member);
          keys2[key].literals.push(literal2);
          keys2[key].candidates.push(member);
        } else {
          buckets[hash2] = [member];
          keys2[key].literals.push(literal2);
          keys2[key].candidates.push(member);
          break;
        }
      }
    } else {
      otherwise.push(member);
    }
  }
  return {
    keys: keys2,
    otherwise,
    candidates
  };
};
const dropRightRefinement = (ast) => isRefinement$1(ast) ? dropRightRefinement(ast.from) : ast;
const handleForbidden = (effect2, ast, actual, options) => {
  if (options?.isEffectAllowed === true) {
    return effect2;
  }
  if (isEither(effect2)) {
    return effect2;
  }
  const scheduler = new SyncScheduler();
  const fiber = runFork$1(effect2, {
    scheduler
  });
  scheduler.flush();
  const exit2 = fiber.unsafePoll();
  if (exit2) {
    if (isSuccess(exit2)) {
      return right(exit2.value);
    }
    const cause = exit2.cause;
    if (isFailType(cause)) {
      return left(cause.error);
    }
    return left(new Forbidden(ast, actual, pretty$1(cause)));
  }
  return left(new Forbidden(ast, actual, "cannot be be resolved synchronously, this is caused by using runSync on an effect that performs async work"));
};
const compare = ([a], [b]) => a > b ? 1 : a < b ? -1 : 0;
function sortByIndex(es) {
  return es.sort(compare).map((t) => t[1]);
}
const getFinalTransformation = (transformation, isDecoding) => {
  switch (transformation._tag) {
    case "FinalTransformation":
      return isDecoding ? transformation.decode : transformation.encode;
    case "ComposeTransformation":
      return right;
    case "TypeLiteralTransformation":
      return (input) => {
        let out = right(input);
        for (const pst of transformation.propertySignatureTransformations) {
          const [from, to] = isDecoding ? [pst.from, pst.to] : [pst.to, pst.from];
          const transformation2 = isDecoding ? pst.decode : pst.encode;
          const f = (input2) => {
            const o = transformation2(Object.prototype.hasOwnProperty.call(input2, from) ? some(input2[from]) : none$6());
            delete input2[from];
            if (isSome(o)) {
              input2[to] = o.value;
            }
            return input2;
          };
          out = map$2(out, f);
        }
        return out;
      };
  }
};
const makeTree = (value2, forest = []) => ({
  value: value2,
  forest
});
const TreeFormatter = {
  formatIssue: (issue) => map$2(formatTree(issue), drawTree),
  formatIssueSync: (issue) => {
    const e = TreeFormatter.formatIssue(issue);
    return isEither(e) ? getOrThrow(e) : runSync(e);
  },
  formatError: (error) => TreeFormatter.formatIssue(error.issue),
  formatErrorSync: (error) => TreeFormatter.formatIssueSync(error.issue)
};
const drawTree = (tree) => tree.value + draw("\n", tree.forest);
const draw = (indentation, forest) => {
  let r = "";
  const len = forest.length;
  let tree;
  for (let i = 0; i < len; i++) {
    tree = forest[i];
    const isLast = i === len - 1;
    r += indentation + (isLast ? "└" : "├") + "─ " + tree.value;
    r += draw(indentation + (len > 1 && !isLast ? "│  " : "   "), tree.forest);
  }
  return r;
};
const formatTransformationKind = (kind) => {
  switch (kind) {
    case "Encoded":
      return "Encoded side transformation failure";
    case "Transformation":
      return "Transformation process failure";
    case "Type":
      return "Type side transformation failure";
  }
};
const formatRefinementKind = (kind) => {
  switch (kind) {
    case "From":
      return "From side refinement failure";
    case "Predicate":
      return "Predicate refinement failure";
  }
};
const getAnnotated = (issue) => "ast" in issue ? some(issue.ast) : none$6();
const Either_void = /* @__PURE__ */ right(void 0);
const getCurrentMessage = (issue) => getAnnotated(issue).pipe(flatMap$9(getMessageAnnotation), match$9({
  onNone: () => Either_void,
  onSome: (messageAnnotation) => {
    const union2 = messageAnnotation(issue);
    if (isString(union2)) {
      return right({
        message: union2,
        override: false
      });
    }
    if (isEffect(union2)) {
      return map$3(union2, (message) => ({
        message,
        override: false
      }));
    }
    if (isString(union2.message)) {
      return right({
        message: union2.message,
        override: union2.override
      });
    }
    return map$3(union2.message, (message) => ({
      message,
      override: union2.override
    }));
  }
}));
const createParseIssueGuard = (tag) => (issue) => issue._tag === tag;
const isComposite = /* @__PURE__ */ createParseIssueGuard("Composite");
const isRefinement = /* @__PURE__ */ createParseIssueGuard("Refinement");
const isTransformation = /* @__PURE__ */ createParseIssueGuard("Transformation");
const getMessage = (issue) => flatMap$2(getCurrentMessage(issue), (currentMessage) => {
  if (currentMessage !== void 0) {
    const useInnerMessage = !currentMessage.override && (isComposite(issue) || isRefinement(issue) && issue.kind === "From" || isTransformation(issue) && issue.kind !== "Transformation");
    return useInnerMessage ? isTransformation(issue) || isRefinement(issue) ? getMessage(issue.issue) : Either_void : right(currentMessage.message);
  }
  return Either_void;
});
const getParseIssueTitleAnnotation = (issue) => getAnnotated(issue).pipe(flatMap$9(getParseIssueTitleAnnotation$1), flatMapNullable((annotation) => annotation(issue)), getOrUndefined);
function getRefinementExpected(ast) {
  return getDescriptionAnnotation(ast).pipe(orElse$5(() => getTitleAnnotation(ast)), orElse$5(() => getAutoTitleAnnotation(ast)), orElse$5(() => getIdentifierAnnotation(ast)), getOrElse(() => `{ ${ast.from} | filter }`));
}
function getDefaultTypeMessage(issue) {
  if (issue.message !== void 0) {
    return issue.message;
  }
  const expected = isRefinement$1(issue.ast) ? getRefinementExpected(issue.ast) : String(issue.ast);
  return `Expected ${expected}, actual ${formatUnknown(issue.actual)}`;
}
const formatTypeMessage = (issue) => map$2(getMessage(issue), (message) => message ?? getParseIssueTitleAnnotation(issue) ?? getDefaultTypeMessage(issue));
const getParseIssueTitle = (issue) => getParseIssueTitleAnnotation(issue) ?? String(issue.ast);
const formatForbiddenMessage = (issue) => issue.message ?? "is forbidden";
const formatUnexpectedMessage = (issue) => issue.message ?? "is unexpected";
const formatMissingMessage = (issue) => {
  const missingMessageAnnotation = getMissingMessageAnnotation(issue.ast);
  if (isSome(missingMessageAnnotation)) {
    const annotation = missingMessageAnnotation.value();
    return isString(annotation) ? right(annotation) : annotation;
  }
  return right(issue.message ?? "is missing");
};
const formatTree = (issue) => {
  switch (issue._tag) {
    case "Type":
      return map$2(formatTypeMessage(issue), makeTree);
    case "Forbidden":
      return right(makeTree(getParseIssueTitle(issue), [makeTree(formatForbiddenMessage(issue))]));
    case "Unexpected":
      return right(makeTree(formatUnexpectedMessage(issue)));
    case "Missing":
      return map$2(formatMissingMessage(issue), makeTree);
    case "Transformation":
      return flatMap$2(getMessage(issue), (message) => {
        if (message !== void 0) {
          return right(makeTree(message));
        }
        return map$2(formatTree(issue.issue), (tree) => makeTree(getParseIssueTitle(issue), [makeTree(formatTransformationKind(issue.kind), [tree])]));
      });
    case "Refinement":
      return flatMap$2(getMessage(issue), (message) => {
        if (message !== void 0) {
          return right(makeTree(message));
        }
        return map$2(formatTree(issue.issue), (tree) => makeTree(getParseIssueTitle(issue), [makeTree(formatRefinementKind(issue.kind), [tree])]));
      });
    case "Pointer":
      return map$2(formatTree(issue.issue), (tree) => makeTree(formatPath(issue.path), [tree]));
    case "Composite":
      return flatMap$2(getMessage(issue), (message) => {
        if (message !== void 0) {
          return right(makeTree(message));
        }
        const parseIssueTitle = getParseIssueTitle(issue);
        return isNonEmpty(issue.issues) ? map$2(forEach(issue.issues, formatTree), (forest) => makeTree(parseIssueTitle, forest)) : map$2(formatTree(issue.issues), (tree) => makeTree(parseIssueTitle, [tree]));
      });
  }
};
const pick = /* @__PURE__ */ dual((args2) => isObject(args2[0]), (s, ...keys2) => {
  const out = {};
  for (const k of keys2) {
    if (k in s) {
      out[k] = s[k];
    }
  }
  return out;
});
const omit = /* @__PURE__ */ dual((args2) => isObject(args2[0]), (s, ...keys2) => {
  const out = {
    ...s
  };
  for (const k of keys2) {
    delete out[k];
  }
  return out;
});
const TypeId = /* @__PURE__ */ Symbol.for("effect/Schema");
function make$5(ast) {
  return class SchemaClass {
    [TypeId] = variance;
    static ast = ast;
    static annotations(annotations2) {
      return make$5(mergeSchemaAnnotations(this.ast, annotations2));
    }
    static pipe() {
      return pipeArguments(this, arguments);
    }
    static toString() {
      return String(ast);
    }
    static Type;
    static Encoded;
    static Context;
    static [TypeId] = variance;
  };
}
const variance = {
  /* c8 ignore next */
  _A: (_) => _,
  /* c8 ignore next */
  _I: (_) => _,
  /* c8 ignore next */
  _R: (_) => _
};
const builtInAnnotations = {
  schemaId: SchemaIdAnnotationId,
  message: MessageAnnotationId,
  missingMessage: MissingMessageAnnotationId,
  identifier: IdentifierAnnotationId,
  title: TitleAnnotationId,
  description: DescriptionAnnotationId,
  examples: ExamplesAnnotationId,
  default: DefaultAnnotationId,
  documentation: DocumentationAnnotationId,
  jsonSchema: JSONSchemaAnnotationId,
  arbitrary: ArbitraryAnnotationId,
  pretty: PrettyAnnotationId,
  equivalence: EquivalenceAnnotationId,
  concurrency: ConcurrencyAnnotationId,
  batching: BatchingAnnotationId,
  parseIssueTitle: ParseIssueTitleAnnotationId,
  parseOptions: ParseOptionsAnnotationId,
  decodingFallback: DecodingFallbackAnnotationId
};
const toASTAnnotations = (annotations2) => {
  if (!annotations2) {
    return {};
  }
  const out = {
    ...annotations2
  };
  for (const key in builtInAnnotations) {
    if (key in annotations2) {
      const id = builtInAnnotations[key];
      out[id] = annotations2[key];
      delete out[key];
    }
  }
  return out;
};
const mergeSchemaAnnotations = (ast, annotations$1) => annotations(ast, toASTAnnotations(annotations$1));
function asSchema(schema) {
  return schema;
}
const format = (schema) => String(schema.ast);
const encodedSchema = (schema) => make$5(encodedAST(schema.ast));
const typeSchema = (schema) => make$5(typeAST(schema.ast));
const decodeUnknown = (schema, options) => {
  const decodeUnknown2 = decodeUnknown$1(schema, options);
  return (u, overrideOptions) => mapError(decodeUnknown2(u, overrideOptions), parseError);
};
const isSchema = (u) => hasProperty(u, TypeId) && isObject(u[TypeId]);
function getDefaultLiteralAST(literals) {
  return isMembers(literals) ? Union$1.make(mapMembers(literals, (literal2) => new Literal$1(literal2))) : new Literal$1(literals[0]);
}
function makeLiteralClass(literals, ast = getDefaultLiteralAST(literals)) {
  return class LiteralClass extends make$5(ast) {
    static annotations(annotations2) {
      return makeLiteralClass(this.literals, mergeSchemaAnnotations(this.ast, annotations2));
    }
    static literals = [...literals];
  };
}
function Literal2(...literals) {
  return isNonEmptyReadonlyArray(literals) ? makeLiteralClass(literals) : Never;
}
const declareConstructor = (typeParameters, options, annotations2) => makeDeclareClass(typeParameters, new Declaration(typeParameters.map((tp) => tp.ast), (...typeParameters2) => options.decode(...typeParameters2.map(make$5)), (...typeParameters2) => options.encode(...typeParameters2.map(make$5)), toASTAnnotations(annotations2)));
const declarePrimitive = (is2, annotations2) => {
  const decodeUnknown2 = () => (input, _, ast) => is2(input) ? succeed$2(input) : fail$3(new Type2(ast, input));
  const encodeUnknown2 = decodeUnknown2;
  return makeDeclareClass([], new Declaration([], decodeUnknown2, encodeUnknown2, toASTAnnotations(annotations2)));
};
function makeDeclareClass(typeParameters, ast) {
  return class DeclareClass extends make$5(ast) {
    static annotations(annotations2) {
      return makeDeclareClass(this.typeParameters, mergeSchemaAnnotations(this.ast, annotations2));
    }
    static typeParameters = [...typeParameters];
  };
}
const declare = function() {
  if (Array.isArray(arguments[0])) {
    const typeParameters = arguments[0];
    const options = arguments[1];
    const annotations3 = arguments[2];
    return declareConstructor(typeParameters, options, annotations3);
  }
  const is2 = arguments[0];
  const annotations2 = arguments[1];
  return declarePrimitive(is2, annotations2);
};
class Undefined extends (/* @__PURE__ */ make$5(undefinedKeyword)) {
}
class Null extends (/* @__PURE__ */ make$5($null)) {
}
class Never extends (/* @__PURE__ */ make$5(neverKeyword)) {
}
class Unknown extends (/* @__PURE__ */ make$5(unknownKeyword)) {
}
class String$ extends (/* @__PURE__ */ make$5(stringKeyword)) {
}
class Number$ extends (/* @__PURE__ */ make$5(numberKeyword)) {
}
class Boolean$ extends (/* @__PURE__ */ make$5(booleanKeyword)) {
}
const getDefaultUnionAST = (members) => Union$1.make(members.map((m) => m.ast));
function makeUnionClass(members, ast = getDefaultUnionAST(members)) {
  return class UnionClass extends make$5(ast) {
    static annotations(annotations2) {
      return makeUnionClass(this.members, mergeSchemaAnnotations(this.ast, annotations2));
    }
    static members = [...members];
  };
}
function Union2(...members) {
  return isMembers(members) ? makeUnionClass(members) : isNonEmptyReadonlyArray(members) ? members[0] : Never;
}
const NullOr = (self) => Union2(self, Null);
const UndefinedOr = (self) => Union2(self, Undefined);
const NullishOr = (self) => Union2(self, Null, Undefined);
const getDefaultTupleTypeAST = (elements, rest) => new TupleType(elements.map((el) => isSchema(el) ? new OptionalType(el.ast, false) : el.ast), rest.map((el) => isSchema(el) ? new Type$1(el.ast) : el.ast), true);
function makeTupleTypeClass(elements, rest, ast = getDefaultTupleTypeAST(elements, rest)) {
  return class TupleTypeClass extends make$5(ast) {
    static annotations(annotations2) {
      return makeTupleTypeClass(this.elements, this.rest, mergeSchemaAnnotations(this.ast, annotations2));
    }
    static elements = [...elements];
    static rest = [...rest];
  };
}
function makeArrayClass(value2, ast) {
  return class ArrayClass extends makeTupleTypeClass([], [value2], ast) {
    static annotations(annotations2) {
      return makeArrayClass(this.value, mergeSchemaAnnotations(this.ast, annotations2));
    }
    static value = value2;
  };
}
const Array$ = (value2) => makeArrayClass(value2);
function makeNonEmptyArrayClass(value2, ast) {
  return class NonEmptyArrayClass extends makeTupleTypeClass([value2], [value2], ast) {
    static annotations(annotations2) {
      return makeNonEmptyArrayClass(this.value, mergeSchemaAnnotations(this.ast, annotations2));
    }
    static value = value2;
  };
}
const NonEmptyArray = (value2) => makeNonEmptyArrayClass(value2);
const formatPropertySignatureToken = (isOptional) => isOptional ? '"?:"' : '":"';
class PropertySignatureDeclaration extends OptionalType {
  isReadonly;
  defaultValue;
  /**
   * @since 3.10.0
   */
  _tag = "PropertySignatureDeclaration";
  constructor(type, isOptional, isReadonly, annotations2, defaultValue) {
    super(type, isOptional, annotations2);
    this.isReadonly = isReadonly;
    this.defaultValue = defaultValue;
  }
  /**
   * @since 3.10.0
   */
  toString() {
    const token = formatPropertySignatureToken(this.isOptional);
    const type = String(this.type);
    return `PropertySignature<${token}, ${type}, never, ${token}, ${type}>`;
  }
}
class FromPropertySignature extends OptionalType {
  isReadonly;
  fromKey;
  constructor(type, isOptional, isReadonly, annotations2, fromKey) {
    super(type, isOptional, annotations2);
    this.isReadonly = isReadonly;
    this.fromKey = fromKey;
  }
}
class ToPropertySignature extends OptionalType {
  isReadonly;
  defaultValue;
  constructor(type, isOptional, isReadonly, annotations2, defaultValue) {
    super(type, isOptional, annotations2);
    this.isReadonly = isReadonly;
    this.defaultValue = defaultValue;
  }
}
const formatPropertyKey = (p) => {
  if (p === void 0) {
    return "never";
  }
  if (isString(p)) {
    return JSON.stringify(p);
  }
  return String(p);
};
class PropertySignatureTransformation2 {
  from;
  to;
  decode;
  encode;
  /**
   * @since 3.10.0
   */
  _tag = "PropertySignatureTransformation";
  constructor(from, to, decode2, encode2) {
    this.from = from;
    this.to = to;
    this.decode = decode2;
    this.encode = encode2;
  }
  /**
   * @since 3.10.0
   */
  toString() {
    return `PropertySignature<${formatPropertySignatureToken(this.to.isOptional)}, ${this.to.type}, ${formatPropertyKey(this.from.fromKey)}, ${formatPropertySignatureToken(this.from.isOptional)}, ${this.from.type}>`;
  }
}
const mergeSignatureAnnotations = (ast, annotations2) => {
  switch (ast._tag) {
    case "PropertySignatureDeclaration": {
      return new PropertySignatureDeclaration(ast.type, ast.isOptional, ast.isReadonly, {
        ...ast.annotations,
        ...annotations2
      }, ast.defaultValue);
    }
    case "PropertySignatureTransformation": {
      return new PropertySignatureTransformation2(ast.from, new ToPropertySignature(ast.to.type, ast.to.isOptional, ast.to.isReadonly, {
        ...ast.to.annotations,
        ...annotations2
      }, ast.to.defaultValue), ast.decode, ast.encode);
    }
  }
};
const PropertySignatureTypeId = /* @__PURE__ */ Symbol.for("effect/PropertySignature");
const isPropertySignature = (u) => hasProperty(u, PropertySignatureTypeId);
class PropertySignatureImpl {
  ast;
  [TypeId];
  [PropertySignatureTypeId] = null;
  _TypeToken;
  _Key;
  _EncodedToken;
  _HasDefault;
  constructor(ast) {
    this.ast = ast;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
  annotations(annotations2) {
    return new PropertySignatureImpl(mergeSignatureAnnotations(this.ast, toASTAnnotations(annotations2)));
  }
  toString() {
    return String(this.ast);
  }
}
const makePropertySignature = (ast) => new PropertySignatureImpl(ast);
class PropertySignatureWithFromImpl extends PropertySignatureImpl {
  from;
  constructor(ast, from) {
    super(ast);
    this.from = from;
  }
  annotations(annotations2) {
    return new PropertySignatureWithFromImpl(mergeSignatureAnnotations(this.ast, toASTAnnotations(annotations2)), this.from);
  }
}
const withConstructorDefault = /* @__PURE__ */ dual(2, (self, defaultValue) => {
  const ast = self.ast;
  switch (ast._tag) {
    case "PropertySignatureDeclaration":
      return makePropertySignature(new PropertySignatureDeclaration(ast.type, ast.isOptional, ast.isReadonly, ast.annotations, defaultValue));
    case "PropertySignatureTransformation":
      return makePropertySignature(new PropertySignatureTransformation2(ast.from, new ToPropertySignature(ast.to.type, ast.to.isOptional, ast.to.isReadonly, ast.to.annotations, defaultValue), ast.decode, ast.encode));
  }
});
const optionalToRequired = (from, to, options) => makePropertySignature(new PropertySignatureTransformation2(new FromPropertySignature(from.ast, true, true, {}, void 0), new ToPropertySignature(to.ast, false, true, {}, void 0), (o) => some(options.decode(o)), flatMap$9(options.encode)));
const optionalToOptional = (from, to, options) => makePropertySignature(new PropertySignatureTransformation2(new FromPropertySignature(from.ast, true, true, {}, void 0), new ToPropertySignature(to.ast, true, true, {}, void 0), options.decode, options.encode));
const optionalPropertySignatureAST = (self, options) => {
  const isExact = options?.exact;
  const defaultValue = options?.default;
  const isNullable2 = options?.nullable;
  const asOption = options?.as == "Option";
  const asOptionEncode = options?.onNoneEncoding ? orElse$5(options.onNoneEncoding) : identity;
  if (isExact) {
    if (defaultValue) {
      if (isNullable2) {
        return withConstructorDefault(optionalToRequired(NullOr(self), typeSchema(self), {
          decode: match$9({
            onNone: defaultValue,
            onSome: (a) => a === null ? defaultValue() : a
          }),
          encode: some
        }), defaultValue).ast;
      } else {
        return withConstructorDefault(optionalToRequired(self, typeSchema(self), {
          decode: match$9({
            onNone: defaultValue,
            onSome: identity
          }),
          encode: some
        }), defaultValue).ast;
      }
    } else if (asOption) {
      if (isNullable2) {
        return optionalToRequired(NullOr(self), OptionFromSelf(typeSchema(self)), {
          decode: filter$3(isNotNull),
          encode: asOptionEncode
        }).ast;
      } else {
        return optionalToRequired(self, OptionFromSelf(typeSchema(self)), {
          decode: identity,
          encode: identity
        }).ast;
      }
    } else {
      if (isNullable2) {
        return optionalToOptional(NullOr(self), typeSchema(self), {
          decode: filter$3(isNotNull),
          encode: identity
        }).ast;
      } else {
        return new PropertySignatureDeclaration(self.ast, true, true, {}, void 0);
      }
    }
  } else {
    if (defaultValue) {
      if (isNullable2) {
        return withConstructorDefault(optionalToRequired(NullishOr(self), typeSchema(self), {
          decode: match$9({
            onNone: defaultValue,
            onSome: (a) => a == null ? defaultValue() : a
          }),
          encode: some
        }), defaultValue).ast;
      } else {
        return withConstructorDefault(optionalToRequired(UndefinedOr(self), typeSchema(self), {
          decode: match$9({
            onNone: defaultValue,
            onSome: (a) => a === void 0 ? defaultValue() : a
          }),
          encode: some
        }), defaultValue).ast;
      }
    } else if (asOption) {
      if (isNullable2) {
        return optionalToRequired(NullishOr(self), OptionFromSelf(typeSchema(self)), {
          decode: filter$3((a) => a != null),
          encode: asOptionEncode
        }).ast;
      } else {
        return optionalToRequired(UndefinedOr(self), OptionFromSelf(typeSchema(self)), {
          decode: filter$3(isNotUndefined),
          encode: asOptionEncode
        }).ast;
      }
    } else {
      if (isNullable2) {
        return optionalToOptional(NullishOr(self), UndefinedOr(typeSchema(self)), {
          decode: filter$3(isNotNull),
          encode: identity
        }).ast;
      } else {
        return new PropertySignatureDeclaration(UndefinedOr(self).ast, true, true, {}, void 0);
      }
    }
  }
};
const optional = (self) => {
  const ast = self.ast === undefinedKeyword || self.ast === neverKeyword ? undefinedKeyword : UndefinedOr(self).ast;
  return new PropertySignatureWithFromImpl(new PropertySignatureDeclaration(ast, true, true, {}, void 0), self);
};
const optionalWith = /* @__PURE__ */ dual((args2) => isSchema(args2[0]), (self, options) => {
  return new PropertySignatureWithFromImpl(optionalPropertySignatureAST(self, options), self);
});
const preserveMissingMessageAnnotation = /* @__PURE__ */ pickAnnotations([MissingMessageAnnotationId]);
const getDefaultTypeLiteralAST = (fields, records) => {
  const ownKeys$1 = ownKeys(fields);
  const pss = [];
  if (ownKeys$1.length > 0) {
    const from = [];
    const to = [];
    const transformations = [];
    for (let i = 0; i < ownKeys$1.length; i++) {
      const key = ownKeys$1[i];
      const field = fields[key];
      if (isPropertySignature(field)) {
        const ast = field.ast;
        switch (ast._tag) {
          case "PropertySignatureDeclaration": {
            const type = ast.type;
            const isOptional = ast.isOptional;
            const toAnnotations = ast.annotations;
            from.push(new PropertySignature(key, type, isOptional, true, preserveMissingMessageAnnotation(ast)));
            to.push(new PropertySignature(key, typeAST(type), isOptional, true, toAnnotations));
            pss.push(new PropertySignature(key, type, isOptional, true, toAnnotations));
            break;
          }
          case "PropertySignatureTransformation": {
            const fromKey = ast.from.fromKey ?? key;
            from.push(new PropertySignature(fromKey, ast.from.type, ast.from.isOptional, true, ast.from.annotations));
            to.push(new PropertySignature(key, ast.to.type, ast.to.isOptional, true, ast.to.annotations));
            transformations.push(new PropertySignatureTransformation$1(fromKey, key, ast.decode, ast.encode));
            break;
          }
        }
      } else {
        from.push(new PropertySignature(key, field.ast, false, true));
        to.push(new PropertySignature(key, typeAST(field.ast), false, true));
        pss.push(new PropertySignature(key, field.ast, false, true));
      }
    }
    if (isNonEmptyReadonlyArray(transformations)) {
      const issFrom = [];
      const issTo = [];
      for (const r of records) {
        const {
          indexSignatures,
          propertySignatures
        } = record(r.key.ast, r.value.ast);
        propertySignatures.forEach((ps) => {
          from.push(ps);
          to.push(new PropertySignature(ps.name, typeAST(ps.type), ps.isOptional, ps.isReadonly, ps.annotations));
        });
        indexSignatures.forEach((is2) => {
          issFrom.push(is2);
          issTo.push(new IndexSignature(is2.parameter, typeAST(is2.type), is2.isReadonly));
        });
      }
      return new Transformation$1(new TypeLiteral(from, issFrom, {
        [AutoTitleAnnotationId]: "Struct (Encoded side)"
      }), new TypeLiteral(to, issTo, {
        [AutoTitleAnnotationId]: "Struct (Type side)"
      }), new TypeLiteralTransformation(transformations));
    }
  }
  const iss = [];
  for (const r of records) {
    const {
      indexSignatures,
      propertySignatures
    } = record(r.key.ast, r.value.ast);
    propertySignatures.forEach((ps) => pss.push(ps));
    indexSignatures.forEach((is2) => iss.push(is2));
  }
  return new TypeLiteral(pss, iss);
};
const lazilyMergeDefaults = (fields, out) => {
  const ownKeys$1 = ownKeys(fields);
  for (const key of ownKeys$1) {
    const field = fields[key];
    if (out[key] === void 0 && isPropertySignature(field)) {
      const ast = field.ast;
      const defaultValue = ast._tag === "PropertySignatureDeclaration" ? ast.defaultValue : ast.to.defaultValue;
      if (defaultValue !== void 0) {
        out[key] = defaultValue();
      }
    }
  }
  return out;
};
function makeTypeLiteralClass(fields, records, ast = getDefaultTypeLiteralAST(fields, records)) {
  return class TypeLiteralClass extends make$5(ast) {
    static annotations(annotations2) {
      return makeTypeLiteralClass(this.fields, this.records, mergeSchemaAnnotations(this.ast, annotations2));
    }
    static fields = {
      ...fields
    };
    static records = [...records];
    static make = (props, options) => {
      const propsWithDefaults = lazilyMergeDefaults(fields, {
        ...props
      });
      return getDisableValidationMakeOption(options) ? propsWithDefaults : validateSync(this)(propsWithDefaults);
    };
    static pick(...keys2) {
      return Struct(pick(fields, ...keys2));
    }
    static omit(...keys2) {
      return Struct(omit(fields, ...keys2));
    }
  };
}
function Struct(fields, ...records) {
  return makeTypeLiteralClass(fields, records);
}
const intersectTypeLiterals = (x, y, path) => {
  if (isTypeLiteral(x) && isTypeLiteral(y)) {
    const propertySignatures = [...x.propertySignatures];
    for (const ps of y.propertySignatures) {
      const name = ps.name;
      const i = propertySignatures.findIndex((ps2) => ps2.name === name);
      if (i === -1) {
        propertySignatures.push(ps);
      } else {
        const {
          isOptional,
          type
        } = propertySignatures[i];
        propertySignatures[i] = new PropertySignature(name, extendAST(type, ps.type, path.concat(name)), isOptional, true);
      }
    }
    return new TypeLiteral(propertySignatures, x.indexSignatures.concat(y.indexSignatures));
  }
  throw new Error(getSchemaExtendErrorMessage(x, y, path));
};
const preserveRefinementAnnotations = /* @__PURE__ */ omitAnnotations([IdentifierAnnotationId]);
const addRefinementToMembers = (refinement, asts) => asts.map((ast) => new Refinement$1(ast, refinement.filter, preserveRefinementAnnotations(refinement)));
const extendAST = (x, y, path) => Union$1.make(intersectUnionMembers([x], [y], path));
const getTypes = (ast) => isUnion(ast) ? ast.types : [ast];
const intersectUnionMembers = (xs, ys, path) => flatMap$8(xs, (x) => flatMap$8(ys, (y) => {
  switch (y._tag) {
    case "Literal": {
      if (isString(y.literal) && isStringKeyword(x) || isNumber(y.literal) && isNumberKeyword(x) || isBoolean(y.literal) && isBooleanKeyword(x)) {
        return [y];
      }
      break;
    }
    case "StringKeyword": {
      if (y === stringKeyword) {
        if (isStringKeyword(x) || isLiteral(x) && isString(x.literal)) {
          return [x];
        } else if (isRefinement$1(x)) {
          return addRefinementToMembers(x, intersectUnionMembers(getTypes(x.from), [y], path));
        }
      } else if (x === stringKeyword) {
        return [y];
      }
      break;
    }
    case "NumberKeyword": {
      if (y === numberKeyword) {
        if (isNumberKeyword(x) || isLiteral(x) && isNumber(x.literal)) {
          return [x];
        } else if (isRefinement$1(x)) {
          return addRefinementToMembers(x, intersectUnionMembers(getTypes(x.from), [y], path));
        }
      } else if (x === numberKeyword) {
        return [y];
      }
      break;
    }
    case "BooleanKeyword": {
      if (y === booleanKeyword) {
        if (isBooleanKeyword(x) || isLiteral(x) && isBoolean(x.literal)) {
          return [x];
        } else if (isRefinement$1(x)) {
          return addRefinementToMembers(x, intersectUnionMembers(getTypes(x.from), [y], path));
        }
      } else if (x === booleanKeyword) {
        return [y];
      }
      break;
    }
    case "Union":
      return intersectUnionMembers(getTypes(x), y.types, path);
    case "Suspend":
      return [new Suspend(() => extendAST(x, y.f(), path))];
    case "Refinement":
      return addRefinementToMembers(y, intersectUnionMembers(getTypes(x), getTypes(y.from), path));
    case "TypeLiteral": {
      switch (x._tag) {
        case "Union":
          return intersectUnionMembers(x.types, [y], path);
        case "Suspend":
          return [new Suspend(() => extendAST(x.f(), y, path))];
        case "Refinement":
          return addRefinementToMembers(x, intersectUnionMembers(getTypes(x.from), [y], path));
        case "TypeLiteral":
          return [intersectTypeLiterals(x, y, path)];
        case "Transformation": {
          const transformation = x.transformation;
          const from = intersectTypeLiterals(x.from, y, path);
          const to = intersectTypeLiterals(x.to, typeAST(y), path);
          switch (transformation._tag) {
            case "TypeLiteralTransformation":
              return [new Transformation$1(from, to, new TypeLiteralTransformation(transformation.propertySignatureTransformations))];
            case "ComposeTransformation":
              return [new Transformation$1(from, to, composeTransformation)];
            case "FinalTransformation":
              return [new Transformation$1(from, to, new FinalTransformation((fromA, options, ast, fromI) => map$2(transformation.decode(fromA, options, ast, fromI), (partial) => ({
                ...fromA,
                ...partial
              })), (toI, options, ast, toA) => map$2(transformation.encode(toI, options, ast, toA), (partial) => ({
                ...toI,
                ...partial
              }))))];
          }
        }
      }
      break;
    }
    case "Transformation": {
      if (isTransformation$1(x)) {
        if (isTypeLiteralTransformation(y.transformation) && isTypeLiteralTransformation(x.transformation)) {
          return [new Transformation$1(intersectTypeLiterals(x.from, y.from, path), intersectTypeLiterals(x.to, y.to, path), new TypeLiteralTransformation(y.transformation.propertySignatureTransformations.concat(x.transformation.propertySignatureTransformations)))];
        }
      } else {
        return intersectUnionMembers([y], [x], path);
      }
      break;
    }
  }
  throw new Error(getSchemaExtendErrorMessage(x, y, path));
}));
const extend = /* @__PURE__ */ dual(2, (self, that) => make$5(extendAST(self.ast, that.ast, [])));
const compose = /* @__PURE__ */ dual((args2) => isSchema(args2[1]), (from, to) => makeTransformationClass(from, to, compose$1(from.ast, to.ast)));
const RefineSchemaId = /* @__PURE__ */ Symbol.for("effect/SchemaId/Refine");
function makeRefineClass(from, filter2, ast) {
  return class RefineClass extends make$5(ast) {
    static annotations(annotations2) {
      return makeRefineClass(this.from, this.filter, mergeSchemaAnnotations(this.ast, annotations2));
    }
    static [RefineSchemaId] = from;
    static from = from;
    static filter = filter2;
    static make = (a, options) => {
      return getDisableValidationMakeOption(options) ? a : validateSync(this)(a);
    };
  };
}
const fromFilterPredicateReturnTypeItem = (item, ast, input) => {
  if (isBoolean(item)) {
    return item ? none$6() : some(new Type2(ast, input));
  }
  if (isString(item)) {
    return some(new Type2(ast, input, item));
  }
  if (item !== void 0) {
    if ("_tag" in item) {
      return some(item);
    }
    const issue = new Type2(ast, input, item.message);
    return some(isNonEmptyReadonlyArray(item.path) ? new Pointer(item.path, input, issue) : issue);
  }
  return none$6();
};
const toFilterParseIssue = (out, ast, input) => {
  if (isSingle(out)) {
    return fromFilterPredicateReturnTypeItem(out, ast, input);
  }
  if (isNonEmptyReadonlyArray(out)) {
    const issues = filterMap(out, (issue) => fromFilterPredicateReturnTypeItem(issue, ast, input));
    if (isNonEmptyReadonlyArray(issues)) {
      return some(issues.length === 1 ? issues[0] : new Composite2(ast, input, issues));
    }
  }
  return none$6();
};
function filter(predicate, annotations2) {
  return (self) => {
    function filter2(input, options, ast2) {
      return toFilterParseIssue(predicate(input, options, ast2), ast2, input);
    }
    const ast = new Refinement$1(self.ast, filter2, toASTAnnotations(annotations2));
    return makeRefineClass(self, filter2, ast);
  };
}
function makeTransformationClass(from, to, ast) {
  return class TransformationClass extends make$5(ast) {
    static annotations(annotations2) {
      return makeTransformationClass(this.from, this.to, mergeSchemaAnnotations(this.ast, annotations2));
    }
    static from = from;
    static to = to;
  };
}
const transformOrFail = /* @__PURE__ */ dual((args2) => isSchema(args2[0]) && isSchema(args2[1]), (from, to, options) => makeTransformationClass(from, to, new Transformation$1(from.ast, to.ast, new FinalTransformation(options.decode, options.encode))));
const transform = /* @__PURE__ */ dual((args2) => isSchema(args2[0]) && isSchema(args2[1]), (from, to, options) => transformOrFail(from, to, {
  strict: true,
  decode: (fromA, _options, _ast, toA) => succeed$2(options.decode(fromA, toA)),
  encode: (toI, _options, _ast, toA) => succeed$2(options.encode(toI, toA))
}));
const StartsWithSchemaId = /* @__PURE__ */ Symbol.for("effect/SchemaId/StartsWith");
const startsWith = (startsWith2, annotations2) => (self) => {
  const formatted = JSON.stringify(startsWith2);
  return self.pipe(filter((a) => a.startsWith(startsWith2), {
    schemaId: StartsWithSchemaId,
    [StartsWithSchemaId]: {
      startsWith: startsWith2
    },
    title: `startsWith(${formatted})`,
    description: `a string starting with ${formatted}`,
    jsonSchema: {
      pattern: `^${startsWith2}`
    },
    ...annotations2
  }));
};
const getErrorMessage = (e) => e instanceof Error ? e.message : String(e);
const getParseJsonTransformation = (options) => transformOrFail(String$.annotations({
  description: "a string to be decoded into JSON"
}), Unknown, {
  strict: true,
  decode: (i, _, ast) => _try({
    try: () => JSON.parse(i, options?.reviver),
    catch: (e) => new Type2(ast, i, getErrorMessage(e))
  }),
  encode: (a, _, ast) => _try({
    try: () => JSON.stringify(a, options?.replacer, options?.space),
    catch: (e) => new Type2(ast, a, getErrorMessage(e))
  })
}).annotations({
  title: "parseJson",
  schemaId: ParseJsonSchemaId
});
const parseJson = (schemaOrOptions, o) => isSchema(schemaOrOptions) ? compose(parseJson(o), schemaOrOptions) : getParseJsonTransformation(schemaOrOptions);
const redactedArbitrary = (value2) => (fc) => value2(fc).map(make$z);
const toComposite = (eff, onSuccess, ast, actual) => mapBoth(eff, {
  onFailure: (e) => new Composite2(ast, actual, e),
  onSuccess
});
const redactedParse = (decodeUnknown2) => (u, options, ast) => isRedacted(u) ? toComposite(decodeUnknown2(value(u), options), make$z, ast, u) : fail$3(new Type2(ast, u));
const RedactedFromSelf = (value2) => declare([value2], {
  decode: (value3) => redactedParse(decodeUnknown$1(value3)),
  encode: (value3) => redactedParse(encodeUnknown(value3))
}, {
  description: "Redacted(<redacted>)",
  pretty: () => () => "Redacted(<redacted>)",
  arbitrary: redactedArbitrary,
  equivalence: getEquivalence$2
});
function Redacted(value$12) {
  return transform(value$12, RedactedFromSelf(typeSchema(asSchema(value$12))), {
    strict: true,
    decode: (i) => make$z(i),
    encode: (a) => value(a)
  });
}
class Uint8ArrayFromSelf extends (/* @__PURE__ */ declare(isUint8Array, {
  identifier: "Uint8ArrayFromSelf",
  pretty: () => (u8arr) => `new Uint8Array(${JSON.stringify(Array.from(u8arr))})`,
  arbitrary: () => (fc) => fc.uint8Array(),
  equivalence: () => getEquivalence$3(equals$1)
})) {
}
const makeUint8ArrayTransformation = (id, decode2, encode2) => transformOrFail(String$.annotations({
  description: "a string to be decoded into a Uint8Array"
}), Uint8ArrayFromSelf, {
  strict: true,
  decode: (i, _, ast) => mapLeft(decode2(i), (decodeException) => new Type2(ast, i, decodeException.message)),
  encode: (a) => succeed$2(encode2(a))
}).annotations({
  identifier: id
});
const Uint8ArrayFromBase64 = /* @__PURE__ */ makeUint8ArrayTransformation("Uint8ArrayFromBase64", decodeBase64, encodeBase64);
const optionDecode = (input) => input._tag === "None" ? none$6() : some(input.value);
const optionArbitrary = (value2, ctx) => (fc) => fc.oneof(ctx, fc.record({
  _tag: fc.constant("None")
}), fc.record({
  _tag: fc.constant("Some"),
  value: value2(fc)
})).map(optionDecode);
const optionPretty = (value2) => match$9({
  onNone: () => "none()",
  onSome: (a) => `some(${value2(a)})`
});
const optionParse = (decodeUnknown2) => (u, options, ast) => isOption(u) ? isNone(u) ? succeed$2(none$6()) : toComposite(decodeUnknown2(u.value, options), some, ast, u) : fail$3(new Type2(ast, u));
const OptionFromSelf = (value2) => {
  return declare([value2], {
    decode: (value3) => optionParse(decodeUnknown$1(value3)),
    encode: (value3) => optionParse(encodeUnknown(value3))
  }, {
    description: `Option<${format(value2)}>`,
    pretty: optionPretty,
    arbitrary: optionArbitrary,
    equivalence: getEquivalence$4
  });
};
const isField = (u) => isSchema(u) || isPropertySignature(u);
const isFields = (fields) => ownKeys(fields).every((key) => isField(fields[key]));
const getFields = (hasFields) => "fields" in hasFields ? hasFields.fields : getFields(hasFields[RefineSchemaId]);
const getSchemaFromFieldsOr = (fieldsOr) => isFields(fieldsOr) ? Struct(fieldsOr) : isSchema(fieldsOr) ? fieldsOr : Struct(getFields(fieldsOr));
const getFieldsFromFieldsOr = (fieldsOr) => isFields(fieldsOr) ? fieldsOr : getFields(fieldsOr);
const Class3 = (identifier2) => (fieldsOr, annotations2) => makeClass({
  kind: "Class",
  identifier: identifier2,
  schema: getSchemaFromFieldsOr(fieldsOr),
  fields: getFieldsFromFieldsOr(fieldsOr),
  Base: Class$1,
  annotations: annotations2
});
const extendFields = (a, b) => {
  const out = {
    ...a
  };
  for (const key of ownKeys(b)) {
    if (key in a) {
      throw new Error(getASTDuplicatePropertySignatureErrorMessage(key));
    }
    out[key] = b[key];
  }
  return out;
};
function getDisableValidationMakeOption(options) {
  return isBoolean(options) ? options : options?.disableValidation ?? false;
}
const astCache = /* @__PURE__ */ globalValue("effect/Schema/astCache", () => /* @__PURE__ */ new WeakMap());
const getClassAnnotations = (annotations2) => {
  if (annotations2 === void 0) {
    return [];
  } else if (Array.isArray(annotations2)) {
    return annotations2;
  } else {
    return [annotations2];
  }
};
const makeClass = ({
  Base: Base2,
  annotations: annotations2,
  disableToString,
  fields,
  identifier: identifier2,
  kind,
  schema
}) => {
  const classSymbol = /* @__PURE__ */ Symbol.for(`effect/Schema/${kind}/${identifier2}`);
  const [typeAnnotations, transformationAnnotations, encodedAnnotations] = getClassAnnotations(annotations2);
  const typeSchema_ = typeSchema(schema);
  const declarationSurrogate = typeSchema_.annotations({
    identifier: identifier2,
    ...typeAnnotations
  });
  const typeSide = typeSchema_.annotations({
    [AutoTitleAnnotationId]: `${identifier2} (Type side)`,
    ...typeAnnotations
  });
  const constructorSchema = schema.annotations({
    [AutoTitleAnnotationId]: `${identifier2} (Constructor)`,
    ...typeAnnotations
  });
  const encodedSide = schema.annotations({
    [AutoTitleAnnotationId]: `${identifier2} (Encoded side)`,
    ...encodedAnnotations
  });
  const transformationSurrogate = schema.annotations({
    [JSONIdentifierAnnotationId]: identifier2,
    ...encodedAnnotations,
    ...typeAnnotations,
    ...transformationAnnotations
  });
  const fallbackInstanceOf = (u) => hasProperty(u, classSymbol) && is(typeSide)(u);
  const klass = class extends Base2 {
    constructor(props = {}, options = false) {
      props = {
        ...props
      };
      props = lazilyMergeDefaults(fields, props);
      if (!getDisableValidationMakeOption(options)) {
        props = validateSync(constructorSchema)(props);
      }
      super(props, true);
    }
    // ----------------
    // Schema interface
    // ----------------
    static [TypeId] = variance;
    static get ast() {
      let out = astCache.get(this);
      if (out) {
        return out;
      }
      const declaration = declare([schema], {
        decode: () => (input, _, ast) => input instanceof this || fallbackInstanceOf(input) ? succeed$2(input) : fail$3(new Type2(ast, input)),
        encode: () => (input, options) => input instanceof this ? succeed$2(input) : map$2(encodeUnknown(typeSide)(input, options), (props) => new this(props, true))
      }, {
        identifier: identifier2,
        pretty: (pretty2) => (self) => `${identifier2}(${pretty2(self)})`,
        // @ts-expect-error
        arbitrary: (arb) => (fc) => arb(fc).map((props) => new this(props)),
        equivalence: identity,
        [SurrogateAnnotationId]: declarationSurrogate.ast,
        ...typeAnnotations
      });
      out = transform(encodedSide, declaration, {
        strict: true,
        decode: (i) => new this(i, true),
        encode: identity
      }).annotations({
        [SurrogateAnnotationId]: transformationSurrogate.ast,
        ...transformationAnnotations
      }).ast;
      astCache.set(this, out);
      return out;
    }
    static pipe() {
      return pipeArguments(this, arguments);
    }
    static annotations(annotations3) {
      return make$5(this.ast).annotations(annotations3);
    }
    static toString() {
      return `(${String(encodedSide)} <-> ${identifier2})`;
    }
    // ----------------
    // Class interface
    // ----------------
    static make(...args2) {
      return new this(...args2);
    }
    static fields = {
      ...fields
    };
    static identifier = identifier2;
    static extend(identifier3) {
      return (newFieldsOr, annotations3) => {
        const newFields = getFieldsFromFieldsOr(newFieldsOr);
        const newSchema = getSchemaFromFieldsOr(newFieldsOr);
        const extendedFields = extendFields(fields, newFields);
        return makeClass({
          kind,
          identifier: identifier3,
          schema: extend(schema, newSchema),
          fields: extendedFields,
          Base: this,
          annotations: annotations3
        });
      };
    }
    static transformOrFail(identifier3) {
      return (newFieldsOr, options, annotations3) => {
        const transformedFields = extendFields(fields, newFieldsOr);
        return makeClass({
          kind,
          identifier: identifier3,
          schema: transformOrFail(schema, typeSchema(Struct(transformedFields)), options),
          fields: transformedFields,
          Base: this,
          annotations: annotations3
        });
      };
    }
    static transformOrFailFrom(identifier3) {
      return (newFields, options, annotations3) => {
        const transformedFields = extendFields(fields, newFields);
        return makeClass({
          kind,
          identifier: identifier3,
          schema: transformOrFail(encodedSchema(schema), Struct(transformedFields), options),
          fields: transformedFields,
          Base: this,
          annotations: annotations3
        });
      };
    }
    // ----------------
    // other
    // ----------------
    get [classSymbol]() {
      return classSymbol;
    }
  };
  if (disableToString !== true) {
    Object.defineProperty(klass.prototype, "toString", {
      value() {
        return `${identifier2}({ ${ownKeys(fields).map((p) => `${formatPropertyKey$1(p)}: ${formatUnknown(this[p])}`).join(", ")} })`;
      },
      configurable: true,
      writable: true
    });
  }
  return klass;
};
const Config = (name, schema) => {
  const decodeUnknownEither$1 = decodeUnknownEither(schema);
  return string(name).pipe(mapOrFail((s) => decodeUnknownEither$1(s).pipe(mapLeft((error) => InvalidData([], TreeFormatter.formatIssueSync(error))))));
};
const runFork = unsafeFork;
const EnqueueSymbolKey = "effect/QueueEnqueue";
const EnqueueTypeId = /* @__PURE__ */ Symbol.for(EnqueueSymbolKey);
const DequeueSymbolKey = "effect/QueueDequeue";
const DequeueTypeId = /* @__PURE__ */ Symbol.for(DequeueSymbolKey);
const QueueStrategySymbolKey = "effect/QueueStrategy";
const QueueStrategyTypeId = /* @__PURE__ */ Symbol.for(QueueStrategySymbolKey);
const BackingQueueSymbolKey = "effect/BackingQueue";
const BackingQueueTypeId = /* @__PURE__ */ Symbol.for(BackingQueueSymbolKey);
const queueStrategyVariance = {
  /* c8 ignore next */
  _A: (_) => _
};
const backingQueueVariance = {
  /* c8 ignore next */
  _A: (_) => _
};
const enqueueVariance = {
  /* c8 ignore next */
  _In: (_) => _
};
const dequeueVariance = {
  /* c8 ignore next */
  _Out: (_) => _
};
class QueueImpl extends Class$2 {
  queue;
  takers;
  shutdownHook;
  shutdownFlag;
  strategy;
  [EnqueueTypeId] = enqueueVariance;
  [DequeueTypeId] = dequeueVariance;
  constructor(queue, takers, shutdownHook, shutdownFlag, strategy) {
    super();
    this.queue = queue;
    this.takers = takers;
    this.shutdownHook = shutdownHook;
    this.shutdownFlag = shutdownFlag;
    this.strategy = strategy;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
  commit() {
    return this.take;
  }
  capacity() {
    return this.queue.capacity();
  }
  get size() {
    return suspend$6(() => catchAll$1(this.unsafeSize(), () => interrupt$3));
  }
  unsafeSize() {
    if (get$6(this.shutdownFlag)) {
      return none$6();
    }
    return some(this.queue.length() - length(this.takers) + this.strategy.surplusSize());
  }
  get isEmpty() {
    return map$a(this.size, (size2) => size2 <= 0);
  }
  get isFull() {
    return map$a(this.size, (size2) => size2 >= this.capacity());
  }
  get shutdown() {
    return uninterruptible$1(withFiberRuntime$1((state) => {
      pipe(this.shutdownFlag, set$3(true));
      return pipe(forEachConcurrentDiscard(unsafePollAll(this.takers), (d) => deferredInterruptWith(d, state.id()), false, false), zipRight$5(this.strategy.shutdown), whenEffect(deferredSucceed(this.shutdownHook, void 0)), asVoid$1);
    }));
  }
  get isShutdown() {
    return sync$4(() => get$6(this.shutdownFlag));
  }
  get awaitShutdown() {
    return deferredAwait(this.shutdownHook);
  }
  isActive() {
    return !get$6(this.shutdownFlag);
  }
  unsafeOffer(value2) {
    if (get$6(this.shutdownFlag)) {
      return false;
    }
    let noRemaining;
    if (this.queue.length() === 0) {
      const taker = pipe(this.takers, poll(EmptyMutableQueue));
      if (taker !== EmptyMutableQueue) {
        unsafeCompleteDeferred(taker, value2);
        noRemaining = true;
      } else {
        noRemaining = false;
      }
    } else {
      noRemaining = false;
    }
    if (noRemaining) {
      return true;
    }
    const succeeded = this.queue.offer(value2);
    unsafeCompleteTakers(this.strategy, this.queue, this.takers);
    return succeeded;
  }
  offer(value2) {
    return suspend$6(() => {
      if (get$6(this.shutdownFlag)) {
        return interrupt$3;
      }
      let noRemaining;
      if (this.queue.length() === 0) {
        const taker = pipe(this.takers, poll(EmptyMutableQueue));
        if (taker !== EmptyMutableQueue) {
          unsafeCompleteDeferred(taker, value2);
          noRemaining = true;
        } else {
          noRemaining = false;
        }
      } else {
        noRemaining = false;
      }
      if (noRemaining) {
        return succeed$b(true);
      }
      const succeeded = this.queue.offer(value2);
      unsafeCompleteTakers(this.strategy, this.queue, this.takers);
      return succeeded ? succeed$b(true) : this.strategy.handleSurplus([value2], this.queue, this.takers, this.shutdownFlag);
    });
  }
  offerAll(iterable) {
    return suspend$6(() => {
      if (get$6(this.shutdownFlag)) {
        return interrupt$3;
      }
      const values = fromIterable$6(iterable);
      const pTakers = this.queue.length() === 0 ? fromIterable$6(unsafePollN(this.takers, values.length)) : empty$n;
      const [forTakers, remaining] = pipe(values, splitAt(pTakers.length));
      for (let i = 0; i < pTakers.length; i++) {
        const taker = pTakers[i];
        const item = forTakers[i];
        unsafeCompleteDeferred(taker, item);
      }
      if (remaining.length === 0) {
        return succeed$b(true);
      }
      const surplus = this.queue.offerAll(remaining);
      unsafeCompleteTakers(this.strategy, this.queue, this.takers);
      return isEmpty$7(surplus) ? succeed$b(true) : this.strategy.handleSurplus(surplus, this.queue, this.takers, this.shutdownFlag);
    });
  }
  get take() {
    return withFiberRuntime$1((state) => {
      if (get$6(this.shutdownFlag)) {
        return interrupt$3;
      }
      const item = this.queue.poll(EmptyMutableQueue);
      if (item !== EmptyMutableQueue) {
        this.strategy.unsafeOnQueueEmptySpace(this.queue, this.takers);
        return succeed$b(item);
      } else {
        const deferred = deferredUnsafeMake(state.id());
        return pipe(suspend$6(() => {
          pipe(this.takers, offer$2(deferred));
          unsafeCompleteTakers(this.strategy, this.queue, this.takers);
          return get$6(this.shutdownFlag) ? interrupt$3 : deferredAwait(deferred);
        }), onInterrupt$1(() => {
          return sync$4(() => unsafeRemove(this.takers, deferred));
        }));
      }
    });
  }
  get takeAll() {
    return suspend$6(() => {
      return get$6(this.shutdownFlag) ? interrupt$3 : sync$4(() => {
        const values = this.queue.pollUpTo(Number.POSITIVE_INFINITY);
        this.strategy.unsafeOnQueueEmptySpace(this.queue, this.takers);
        return fromIterable$5(values);
      });
    });
  }
  takeUpTo(max) {
    return suspend$6(() => get$6(this.shutdownFlag) ? interrupt$3 : sync$4(() => {
      const values = this.queue.pollUpTo(max);
      this.strategy.unsafeOnQueueEmptySpace(this.queue, this.takers);
      return fromIterable$5(values);
    }));
  }
  takeBetween(min2, max) {
    return suspend$6(() => takeRemainderLoop(this, min2, max, empty$k()));
  }
}
const takeRemainderLoop = (self, min2, max, acc) => {
  if (max < min2) {
    return succeed$b(acc);
  }
  return pipe(takeUpTo(self, max), flatMap$5((bs) => {
    const remaining = min2 - bs.length;
    if (remaining === 1) {
      return pipe(take$1(self), map$a((b) => pipe(acc, appendAll$1(bs), append$1(b))));
    }
    if (remaining > 1) {
      return pipe(take$1(self), flatMap$5((b) => takeRemainderLoop(self, remaining - 1, max - bs.length - 1, pipe(acc, appendAll$1(bs), append$1(b)))));
    }
    return succeed$b(pipe(acc, appendAll$1(bs)));
  }));
};
const bounded$1 = (requestedCapacity) => pipe(sync$4(() => bounded$2(requestedCapacity)), flatMap$5((queue) => make$4(backingQueueFromMutableQueue(queue), backPressureStrategy())));
const unbounded$1 = () => pipe(sync$4(() => unbounded$2()), flatMap$5((queue) => make$4(backingQueueFromMutableQueue(queue), droppingStrategy())));
const unsafeMake$1 = (queue, takers, shutdownHook, shutdownFlag, strategy) => {
  return new QueueImpl(queue, takers, shutdownHook, shutdownFlag, strategy);
};
const make$4 = (queue, strategy) => pipe(deferredMake(), map$a((deferred) => unsafeMake$1(queue, unbounded$2(), deferred, make$t(false), strategy)));
class BackingQueueFromMutableQueue {
  mutable;
  [BackingQueueTypeId] = backingQueueVariance;
  constructor(mutable) {
    this.mutable = mutable;
  }
  poll(def) {
    return poll(this.mutable, def);
  }
  pollUpTo(limit) {
    return pollUpTo(this.mutable, limit);
  }
  offerAll(elements) {
    return offerAll(this.mutable, elements);
  }
  offer(element) {
    return offer$2(this.mutable, element);
  }
  capacity() {
    return capacity(this.mutable);
  }
  length() {
    return length(this.mutable);
  }
}
const backingQueueFromMutableQueue = (mutable) => new BackingQueueFromMutableQueue(mutable);
const size$1 = (self) => self.size;
const shutdown$1 = (self) => self.shutdown;
const offer$1 = /* @__PURE__ */ dual(2, (self, value2) => self.offer(value2));
const take$1 = (self) => self.take;
const takeUpTo = /* @__PURE__ */ dual(2, (self, max) => self.takeUpTo(max));
const backPressureStrategy = () => new BackPressureStrategy();
const droppingStrategy = () => new DroppingStrategy();
class BackPressureStrategy {
  [QueueStrategyTypeId] = queueStrategyVariance;
  putters = /* @__PURE__ */ unbounded$2();
  surplusSize() {
    return length(this.putters);
  }
  onCompleteTakersWithEmptyQueue(takers) {
    while (!isEmpty(this.putters) && !isEmpty(takers)) {
      const taker = poll(takers, void 0);
      const putter = poll(this.putters, void 0);
      if (putter[2]) {
        unsafeCompleteDeferred(putter[1], true);
      }
      unsafeCompleteDeferred(taker, putter[0]);
    }
  }
  get shutdown() {
    return pipe(fiberId, flatMap$5((fiberId2) => pipe(sync$4(() => unsafePollAll(this.putters)), flatMap$5((putters) => forEachConcurrentDiscard(putters, ([_, deferred, isLastItem]) => isLastItem ? pipe(deferredInterruptWith(deferred, fiberId2), asVoid$1) : void_$2, false, false)))));
  }
  handleSurplus(iterable, queue, takers, isShutdown) {
    return withFiberRuntime$1((state) => {
      const deferred = deferredUnsafeMake(state.id());
      return pipe(suspend$6(() => {
        this.unsafeOffer(iterable, deferred);
        this.unsafeOnQueueEmptySpace(queue, takers);
        unsafeCompleteTakers(this, queue, takers);
        return get$6(isShutdown) ? interrupt$3 : deferredAwait(deferred);
      }), onInterrupt$1(() => sync$4(() => this.unsafeRemove(deferred))));
    });
  }
  unsafeOnQueueEmptySpace(queue, takers) {
    let keepPolling = true;
    while (keepPolling && (queue.capacity() === Number.POSITIVE_INFINITY || queue.length() < queue.capacity())) {
      const putter = pipe(this.putters, poll(EmptyMutableQueue));
      if (putter === EmptyMutableQueue) {
        keepPolling = false;
      } else {
        const offered = queue.offer(putter[0]);
        if (offered && putter[2]) {
          unsafeCompleteDeferred(putter[1], true);
        } else if (!offered) {
          unsafeOfferAll(this.putters, pipe(unsafePollAll(this.putters), prepend$1(putter)));
        }
        unsafeCompleteTakers(this, queue, takers);
      }
    }
  }
  unsafeOffer(iterable, deferred) {
    const stuff = fromIterable$6(iterable);
    for (let i = 0; i < stuff.length; i++) {
      const value2 = stuff[i];
      if (i === stuff.length - 1) {
        pipe(this.putters, offer$2([value2, deferred, true]));
      } else {
        pipe(this.putters, offer$2([value2, deferred, false]));
      }
    }
  }
  unsafeRemove(deferred) {
    unsafeOfferAll(this.putters, pipe(unsafePollAll(this.putters), filter$1(([, _]) => _ !== deferred)));
  }
}
class DroppingStrategy {
  [QueueStrategyTypeId] = queueStrategyVariance;
  surplusSize() {
    return 0;
  }
  get shutdown() {
    return void_$2;
  }
  onCompleteTakersWithEmptyQueue() {
  }
  handleSurplus(_iterable, _queue, _takers, _isShutdown) {
    return succeed$b(false);
  }
  unsafeOnQueueEmptySpace(_queue, _takers) {
  }
}
const unsafeCompleteDeferred = (deferred, a) => {
  return deferredUnsafeDone(deferred, succeed$b(a));
};
const unsafeOfferAll = (queue, as2) => {
  return pipe(queue, offerAll(as2));
};
const unsafePollAll = (queue) => {
  return pipe(queue, pollUpTo(Number.POSITIVE_INFINITY));
};
const unsafePollN = (queue, max) => {
  return pipe(queue, pollUpTo(max));
};
const unsafeRemove = (queue, a) => {
  unsafeOfferAll(queue, pipe(unsafePollAll(queue), filter$1((b) => a !== b)));
};
const unsafeCompleteTakers = (strategy, queue, takers) => {
  let keepPolling = true;
  while (keepPolling && queue.length() !== 0) {
    const taker = pipe(takers, poll(EmptyMutableQueue));
    if (taker !== EmptyMutableQueue) {
      const element = queue.poll(EmptyMutableQueue);
      if (element !== EmptyMutableQueue) {
        unsafeCompleteDeferred(taker, element);
        strategy.unsafeOnQueueEmptySpace(queue, takers);
      } else {
        unsafeOfferAll(takers, pipe(unsafePollAll(takers), prepend$1(taker)));
      }
      keepPolling = true;
    } else {
      keepPolling = false;
    }
  }
  if (keepPolling && queue.length() === 0 && !isEmpty(takers)) {
    strategy.onCompleteTakersWithEmptyQueue(takers);
  }
};
const bounded = bounded$1;
const unbounded = unbounded$1;
const size = size$1;
const shutdown = shutdown$1;
const offer = offer$1;
const take = take$1;
const unsafeMake = fiberRefUnsafeMake;
const update = fiberRefUpdate;
const currentContext = currentContext$1;
const currentTracerEnabled = currentTracerEnabled$1;
const OP_CONTINUE = "Continue";
const OP_CLOSE = "Close";
const OP_YIELD = "Yield";
const ChildExecutorDecisionSymbolKey = "effect/ChannelChildExecutorDecision";
const ChildExecutorDecisionTypeId = /* @__PURE__ */ Symbol.for(ChildExecutorDecisionSymbolKey);
const proto$7 = {
  [ChildExecutorDecisionTypeId]: ChildExecutorDecisionTypeId
};
const Continue = (_) => {
  const op = Object.create(proto$7);
  op._tag = OP_CONTINUE;
  return op;
};
const OP_CONTINUATION_K = "ContinuationK";
const OP_CONTINUATION_FINALIZER = "ContinuationFinalizer";
const ContinuationTypeId = /* @__PURE__ */ Symbol.for("effect/ChannelContinuation");
const continuationVariance = {
  /* c8 ignore next */
  _Env: (_) => _,
  /* c8 ignore next */
  _InErr: (_) => _,
  /* c8 ignore next */
  _InElem: (_) => _,
  /* c8 ignore next */
  _InDone: (_) => _,
  /* c8 ignore next */
  _OutErr: (_) => _,
  /* c8 ignore next */
  _OutDone: (_) => _,
  /* c8 ignore next */
  _OutErr2: (_) => _,
  /* c8 ignore next */
  _OutElem: (_) => _,
  /* c8 ignore next */
  _OutDone2: (_) => _
};
class ContinuationKImpl {
  onSuccess;
  onHalt;
  _tag = OP_CONTINUATION_K;
  [ContinuationTypeId] = continuationVariance;
  constructor(onSuccess, onHalt) {
    this.onSuccess = onSuccess;
    this.onHalt = onHalt;
  }
  onExit(exit2) {
    return isFailure(exit2) ? this.onHalt(exit2.cause) : this.onSuccess(exit2.value);
  }
}
class ContinuationFinalizerImpl {
  finalizer;
  _tag = OP_CONTINUATION_FINALIZER;
  [ContinuationTypeId] = continuationVariance;
  constructor(finalizer) {
    this.finalizer = finalizer;
  }
}
const OP_PULL_AFTER_NEXT = "PullAfterNext";
const OP_PULL_AFTER_ALL_ENQUEUED = "PullAfterAllEnqueued";
const UpstreamPullStrategySymbolKey = "effect/ChannelUpstreamPullStrategy";
const UpstreamPullStrategyTypeId = /* @__PURE__ */ Symbol.for(UpstreamPullStrategySymbolKey);
const upstreamPullStrategyVariance = {
  /* c8 ignore next */
  _A: (_) => _
};
const proto$6 = {
  [UpstreamPullStrategyTypeId]: upstreamPullStrategyVariance
};
const PullAfterNext = (emitSeparator) => {
  const op = Object.create(proto$6);
  op._tag = OP_PULL_AFTER_NEXT;
  op.emitSeparator = emitSeparator;
  return op;
};
const OP_BRACKET_OUT = "BracketOut";
const OP_BRIDGE = "Bridge";
const OP_CONCAT_ALL = "ConcatAll";
const OP_EMIT$2 = "Emit";
const OP_ENSURING = "Ensuring";
const OP_FAIL = "Fail";
const OP_FOLD = "Fold";
const OP_FROM_EFFECT$1 = "FromEffect";
const OP_PIPE_TO = "PipeTo";
const OP_PROVIDE = "Provide";
const OP_READ$1 = "Read";
const OP_SUCCEED = "Succeed";
const OP_SUCCEED_NOW = "SucceedNow";
const OP_SUSPEND = "Suspend";
const ChannelSymbolKey = "effect/Channel";
const ChannelTypeId = /* @__PURE__ */ Symbol.for(ChannelSymbolKey);
const channelVariance = {
  /* c8 ignore next */
  _Env: (_) => _,
  /* c8 ignore next */
  _InErr: (_) => _,
  /* c8 ignore next */
  _InElem: (_) => _,
  /* c8 ignore next */
  _InDone: (_) => _,
  /* c8 ignore next */
  _OutErr: (_) => _,
  /* c8 ignore next */
  _OutElem: (_) => _,
  /* c8 ignore next */
  _OutDone: (_) => _
};
const proto$5 = {
  [ChannelTypeId]: channelVariance,
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const isChannel = (u) => hasProperty(u, ChannelTypeId) || isEffect(u);
const acquireReleaseOut = /* @__PURE__ */ dual(2, (self, release) => {
  const op = Object.create(proto$5);
  op._tag = OP_BRACKET_OUT;
  op.acquire = () => self;
  op.finalizer = release;
  return op;
});
const concatAllWith = (channels, f, g) => {
  const op = Object.create(proto$5);
  op._tag = OP_CONCAT_ALL;
  op.combineInners = f;
  op.combineAll = g;
  op.onPull = () => PullAfterNext(none$6());
  op.onEmit = () => Continue;
  op.value = () => channels;
  op.k = identity;
  return op;
};
const concatMapWith = /* @__PURE__ */ dual(4, (self, f, g, h) => {
  const op = Object.create(proto$5);
  op._tag = OP_CONCAT_ALL;
  op.combineInners = g;
  op.combineAll = h;
  op.onPull = () => PullAfterNext(none$6());
  op.onEmit = () => Continue;
  op.value = () => self;
  op.k = f;
  return op;
});
const embedInput = /* @__PURE__ */ dual(2, (self, input) => {
  const op = Object.create(proto$5);
  op._tag = OP_BRIDGE;
  op.input = input;
  op.channel = self;
  return op;
});
const ensuringWith$2 = /* @__PURE__ */ dual(2, (self, finalizer) => {
  const op = Object.create(proto$5);
  op._tag = OP_ENSURING;
  op.channel = self;
  op.finalizer = finalizer;
  return op;
});
const fail$2 = (error) => failCause(fail$7(error));
const failCause = (cause) => failCauseSync(() => cause);
const failCauseSync = (evaluate2) => {
  const op = Object.create(proto$5);
  op._tag = OP_FAIL;
  op.error = evaluate2;
  return op;
};
const flatMap$1 = /* @__PURE__ */ dual(2, (self, f) => {
  const op = Object.create(proto$5);
  op._tag = OP_FOLD;
  op.channel = self;
  op.k = new ContinuationKImpl(f, failCause);
  return op;
});
const fromEffect$3 = (effect2) => {
  const op = Object.create(proto$5);
  op._tag = OP_FROM_EFFECT$1;
  op.effect = () => effect2;
  return op;
};
const pipeTo = /* @__PURE__ */ dual(2, (self, that) => {
  const op = Object.create(proto$5);
  op._tag = OP_PIPE_TO;
  op.left = () => self;
  op.right = () => that;
  return op;
});
const readWith = (options) => readWithCause({
  onInput: options.onInput,
  onFailure: (cause) => match$a(failureOrCause(cause), {
    onLeft: options.onFailure,
    onRight: failCause
  }),
  onDone: options.onDone
});
const readWithCause = (options) => {
  const op = Object.create(proto$5);
  op._tag = OP_READ$1;
  op.more = options.onInput;
  op.done = new ContinuationKImpl(options.onDone, options.onFailure);
  return op;
};
const succeed$1 = (value2) => sync$1(() => value2);
const succeedNow = (result) => {
  const op = Object.create(proto$5);
  op._tag = OP_SUCCEED_NOW;
  op.terminal = result;
  return op;
};
const suspend$2 = (evaluate2) => {
  const op = Object.create(proto$5);
  op._tag = OP_SUSPEND;
  op.channel = evaluate2;
  return op;
};
const sync$1 = (evaluate2) => {
  const op = Object.create(proto$5);
  op._tag = OP_SUCCEED;
  op.evaluate = evaluate2;
  return op;
};
const void_ = /* @__PURE__ */ succeedNow(void 0);
const write = (out) => {
  const op = Object.create(proto$5);
  op._tag = OP_EMIT$2;
  op.out = out;
  return op;
};
const OP_DONE$1 = "Done";
const OP_EMIT$1 = "Emit";
const OP_FROM_EFFECT = "FromEffect";
const OP_READ = "Read";
const ChannelStateTypeId = /* @__PURE__ */ Symbol.for("effect/ChannelState");
const channelStateVariance = {
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _R: (_) => _
};
const proto$4 = {
  [ChannelStateTypeId]: channelStateVariance
};
const Done2 = () => {
  const op = Object.create(proto$4);
  op._tag = OP_DONE$1;
  return op;
};
const Emit$1 = () => {
  const op = Object.create(proto$4);
  op._tag = OP_EMIT$1;
  return op;
};
const fromEffect$2 = (effect2) => {
  const op = Object.create(proto$4);
  op._tag = OP_FROM_EFFECT;
  op.effect = effect2;
  return op;
};
const Read = (upstream, onEffect, onEmit, onDone) => {
  const op = Object.create(proto$4);
  op._tag = OP_READ;
  op.upstream = upstream;
  op.onEffect = onEffect;
  op.onEmit = onEmit;
  op.onDone = onDone;
  return op;
};
const isFromEffect = (self) => self._tag === OP_FROM_EFFECT;
const effect = (self) => isFromEffect(self) ? self.effect : _void;
const effectOrUndefinedIgnored = (self) => isFromEffect(self) ? ignore(self.effect) : void 0;
const OP_PULL_FROM_CHILD = "PullFromChild";
const OP_PULL_FROM_UPSTREAM = "PullFromUpstream";
const OP_DRAIN_CHILD_EXECUTORS = "DrainChildExecutors";
const OP_EMIT = "Emit";
class PullFromChild {
  childExecutor;
  parentSubexecutor;
  onEmit;
  _tag = OP_PULL_FROM_CHILD;
  constructor(childExecutor, parentSubexecutor, onEmit) {
    this.childExecutor = childExecutor;
    this.parentSubexecutor = parentSubexecutor;
    this.onEmit = onEmit;
  }
  close(exit$12) {
    const fin1 = this.childExecutor.close(exit$12);
    const fin2 = this.parentSubexecutor.close(exit$12);
    if (fin1 !== void 0 && fin2 !== void 0) {
      return zipWith(exit(fin1), exit(fin2), (exit1, exit2) => pipe(exit1, zipRight$4(exit2)));
    } else if (fin1 !== void 0) {
      return fin1;
    } else if (fin2 !== void 0) {
      return fin2;
    } else {
      return void 0;
    }
  }
  enqueuePullFromChild(_child) {
    return this;
  }
}
class PullFromUpstream {
  upstreamExecutor;
  createChild;
  lastDone;
  activeChildExecutors;
  combineChildResults;
  combineWithChildResult;
  onPull;
  onEmit;
  _tag = OP_PULL_FROM_UPSTREAM;
  constructor(upstreamExecutor, createChild, lastDone, activeChildExecutors, combineChildResults, combineWithChildResult, onPull, onEmit) {
    this.upstreamExecutor = upstreamExecutor;
    this.createChild = createChild;
    this.lastDone = lastDone;
    this.activeChildExecutors = activeChildExecutors;
    this.combineChildResults = combineChildResults;
    this.combineWithChildResult = combineWithChildResult;
    this.onPull = onPull;
    this.onEmit = onEmit;
  }
  close(exit$12) {
    const fin1 = this.upstreamExecutor.close(exit$12);
    const fins = [...this.activeChildExecutors.map((child) => child !== void 0 ? child.childExecutor.close(exit$12) : void 0), fin1];
    const result = fins.reduce((acc, next) => {
      if (acc !== void 0 && next !== void 0) {
        return zipWith(acc, exit(next), (exit1, exit2) => zipRight$4(exit1, exit2));
      } else if (acc !== void 0) {
        return acc;
      } else if (next !== void 0) {
        return exit(next);
      } else {
        return void 0;
      }
    }, void 0);
    return result === void 0 ? result : result;
  }
  enqueuePullFromChild(child) {
    return new PullFromUpstream(this.upstreamExecutor, this.createChild, this.lastDone, [...this.activeChildExecutors, child], this.combineChildResults, this.combineWithChildResult, this.onPull, this.onEmit);
  }
}
class DrainChildExecutors {
  upstreamExecutor;
  lastDone;
  activeChildExecutors;
  upstreamDone;
  combineChildResults;
  combineWithChildResult;
  onPull;
  _tag = OP_DRAIN_CHILD_EXECUTORS;
  constructor(upstreamExecutor, lastDone, activeChildExecutors, upstreamDone, combineChildResults, combineWithChildResult, onPull) {
    this.upstreamExecutor = upstreamExecutor;
    this.lastDone = lastDone;
    this.activeChildExecutors = activeChildExecutors;
    this.upstreamDone = upstreamDone;
    this.combineChildResults = combineChildResults;
    this.combineWithChildResult = combineWithChildResult;
    this.onPull = onPull;
  }
  close(exit$12) {
    const fin1 = this.upstreamExecutor.close(exit$12);
    const fins = [...this.activeChildExecutors.map((child) => child !== void 0 ? child.childExecutor.close(exit$12) : void 0), fin1];
    const result = fins.reduce((acc, next) => {
      if (acc !== void 0 && next !== void 0) {
        return zipWith(acc, exit(next), (exit1, exit2) => zipRight$4(exit1, exit2));
      } else if (acc !== void 0) {
        return acc;
      } else if (next !== void 0) {
        return exit(next);
      } else {
        return void 0;
      }
    }, void 0);
    return result === void 0 ? result : result;
  }
  enqueuePullFromChild(child) {
    return new DrainChildExecutors(this.upstreamExecutor, this.lastDone, [...this.activeChildExecutors, child], this.upstreamDone, this.combineChildResults, this.combineWithChildResult, this.onPull);
  }
}
class Emit {
  value;
  next;
  _tag = OP_EMIT;
  constructor(value2, next) {
    this.value = value2;
    this.next = next;
  }
  close(exit2) {
    const result = this.next.close(exit2);
    return result === void 0 ? result : result;
  }
  enqueuePullFromChild(_child) {
    return this;
  }
}
const OP_PULLED = "Pulled";
const OP_NO_UPSTREAM = "NoUpstream";
const UpstreamPullRequestSymbolKey = "effect/ChannelUpstreamPullRequest";
const UpstreamPullRequestTypeId = /* @__PURE__ */ Symbol.for(UpstreamPullRequestSymbolKey);
const upstreamPullRequestVariance = {
  /* c8 ignore next */
  _A: (_) => _
};
const proto$3 = {
  [UpstreamPullRequestTypeId]: upstreamPullRequestVariance
};
const Pulled = (value2) => {
  const op = Object.create(proto$3);
  op._tag = OP_PULLED;
  op.value = value2;
  return op;
};
const NoUpstream = (activeDownstreamCount) => {
  const op = Object.create(proto$3);
  op._tag = OP_NO_UPSTREAM;
  op.activeDownstreamCount = activeDownstreamCount;
  return op;
};
class ChannelExecutor {
  _activeSubexecutor = void 0;
  _cancelled = void 0;
  _closeLastSubstream = void 0;
  _currentChannel;
  _done = void 0;
  _doneStack = [];
  _emitted = void 0;
  _executeCloseLastSubstream;
  _input = void 0;
  _inProgressFinalizer = void 0;
  _providedEnv;
  constructor(initialChannel, providedEnv, executeCloseLastSubstream) {
    this._currentChannel = initialChannel;
    this._executeCloseLastSubstream = executeCloseLastSubstream;
    this._providedEnv = providedEnv;
  }
  run() {
    let result = void 0;
    while (result === void 0) {
      if (this._cancelled !== void 0) {
        result = this.processCancellation();
      } else if (this._activeSubexecutor !== void 0) {
        result = this.runSubexecutor();
      } else {
        try {
          if (this._currentChannel === void 0) {
            result = Done2();
          } else {
            if (isEffect(this._currentChannel)) {
              this._currentChannel = fromEffect$3(this._currentChannel);
            }
            switch (this._currentChannel._tag) {
              case OP_BRACKET_OUT: {
                result = this.runBracketOut(this._currentChannel);
                break;
              }
              case OP_BRIDGE: {
                const bridgeInput = this._currentChannel.input;
                this._currentChannel = this._currentChannel.channel;
                if (this._input !== void 0) {
                  const inputExecutor = this._input;
                  this._input = void 0;
                  const drainer = () => flatMap$3(bridgeInput.awaitRead(), () => suspend$3(() => {
                    const state = inputExecutor.run();
                    switch (state._tag) {
                      case OP_DONE$1: {
                        return match$3(inputExecutor.getDone(), {
                          onFailure: (cause) => bridgeInput.error(cause),
                          onSuccess: (value2) => bridgeInput.done(value2)
                        });
                      }
                      case OP_EMIT$1: {
                        return flatMap$3(bridgeInput.emit(inputExecutor.getEmit()), () => drainer());
                      }
                      case OP_FROM_EFFECT: {
                        return matchCauseEffect(state.effect, {
                          onFailure: (cause) => bridgeInput.error(cause),
                          onSuccess: () => drainer()
                        });
                      }
                      case OP_READ: {
                        return readUpstream(state, () => drainer(), (cause) => bridgeInput.error(cause));
                      }
                    }
                  }));
                  result = fromEffect$2(flatMap$3(forkDaemon(interruptible(drainer())), (fiber) => sync$2(() => this.addFinalizer((exit2) => flatMap$3(interrupt$1(fiber), () => suspend$3(() => {
                    const effect2 = this.restorePipe(exit2, inputExecutor);
                    return effect2 !== void 0 ? effect2 : _void;
                  }))))));
                }
                break;
              }
              case OP_CONCAT_ALL: {
                const executor = new ChannelExecutor(this._currentChannel.value(), this._providedEnv, (effect2) => sync$2(() => {
                  const prevLastClose = this._closeLastSubstream === void 0 ? _void : this._closeLastSubstream;
                  this._closeLastSubstream = pipe(prevLastClose, zipRight$2(effect2));
                }));
                executor._input = this._input;
                const channel = this._currentChannel;
                this._activeSubexecutor = new PullFromUpstream(executor, (value2) => channel.k(value2), void 0, [], (x, y) => channel.combineInners(x, y), (x, y) => channel.combineAll(x, y), (request) => channel.onPull(request), (value2) => channel.onEmit(value2));
                this._closeLastSubstream = void 0;
                this._currentChannel = void 0;
                break;
              }
              case OP_EMIT$2: {
                this._emitted = this._currentChannel.out;
                this._currentChannel = this._activeSubexecutor !== void 0 ? void 0 : void_;
                result = Emit$1();
                break;
              }
              case OP_ENSURING: {
                this.runEnsuring(this._currentChannel);
                break;
              }
              case OP_FAIL: {
                result = this.doneHalt(this._currentChannel.error());
                break;
              }
              case OP_FOLD: {
                this._doneStack.push(this._currentChannel.k);
                this._currentChannel = this._currentChannel.channel;
                break;
              }
              case OP_FROM_EFFECT$1: {
                const effect2 = this._providedEnv === void 0 ? this._currentChannel.effect() : pipe(this._currentChannel.effect(), provide$2(this._providedEnv));
                result = fromEffect$2(matchCauseEffect(effect2, {
                  onFailure: (cause) => {
                    const state = this.doneHalt(cause);
                    return state !== void 0 && isFromEffect(state) ? state.effect : _void;
                  },
                  onSuccess: (value2) => {
                    const state = this.doneSucceed(value2);
                    return state !== void 0 && isFromEffect(state) ? state.effect : _void;
                  }
                }));
                break;
              }
              case OP_PIPE_TO: {
                const previousInput = this._input;
                const leftExec = new ChannelExecutor(this._currentChannel.left(), this._providedEnv, (effect2) => this._executeCloseLastSubstream(effect2));
                leftExec._input = previousInput;
                this._input = leftExec;
                this.addFinalizer((exit2) => {
                  const effect2 = this.restorePipe(exit2, previousInput);
                  return effect2 !== void 0 ? effect2 : _void;
                });
                this._currentChannel = this._currentChannel.right();
                break;
              }
              case OP_PROVIDE: {
                const previousEnv = this._providedEnv;
                this._providedEnv = this._currentChannel.context();
                this._currentChannel = this._currentChannel.inner;
                this.addFinalizer(() => sync$2(() => {
                  this._providedEnv = previousEnv;
                }));
                break;
              }
              case OP_READ$1: {
                const read = this._currentChannel;
                result = Read(this._input, identity, (emitted) => {
                  try {
                    this._currentChannel = read.more(emitted);
                  } catch (error) {
                    this._currentChannel = read.done.onExit(die$1(error));
                  }
                  return void 0;
                }, (exit2) => {
                  const onExit2 = (exit3) => {
                    return read.done.onExit(exit3);
                  };
                  this._currentChannel = onExit2(exit2);
                  return void 0;
                });
                break;
              }
              case OP_SUCCEED: {
                result = this.doneSucceed(this._currentChannel.evaluate());
                break;
              }
              case OP_SUCCEED_NOW: {
                result = this.doneSucceed(this._currentChannel.terminal);
                break;
              }
              case OP_SUSPEND: {
                this._currentChannel = this._currentChannel.channel();
                break;
              }
            }
          }
        } catch (error) {
          this._currentChannel = failCause(die$2(error));
        }
      }
    }
    return result;
  }
  getDone() {
    return this._done;
  }
  getEmit() {
    return this._emitted;
  }
  cancelWith(exit2) {
    this._cancelled = exit2;
  }
  clearInProgressFinalizer() {
    this._inProgressFinalizer = void 0;
  }
  storeInProgressFinalizer(finalizer) {
    this._inProgressFinalizer = finalizer;
  }
  popAllFinalizers(exit2) {
    const finalizers = [];
    let next = this._doneStack.pop();
    while (next) {
      if (next._tag === "ContinuationFinalizer") {
        finalizers.push(next.finalizer);
      }
      next = this._doneStack.pop();
    }
    const effect2 = finalizers.length === 0 ? _void : runFinalizers(finalizers, exit2);
    this.storeInProgressFinalizer(effect2);
    return effect2;
  }
  popNextFinalizers() {
    const builder = [];
    while (this._doneStack.length !== 0) {
      const cont = this._doneStack[this._doneStack.length - 1];
      if (cont._tag === OP_CONTINUATION_K) {
        return builder;
      }
      builder.push(cont);
      this._doneStack.pop();
    }
    return builder;
  }
  restorePipe(exit2, prev) {
    const currInput = this._input;
    this._input = prev;
    if (currInput !== void 0) {
      const effect2 = currInput.close(exit2);
      return effect2;
    }
    return _void;
  }
  close(exit$12) {
    let runInProgressFinalizers = void 0;
    const finalizer = this._inProgressFinalizer;
    if (finalizer !== void 0) {
      runInProgressFinalizers = pipe(finalizer, ensuring$1(sync$2(() => this.clearInProgressFinalizer())));
    }
    let closeSelf = void 0;
    const selfFinalizers = this.popAllFinalizers(exit$12);
    if (selfFinalizers !== void 0) {
      closeSelf = pipe(selfFinalizers, ensuring$1(sync$2(() => this.clearInProgressFinalizer())));
    }
    const closeSubexecutors = this._activeSubexecutor === void 0 ? void 0 : this._activeSubexecutor.close(exit$12);
    if (closeSubexecutors === void 0 && runInProgressFinalizers === void 0 && closeSelf === void 0) {
      return void 0;
    }
    return pipe(
      exit(ifNotNull(closeSubexecutors)),
      zip$2(exit(ifNotNull(runInProgressFinalizers))),
      zip$2(exit(ifNotNull(closeSelf))),
      map$3(([[exit1, exit2], exit3]) => pipe(exit1, zipRight$4(exit2), zipRight$4(exit3))),
      uninterruptible,
      // TODO: remove
      flatMap$3((exit2) => suspend$3(() => exit2))
    );
  }
  doneSucceed(value2) {
    if (this._doneStack.length === 0) {
      this._done = succeed$7(value2);
      this._currentChannel = void 0;
      return Done2();
    }
    const head2 = this._doneStack[this._doneStack.length - 1];
    if (head2._tag === OP_CONTINUATION_K) {
      this._doneStack.pop();
      this._currentChannel = head2.onSuccess(value2);
      return void 0;
    }
    const finalizers = this.popNextFinalizers();
    if (this._doneStack.length === 0) {
      this._doneStack = finalizers.reverse();
      this._done = succeed$7(value2);
      this._currentChannel = void 0;
      return Done2();
    }
    const finalizerEffect = runFinalizers(finalizers.map((f) => f.finalizer), succeed$7(value2));
    this.storeInProgressFinalizer(finalizerEffect);
    const effect2 = pipe(finalizerEffect, ensuring$1(sync$2(() => this.clearInProgressFinalizer())), uninterruptible, flatMap$3(() => sync$2(() => this.doneSucceed(value2))));
    return fromEffect$2(effect2);
  }
  doneHalt(cause) {
    if (this._doneStack.length === 0) {
      this._done = failCause$3(cause);
      this._currentChannel = void 0;
      return Done2();
    }
    const head2 = this._doneStack[this._doneStack.length - 1];
    if (head2._tag === OP_CONTINUATION_K) {
      this._doneStack.pop();
      try {
        this._currentChannel = head2.onHalt(cause);
      } catch (error) {
        this._currentChannel = failCause(die$2(error));
      }
      return void 0;
    }
    const finalizers = this.popNextFinalizers();
    if (this._doneStack.length === 0) {
      this._doneStack = finalizers.reverse();
      this._done = failCause$3(cause);
      this._currentChannel = void 0;
      return Done2();
    }
    const finalizerEffect = runFinalizers(finalizers.map((f) => f.finalizer), failCause$3(cause));
    this.storeInProgressFinalizer(finalizerEffect);
    const effect2 = pipe(finalizerEffect, ensuring$1(sync$2(() => this.clearInProgressFinalizer())), uninterruptible, flatMap$3(() => sync$2(() => this.doneHalt(cause))));
    return fromEffect$2(effect2);
  }
  processCancellation() {
    this._currentChannel = void 0;
    this._done = this._cancelled;
    this._cancelled = void 0;
    return Done2();
  }
  runBracketOut(bracketOut) {
    const effect2 = uninterruptible(matchCauseEffect(this.provide(bracketOut.acquire()), {
      onFailure: (cause) => sync$2(() => {
        this._currentChannel = failCause(cause);
      }),
      onSuccess: (out) => sync$2(() => {
        this.addFinalizer((exit2) => this.provide(bracketOut.finalizer(out, exit2)));
        this._currentChannel = write(out);
      })
    }));
    return fromEffect$2(effect2);
  }
  provide(effect2) {
    if (this._providedEnv === void 0) {
      return effect2;
    }
    return pipe(effect2, provide$2(this._providedEnv));
  }
  runEnsuring(ensuring2) {
    this.addFinalizer(ensuring2.finalizer);
    this._currentChannel = ensuring2.channel;
  }
  addFinalizer(f) {
    this._doneStack.push(new ContinuationFinalizerImpl(f));
  }
  runSubexecutor() {
    const subexecutor = this._activeSubexecutor;
    switch (subexecutor._tag) {
      case OP_PULL_FROM_CHILD: {
        return this.pullFromChild(subexecutor.childExecutor, subexecutor.parentSubexecutor, subexecutor.onEmit, subexecutor);
      }
      case OP_PULL_FROM_UPSTREAM: {
        return this.pullFromUpstream(subexecutor);
      }
      case OP_DRAIN_CHILD_EXECUTORS: {
        return this.drainChildExecutors(subexecutor);
      }
      case OP_EMIT: {
        this._emitted = subexecutor.value;
        this._activeSubexecutor = subexecutor.next;
        return Emit$1();
      }
    }
  }
  replaceSubexecutor(nextSubExec) {
    this._currentChannel = void 0;
    this._activeSubexecutor = nextSubExec;
  }
  finishWithExit(exit2) {
    const state = match$3(exit2, {
      onFailure: (cause) => this.doneHalt(cause),
      onSuccess: (value2) => this.doneSucceed(value2)
    });
    this._activeSubexecutor = void 0;
    return state === void 0 ? _void : effect(state);
  }
  finishSubexecutorWithCloseEffect(subexecutorDone, ...closeFuncs) {
    this.addFinalizer(() => pipe(closeFuncs, forEach((closeFunc) => pipe(sync$2(() => closeFunc(subexecutorDone)), flatMap$3((closeEffect) => closeEffect !== void 0 ? closeEffect : _void)), {
      discard: true
    })));
    const state = pipe(subexecutorDone, match$3({
      onFailure: (cause) => this.doneHalt(cause),
      onSuccess: (value2) => this.doneSucceed(value2)
    }));
    this._activeSubexecutor = void 0;
    return state;
  }
  applyUpstreamPullStrategy(upstreamFinished, queue, strategy) {
    switch (strategy._tag) {
      case OP_PULL_AFTER_NEXT: {
        const shouldPrepend = !upstreamFinished || queue.some((subexecutor) => subexecutor !== void 0);
        return [strategy.emitSeparator, shouldPrepend ? [void 0, ...queue] : queue];
      }
      case OP_PULL_AFTER_ALL_ENQUEUED: {
        const shouldEnqueue = !upstreamFinished || queue.some((subexecutor) => subexecutor !== void 0);
        return [strategy.emitSeparator, shouldEnqueue ? [...queue, void 0] : queue];
      }
    }
  }
  pullFromChild(childExecutor, parentSubexecutor, onEmitted, subexecutor) {
    return Read(childExecutor, identity, (emitted) => {
      const childExecutorDecision = onEmitted(emitted);
      switch (childExecutorDecision._tag) {
        case OP_CONTINUE: {
          break;
        }
        case OP_CLOSE: {
          this.finishWithDoneValue(childExecutor, parentSubexecutor, childExecutorDecision.value);
          break;
        }
        case OP_YIELD: {
          const modifiedParent = parentSubexecutor.enqueuePullFromChild(subexecutor);
          this.replaceSubexecutor(modifiedParent);
          break;
        }
      }
      this._activeSubexecutor = new Emit(emitted, this._activeSubexecutor);
      return void 0;
    }, match$3({
      onFailure: (cause) => {
        const state = this.handleSubexecutorFailure(childExecutor, parentSubexecutor, cause);
        return state === void 0 ? void 0 : effectOrUndefinedIgnored(state);
      },
      onSuccess: (doneValue) => {
        this.finishWithDoneValue(childExecutor, parentSubexecutor, doneValue);
        return void 0;
      }
    }));
  }
  finishWithDoneValue(childExecutor, parentSubexecutor, doneValue) {
    const subexecutor = parentSubexecutor;
    switch (subexecutor._tag) {
      case OP_PULL_FROM_UPSTREAM: {
        const modifiedParent = new PullFromUpstream(subexecutor.upstreamExecutor, subexecutor.createChild, subexecutor.lastDone !== void 0 ? subexecutor.combineChildResults(subexecutor.lastDone, doneValue) : doneValue, subexecutor.activeChildExecutors, subexecutor.combineChildResults, subexecutor.combineWithChildResult, subexecutor.onPull, subexecutor.onEmit);
        this._closeLastSubstream = childExecutor.close(succeed$7(doneValue));
        this.replaceSubexecutor(modifiedParent);
        break;
      }
      case OP_DRAIN_CHILD_EXECUTORS: {
        const modifiedParent = new DrainChildExecutors(subexecutor.upstreamExecutor, subexecutor.lastDone !== void 0 ? subexecutor.combineChildResults(subexecutor.lastDone, doneValue) : doneValue, subexecutor.activeChildExecutors, subexecutor.upstreamDone, subexecutor.combineChildResults, subexecutor.combineWithChildResult, subexecutor.onPull);
        this._closeLastSubstream = childExecutor.close(succeed$7(doneValue));
        this.replaceSubexecutor(modifiedParent);
        break;
      }
    }
  }
  handleSubexecutorFailure(childExecutor, parentSubexecutor, cause) {
    return this.finishSubexecutorWithCloseEffect(failCause$3(cause), (exit2) => parentSubexecutor.close(exit2), (exit2) => childExecutor.close(exit2));
  }
  pullFromUpstream(subexecutor) {
    if (subexecutor.activeChildExecutors.length === 0) {
      return this.performPullFromUpstream(subexecutor);
    }
    const activeChild = subexecutor.activeChildExecutors[0];
    const parentSubexecutor = new PullFromUpstream(subexecutor.upstreamExecutor, subexecutor.createChild, subexecutor.lastDone, subexecutor.activeChildExecutors.slice(1), subexecutor.combineChildResults, subexecutor.combineWithChildResult, subexecutor.onPull, subexecutor.onEmit);
    if (activeChild === void 0) {
      return this.performPullFromUpstream(parentSubexecutor);
    }
    this.replaceSubexecutor(new PullFromChild(activeChild.childExecutor, parentSubexecutor, activeChild.onEmit));
    return void 0;
  }
  performPullFromUpstream(subexecutor) {
    return Read(subexecutor.upstreamExecutor, (effect2) => {
      const closeLastSubstream = this._closeLastSubstream === void 0 ? _void : this._closeLastSubstream;
      this._closeLastSubstream = void 0;
      return pipe(this._executeCloseLastSubstream(closeLastSubstream), zipRight$2(effect2));
    }, (emitted) => {
      if (this._closeLastSubstream !== void 0) {
        const closeLastSubstream = this._closeLastSubstream;
        this._closeLastSubstream = void 0;
        return pipe(this._executeCloseLastSubstream(closeLastSubstream), map$3(() => {
          const childExecutor2 = new ChannelExecutor(subexecutor.createChild(emitted), this._providedEnv, this._executeCloseLastSubstream);
          childExecutor2._input = this._input;
          const [emitSeparator2, updatedChildExecutors2] = this.applyUpstreamPullStrategy(false, subexecutor.activeChildExecutors, subexecutor.onPull(Pulled(emitted)));
          this._activeSubexecutor = new PullFromChild(childExecutor2, new PullFromUpstream(subexecutor.upstreamExecutor, subexecutor.createChild, subexecutor.lastDone, updatedChildExecutors2, subexecutor.combineChildResults, subexecutor.combineWithChildResult, subexecutor.onPull, subexecutor.onEmit), subexecutor.onEmit);
          if (isSome(emitSeparator2)) {
            this._activeSubexecutor = new Emit(emitSeparator2.value, this._activeSubexecutor);
          }
          return void 0;
        }));
      }
      const childExecutor = new ChannelExecutor(subexecutor.createChild(emitted), this._providedEnv, this._executeCloseLastSubstream);
      childExecutor._input = this._input;
      const [emitSeparator, updatedChildExecutors] = this.applyUpstreamPullStrategy(false, subexecutor.activeChildExecutors, subexecutor.onPull(Pulled(emitted)));
      this._activeSubexecutor = new PullFromChild(childExecutor, new PullFromUpstream(subexecutor.upstreamExecutor, subexecutor.createChild, subexecutor.lastDone, updatedChildExecutors, subexecutor.combineChildResults, subexecutor.combineWithChildResult, subexecutor.onPull, subexecutor.onEmit), subexecutor.onEmit);
      if (isSome(emitSeparator)) {
        this._activeSubexecutor = new Emit(emitSeparator.value, this._activeSubexecutor);
      }
      return void 0;
    }, (exit2) => {
      if (subexecutor.activeChildExecutors.some((subexecutor2) => subexecutor2 !== void 0)) {
        const drain2 = new DrainChildExecutors(subexecutor.upstreamExecutor, subexecutor.lastDone, [void 0, ...subexecutor.activeChildExecutors], subexecutor.upstreamExecutor.getDone(), subexecutor.combineChildResults, subexecutor.combineWithChildResult, subexecutor.onPull);
        if (this._closeLastSubstream !== void 0) {
          const closeLastSubstream2 = this._closeLastSubstream;
          this._closeLastSubstream = void 0;
          return pipe(this._executeCloseLastSubstream(closeLastSubstream2), map$3(() => this.replaceSubexecutor(drain2)));
        }
        this.replaceSubexecutor(drain2);
        return void 0;
      }
      const closeLastSubstream = this._closeLastSubstream;
      const state = this.finishSubexecutorWithCloseEffect(pipe(exit2, map$6((a) => subexecutor.combineWithChildResult(subexecutor.lastDone, a))), () => closeLastSubstream, (exit3) => subexecutor.upstreamExecutor.close(exit3));
      return state === void 0 ? void 0 : (
        // NOTE: assuming finalizers cannot fail
        effectOrUndefinedIgnored(state)
      );
    });
  }
  drainChildExecutors(subexecutor) {
    if (subexecutor.activeChildExecutors.length === 0) {
      const lastClose = this._closeLastSubstream;
      if (lastClose !== void 0) {
        this.addFinalizer(() => succeed$4(lastClose));
      }
      return this.finishSubexecutorWithCloseEffect(subexecutor.upstreamDone, () => lastClose, (exit2) => subexecutor.upstreamExecutor.close(exit2));
    }
    const activeChild = subexecutor.activeChildExecutors[0];
    const rest = subexecutor.activeChildExecutors.slice(1);
    if (activeChild === void 0) {
      const [emitSeparator, remainingExecutors] = this.applyUpstreamPullStrategy(true, rest, subexecutor.onPull(NoUpstream(rest.reduce((n, curr) => curr !== void 0 ? n + 1 : n, 0))));
      this.replaceSubexecutor(new DrainChildExecutors(subexecutor.upstreamExecutor, subexecutor.lastDone, remainingExecutors, subexecutor.upstreamDone, subexecutor.combineChildResults, subexecutor.combineWithChildResult, subexecutor.onPull));
      if (isSome(emitSeparator)) {
        this._emitted = emitSeparator.value;
        return Emit$1();
      }
      return void 0;
    }
    const parentSubexecutor = new DrainChildExecutors(subexecutor.upstreamExecutor, subexecutor.lastDone, rest, subexecutor.upstreamDone, subexecutor.combineChildResults, subexecutor.combineWithChildResult, subexecutor.onPull);
    this.replaceSubexecutor(new PullFromChild(activeChild.childExecutor, parentSubexecutor, activeChild.onEmit));
    return void 0;
  }
}
const ifNotNull = (effect2) => effect2 !== void 0 ? effect2 : _void;
const runFinalizers = (finalizers, exit$12) => {
  return pipe(forEach(finalizers, (fin) => exit(fin(exit$12))), map$3((exits) => pipe(all$2(exits), getOrElse(() => void_$1))), flatMap$3((exit2) => suspend$3(() => exit2)));
};
const readUpstream = (r, onSuccess, onFailure) => {
  const readStack = [r];
  const read = () => {
    const current = readStack.pop();
    if (current === void 0 || current.upstream === void 0) {
      return dieMessage("Unexpected end of input for channel execution");
    }
    const state = current.upstream.run();
    switch (state._tag) {
      case OP_EMIT$1: {
        const emitEffect = current.onEmit(current.upstream.getEmit());
        if (readStack.length === 0) {
          if (emitEffect === void 0) {
            return suspend$3(onSuccess);
          }
          return pipe(emitEffect, matchCauseEffect({
            onFailure,
            onSuccess
          }));
        }
        if (emitEffect === void 0) {
          return suspend$3(() => read());
        }
        return pipe(emitEffect, matchCauseEffect({
          onFailure,
          onSuccess: () => read()
        }));
      }
      case OP_DONE$1: {
        const doneEffect = current.onDone(current.upstream.getDone());
        if (readStack.length === 0) {
          if (doneEffect === void 0) {
            return suspend$3(onSuccess);
          }
          return pipe(doneEffect, matchCauseEffect({
            onFailure,
            onSuccess
          }));
        }
        if (doneEffect === void 0) {
          return suspend$3(() => read());
        }
        return pipe(doneEffect, matchCauseEffect({
          onFailure,
          onSuccess: () => read()
        }));
      }
      case OP_FROM_EFFECT: {
        readStack.push(current);
        return pipe(current.onEffect(state.effect), catchAllCause((cause) => suspend$3(() => {
          const doneEffect = current.onDone(failCause$3(cause));
          return doneEffect === void 0 ? _void : doneEffect;
        })), matchCauseEffect({
          onFailure,
          onSuccess: () => read()
        }));
      }
      case OP_READ: {
        readStack.push(current);
        readStack.push(state);
        return suspend$3(() => read());
      }
    }
  };
  return read();
};
const runIn = /* @__PURE__ */ dual(2, (self, scope2) => {
  const run2 = (channelDeferred, scopeDeferred, scope3) => acquireUseRelease(sync$2(() => new ChannelExecutor(self, void 0, identity)), (exec) => suspend$3(() => runScopedInterpret(exec.run(), exec).pipe(intoDeferred(channelDeferred), zipRight$2(_await$2(channelDeferred)), zipLeft$1(_await$2(scopeDeferred)))), (exec, exit2) => {
    const finalize = exec.close(exit2);
    if (finalize === void 0) {
      return _void;
    }
    return tapErrorCause(finalize, (cause) => addFinalizer(scope3, failCause$1(cause)));
  });
  return uninterruptibleMask((restore) => all([fork(scope2, sequential), make$l(), make$l()]).pipe(flatMap$3(([child, channelDeferred, scopeDeferred]) => restore(run2(channelDeferred, scopeDeferred, child)).pipe(forkIn(scope2), flatMap$3((fiber) => scope2.addFinalizer((exit2) => {
    const interruptors$12 = isFailure(exit2) ? interruptors(exit2.cause) : void 0;
    return isDone$4(channelDeferred).pipe(flatMap$3((isDone2) => isDone2 ? succeed$8(scopeDeferred, void 0).pipe(zipRight$2(_await(fiber)), zipRight$2(inheritAll(fiber))) : succeed$8(scopeDeferred, void 0).pipe(zipRight$2(interruptors$12 && size$3(interruptors$12) > 0 ? interruptAs(fiber, combineAll(interruptors$12)) : interrupt$1(fiber)), zipRight$2(inheritAll(fiber)))));
  }).pipe(zipRight$2(restore(_await$2(channelDeferred)))))))));
});
const runScopedInterpret = (channelState, exec) => {
  const op = channelState;
  switch (op._tag) {
    case OP_FROM_EFFECT: {
      return pipe(op.effect, flatMap$3(() => runScopedInterpret(exec.run(), exec)));
    }
    case OP_EMIT$1: {
      return runScopedInterpret(exec.run(), exec);
    }
    case OP_DONE$1: {
      return suspend$3(() => exec.getDone());
    }
    case OP_READ: {
      return readUpstream(op, () => runScopedInterpret(exec.run(), exec), failCause$1);
    }
  }
};
const OP_DONE = "Done";
const OP_AWAIT = "Await";
const MergeDecisionSymbolKey = "effect/ChannelMergeDecision";
const MergeDecisionTypeId = /* @__PURE__ */ Symbol.for(MergeDecisionSymbolKey);
const proto$2 = {
  [MergeDecisionTypeId]: {
    _R: (_) => _,
    _E0: (_) => _,
    _Z0: (_) => _,
    _E: (_) => _,
    _Z: (_) => _
  }
};
const Await = (f) => {
  const op = Object.create(proto$2);
  op._tag = OP_AWAIT;
  op.f = f;
  return op;
};
const OP_BOTH_RUNNING = "BothRunning";
const OP_LEFT_DONE = "LeftDone";
const OP_RIGHT_DONE = "RightDone";
const MergeStateSymbolKey = "effect/ChannelMergeState";
const MergeStateTypeId = /* @__PURE__ */ Symbol.for(MergeStateSymbolKey);
const proto$1 = {
  [MergeStateTypeId]: MergeStateTypeId
};
const BothRunning = (left2, right2) => {
  const op = Object.create(proto$1);
  op._tag = OP_BOTH_RUNNING;
  op.left = left2;
  op.right = right2;
  return op;
};
const LeftDone = (f) => {
  const op = Object.create(proto$1);
  op._tag = OP_LEFT_DONE;
  op.f = f;
  return op;
};
const RightDone = (f) => {
  const op = Object.create(proto$1);
  op._tag = OP_RIGHT_DONE;
  op.f = f;
  return op;
};
const OP_BACK_PRESSURE = "BackPressure";
const OP_BUFFER_SLIDING = "BufferSliding";
const MergeStrategySymbolKey = "effect/ChannelMergeStrategy";
const MergeStrategyTypeId = /* @__PURE__ */ Symbol.for(MergeStrategySymbolKey);
const proto = {
  [MergeStrategyTypeId]: MergeStrategyTypeId
};
const BackPressure = (_) => {
  const op = Object.create(proto);
  op._tag = OP_BACK_PRESSURE;
  return op;
};
const BufferSliding = (_) => {
  const op = Object.create(proto);
  op._tag = OP_BUFFER_SLIDING;
  return op;
};
const match = /* @__PURE__ */ dual(2, (self, {
  onBackPressure,
  onBufferSliding
}) => {
  switch (self._tag) {
    case OP_BACK_PRESSURE: {
      return onBackPressure();
    }
    case OP_BUFFER_SLIDING: {
      return onBufferSliding();
    }
  }
});
const OP_STATE_EMPTY = "Empty";
const OP_STATE_EMIT = "Emit";
const OP_STATE_ERROR = "Error";
const OP_STATE_DONE = "Done";
const stateEmpty = (notifyProducer) => ({
  _tag: OP_STATE_EMPTY,
  notifyProducer
});
const stateEmit = (notifyConsumers) => ({
  _tag: OP_STATE_EMIT,
  notifyConsumers
});
const stateError = (cause) => ({
  _tag: OP_STATE_ERROR,
  cause
});
const stateDone = (done2) => ({
  _tag: OP_STATE_DONE,
  done: done2
});
class SingleProducerAsyncInputImpl {
  ref;
  constructor(ref) {
    this.ref = ref;
  }
  awaitRead() {
    return flatten$3(modify(this.ref, (state) => state._tag === OP_STATE_EMPTY ? [_await$2(state.notifyProducer), state] : [_void, state]));
  }
  get close() {
    return fiberIdWith((fiberId2) => this.error(interrupt$2(fiberId2)));
  }
  done(value2) {
    return flatten$3(modify(this.ref, (state) => {
      switch (state._tag) {
        case OP_STATE_EMPTY: {
          return [_await$2(state.notifyProducer), state];
        }
        case OP_STATE_EMIT: {
          return [forEach(state.notifyConsumers, (deferred) => succeed$8(deferred, left(value2)), {
            discard: true
          }), stateDone(value2)];
        }
        case OP_STATE_ERROR: {
          return [interrupt, state];
        }
        case OP_STATE_DONE: {
          return [interrupt, state];
        }
      }
    }));
  }
  emit(element) {
    return flatMap$3(make$l(), (deferred) => flatten$3(modify(this.ref, (state) => {
      switch (state._tag) {
        case OP_STATE_EMPTY: {
          return [_await$2(state.notifyProducer), state];
        }
        case OP_STATE_EMIT: {
          const notifyConsumer = state.notifyConsumers[0];
          const notifyConsumers = state.notifyConsumers.slice(1);
          if (notifyConsumer !== void 0) {
            return [succeed$8(notifyConsumer, right(element)), notifyConsumers.length === 0 ? stateEmpty(deferred) : stateEmit(notifyConsumers)];
          }
          throw new Error("Bug: Channel.SingleProducerAsyncInput.emit - Queue was empty! please report an issue at https://github.com/Effect-TS/effect/issues");
        }
        case OP_STATE_ERROR: {
          return [interrupt, state];
        }
        case OP_STATE_DONE: {
          return [interrupt, state];
        }
      }
    })));
  }
  error(cause) {
    return flatten$3(modify(this.ref, (state) => {
      switch (state._tag) {
        case OP_STATE_EMPTY: {
          return [_await$2(state.notifyProducer), state];
        }
        case OP_STATE_EMIT: {
          return [forEach(state.notifyConsumers, (deferred) => failCause$4(deferred, cause), {
            discard: true
          }), stateError(cause)];
        }
        case OP_STATE_ERROR: {
          return [interrupt, state];
        }
        case OP_STATE_DONE: {
          return [interrupt, state];
        }
      }
    }));
  }
  get take() {
    return this.takeWith((cause) => failCause$3(map$9(cause, left)), (elem) => succeed$7(elem), (done2) => fail$6(right(done2)));
  }
  takeWith(onError2, onElement, onDone) {
    return flatMap$3(make$l(), (deferred) => flatten$3(modify(this.ref, (state) => {
      switch (state._tag) {
        case OP_STATE_EMPTY: {
          return [zipRight$2(succeed$8(state.notifyProducer, void 0), matchCause(_await$2(deferred), {
            onFailure: onError2,
            onSuccess: match$a({
              onLeft: onDone,
              onRight: onElement
            })
          })), stateEmit([deferred])];
        }
        case OP_STATE_EMIT: {
          return [matchCause(_await$2(deferred), {
            onFailure: onError2,
            onSuccess: match$a({
              onLeft: onDone,
              onRight: onElement
            })
          }), stateEmit([...state.notifyConsumers, deferred])];
        }
        case OP_STATE_ERROR: {
          return [succeed$4(onError2(state.cause)), state];
        }
        case OP_STATE_DONE: {
          return [succeed$4(onDone(state.done)), state];
        }
      }
    })));
  }
}
const make$3 = () => pipe(make$l(), flatMap$3((deferred) => make$j(stateEmpty(deferred))), map$3((ref) => new SingleProducerAsyncInputImpl(ref)));
const concatMap = /* @__PURE__ */ dual(2, (self, f) => concatMapWith(self, f, () => void 0, () => void 0));
const drain = (self) => {
  const drainer = readWithCause({
    onInput: () => drainer,
    onFailure: failCause,
    onDone: succeed$1
  });
  return pipeTo(self, drainer);
};
const ensuring = /* @__PURE__ */ dual(2, (self, finalizer) => ensuringWith$2(self, () => finalizer));
const flatten$1 = (self) => flatMap$1(self, identity);
const fromInput = (input) => unwrap(input.takeWith(failCause, (elem) => flatMap$1(write(elem), () => fromInput(input)), succeed$1));
const map$1 = /* @__PURE__ */ dual(2, (self, f) => flatMap$1(self, (a) => sync$1(() => f(a))));
const mapOut = /* @__PURE__ */ dual(2, (self, f) => {
  const reader = readWith({
    onInput: (outElem) => flatMap$1(write(f(outElem)), () => reader),
    onFailure: fail$2,
    onDone: succeedNow
  });
  return pipeTo(self, reader);
});
const mergeAll = (options) => {
  return (channels) => mergeAllWith(options)(channels, constVoid);
};
const mergeAllWith = ({
  bufferSize = 16,
  concurrency,
  mergeStrategy = BackPressure()
}) => (channels, f) => unwrapScopedWith((scope2) => gen(function* () {
  const concurrencyN = concurrency === "unbounded" ? Number.MAX_SAFE_INTEGER : concurrency;
  const input = yield* make$3();
  const queueReader = fromInput(input);
  const queue = yield* bounded(bufferSize);
  yield* addFinalizer(scope2, shutdown(queue));
  const cancelers = yield* unbounded();
  yield* addFinalizer(scope2, shutdown(cancelers));
  const lastDone = yield* make$j(none$6());
  const errorSignal = yield* make$l();
  const withPermits = (yield* makeSemaphore(concurrencyN)).withPermits;
  const pull = yield* toPullIn(pipeTo(queueReader, channels), scope2);
  function evaluatePull(pull2) {
    return pull2.pipe(flatMap$3(match$a({
      onLeft: (done2) => succeed$4(some(done2)),
      onRight: (outElem) => as(offer(queue, succeed$4(right(outElem))), none$6())
    })), repeat({
      until: (_) => isSome(_)
    }), flatMap$3((outDone) => update$2(lastDone, match$9({
      onNone: () => some(outDone.value),
      onSome: (lastDone2) => some(f(lastDone2, outDone.value))
    }))), catchAllCause((cause) => isInterrupted$1(cause) ? failCause$1(cause) : offer(queue, failCause$1(cause)).pipe(zipRight$2(succeed$8(errorSignal, void 0)), asVoid)));
  }
  yield* pull.pipe(matchCauseEffect({
    onFailure: (cause) => offer(queue, failCause$1(cause)).pipe(zipRight$2(succeed$4(false))),
    onSuccess: match$a({
      onLeft: (outDone) => raceWith(interruptible(_await$2(errorSignal)), interruptible(withPermits(concurrencyN)(_void)), {
        onSelfDone: (_, permitAcquisition) => as(interrupt$1(permitAcquisition), false),
        onOtherDone: (_, failureAwait) => zipRight$2(interrupt$1(failureAwait), get$1(lastDone).pipe(flatMap$3(match$9({
          onNone: () => offer(queue, succeed$4(left(outDone))),
          onSome: (lastDone2) => offer(queue, succeed$4(left(f(lastDone2, outDone))))
        })), as(false)))
      }),
      onRight: (channel) => match(mergeStrategy, {
        onBackPressure: () => gen(function* () {
          const latch = yield* make$l();
          const raceEffects = scopedWith$1((scope3) => toPullIn(pipeTo(queueReader, channel), scope3).pipe(flatMap$3((pull2) => race(exit(evaluatePull(pull2)), exit(interruptible(_await$2(errorSignal))))), flatMap$3(identity)));
          yield* succeed$8(latch, void 0).pipe(zipRight$2(raceEffects), withPermits(1), forkIn(scope2));
          yield* _await$2(latch);
          const errored = yield* isDone$4(errorSignal);
          return !errored;
        }),
        onBufferSliding: () => gen(function* () {
          const canceler = yield* make$l();
          const latch = yield* make$l();
          const size$12 = yield* size(cancelers);
          yield* take(cancelers).pipe(flatMap$3((canceler2) => succeed$8(canceler2, void 0)), when(() => size$12 >= concurrencyN));
          yield* offer(cancelers, canceler);
          const raceEffects = scopedWith$1((scope3) => toPullIn(pipeTo(queueReader, channel), scope3).pipe(flatMap$3((pull2) => exit(evaluatePull(pull2)).pipe(race(exit(interruptible(_await$2(errorSignal)))), race(exit(interruptible(_await$2(canceler)))))), flatMap$3(identity)));
          yield* succeed$8(latch, void 0).pipe(zipRight$2(raceEffects), withPermits(1), forkIn(scope2));
          yield* _await$2(latch);
          const errored = yield* isDone$4(errorSignal);
          return !errored;
        })
      })
    })
  }), repeat({
    while: (_) => _
  }), forkIn(scope2));
  const consumer = pipe(take(queue), flatten$3, matchCause({
    onFailure: failCause,
    onSuccess: match$a({
      onLeft: succeedNow,
      onRight: (outElem) => flatMap$1(write(outElem), () => consumer)
    })
  }), unwrap);
  return embedInput(consumer, input);
}));
const mergeMap = /* @__PURE__ */ dual(3, (self, f, options) => mergeAll(options)(mapOut(self, f)));
const mergeWith = /* @__PURE__ */ dual(2, (self, options) => {
  function merge2(scope2) {
    return gen(function* () {
      const input = yield* make$3();
      const queueReader = fromInput(input);
      const pullL = yield* toPullIn(pipeTo(queueReader, self), scope2);
      const pullR = yield* toPullIn(pipeTo(queueReader, options.other), scope2);
      function handleSide(exit2, fiber, pull) {
        return (done2, both, single) => {
          function onDecision(decision) {
            const op = decision;
            if (op._tag === OP_DONE) {
              return succeed$4(fromEffect$3(zipRight$2(interrupt$1(fiber), op.effect)));
            }
            return map$3(_await(fiber), match$3({
              onFailure: (cause) => fromEffect$3(op.f(failCause$3(cause))),
              onSuccess: match$a({
                onLeft: (done3) => fromEffect$3(op.f(succeed$7(done3))),
                onRight: (elem) => zipRight$1(write(elem), go2(single(op.f)))
              })
            }));
          }
          return match$3(exit2, {
            onFailure: (cause) => onDecision(done2(failCause$3(cause))),
            onSuccess: match$a({
              onLeft: (z) => onDecision(done2(succeed$7(z))),
              onRight: (elem) => succeed$4(flatMap$1(write(elem), () => flatMap$1(fromEffect$3(forkIn(interruptible(pull), scope2)), (leftFiber) => go2(both(leftFiber, fiber)))))
            })
          });
        };
      }
      function go2(state) {
        switch (state._tag) {
          case OP_BOTH_RUNNING: {
            const leftJoin = interruptible(join(state.left));
            const rightJoin = interruptible(join(state.right));
            return unwrap(raceWith(leftJoin, rightJoin, {
              onSelfDone: (leftExit, rf) => zipRight$2(interrupt$1(rf), handleSide(leftExit, state.right, pullL)(options.onSelfDone, BothRunning, (f) => LeftDone(f))),
              onOtherDone: (rightExit, lf) => zipRight$2(interrupt$1(lf), handleSide(rightExit, state.left, pullR)(options.onOtherDone, (left2, right2) => BothRunning(right2, left2), (f) => RightDone(f)))
            }));
          }
          case OP_LEFT_DONE: {
            return unwrap(map$3(exit(pullR), match$3({
              onFailure: (cause) => fromEffect$3(state.f(failCause$3(cause))),
              onSuccess: match$a({
                onLeft: (done2) => fromEffect$3(state.f(succeed$7(done2))),
                onRight: (elem) => flatMap$1(write(elem), () => go2(LeftDone(state.f)))
              })
            })));
          }
          case OP_RIGHT_DONE: {
            return unwrap(map$3(exit(pullL), match$3({
              onFailure: (cause) => fromEffect$3(state.f(failCause$3(cause))),
              onSuccess: match$a({
                onLeft: (done2) => fromEffect$3(state.f(succeed$7(done2))),
                onRight: (elem) => flatMap$1(write(elem), () => go2(RightDone(state.f)))
              })
            })));
          }
        }
      }
      return fromEffect$3(withFiberRuntime((parent) => {
        const inherit = withFiberRuntime((state) => {
          state.transferChildren(parent.scope());
          return _void;
        });
        const leftFiber = interruptible(pullL).pipe(ensuring$1(inherit), forkIn(scope2));
        const rightFiber = interruptible(pullR).pipe(ensuring$1(inherit), forkIn(scope2));
        return zipWith(leftFiber, rightFiber, (left2, right2) => BothRunning(left2, right2));
      })).pipe(flatMap$1(go2), embedInput(input));
    });
  }
  return unwrapScopedWith(merge2);
});
const pipeToOrFail = /* @__PURE__ */ dual(2, (self, that) => suspend$2(() => {
  let channelException = void 0;
  const reader = readWith({
    onInput: (outElem) => flatMap$1(write(outElem), () => reader),
    onFailure: (outErr) => {
      channelException = ChannelException(outErr);
      return failCause(die$2(channelException));
    },
    onDone: succeedNow
  });
  const writer = readWithCause({
    onInput: (outElem) => pipe(write(outElem), flatMap$1(() => writer)),
    onFailure: (cause) => isDieType(cause) && isChannelException(cause.defect) && equals$1(cause.defect, channelException) ? fail$2(cause.defect.error) : failCause(cause),
    onDone: succeedNow
  });
  return pipeTo(pipeTo(pipeTo(self, reader), that), writer);
}));
const run$1 = (self) => scopedWith$1((scope2) => runIn(self, scope2));
const runDrain = (self) => run$1(drain(self));
const scoped$1 = (effect2) => unwrap(uninterruptibleMask((restore) => map$3(make$8(), (scope2) => acquireReleaseOut(tapErrorCause(restore(extend$1(effect2, scope2)), (cause) => close(scope2, failCause$3(cause))), (_, exit2) => close(scope2, exit2)))));
const scopedWith = (f) => unwrapScoped$1(map$3(scope, (scope2) => flatMap$1(fromEffect$3(f(scope2)), write)));
const toPullIn = /* @__PURE__ */ dual(2, (self, scope2) => zip$2(sync$2(() => new ChannelExecutor(self, void 0, identity)), runtime()).pipe(tap(([executor, runtime2]) => addFinalizerExit(scope2, (exit2) => {
  const finalizer = executor.close(exit2);
  return finalizer !== void 0 ? provide$2(finalizer, runtime2) : _void;
})), uninterruptible, map$3(([executor]) => suspend$3(() => interpretToPull(executor.run(), executor)))));
const interpretToPull = (channelState, exec) => {
  const state = channelState;
  switch (state._tag) {
    case OP_DONE$1: {
      return match$3(exec.getDone(), {
        onFailure: failCause$1,
        onSuccess: (done2) => succeed$4(left(done2))
      });
    }
    case OP_EMIT$1: {
      return succeed$4(right(exec.getEmit()));
    }
    case OP_FROM_EFFECT: {
      return pipe(state.effect, flatMap$3(() => interpretToPull(exec.run(), exec)));
    }
    case OP_READ: {
      return readUpstream(state, () => interpretToPull(exec.run(), exec), (cause) => failCause$1(cause));
    }
  }
};
const unwrap = (channel) => flatten$1(fromEffect$3(channel));
const unwrapScoped$1 = (self) => concatAllWith(scoped$1(self), (d, _) => d, (d, _) => d);
const unwrapScopedWith = (f) => concatAllWith(scopedWith(f), (d, _) => d, (d, _) => d);
const writeChunk = (outs) => writeChunkWriter(0, outs.length, outs);
const writeChunkWriter = (idx, len, chunk) => {
  return idx === len ? void_ : pipe(write(pipe(chunk, unsafeGet(idx))), flatMap$1(() => writeChunkWriter(idx + 1, len, chunk)));
};
const zip$1 = /* @__PURE__ */ dual((args2) => isChannel(args2[1]), (self, that, options) => options?.concurrent ? mergeWith(self, {
  other: that,
  onSelfDone: (exit1) => Await((exit2) => suspend$3(() => zip$4(exit1, exit2))),
  onOtherDone: (exit2) => Await((exit1) => suspend$3(() => zip$4(exit1, exit2)))
}) : flatMap$1(self, (a) => map$1(that, (b) => [a, b])));
const zipRight$1 = /* @__PURE__ */ dual((args2) => isChannel(args2[1]), (self, that, options) => options?.concurrent ? map$1(zip$1(self, that, {
  concurrent: true
}), (tuple) => tuple[1]) : flatMap$1(self, () => that));
const ChannelExceptionTypeId = /* @__PURE__ */ Symbol.for("effect/Channel/ChannelException");
const ChannelException = (error) => ({
  _tag: "ChannelException",
  [ChannelExceptionTypeId]: ChannelExceptionTypeId,
  error
});
const isChannelException = (u) => hasProperty(u, ChannelExceptionTypeId);
const SinkTypeId = /* @__PURE__ */ Symbol.for("effect/Sink");
const sinkVariance = {
  /* c8 ignore next */
  _A: (_) => _,
  /* c8 ignore next */
  _In: (_) => _,
  /* c8 ignore next */
  _L: (_) => _,
  /* c8 ignore next */
  _E: (_) => _,
  /* c8 ignore next */
  _R: (_) => _
};
class SinkImpl {
  channel;
  [SinkTypeId] = sinkVariance;
  constructor(channel) {
    this.channel = channel;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const forEachChunk = (f) => {
  const process2 = readWithCause({
    onInput: (input) => pipe(fromEffect$3(f(input)), flatMap$1(() => process2)),
    onFailure: failCause,
    onDone: () => void_
  });
  return new SinkImpl(process2);
};
const fromEffect$1 = (effect2) => new SinkImpl(fromEffect$3(effect2));
const toChannel$1 = (self) => isEffect(self) ? toChannel$1(fromEffect$1(self)) : self.channel;
const StreamSymbolKey = "effect/Stream";
const StreamTypeId = /* @__PURE__ */ Symbol.for(StreamSymbolKey);
const streamVariance = {
  _R: (_) => _,
  _E: (_) => _,
  _A: (_) => _
};
class StreamImpl {
  channel;
  [StreamTypeId] = streamVariance;
  constructor(channel) {
    this.channel = channel;
  }
  pipe() {
    return pipeArguments(this, arguments);
  }
}
const isStream = (u) => hasProperty(u, StreamTypeId) || isEffect(u);
const ensuringWith$1 = /* @__PURE__ */ dual(2, (self, finalizer) => new StreamImpl(ensuringWith$2(toChannel(self), finalizer)));
const fail$1 = (error) => fromEffectOption(fail$4(some(error)));
const flatMap = /* @__PURE__ */ dual((args2) => isStream(args2[0]), (self, f, options) => {
  const bufferSize = options?.bufferSize ?? 16;
  if (options?.switch) {
    return matchConcurrency(options?.concurrency, () => flatMapParSwitchBuffer(self, 1, bufferSize, f), (n) => flatMapParSwitchBuffer(self, n, bufferSize, f));
  }
  return matchConcurrency(options?.concurrency, () => new StreamImpl(concatMap(toChannel(self), (as2) => pipe(as2, map$e((a) => toChannel(f(a))), reduce$6(void_, (left2, right2) => pipe(left2, zipRight$1(right2)))))), (_) => new StreamImpl(pipe(toChannel(self), concatMap(writeChunk), mergeMap((out) => toChannel(f(out)), options))));
});
const matchConcurrency = (concurrency, sequential2, bounded2) => {
  switch (concurrency) {
    case void 0:
      return sequential2();
    case "unbounded":
      return bounded2(Number.MAX_SAFE_INTEGER);
    default:
      return concurrency > 1 ? bounded2(concurrency) : sequential2();
  }
};
const flatMapParSwitchBuffer = /* @__PURE__ */ dual(4, (self, n, bufferSize, f) => new StreamImpl(pipe(toChannel(self), concatMap(writeChunk), mergeMap((out) => toChannel(f(out)), {
  concurrency: n,
  mergeStrategy: BufferSliding(),
  bufferSize
}))));
const flatten = /* @__PURE__ */ dual((args2) => isStream(args2[0]), (self, options) => flatMap(self, identity, options));
const toChannel = (stream) => {
  if ("channel" in stream) {
    return stream.channel;
  } else if (isEffect(stream)) {
    return toChannel(fromEffect(stream));
  } else {
    throw new TypeError(`Expected a Stream.`);
  }
};
const fromEffect = (effect2) => pipe(effect2, mapError$1(some), fromEffectOption);
const fromEffectOption = (effect2) => new StreamImpl(unwrap(match$1(effect2, {
  onFailure: match$9({
    onNone: () => void_,
    onSome: fail$2
  }),
  onSuccess: (a) => write(of$1(a))
})));
const fromReadableStream$1 = (...args2) => {
  const evaluate2 = args2.length === 1 ? args2[0].evaluate : args2[0];
  const onError2 = args2.length === 1 ? args2[0].onError : args2[1];
  const releaseLockOnEnd = args2.length === 1 ? args2[0].releaseLockOnEnd === true : false;
  return unwrapScoped(map$3(acquireRelease(sync$2(() => evaluate2().getReader()), (reader) => releaseLockOnEnd ? sync$2(() => reader.releaseLock()) : promise(() => reader.cancel())), (reader) => repeatEffectOption(flatMap$3(tryPromise({
    try: () => reader.read(),
    catch: (reason) => some(onError2(reason))
  }), ({
    done: done2,
    value: value2
  }) => done2 ? fail$4(none$6()) : succeed$4(value2)))));
};
const repeatEffectChunkOption = (effect2) => unfoldChunkEffect(effect2, (effect3) => pipe(map$3(effect3, (chunk) => some([chunk, effect3])), catchAll(match$9({
  onNone: () => succeed$4(none$6()),
  onSome: fail$4
}))));
const repeatEffectOption = (effect2) => repeatEffectChunkOption(pipe(effect2, map$3(of$1)));
const run = /* @__PURE__ */ dual(2, (self, sink) => toChannel(self).pipe(pipeToOrFail(toChannel$1(sink)), runDrain));
const runForEachChunk = /* @__PURE__ */ dual(2, (self, f) => run(self, forEachChunk(f)));
const scoped = (effect2) => new StreamImpl(ensuring(scoped$1(pipe(effect2, map$3(of$1))), _void));
const suspend$1 = (stream) => new StreamImpl(suspend$2(() => toChannel(stream())));
const toReadableStreamEffect$1 = /* @__PURE__ */ dual((args2) => isStream(args2[0]), (self, options) => map$3(runtime(), (runtime2) => toReadableStreamRuntime(self, runtime2, options)));
const toReadableStreamRuntime = /* @__PURE__ */ dual((args2) => isStream(args2[0]), (self, runtime2, options) => {
  const runFork$12 = runFork(runtime2);
  let currentResolve = void 0;
  let fiber = void 0;
  const latch = unsafeMakeLatch(false);
  return new ReadableStream({
    start(controller) {
      fiber = runFork$12(runForEachChunk(self, (chunk) => {
        if (chunk.length === 0) return _void;
        return latch.whenOpen(sync$2(() => {
          latch.unsafeClose();
          for (const item of chunk) {
            controller.enqueue(item);
          }
          currentResolve();
          currentResolve = void 0;
        }));
      }));
      fiber.addObserver((exit2) => {
        try {
          if (exit2._tag === "Failure") {
            controller.error(squash(exit2.cause));
          } else {
            controller.close();
          }
        } catch {
        }
      });
    },
    pull() {
      return new Promise((resolve) => {
        currentResolve = resolve;
        runSync(latch.open);
      });
    },
    cancel() {
      if (!fiber) return;
      return runPromise(asVoid(interrupt$1(fiber)));
    }
  }, options?.strategy);
});
const unfoldChunkEffect = (s, f) => suspend$1(() => {
  const loop = (s2) => unwrap(map$3(f(s2), match$9({
    onNone: () => void_,
    onSome: ([chunk, s3]) => flatMap$1(write(chunk), () => loop(s3))
  })));
  return new StreamImpl(loop(s));
});
const unwrapScoped = (effect2) => flatten(scoped(effect2));
const ensuringWith = ensuringWith$1;
const fail = fail$1;
const fromReadableStream = fromReadableStream$1;
const suspend = suspend$1;
const toReadableStreamEffect = toReadableStreamEffect$1;
const fromEnv = fromEnv$1;
const fromJson = fromJson$1;
const fromMap = fromMap$1;
const constantCase = constantCase$1;
const nested = nested$3;
const orElse = orElse$4;
const test$1 = /* @__PURE__ */ dual(2, (self, input) => self.log({
  fiberId: none$5,
  logLevel: logLevelInfo,
  message: input,
  cause: empty$9,
  context: empty$7(),
  spans: empty$e(),
  annotations: empty$f(),
  date: /* @__PURE__ */ new Date()
}));
const LoggerTypeId = LoggerTypeId$1;
const make$2 = makeLogger;
const add = addLogger;
const addEffect = addLoggerEffect;
const addScoped = addLoggerScoped;
const mapInput = mapInput$1;
const mapInputOptions = mapInputOptions$1;
const filterLogLevel = filterLogLevel$1;
const map = map$5;
const batched = batchedLogger;
const withConsoleLog = loggerWithConsoleLog;
const withLeveledConsole = loggerWithLeveledLog;
const withConsoleError = loggerWithConsoleError;
const none = none$2;
const remove = removeLogger;
const replace = replaceLogger;
const replaceEffect = replaceLoggerEffect;
const replaceScoped = replaceLoggerScoped;
const simple = simple$1;
const succeed = succeed$6;
const sync = sync$3;
const test = test$1;
const withMinimumLogLevel = withMinimumLogLevel$1;
const withSpanAnnotations = loggerWithSpanAnnotations;
const zip = zip$3;
const zipLeft = zipLeft$2;
const zipRight = zipRight$3;
const defaultLogger = defaultLogger$1;
const jsonLogger = jsonLogger$2;
const logfmtLogger = logfmtLogger$1;
const stringLogger = stringLogger$1;
const prettyLogger = prettyLogger$2;
const prettyLoggerDefault = prettyLoggerDefault$1;
const structuredLogger = structuredLogger$2;
const tracerLogger = tracerLogger$1;
const json = /* @__PURE__ */ replace(defaultLogger$1, jsonLogger$1);
const logFmt = /* @__PURE__ */ replace(defaultLogger$1, logFmtLogger);
const pretty = /* @__PURE__ */ replace(defaultLogger$1, prettyLogger$1);
const structured = /* @__PURE__ */ replace(defaultLogger$1, structuredLogger$1);
const minimumLogLevel = minimumLogLevel$1;
const isLogger = isLogger$1;
const Logger = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  LoggerTypeId,
  add,
  addEffect,
  addScoped,
  batched,
  defaultLogger,
  filterLogLevel,
  isLogger,
  json,
  jsonLogger,
  logFmt,
  logfmtLogger,
  make: make$2,
  map,
  mapInput,
  mapInputOptions,
  minimumLogLevel,
  none,
  pretty,
  prettyLogger,
  prettyLoggerDefault,
  remove,
  replace,
  replaceEffect,
  replaceScoped,
  simple,
  stringLogger,
  structured,
  structuredLogger,
  succeed,
  sync,
  test,
  tracerLogger,
  withConsoleError,
  withConsoleLog,
  withLeveledConsole,
  withMinimumLogLevel,
  withSpanAnnotations,
  zip,
  zipLeft,
  zipRight
});
function provide(managed, effect2) {
  return flatMap$5(managed.runtimeEffect, (rt) => withFiberRuntime$1((fiber) => {
    fiber.setFiberRefs(rt.fiberRefs);
    fiber.currentRuntimeFlags = rt.runtimeFlags;
    return provideContext(effect2, rt.context);
  }));
}
const ManagedRuntimeProto = {
  ...CommitPrototype,
  [TypeId$3]: TypeId$3,
  pipe() {
    return pipeArguments(this, arguments);
  },
  commit() {
    return this.runtimeEffect;
  }
};
const make$1 = (layer, memoMap) => {
  memoMap = memoMap ?? unsafeMakeMemoMap();
  const scope2 = unsafeRunSyncEffect(scopeMake());
  let buildFiber;
  const runtimeEffect = withFiberRuntime$1((fiber) => {
    if (!buildFiber) {
      buildFiber = unsafeForkEffect(tap$1(extend$1(toRuntimeWithMemoMap(layer, memoMap), scope2), (rt) => {
        self.cachedRuntime = rt;
      }), {
        scope: scope2,
        scheduler: fiber.currentScheduler
      });
    }
    return flatten$5(buildFiber.await);
  });
  const self = Object.assign(Object.create(ManagedRuntimeProto), {
    memoMap,
    scope: scope2,
    runtimeEffect,
    cachedRuntime: void 0,
    runtime() {
      return self.cachedRuntime === void 0 ? unsafeRunPromiseEffect(self.runtimeEffect) : Promise.resolve(self.cachedRuntime);
    },
    dispose() {
      return unsafeRunPromiseEffect(self.disposeEffect);
    },
    disposeEffect: suspend$6(() => {
      self.runtimeEffect = die$3("ManagedRuntime disposed");
      self.cachedRuntime = void 0;
      return close(self.scope, exitVoid);
    }),
    runFork(effect2, options) {
      return self.cachedRuntime === void 0 ? unsafeForkEffect(provide(self, effect2), options) : unsafeFork(self.cachedRuntime)(effect2, options);
    },
    runSyncExit(effect2) {
      return self.cachedRuntime === void 0 ? unsafeRunSyncExitEffect(provide(self, effect2)) : unsafeRunSyncExit(self.cachedRuntime)(effect2);
    },
    runSync(effect2) {
      return self.cachedRuntime === void 0 ? unsafeRunSyncEffect(provide(self, effect2)) : unsafeRunSync(self.cachedRuntime)(effect2);
    },
    runPromiseExit(effect2, options) {
      return self.cachedRuntime === void 0 ? unsafeRunPromiseExitEffect(provide(self, effect2), options) : unsafeRunPromiseExit(self.cachedRuntime)(effect2, options);
    },
    runCallback(effect2, options) {
      return self.cachedRuntime === void 0 ? unsafeRunCallback(defaultRuntime)(provide(self, effect2), options) : unsafeRunCallback(self.cachedRuntime)(effect2, options);
    },
    runPromise(effect2, options) {
      return self.cachedRuntime === void 0 ? unsafeRunPromiseEffect(provide(self, effect2), options) : unsafeRunPromise(self.cachedRuntime)(effect2, options);
    }
  });
  return self;
};
const make = make$1;
export {
  Logger as $,
  Array$ as A,
  Boolean$ as B,
  Class3 as C,
  orElse$2 as D,
  succeed$9 as E,
  map$7 as F,
  withDefault as G,
  Config as H,
  catchTags as I,
  string as J,
  mapAttempt as K,
  Literal2 as L,
  fn as M,
  NonEmptyArray as N,
  literal as O,
  Info as P,
  andThen as Q,
  Redacted as R,
  String$ as S,
  minimumLogLevel as T,
  Uint8ArrayFromBase64 as U,
  tapError as V,
  logError as W,
  annotateLogs as X,
  catchTag as Y,
  unwrapEffect as Z,
  gen as _,
  Uint8ArrayFromSelf as a,
  fail as a$,
  TaggedError as a0,
  Tag as a1,
  mapOrFail as a2,
  allLevels as a3,
  left as a4,
  InvalidData as a5,
  right as a6,
  nested$1 as a7,
  fromLiteral as a8,
  flatMap$3 as a9,
  map$f as aA,
  encodeHex as aB,
  Error$2 as aC,
  dual as aD,
  appendAll$2 as aE,
  filter$2 as aF,
  fromIterable$6 as aG,
  NodeInspectSymbol as aH,
  format$3 as aI,
  isSome as aJ,
  none$6 as aK,
  some as aL,
  BaseProto as aM,
  seconds as aN,
  pipeArguments as aO,
  map$h as aP,
  globalValue as aQ,
  symbolRedactable as aR,
  getOrDefault as aS,
  make$z as aT,
  unsafeMake as aU,
  decodeUnknown as aV,
  runSync as aW,
  redact as aX,
  succeed$4 as aY,
  Class$3 as aZ,
  fromReadableStream as a_,
  _void as aa,
  logWithLevel as ab,
  withLogSpan as ac,
  squash as ad,
  forEach as ae,
  ensure as af,
  match$1 as ag,
  map$3 as ah,
  tap as ai,
  logDebug as aj,
  isRecord as ak,
  fail$4 as al,
  mapError$1 as am,
  scoped$2 as an,
  value as ao,
  tapBoth as ap,
  unsafeCoerce as aq,
  Error$3 as ar,
  isNumber as as,
  isString as at,
  TaggedError$1 as au,
  gen$2 as av,
  withTrace as aw,
  sync$5 as ax,
  string$2 as ay,
  tryPromise$2 as az,
  Struct as b,
  tryMap as b0,
  tryPromise as b1,
  cached as b2,
  try_ as b3,
  effect$1 as b4,
  context as b5,
  mapInputContext as b6,
  merge$2 as b7,
  GenericTag as b8,
  serviceFunctions as b9,
  withFiberRuntime as ba,
  currentTracerEnabled as bb,
  uninterruptibleMask as bc,
  matchCauseEffect as bd,
  isInterrupted$1 as be,
  failCause$1 as bf,
  get$9 as bg,
  useSpan as bh,
  constFalse as bi,
  suspend$3 as bj,
  onInterrupt as bk,
  sync$2 as bl,
  suspend as bm,
  Reference as bn,
  withParentSpan as bo,
  ensuringWith as bp,
  isInterrupted as bq,
  currentContext as br,
  toReadableStreamEffect as bs,
  compose as c,
  Number$ as d,
  optional as e,
  NullOr as f,
  Unknown as g,
  provideMerge as h,
  succeed$3 as i,
  effectDiscard as j,
  provide$1 as k,
  setConfigProvider as l,
  mergeAll$1 as m,
  make as n,
  optionalWith as o,
  parseJson as p,
  fromJson as q,
  orElse as r,
  startsWith as s,
  transform as t,
  update as u,
  fromEnv as v,
  fromMap as w,
  nested as x,
  constantCase as y,
  boolean as z
};
