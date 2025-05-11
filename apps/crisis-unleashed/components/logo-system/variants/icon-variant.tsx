import { FactionId } from "../utils";

/**
 * Renders a square icon logo displaying the first letter of the specified faction.
 *
 * The icon uses the provided primary color for the letter and secondary color for the background, with size and styling determined by the input parameters.
 */
export function renderIconVariant(
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