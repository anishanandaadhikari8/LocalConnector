import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme';
import { Text } from './Text';

export const Badge: React.FC<{ label: string; tone?: 'default' | 'success' | 'warning' | 'danger' }> = ({
  label,
  tone = 'default',
}) => {
  const bg = tone === 'success' ? colors.success : tone === 'warning' ? colors.warning : tone === 'danger' ? colors.danger : colors.surface;
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}> 
      <Text variant="caption">{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    alignSelf: 'flex-start',
  },
});


