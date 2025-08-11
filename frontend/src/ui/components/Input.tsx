import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme';

export const Input: React.FC<TextInputProps> = ({ style, placeholderTextColor = colors.subtext, ...props }) => {
  return <TextInput {...props} style={[styles.input, style]} placeholderTextColor={placeholderTextColor} />;
};

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    color: colors.text,
  },
});


