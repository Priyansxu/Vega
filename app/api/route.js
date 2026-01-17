export async function POST(request) {
  try {
    const { prompt } = await request.json()

    if (!prompt || typeof prompt !== "string") {
      return Response.json({ error: "Invalid prompt" }, { status: 400 })
    }

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
    const apiToken = process.env.CLOUDFLARE_API_TOKEN

    if (!accountId || !apiToken) {
      console.error("Missing Cloudflare credentials")
      return Response.json({ error: "Server configuration error" }, { status: 500 })
    }

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    )

    if (!response.ok) {
      const text = await response.text()
      console.error("Cloudflare API error:", response.status, text)
      try {
        const data = JSON.parse(text)
        return Response.json(
          { error: data?.errors?.[0] || `API Error: ${response.statusText}` },
          { status: response.status }
        )
      } catch {
        return Response.json({ error: "API Error: " + response.statusText }, { status: response.status })
      }
    }

    const arrayBuffer = await response.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString("base64")
    const base64Image = `data:image/png;base64,${base64}`

    return Response.json({ image: base64Image })
  } catch (error) {
    console.error("Generation error:", error)
    const errorMessage = error instanceof Error ? error.message : "Failed to generate image"
    return Response.json({ error: errorMessage }, { status: 500 })
  }
}
