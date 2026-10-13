import React from 'react';
import { usePointerSpotlight } from '../../hooks/usePointerSpotlight';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';

export const SpotlightCanvas: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { canUsePointerEffects } = useDeviceCapability();
  usePointerSpotlight(canUsePointerEffects);

  return (
    <>
      <div className="spotlight-overlay" aria-hidden="true" />
      {children}
    </>
  );
};
