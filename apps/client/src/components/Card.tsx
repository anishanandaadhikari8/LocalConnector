// Card.tsx
import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';
export default function Card({ children }:{ children:ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}
const styles = StyleSheet.create({
  card:{ backgroundColor: theme.colors.surface0 as any, borderRadius:16, padding:16, borderWidth:1, borderColor: theme.colors.borderSubtle as any,
         shadowColor:'#000', shadowOpacity:0.06, shadowRadius:16 }
});
