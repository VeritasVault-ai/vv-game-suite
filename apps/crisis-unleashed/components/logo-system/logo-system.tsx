"use client"

import { cn } from "@/lib/utils"
import { FactionId } from "./utils"
import LogoVariant, { LogoSize, LogoVariantProps } from "./logo-variant"

/**
 * LogoSystem is a wrapper around LogoVariant for backward compatibility
 * It supports all the same props as LogoVariant
 */
export interface LogoSystemProps extends Omit<LogoVariantProps, 'variant'> {
  /**
   * The variant of the logo to display, including legacy variants
   */
  variant?: LogoVariantProps["variant"] | "animated" | "compact" | "icon-only" | "text-only" | "wordmark" | "footer" | "mobile" | "print" | "watermark";
}

/**
 * Legacy LogoSystem component that maps to the new LogoVariant component
 * This ensures backward compatibility with existing code
 */
export default function LogoSystem({
  variant = "standard",
  size = "md",
  faction = "cybernetic-nexus",
  animated = false,
  interactive = false,
  monochrome = false,
  inverted = false,
  withTagline = false,
  className,
  ...props
}: LogoSystemProps) {
  // Map legacy variants to new variants
  let mappedVariant: LogoVariantProps["variant"] = "standard";
  let isAnimated = animated;
  
  // Map the legacy variants to the new system
  switch (variant) {
    case "icon-only":
      mappedVariant = "icon";
      break;
    case "text-only":
    case "wordmark":
      mappedVariant = "minimal";
      break;
    case "compact":
      mappedVariant = "horizontal";
      break;
    case "animated":
      mappedVariant = "standard";
      isAnimated = true;
      break;
    case "footer":
    case "mobile":
    case "print":
    case "watermark":
      // These legacy variants can all map to minimal for now
      mappedVariant = "minimal";
      break;
    default:
      // For standard, horizontal, vertical, icon, and minimal, use as is
      mappedVariant = variant as LogoVariantProps["variant"];
  }

  return (
    <LogoVariant
      variant={mappedVariant}
      size={size}
      faction={faction}
      animated={isAnimated}
      interactive={interactive}
      monochrome={monochrome}
      inverted={inverted}
      withTagline={withTagline}
      className={className}
      {...props}
    />
  )
}