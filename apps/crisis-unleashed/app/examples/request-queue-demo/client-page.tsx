"use client"

import { useState } from "react"
import { useApiWithQueue } from "@/hooks/use-api-with-queue"
import { useRequestQueue } from "@/hooks/use-request-queue"
import { RequestQueueStatus } from "@/components/request-queue-status"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApiErrorAlert } from "@/components/api-error-alert"
import { Wifi, WifiOff, RefreshCw, Send, Trash2, Clock } from "lucide-react"

/**
 * Client-side component that demonstrates a request queue system with offline support and priority-based queuing.
 *
 * Allows users to configure and send API requests, toggle simulated online/offline status, and observe how requests are queued, processed, or cancelled based on network state and priority.
 */
export function RequestQueueDemoClient() {
  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts/1")
  const [method, setMethod] = useState("GET")
  const [body, setBody] = useState("")
  const [priority, setPriority] = useState(1)
  const { stats } = useRequestQueue()

  const { data, error, isLoading, isSuccess, isError, isQueued, refetch, cancelQueuedRequest } = useApiWithQueue({
    url,
    method: method as any,
    body: body ? JSON.parse(body) : undefined,
    autoFetch: false,
    offlineSupport: true,
    offlineOptions: {
      priority,
      tags: ["demo"],
    },
  })

  // Function to toggle online/offline for demo purposes
  const toggleNetworkStatus = () => {
    // This is a hack to simulate offline status for demo purposes
    // In a real app, the browser handles this automatically
    const originalDescriptor = Object.getOwnPropertyDescriptor(navigator, "onLine")

    if (stats.isOnline) {
      Object.defineProperty(navigator, "onLine", {
        configurable: true,
        get: () => false,
      })
      // Dispatch offline event
      window.dispatchEvent(new Event("offline"))
    } else {
      if (originalDescriptor) {
        Object.defineProperty(navigator, "onLine", originalDescriptor)
      } else {
        // Fallback
        Object.defineProperty(navigator, "onLine", {
          configurable: true,
          get: () => true,
        })
      }
      // Dispatch online event
      window.dispatchEvent(new Event("online"))
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Request Queue Demo</h1>
      <p className="text-gray-600 mb-8">
        This demo shows how the request queue system works. You can toggle between online and offline modes to see how
        requests are queued and processed.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Make API Request</CardTitle>
            <CardDescription>Configure and send an API request</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">URL</label>
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://api.example.com/endpoint"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
            </div>

            {(method === "POST" || method === "PUT" || method === "PATCH") && (
              <div>
                <label className="block text-sm font-medium mb-1">Request Body (JSON)</label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder='{"key": "value"}'
                  className="w-full rounded-md border border-gray-300 p-2 h-24 font-mono text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Priority (if queued)</label>
              <Input
                type="number"
                min="1"
                max="10"
                value={priority}
                onChange={(e) => setPriority(Number.parseInt(e.target.value))}
              />
              <p className="text-xs text-gray-500 mt-1">Higher numbers = higher priority</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={toggleNetworkStatus}>
              {stats.isOnline ? (
                <>
                  <WifiOff className="h-4 w-4 mr-2" />
                  Go Offline
                </>
              ) : (
                <>
                  <Wifi className="h-4 w-4 mr-2" />
                  Go Online
                </>
              )}
            </Button>

            <Button onClick={refetch} disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Request
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response</CardTitle>
            <CardDescription>View the response from your API request</CardDescription>
          </CardHeader>
          <CardContent className="min-h-[300px]">
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            )}

            {isError && <ApiErrorAlert error={error!} onRetry={refetch} />}

            {isQueued && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <h3 className="text-yellow-800 font-medium flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Request Queued
                </h3>
                <p className="text-yellow-700 mt-2 text-sm">{error?.message}</p>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm" onClick={cancelQueuedRequest}>
                    <Trash2 className="h-3 w-3 mr-1" />
                    Cancel Request
                  </Button>
                </div>
              </div>
            )}

            {isSuccess && (
              <div>
                <h3 className="font-medium mb-2">Response Data:</h3>
                <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm max-h-[200px]">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">How It Works</h2>
        <Tabs defaultValue="online">
          <TabsList>
            <TabsTrigger value="online">Online Mode</TabsTrigger>
            <TabsTrigger value="offline">Offline Mode</TabsTrigger>
            <TabsTrigger value="recovery">Recovery</TabsTrigger>
          </TabsList>

          <TabsContent value="online" className="p-4 border rounded-md mt-2">
            <h3 className="font-medium mb-2">Online Behavior:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Requests are sent immediately to the server</li>
              <li>Responses are processed and displayed</li>
              <li>Errors are handled and displayed</li>
              <li>No requests are queued</li>
            </ul>
          </TabsContent>

          <TabsContent value="offline" className="p-4 border rounded-md mt-2">
            <h3 className="font-medium mb-2">Offline Behavior:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Requests are automatically queued</li>
              <li>Queue is persisted in localStorage</li>
              <li>Requests are prioritized based on priority value</li>
              <li>UI shows queued status</li>
              <li>Requests can be cancelled from the queue</li>
            </ul>
          </TabsContent>

          <TabsContent value="recovery" className="p-4 border rounded-md mt-2">
            <h3 className="font-medium mb-2">Recovery Process:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>When connection is restored, queued requests are processed automatically</li>
              <li>Requests are processed in priority order (highest first)</li>
              <li>Failed requests can be retried manually</li>
              <li>Successful requests are removed from the queue</li>
              <li>Queue status is updated in real-time</li>
            </ul>
          </TabsContent>
        </Tabs>
      </div>

      <RequestQueueStatus />
    </div>
  )
}