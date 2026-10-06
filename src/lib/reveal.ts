import { useEffect } from 'react';

/**
 * Soft fade-up for elements marked `data-reveal`. Content is visible without JS (pre-rendered HTML);
 * the effect only switches on once this runs, and never for visitors who prefer reduced motion.
 */
export function useReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute('data-shown', '');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    const watch = () =>
      document.querySelectorAll('[data-reveal]:not([data-shown])').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight && r.bottom > 0) el.setAttribute('data-shown', '');
        else io.observe(el);
      });
    watch();
    root.classList.add('reveal-on');
    // Cards re-render when the category or search changes; pick up the new ones.
    const mo = new MutationObserver(watch);
    mo.observe(document.getElementById('root') ?? document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
