"use client"

import { useState, useRef } from "react"
import { Download, Zap, Loader, RotateCcw, X } from "lucide-react"

export default function CreatePage() {
  const [prompt, setPrompt] = useState("")
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const imageRef = useRef(null)

  const generateImage = async (e) => {
    e.preventDefault()

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

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate image")
      }

      const data = await response.json()
      setImage(data.image)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const downloadImage = async () => {
    if (!image) return

    try {
      const response = await fetch(image)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = `vega-ai-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()

      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch {
      setError("Failed to download image")
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 flex flex-col gap-8 p-6 md:p-8 max-w-6xl mx-auto w-full">
        {/* Image Display */}
        <div className="w-full flex items-center justify-center">
          <div className="w-full max-w-2xl aspect-square bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-xl overflow-hidden flex items-center justify-center">
            {image ? (
              <img
                ref={imageRef}
                src={image}
                alt="Generated"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center space-y-4 px-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-neutral-800 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-neutral-400" />
                </div>
                <p className="text-neutral-400 text-lg">
                  {loading
                    ? "Generating your masterpiece..."
                    : "Your image will appear here"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="w-full max-w-2xl mx-auto">
          <form onSubmit={generateImage} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="prompt"
                className="text-sm font-medium text-neutral-300 block"
              >
                Describe your vision
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A serene mountain landscape with aurora borealis..."
                className="w-full h-28 px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-950/50 border border-red-900/50 rounded-lg text-red-300 text-sm flex gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-black rounded-lg font-semibold hover:bg-neutral-100 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Generate
                </>
              )}
            </button>
          </form>

          {image && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              <button
                onClick={downloadImage}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </button>

              <button
                onClick={() => {
                  setImage(null)
                  setPrompt("")
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Regenerate</span>
              </button>

              <button
                onClick={() => setImage(null)}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg"
              >
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}