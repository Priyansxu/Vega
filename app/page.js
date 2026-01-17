"use client"

import Link from "next/link"
import ColorBends from "@/components/ColorBends"

export default function Page() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 -z-10">
        <ColorBends autoRotate={2} frequency={1} />
      </div>

      <header className="sticky top-4 mx-4 sm:mx-6 lg:mx-8 z-20 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-white">Vega AI</h1>
        </div>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8 sm:py-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg mb-6 sm:mb-8 leading-tight">
            Unleash Your Creativity
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed">
            Explore, create, and transform your ideas into stunning visuals instantly with our AI-powered image
            generation engine.
          </p>

          <Link href="/create">
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-lg sm:rounded-xl shadow-lg hover:bg-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105 active:scale-95">
              Start Creating
            </button>
          </Link>
        </div>
      </main>
    </div>
  )
}