export const tokens = {
  colors: {
    // Primary palette
    primary: {
      50: '#F0F4FF',
      100: '#E0E9FF',
      200: '#C7D6FF',
      300: '#A3BDFF',
      400: '#7A9EFF',
      500: '#6C8CFF', // Main primary
      600: '#5A6FD9',
      700: '#4A5BB3',
      800: '#3D4A8F',
      900: '#2F3A6B',
    },
    accent: {
      50: '#F0FDF4',
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#4CC38A', // Main accent
      500: '#22C55E',
      600: '#16A34A',
      700: '#15803D',
      800: '#166534',
      900: '#14532D',
    },
    warning: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      400: '#FFC857', // Main warning
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
      800: '#92400E',
      900: '#78350F',
    },
    danger: {
      50: '#FEF2F2',
      100: '#FEE2E2',
      200: '#FECACA',
      300: '#FCA5A5',
      400: '#F87171',
      500: '#FF6B6B', // Main danger
      600: '#DC2626',
      700: '#B91C1C',
      800: '#991B1B',
      900: '#7F1D1D',
    },
    // Neutral palette
    text: {
      primary: '#111318',
      secondary: '#4B5563',
      tertiary: '#9CA3AF',
      inverse: '#FFFFFF',
    },
    background: {
      primary: '#FFFFFF',
      secondary: '#F6F7FB',
      tertiary: '#F1F5F9',
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    border: {
      light: '#E5E8F0',
      medium: '#D1D5DB',
      dark: '#9CA3AF',
    },
    // Semantic colors
    success: '#10B981',
    info: '#54A6FF',
    error: '#EF4444',
  },
  
  typography: {
    h1: {
      fontSize: '40px',
      lineHeight: '48px',
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '28px',
      lineHeight: '36px',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '22px',
      lineHeight: '30px',
      fontWeight: 700,
      letterSpacing: '0em',
    },
    body: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: 400,
      letterSpacing: '0em',
    },
    caption: {
      fontSize: '13px',
      lineHeight: '18px',
      fontWeight: 400,
      letterSpacing: '0.01em',
    },
    small: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 400,
      letterSpacing: '0.01em',
    },
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },
  
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '14px',
    xl: '20px',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  
  transitions: {
    fast: '120ms ease-in-out',
    normal: '200ms ease-in-out',
    slow: '300ms ease-in-out',
  },
  
  breakpoints: {
    xs: '640px',
    sm: '768px',
    md: '1024px',
    lg: '1280px',
    xl: '1536px',
  },
} as const;

export type TokenType = typeof tokens;
