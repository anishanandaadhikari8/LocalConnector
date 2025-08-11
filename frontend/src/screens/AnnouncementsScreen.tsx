import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { colors } from '../ui/theme/colors';
import { spacing } from '../ui/theme';
import { Button, Card, Header, Input, Text } from '../ui/components';
import { useAuth } from '../lib/auth';
import { api } from '../lib/api';

type Announcement = { id: number; title: string; body: string; pinned: boolean; createdAt: string };

const AnnouncementsScreen: React.FC = () => {
  const { token, user } = useAuth();
  const [list, setList] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [pinned, setPinned] = useState(false);

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      setList(await api.listAnnouncements(token));
    } finally {
      setLoading(false);
    }
  }, [token]);
  useEffect(() => { load(); }, [load]);

  const create = async () => {
    if (!token) return;
    await api.createAnnouncement(token, { title, body, pinned });
    setTitle('');
    setBody('');
    setPinned(false);
    await load();
  };

  const togglePin = async (a: Announcement) => {
    if (!token) return;
    await api.pinAnnouncement(token, a.id, !a.pinned);
    await load();
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <View style={styles.container}>
      <Header title="Announcements" />
      {isAdmin ? (
        <View style={{ padding: spacing.lg }}>
          <Card>
            <Text variant="h2">Create announcement</Text>
            <View style={{ height: spacing.sm }} />
            <Input value={title} onChangeText={setTitle} placeholder="Title" />
            <View style={{ height: spacing.sm }} />
            <Input value={body} onChangeText={setBody} placeholder="Body" multiline />
            <View style={{ height: spacing.sm }} />
            <Button title={pinned ? 'Pinned' : 'Not pinned'} variant="secondary" onPress={() => setPinned((p) => !p)} />
            <View style={{ height: spacing.sm }} />
            <Button title="Publish" onPress={create} />
          </Card>
        </View>
      ) : null}
      <FlatList
        contentContainerStyle={{ padding: spacing.lg }}
        data={list}
        refreshing={loading}
        onRefresh={load}
        keyExtractor={(i) => String(i.id)}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: spacing.md }}>
            <Text variant="h2">{item.title}</Text>
            <Text color={colors.subtext}>{new Date(item.createdAt).toLocaleString()}</Text>
            <View style={{ height: spacing.sm }} />
            <Text>{item.body}</Text>
            {isAdmin ? <View style={{ height: spacing.sm }} /> : null}
            {isAdmin ? (
              <Button title={item.pinned ? 'Unpin' : 'Pin'} variant="secondary" onPress={() => togglePin(item)} />
            ) : null}
          </Card>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
});

export default AnnouncementsScreen;


