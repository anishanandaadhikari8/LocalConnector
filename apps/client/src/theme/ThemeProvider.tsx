import React, { useEffect } from 'react';

export function ThemeProvider({ theme = 'light', children }:{ theme?: 'light'|'dark'; children: React.ReactNode }) {
  useEffect(() => {
    try { document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light'); } catch {}
  }, [theme]);
  return <>{children}</>;
}


