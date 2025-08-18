import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../../src/store/auth';
import { theme } from '../../src/theme/theme';

export default function ProfileScreen() {
  const { user, circle, role, logout } = useAuthStore();
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.h1}>My Profile</Text>
        <View style={styles.row}><Text style={styles.label}>Name</Text><Text style={styles.val}>{user?.display_name || '-'}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Email</Text><Text style={styles.val}>{user?.email || '-'}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Role</Text><Text style={styles.val}>{role || '-'}</Text></View>
        <View style={styles.row}><Text style={styles.label}>Circle</Text><Text style={styles.val}>{circle?.name || '-'}</Text></View>
        <TouchableOpacity onPress={logout} style={styles.btn}><Text style={styles.btnTxt}>Logout</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor: theme.colors.surface50 as any, padding:16 },
  card:{ backgroundColor: theme.colors.surface0 as any, borderRadius:16, padding:16, borderWidth:1, borderColor: theme.colors.borderSubtle as any },
  h1:{ fontSize:24, fontWeight:'800', color: theme.colors.ink900 as any, marginBottom:12 },
  row:{ flexDirection:'row', justifyContent:'space-between', paddingVertical:10, borderTopWidth:1, borderTopColor: theme.colors.borderSubtle as any },
  label:{ color: theme.colors.ink700 as any },
  val:{ color: theme.colors.ink900 as any, fontWeight:'700' },
  btn:{ marginTop:16, backgroundColor: theme.colors.dangerFg as any, borderRadius:12, paddingVertical:12, alignItems:'center' },
  btnTxt:{ color:'#fff', fontWeight:'800' },
});
