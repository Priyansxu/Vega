"use client"

import { useState, useRef } from "react"
import {
  RiAiGenerate,
  RiDownload2Line,
  RiRestartLine,
  RiCloseLine,
  RiSparklingLine,
} from "react-icons/ri"
import ColorBends from "@/components/ColorBends"

export default function CreatePage() {
  const [prompt, setPrompt] = useState("")
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const imageRef = useRef(null)

  const generateImage = async (e) => {
    e?.preventDefault()
    if (!prompt.trim()) {
      setError("Please enter a prompt")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })

      const text = await response.text()
      if (!text) throw new Error("Empty response")

      const data = JSON.parse(text)
      if (!response.ok) throw new Error(data.error || "Generation failed")

      setImage(data.image)
    } catch (err) {
      setError(err?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const downloadImage = async () => {
    if (!image) return
    const res = await fetch(image)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `vega-ai-${Date.now()}.png`
    a.click()

    URL.revokeObjectURL(url)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 -z-10">
        <ColorBends rotation={-10} frequency={1} />
        <div className="absolute inset-0 bg-black/90" />
      </div>

      <main className="relative z-10 flex flex-col items-center px-4 py-10 sm:py-14">
        <div className="w-full max-w-5xl space-y-10">

          <div
            className="w-full aspect-square max-w-3xl mx-auto rounded-2xl overflow-hidden
            backdrop-blur-xl flex items-center justify-center"
            style={{ backgroundColor: "#111111" }}
          >
            {image ? (
              <img
                ref={imageRef}
                src={image}
                alt="Generated"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center space-y-3 px-6 font-mono">
                <div className="w-14 h-14 mx-auto rounded-full bg-neutral-900 flex items-center justify-center">
                  <RiSparklingLine className="w-6 h-6 text-neutral-300" />
                </div>
                <p className="text-neutral-400 text-sm">
                  {loading
                    ? "Generating image..."
                    : "Generated image will appear here"}
                </p>
              </div>
            )}
          </div>

          <form
            onSubmit={generateImage}
            className="max-w-3xl mx-auto space-y-4 backdrop-blur-xl
            bg-black/60 border border-neutral-800 rounded-2xl p-6 shadow-xl"
          >
            <div className="space-y-2">
              <label className="text-xs font-mono text-neutral-400">
                Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A futuristic city floating above clouds..."
                className="w-full h-18 px-4 py-3 rounded-lg
                bg-black/70 border border-neutral-800 text-neutral-100 font-mono text-sm
                placeholder:text-neutral-600 focus:outline-none
                focus:ring-2 focus:ring-neutral-700 resize-none"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-900/30 border border-red-800 text-red-300 text-xs font-mono">
                Error: {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2
              px-6 py-3 rounded-lg font-semibold
              bg-white text-black hover:bg-neutral-100
              disabled:opacity-50 transition"
            >
              {loading ? (
                <>
                  <RiAiGenerate className="w-4 h-4 animate-pulse" />
                  Generating
                </>
              ) : (
                <>
                  <RiAiGenerate className="w-4 h-4" />
                  Generate
                </>
              )}
            </button>
          </form>

          {image && (
            <div
              className="max-w-3xl mx-auto flex divide-x divide-neutral-800
              rounded-xl overflow-hidden backdrop-blur-lg
              bg-black/60 border border-neutral-800 shadow-lg"
            >
              <ActionButton onClick={downloadImage} icon={RiDownload2Line} label="Download" />
              <ActionButton onClick={generateImage} icon={RiRestartLine} label="Regenerate" />
              <ActionButton onClick={() => setImage(null)} icon={RiCloseLine} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function ActionButton({ onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex items-center justify-center gap-2 px-4 py-3
      text-neutral-300 font-mono text-sm hover:bg-neutral-900 transition"
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  )
}