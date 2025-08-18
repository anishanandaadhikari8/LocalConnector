import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import MockApi from '../../src/api/ApiAdapter';
import type { Booking } from '../../src/api/types';
import { useAuthStore } from '../../src/store/auth';
import { theme } from '../../src/theme/theme';

const api = new MockApi();

export default function ApprovalsScreen() {
  const { circle } = useAuthStore();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [amenityNameById, setAmenityNameById] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    if (!circle) return;
    setLoading(true);
    try {
      const all = await api.adminListBookings({ circle_id: circle.id });
      setBookings(all);
      const ams = await api.getAmenities(circle.id);
      const names: Record<string, string> = {};
      ams.forEach(a => names[a.id] = a.name);
      setAmenityNameById(names);
    } finally { setLoading(false); }
  };

  useEffect(() => { refresh(); }, [circle?.id]);

  const pending = useMemo(() => bookings.filter(b => b.status === 'PENDING'), [bookings]);
  const others = useMemo(() => bookings.filter(b => b.status !== 'PENDING'), [bookings]);

  const act = async (id: string, status: Booking['status']) => { await api.updateBookingStatus(id, status); await refresh(); };

  const Row = ({ b }: { b: Booking }) => (
    <View style={styles.row}>
      <View style={{flex:1}}>
        <Text style={styles.title}>{amenityNameById[b.amenity_id] || 'Amenity'}</Text>
        <Text style={styles.meta}>{new Date(b.start_at).toLocaleString()} → {new Date(b.end_at).toLocaleTimeString()}</Text>
        <Text style={[styles.badge, badgeStyle(b.status)]}>{b.status}</Text>
      </View>
      <View style={{gap:8}}>
        {b.status === 'PENDING' ? (
          <>
            <TouchableOpacity style={styles.btn} onPress={() => act(b.id, 'APPROVED')}><Text style={styles.btnTxt}>Approve</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnDanger]} onPress={() => act(b.id, 'REJECTED')}><Text style={styles.btnTxt}>Reject</Text></TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={[styles.btn, styles.btnGhost]} onPress={() => act(b.id, 'CANCELED')}><Text style={[styles.btnTxt, styles.btnGhostTxt]}>Cancel</Text></TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (!circle) return <View style={styles.container}><Text style={{padding:16}}>Select a circle to view approvals.</Text></View>;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{padding:16, gap:16}}>
        <Text style={styles.h1}>Approvals</Text>
        {loading ? <Text>Loading…</Text> : null}
        <View style={styles.card}>
          <Text style={styles.h2}>Pending</Text>
          {pending.length === 0 ? <Text style={styles.empty}>None pending</Text> : pending.map(b => <Row key={b.id} b={b} />)}
        </View>
        <View style={styles.card}>
          <Text style={styles.h2}>Other</Text>
          {others.length === 0 ? <Text style={styles.empty}>No records</Text> : others.map(b => <Row key={b.id} b={b} />)}
        </View>
      </ScrollView>
    </View>
  );
}

function badgeStyle(status: Booking['status']) {
  switch (status) {
    case 'APPROVED': return { backgroundColor: theme.colors.successFg as any };
    case 'PENDING': return { backgroundColor: theme.colors.warningBg as any };
    case 'REJECTED': return { backgroundColor: theme.colors.dangerFg as any };
    case 'CANCELED': return { backgroundColor: theme.colors.ink700 as any };
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
  badge:{ alignSelf:'flex-start', color:'#fff', paddingHorizontal:8, paddingVertical:2, borderRadius:8, overflow:'hidden', fontSize:10, fontWeight:'700' },
  btn:{ backgroundColor: theme.colors.primary700 as any, paddingVertical:8, paddingHorizontal:12, borderRadius:10, alignItems:'center' },
  btnTxt:{ color:'#fff', fontWeight:'800' },
  btnDanger:{ backgroundColor: theme.colors.dangerFg as any },
  btnGhost:{ backgroundColor: theme.colors.surface0 as any, borderWidth:1, borderColor: theme.colors.borderSubtle as any },
  btnGhostTxt:{ color: theme.colors.ink900 as any },
});
