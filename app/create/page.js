"use client"

import { useState, useRef } from "react"
import { RiAiGenerate } from "react-icons/ri"
import { IoSparkles } from "react-icons/io5"
import { FaHeart } from "react-icons/fa"
import { Download, RotateCcw, Loader, ArrowUpRight, Settings, Cpu, X } from "lucide-react"

export default function CreatePage() {
  const [prompt, setPrompt] = useState("")
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [model, setModel] = useState("flux")
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [showModelPicker, setShowModelPicker] = useState(false)

  const [width, setWidth] = useState(1024)
  const [height, setHeight] = useState(1024)
  const [steps, setSteps] = useState(25)
  
  const imageRef = useRef(null)

  const generateImage = async (e) => {
    e?.preventDefault()
    if (loading) return
    if (!prompt.trim()) {
      setError("Please enter a prompt")
      return
    }

    setLoading(true)
    setError("")

    try {
      const body = model === "flux" 
        ? { prompt, model, width, height, steps }
        : { prompt, model }

      const response = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Generation failed")
      }

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
    a.download = `vega-ai-${model}-${Date.now()}.png`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-black/90 flex flex-col items-center px-4 py-8">
      <h1 className="mb-6 text-xl font-bold text-neutral-200">
       SERON AI
      </h1>

      <div
        className="w-full max-w-3xl aspect-square rounded-lg overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: "#111111" }}
      >
        {image ? (
          <img
            ref={imageRef}
            src={image}
            alt="Generated"
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <div className="text-center space-y-3 font-mono">
            <div className="w-12 h-12 mx-auto rounded-full bg-neutral-900 flex items-center justify-center">
              <IoSparkles className="w-5 h-5 text-neutral-300" />
            </div>
            <p className="text-neutral-500 text-xs">
              {loading ? "Generating image..." : "Your image will appear here"}
            </p>
          </div>
        )}
      </div>

      <form
        onSubmit={generateImage}
        className="w-full max-w-3xl mt-6 space-y-3"
      >
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A futuristic city floating above clouds..."
          rows={3}
          className="w-full resize-none px-3 py-2 rounded-lg bg-black/60 border border-neutral-800 text-neutral-100 text-sm font-mono placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-700 hover:border-white/40 transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white text-black font-medium disabled:opacity-50 transition hover:bg-neutral-200"
        >
          {loading ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Generating
            </>
          ) : (
            <>
              <RiAiGenerate className="w-4 h-4" />
              Generate
            </>
          )}
        </button>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setShowModelPicker(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-black/60 border border-neutral-800 text-neutral-300 text-sm font-medium hover:bg-neutral-900 transition"
          >
            <Cpu className="w-4 h-4" />
            {model === "sdxl" ? "SDXL" : "FLUX.2 [Klein]"}
          </button>
          
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-black/60 border border-neutral-800 text-neutral-300 text-sm font-medium hover:bg-neutral-900 transition"
          >
            <Settings className="w-4 h-4" />
            Advanced
          </button>
        </div>

        {showAdvanced && model === "flux" && (
          <div className="p-4 rounded-lg bg-black/60 border border-neutral-800 space-y-4">
            <div className="space-y-2">
              <label className="text-neutral-300 text-xs font-mono flex justify-between">
                <span>Width: {width}px</span>
              </label>
              <input
                type="range"
                min="512"
                max="2048"
                step="64"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full accent-white"
                style={{
                  background: `linear-gradient(to right, white 0%, white ${((width - 512) / (2048 - 512)) * 100}%, #404040 ${((width - 512) / (2048 - 512)) * 100}%, #404040 100%)`
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-neutral-300 text-xs font-mono flex justify-between">
                <span>Height: {height}px</span>
              </label>
              <input
                type="range"
                min="512"
                max="2048"
                step="64"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full accent-white"
                style={{
                  background: `linear-gradient(to right, white 0%, white ${((height - 512) / (2048 - 512)) * 100}%, #404040 ${((height - 512) / (2048 - 512)) * 100}%, #404040 100%)`
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-neutral-300 text-xs font-mono flex justify-between">
                <span>Steps: {steps}</span>
              </label>
              <input
                type="range"
                min="10"
                max="50"
                step="1"
                value={steps}
                onChange={(e) => setSteps(Number(e.target.value))}
                className="w-full accent-white"
                style={{
                  background: `linear-gradient(to right, white 0%, white ${((steps - 10) / (50 - 10)) * 100}%, #404040 ${((steps - 10) / (50 - 10)) * 100}%, #404040 100%)`
                }}
              />
            </div>
          </div>
        )}

        {showAdvanced && model === "sdxl" && (
          <div className="p-4 rounded-lg bg-black/60 border border-neutral-800">
            <p className="text-neutral-400 text-xs font-mono text-center">
              SDXL uses default settings (1024x1024)
            </p>
          </div>
        )}
      </form>

      {image && (
        <div className="mt-4 w-full max-w-3xl flex divide-x divide-neutral-800 rounded-lg overflow-hidden bg-black/60 border border-neutral-800">
          <IconButton onClick={downloadImage} icon={Download} />
          <IconButton onClick={generateImage} icon={RotateCcw} />
        </div>
      )}

      {error && (
        <div className="mt-4 max-w-3xl w-full rounded-lg border border-red-800 bg-red-900/30 px-3 py-2 text-xs font-mono text-red-300">
          Error: {error}
        </div>
      )}

      {showModelPicker && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-neutral-200 font-bold text-lg">Select Model</h2>
              <button
                onClick={() => setShowModelPicker(false)}
                className="text-neutral-400 hover:text-neutral-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setModel("sdxl")
                  setShowModelPicker(false)
                }}
                className={`w-full p-4 rounded-lg border-2 transition ${
                  model === "sdxl"
                    ? "border-white bg-white/10"
                    : "border-neutral-800 hover:border-neutral-700"
                }`}
              >
                <div className="text-left">
                  <h3 className="text-neutral-200 font-bold">SDXL</h3>
                  <p className="text-neutral-400 text-xs mt-1 font-mono">
                    Stable Diffusion XL - Fast, reliable image generation
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setModel("flux")
                  setShowModelPicker(false)
                }}
                className={`w-full p-4 rounded-lg border-2 transition ${
                  model === "flux"
                    ? "border-white bg-white/10"
                    : "border-neutral-800 hover:border-neutral-700"
                }`}
              >
                <div className="text-left">
                  <h3 className="text-neutral-200 font-bold">FLUX.2 [Klein]</h3>
                  <p className="text-neutral-400 text-xs mt-1 font-mono">
                    Advanced model with customizable dimensions and steps
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
        <footer className="fixed bottom-1 text-sm text-neutral-400 flex items-center justify-center gap-2">
        <a
          href="https://priyanshu.is-a.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-neutral-200 transition"
        >
          Made with <FaHeart className="text-red-500" /> by Priyanshu
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </footer>
    </div>
  )
}

function IconButton({ onClick, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex items-center justify-center py-2 text-neutral-300 hover:bg-neutral-900 transition"
    >
      <Icon className="w-4 h-4" />
    </button>
  )
}
