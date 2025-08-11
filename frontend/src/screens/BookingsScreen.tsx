import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { colors } from '../ui/theme/colors';
import { spacing } from '../ui/theme';
import { Button, Header, ListItem, Text } from '../ui/components';
import { useAuth } from '../lib/auth';
import { api } from '../lib/api';

type Booking = {
  id: number;
  amenity: { id: number; name: string };
  startAt: string;
  endAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELED';
};

const BookingsScreen: React.FC = () => {
  const { token, user } = useAuth();
  const [list, setList] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = user?.role === 'ADMIN' ? await api.listAllBookings(token) : await api.listMyBookings(token);
      setList(data as unknown as Booking[]);
    } finally {
      setLoading(false);
    }
  }, [token, user?.role]);

  useEffect(() => { load(); }, [load]);

  const setStatus = async (id: number, status: Booking['status']) => {
    if (!token) return;
    await api.setBookingStatus(token, id, status);
    await load();
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <View style={styles.container}>
      <Header title="Bookings" />
      <FlatList
        contentContainerStyle={{ padding: spacing.lg }}
        data={list}
        keyExtractor={(i) => String(i.id)}
        refreshing={loading}
        onRefresh={load}
        renderItem={({ item }) => (
          <ListItem>
            <Text variant="h3">{item.amenity?.name || 'Amenity'} — {item.status}</Text>
            <Text color={colors.subtext}>{new Date(item.startAt).toLocaleString()} → {new Date(item.endAt).toLocaleString()}</Text>
            {isAdmin && item.status === 'PENDING' ? (
              <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm }}>
                <Button title="Approve" variant="success" onPress={() => setStatus(item.id, 'APPROVED')} />
                <Button title="Reject" variant="danger" onPress={() => setStatus(item.id, 'REJECTED')} />
              </View>
            ) : null}
          </ListItem>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
});

export default BookingsScreen;


