"use client"

import type React from "react"
import ErrorBoundary from "../error-boundary"
import { Button } from "@/components/ui/button"
import { AlertOctagon, RotateCcw } from "lucide-react"
import { logError } from "@/lib/error-logger"

interface FormErrorBoundaryProps {
  children: React.ReactNode
  formName?: string
  onReset?: () => void
}

/**
 * Provides an error boundary for forms, displaying a user-friendly fallback UI and logging errors when they occur.
 *
 * Wraps form content to catch rendering errors, log error details, and present options to reload the page or reset the form.
 *
 * @param children - The form elements or components to be rendered within the error boundary.
 * @param formName - Optional name used to identify the form in error logs and UI. Defaults to "Form".
 * @param onReset - Optional callback invoked when the user chooses to reset the form after an error.
 */
export function FormErrorBoundary({ children, formName = "Form", onReset }: FormErrorBoundaryProps) {
  const handleError = (error: Error) => {
    logError({
      message: error.message,
      stack: error.stack,
      componentName: `${formName}Component`,
      severity: "medium",
      additionalData: { formName },
    })
  }

  const fallbackUI = (
    <div className="p-6 border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800 rounded-lg">
      <div className="flex flex-col items-center text-center space-y-4">
        <AlertOctagon className="h-12 w-12 text-red-500" />
        <h3 className="text-lg font-medium">Form Error</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          We encountered an error with this form. Your data has not been lost.
        </p>
        <div className="flex space-x-4">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Reload Page
          </Button>
          <Button onClick={onReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset Form
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <ErrorBoundary componentName={formName} onError={handleError} fallback={fallbackUI} onReset={onReset}>
      {children}
    </ErrorBoundary>
  )
}
