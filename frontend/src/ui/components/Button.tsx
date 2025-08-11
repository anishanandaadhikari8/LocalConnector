import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme';
import { Text } from './Text';

type Props = {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  style?: ViewStyle;
};

export const Button: React.FC<Props> = ({
  title,
  onPress,
  loading,
  disabled,
  variant = 'primary',
  style,
}) => {
  const backgroundColor =
    variant === 'danger'
      ? colors.danger
      : variant === 'success'
      ? colors.success
      : variant === 'secondary'
      ? colors.surface
      : colors.primary;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.base, { backgroundColor, opacity: disabled || loading ? 0.6 : 1 }, style]}
    >
      {loading ? <ActivityIndicator color={colors.text} /> : <Text variant="h3">{title}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 48,
    minWidth: 120,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


