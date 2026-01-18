"use client"

import { useState, useRef } from "react"
import { RiAiGenerate } from "react-icons/ri"
import { IoSparkles } from "react-icons/io5"
import { FaHeart } from "react-icons/fa"
import { Download, RotateCcw, Loader, ArrowUpRight } from "lucide-react"

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
    <div className="min-h-screen bg-black/90 flex flex-col items-center px-4 py-8">
      <h1 className="mb-6 text-xl font-bold text-neutral-200">
        VEGA AI
      </h1>

      <div
        className="w-full max-w-3xl aspect-square rounded-lg overflow-hidden
        flex items-center justify-center"
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
          className="w-full resize-none px-3 py-2 rounded-lg
          bg-black/60 border border-neutral-800
          text-neutral-100 text-sm font-mono
          placeholder:text-neutral-600
          focus:outline-none focus:ring-2 focus:ring-neutral-700
          hover:border-white/40 transition"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2
          px-4 py-2 rounded-lg
          bg-white text-black font-semibold
          disabled:opacity-50 transition"
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
      </form>

      {image && (
        <div
          className="mt-4 w-full max-w-3xl flex divide-x divide-neutral-800
          rounded-lg overflow-hidden
          bg-black/60 border border-neutral-800"
        >
          <IconButton onClick={downloadImage} icon={Download} />
          <IconButton onClick={generateImage} icon={RotateCcw} />
        </div>
      )}

      {error && (
        <div
          className="mt-4 max-w-3xl w-full
          rounded-lg border border-red-800 bg-red-900/30
          px-3 py-2 text-xs font-mono text-red-300"
        >
          Error: {error}
        </div>
      )}

      <footer className="m-6 text-sm text-neutral-400 flex items-center justify-center gap-2">
  <a
    href="https://priyanshu.is-a.dev"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-1 hover:text-neutral-200 transition"
  >
    Made with
     <FaHeart className="text-red-500" />
    by Priyanshu
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
      className="flex-1 flex items-center justify-center py-2
      text-neutral-300 hover:bg-neutral-900 transition"
    >
      <Icon className="w-4 h-4" />
    </button>
  )
}