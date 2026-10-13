import React, { useRef, useEffect } from 'react';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt degrees (default 6deg)
  asButton?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 6,
  asButton = false,
  ...rest
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { prefersReducedMotion } = useDeviceCapability();

  useEffect(() => {
    const card = cardRef.current;
    if (!card || prefersReducedMotion) return;

    let rafId: number | null = null;
    let targetRx = 0;
    let targetRy = 0;
    let currentRx = 0;
    let currentRy = 0;
    let glareX = 50;
    let glareY = 50;
    let glareOpacity = 0;
    let currentGlareOpacity = 0;

    // Cache bounding client rect on pointerenter / resize, NOT on every pointermove frame!
    let cachedRect: DOMRect | null = null;

    const measureRect = () => {
      cachedRect = card.getBoundingClientRect();
    };

    const updateTilt = () => {
      currentRx += (targetRx - currentRx) * 0.15;
      currentRy += (targetRy - currentRy) * 0.15;
      currentGlareOpacity += (glareOpacity - currentGlareOpacity) * 0.15;

      card.style.setProperty('--card-rx', `${currentRx.toFixed(2)}deg`);
      card.style.setProperty('--card-ry', `${currentRy.toFixed(2)}deg`);
      card.style.setProperty('--glare-x', `${glareX.toFixed(1)}%`);
      card.style.setProperty('--glare-y', `${glareY.toFixed(1)}%`);
      card.style.setProperty('--glare-opacity', `${currentGlareOpacity.toFixed(3)}`);

      const stillMoving =
        Math.abs(targetRx - currentRx) > 0.05 ||
        Math.abs(targetRy - currentRy) > 0.05 ||
        Math.abs(glareOpacity - currentGlareOpacity) > 0.01;

      if (stillMoving) {
        rafId = requestAnimationFrame(updateTilt);
      } else {
        rafId = null;
      }
    };

    const handlePointerEnter = (e: PointerEvent) => {
      // Disallow 3D tilt if interaction is touch-driven (pointerType === 'touch')
      if (e.pointerType === 'touch') return;
      measureRect();
    };

    const handlePointerMove = (e: PointerEvent) => {
      // Respect per-interaction touch check so touchscreen laptops work cleanly with trackpad/mouse
      if (e.pointerType === 'touch') return;
      if (!cachedRect) measureRect();
      if (!cachedRect || cachedRect.width === 0) return;

      const x = e.clientX - cachedRect.left;
      const y = e.clientY - cachedRect.top;

      const normX = (x / cachedRect.width) * 2 - 1; // -1 to 1
      const normY = (y / cachedRect.height) * 2 - 1; // -1 to 1

      targetRy = normX * maxTilt;
      targetRx = -normY * maxTilt;

      glareX = (x / cachedRect.width) * 100;
      glareY = (y / cachedRect.height) * 100;
      glareOpacity = 0.14;

      if (!rafId) {
        rafId = requestAnimationFrame(updateTilt);
      }
    };

    const handlePointerLeave = () => {
      targetRx = 0;
      targetRy = 0;
      glareOpacity = 0;
      cachedRect = null;
      if (!rafId) {
        rafId = requestAnimationFrame(updateTilt);
      }
    };

    card.addEventListener('pointerenter', handlePointerEnter, { passive: true });
    card.addEventListener('pointermove', handlePointerMove, { passive: true });
    card.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    window.addEventListener('resize', measureRect, { passive: true });

    return () => {
      card.removeEventListener('pointerenter', handlePointerEnter);
      card.removeEventListener('pointermove', handlePointerMove);
      card.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', measureRect);
      if (rafId) cancelAnimationFrame(rafId);
      card.style.removeProperty('--card-rx');
      card.style.removeProperty('--card-ry');
      card.style.removeProperty('--glare-x');
      card.style.removeProperty('--glare-y');
      card.style.removeProperty('--glare-opacity');
    };
  }, [prefersReducedMotion, maxTilt]);

  return (
    <div
      ref={cardRef}
      style={{
        transform: prefersReducedMotion
          ? undefined
          : 'perspective(1000px) rotateX(var(--card-rx, 0deg)) rotateY(var(--card-ry, 0deg))',
        transformStyle: 'preserve-3d',
      }}
      className={`relative rounded-xl border border-[rgba(201,169,110,0.18)] bg-[#0D1322] p-6 text-[#F8FAFC] transition-[border-color,background-color] hover:border-[rgba(201,169,110,0.4)] ${className}`}
      role={asButton ? 'button' : undefined}
      tabIndex={asButton ? 0 : undefined}
      {...rest}
    >
      {!prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden transition-opacity"
          style={{
            background: `radial-gradient(circle 280px at var(--glare-x, 50%) var(--glare-y, 50%), rgba(201,169,110, var(--glare-opacity, 0)), transparent 80%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
