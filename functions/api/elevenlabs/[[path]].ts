// Cloudflare Pages Function — proxies /api/elevenlabs/* → api.elevenlabs.io
// Keeps the API key server-side so it's never exposed to the browser.

export async function onRequest(context) {
  const { request, env } = context
  const url = new URL(request.url)

  // Reconstruct the target URL
  const apiPath = url.pathname.replace(/^\/api\/elevenlabs/, '')
  const targetUrl = `https://api.elevenlabs.io${apiPath}${url.search}`

  // Forward request with the API key injected
  const headers = new Headers(request.headers)
  headers.set('xi-api-key', env.ELEVENLABS_API_KEY)
  headers.delete('host')

  const body = ['GET', 'HEAD'].includes(request.method)
    ? undefined
    : await request.text()

  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body,
  })

  // Return verbatim — preserves CORS headers from ElevenLabs
  return response
}
