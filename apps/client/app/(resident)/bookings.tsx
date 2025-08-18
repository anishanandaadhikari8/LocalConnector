import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MockApi from '../../src/api/ApiAdapter';
import type { Booking } from '../../src/api/types';
import { useAuthStore } from '../../src/store/auth';
import { theme } from '../../src/theme/theme';

const api = new MockApi();

export default function BookingsScreen() {
  const { user } = useAuthStore();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [amenityNameById, setAmenityNameById] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const refresh = async () => {
    setIsLoading(true);
    try {
      const all = await api.listMyBookings();
      const mine = user ? all.filter(b => b.user_id === user.id) : all;
      setBookings(mine);
      // Build amenity name map for quick display
      const amenityIds = Array.from(new Set(mine.map(b => b.amenity_id)));
      const circles = Array.from(new Set(mine.map(b => b.circle_id)));
      const names: Record<string, string> = {};
      for (const circleId of circles) {
        const ams = await api.getAmenities(circleId);
        ams.forEach(a => { if (amenityIds.includes(a.id)) names[a.id] = a.name; });
      }
      setAmenityNameById(names);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { refresh(); }, [user?.id]);

  const nowIso = new Date().toISOString();
  const upcoming = useMemo(() => bookings
    .filter(b => b.end_at >= nowIso)
    .sort((a,b) => a.start_at.localeCompare(b.start_at)), [bookings]);
  const past = useMemo(() => bookings
    .filter(b => b.end_at < nowIso)
    .sort((a,b) => b.start_at.localeCompare(a.start_at)), [bookings]);

  const cancelBooking = async (id: string) => {
    try {
      await api.updateBookingStatus(id, 'CANCELED');
      await refresh();
    } catch (e: any) {
      Alert.alert('Error', e?.message || 'Failed to cancel booking');
    }
  };

  const checkIn = async (id: string) => {
    try { await api.checkInBooking(id); await refresh(); }
    catch (e: any) { Alert.alert('Error', e?.message || 'Failed to check-in'); }
  };

  const Row = ({ b }: { b: Booking }) => (
    <View style={styles.row}>
      <View style={{flex:1}}>
        <Text style={styles.rowTitle}>{amenityNameById[b.amenity_id] || 'Amenity'}</Text>
        <Text style={styles.rowMeta}>{new Date(b.start_at).toLocaleString()} → {new Date(b.end_at).toLocaleTimeString()}</Text>
        <Text style={[styles.badge, badgeStyle(b.status)]}>{b.status}</Text>
        {b.checked_in_at ? <Text style={styles.checkedIn}>Checked in</Text> : null}
      </View>
      <View style={{gap:8}}>
        {b.end_at >= nowIso && (b.status === 'PENDING' || b.status === 'APPROVED') ? (
          <TouchableOpacity onPress={() => cancelBooking(b.id)} style={[styles.btn, styles.btnGhost]}>
            <Text style={[styles.btnTxt, styles.btnGhostTxt]}>Cancel</Text>
          </TouchableOpacity>
        ) : null}
        {!b.checked_in_at && b.end_at >= nowIso ? (
          <TouchableOpacity onPress={() => checkIn(b.id)} style={styles.btn}>
            <Text style={styles.btnTxt}>Check-in</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{padding:16, gap:16}}>
        <Text style={styles.h1}>My Bookings</Text>
        {isLoading ? <Text>Loading…</Text> : null}

        <View style={styles.section}>
          <Text style={styles.h2}>Upcoming</Text>
          {upcoming.length === 0 ? (
            <Text style={styles.empty}>No upcoming bookings</Text>
          ) : upcoming.map(b => <Row key={b.id} b={b} />)}
        </View>

        <View style={styles.section}>
          <Text style={styles.h2}>Past</Text>
          {past.length === 0 ? (
            <Text style={styles.empty}>No past bookings</Text>
          ) : past.map(b => <Row key={b.id} b={b} />)}
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
  section:{ backgroundColor: theme.colors.surface0 as any, borderRadius:16, padding:16, borderWidth:1, borderColor: theme.colors.borderSubtle as any },
  empty:{ color: theme.colors.ink700 as any },
  row:{ flexDirection:'row', gap:12, alignItems:'center', paddingVertical:12, borderTopWidth:1, borderTopColor: theme.colors.borderSubtle as any },
  rowTitle:{ fontSize:16, fontWeight:'700', color: theme.colors.ink900 as any },
  rowMeta:{ fontSize:12, color: theme.colors.ink700 as any, marginTop:2, marginBottom:6 },
  badge:{ alignSelf:'flex-start', color:'#fff', paddingHorizontal:8, paddingVertical:2, borderRadius:8, overflow:'hidden', fontSize:10, fontWeight:'700' },
  checkedIn:{ marginTop:6, fontSize:12, color: theme.colors.successFg as any, fontWeight:'700' },
  btn:{ backgroundColor: theme.colors.primary700 as any, paddingVertical:10, paddingHorizontal:12, borderRadius:10, alignItems:'center' },
  btnTxt:{ color:'#fff', fontWeight:'800' },
  btnGhost:{ backgroundColor: theme.colors.surface0 as any, borderWidth:1, borderColor: theme.colors.borderSubtle as any },
  btnGhostTxt:{ color: theme.colors.ink900 as any },
});
