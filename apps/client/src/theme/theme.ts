import { Platform } from 'react-native';
import { colors as fallbackColors } from './tokens';

function varOr(fallback: string, cssVar: string): string {
  if (Platform.OS === 'web') {
    return `var(${cssVar})`;
  }
  return fallback;
}

export const theme = {
  colors: {
    // Brand
    primary600: varOr(fallbackColors.primary, '--primary-600'),
    primary700: varOr('#4338CA', '--primary-700'),
    primary800: varOr('#3730A3', '--primary-800'),
    accent500: varOr(fallbackColors.accent, '--accent-500'),
    accent600: varOr('#059669', '--accent-600'),

    // Surfaces & ink
    surface0: varOr(fallbackColors.bg, '--surface-0'),
    surface50: varOr(fallbackColors.surface, '--surface-50'),
    surface100: varOr('#F3F4F6', '--surface-100'),
    ink700: varOr('#374151', '--ink-700'),
    ink800: varOr('#1F2937', '--ink-800'),
    ink900: varOr(fallbackColors.text, '--ink-900'),

    // Borders
    borderSubtle: varOr(fallbackColors.border, '--border-subtle'),
    borderStrong: varOr('#D1D5DB', '--border-strong'),

    // Roles
    infoBg: varOr('#EFF6FF', '--role-info-bg'),
    infoFg: varOr('#1D4ED8', '--role-info-fg'),
    infoBd: varOr('#BFDBFE', '--role-info-bd'),
    successBg: varOr('#ECFDF5', '--role-success-bg'),
    successFg: varOr('#047857', '--role-success-fg'),
    successBd: varOr('#A7F3D0', '--role-success-bd'),
    warningBg: varOr('#FFFBEB', '--role-warning-bg'),
    warningFg: varOr('#92400E', '--role-warning-fg'),
    warningBd: varOr('#FDE68A', '--role-warning-bd'),
    dangerBg: varOr('#FEF2F2', '--role-danger-bg'),
    dangerFg: varOr(fallbackColors.danger, '--role-danger-fg'),
    dangerBd: varOr('#FECACA', '--role-danger-bd'),
  },
};


