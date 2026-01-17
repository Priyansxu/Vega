"use client"

import Link from "next/link"
import { Zap, ArrowRight } from "lucide-react"
import ColorBends from "@/components/ColorBends"

export default function Page() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <ColorBends autoRotate={1} frequency={1} />
      </div>

      <header className="sticky top-4 mx-4 sm:mx-6 lg:mx-8 z-20 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-3xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-white">
            Vega AI
          </h1>
        </div>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8 sm:py-12">
        <div className="text-center max-w-3xl mx-auto">

          <button className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white/90 text-sm font-medium rounded-xl shadow-md hover:bg-white/25 hover:border-white/40 transition-all duration-300">
            <Zap className="w-4 h-4" />
            <span>Powered by Cloudflare</span>
            <ArrowRight className="w-4 h-4 opacity-80" />
          </button>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg mb-6 sm:mb-8 leading-tight">
            Unleashed, Vega AI
          </h2>

          <p className="font-bold sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed">
            Transform your ideas into stunning visuals instantly with our AI-powered image
            generation engine.
          </p>

          <Link href="/create">
            <button className="block text-center border border-white bg-[#dedfe1] text-black rounded-md mt-6 py-3 px-6 font-mono transition-colors duration-300 hover:bg-[#bcbbfb] duration-300 transform hover:scale-105 active:scale-95">
              Start Creating
            </button>
          </Link>
        </div>
      </main>
    </div>
  )
}