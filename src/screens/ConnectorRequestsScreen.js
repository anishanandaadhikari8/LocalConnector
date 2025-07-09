import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Avatar, Card, Button, useTheme, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock join requests data
const mockRequests = [
  {
    id: 101,
    name: 'Jane Smith',
    avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100&h=100&fit=crop&crop=face',
    reason: 'I want to join for support and advice.',
    requestedAt: '2025-07-10T09:00:00Z',
  },
  {
    id: 102,
    name: 'Bob Lee',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=face',
    reason: 'Looking for a safe space to talk.',
    requestedAt: '2025-07-10T10:30:00Z',
  },
];

const ConnectorRequestsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [requests, setRequests] = useState(mockRequests);

  const handleApprove = (id) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    alert('Request approved (mock)');
  };
  const handleReject = (id) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    alert('Request rejected (mock)');
  };

  const renderRequest = ({ item }) => (
    <Card style={[styles.requestCard, { backgroundColor: theme.colors.surface }]}> 
      <Card.Content style={styles.requestContent}>
        <View style={styles.row}>
          <Avatar.Image size={48} source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.infoSection}>
            <Text style={[styles.name, { color: theme.colors.onSurface }]}>{item.name}</Text>
            <Text style={[styles.reason, { color: theme.colors.onSurfaceVariant }]}>{item.reason}</Text>
            <Text style={[styles.time, { color: theme.colors.onSurfaceVariant }]}>Requested at: {item.requestedAt.slice(0, 16).replace('T', ' ')}</Text>
            <View style={styles.actionsRow}>
              <Button mode="contained" onPress={() => handleApprove(item.id)} style={[styles.actionButton, { backgroundColor: theme.colors.primary }]} textColor={theme.colors.onPrimary}>Approve</Button>
              <Button mode="outlined" onPress={() => handleReject(item.id)} style={styles.actionButton} textColor={theme.colors.error}>Reject</Button>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}> 
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backButton, { color: theme.colors.primary }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.header, { color: theme.colors.onSurface }]}>Join Requests</Text>
      </View>
      <Divider style={styles.divider} />
      <FlatList
        data={requests}
        renderItem={renderRequest}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        ListEmptyComponent={<Text style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>No pending requests.</Text>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  backButton: { fontSize: 16, marginRight: 16 },
  header: { fontSize: 22, fontWeight: '700' },
  divider: { marginVertical: 4 },
  listContent: { padding: 16 },
  requestCard: { marginBottom: 8, borderRadius: 12, elevation: 1 },
  requestContent: { flexDirection: 'row', alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  avatar: { marginRight: 16 },
  infoSection: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600' },
  reason: { fontSize: 13, marginTop: 2 },
  time: { fontSize: 12, marginTop: 2 },
  actionsRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  actionButton: { marginRight: 8 },
  emptyText: { textAlign: 'center', marginTop: 32, fontSize: 16 },
});

export default ConnectorRequestsScreen; 