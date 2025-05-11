"use client"

import { FeedbackWidget } from "@/components/onboarding/feedback-widget"
import { GlossaryProvider } from "@/components/onboarding/glossary-provider"
import { GuidedTourButton } from "@/components/onboarding/guided-tour-button"
import { NewUserWelcome } from "@/components/onboarding/new-user-welcome"
import { SharedFooter } from "@/components/shared-footer"
import { SharedNavigation } from "@/components/shared-navigation"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

/**
 * Renders the landing page for the Crypto Paddle arcade game, featuring game information,
 * gameplay mechanics, NFT integration details, and calls to action.
 *
 * @returns The Crypto Paddle landing page React element.
 */
export default function CryptoPaddlePage() {
  const [isFirstVisit, setIsFirstVisit] = useState(false)
  const [showNewUserWelcome, setShowNewUserWelcome] = useState(false)

  useEffect(() => {
    // Check if this is the user's first visit to Crypto Paddle
    const hasVisitedCryptoPaddle = localStorage.getItem("hasVisitedCryptoPaddle")
    if (!hasVisitedCryptoPaddle) {
      setIsFirstVisit(true)
      setShowNewUserWelcome(true)
      localStorage.setItem("hasVisitedCryptoPaddle", "true")
    }
  }, [])

  return (
    <GlossaryProvider>
      <main className="relative min-h-screen overflow-x-hidden">
        {/* Background Elements */}
        <div className="fixed inset-0 z-0">
          <div
            className="h-full w-full bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: "url('/crypto-paddle-bg.png')" }}
            aria-hidden="true"
          />
        </div>

        {/* Navigation */}
        <SharedNavigation />

        {/* New User Welcome Modal */}
        <AnimatePresence>
          {showNewUserWelcome && (
            <NewUserWelcome 
              onClose={() => setShowNewUserWelcome(false)}
              // Remove these props as they're not supported
              // title="Welcome to Crypto Paddle"
              // description="Get ready for a fast-paced blockchain-powered arcade experience with NFT collectibles and competitive gameplay."
            />
          )}
        </AnimatePresence>

        {/* Guided Tour Button */}
        <div className="fixed bottom-4 right-4 z-50">
          <GuidedTourButton isFirstVisit={isFirstVisit} />
        </div>

        {/* Hero Section */}
        <section
          className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-24 text-center"
          style={{
            backgroundImage: "url('/crypto-paddle-hero.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

          <div className="mb-6 relative z-10">
            <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <span className="text-5xl font-bold text-white">CP</span>
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-4xl font-bold leading-tight tracking-tighter md:text-6xl relative z-10"
          >
            <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Crypto Paddle
            </span>{" "}
            <span className="block">Blockchain Breakout Game</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-10 max-w-3xl text-xl text-gray-200 relative z-10"
          >
            A fast-paced arcade game with blockchain integration, NFT collectibles, and competitive gameplay.
            Break blocks, collect power-ups, and earn crypto rewards!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 relative z-10"
          >
            <a
              href="http://localhost:3001/"  // Direct link to the Breakout Game
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-green-500 to-emerald-400 p-0.5 text-lg font-medium text-white focus:outline-none focus:ring-4 focus:ring-green-300 focus-visible:ring-4"
            >
              <span className="relative rounded-md bg-gray-900 px-8 py-3.5 transition-all duration-300 ease-out group-hover:bg-opacity-0">
                Play Now
              </span>
            </a>

            <Link
              href="#gameplay"
              className="relative inline-flex items-center justify-center rounded-lg border-2 border-green-400 bg-transparent px-8 py-3 text-lg font-medium text-green-400 transition-colors hover:bg-green-400 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 focus-visible:ring-4"
            >
              Learn How to Play
            </Link>

            <Link
              href="/"
              className="relative inline-flex items-center justify-center rounded-lg border-2 border-gray-400 bg-transparent px-8 py-3 text-lg font-medium text-gray-400 transition-colors hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-500 focus-visible:ring-4"
            >
              Back to Games
            </Link>
          </motion.div>
        </section>

        {/* Gameplay Section */}
        <section id="gameplay" className="relative z-10 py-24 px-4 bg-gray-900/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                How to Play
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-green-400">Gameplay Mechanics</h3>
                <ul className="space-y-4 text-gray-200">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 text-xl">•</span>
                    <span><strong>Move your paddle</strong> with your mouse or keyboard to bounce the ball</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 text-xl">•</span>
                    <span><strong>Break all blocks</strong> to complete levels and earn points</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 text-xl">•</span>
                    <span><strong>Collect power-ups</strong> that fall from destroyed blocks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 text-xl">•</span>
                    <span><strong>Avoid losing the ball</strong> - you have limited lives!</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2 text-xl">•</span>
                    <span><strong>Earn crypto rewards</strong> based on your score and achievements</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg overflow-hidden border-2 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                <div className="aspect-video relative bg-gray-800">
                  {/* Replace with actual gameplay screenshot or video */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-400">Gameplay Preview</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center text-green-400">Special Power-Ups</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gray-800/60 border-green-500/30 p-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-white font-bold">M</span>
                  </div>
                  <h4 className="text-center text-lg font-semibold text-blue-400 mb-2">Multi-Ball</h4>
                  <p className="text-gray-300 text-sm text-center">Splits your ball into multiple balls</p>
                </Card>
                <Card className="bg-gray-800/60 border-green-500/30 p-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-white font-bold">G</span>
                  </div>
                  <h4 className="text-center text-lg font-semibold text-green-400 mb-2">Paddle Grow</h4>
                  <p className="text-gray-300 text-sm text-center">Increases paddle size temporarily</p>
                </Card>
                <Card className="bg-gray-800/60 border-green-500/30 p-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-white font-bold">L</span>
                  </div>
                  <h4 className="text-center text-lg font-semibold text-purple-400 mb-2">Laser</h4>
                  <p className="text-gray-300 text-sm text-center">Equips your paddle with block-destroying lasers</p>
                </Card>
                <Card className="bg-gray-800/60 border-green-500/30 p-4">
                  <div className="w-12 h-12 rounded-full bg-yellow-500 mx-auto mb-3 flex items-center justify-center">
                    <span className="text-white font-bold">S</span>
                  </div>
                  <h4 className="text-center text-lg font-semibold text-yellow-400 mb-2">Shield</h4>
                  <p className="text-gray-300 text-sm text-center">Creates a safety net at the bottom of the screen</p>
                </Card>
              </div>
            </div>

            <FeedbackWidget sectionId="crypto-paddle-gameplay" />
          </div>
        </section>

        {/* NFT Integration Section */}
        <section className="relative z-10 py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                NFT Integration
              </span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <Card className="bg-gray-800/60 border-green-500/30 p-6 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-shadow">
                <h3 className="text-xl font-bold mb-4 text-green-400">Collectible Paddles</h3>
                <p className="text-gray-300 mb-4">
                  Earn and collect unique paddle NFTs with special abilities and visual effects.
                  Each paddle has different stats that affect gameplay.
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
                  <li>Varying sizes and speeds</li>
                  <li>Special power-up affinities</li>
                  <li>Unique visual effects</li>
                </ul>
                <div className="h-40 bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Paddle NFT Preview</p>
                </div>
              </Card>

              <Card className="bg-gray-800/60 border-green-500/30 p-6 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-shadow">
                <h3 className="text-xl font-bold mb-4 text-green-400">Achievement Badges</h3>
                <p className="text-gray-300 mb-4">
                  Complete in-game challenges to earn achievement badge NFTs that showcase your skills
                  and unlock special game features.
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
                  <li>Score-based achievements</li>
                  <li>Special gameplay challenges</li>
                  <li>Limited edition event badges</li>
                </ul>
                <div className="h-40 bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Badge NFT Preview</p>
                </div>
              </Card>

              <Card className="bg-gray-800/60 border-green-500/30 p-6 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-shadow">
                <h3 className="text-xl font-bold mb-4 text-green-400">Power-Up Boosters</h3>
                <p className="text-gray-300 mb-4">
                  Collect power-up booster NFTs that enhance the effects of in-game power-ups
                  and give you a competitive edge.
                </p>
                <ul className="list-disc pl-5 text-gray-300 space-y-2 mb-4">
                  <li>Extended power-up durations</li>
                  <li>Enhanced power-up effects</li>
                  <li>Unique power-up combinations</li>
                </ul>
                <div className="h-40 bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Power-Up NFT Preview</p>
                </div>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-xl text-gray-200 mb-6">
                All your NFTs are securely stored in the VeritasVault, allowing you to trade, sell, or use them
                across multiple games in our ecosystem.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg border-2 border-purple-500 bg-transparent px-8 py-3 text-lg font-medium text-purple-400 transition-colors hover:bg-purple-500/20"
              >
                Learn More About VeritasVault
              </Link>
            </div>
          </div>
        </section>

        {/* Leaderboard & Tournaments Section */}
        <section className="relative z-10 py-24 px-4 bg-gray-900/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                Compete & Earn
              </span>
            </h2>

            <Tabs defaultValue="leaderboards" className="w-full mb-16">
              <TabsList className="grid grid-cols-2 max-w-md mx-auto mb-8">
                <TabsTrigger value="leaderboards">Leaderboards</TabsTrigger>
                <TabsTrigger value="tournaments">Tournaments</TabsTrigger>
              </TabsList>
              <TabsContent value="leaderboards" className="space-y-4">
                <div className="bg-gray-800/60 border border-green-500/30 rounded-lg p-6">
                  <h3 className="text-2xl font-bold mb-6 text-green-400">Global Leaderboards</h3>
                  <p className="text-gray-300 mb-6">
                    Compete against players worldwide for the highest scores and earn weekly crypto rewards.
                    Leaderboards reset weekly, giving everyone a chance to climb to the top.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="border-b border-gray-700">
                        <tr>
                          <th className="py-3 px-4 text-green-400">Rank</th>
                          <th className="py-3 px-4 text-green-400">Player</th>
                          <th className="py-3 px-4 text-green-400">Score</th>
                          <th className="py-3 px-4 text-green-400">Reward</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        <tr>
                          <td className="py-3 px-4 text-gray-200">1</td>
                          <td className="py-3 px-4 text-gray-200">CryptoMaster</td>
                          <td className="py-3 px-4 text-gray-200">1,250,500</td>
                          <td className="py-3 px-4 text-gray-200">500 CRYPT</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-gray-200">2</td>
                          <td className="py-3 px-4 text-gray-200">BlockBreaker</td>
                          <td className="py-3 px-4 text-gray-200">1,120,750</td>
                          <td className="py-3 px-4 text-gray-200">250 CRYPT</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 text-gray-200">3</td>
                          <td className="py-3 px-4 text-gray-200">PaddleWizard</td>
                          <td className="py-3 px-4 text-gray-200">980,250</td>
                          <td className="py-3 px-4 text-gray-200">100 CRYPT</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="tournaments" className="space-y-4">
                <div className="bg-gray-800/60 border border-green-500/30 rounded-lg p-6">
                  <h3 className="text-2xl font-bold mb-6 text-green-400">Weekly Tournaments</h3>
                  <p className="text-gray-300 mb-6">
                    Join weekly tournaments with special rules and challenges. Entry requires tournament tickets
                    that can be earned through gameplay or purchased with CRYPT tokens.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-gray-700/60 border-green-500/20 p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-lg font-semibold text-green-400">Speed Challenge</h4>
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Ongoing</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">
                        Complete levels as quickly as possible. Ball speed increases every 10 seconds.
                      </p>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Prize Pool: 1000 CRYPT</span>
                        <span className="text-gray-400">Ends in: 2d 14h</span>
                      </div>
                    </Card>
                    <Card className="bg-gray-700/60 border-green-500/20 p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="text-lg font-semibold text-green-400">Multi-Ball Madness</h4>
                        <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">Starting Soon</span>
                      </div>
                      <p className="text-gray-300 text-sm mb-3">
                        Play with 3 balls at all times. Lose one, another spawns immediately!
                      </p>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Prize Pool: 1500 CRYPT</span>
                        <span className="text-gray-400">Starts in: 3d 8h</span>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-center">
              <a
                href="/breakout-game"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-green-500 to-emerald-400 p-0.5 text-lg font-medium text-white focus:outline-none focus:ring-4 focus:ring-green-300 focus-visible:ring-4"
              >
                <span className="relative rounded-md bg-gray-900 px-8 py-3.5 transition-all duration-300 ease-out group-hover:bg-opacity-0">
                  Start Playing Now
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative z-10 py-20 px-4 text-center bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Break Some Blocks?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join Crypto Paddle today and start earning while you play!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/breakout-game"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-green-500 to-emerald-400 p-0.5 text-lg font-medium text-white focus:outline-none focus:ring-4 focus:ring-green-300 focus-visible:ring-4"
              >
                <span className="relative rounded-md bg-gray-900 px-8 py-3.5 transition-all duration-300 ease-out group-hover:bg-opacity-0">
                  Play Now
                </span>
              </a>
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