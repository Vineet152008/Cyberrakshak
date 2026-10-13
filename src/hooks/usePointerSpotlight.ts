import { useEffect } from 'react';

/**
 * usePointerSpotlight
 * Drives global background spotlight using requestAnimationFrame and CSS variables.
 * Absolutely NO React state is updated on pointer moves - guaranteed zero re-render overhead.
 * Automatically pauses when document.hidden is true, or if reduced-motion/calm-mode is active.
 */
export function usePointerSpotlight(enabled = true): void {
  useEffect(() => {
    if (typeof window === 'undefined' || !enabled) return;

    // Check prefers-reduced-motion or coarse pointer
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isCoarse || isReduced) return;

    let targetX = window.innerWidth / 2;
    let targetY = 240;
    let currentX = targetX;
    let currentY = targetY;
    let rafId: number | null = null;
    let isMoving = false;

    const rootStyle = document.documentElement.style;

    const updatePosition = () => {
      if (document.hidden) {
        rafId = null;
        return;
      }

      // Smooth lerp (linear interpolation) for refined physical glide
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      rootStyle.setProperty('--spotlight-x', `${currentX.toFixed(1)}px`);
      rootStyle.setProperty('--spotlight-y', `${currentY.toFixed(1)}px`);

      const dist = Math.abs(targetX - currentX) + Math.abs(targetY - currentY);
      if (dist > 0.5) {
        rafId = requestAnimationFrame(updatePosition);
      } else {
        rafId = null;
        isMoving = false;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isMoving) {
        isMoving = true;
        rafId = requestAnimationFrame(updatePosition);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
        isMoving = false;
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [enabled]);
}
