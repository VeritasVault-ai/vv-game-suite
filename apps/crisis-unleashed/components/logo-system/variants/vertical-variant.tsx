import { FactionId } from "../utils";

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
export function renderVerticalVariant(
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