import { O as createAdapterFactory, y as logger, B as BetterAuthError } from "./better-auth__core.mjs";
import { c as count, d as desc, a as asc, i as inArray, n as notInArray, l as like, b as lt, e as lte, f as ne, g as gt, h as gte, j as eq, k as and, o as or, s as sql } from "./drizzle-orm.mjs";
const drizzleAdapter = (db, config) => {
  let lazyOptions = null;
  const createCustomAdapter = (db2) => ({ getFieldName, getDefaultFieldName, options }) => {
    function getSchema(model) {
      const schema = config.schema || db2._.fullSchema;
      if (!schema) throw new BetterAuthError("Drizzle adapter failed to initialize. Schema not found. Please provide a schema object in the adapter options object.");
      const schemaModel = schema[model];
      if (!schemaModel) throw new BetterAuthError(`[# Drizzle Adapter]: The model "${model}" was not found in the schema object. Please pass the schema directly to the adapter options.`);
      return schemaModel;
    }
    const withReturning = async (model, builder, data, where) => {
      if (config.provider !== "mysql") return (await builder.returning())[0];
      await builder.execute();
      const schemaModel = getSchema(model);
      const builderVal = builder.config?.values;
      if (where?.length) {
        const clause = convertWhereClause(where.map((w) => {
          if (data[w.field] !== void 0) return {
            ...w,
            value: data[w.field]
          };
          return w;
        }), model);
        return (await db2.select().from(schemaModel).where(...clause))[0];
      } else if (builderVal && builderVal[0]?.id?.value) {
        let tId = builderVal[0]?.id?.value;
        if (!tId) tId = (await db2.select({ id: sql`LAST_INSERT_ID()` }).from(schemaModel).orderBy(desc(schemaModel.id)).limit(1))[0].id;
        return (await db2.select().from(schemaModel).where(eq(schemaModel.id, tId)).limit(1).execute())[0];
      } else if (data.id) return (await db2.select().from(schemaModel).where(eq(schemaModel.id, data.id)).limit(1).execute())[0];
      else {
        if (!("id" in schemaModel)) throw new BetterAuthError(`The model "${model}" does not have an "id" field. Please use the "id" field as your primary key.`);
        return (await db2.select().from(schemaModel).orderBy(desc(schemaModel.id)).limit(1).execute())[0];
      }
    };
    function convertWhereClause(where, model) {
      const schemaModel = getSchema(model);
      if (!where) return [];
      if (where.length === 1) {
        const w = where[0];
        if (!w) return [];
        const field = getFieldName({
          model,
          field: w.field
        });
        if (!schemaModel[field]) throw new BetterAuthError(`The field "${w.field}" does not exist in the schema for the model "${model}". Please update your schema.`);
        if (w.operator === "in") {
          if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "in" operator.`);
          return [inArray(schemaModel[field], w.value)];
        }
        if (w.operator === "not_in") {
          if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "not_in" operator.`);
          return [notInArray(schemaModel[field], w.value)];
        }
        if (w.operator === "contains") return [like(schemaModel[field], `%${w.value}%`)];
        if (w.operator === "starts_with") return [like(schemaModel[field], `${w.value}%`)];
        if (w.operator === "ends_with") return [like(schemaModel[field], `%${w.value}`)];
        if (w.operator === "lt") return [lt(schemaModel[field], w.value)];
        if (w.operator === "lte") return [lte(schemaModel[field], w.value)];
        if (w.operator === "ne") return [ne(schemaModel[field], w.value)];
        if (w.operator === "gt") return [gt(schemaModel[field], w.value)];
        if (w.operator === "gte") return [gte(schemaModel[field], w.value)];
        return [eq(schemaModel[field], w.value)];
      }
      const andGroup = where.filter((w) => w.connector === "AND" || !w.connector);
      const orGroup = where.filter((w) => w.connector === "OR");
      const andClause = and(...andGroup.map((w) => {
        const field = getFieldName({
          model,
          field: w.field
        });
        if (w.operator === "in") {
          if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "in" operator.`);
          return inArray(schemaModel[field], w.value);
        }
        if (w.operator === "not_in") {
          if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "not_in" operator.`);
          return notInArray(schemaModel[field], w.value);
        }
        if (w.operator === "contains") return like(schemaModel[field], `%${w.value}%`);
        if (w.operator === "starts_with") return like(schemaModel[field], `${w.value}%`);
        if (w.operator === "ends_with") return like(schemaModel[field], `%${w.value}`);
        if (w.operator === "lt") return lt(schemaModel[field], w.value);
        if (w.operator === "lte") return lte(schemaModel[field], w.value);
        if (w.operator === "gt") return gt(schemaModel[field], w.value);
        if (w.operator === "gte") return gte(schemaModel[field], w.value);
        if (w.operator === "ne") return ne(schemaModel[field], w.value);
        return eq(schemaModel[field], w.value);
      }));
      const orClause = or(...orGroup.map((w) => {
        const field = getFieldName({
          model,
          field: w.field
        });
        if (w.operator === "in") {
          if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "in" operator.`);
          return inArray(schemaModel[field], w.value);
        }
        if (w.operator === "not_in") {
          if (!Array.isArray(w.value)) throw new BetterAuthError(`The value for the field "${w.field}" must be an array when using the "not_in" operator.`);
          return notInArray(schemaModel[field], w.value);
        }
        if (w.operator === "contains") return like(schemaModel[field], `%${w.value}%`);
        if (w.operator === "starts_with") return like(schemaModel[field], `${w.value}%`);
        if (w.operator === "ends_with") return like(schemaModel[field], `%${w.value}`);
        if (w.operator === "lt") return lt(schemaModel[field], w.value);
        if (w.operator === "lte") return lte(schemaModel[field], w.value);
        if (w.operator === "gt") return gt(schemaModel[field], w.value);
        if (w.operator === "gte") return gte(schemaModel[field], w.value);
        if (w.operator === "ne") return ne(schemaModel[field], w.value);
        return eq(schemaModel[field], w.value);
      }));
      const clause = [];
      if (andGroup.length) clause.push(andClause);
      if (orGroup.length) clause.push(orClause);
      return clause;
    }
    function checkMissingFields(schema, model, values) {
      if (!schema) throw new BetterAuthError("Drizzle adapter failed to initialize. Drizzle Schema not found. Please provide a schema object in the adapter options object.");
      for (const key in values) {
        let fieldName;
        try {
          fieldName = getFieldName({
            model,
            field: key
          });
        } catch {
          fieldName = key;
        }
        if (!schema[fieldName]) throw new BetterAuthError(`The field "${key}" does not exist in the "${model}" Drizzle schema. Please update your drizzle schema or re-generate using "npx auth@latest generate".`);
      }
    }
    function getQueryModel(model) {
      if (db2.query[model]) return model;
      if (config.usePlural) {
        const plural = `${model}s`;
        if (db2.query[plural]) return plural;
      }
      if (config.schema) {
        const targetTable = config.schema[model];
        if (targetTable) {
          const fullSchema = db2._.fullSchema;
          if (fullSchema) {
            for (const key of Object.keys(db2.query)) if (fullSchema[key] === targetTable) return key;
          }
        }
      }
      return null;
    }
    return {
      async create({ model, data: values }) {
        const schemaModel = getSchema(model);
        checkMissingFields(schemaModel, model, values);
        return await withReturning(model, db2.insert(schemaModel).values(values), values);
      },
      async findOne({ model, where, select, join }) {
        const schemaModel = getSchema(model);
        const clause = convertWhereClause(where, model);
        if (options.experimental?.joins) {
          const queryModel = getQueryModel(model);
          if (!db2.query || !queryModel) {
            logger.error(`[# Drizzle Adapter]: The model "${model}" was not found in the query object. Please update your Drizzle schema to include relations or re-generate using "npx auth@latest generate".`);
            logger.info("Falling back to regular query");
          } else {
            let includes;
            const pluralJoinResults = [];
            if (join) {
              includes = {};
              const joinEntries = Object.entries(join);
              for (const [model2, joinAttr] of joinEntries) {
                const limit = joinAttr.limit ?? options.advanced?.database?.defaultFindManyLimit ?? 100;
                const isUnique = joinAttr.relation === "one-to-one";
                const pluralSuffix = isUnique || config.usePlural ? "" : "s";
                includes[`${model2}${pluralSuffix}`] = isUnique ? true : { limit };
                if (!isUnique) pluralJoinResults.push(`${model2}${pluralSuffix}`);
              }
            }
            const res2 = await db2.query[queryModel].findFirst({
              where: clause[0],
              columns: select?.length && select.length > 0 ? select.reduce((acc, field) => {
                acc[getFieldName({
                  model,
                  field
                })] = true;
                return acc;
              }, {}) : void 0,
              with: includes
            });
            if (res2) for (const pluralJoinResult of pluralJoinResults) {
              const singularKey = !config.usePlural ? pluralJoinResult.slice(0, -1) : pluralJoinResult;
              res2[singularKey] = res2[pluralJoinResult];
              if (pluralJoinResult !== singularKey) delete res2[pluralJoinResult];
            }
            return res2;
          }
        }
        const res = await db2.select(select?.length && select.length > 0 ? select.reduce((acc, field) => {
          const fieldName = getFieldName({
            model,
            field
          });
          return {
            ...acc,
            [fieldName]: schemaModel[fieldName]
          };
        }, {}) : void 0).from(schemaModel).where(...clause);
        if (!res.length) return null;
        return res[0];
      },
      async findMany({ model, where, sortBy, limit, select, offset, join }) {
        const schemaModel = getSchema(model);
        const clause = where ? convertWhereClause(where, model) : [];
        const sortFn = sortBy?.direction === "desc" ? desc : asc;
        if (options.experimental?.joins) {
          const queryModel = getQueryModel(model);
          if (!queryModel) {
            logger.error(`[# Drizzle Adapter]: The model "${model}" was not found in the query object. Please update your Drizzle schema to include relations or re-generate using "npx auth@latest generate".`);
            logger.info("Falling back to regular query");
          } else {
            let includes;
            const pluralJoinResults = [];
            if (join) {
              includes = {};
              const joinEntries = Object.entries(join);
              for (const [model2, joinAttr] of joinEntries) {
                const isUnique = joinAttr.relation === "one-to-one";
                const limit2 = joinAttr.limit ?? options.advanced?.database?.defaultFindManyLimit ?? 100;
                const pluralSuffix = isUnique || config.usePlural ? "" : "s";
                includes[`${model2}${pluralSuffix}`] = isUnique ? true : { limit: limit2 };
                if (!isUnique) pluralJoinResults.push(`${model2}${pluralSuffix}`);
              }
            }
            let orderBy = void 0;
            if (sortBy?.field) orderBy = [sortFn(schemaModel[getFieldName({
              model,
              field: sortBy?.field
            })])];
            const res = await db2.query[queryModel].findMany({
              where: clause[0],
              with: includes,
              columns: select?.length && select.length > 0 ? select.reduce((acc, field) => {
                acc[getFieldName({
                  model,
                  field
                })] = true;
                return acc;
              }, {}) : void 0,
              limit: limit ?? 100,
              offset: offset ?? 0,
              orderBy
            });
            if (res) for (const item of res) for (const pluralJoinResult of pluralJoinResults) {
              const singularKey = !config.usePlural ? pluralJoinResult.slice(0, -1) : pluralJoinResult;
              if (singularKey === pluralJoinResult) continue;
              item[singularKey] = item[pluralJoinResult];
              delete item[pluralJoinResult];
            }
            return res;
          }
        }
        let builder = db2.select(select?.length && select.length > 0 ? select.reduce((acc, field) => {
          const fieldName = getFieldName({
            model,
            field
          });
          return {
            ...acc,
            [fieldName]: schemaModel[fieldName]
          };
        }, {}) : void 0).from(schemaModel);
        const effectiveLimit = limit;
        const effectiveOffset = offset;
        if (typeof effectiveLimit !== "undefined") builder = builder.limit(effectiveLimit);
        if (typeof effectiveOffset !== "undefined") builder = builder.offset(effectiveOffset);
        if (sortBy?.field) builder = builder.orderBy(sortFn(schemaModel[getFieldName({
          model,
          field: sortBy?.field
        })]));
        return await builder.where(...clause);
      },
      async count({ model, where }) {
        const schemaModel = getSchema(model);
        const clause = where ? convertWhereClause(where, model) : [];
        return (await db2.select({ count: count() }).from(schemaModel).where(...clause))[0].count;
      },
      async update({ model, where, update: values }) {
        const schemaModel = getSchema(model);
        const clause = convertWhereClause(where, model);
        return await withReturning(model, db2.update(schemaModel).set(values).where(...clause), values, where);
      },
      async updateMany({ model, where, update: values }) {
        const schemaModel = getSchema(model);
        const clause = convertWhereClause(where, model);
        return await db2.update(schemaModel).set(values).where(...clause);
      },
      async delete({ model, where }) {
        const schemaModel = getSchema(model);
        const clause = convertWhereClause(where, model);
        return await db2.delete(schemaModel).where(...clause);
      },
      async deleteMany({ model, where }) {
        const schemaModel = getSchema(model);
        const clause = convertWhereClause(where, model);
        const res = await db2.delete(schemaModel).where(...clause);
        let count2 = 0;
        if (res && "rowCount" in res) count2 = res.rowCount;
        else if (Array.isArray(res)) count2 = res.length;
        else if (res && ("affectedRows" in res || "rowsAffected" in res || "changes" in res)) count2 = res.affectedRows ?? res.rowsAffected ?? res.changes;
        if (typeof count2 !== "number") logger.error("[Drizzle Adapter] The result of the deleteMany operation is not a number. This is likely a bug in the adapter. Please report this issue to the Better Auth team.", {
          res,
          model,
          where
        });
        return count2;
      },
      options: config
    };
  };
  let adapterOptions = null;
  adapterOptions = {
    config: {
      adapterId: "drizzle",
      adapterName: "Drizzle Adapter",
      usePlural: config.usePlural ?? false,
      debugLogs: config.debugLogs ?? false,
      supportsUUIDs: config.provider === "pg" ? true : false,
      supportsJSON: config.provider === "pg" ? true : false,
      supportsArrays: config.provider === "pg" ? true : false,
      customTransformOutput: ({ data, fieldAttributes }) => {
        if (fieldAttributes.type === "date") {
          if (data === null || data === void 0) return data;
          return new Date(data);
        }
        return data;
      },
      transaction: config.transaction ?? false ? (cb) => db.transaction((tx) => {
        return cb(createAdapterFactory({
          config: adapterOptions.config,
          adapter: createCustomAdapter(tx)
        })(lazyOptions));
      }) : false
    },
    adapter: createCustomAdapter(db)
  };
  const adapter = createAdapterFactory(adapterOptions);
  return (options) => {
    lazyOptions = options;
    return adapter(options);
  };
};
export {
  drizzleAdapter as d
};
