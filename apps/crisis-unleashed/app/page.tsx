"use client"

import { GlossaryProvider } from "@/components/onboarding/glossary-provider"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"

/**
 * Renders the main landing page for the Veritas Vault gaming ecosystem, featuring both 
 * Crisis Unleashed and Crypto Paddle games, along with information about NFT asset storage.
 *
 * The GlossaryProvider is used to provide contextual help and definitions for blockchain
 * and gaming terminology throughout the application. It allows users to hover over or click
 * on technical terms to see explanations without leaving the page.
 *
 * @returns The complete landing page React element for the Veritas Vault gaming ecosystem.
 */
export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    // Vault-inspired background animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Animation parameters
    const particles: {x: number, y: number, size: number, speed: number, color: string}[] = [];
    const particleCount = 50;
    const colors = ['#3b82f6', '#0ea5e9', '#fbbf24', '#6366f1'];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    // Animation loop
    let animationFrameId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.3)';
      ctx.lineWidth = 0.5;
      
      // Horizontal lines
      const gridSize = 40;
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Draw particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.4;
        ctx.fill();
        
        // Move particles
        particle.y += particle.speed;
        
        // Reset particles when they go off screen
        if (particle.y > canvas.height) {
          particle.y = 0;
          particle.x = Math.random() * canvas.width;
        }
      });
      
      // Draw connecting lines between nearby particles
      ctx.globalAlpha = 0.2;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = particles[i].color;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <GlossaryProvider>
      <main className="relative min-h-screen overflow-x-hidden bg-[#0a0e1a]">
        {/* Background Animation Canvas */}
        <canvas 
          ref={canvasRef} 
          className="fixed inset-0 z-0 opacity-40"
          style={{ background: 'linear-gradient(to bottom, #0f172a, #020617)' }}
        />

        {/* Hero Section - Clean, Professional, No Header */}
        <section className="relative z-10 flex min-h-screen flex-col px-4 py-20 md:py-32">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div>
                <div className="mb-2 inline-block rounded-full bg-indigo-900/30 px-4 py-1 text-sm font-medium text-blue-300">
                  Institutional-Grade Liquidity Management
                </div>
                <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl">
                  <span className="bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                    VeritasVault.ai
                  </span>
                </h1>
                <h2 className="mb-6 text-2xl font-medium text-blue-300">
                  Enterprise Treasury Solutions for Digital Gaming Assets
                </h2>
                <p className="mb-8 max-w-xl text-lg text-gray-300">
                  Optimize your gaming portfolio with advanced asset management, 
                  built on secure blockchain technology. Experience institutional-grade 
                  security with a gaming-focused interface.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/vault"
                    className="rounded-md bg-indigo-600 px-8 py-3 text-base font-medium text-white shadow-lg transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Access Your Vault
                  </Link>
                  <Link
                    href="/case-studies"
                    className="rounded-md border border-gray-600 bg-transparent px-8 py-3 text-base font-medium text-gray-300 transition-all hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    View Case Studies
                  </Link>
                </div>
                
                <div className="mt-8 flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-sm text-gray-400">CCPA Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-sm text-gray-400">ISO 27001 Compliant</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Using a more reliable image approach with fallback */}
                    <div className="relative h-[250px] w-[250px]">
                      <Image 
                        src="/images/veritas-vault-logo.png" 
                        alt="Veritas Vault Logo" 
                        width={250} 
                        height={250}
                        className="animate-pulse-subtle"
                        onError={(e) => {
                          // Fallback to a text logo if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            const fallback = document.createElement('div');
                            fallback.className = 'flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-800';
                            fallback.innerHTML = '<span class="text-5xl font-bold text-yellow-400">VV</span>';
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="h-[400px] w-[400px] rounded-full border border-blue-500/20"
                      animate={{ 
                        rotate: 360,
                        borderColor: ['rgba(59, 130, 246, 0.2)', 'rgba(251, 191, 36, 0.2)', 'rgba(59, 130, 246, 0.2)']
                      }}
                      transition={{ 
                        duration: 20, 
                        ease: "linear", 
                        repeat: Infinity,
                        borderColor: { duration: 8, repeat: Infinity }
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="h-[300px] w-[300px] rounded-full border border-blue-500/30"
                      animate={{ 
                        rotate: -360,
                        borderColor: ['rgba(59, 130, 246, 0.3)', 'rgba(251, 191, 36, 0.3)', 'rgba(59, 130, 246, 0.3)']
                      }}
                      transition={{ 
                        duration: 15, 
                        ease: "linear", 
                        repeat: Infinity,
                        borderColor: { duration: 6, repeat: Infinity }
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="h-[200px] w-[200px] rounded-full border border-yellow-500/40"
                      animate={{ 
                        rotate: 360,
                        borderColor: ['rgba(251, 191, 36, 0.4)', 'rgba(59, 130, 246, 0.4)', 'rgba(251, 191, 36, 0.4)']
                      }}
                      transition={{ 
                        duration: 10, 
                        ease: "linear", 
                        repeat: Infinity,
                        borderColor: { duration: 4, repeat: Infinity }
                      }}
                    />
                  </div>
                </div>
                <div className="absolute -bottom-4 right-0 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
                  Trusted by leading gaming platforms
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secure Storage Section */}
        <section className="relative z-10 py-20 bg-[#0a0e1a]">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div className="order-2 md:order-1">
                <div className="relative h-[500px] w-full overflow-hidden rounded-lg bg-[#111827] p-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#111827] to-[#0c1222]"></div>
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-600/20 mb-4">
                        <svg className="h-8 w-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Secure Storage</h3>
                      <p className="text-gray-400 mb-6">
                        Your cards are securely stored on the blockchain, ensuring true ownership and authenticity.
                      </p>
                    </div>
                    
                    <div className="bg-indigo-900/20 rounded-lg p-6 mb-6">
                      <div className="text-center mb-4">
                        <h4 className="text-xl font-bold text-indigo-300">Card Vault</h4>
                        <p className="text-sm text-gray-400">Blockchain Secured</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Cards</span>
                          <span className="text-white font-bold">142</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Rarity</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg key={star} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Value</span>
                          <span className="text-white font-bold">$1,240</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Status</span>
                          <span className="text-green-400 flex items-center">
                            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
                      Real-time blockchain verification
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold text-white mb-6 md:text-4xl">
                  Institutional-Grade Security for Your Gaming Assets
                </h2>
                <p className="text-gray-300 mb-6">
                  VeritasVault combines traditional finance security principles with blockchain technology to deliver 
                  unprecedented protection for your valuable gaming collectibles.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-900/30">
                      <svg className="h-4 w-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Multi-signature authentication</h3>
                      <p className="text-gray-400">Requires multiple approvals for high-value transactions</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-900/30">
                      <svg className="h-4 w-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Cold storage solutions</h3>
                      <p className="text-gray-400">Offline storage for maximum security against online threats</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-900/30">
                      <svg className="h-4 w-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Formal verification</h3>
                      <p className="text-gray-400">Mathematically proven security protocols for transaction integrity</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-900/30">
                      <svg className="h-4 w-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Real-time monitoring</h3>
                      <p className="text-gray-400">Advanced threat detection with 24/7 security operations</p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/security"
                    className="rounded-md bg-indigo-600/20 border border-indigo-500/30 px-6 py-3 text-base font-medium text-indigo-300 transition-all hover:bg-indigo-600/30"
                  >
                    Learn about our security
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Game Selection Section - Improved Balance */}
        <section className="relative z-10 py-20">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Featured Games</h2>
              <p className="text-gray-400 mx-auto max-w-2xl">
                Explore our collection of blockchain-powered games with integrated asset management
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Crisis Unleashed Card */}
              <div className="overflow-hidden rounded-lg border border-blue-500/20 bg-[#0f172a] p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/20">
                    <span className="text-xl font-bold text-blue-400">C</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Crisis Unleashed</h3>
                </div>
                <p className="mb-6 text-gray-300">
                  Strategic card game with faction politics and resource management in an ever-evolving game ecosystem.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/crisis-unleashed"
                    className="rounded-md bg-blue-600 px-4 py-3 text-center text-sm font-medium text-white shadow-lg transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Play Now
                  </Link>
                  <Link
                    href="/crisis-unleashed/learn"
                    className="rounded-md border border-blue-600/30 bg-transparent px-4 py-3 text-center text-sm font-medium text-blue-400 transition-all hover:bg-blue-600/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Learn More
                  </Link>
                </div>
              </div>

              {/* Crypto Paddle Card */}
              <div className="overflow-hidden rounded-lg border border-green-500/20 bg-[#0f172a] p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600/20">
                    <span className="text-xl font-bold text-green-400">CP</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Crypto Paddle</h3>
                </div>
                <p className="mb-6 text-gray-300">
                  Fast-paced blockchain-powered arcade game with NFT collectibles and competitive gameplay.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/crypto-paddle"
                    className="rounded-md bg-green-600 px-4 py-3 text-center text-sm font-medium text-white shadow-lg transition-all hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Play Now
                  </Link>
                  <Link
                    href="/crypto-paddle/learn"
                    className="rounded-md border border-green-600/30 bg-transparent px-4 py-3 text-center text-sm font-medium text-green-400 transition-all hover:bg-green-600/10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section - Fill Empty Space */}
        <section className="relative z-10 py-16 bg-gradient-to-b from-[#0a0e1a] to-[#111827]">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="rounded-xl bg-gradient-to-r from-indigo-800/50 to-blue-900/50 p-8 md:p-12">
              <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-5">
                <div className="md:col-span-3">
                  <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                    Ready to secure your gaming assets?
                  </h2>
                  <p className="mb-6 text-gray-300">
                    Join thousands of gamers who trust VeritasVault for institutional-grade security and asset management.
                  </p>
                </div>
                <div className="md:col-span-2 flex flex-col space-y-4">
                  <Link
                    href="/signup"
                    className="rounded-md bg-indigo-600 px-6 py-3 text-center text-base font-medium text-white shadow-lg transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Create Free Account
                  </Link>
                  <Link
                    href="/demo"
                    className="rounded-md border border-gray-600 bg-transparent px-6 py-3 text-center text-base font-medium text-gray-300 transition-all hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Schedule a Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer - Improved */}
        <footer className="relative z-10 py-12 bg-[#0a0e1a] border-t border-gray-800">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div className="md:col-span-1">
                <Link href="/" className="text-xl font-bold text-white">
                  <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                    VeritasVault
                  </span>
                </Link>
                <p className="mt-4 text-sm text-gray-400">
                  Enterprise Treasury Solutions for Digital Gaming Assets
                </p>
                <div className="mt-6 flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <span className="sr-only">Discord</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Games</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link href="/crisis-unleashed" className="text-sm text-gray-500 hover:text-gray-300">Crisis Unleashed</Link></li>
                  <li><Link href="/crypto-paddle" className="text-sm text-gray-500 hover:text-gray-300">Crypto Paddle</Link></li>
                  <li><Link href="/upcoming" className="text-sm text-gray-500 hover:text-gray-300">Upcoming Releases</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Resources</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link href="/support" className="text-sm text-gray-500 hover:text-gray-300">Support</Link></li>
                  <li><Link href="/faq" className="text-sm text-gray-500 hover:text-gray-300">FAQ</Link></li>
                  <li><Link href="/guides" className="text-sm text-gray-500 hover:text-gray-300">Guides</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Company</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link href="/about" className="text-sm text-gray-500 hover:text-gray-300">About</Link></li>
                  <li><Link href="/careers" className="text-sm text-gray-500 hover:text-gray-300">Careers</Link></li>
                  <li><Link href="/contact" className="text-sm text-gray-500 hover:text-gray-300">Contact</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <span className="text-gray-500 text-sm">© 2025 VeritasVault.ai. All rights reserved.</span>
                </div>
                <div className="flex space-x-6">
                  <Link href="/terms" className="text-gray-500 hover:text-gray-300 text-sm">Terms</Link>
                  <Link href="/privacy" className="text-gray-500 hover:text-gray-300 text-sm">Privacy</Link>
                  <Link href="/cookies" className="text-gray-500 hover:text-gray-300 text-sm">Cookies</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </GlossaryProvider>
  )
}