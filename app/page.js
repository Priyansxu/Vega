"use client"

import Link from "next/link"
import { Zap, ArrowRight } from "lucide-react"
import ColorBends from "@/components/ColorBends"

export default function Page() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* SVG Filter Definition for Inner Shadow */}
      <svg className="absolute w-0 h-0">
        <filter id="inner-glow">
          <feOffset dx="0" dy="2" />
          <feGaussianBlur stdDeviation="3" result="offset-blur" />
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
          <feFlood floodColor="white" floodOpacity="0.9" result="color" />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComposite operator="over" in="shadow" in2="SourceGraphic" />
        </filter>
      </svg>

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
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

          <button className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white/90 text-sm font-medium rounded-xl shadow-md hover:bg-white/25 transition-all duration-300">
            <Zap className="w-4 h-4" />
            <span>Powered by Cloudflare</span>
            <ArrowRight className="w-4 h-4 opacity-80" />
          </button>

          {/* ACME STYLE HEADLINE:
            1. text-[#d1d5db]/30: Light gray with transparency for the glass look.
            2. [-webkit-text-stroke:2px_white]: Sharp white border.
            3. [filter:url(#inner-glow)]: Applies the SVG inner shadow.
          */}
          <h2 
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight tracking-tight
            text-gray-300/40 
            [-webkit-text-stroke:1.5px_rgba(255,255,255,0.8)]
            [filter:url(#inner-glow)]"
          >
            Unleashed, Vega AI
          </h2>

          <p className="font-bold sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed">
            Transform your ideas into stunning visuals instantly with our AI-powered image
            generation engine.
          </p>

          <div className="w-full flex justify-center">
            <Link href="/create">
              <button className="px-10 py-4 border border-white bg-[#dedfe1] text-black rounded-md font-mono transition-all duration-300 hover:bg-[#bcbbfb] transform hover:scale-105 active:scale-95 shadow-xl">
                Start Creating
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
