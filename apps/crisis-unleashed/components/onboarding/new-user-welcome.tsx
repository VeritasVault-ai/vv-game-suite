"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
// Import directly from component file instead of barrel file
import LogoVariant from "@/components/logo-system/logo-variant"

interface NewUserWelcomeProps {
  onClose: () => void
}

export function NewUserWelcome({ onClose }: NewUserWelcomeProps) {
  const [step, setStep] = useState(0)

  const steps = [
    {
      title: "Welcome to Crisis Unleashed",
      content: (
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <LogoVariant variant="animated" size="xl" className="mx-auto" />
          </div>
          <p className="mb-4 text-lg text-gray-200">
            Embark on a strategic journey where faction politics, resource management, and tactical card play collide.
          </p>
          <p className="text-gray-300">
            This brief introduction will help you understand the core concepts of the game and get you started on your
            adventure.
          </p>
        </div>
      ),
    },
    {
      title: "Choose Your Faction",
      content: (
        <div>
          <p className="mb-4 text-gray-200">
            Six unique factions vie for control, each with distinct abilities, playstyles, and aesthetics:
          </p>
          <ul className="mb-4 space-y-2 text-gray-300">
            <li>
              <span className="font-semibold text-blue-400">Cybernetic Nexus</span> - Masters of technology and
              efficiency
            </li>
            <li>
              <span className="font-semibold text-purple-400">Void Harbingers</span> - Manipulators of dimensional
              energy
            </li>
            <li>
              <span className="font-semibold text-green-400">Primordial Ascendancy</span> - Wielders of natural forces
            </li>
            <li>
              <span className="font-semibold text-gray-400">Eclipsed Order</span> - Shadow operatives and assassins
            </li>
            <li>
              <span className="font-semibold text-orange-400">Titanborn</span> - Master craftsmen and forgers
            </li>
            <li>
              <span className="font-semibold text-yellow-400">Celestial Dominion</span> - Manipulators of time and
              cosmic forces
            </li>
          </ul>
          <p className="text-gray-300">
            Your choice will influence your playstyle, but you can collect and use cards from any faction.
          </p>
        </div>
      ),
    },
    {
      title: "Core Gameplay",
      content: (
        <div>
          <p className="mb-4 text-gray-200">Crisis Unleashed revolves around three core elements:</p>
          <div className="mb-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-gray-800 p-3">
              <h4 className="mb-2 font-semibold text-blue-400">Resource Management</h4>
              <p className="text-sm text-gray-300">
                Gather and allocate Energy, Materials, and Information to power your strategy.
              </p>
            </div>
            <div className="rounded-lg bg-gray-800 p-3">
              <h4 className="mb-2 font-semibold text-green-400">Card Deployment</h4>
              <p className="text-sm text-gray-300">
                Play Heroes, Artifacts, and Crisis cards to execute your tactical vision.
              </p>
            </div>
            <div className="rounded-lg bg-gray-800 p-3">
              <h4 className="mb-2 font-semibold text-purple-400">Territory Control</h4>
              <p className="text-sm text-gray-300">
                Claim and defend territory zones to gain resource bonuses and strategic advantages.
              </p>
            </div>
          </div>
          <p className="text-gray-300">
            Master these elements while adapting to Crisis Events that can dramatically alter the game state.
          </p>
        </div>
      ),
    },
    {
      title: "Getting Started",
      content: (
        <div>
          <p className="mb-4 text-gray-200">Ready to begin your journey? Here are some next steps:</p>
          <ul className="mb-4 space-y-3 text-gray-300">
            <li className="flex items-start">
              <ChevronRight className="mr-2 h-5 w-5 flex-shrink-0 text-blue-400" />
              <span>
                <span className="font-semibold">Choose a faction</span> that aligns with your preferred playstyle
              </span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="mr-2 h-5 w-5 flex-shrink-0 text-blue-400" />
              <span>
                <span className="font-semibold">Complete the tutorial</span> to learn the basic mechanics
              </span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="mr-2 h-5 w-5 flex-shrink-0 text-blue-400" />
              <span>
                <span className="font-semibold">Build your first deck</span> using the starter cards provided
              </span>
            </li>
            <li className="flex items-start">
              <ChevronRight className="mr-2 h-5 w-5 flex-shrink-0 text-blue-400" />
              <span>
                <span className="font-semibold">Join the community</span> to connect with other players and share
                strategies
              </span>
            </li>
          </ul>
          <p className="text-gray-300">
            Remember, the guided tour is always available if you need help navigating the interface.
          </p>
        </div>
      ),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-2xl rounded-xl bg-gray-900 p-6 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
          aria-label="Close welcome dialog"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <div className="mb-2 flex items-center">
            <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
              {step + 1}
            </div>
            <div className="text-sm text-gray-400">
              Step {step + 1} of {steps.length}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">{steps[step].title}</h2>
        </div>

        <div className="mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {steps[step].content}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setStep((prev) => Math.max(0, prev - 1))}
            disabled={step === 0}
            className="flex items-center"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>

          {step < steps.length - 1 ? (
            <Button onClick={() => setStep((prev) => prev + 1)} className="flex items-center">
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={onClose}>Get Started</Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default NewUserWelcome