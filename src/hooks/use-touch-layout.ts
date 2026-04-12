import { useEffect, useState } from 'react';

const TOUCH_LAYOUT_QUERY = '(hover: none), (pointer: coarse), (max-width: 767px)';

const getTouchLayout = () => {
  if (typeof window === 'undefined') return false;

  const hasTouchPoints =
    typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0;

  return window.matchMedia(TOUCH_LAYOUT_QUERY).matches || hasTouchPoints;
};

export const useTouchLayout = () => {
  const [isTouchLayout, setIsTouchLayout] = useState(getTouchLayout);

  useEffect(() => {
    const mediaQuery = window.matchMedia(TOUCH_LAYOUT_QUERY);
    const updateLayout = () => setIsTouchLayout(getTouchLayout());

    updateLayout();
    mediaQuery.addEventListener('change', updateLayout);
    window.addEventListener('resize', updateLayout);
    window.addEventListener('orientationchange', updateLayout);

    return () => {
      mediaQuery.removeEventListener('change', updateLayout);
      window.removeEventListener('resize', updateLayout);
      window.removeEventListener('orientationchange', updateLayout);
    };
  }, []);

  return isTouchLayout;
};
