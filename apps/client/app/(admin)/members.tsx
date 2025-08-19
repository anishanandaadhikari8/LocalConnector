import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import api from '../../src/api';
import { theme } from '../../src/theme/theme';
import { useAuthStore } from '../../src/store/auth';


export default function MembersScreen() {
  const { circle } = useAuthStore();
  const [rows, setRows] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      if (!circle) return;
      setUsers(await api.listUsers());
      setRows(await api.listMembers(circle.id));
    })();
  }, [circle?.id]);

  const name = (uid: string) => users.find(u => u.id === uid)?.display_name || uid;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{padding:16, gap:16}}>
        <Text style={styles.h1}>Members</Text>
        <View style={styles.card}>
          {rows.map(m => (
            <View key={m.id} style={styles.row}>
              <Text style={styles.cell}>{name(m.user_id)}</Text>
              <Text style={styles.role}>{m.role}</Text>
              <Text style={styles.cell}>{m.unit || ''}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor: theme.colors.surface50 as any },
  h1:{ fontSize:24, fontWeight:'800', color: theme.colors.ink900 as any },
  card:{ backgroundColor: theme.colors.surface0 as any, borderRadius:16, padding:16, borderWidth:1, borderColor: theme.colors.borderSubtle as any },
  row:{ flexDirection:'row', gap:8, paddingVertical:10, borderTopWidth:1, borderTopColor: theme.colors.borderSubtle as any },
  cell:{ flex:1, color: theme.colors.ink900 as any },
  role:{ minWidth:100, textAlign:'right', color: theme.colors.ink700 as any },
});
