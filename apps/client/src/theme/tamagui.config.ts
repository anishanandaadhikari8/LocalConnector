import { createTamagui } from 'tamagui'
import { createInterFont } from '@tamagui/fonts'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/themes'
import { createMedia } from '@tamagui/react-native-media-driver'

const interFont = createInterFont({
  family: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 40,
    10: 48,
    11: 64,
    12: 80,
  },
  lineHeight: {
    1: 16,
    2: 18,
    3: 24,
    4: 26,
    5: 28,
    6: 32,
    7: 36,
    8: 40,
    9: 48,
    10: 56,
    11: 72,
    12: 96,
  },
  weight: {
    4: '300',
    6: '400',
    7: '500',
    8: '600',
    9: '700',
    10: '800',
  },
  letterSpacing: {
    4: 0,
    8: -0.01,
    10: -0.02,
  },
})

const config = createTamagui({
  defaultFont: 'body',
  fonts: {
    heading: interFont,
    body: interFont,
  },
  themes: {
    light: {
      background: '#FFFFFF',
      backgroundHover: '#F6F7FB',
      backgroundPress: '#F1F5F9',
      backgroundFocus: '#F0F4FF',
      borderColor: '#E5E8F0',
      color: '#111318',
      colorHover: '#4B5563',
      colorPress: '#9CA3AF',
      colorFocus: '#6C8CFF',
      placeholderColor: '#9CA3AF',
    },
    dark: {
      background: '#111318',
      backgroundHover: '#1F2937',
      backgroundPress: '#374151',
      backgroundFocus: '#1F2937',
      borderColor: '#374151',
      color: '#FFFFFF',
      colorHover: '#E5E7EB',
      colorPress: '#9CA3AF',
      colorFocus: '#6C8CFF',
      placeholderColor: '#6B7280',
    },
  },
  tokens: {
    ...tokens,
    color: {
      ...tokens.color,
      primary: '#6C8CFF',
      primaryHover: '#5A6FD9',
      primaryPress: '#4A5BB3',
      accent: '#4CC38A',
      accentHover: '#22C55E',
      accentPress: '#16A34A',
      warning: '#FFC857',
      warningHover: '#F59E0B',
      warningPress: '#D97706',
      danger: '#FF6B6B',
      dangerHover: '#DC2626',
      dangerPress: '#B91C1C',
      success: '#10B981',
      info: '#54A6FF',
      error: '#EF4444',
    },
    space: {
      $xs: 4,
      $sm: 8,
      $md: 16,
      $lg: 24,
      $xl: 32,
      $xxl: 48,
      $xxxl: 64,
    },
    size: {
      $xs: 4,
      $sm: 8,
      $md: 16,
      $lg: 24,
      $xl: 32,
      $xxl: 48,
      $xxxl: 64,
    },
    radius: {
      $sm: 8,
      $md: 12,
      $lg: 14,
      $xl: 20,
      $full: 9999,
    },
    zIndex: {
      $0: 0,
      $1: 100,
      $2: 200,
      $3: 300,
      $4: 400,
      $5: 500,
    },
  },
  shorthands,
  media: createMedia({
    xs: { maxWidth: 640 },
    sm: { maxWidth: 768 },
    md: { maxWidth: 1024 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1536 },
    xxl: { minWidth: 1536 },
    gtXs: { minWidth: 640 + 1 },
    gtSm: { minWidth: 768 + 1 },
    gtMd: { minWidth: 1024 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
})

export type AppConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config
