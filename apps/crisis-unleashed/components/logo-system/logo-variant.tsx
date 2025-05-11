"use client"

import { cn } from "@/lib/utils"
import { FactionId, getFactionColor, getFactionSecondaryColor } from "./utils"
import { 
  renderStandardVariant,
  renderIconVariant,
  renderHorizontalVariant,
  renderVerticalVariant,
  renderMinimalVariant 
} from "./variants"

// Define types
export type LogoSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full"

export type LogoVariant = 
  | "standard"
  | "icon"
  | "wordmark"
  | "horizontal"
  | "vertical"
  | "badge"
  | "minimal"

export interface LogoVariantProps {
  /**
   * The variant of the logo to display
   */
  variant?: "standard" | "icon" | "horizontal" | "vertical" | "minimal" | "animated";
  /**
   * The size of the logo
   */
  size?: LogoSize;
  /**
   * The faction identity to use for the logo
   */
  faction?: FactionId;
  /**
   * Whether the logo should be animated
   */
  animated?: boolean;
  /**
   * Whether the logo should respond to hover interactions
   */
  interactive?: boolean;
  /**
   * Whether to render the logo in monochrome
   */
  monochrome?: boolean;
  /**
   * Whether to invert the logo colors
   */
  inverted?: boolean;
  /**
   * Whether to display the faction tagline
   * @remarks Only supported in "standard", "horizontal", and "vertical" variants.
   * Will be ignored for "icon" and "minimal" variants.
   */
  withTagline?: boolean;
  /**
   * Additional CSS classes to apply
   */
  className?: string;
}

const sizeClasses = {
  xs: "h-6",
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
  xl: "h-16",
  "2xl": "h-20",
  "3xl": "h-24",
  "4xl": "h-32",
  full: "h-full w-full",
}

// Size mapping to pixel values for inline styles
const sizeToPixels = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 48,
  xl: 64,
  "2xl": 80,
  "3xl": 96,
  "4xl": 128,
  full: 100, // percentage
}

/**
 * Renders a stylized logo for a specified faction with customizable variant, size, color scheme, animation, and interaction options.
 *
 * Supports multiple visual variants and optional tagline display, adapting colors and layout based on the selected faction and props.
 */
export default function LogoVariant({
  variant = "standard",
  size = "md",
  faction = "cybernetic-nexus",
  animated = false,
  interactive = false,
  monochrome = false,
  inverted = false,
  withTagline = false,
  className,
}: LogoVariantProps) {
  // Get colors based on faction and settings
  const primaryColor = getFactionColor(faction, monochrome, inverted);
  const secondaryColor = getFactionSecondaryColor(faction);

  // Get the faction tagline if needed
  const tagline = withTagline ? getFactionTagline(faction) : null;
  
  // Determine if tagline should be shown based on variant
  const showTagline = withTagline && ["standard", "horizontal", "vertical"].includes(variant);
  
  // Convert size to pixels for inline styles
  const pixelSize = size === "full" ? "100%" : sizeToPixels[size];

  // Function to render the appropriate variant
  const renderVariant = () => {
    switch (variant) {
      case "icon":
        return renderIconVariant(faction, primaryColor, secondaryColor, pixelSize);
      
      case "horizontal":
        return renderHorizontalVariant(
          faction, 
          primaryColor, 
          secondaryColor, 
          pixelSize, 
          showTagline ? tagline : null
        );
      
      case "vertical":
        return renderVerticalVariant(
          faction, 
          primaryColor, 
          secondaryColor, 
          pixelSize, 
          showTagline ? tagline : null
        );
      
      case "minimal":
        return renderMinimalVariant(faction, primaryColor, secondaryColor, pixelSize);
      
      case "standard":
      default:
        return renderStandardVariant(
          faction, 
          primaryColor, 
          secondaryColor, 
          pixelSize, 
          showTagline ? tagline : null
        );
    }
  };

  return (
    <div 
      className={cn(
        "relative transition-all duration-300",
        sizeClasses[size],
        interactive && "cursor-pointer hover:scale-105",
        animated && "motion-safe:animate-pulse motion-reduce:animate-none",
        className
      )}
    >
      {renderVariant()}
    </div>
  )
}

/**
 * Returns the tagline associated with the specified faction.
 *
 * @param faction - The unique identifier of the faction.
 * @returns The tagline string for the given faction, or an empty string if the faction is unrecognized.
 */
function getFactionTagline(faction: FactionId): string {
  switch (faction) {
    case "cybernetic-nexus":
      return "INNOVATION THROUGH INTEGRATION";
    case "void-harbingers":
      return "FROM DARKNESS, POWER";
    case "primordial-ascendancy":
      return "HARMONY WITH NATURE";
    case "eclipsed-order":
      return "BALANCE IN ALL THINGS";
    case "titanborn":
      return "STRENGTH FORGES DESTINY";
    case "celestial-dominion":
      return "GUIDED BY THE STARS";
    default:
      return "";
  }
}