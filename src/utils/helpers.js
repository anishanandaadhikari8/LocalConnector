export const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const postTime = new Date(timestamp);
  const diffInSeconds = Math.floor((now - postTime) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  } else {
    const months = Math.floor(diffInSeconds / 2592000);
    return `${months}mo ago`;
  }
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getCategoryIcon = (category) => {
  const iconMap = {
    'General': 'forum',
    'Buy/Sell': 'shopping-cart',
    'Lost & Found': 'pets',
    'Alerts': 'warning',
  };
  return iconMap[category] || 'forum';
};

export const getCategoryColor = (category, theme) => {
  const colorMap = {
    'General': theme.colors.primary,
    'Buy/Sell': theme.colors.secondary,
    'Lost & Found': theme.colors.tertiary,
    'Alerts': theme.colors.error,
  };
  return colorMap[category] || theme.colors.primary;
};

export const getConnectorColor = (category) => {
  const colorMap = {
    'General': '#2196F3',
    'Buy/Sell': '#4CAF50',
    'Lost & Found': '#FF9800',
    'Alerts': '#F44336',
    'Events': '#9C27B0',
    'Community': '#607D8B',
    'Safety': '#795548',
    'Entertainment': '#E91E63',
  };
  return colorMap[category] || '#2196F3';
};

export const getElevationStyle = (level = 'sm', theme) => {
  const elevationMap = {
    'xs': { boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' },
    'sm': { boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)' },
    'md': { boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)' },
    'lg': { boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)' },
    'xl': { boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)' },
  };
  return elevationMap[level] || elevationMap.sm;
};

export const getNotificationIcon = (type) => {
  const iconMap = {
    'comment': 'comment',
    'like': 'favorite',
    'follow': 'person-add',
    'alert': 'warning',
  };
  return iconMap[type] || 'notifications';
}; 