"use client"

import { cn } from "@/lib/utils"
import { FactionId, getFactionColor, getFactionSecondaryColor } from "./utils"

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
  variant?: "standard" | "icon" | "horizontal" | "vertical" | "minimal";
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
      
-      case "standard":
-      default:
+      default:
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

/**
 * Renders the standard logo variant with the faction name and an optional tagline.
 *
 * Displays the faction name in a styled block using the provided primary and secondary colors, with the tagline shown below if specified.
 *
 * @param faction - The faction identifier to display.
 * @param primaryColor - The primary color for text and accents.
 * @param secondaryColor - The background color for the logo block.
 * @param size - The overall size of the logo, in pixels or percentage.
 * @param tagline - Optional tagline text to display below the logo.
 * @returns A React element representing the standard logo variant.
 */
function renderStandardVariant(
  faction: FactionId, 
  primaryColor: string, 
  secondaryColor: string, 
  size: number | string, 
  tagline: string | null
) {
  // Convert size to number for calculations if it's not a percentage
  const numSize = typeof size === "string" && size.includes("%") 
    ? parseInt(size) 
    : Number(size);
  
  return (
    <div className="logo-standard flex flex-col items-center">
      {/* Logo content - placeholder for actual logo implementation */}
      <div 
        className="logo-main"
        style={{ 
          color: primaryColor,
          backgroundColor: secondaryColor,
          width: size,
          height: typeof numSize === "number" ? numSize * 0.8 : size,
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold"
        }}
      >
        {faction.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </div>
      
      {/* Tagline */}
      {tagline && (
        <div 
          className="tagline mt-1 text-center"
          style={{ 
            color: primaryColor,
            fontSize: typeof numSize === "number" ? `${numSize * 0.1}px` : "10px",
            fontWeight: "500",
            letterSpacing: "0.05em"
          }}
        >
          {tagline}
        </div>
      )}
    </div>
  );
}

/**
 * Renders a horizontal logo variant with an icon, faction name, and optional tagline.
 *
 * @param faction - The faction identifier to display.
 * @param primaryColor - The primary color used for text and icon foreground.
 * @param secondaryColor - The secondary color used for the icon background.
 * @param size - The overall size of the logo in pixels or percentage.
 * @param tagline - Optional tagline text to display below the faction name.
 *
 * @returns A React element representing the horizontal logo variant.
 */
function renderHorizontalVariant(
  faction: FactionId, 
  primaryColor: string, 
  secondaryColor: string, 
  size: number | string, 
  tagline: string | null
) {
  // Convert size to number for calculations if it's not a percentage
  const numSize = typeof size === "string" && size.includes("%") 
    ? parseInt(size) 
    : Number(size);
  
  return (
    <div className="logo-horizontal flex items-center">
      {/* Logo icon */}
      <div 
        className="logo-icon"
        style={{ 
          color: primaryColor,
          backgroundColor: secondaryColor,
          width: typeof numSize === "number" ? numSize * 0.8 : size,
          height: typeof numSize === "number" ? numSize * 0.8 : size,
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold"
        }}
      >
        {faction.charAt(0).toUpperCase()}
      </div>
      
      {/* Name and tagline */}
      <div className="ml-2 flex flex-col">
        <div 
          className="faction-name"
          style={{ 
            color: primaryColor,
            fontSize: typeof numSize === "number" ? `${numSize * 0.25}px` : "16px",
            fontWeight: "bold",
            lineHeight: "1"
          }}
        >
          {faction.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </div>
        
        {/* Tagline */}
        {tagline && (
          <div 
            className="tagline-horizontal"
            style={{ 
              color: primaryColor,
              fontSize: typeof numSize === "number" ? `${numSize * 0.08}px` : "8px",
              fontWeight: "500",
              letterSpacing: "0.05em",
              marginTop: "2px"
            }}
          >
            {tagline}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Renders a vertical logo variant with an icon, faction name, and optional tagline.
 *
 * @param faction - The faction identifier to display.
 * @param primaryColor - The primary color used for text and icon foreground.
 * @param secondaryColor - The secondary color used for the icon background.
 * @param size - The overall size of the logo, in pixels or percentage.
 * @param tagline - Optional tagline text to display below the faction name.
 *
 * @returns A React element representing the vertical logo variant.
 */
function renderVerticalVariant(
  faction: FactionId, 
  primaryColor: string, 
  secondaryColor: string, 
  size: number | string, 
  tagline: string | null
) {
  // Convert size to number for calculations if it's not a percentage
  const numSize = typeof size === "string" && size.includes("%") 
    ? parseInt(size) 
    : Number(size);
  
  return (
    <div className="logo-vertical flex flex-col items-center">
      {/* Logo icon */}
      <div 
        className="logo-icon"
        style={{ 
          color: primaryColor,
          backgroundColor: secondaryColor,
          width: size,
          height: typeof numSize === "number" ? numSize * 0.6 : size,
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold"
        }}
      >
        {faction.charAt(0).toUpperCase()}
      </div>
      
      {/* Faction name */}
      <div 
        className="faction-name mt-2 text-center"
        style={{ 
          color: primaryColor,
          fontSize: typeof numSize === "number" ? `${numSize * 0.15}px` : "12px",
          fontWeight: "bold"
        }}
      >
        {faction.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </div>
      
      {/* Tagline */}
      {tagline && (
        <div 
          className="tagline-vertical text-center"
          style={{ 
            color: primaryColor,
            fontSize: typeof numSize === "number" ? `${numSize * 0.09}px` : "8px",
            fontWeight: "500",
            letterSpacing: "0.05em",
            marginTop: "2px"
          }}
        >
          {tagline}
        </div>
      )}
    </div>
  );
}

/**
 * Renders a square icon logo displaying the first letter of the specified faction.
 *
 * The icon uses the provided primary color for the letter and secondary color for the background, with size and styling determined by the input parameters.
 */
function renderIconVariant(
  faction: FactionId, 
  primaryColor: string, 
  secondaryColor: string, 
  size: number | string
) {
  return (
    <div 
      className="logo-icon"
      style={{ 
        color: primaryColor,
        backgroundColor: secondaryColor,
        width: size,
        height: size,
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold"
      }}
    >
      {faction.charAt(0).toUpperCase()}
    </div>
  );
}

/**
 * Renders a minimal logo variant displaying the first letter of the faction in the primary color.
 *
 * @param faction - The faction identifier whose initial is shown.
 * @param primaryColor - The main color used for the letter.
 * @param secondaryColor - Unused in this variant.
 * @param size - The width and height of the logo, as a number (pixels) or string (e.g., percentage).
 * @returns A React element representing the minimal logo.
 */
function renderMinimalVariant(
  faction: FactionId, 
  primaryColor: string, 
  secondaryColor: string, 
  size: number | string
) {
  return (
    <div 
      className="logo-minimal"
      style={{ 
        color: primaryColor,
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: typeof size === "number" ? `${size * 0.5}px` : "24px"
      }}
    >
      {faction.charAt(0).toUpperCase()}
    </div>
  );
}