import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// Professional color palette inspired by top apps
const modernColors = {
  // Elegant neutral background
  background: '#f5f5f5',
  cardBackground: '#ffffff',
  surfaceVariant: '#fafafa',
  
  // Subtle primary colors
  primary: '#0284c7', // Soft blue like Twitter/LinkedIn
  primaryLight: '#38bdf8',
  primaryContainer: '#e0f2fe',
  
  // Refined secondary colors
  secondary: '#059669', // Muted green
  secondaryLight: '#10b981',
  secondaryContainer: '#d1fae5',
  
  // Subtle tertiary
  tertiary: '#7c3aed', // Soft purple
  tertiaryLight: '#a78bfa',
  tertiaryContainer: '#ede9fe',
  
  // Professional grays (inspired by Gmail/Slack)
  warmGray: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  
  // Status colors (subtle)
  error: '#dc2626',
  success: '#16a34a',
  warning: '#d97706',
  info: '#0284c7',
  
  // Connector type colors (muted, professional)
  roommate: '#0284c7', // Blue
  dating: '#e11d48', // Soft red
  business: '#7c3aed', // Purple
  secret: '#6366f1', // Indigo
  pets: '#ea580c', // Orange
  fitness: '#16a34a', // Green
  food: '#d97706', // Amber
  volunteer: '#0891b2', // Cyan
};

// Professional typography system (smaller, more refined)
const typography = {
  // Headlines (18-20px range)
  displayLarge: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  displayMedium: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  displaySmall: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
  
  // Headlines (refined)
  headlineLarge: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  headlineMedium: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  headlineSmall: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
  
  // Titles (professional weights)
  titleLarge: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
    letterSpacing: 0,
  },
  titleMedium: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
    letterSpacing: 0,
  },
  titleSmall: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
    letterSpacing: 0,
  },
  
  // Body text (14-16px range)
  bodyLarge: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
    letterSpacing: 0,
  },
  bodyMedium: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400',
    letterSpacing: 0,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
    letterSpacing: 0,
  },
  
  // Labels (12-14px captions)
  labelLarge: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  labelSmall: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  
  // Captions (metadata)
  caption: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '400',
    letterSpacing: 0,
  },
  captionSmall: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '400',
    letterSpacing: 0,
  },
};

// Refined spacing (tighter, more professional)
const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16, // Standard card padding
  xl: 20,
  xxl: 24, // Horizontal margins
  xxxl: 32,
};

// Professional border radius (smaller, subtle)
const borderRadius = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 8, // Standard for buttons
  lg: 12, // Cards
  xl: 16,
  xxl: 20,
  full: 9999,
};

// Subtle shadows (minimal elevation) - Web compatible
const shadows = {
  none: {
    elevation: 0,
    boxShadow: 'none',
  },
  xs: {
    elevation: 1,
    boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.05)',
  },
  sm: {
    elevation: 2,
    boxShadow: '0 3px 6px rgba(0,0,0,0.08), 0 3px 6px rgba(0,0,0,0.08)',
  },
  md: {
    elevation: 3,
    boxShadow: '0 10px 20px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.1)',
  },
  lg: {
    elevation: 4,
    boxShadow: '0 14px 28px rgba(0,0,0,0.12), 0 10px 10px rgba(0,0,0,0.12)',
  },
  xl: {
    elevation: 6,
    boxShadow: '0 19px 38px rgba(0,0,0,0.15), 0 15px 12px rgba(0,0,0,0.15)',
  },
};

// Animation system (smooth, subtle)
const animations = {
  timing: {
    quick: 150,
    normal: 250, // Slightly faster
    slow: 400,
    extraSlow: 600,
  },
  
  easing: {
    easeOutCubic: 'cubic-bezier(0.33, 1, 0.68, 1)',
    easeInOutCubic: 'cubic-bezier(0.65, 0, 0.35, 1)',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  
  scale: {
    press: 0.96, // Subtle press feedback
    hover: 1.01,
    active: 0.98,
  },
  
  opacity: {
    disabled: 0.6,
    overlay: 0.8,
    subtle: 0.1,
  }
};

// Professional component sizing
const components = {
  button: {
    height: 40, // Sleeker button height
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
  },
  avatar: {
    small: 32,
    medium: 40,
    large: 56,
    xlarge: 72, // Profile page
  },
  icon: {
    small: 16,
    medium: 20,
    large: 24, // Standard icon size
    xlarge: 28,
  },
  card: {
    padding: spacing.lg, // Consistent 16px
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
  },
  navigation: {
    height: 56, // Standard bottom nav height
    iconSize: 24,
  },
};

// Gesture configurations
const gestures = {
  swipeThreshold: 50,
  longPressDelay: 500,
  doubleTapDelay: 300,
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    // Primary colors (subtle blue)
    primary: modernColors.primary,
    primaryContainer: modernColors.primaryContainer,
    onPrimary: '#ffffff',
    onPrimaryContainer: '#0c4a6e',
    
    // Secondary colors
    secondary: modernColors.secondary,
    secondaryContainer: modernColors.secondaryContainer,
    onSecondary: '#ffffff',
    onSecondaryContainer: '#064e3b',
    
    // Tertiary colors
    tertiary: modernColors.tertiary,
    tertiaryContainer: modernColors.tertiaryContainer,
    onTertiary: '#ffffff',
    onTertiaryContainer: '#4c1d95',
    
    // Professional surfaces
    surface: modernColors.cardBackground,
    surfaceVariant: modernColors.surfaceVariant,
    surfaceTint: modernColors.primaryLight,
    onSurface: modernColors.warmGray[900],
    onSurfaceVariant: modernColors.warmGray[600],
    
    // Clean background
    background: modernColors.background,
    onBackground: modernColors.warmGray[900],
    
    // Status colors (subtle)
    error: modernColors.error,
    errorContainer: '#fee2e2',
    onError: '#ffffff',
    onErrorContainer: '#991b1b',
    
    success: modernColors.success,
    warning: modernColors.warning,
    info: modernColors.info,
    
    // Professional outlines
    outline: modernColors.warmGray[200],
    outlineVariant: modernColors.warmGray[100],
    
    // Other colors
    shadow: modernColors.warmGray[900],
    scrim: modernColors.warmGray[900],
    inverseSurface: modernColors.warmGray[800],
    inverseOnSurface: modernColors.warmGray[100],
    inversePrimary: modernColors.primaryLight,
    
    // Refined connector colors
    connectorColors: {
      roommate: modernColors.roommate,
      dating: modernColors.dating,
      business: modernColors.business,
      secret: modernColors.secret,
      pets: modernColors.pets,
      fitness: modernColors.fitness,
      food: modernColors.food,
      volunteer: modernColors.volunteer,
    },
  },
  typography,
  spacing,
  borderRadius,
  shadows,
  components,
  dark: false,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    // Primary colors
    primary: modernColors.primaryLight,
    primaryContainer: '#0c4a6e',
    onPrimary: '#0c4a6e',
    onPrimaryContainer: modernColors.primaryContainer,
    
    // Secondary colors
    secondary: modernColors.secondaryLight,
    secondaryContainer: '#064e3b',
    onSecondary: '#064e3b',
    onSecondaryContainer: modernColors.secondaryContainer,
    
    // Tertiary colors
    tertiary: modernColors.tertiaryLight,
    tertiaryContainer: '#4c1d95',
    onTertiary: '#4c1d95',
    onTertiaryContainer: modernColors.tertiaryContainer,
    
    // Dark surfaces
    surface: modernColors.warmGray[800],
    surfaceVariant: modernColors.warmGray[700],
    surfaceTint: modernColors.primaryLight,
    onSurface: modernColors.warmGray[100],
    onSurfaceVariant: modernColors.warmGray[400],
    
    // Dark background
    background: modernColors.warmGray[900],
    onBackground: modernColors.warmGray[100],
    
    // Status colors (adjusted for dark mode)
    error: '#f87171',
    errorContainer: '#991b1b',
    onError: '#1e293b',
    onErrorContainer: '#fee2e2',
    
    success: '#4ade80',
    warning: '#fbbf24',
    info: '#22d3ee',
    
    // Dark outlines
    outline: modernColors.warmGray[600],
    outlineVariant: modernColors.warmGray[700],
    
    // Other colors
    shadow: '#000000',
    scrim: '#000000',
    inverseSurface: modernColors.warmGray[100],
    inverseOnSurface: modernColors.warmGray[800],
    inversePrimary: modernColors.primary,
    
    // Dark mode connector colors
    connectorColors: {
      roommate: '#38bdf8',
      dating: '#f87171',
      business: '#a78bfa',
      secret: '#818cf8',
      pets: '#fb923c',
      fitness: '#4ade80',
      food: '#fbbf24',
      volunteer: '#22d3ee',
    },
  },
  typography,
  spacing,
  borderRadius,
  shadows,
  components,
  dark: true,
};

export const getTheme = (isDark) => isDark ? darkTheme : lightTheme;

// Helper functions for consistent styling
export const getConnectorColor = (type, theme) => {
  const connectorType = type?.toLowerCase();
  return theme.colors.connectorColors[connectorType] || theme.colors.primary;
};

export const getElevationStyle = (level, theme) => {
  const shadow = theme.shadows[level] || theme.shadows.md;
  // Return web-compatible shadow style
  return {
    elevation: shadow.elevation,
    boxShadow: shadow.boxShadow,
  };
};

// Default theme export for backward compatibility
export const theme = lightTheme; 