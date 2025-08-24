import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../../src/api';
import { theme } from '../../src/theme/theme';


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
        <Text style={styles.btnText}>{loading ? 'Checking…' : 'Check-in'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 24,
		backgroundColor: theme.colors.surface[50],
	},
	h1: {
		fontSize: 24,
		fontWeight: '800',
		color: theme.colors.ink[900],
		marginBottom: 12,
	},
	input: {
		backgroundColor: theme.colors.surface[0],
		borderRadius: 12,
		borderWidth: 1,
		borderColor: theme.colors.border.subtle,
		padding: 12,
		minWidth: 280,
		marginBottom: 12,
		color: theme.colors.ink[900],
	},
	btn: {
		backgroundColor: theme.colors.primary[700],
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 12,
		alignItems: 'center',
	},
	btnText: {
		color: theme.colors.surface[0],
		fontWeight: '600',
		fontSize: 16,
	},
});
