import { FactionId } from "../utils";

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
export function renderHorizontalVariant(
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