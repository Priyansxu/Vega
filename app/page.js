"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BiSolidZap } from "react-icons/bi"
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs"
import ColorBends from "@/components/ColorBends"

export default function Page() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <ColorBends rotation={-10} frequency={1} />
      </div>

      <header className="sticky top-4 mx-4 sm:mx-6 lg:mx-8 z-20 backdrop-blur-md bg-black/10 border border-white/10 shadow-lg rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            SERON AI
          </h1>

          <div className="flex items-center gap-4">
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              />
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-sm font-medium text-white hover:text-neutral-300 transition">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8 sm:py-12">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <button className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-sm border border-white/15 text-white/90 text-sm font-medium rounded-xl shadow-md hover:bg-white/10 transition-all duration-300">
            <BiSolidZap className="w-4 h-4" />
            <span>Powered by Cloudflare</span>
            <ArrowRight className="w-4 h-4 opacity-80" />
          </button>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-mona font-bold mb-8 leading-tight bg-gradient-to-b from-black via-gray-200 to-gray-300 bg-clip-text text-transparent">
            Seamless. Seron AI
          </h2>

          <p className="font-medium sm:text-lg md:text-xl text-black/90 max-w-2xl mx-auto mb-12 leading-relaxed">
            Transform your ideas into stunning visuals instantly with our
            AI-powered image generation engine.
          </p>

          <div className="w-full flex justify-center">
            <SignedIn>
              <Link href="/create">
                <button className="px-14 py-4 border border-white/90 bg-[#dedfe1]/90 text-black rounded-md font-bold transition-all duration-300 hover:bg-white/80 transform hover:scale-105 active:scale-95 shadow-xl tracking-widest opacity-90">
                  Start Creating
                </button>
              </Link>
            </SignedIn>

            <SignedOut>
              <SignUpButton mode="modal">
                <button className="px-14 py-4 border border-white/90 bg-[#dedfe1]/90 text-black rounded-md font-bold transition-all duration-300 hover:bg-white/80 transform hover:scale-105 active:scale-95 shadow-xl tracking-widest opacity-90">
                  Get Started
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </main>
    </div>
  )
}