"use client"

import { useState } from "react"
// Import directly from component file instead of barrel file
import LogoVariant from "@/components/logo-system/logo-variant"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BugIcon, RefreshCw } from "lucide-react"

/**
 * Renders an animated interactive logo, or intentionally throws an error for testing error boundaries.
 *
 * @param shouldError - If true, the component throws an error instead of rendering the logo.
 * @returns The animated interactive logo if {@link shouldError} is false.
 *
 * @throws {Error} If {@link shouldError} is true, to simulate a rendering failure.
 */
function BuggyLogo({ shouldError = false }: { shouldError?: boolean }) {
  if (shouldError) {
    throw new Error("This is an intentional error to demonstrate the error boundary")
  }

  return <LogoVariant variant="standard" size="xl" className="mx-auto" interactive={true} animated={true} />
}

/**
 * Demonstrates error boundary handling for logo components with interactive controls and usage instructions.
 *
 * Renders a UI with tabs to showcase an error boundary demo for logo components, allowing users to trigger and reset errors, and view different logo variants. Also provides a usage guide for implementing the `LogoErrorBoundary` component.
 */
export default function LogoErrorDemo() {
  const [shouldError, setShouldError] = useState(false)
  const [key, setKey] = useState(0)

  const toggleError = () => {
    setShouldError(!shouldError)
  }

  const resetDemo = () => {
    setShouldError(false)
    setKey((prev) => prev + 1)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Logo Error Boundary Demo</h1>

      <Tabs defaultValue="demo">
        <TabsList className="mb-4">
          <TabsTrigger value="demo">Demo</TabsTrigger>
          <TabsTrigger value="usage">Usage Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="demo">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Error Boundary Demo</CardTitle>
                <CardDescription>
                  Click the button to trigger an error and see how the error boundary handles it
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-6">
                <div className="w-full h-40 flex items-center justify-center border rounded-md p-4" key={key}>
                  <BuggyLogo shouldError={shouldError} />
                </div>

                <div className="flex space-x-4">
                  <Button
                    variant={shouldError ? "default" : "destructive"}
                    onClick={toggleError}
                    className="flex items-center gap-2"
                  >
                    <BugIcon size={16} />
                    {shouldError ? "Fix Error" : "Trigger Error"}
                  </Button>

                  <Button variant="outline" onClick={resetDemo} className="flex items-center gap-2">
                    <RefreshCw size={16} />
                    Reset Demo
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Different Variants</CardTitle>
                <CardDescription>See how the error boundary handles different logo variants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center">
                    <p className="text-sm font-medium mb-2">Standard</p>
                    <LogoVariant variant="standard" size="md" />
                  </div>

                  <div className="flex flex-col items-center">
                    <p className="text-sm font-medium mb-2">Horizontal</p>
                    <LogoVariant variant="horizontal" size="md" />
                  </div>

                  <div className="flex flex-col items-center">
                    <p className="text-sm font-medium mb-2">Icon</p>
                    <LogoVariant variant="icon" size="md" />
                  </div>

                  <div className="flex flex-col items-center">
                    <p className="text-sm font-medium mb-2">Minimal</p>
                    <LogoVariant variant="minimal" size="md" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>How to Use the Logo Error Boundary</CardTitle>
              <CardDescription>Learn how to implement the error boundary in your components</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                The LogoErrorBoundary component is designed to catch errors that occur when rendering logo components.
                It provides a fallback UI and prevents the entire application from crashing.
              </p>

              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
                <pre className="text-sm overflow-x-auto">
                  {`import { LogoErrorBoundary } from "@/components/error-boundaries/logo-error-boundary";
import LogoVariant from "@/components/logo-system/logo-variant";

// Basic usage (already included in LogoVariant component)
<LogoErrorBoundary>
  <LogoVariant variant="standard" size="md" />
</LogoErrorBoundary>

// With custom fallback styling
<LogoErrorBoundary 
  fallbackClassName="bg-blue-50 dark:bg-blue-900"
  showRetry={true}
  showError={true}
>
  <LogoVariant animated size="xl" />
</LogoErrorBoundary>`}
                </pre>
              </div>

              <h3 className="text-lg font-medium mt-6">Props</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>fallbackClassName</strong>: Additional classes for the fallback UI
                </li>
                <li>
                  <strong>showRetry</strong>: Whether to show the retry button (default: true)
                </li>
                <li>
                  <strong>showError</strong>: Whether to show the error message (default: false)
                </li>
                <li>
                  <strong>size</strong>: Size of the fallback UI (xs, sm, md, lg, xl, 2xl)
                </li>
                <li>
                  <strong>variant</strong>: Style variant of the fallback UI (standard, compact, minimal)
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}