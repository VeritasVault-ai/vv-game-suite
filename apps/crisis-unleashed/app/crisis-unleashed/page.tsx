"use client"

import CardTypeShowcase from "@/components/card-type-showcase"
import { CircuitGridVisualization } from "@/components/circuit-grid-visualization"
import DevelopmentProgressVisual from "@/components/development-progress-visual"
import FactionComparisonVisual from "@/components/faction-comparison-visual"
import GameMechanicsDiagram from "@/components/game-mechanics-diagram"
import LogoVariant from "@/components/logo-system/logo-variant"
import { ContextualFAQ } from "@/components/onboarding/contextual-faq"
import { ExpandableSection } from "@/components/onboarding/expandable-section"
import { FeedbackWidget } from "@/components/onboarding/feedback-widget"
import { GlossaryProvider } from "@/components/onboarding/glossary-provider"
import { GuidedTourButton } from "@/components/onboarding/guided-tour-button"
import { NewUserWelcome } from "@/components/onboarding/new-user-welcome"
import { ScrollAnimation } from "@/components/scroll-animation"
import { SharedFooter } from "@/components/shared-footer"
import { SharedNavigation } from "@/components/shared-navigation"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

/**
 * Renders the main landing page for the Crisis Unleashed strategic card game, featuring interactive onboarding, educational sections, and calls to action.
 *
 * The page adapts its layout and content for first-time and returning visitors, displaying a welcome modal and animated background for new users, and a navigation bar for returning users. It includes multiple scroll-animated sections covering gameplay, card types, factions, blockchain-based card ownership, and development roadmap, each with interactive components, contextual FAQs, and feedback widgets.
 *
 * @returns The complete landing page React element for the Crisis Unleashed web application.
 *
 * @remark Uses localStorage to detect first-time visitors and conditionally display onboarding content.
 */
export default function CrisisUnleashedPage() {
  const [isFirstVisit, setIsFirstVisit] = useState(false)
  const [showNewUserWelcome, setShowNewUserWelcome] = useState(false)

  useEffect(() => {
    // Check if this is the user's first visit to Crisis Unleashed
    const hasVisitedCrisisUnleashed = localStorage.getItem("hasVisitedCrisisUnleashed")
    if (!hasVisitedCrisisUnleashed) {
      setIsFirstVisit(true)
      setShowNewUserWelcome(true)
      localStorage.setItem("hasVisitedCrisisUnleashed", "true")
    }
  }, [])

  return (
    <GlossaryProvider>
      <main className="relative min-h-screen overflow-x-hidden">
        {/* Background Elements - Only show circuit visualization for first-time visitors */}
        <div className="fixed inset-0 z-0">
          {isFirstVisit ? (
            <CircuitGridVisualization />
          ) : (
            <div
              className="h-full w-full bg-cover bg-center bg-no-repeat opacity-20"
              style={{ backgroundImage: "url('/landing-page-pattern.png')" }}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Navigation - Only show for returning users */}
        {!isFirstVisit && <SharedNavigation />}

        {/* New User Welcome Modal */}
        <AnimatePresence>
          {showNewUserWelcome && <NewUserWelcome onClose={() => setShowNewUserWelcome(false)} />}
        </AnimatePresence>

        {/* Guided Tour Button - Always visible but more prominent for first-time visitors */}
        <div className="fixed bottom-4 right-4 z-50">
          <GuidedTourButton isFirstVisit={isFirstVisit} />
        </div>

        {/* Hero Section - With new hero background */}
        <section
          className={`relative z-10 flex min-h-screen flex-col items-center justify-center px-4 ${
            !isFirstVisit ? "pt-24" : "py-20"
          } text-center`}
          style={{
            backgroundImage: "url('/hero-background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

          {/* Use our new logo system with animated variant for hero */}
          <div className="mb-6 relative z-10">
            <LogoVariant variant="animated" size="2xl" className="mx-auto" interactive={true} />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-4xl font-bold leading-tight tracking-tighter md:text-6xl relative z-10"
          >
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Strategic Card Game
            </span>{" "}
            <span className="block">with Blockchain Integration</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-10 max-w-3xl text-xl text-gray-200 relative z-10"
          >
            Immerse yourself in a world where strategy, faction politics, and resource management collide in an
            ever-evolving game ecosystem.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 relative z-10"
          >
            <Link
              href="/factions/select"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 p-0.5 text-lg font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 focus-visible:ring-4"
              aria-label="Choose your faction"
            >
              <span className="relative rounded-md bg-gray-900 px-8 py-3.5 transition-all duration-300 ease-out group-hover:bg-opacity-0">
                Choose Your Faction
              </span>
            </Link>

            <Link
              href="/learn/getting-started"
              className="relative inline-flex items-center justify-center rounded-lg border-2 border-blue-400 bg-transparent px-8 py-3 text-lg font-medium text-blue-400 transition-colors hover:bg-blue-400 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 focus-visible:ring-4"
              aria-label="Learn how to play"
            >
              Learn How to Play
            </Link>

            <Link
              href="/designer"
              className="relative inline-flex items-center justify-center rounded-lg border-2 border-gray-400 bg-transparent px-8 py-3 text-lg font-medium text-gray-400 transition-colors hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-500 focus-visible:ring-4"
              aria-label="Design custom cards"
            >
              Design Custom Cards
            </Link>

            <Link
              href="/"
              className="relative inline-flex items-center justify-center rounded-lg border-2 border-gray-400 bg-transparent px-8 py-3 text-lg font-medium text-gray-400 transition-colors hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-500 focus-visible:ring-4"
              aria-label="Back to games"
            >
              Back to Games
            </Link>
          </motion.div>
        </section>

{/* Game Mechanics Section */}
<ScrollAnimation>
  <section className="py-20 px-4 bg-gray-900/80 backdrop-blur-sm">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
          Strategic Gameplay Mechanics
        </span>
      </h2>
      <GameMechanicsDiagram />
      <ContextualFAQ 
        title="Gameplay FAQ"
        questions={[
          {
            question: "How does the turn structure work?",
            answer: "Each turn consists of a Draw Phase, Main Phase, Combat Phase, and End Phase. During your Main Phase, you can play cards from your hand and activate abilities."
          },
          {
            question: "What resources are used to play cards?",
            answer: "Cards require Energy and Influence to play. Energy is generated each turn, while Influence is gained through controlling territories and forming alliances."
          },
          {
            question: "How does the faction system affect gameplay?",
            answer: "Each faction has unique abilities, card synergies, and playstyles. Your faction choice determines your starting deck and available strategies."
          }
        ]} 
      />
    </div>
  </section>
</ScrollAnimation>

        {/* Card Types Section */}
        <ScrollAnimation>
          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Diverse Card Types
                </span>
              </h2>
              <CardTypeShowcase />
              <ExpandableSection title="Learn more about card types">
                <p className="text-gray-300 mb-4">
                  Crisis Unleashed features multiple card types, each with unique gameplay mechanics and strategic value.
                  From Heroes that lead your faction to Artifacts that provide powerful effects, every card type brings
                  new dimensions to your strategy.
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2">
                  <li>Heroes - Powerful faction leaders with unique abilities</li>
                  <li>Units - Core combat and utility cards</li>
                  <li>Tactics - One-time effect cards that can turn the tide of battle</li>
                  <li>Artifacts - Persistent effect cards that provide ongoing benefits</li>
                  <li>Locations - Field cards that affect the entire battlefield</li>
                  <li>Crisis - Game-changing events that affect all players</li>
                </ul>
              </ExpandableSection>
            </div>
          </section>
        </ScrollAnimation>

        {/* Factions Section */}
        <ScrollAnimation>
          <section className="py-20 px-4 bg-gray-900/80 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Competing Factions
                </span>
              </h2>
              <FactionComparisonVisual />
              <div className="mt-8 text-center">
                <Link
                  href="/factions/compare"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-blue-400 bg-transparent px-6 py-2 text-blue-400 transition-colors hover:bg-blue-400 hover:text-white"
                >
                  Compare All Factions
                </Link>
              </div>
            </div>
          </section>
        </ScrollAnimation>
        
        {/* Development Roadmap Section */}
        <ScrollAnimation>
          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Development Roadmap
                </span>
              </h2>
              <DevelopmentProgressVisual />
              <FeedbackWidget sectionId="development-roadmap" />
            </div>
          </section>
        </ScrollAnimation>

        {/* Call to Action Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Enter the Crisis?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Choose your faction, build your deck, and join the strategic revolution.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/factions/select"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 p-0.5 text-lg font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 focus-visible:ring-4"
              >
                <span className="relative rounded-md bg-gray-900 px-8 py-3.5 transition-all duration-300 ease-out group-hover:bg-opacity-0">
                  Begin Your Journey
                </span>
              </Link>
              <Link
                href="/"
                className="relative inline-flex items-center justify-center rounded-lg border-2 border-gray-400 bg-transparent px-8 py-3 text-lg font-medium text-gray-400 transition-colors hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-500 focus-visible:ring-4"
              >
                Back to Games
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <SharedFooter />
      </main>
    </GlossaryProvider>
  )
}