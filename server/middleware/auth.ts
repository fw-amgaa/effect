import {
  defineEventHandler,
  getRequestURL,
  getRequestHeaders,
  getMethod,
  readRawBody,
  setResponseHeaders,
  setResponseStatus,
} from "h3"
import { auth } from "../../src/lib/auth"

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  if (url.pathname.startsWith("/api/auth")) {
    const method = getMethod(event)
    const headers = getRequestHeaders(event)
    const body = method !== "GET" && method !== "HEAD"
      ? await readRawBody(event)
      : undefined

    const request = new Request(url.href, {
      method,
      headers,
      body: body || undefined,
    })

    const response = await auth.handler(request)

    setResponseStatus(event, response.status)
    const responseHeaders: Record<string, string> = {}
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value
    })
    setResponseHeaders(event, responseHeaders)

    return response.text()
  }
})
