import { Platform } from 'react-native';
import { colors as fallbackColors } from './tokens';

function varOr(fallback: string, cssVar: string): string {
  if (Platform.OS === 'web') {
    return `var(${cssVar})`;
  }
  return fallback;
}

// Centralized theme configuration - change colors here to update entire UI
const themeConfig = {
  // Primary brand colors
  primary: {
    50: '#F0F4FF',
    100: '#E0E7FF', 
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1',
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },
  
  // Accent colors
  accent: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E',
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },
  
  // Surface colors (backgrounds)
  surface: {
    0: '#FFFFFF',
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Text colors
  ink: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Border colors
  border: {
    subtle: '#E5E7EB',
    strong: '#D1D5DB',
    focus: '#4F46E5',
  },
  
  // Role-based colors
  role: {
    success: {
      bg: '#DCFCE7',
      fg: '#16A34A',
      border: '#BBF7D0',
    },
    warning: {
      bg: '#FEF3C7',
      fg: '#D97706',
      border: '#FDE68A',
    },
    danger: {
      bg: '#FEE2E2',
      fg: '#DC2626',
      border: '#FECACA',
    },
    info: {
      bg: '#DBEAFE',
      fg: '#2563EB',
      border: '#BFDBFE',
    },
  },
  
  // Semantic colors (for backward compatibility)
  success: {
    bg: '#DCFCE7',
    fg: '#16A34A',
  },
  warning: {
    bg: '#FEF3C7',
    fg: '#D97706',
  },
  danger: {
    bg: '#FEE2E2',
    fg: '#DC2626',
  },
  info: {
    bg: '#DBEAFE',
    fg: '#2563EB',
  },
};

// Generate theme with CSS variable support
export const theme = {
  colors: {
    // Primary colors
    primary: Object.fromEntries(
      Object.entries(themeConfig.primary).map(([key, value]) => [
        key,
        varOr(value, `--primary-${key}`)
      ])
    ),
    
    // Accent colors
    accent: Object.fromEntries(
      Object.entries(themeConfig.accent).map(([key, value]) => [
        key,
        varOr(value, `--accent-${key}`)
      ])
    ),
    
    // Surface colors
    surface: Object.fromEntries(
      Object.entries(themeConfig.surface).map(([key, value]) => [
        key,
        varOr(value, `--surface-${key}`)
      ])
    ),
    
    // Ink colors
    ink: Object.fromEntries(
      Object.entries(themeConfig.ink).map(([key, value]) => [
        key,
        varOr(value, `--ink-${key}`)
      ])
    ),
    
    // Border colors
    border: {
      subtle: varOr(themeConfig.border.subtle, '--border-subtle'),
      strong: varOr(themeConfig.border.strong, '--border-strong'),
      focus: varOr(themeConfig.border.focus, '--border-focus'),
    },
    
    // Role-based colors
    role: {
      success: {
        bg: varOr(themeConfig.role.success.bg, '--role-success-bg'),
        fg: varOr(themeConfig.role.success.fg, '--role-success-fg'),
        border: varOr(themeConfig.role.success.border, '--role-success-border'),
      },
      warning: {
        bg: varOr(themeConfig.role.warning.bg, '--role-warning-bg'),
        fg: varOr(themeConfig.role.warning.fg, '--role-warning-fg'),
        border: varOr(themeConfig.role.warning.border, '--role-warning-border'),
      },
      danger: {
        bg: varOr(themeConfig.role.danger.bg, '--role-danger-bg'),
        fg: varOr(themeConfig.role.danger.fg, '--role-danger-fg'),
        border: varOr(themeConfig.role.danger.border, '--role-danger-border'),
      },
      info: {
        bg: varOr(themeConfig.role.info.bg, '--role-info-bg'),
        fg: varOr(themeConfig.role.info.fg, '--role-info-fg'),
        border: varOr(themeConfig.role.info.border, '--role-info-border'),
      },
    },
    
    // Legacy semantic colors (for backward compatibility)
    successFg: varOr(themeConfig.success.fg, '--success-fg'),
    successBg: varOr(themeConfig.success.bg, '--success-bg'),
    warningFg: varOr(themeConfig.warning.fg, '--warning-fg'),
    warningBg: varOr(themeConfig.warning.bg, '--warning-bg'),
    dangerFg: varOr(themeConfig.danger.fg, '--danger-fg'),
    dangerBg: varOr(themeConfig.danger.bg, '--danger-bg'),
    infoFg: varOr(themeConfig.info.fg, '--info-fg'),
    infoBg: varOr(themeConfig.info.bg, '--info-bg'),
  },
  
  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Border radius
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  
  // Typography
  typography: {
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 28,
      '4xl': 32,
    },
    weights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
  },
  
  // Shadows
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
  },
};

// Export the config for easy theme customization
export { themeConfig };

// Helper function to get theme color with fallback
export const getThemeColor = (path: string, fallback?: string): string => {
  const keys = path.split('.');
  let value: any = theme.colors;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return fallback || '#000000';
    }
  }
  
  return value || fallback || '#000000';
};

// Helper function to create consistent button styles
export const buttonStyles = {
  primary: {
    backgroundColor: theme.colors.primary[700],
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center' as const,
  },
  secondary: {
    backgroundColor: theme.colors.surface[0],
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center' as const,
  },
  ghost: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center' as const,
  },
};

// Helper function to create consistent card styles
export const cardStyles = {
  default: {
    backgroundColor: theme.colors.surface[0],
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border.subtle,
    ...theme.shadows.sm,
  },
  elevated: {
    backgroundColor: theme.colors.surface[0],
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.md,
    ...theme.shadows.md,
  },
};


