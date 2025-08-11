import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { spacing } from '../theme';

export const EmptyState: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <View style={styles.container}>
    <Text variant="h2">{title}</Text>
    {subtitle ? <Text color="#A5A9B8">{subtitle}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: spacing.xl },
});


