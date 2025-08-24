# 🎨 Theme Guide - Circles App

## Overview

The Circles app now has a **centralized theme system** that allows you to change the entire UI appearance by modifying a single configuration file. All components automatically use the new theme structure.

## 🎯 Single Configuration Point

**File**: `apps/client/src/theme/theme.ts`

All theme colors, spacing, typography, and styling are controlled from the `themeConfig` object at the top of this file.

## 🚀 Quick Theme Changes

### Change Primary Brand Colors
```typescript
// In apps/client/src/theme/theme.ts
const themeConfig = {
  primary: {
    50: '#F0F4FF',   // Lightest
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1',  // Main brand color
    600: '#4F46E5',
    700: '#4338CA',  // Primary button color
    800: '#3730A3',
    900: '#312E81',  // Darkest
  },
  // ... rest of config
};
```

### Change Accent Colors
```typescript
accent: {
  50: '#F0FDF4',   // Lightest
  100: '#DCFCE7',
  200: '#BBF7D0',
  300: '#86EFAC',
  400: '#4ADE80',
  500: '#22C55E',  // Main accent color
  600: '#16A34A',
  700: '#15803D',
  800: '#166534',
  900: '#14532D',  // Darkest
},
```

### Change Background Colors
```typescript
surface: {
  0: '#FFFFFF',    // Pure white
  50: '#F9FAFB',   // Main background
  100: '#F3F4F6',  // Secondary background
  200: '#E5E7EB',  // Borders
  300: '#D1D5DB',
  400: '#9CA3AF',
  500: '#6B7280',
  600: '#4B5563',
  700: '#374151',
  800: '#1F2937',
  900: '#111827',  // Darkest
},
```

## 🎨 Pre-built Theme Examples

### 1. Warm Sunset Theme (Current)
```typescript
const themeConfig = {
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
};
```

### 2. Ocean Blue Theme
```typescript
const themeConfig = {
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  accent: {
    50: '#F0F9FF',
    100: '#E0F2FE',
    200: '#BAE6FD',
    300: '#7DD3FC',
    400: '#38BDF8',
    500: '#0EA5E9',
    600: '#0284C7',
    700: '#0369A1',
    800: '#075985',
    900: '#0C4A6E',
  },
};
```

### 3. Forest Green Theme
```typescript
const themeConfig = {
  primary: {
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
  accent: {
    50: '#FEF7ED',
    100: '#FED7AA',
    200: '#FDBA74',
    300: '#FB923C',
    400: '#F97316',
    500: '#EA580C',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
};
```

### 4. Purple Dream Theme
```typescript
const themeConfig = {
  primary: {
    50: '#FAF5FF',
    100: '#F3E8FF',
    200: '#E9D5FF',
    300: '#D8B4FE',
    400: '#C084FC',
    500: '#A855F7',
    600: '#9333EA',
    700: '#7C3AED',
    800: '#6B21A8',
    900: '#581C87',
  },
  accent: {
    50: '#FDF2F8',
    100: '#FCE7F3',
    200: '#FBCFE8',
    300: '#F9A8D4',
    400: '#F472B6',
    500: '#EC4899',
    600: '#DB2777',
    700: '#BE185D',
    800: '#9D174D',
    900: '#831843',
  },
};
```

## 🛠️ Advanced Customization

### Role-based Colors
```typescript
role: {
  success: {
    bg: '#DCFCE7',    // Success background
    fg: '#16A34A',    // Success text
    border: '#BBF7D0', // Success border
  },
  warning: {
    bg: '#FEF3C7',    // Warning background
    fg: '#D97706',    // Warning text
    border: '#FDE68A', // Warning border
  },
  danger: {
    bg: '#FEE2E2',    // Error background
    fg: '#DC2626',    // Error text
    border: '#FECACA', // Error border
  },
  info: {
    bg: '#DBEAFE',    // Info background
    fg: '#2563EB',    // Info text
    border: '#BFDBFE', // Info border
  },
},
```

### Typography
```typescript
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
```

### Spacing
```typescript
spacing: {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
},
```

### Border Radius
```typescript
borderRadius: {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
},
```

## 🔧 Helper Functions

### Get Theme Color
```typescript
import { getThemeColor } from '../theme/theme';

// Get any theme color with fallback
const color = getThemeColor('primary.700', '#000000');
```

### Pre-built Button Styles
```typescript
import { buttonStyles } from '../theme/theme';

// Use consistent button styling
<TouchableOpacity style={buttonStyles.primary}>
  <Text>Primary Button</Text>
</TouchableOpacity>

<TouchableOpacity style={buttonStyles.secondary}>
  <Text>Secondary Button</Text>
</TouchableOpacity>
```

### Pre-built Card Styles
```typescript
import { cardStyles } from '../theme/theme';

// Use consistent card styling
<View style={cardStyles.default}>
  <Text>Default Card</Text>
</View>

<View style={cardStyles.elevated}>
  <Text>Elevated Card</Text>
</View>
```

## 🎯 How It Works

1. **Single Source of Truth**: All theme values are defined in `themeConfig`
2. **Automatic Generation**: The theme object is generated from the config
3. **CSS Variable Support**: Web platform uses CSS variables for dynamic theming
4. **Type Safety**: Full TypeScript support with proper typing
5. **Backward Compatibility**: Legacy color names are still supported

## 🚀 Making Changes

1. **Edit the config**: Modify `themeConfig` in `apps/client/src/theme/theme.ts`
2. **Save the file**: Changes are automatically applied
3. **Restart the app**: For complete theme refresh
4. **Test**: Check all screens to ensure consistency

## 📱 Platform Support

- **Web**: Uses CSS variables for dynamic theming
- **Mobile**: Uses direct color values
- **Consistent**: Same theme across all platforms

## 🎨 Theme Structure

```
themeConfig
├── primary (Brand colors)
├── accent (Secondary colors)
├── surface (Background colors)
├── ink (Text colors)
├── border (Border colors)
├── role (Semantic colors)
└── spacing/typography/borderRadius (Layout)
```

## 🔍 Verification

After making theme changes, verify:
- [ ] All buttons use the new primary color
- [ ] All backgrounds use the new surface colors
- [ ] All text uses the new ink colors
- [ ] All borders use the new border colors
- [ ] Status indicators use the new role colors

## 💡 Tips

1. **Start with primary colors**: These affect the most UI elements
2. **Test on both web and mobile**: Colors may appear slightly different
3. **Consider accessibility**: Ensure sufficient contrast ratios
4. **Use semantic colors**: Leverage role-based colors for status indicators
5. **Keep it consistent**: Use the same color scale across all variants

---

**🎉 You now have complete control over your app's appearance with a single configuration file!**
