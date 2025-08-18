// Apply default brand theme class to the document for web
try {
  const root = document.documentElement;
  root.classList.remove('theme-warm_sunset','theme-sage_forest','theme-executive_slate','theme-calm_indigo');
  // Default to Warm Sunset for this session
  root.classList.add('theme-warm_sunset');
} catch {}


