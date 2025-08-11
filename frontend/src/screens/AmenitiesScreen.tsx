import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { colors } from '../ui/theme/colors';
import { spacing } from '../ui/theme';
import { Badge, Button, Card, Header, Sheet, Text, Input } from '../ui/components';
import { useAuth } from '../lib/auth';
import { api } from '../lib/api';
import { addHours } from '../lib/time';

type Amenity = {
  id: number;
  name: string;
  location: string;
  capacity: number;
  openTime?: string;
  closeTime?: string;
  requiresApproval: boolean;
};

type BookingDraft = { amenityId: number; date: string; start: string; end: string };

const AmenitiesScreen: React.FC = () => {
  const { token } = useAuth();
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [loading, setLoading] = useState(true);
  const [sheet, setSheet] = useState<BookingDraft | null>(null);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  useEffect(() => {
    const run = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const data = await api.listAmenities(token);
        setAmenities(data);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [token]);

  const openBook = (a: Amenity) => {
    const now = new Date();
    const in1h = addHours(now, 1);
    setSheet({ amenityId: a.id, date: now.toISOString().slice(0, 10), start: now.toISOString().slice(11, 16), end: in1h.toISOString().slice(11, 16) });
    setStart(now.toISOString().slice(11, 16));
    setEnd(in1h.toISOString().slice(11, 16));
  };

  const submitBooking = async () => {
    if (!token || !sheet) return;
    const date = sheet.date;
    const startAt = new Date(`${date}T${start}:00.000Z`).toISOString();
    const endAt = new Date(`${date}T${end}:00.000Z`).toISOString();
    try {
      await api.createBooking(token, { amenityId: sheet.amenityId, startAt, endAt });
      setSheet(null);
      alert('Booking submitted');
    } catch (e) {
      const err = e as { status?: number };
      if (err.status === 409) alert('Time slot already taken');
      else alert('Error creating booking');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Amenities" />
      <FlatList
        contentContainerStyle={{ padding: spacing.lg }}
        data={amenities}
        refreshing={loading}
        onRefresh={() => {}}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: spacing.md }}>
            <Text variant="h2">{item.name}</Text>
            <Text color={colors.subtext}>{item.location}</Text>
            <View style={{ height: spacing.sm }} />
            {item.requiresApproval ? <Badge label="Requires approval" /> : null}
            <View style={{ height: spacing.sm }} />
            <Button title="Book" onPress={() => openBook(item)} />
          </Card>
        )}
      />

      <Sheet visible={!!sheet} onRequestClose={() => setSheet(null)}>
        <Text variant="h2">Create Booking</Text>
        <View style={{ height: spacing.md }} />
        <Input value={sheet?.date} onChangeText={(t) => setSheet((s) => (s ? { ...s, date: t } : s))} placeholder="YYYY-MM-DD" />
        <View style={{ height: spacing.sm }} />
        <Input value={start} onChangeText={setStart} placeholder="HH:MM" />
        <View style={{ height: spacing.sm }} />
        <Input value={end} onChangeText={setEnd} placeholder="HH:MM" />
        <View style={{ height: spacing.lg }} />
        <Button title="Submit" onPress={submitBooking} />
      </Sheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
});

export default AmenitiesScreen;


