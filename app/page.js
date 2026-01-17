"use client";

import Link from "next/link";
import ColorBends from "@/components/ColorBends";

export default function Page() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <ColorBends
          autoRotate={2}
          frequency={1}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg mb-6">
          Welcome to Vega AI
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-8">
          Unleash your creativity with AI-powered image generation. Explore, create, and transform ideas into stunning visuals instantly.
        </p>
        <Link href="/create">
          <button className="px-8 py-4 bg-white text-black font-semibold rounded-xl shadow-lg hover:bg-gray-200 transition">
            Start Creating
          </button>
        </Link>
      </div>
    </div>
  );
}