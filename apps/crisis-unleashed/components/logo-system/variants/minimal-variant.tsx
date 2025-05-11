import { FactionId } from "../utils";

/**
 * Renders a minimal logo variant displaying the first letter of the faction in the primary color.
 *
 * @param faction - The faction identifier whose initial is shown.
 * @param primaryColor - The main color used for the letter.
 * @param secondaryColor - Unused in this variant.
 * @param size - The width and height of the logo, as a number (pixels) or string (e.g., percentage).
 * @returns A React element representing the minimal logo.
 */
export function renderMinimalVariant(
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