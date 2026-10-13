import React, { useRef, useEffect } from 'react';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';

export const HeroShield: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shieldRef = useRef<SVGSVGElement | null>(null);
  const { prefersReducedMotion } = useDeviceCapability();

  useEffect(() => {
    const container = containerRef.current;
    const shield = shieldRef.current;
    if (!container || !shield || prefersReducedMotion) return;

    let rafId: number | null = null;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let targetGlowX = 50;
    let targetGlowY = 50;
    let currentGlowX = 50;
    let currentGlowY = 50;

    // Cache rect on pointerenter / resize, NOT on every pointermove frame
    let cachedRect: DOMRect | null = null;

    const measureRect = () => {
      cachedRect = container.getBoundingClientRect();
    };

    const maxTilt = 12; // 12 degrees max tilt

    const updateTilt = () => {
      currentRotateX += (targetRotateX - currentRotateX) * 0.12;
      currentRotateY += (targetRotateY - currentRotateY) * 0.12;
      currentGlowX += (targetGlowX - currentGlowX) * 0.12;
      currentGlowY += (targetGlowY - currentGlowY) * 0.12;

      shield.style.transform = `perspective(800px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg)`;
      container.style.setProperty('--shield-glow-x', `${currentGlowX.toFixed(1)}%`);
      container.style.setProperty('--shield-glow-y', `${currentGlowY.toFixed(1)}%`);

      const moving =
        Math.abs(targetRotateX - currentRotateX) > 0.04 ||
        Math.abs(targetRotateY - currentRotateY) > 0.04;

      if (moving) {
        rafId = requestAnimationFrame(updateTilt);
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

      const x = e.clientX - cachedRect.left;
      const y = e.clientY - cachedRect.top;

      const normX = (x / cachedRect.width) * 2 - 1;
      const normY = (y / cachedRect.height) * 2 - 1;

      targetRotateY = normX * maxTilt;
      targetRotateX = -normY * maxTilt;

      targetGlowX = (x / cachedRect.width) * 100;
      targetGlowY = (y / cachedRect.height) * 100;

      if (!rafId) {
        rafId = requestAnimationFrame(updateTilt);
      }
    };

    const handlePointerLeave = () => {
      targetRotateX = 0;
      targetRotateY = 0;
      targetGlowX = 50;
      targetGlowY = 50;
      cachedRect = null;

      if (!rafId) {
        rafId = requestAnimationFrame(updateTilt);
      }
    };

    container.addEventListener('pointerenter', handlePointerEnter, { passive: true });
    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    window.addEventListener('resize', measureRect, { passive: true });

    return () => {
      container.removeEventListener('pointerenter', handlePointerEnter);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', measureRect);
      if (rafId) cancelAnimationFrame(rafId);
      shield.style.transform = '';
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center p-6 md:p-10 select-none"
      style={{
        '--shield-glow-x': '50%',
        '--shield-glow-y': '50%',
      } as React.CSSProperties}
      aria-label="Interactive CyberRakshak Shield of Protection"
    >
      {/* Dynamic ambient back-glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-72 w-72 md:h-96 md:w-96 rounded-full blur-3xl opacity-35 transition-opacity"
        style={{
          background: `radial-gradient(circle at var(--shield-glow-x, 50%) var(--shield-glow-y, 50%), rgba(201,169,110,0.5), rgba(56,189,248,0.2) 60%, transparent 80%)`,
        }}
      />

      {/* SVG Security Shield */}
      <svg
        ref={shieldRef}
        viewBox="0 0 320 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-64 h-76 md:w-80 md:h-96 drop-shadow-[0_12px_32px_rgba(7,11,20,0.8)] transition-transform duration-75 will-change-transform"
      >
        <defs>
          <linearGradient id="shieldBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E4D1A8" />
            <stop offset="50%" stopColor="#C9A96E" />
            <stop offset="100%" stopColor="#785F33" />
          </linearGradient>

          <linearGradient id="shieldPlateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#131B2E" />
            <stop offset="45%" stopColor="#0D1322" />
            <stop offset="100%" stopColor="#070B14" />
          </linearGradient>
        </defs>

        <path
          d="M160 16 L284 68 C284 212, 212 308, 160 360 C108 308, 36 212, 36 68 Z"
          fill="url(#shieldPlateGrad)"
          stroke="url(#shieldBorderGrad)"
          strokeWidth="2.5"
        />

        <path
          d="M160 30 L270 78 C270 200, 204 286, 160 338 C116 286, 50 200, 50 78 Z"
          fill="none"
          stroke="rgba(201, 169, 110, 0.3)"
          strokeWidth="1.2"
          strokeDasharray="4 2"
        />

        <path
          d="M160 64 L244 102 C244 196, 192 262, 160 300 C128 262, 76 196, 76 102 Z"
          fill="rgba(7, 11, 20, 0.65)"
          stroke="rgba(56, 189, 248, 0.4)"
          strokeWidth="1.5"
        />

        <circle
          cx="160"
          cy="180"
          r="48"
          stroke="url(#shieldBorderGrad)"
          strokeWidth="1.5"
          fill="rgba(13, 19, 34, 0.85)"
        />

        <circle
          cx="160"
          cy="180"
          r="38"
          stroke="rgba(56, 189, 248, 0.35)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        <line x1="160" y1="134" x2="160" y2="226" stroke="rgba(201, 169, 110, 0.25)" strokeWidth="1" />
        <line x1="114" y1="180" x2="206" y2="180" stroke="rgba(201, 169, 110, 0.25)" strokeWidth="1" />

        <rect x="146" y="172" width="28" height="22" rx="3" fill="#C9A96E" />
        <path
          d="M152 172 V163 C152 158.6, 155.6 155, 160 155 C164.4 155, 168 158.6, 168 163 V172"
          stroke="#C9A96E"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="160" cy="182" r="2.5" fill="#070B14" />
        <line x1="160" y1="184.5" x2="160" y2="189" stroke="#070B14" strokeWidth="2" strokeLinecap="round" />

        <circle cx="160" cy="46" r="3" fill="#C9A96E" />
        <circle cx="215" cy="80" r="2.5" fill="#38BDF8" />
        <circle cx="105" cy="80" r="2.5" fill="#38BDF8" />
        <circle cx="240" cy="150" r="2.5" fill="#C9A96E" />
        <circle cx="80" cy="150" r="2.5" fill="#C9A96E" />
        <circle cx="205" cy="245" r="2.5" fill="#38BDF8" />
        <circle cx="115" cy="245" r="2.5" fill="#38BDF8" />
        <circle cx="160" cy="320" r="3" fill="#C9A96E" />
      </svg>
    </div>
  );
};
