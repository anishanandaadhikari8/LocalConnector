import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { colors } from '../ui/theme/colors';
import { spacing } from '../ui/theme';
import { Button, Card, Header, Input, ListItem, Text } from '../ui/components';
import { useAuth } from '../lib/auth';
import { api } from '../lib/api';

type Incident = {
  id: number;
  type: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
  severity?: number;
  reportedAt: string;
};

const IncidentsScreen: React.FC = () => {
  const { token, user } = useAuth();
  const [list, setList] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('SECURITY');
  const [desc, setDesc] = useState('');
  const [severity, setSeverity] = useState('3');

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      setList(await api.listIncidents(token));
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const report = async () => {
    if (!token) return;
    await api.reportIncident(token, { type, description: desc, severity: Number(severity) });
    setDesc('');
    await load();
  };

  const setStatus = async (id: number, status: Incident['status']) => {
    if (!token) return;
    await api.setIncidentStatus(token, id, status);
    await load();
  };

  const canManage = user?.role === 'ADMIN' || user?.role === 'SECURITY';

  return (
    <View style={styles.container}>
      <Header title="Incidents" />
      <View style={{ padding: spacing.lg }}>
        <Card>
          <Text variant="h2">Report incident</Text>
          <View style={{ height: spacing.sm }} />
          <Input value={type} onChangeText={setType} placeholder="Type" />
          <View style={{ height: spacing.sm }} />
          <Input value={desc} onChangeText={setDesc} placeholder="Description" multiline />
          <View style={{ height: spacing.sm }} />
          <Input value={severity} onChangeText={setSeverity} placeholder="Severity 1..5" keyboardType="numeric" />
          <View style={{ height: spacing.sm }} />
          <Button title="Submit" onPress={report} />
        </Card>
      </View>
      <FlatList
        contentContainerStyle={{ padding: spacing.lg }}
        data={list}
        keyExtractor={(i) => String(i.id)}
        refreshing={loading}
        onRefresh={load}
        renderItem={({ item }) => (
          <ListItem>
            <Text variant="h3">{item.type} — {item.status}</Text>
            <Text color={colors.subtext}>{item.description}</Text>
            <View style={{ height: spacing.sm }} />
            {canManage ? (
              <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                <Button title="Open" variant="secondary" onPress={() => setStatus(item.id, 'OPEN')} />
                <Button title="In Progress" variant="secondary" onPress={() => setStatus(item.id, 'IN_PROGRESS')} />
                <Button title="Resolved" variant="success" onPress={() => setStatus(item.id, 'RESOLVED')} />
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

export default IncidentsScreen;


