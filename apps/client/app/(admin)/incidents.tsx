import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../../src/api';
import type { Incident } from '../../src/api/types';
import { useAuthStore } from '../../src/store/auth';
import { theme } from '../../src/theme/theme';


export default function IncidentsScreen() {
  const { circle } = useAuthStore();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const all = await api.adminListIncidents({ circle_id: circle?.id || '' });
      setIncidents(all);
    } finally { setLoading(false); }
  };
  useEffect(() => { refresh(); }, [circle?.id]);

  const byStatus = useMemo(() => ({
    OPEN: incidents.filter(i => i.status === 'OPEN'),
    IN_PROGRESS: incidents.filter(i => i.status === 'IN_PROGRESS'),
    RESOLVED: incidents.filter(i => i.status === 'RESOLVED'),
  }), [incidents]);

  const transition = async (i: Incident) => {
    const next = i.status === 'OPEN' ? 'IN_PROGRESS' : (i.status === 'IN_PROGRESS' ? 'RESOLVED' : 'RESOLVED');
    // Mock transition: replace object locally
    setIncidents(prev => prev.map(x => x.id === i.id ? { ...x, status: next } : x));
  };

  const Row = ({ i }: { i: Incident }) => (
    <View style={styles.row}>
      <View style={{flex:1}}>
        <Text style={styles.title}>{i.type} • Sev {i.severity}</Text>
        <Text style={styles.meta}>{new Date(i.created_at).toLocaleString()}</Text>
        <Text numberOfLines={2} style={styles.body}>{i.description}</Text>
        <Text style={[styles.badge, badgeStyle(i.status)]}>{i.status}</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => transition(i)}>
        <Text style={styles.btnTxt}>{i.status === 'OPEN' ? 'Start' : (i.status === 'IN_PROGRESS' ? 'Resolve' : 'Resolved')}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{padding:16, gap:16}}>
        <Text style={styles.h1}>Incidents</Text>
        {loading ? <Text>Loading…</Text> : null}
        {(['OPEN','IN_PROGRESS','RESOLVED'] as const).map(s => (
          <View key={s} style={styles.card}>
            <Text style={styles.h2}>{s.replace('_',' ')}</Text>
            {byStatus[s].length === 0 ? <Text style={styles.empty}>None</Text> : byStatus[s].map(i => <Row key={i.id} i={i} />)}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function badgeStyle(status: Incident['status']) {
  switch (status) {
    case 'OPEN': return { backgroundColor: theme.colors.dangerFg as any };
    case 'IN_PROGRESS': return { backgroundColor: theme.colors.warningBg as any };
    case 'RESOLVED': return { backgroundColor: theme.colors.successFg as any };
    default: return { backgroundColor: theme.colors.ink700 as any };
  }
}

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor: theme.colors.surface50 as any },
  h1:{ fontSize:24, fontWeight:'800', color: theme.colors.ink900 as any },
  h2:{ fontSize:16, fontWeight:'700', color: theme.colors.ink900 as any, marginBottom:8 },
  card:{ backgroundColor: theme.colors.surface0 as any, borderRadius:16, padding:16, borderWidth:1, borderColor: theme.colors.borderSubtle as any },
  empty:{ color: theme.colors.ink700 as any },
  row:{ flexDirection:'row', gap:12, alignItems:'center', paddingVertical:12, borderTopWidth:1, borderTopColor: theme.colors.borderSubtle as any },
  title:{ fontSize:16, fontWeight:'700', color: theme.colors.ink900 as any },
  meta:{ fontSize:12, color: theme.colors.ink700 as any, marginTop:2, marginBottom:6 },
  body:{ fontSize:13, color: theme.colors.ink900 as any },
  badge:{ alignSelf:'flex-start', color:'#fff', paddingHorizontal:8, paddingVertical:2, borderRadius:8, overflow:'hidden', fontSize:10, fontWeight:'700', marginTop:6 },
  btn:{ backgroundColor: theme.colors.primary700 as any, paddingVertical:8, paddingHorizontal:12, borderRadius:10, alignItems:'center' },
  btnTxt:{ color:'#fff', fontWeight:'800' },
});
