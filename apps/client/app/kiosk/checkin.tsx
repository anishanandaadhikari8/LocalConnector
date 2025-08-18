import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MockApi from '../../src/api/ApiAdapter';
import { theme } from '../../src/theme/theme';

const api = new MockApi();

export default function KioskCheckinScreen() {
  const [bookingId, setBookingId] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    if (!bookingId) return;
    setLoading(true);
    try { await api.checkInBooking(bookingId); Alert.alert('Success', 'Checked in!'); setBookingId(''); }
    catch (e: any) { Alert.alert('Error', e?.message || 'Failed'); }
    finally { setLoading(false); }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Kiosk Check-in</Text>
      <TextInput placeholder="Enter booking id" value={bookingId} onChangeText={setBookingId} style={styles.input} />
      <TouchableOpacity disabled={!bookingId || loading} onPress={handle} style={[styles.btn, (!bookingId || loading) && {opacity:0.5}]}> 
        <Text style={styles.btnTxt}>{loading ? 'Checking…' : 'Check-in'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, alignItems:'center', justifyContent:'center', padding:24, backgroundColor: theme.colors.surface50 as any },
  h1:{ fontSize:24, fontWeight:'800', color: theme.colors.ink900 as any, marginBottom:12 },
  input:{ backgroundColor: theme.colors.surface0 as any, borderRadius:12, borderWidth:1, borderColor: theme.colors.borderSubtle as any, padding:12, minWidth:280, marginBottom:12 },
  btn:{ backgroundColor: theme.colors.primary700 as any, paddingVertical:12, paddingHorizontal:16, borderRadius:12 },
  btnTxt:{ color:'#fff', fontWeight:'800' },
});
