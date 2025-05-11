"use client";

// Import the actual component implementations
import LogoSystemImpl from './logo-system';
import LogoVariantImpl from './logo-variant';
import LogoErrorImpl from './logo-error';
import LogoLoadingImpl from './logo-loading';
import LogoAnimationPresetsImpl from './logo-animation-presets';
import LogoUsageGuideImpl from './logo-usage-guide';

// Create the exports that match exactly what the importing files expect
const LogoSystem = LogoSystemImpl;
const LogoVariant = LogoVariantImpl;
const LogoError = LogoErrorImpl;
const LogoLoading = LogoLoadingImpl;
const LogoAnimationPresets = LogoAnimationPresetsImpl;
const LogoUsageGuide = LogoUsageGuideImpl;

// Export the components by name
export {
  LogoSystem,
  LogoVariant,
  LogoError,
  LogoLoading,
  LogoAnimationPresets,
  LogoUsageGuide
};

// Also export as default for backwards compatibility
export default LogoSystem;

// Export types
export { LogoSize, LogoVariant as LogoVariantType, LogoVariantProps } from './logo-variant';
export { LogoSystemProps } from './logo-system';
export { LogoAnimationPreset } from './logo-animation-presets';

// Export utilities
export * from './utils';