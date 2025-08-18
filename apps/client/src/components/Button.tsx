// Button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme/theme';
export default function Button({ title, onPress, disabled=false, kind='primary', style }:{
  title:string; onPress:()=>void; disabled?:boolean; kind?:'primary'|'ghost'; style?:ViewStyle;
}) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}
      style={[styles.btn, kind==='ghost' && styles.ghost, disabled && {opacity:0.5}, style]}>
      <Text style={[styles.txt, kind==='ghost' && styles.ghostTxt]}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  btn:{ backgroundColor: theme.colors.primary700 as any, paddingVertical:12, paddingHorizontal:16, borderRadius:12, alignItems:'center' },
  txt:{ color:'#fff', fontWeight:'800' },
  ghost:{ backgroundColor: theme.colors.surface0 as any, borderWidth:1, borderColor: theme.colors.borderSubtle as any },
  ghostTxt:{ color: theme.colors.ink900 as any },
});
