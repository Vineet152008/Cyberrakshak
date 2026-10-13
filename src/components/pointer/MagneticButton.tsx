import React, { useRef, useEffect } from 'react';
import { useDeviceCapability } from '../../hooks/useDeviceCapability';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  strength?: number;
  radius?: number;
  children: React.ReactNode;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  variant = 'primary',
  strength = 0.22,
  radius = 60,
  children,
  className = '',
  onClick,
  ...rest
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { canUsePointerEffects } = useDeviceCapability();

  useEffect(() => {
    const el = buttonRef.current;
    if (!el || !canUsePointerEffects) return;

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const update = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;

      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;

      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        rafId = requestAnimationFrame(update);
      } else {
        rafId = null;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
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
      if (!rafId) {
        rafId = requestAnimationFrame(update);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    el.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
      el.style.transform = '';
    };
  }, [canUsePointerEffects, strength, radius]);

  const variantStyles = {
    primary:
      'bg-[#C9A96E] text-[#070B14] font-semibold hover:bg-[#E4D1A8] shadow-[0_0_20px_rgba(201,169,110,0.22)] active:scale-[0.98]',
    secondary:
      'bg-[#0D1322] text-[#F8FAFC] border border-[rgba(201,169,110,0.35)] hover:border-[#C9A96E] hover:bg-[#131B2E] active:scale-[0.98]',
    danger:
      'bg-[#F43F5E] text-[#FFFFFF] font-semibold hover:bg-[#E11D48] shadow-[0_0_20px_rgba(244,63,94,0.25)] active:scale-[0.98]',
    ghost:
      'bg-transparent text-[#CBD5E1] hover:text-[#F8FAFC] hover:bg-[#131B2E]/60 active:scale-[0.98]',
  };

  return (
    <button
      ref={buttonRef}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-medium transition-[background-color,border-color,box-shadow,color] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A96E] disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};
