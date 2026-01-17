"use client"

import { useState, useRef } from "react"
import {
  Download,
  Loader,
  RotateCcw,
  X,
  Sparkles,
} from "lucide-react"
import ColorBends from "@/components/ColorBends"
import Header from "@/components/Header"

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
      const response = await fetch("/api/generate", {
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
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <ColorBends rotation={-10} frequency={1} />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <Header />

      <main className="relative z-10 flex flex-col items-center px-4 py-10 sm:py-14">
        <div className="w-full max-w-5xl space-y-10">

          {/* Image Canvas */}
          <div
            className="w-full aspect-square max-w-3xl mx-auto rounded-2xl overflow-hidden
            backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl
            flex items-center justify-center"
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
                <div className="w-14 h-14 mx-auto rounded-full bg-white/15 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white/80" />
                </div>
                <p className="text-white/70 text-sm">
                  {loading
                    ? "Generating image..."
                    : "Generated image will appear here"}
                </p>
              </div>
            )}
          </div>

          {/* Prompt Box */}
          <form
            onSubmit={generateImage}
            className="max-w-3xl mx-auto space-y-3 backdrop-blur-xl
            bg-white/10 border border-white/20 rounded-2xl p-4 shadow-xl"
          >
            <div className="space-y-2">
              <label className="text-xs font-mono text-white/70">
                Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A futuristic city floating above clouds..."
                className="w-full h-18 px-1 py-2 rounded-lg
                bg-white/5 border border-white/20 text-white font-mono text-sm
                placeholder:text-white/40 focus:outline-none
                focus:ring-2 focus:ring-white/30 resize-none"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-red-200 text-xs font-mono">
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
                  <Loader className="w-4 h-4 animate-spin" />
                  Generating
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate
                </>
              )}
            </button>
          </form>

          {/* Action Bar */}
          {image && (
            <div
              className="max-w-3xl mx-auto flex divide-x divide-white/20
              rounded-xl overflow-hidden backdrop-blur-lg
              bg-white/10 border border-white/20 shadow-lg"
            >
              <ActionButton onClick={downloadImage} icon={Download} label="Download" />
              <ActionButton
                onClick={generateImage}
                icon={RotateCcw}
                label="Regenerate"
              />
              <ActionButton onClick={() => setImage(null)} icon={X} label="" />
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
      text-white font-mono text-sm hover:bg-white/20 transition"
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  )
}