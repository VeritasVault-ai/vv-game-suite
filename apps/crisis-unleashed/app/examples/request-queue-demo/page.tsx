"use client"

import dynamic from 'next/dynamic'

// Dynamically import the client component with no SSR
const RequestQueueDemoClient = dynamic(
  () => import('./client-page').then(mod => ({ default: mod.RequestQueueDemoClient })),
  { ssr: false } // This ensures the component only renders on the client side
)

/**
 * Client component that serves as the entry point for the Request Queue Demo page.
 * 
 * This component dynamically imports the implementation to prevent
 * issues with browser-only APIs like localStorage and window during server-side rendering.
 */
export default function RequestQueueDemoPage() {
  return <RequestQueueDemoClient />
}