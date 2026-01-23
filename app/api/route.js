export async function POST(request) {
  try {
    const { prompt, model = "flux", width = 1024, height = 1024, steps = 25 } = await request.json()

    if (!prompt || typeof prompt !== "string") {
      return Response.json({ error: "Invalid prompt" }, { status: 400 })
    }

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
    const apiToken = process.env.CLOUDFLARE_API_TOKEN

    if (!accountId || !apiToken) {
      return Response.json({ error: "Server configuration error" }, { status: 500 })
    }

    if (model === "sdxl") {
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

      const buffer = await response.arrayBuffer()
      const base64 = Buffer.from(buffer).toString("base64")
      return Response.json({ image: `data:image/png;base64,${base64}` })
    }

    if (model === "flux") {
      const formData = new FormData()
      formData.append("prompt", prompt)
      formData.append("width", width.toString())
      formData.append("height", height.toString())
      formData.append("steps", steps.toString())

      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/black-forest-labs/flux-2-klein-4b`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${apiToken}` },
          body: formData,
        }
      )

      const data = await response.json()
      return Response.json({ image: `data:image/png;base64,${data.result.image}` })
    }

    if (model === "phoenix") {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/leonardo/phoenix-1.0`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
            width,
            height,
            steps,
            guidance: 7.5,
          }),
        }
      )

      const contentType = response.headers.get("content-type")

      if (contentType?.includes("application/json")) {
        const data = await response.json()
        const image =
          data?.result?.image ||
          data?.result?.images?.[0]?.image

        if (!image) {
          return Response.json({ error: "Invalid Phoenix response" }, { status: 500 })
        }

        return Response.json({ image: `data:image/png;base64,${image}` })
      }

      const buffer = await response.arrayBuffer()
      const base64 = Buffer.from(buffer).toString("base64")
      return Response.json({ image: `data:image/png;base64,${base64}` })
    }

    return Response.json({ error: "Invalid model" }, { status: 400 })
  } catch (err) {
    return Response.json({ error: "Generation failed" }, { status: 500 })
  }
}