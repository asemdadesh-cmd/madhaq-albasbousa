import { useEffect, useRef, useState } from 'react';

export const reducedMotion = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** A tiny haptic tick on phones that support it (most Android). Silent everywhere else. */
export function tap(ms = 8) {
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator && matchMedia('(pointer: coarse)').matches) {
      navigator.vibrate(ms);
    }
  } catch {
    /* not supported — fine */
  }
}

const easeOutBack = (t: number) => {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2;
};
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/** Animates a number towards `target` (sizes, prices). Jumps straight there when motion is reduced. */
export function useTween(target: number, duration = 650, bouncy = false): number {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  const raf = useRef(0);

  useEffect(() => {
    if (reducedMotion()) {
      from.current = target;
      setValue(target);
      return;
    }
    const start = performance.now();
    const origin = from.current;
    const ease = bouncy ? easeOutBack : easeOutCubic;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const v = origin + (target - origin) * ease(t);
      from.current = v;
      setValue(v);
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration, bouncy]);

  return value;
}

/**
 * The product photo lifts off and arcs into the basket, which then gives a little bounce.
 * Purely decorative: the cart is already updated before this runs.
 */
export function flyToCart(source: HTMLImageElement | null) {
  const target = document.querySelector<HTMLElement>('.cart-bar-btn') ?? document.querySelector<HTMLElement>('.bag-btn');
  if (!target) return;
  const bump = () => {
    target.classList.remove('bump');
    void target.offsetWidth;
    target.classList.add('bump');
  };
  if (!source || reducedMotion() || !source.currentSrc) {
    bump();
    return;
  }
  const from = source.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  const size = Math.min(from.width * 0.42, 132);
  const ghost = document.createElement('img');
  ghost.src = source.currentSrc;
  ghost.alt = '';
  ghost.className = 'fly-ghost';
  // A manual popover sits in the top layer, so the flight shows above the closing product sheet.
  ghost.setAttribute('popover', 'manual');
  Object.assign(ghost.style, {
    width: `${size}px`,
    height: `${size}px`,
    left: `${from.left + from.width / 2 - size / 2}px`,
    top: `${from.top + from.height / 2 - size / 2}px`,
  });
  document.body.appendChild(ghost);
  try {
    ghost.showPopover();
  } catch {
    /* older browser: falls back to a high z-index */
  }
  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);
  const end = 30 / size;
  const anim = ghost.animate(
    [
      { transform: 'translate(0, 0) scale(0.5)', opacity: 0 },
      { transform: 'translate(0, -14px) scale(1.06)', opacity: 1, offset: 0.18 },
      { transform: `translate(${dx * 0.45}px, ${dy * 0.45 - 70}px) scale(0.72) rotate(-10deg)`, opacity: 1, offset: 0.58 },
      { transform: `translate(${dx}px, ${dy}px) scale(${end}) rotate(-18deg)`, opacity: 0.5 },
    ],
    { duration: 900, easing: 'cubic-bezier(0.45, 0, 0.2, 1)' },
  );
  anim.onfinish = () => {
    ghost.remove();
    bump();
    tap(14);
  };
}
