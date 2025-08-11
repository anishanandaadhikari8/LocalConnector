import React, { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme';

export const ListItem: React.FC<PropsWithChildren<{ onPress?: () => void; style?: ViewStyle }>> = ({
  children,
  onPress,
  style,
}) => {
  const Cmp = onPress ? Pressable : View;
  return (
    <Cmp onPress={onPress} style={[styles.item, style]}>
      {children}
    </Cmp>
  );
};

const styles = StyleSheet.create({
  item: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingVertical: spacing.md,
  },
});


