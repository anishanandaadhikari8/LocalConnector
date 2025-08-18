import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import MockApi from '../../src/api/ApiAdapter';
import type { Incident } from '../../src/api/types';
import { useAuthStore } from '../../src/store/auth';
import { theme } from '../../src/theme/theme';

const api = new MockApi();

export default function IncidentsScreen() {
  const { user, circle } = useAuthStore();
  const [list, setList] = useState<Incident[]>([]);
  const [type, setType] = useState<'SECURITY'|'MAINTENANCE'|'OTHER'>('SECURITY');
  const [severity, setSeverity] = useState<number>(3);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const all = await api.getIncidentsMine();
      const mine = user ? all.filter(i => i.reporter_id === user.id || i.reporter_id == null) : all;
      setList(mine);
    } finally { setLoading(false); }
  };
  useEffect(() => { refresh(); }, [user?.id]);

  const submit = async () => {
    if (!user || !circle) return;
    if (!description.trim()) { Alert.alert('Please add a description'); return; }
    setLoading(true);
    try {
      await api.createIncident({ circle_id: circle.id, reporter_id: user.id, type, severity, description });
      setDescription(''); setSeverity(3); setType('SECURITY');
      await refresh();
    } catch (e: any) { Alert.alert('Error', e?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  const byStatus = useMemo(() => ({
    OPEN: list.filter(i => i.status === 'OPEN'),
    IN_PROGRESS: list.filter(i => i.status === 'IN_PROGRESS'),
    RESOLVED: list.filter(i => i.status === 'RESOLVED'),
  }), [list]);

  const Row = ({ i }: { i: Incident }) => (
    <View style={styles.row}>
      <View style={{flex:1}}>
        <Text style={styles.title}>{i.type} • Sev {i.severity}</Text>
        <Text style={styles.meta}>{new Date(i.created_at).toLocaleString()}</Text>
        <Text numberOfLines={3} style={styles.body}>{i.description}</Text>
        <Text style={[styles.badge, badgeStyle(i.status)]}>{i.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{padding:16, gap:16}}>
        <Text style={styles.h1}>Report an Issue</Text>
        <View style={styles.card}>
          <View style={styles.toggleRow}>
            {(['SECURITY','MAINTENANCE','OTHER'] as const).map(t => (
              <TouchableOpacity key={t} onPress={() => setType(t)} style={[styles.chip, type===t && styles.chipSel]}>
                <Text style={[styles.chipTxt, type===t && styles.chipTxtSel]}>{t}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.toggleRow}>
            {[1,2,3,4,5].map(s => (
              <TouchableOpacity key={s} onPress={() => setSeverity(s)} style={[styles.chip, severity===s && styles.chipSel]}>
                <Text style={[styles.chipTxt, severity===s && styles.chipTxtSel]}>Sev {s}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            placeholder="Describe the issue..."
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            multiline
            numberOfLines={3}
          />
          <TouchableOpacity disabled={loading} onPress={submit} style={[styles.btn, loading && {opacity:0.5}]}> 
            <Text style={styles.btnTxt}>{loading? 'Submitting…' : 'Submit'}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.h1}>My Incidents</Text>
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
  h1:{ fontSize:20, fontWeight:'800', color: theme.colors.ink900 as any },
  h2:{ fontSize:16, fontWeight:'700', color: theme.colors.ink900 as any, marginBottom:8 },
  card:{ backgroundColor: theme.colors.surface0 as any, borderRadius:16, padding:16, borderWidth:1, borderColor: theme.colors.borderSubtle as any },
  input:{ backgroundColor: theme.colors.surface0 as any, borderRadius:12, borderWidth:1, borderColor: theme.colors.borderSubtle as any, padding:12, minHeight:80, textAlignVertical:'top', marginTop:8, marginBottom:12 },
  toggleRow:{ flexDirection:'row', gap:8, marginBottom:8, flexWrap:'wrap' },
  chip:{ backgroundColor: theme.colors.surface0 as any, borderWidth:1, borderColor: theme.colors.borderSubtle as any, paddingHorizontal:10, paddingVertical:6, borderRadius:999 },
  chipSel:{ backgroundColor: theme.colors.primary700 as any, borderColor: theme.colors.primary700 as any },
  chipTxt:{ color: theme.colors.ink900 as any, fontWeight:'700' },
  chipTxtSel:{ color:'#fff' },
  empty:{ color: theme.colors.ink700 as any },
  row:{ flexDirection:'row', gap:12, alignItems:'center', paddingVertical:12, borderTopWidth:1, borderTopColor: theme.colors.borderSubtle as any },
  title:{ fontSize:16, fontWeight:'700', color: theme.colors.ink900 as any },
  meta:{ fontSize:12, color: theme.colors.ink700 as any, marginTop:2, marginBottom:6 },
  body:{ fontSize:13, color: theme.colors.ink900 as any },
  badge:{ alignSelf:'flex-start', color:'#fff', paddingHorizontal:8, paddingVertical:2, borderRadius:8, overflow:'hidden', fontSize:10, fontWeight:'700', marginTop:6 },
  btn:{ backgroundColor: theme.colors.primary700 as any, paddingVertical:12, paddingHorizontal:16, borderRadius:12, alignItems:'center' },
  btnTxt:{ color:'#fff', fontWeight:'800' },
});
