import { FactionId } from "../utils";

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
export function renderStandardVariant(
  faction: FactionId, 
  primaryColor: string, 
  secondaryColor: string, 
  size: number | string, 
  tagline: string | null
) {
  // Convert size to number for calculations if it's not a percentage
  const numSize =
    typeof size === "number"
      ? size
      : typeof size === "string"
        ? parseFloat(size) || 0   // handles "80", "80px", "80%"
        : 0;
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