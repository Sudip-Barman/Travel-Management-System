import { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

/**
 * Centralized Browser-Style Route Scroll Restoration
 * 
 * Accurately distinguishes between navigation types:
 * - PUSH: Navigating to a new route -> defaults to the very top (scrollY = 0)
 * - POP: Browser Back / Forward -> restores the exact previous position associated with that history entry
 * - HASH: Anchor link targeting (e.g. /explore#packages or #destinations) -> scrolls to requested anchor section
 */
export const ScrollRestoration = () => {
  const { navAction } = useApp();
  const activeRestorationTimer = useRef(null);

  useEffect(() => {
    // Disable browser's native automatic scroll restoration so our centralized
    // system has full deterministic control over exact coordinates.
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (!navAction) return;

    if (activeRestorationTimer.current) {
      clearTimeout(activeRestorationTimer.current);
      activeRestorationTimer.current = null;
    }

    const { type, hash, targetScroll } = navAction;

    // Helper: Scroll to element matching target hash
    const scrollToTargetHash = (targetHash) => {
      if (!targetHash) return false;
      const rawId = targetHash.replace(/^#/, '');
      const element = document.getElementById(rawId) || document.querySelector(targetHash);
      if (element) {
        const headerOffset = 84; // Offset for sticky navigation header
        const elementPosition = element.getBoundingClientRect().top;
        const targetTop = Math.max(0, elementPosition + window.pageYOffset - headerOffset);
        
        window.scrollTo({
          top: targetTop,
          left: 0,
          behavior: 'instant'
        });
        return true;
      }
      return false;
    };

    if (type === 'HASH' || (type === 'PUSH' && hash)) {
      // =========================================================================
      // 1. HASH / ANCHOR NAVIGATION: Navigate to exact target section
      // =========================================================================
      const targetHash = hash || window.location.hash;
      if (!scrollToTargetHash(targetHash)) {
        // Retry on next frames in case component is rendering / mounting
        requestAnimationFrame(() => {
          if (!scrollToTargetHash(targetHash)) {
            activeRestorationTimer.current = setTimeout(() => {
              scrollToTargetHash(targetHash);
            }, 60);
          }
        });
      }
    } else if (type === 'POP') {
      // =========================================================================
      // 2. POP NAVIGATION: Browser Back / Forward -> Restore exact saved scroll position
      // =========================================================================
      const targetY = targetScroll?.y ?? 0;
      const targetX = targetScroll?.x ?? 0;

      const performRestore = () => {
        window.scrollTo({
          top: targetY,
          left: targetX,
          behavior: 'instant'
        });
      };

      // Immediate attempt
      performRestore();

      // Subsequent frame attempts to ensure layout/images have calculated heights
      requestAnimationFrame(performRestore);
      activeRestorationTimer.current = setTimeout(performRestore, 40);
    } else {
      // =========================================================================
      // 3. PUSH NAVIGATION: Genuinely new route -> Default to top (0, 0)
      // =========================================================================
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }

    return () => {
      if (activeRestorationTimer.current) {
        clearTimeout(activeRestorationTimer.current);
      }
    };
  }, [navAction]);

  return null;
};
