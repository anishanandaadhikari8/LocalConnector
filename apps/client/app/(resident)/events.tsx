import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import api from '../../src/api';
import { theme } from '../../src/theme/theme';
import { useAuthStore } from '../../src/store/auth';


export default function EventsScreen() {
  const { circle } = useAuthStore();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    if (!circle) return;
    setLoading(true);
    try { setEvents(await api.listEvents(circle.id)); }
    finally { setLoading(false); }
  };
  useEffect(() => { refresh(); }, [circle?.id]);

  const rsvp = async (id: string, status: 'GOING'|'INTERESTED'|'DECLINED') => {
    await api.rsvpEvent(id, status);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{padding:16, gap:16}}>
        <Text style={styles.h1}>Events</Text>
        {loading ? <Text>Loading…</Text> : null}
        {events.map(e => (
          <View key={e.id} style={styles.card}>
            <Text style={styles.title}>{e.title}</Text>
            <Text style={styles.meta}>{new Date(e.start_at).toLocaleString()} → {new Date(e.end_at).toLocaleTimeString()}</Text>
            <Text style={styles.body}>{e.description || ''}</Text>
            <View style={styles.actions}>
              {(['GOING','INTERESTED','DECLINED'] as const).map(s => (
                <TouchableOpacity key={s} onPress={() => rsvp(e.id, s)} style={styles.btn}><Text style={styles.btnTxt}>{s}</Text></TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor: theme.colors.surface50 as any },
  h1:{ fontSize:24, fontWeight:'800', color: theme.colors.ink900 as any },
  card:{ backgroundColor: theme.colors.surface0 as any, borderRadius:16, padding:16, borderWidth:1, borderColor: theme.colors.borderSubtle as any },
  title:{ fontSize:16, fontWeight:'700', color: theme.colors.ink900 as any },
  meta:{ fontSize:12, color: theme.colors.ink700 as any, marginTop:2, marginBottom:6 },
  body:{ fontSize:13, color: theme.colors.ink900 as any },
  actions:{ flexDirection:'row', gap:8, marginTop:8, flexWrap:'wrap' },
  btn:{ backgroundColor: theme.colors.primary700 as any, paddingVertical:8, paddingHorizontal:12, borderRadius:10 },
  btnTxt:{ color:'#fff', fontWeight:'800' },
});
