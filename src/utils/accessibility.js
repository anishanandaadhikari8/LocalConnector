import { AccessibilityInfo, I18nManager } from 'react-native';

// Screen reader detection
export const isScreenReaderEnabled = async () => {
  try {
    return await AccessibilityInfo.isScreenReaderEnabled();
  } catch (error) {
    console.warn('Error checking screen reader status:', error);
    return false;
  }
};

// Announce to screen reader
export const announceForAccessibility = (message) => {
  AccessibilityInfo.announceForAccessibility(message);
};

// RTL support utilities
export const isRTL = I18nManager.isRTL;

export const getDirectionalStyle = (ltrStyle, rtlStyle) => {
  return isRTL ? rtlStyle : ltrStyle;
};

export const getFlexDirection = (direction = 'row') => {
  if (direction === 'row') {
    return isRTL ? 'row-reverse' : 'row';
  }
  return direction;
};

export const getTextAlign = (align = 'left') => {
  if (align === 'left') {
    return isRTL ? 'right' : 'left';
  } else if (align === 'right') {
    return isRTL ? 'left' : 'right';
  }
  return align;
};

// Accessibility label generators
export const generateAccessibilityLabel = (type, data) => {
  switch (type) {
    case 'post':
      return `Post by ${data.author}. ${data.title}. ${data.likes} likes, ${data.comments} comments.`;
    
    case 'connector':
      return `${data.title} connector. ${data.type} type. ${data.memberCount} members.`;
    
    case 'notification':
      return `${data.type} notification from ${data.user}. ${data.time}.`;
    
    case 'button':
      return `${data.label} button. ${data.state || ''}`;
    
    default:
      return data.label || 'Interactive element';
  }
};

// Focus management
export const setAccessibilityFocus = (ref) => {
  if (ref && ref.current) {
    AccessibilityInfo.setAccessibilityFocus(ref.current);
  }
};

// Accessibility hint generators
export const getAccessibilityHints = (type) => {
  const hints = {
    swipeable: 'Swipe left or right for more options',
    expandable: 'Double tap to expand',
    navigatable: 'Double tap to navigate',
    likeable: 'Double tap to like',
    shareable: 'Double tap to share',
    editable: 'Double tap to edit',
    deletable: 'Double tap to delete',
  };
  
  return hints[type] || '';
};

// Color contrast utilities
export const getContrastRatio = (color1, color2) => {
  // Simplified contrast ratio calculation
  // In a real app, you'd use a proper color library
  const getLuminance = (color) => {
    // Basic luminance calculation
    const rgb = parseInt(color.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    return 0.299 * r + 0.587 * g + 0.114 * b;
  };
  
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);
  
  return Math.abs(lum1 - lum2) / 255;
};

export const isAccessibleContrast = (backgroundColor, textColor, level = 'AA') => {
  const ratio = getContrastRatio(backgroundColor, textColor);
  const minRatio = level === 'AAA' ? 0.7 : 0.45; // Simplified thresholds
  return ratio >= minRatio;
};

// Touch target utilities
export const ensureMinimumTouchTarget = (style) => {
  const minSize = 44; // iOS guideline
  return {
    ...style,
    minWidth: Math.max(style.width || 0, minSize),
    minHeight: Math.max(style.height || 0, minSize),
  };
};

// Accessibility state helpers
export const getAccessibilityState = (props) => {
  const state = {};
  
  if (props.disabled) state.disabled = true;
  if (props.selected) state.selected = true;
  if (props.checked !== undefined) state.checked = props.checked;
  if (props.expanded !== undefined) state.expanded = props.expanded;
  if (props.busy) state.busy = true;
  
  return Object.keys(state).length > 0 ? state : undefined;
};

// Text scaling support
export const getScaledFontSize = (baseFontSize, scaleFactor = 1) => {
  // This would typically integrate with the system's text scaling settings
  return baseFontSize * scaleFactor;
};

// Semantic content descriptions
export const getSemanticDescription = (content, context) => {
  if (!content) return '';
  
  const descriptions = {
    timestamp: (time) => `Posted ${time}`,
    location: (loc) => `Location: ${loc}`,
    price: (price) => price === 0 ? 'Free' : `Price: $${price}`,
    memberCount: (count) => `${count} ${count === 1 ? 'member' : 'members'}`,
    likeCount: (count) => `${count} ${count === 1 ? 'like' : 'likes'}`,
    commentCount: (count) => `${count} ${count === 1 ? 'comment' : 'comments'}`,
  };
  
  return descriptions[context] ? descriptions[context](content) : content;
};

// Accessibility testing helpers
export const testAccessibility = (component) => {
  const issues = [];
  
  // Check for missing accessibility labels
  if (!component.accessibilityLabel && !component.accessible === false) {
    issues.push('Missing accessibility label');
  }
  
  // Check for appropriate roles
  if (component.onPress && !component.accessibilityRole) {
    issues.push('Interactive element missing accessibility role');
  }
  
  // Check touch target size
  if (component.style && (component.style.width < 44 || component.style.height < 44)) {
    issues.push('Touch target smaller than recommended minimum (44pt)');
  }
  
  return issues;
};

export default {
  isScreenReaderEnabled,
  announceForAccessibility,
  isRTL,
  getDirectionalStyle,
  getFlexDirection,
  getTextAlign,
  generateAccessibilityLabel,
  setAccessibilityFocus,
  getAccessibilityHints,
  getContrastRatio,
  isAccessibleContrast,
  ensureMinimumTouchTarget,
  getAccessibilityState,
  getScaledFontSize,
  getSemanticDescription,
  testAccessibility,
}; 