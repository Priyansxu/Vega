export async function POST(request) {
  try {
    const { prompt } = await request.json()

    if (!prompt || typeof prompt !== "string") {
      return Response.json({ error: "Invalid prompt" }, { status: 400 })
    }

    const accountId = "b6c89b2786be102a5e4d8704d79f60d3"
    const apiToken = "qAj2Xuw7I688ymCSR6IBKf498ZTDdl32jOyy5RpP"

    if (!accountId || !apiToken) {
      return Response.json({ error: "Server configuration error" }, { status: 500 })
    }

    const res = await fetch(
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

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`)
    }

    // Always treat response as raw bytes
    const arrayBuffer = await res.arrayBuffer()
    const imageBase64 = Buffer.from(arrayBuffer).toString("base64")

    return Response.json({
      image: `data:image/png;base64,${imageBase64}`,
    })
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Failed to generate image" },
      { status: 500 }
    )
  }
}