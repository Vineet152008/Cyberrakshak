import { useRef, useEffect } from 'react';
import { useDeviceCapability } from './useDeviceCapability';

export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(strength = 0.25, radius = 60) {
  const ref = useRef<T | null>(null);
  const { prefersReducedMotion } = useDeviceCapability();

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    // Cache rect on pointerenter / resize, NOT on every pointermove
    let cachedRect: DOMRect | null = null;

    const measureRect = () => {
      cachedRect = el.getBoundingClientRect();
    };

    const update = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        rafId = requestAnimationFrame(update);
      } else {
        rafId = null;
      }
    };

    const handlePointerEnter = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      measureRect();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      if (!cachedRect) measureRect();
      if (!cachedRect || cachedRect.width === 0) return;

      const centerX = cachedRect.left + cachedRect.width / 2;
      const centerY = cachedRect.top + cachedRect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.hypot(distX, distY);

      if (distance < radius) {
        targetX = distX * strength;
        targetY = distY * strength;
      } else {
        targetX = 0;
        targetY = 0;
      }

      if (!rafId) {
        rafId = requestAnimationFrame(update);
      }
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
      cachedRect = null;
      if (!rafId) {
        rafId = requestAnimationFrame(update);
      }
    };

    el.addEventListener('pointerenter', handlePointerEnter, { passive: true });
    el.addEventListener('pointermove', handlePointerMove, { passive: true });
    el.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('resize', measureRect, { passive: true });

    return () => {
      el.removeEventListener('pointerenter', handlePointerEnter);
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', measureRect);
      if (rafId) cancelAnimationFrame(rafId);
      el.style.transform = '';
    };
  }, [prefersReducedMotion, strength, radius]);

  return ref;
}
