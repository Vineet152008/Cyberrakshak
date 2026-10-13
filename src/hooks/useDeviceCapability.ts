import { useState, useEffect } from 'react';

export interface DeviceCapabilities {
  prefersReducedMotion: boolean;
  isTouchDevice: boolean;
  isLowPower: boolean;
  isCalmMode: boolean;
  canUsePointerEffects: boolean;
}

export function useDeviceCapability(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>(() => {
    if (typeof window === 'undefined') {
      return {
        prefersReducedMotion: false,
        isTouchDevice: false,
        isLowPower: false,
        isCalmMode: false,
        canUsePointerEffects: true,
      };
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const touch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    const lowPower = (navigator.hardwareConcurrency || 4) <= 4;
    const calm = document.body.classList.contains('calm-mode');

    return {
      prefersReducedMotion: reducedMotion,
      isTouchDevice: touch,
      isLowPower: lowPower,
      isCalmMode: calm,
      canUsePointerEffects: !reducedMotion && !touch && !calm,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const touchQuery = window.matchMedia('(pointer: coarse)');

    const updateCapabilities = () => {
      const reducedMotion = motionQuery.matches;
      const touch = touchQuery.matches || 'ontouchstart' in window;
      const lowPower = (navigator.hardwareConcurrency || 4) <= 4;
      const calm = document.body.classList.contains('calm-mode');

      setCapabilities({
        prefersReducedMotion: reducedMotion,
        isTouchDevice: touch,
        isLowPower: lowPower,
        isCalmMode: calm,
        canUsePointerEffects: !reducedMotion && !touch && !calm,
      });
    };

    motionQuery.addEventListener('change', updateCapabilities);
    touchQuery.addEventListener('change', updateCapabilities);

    // Observer for calm-mode class changes on body
    const observer = new MutationObserver(() => {
      updateCapabilities();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => {
      motionQuery.removeEventListener('change', updateCapabilities);
      touchQuery.removeEventListener('change', updateCapabilities);
      observer.disconnect();
    };
  }, []);

  return capabilities;
}
