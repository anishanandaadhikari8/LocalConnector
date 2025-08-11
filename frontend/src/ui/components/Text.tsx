import React from 'react';
import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export const Text: React.FC<TextProps & { variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption'; color?: string }> = ({
  style,
  variant = 'body',
  color = colors.text,
  ...props
}) => {
  return <RNText {...props} style={[styles[variant], { color }, style]} />;
};

const styles = StyleSheet.create({
  h1: { fontSize: 28, fontWeight: '700' },
  h2: { fontSize: 22, fontWeight: '700' },
  h3: { fontSize: 18, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: '400' },
  caption: { fontSize: 13, fontWeight: '400' },
});


