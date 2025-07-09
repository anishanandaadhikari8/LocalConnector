import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Chip, useTheme, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock moderation data
const mockReports = [
  {
    id: 1,
    type: 'Inappropriate Content',
    reporter: 'User123',
    reportedUser: 'User456',
    postContent: 'This post contains inappropriate language...',
    status: 'Pending',
    timestamp: '2025-07-10T14:30:00Z',
  },
  {
    id: 2,
    type: 'Spam',
    reporter: 'User789',
    reportedUser: 'User101',
    postContent: 'Repeated promotional content...',
    status: 'Reviewed',
    timestamp: '2025-07-10T12:15:00Z',
  },
];

const mockActions = [
  { id: 1, action: 'Warn User', count: 3 },
  { id: 2, action: 'Remove Post', count: 5 },
  { id: 3, action: 'Suspend User', count: 1 },
  { id: 4, action: 'Ban User', count: 0 },
];

const AdminModerationScreen = ({ navigation }) => {
  const theme = useTheme();
  const [reports, setReports] = useState(mockReports);

  const handleAction = (reportId, action) => {
    setReports(prev => prev.map(r => 
      r.id === reportId ? { ...r, status: action } : r
    ));
    alert(`${action} applied (mock)`);
  };

  const renderReport = ({ item }) => (
    <Card style={[styles.reportCard, { backgroundColor: theme.colors.surface }]}>
      <Card.Content style={styles.reportContent}>
        <View style={styles.reportHeader}>
          <Chip
            style={[
              styles.statusChip,
              { backgroundColor: item.status === 'Pending' ? '#f59e0b' : '#10b981' }
            ]}
            textStyle={{ color: 'white' }}
            compact
          >
            {item.status}
          </Chip>
          <Text style={[styles.timestamp, { color: theme.colors.onSurfaceVariant }]}>
            {item.timestamp.slice(0, 16).replace('T', ' ')}
          </Text>
        </View>
        
        <Text style={[styles.reportType, { color: theme.colors.onSurface }]}>
          {item.type}
        </Text>
        <Text style={[styles.reporter, { color: theme.colors.onSurfaceVariant }]}>
          Reported by: {item.reporter}
        </Text>
        <Text style={[styles.reportedUser, { color: theme.colors.onSurfaceVariant }]}>
          Reported user: {item.reportedUser}
        </Text>
        <Text style={[styles.postContent, { color: theme.colors.onSurfaceVariant }]}>
          {item.postContent}
        </Text>
        
        {item.status === 'Pending' && (
          <View style={styles.actionButtons}>
            <Button
              mode="contained"
              onPress={() => handleAction(item.id, 'Warned')}
              style={[styles.actionButton, { backgroundColor: '#f59e0b' }]}
              textColor="white"
            >
              Warn
            </Button>
            <Button
              mode="contained"
              onPress={() => handleAction(item.id, 'Removed')}
              style={[styles.actionButton, { backgroundColor: '#ef4444' }]}
              textColor="white"
            >
              Remove
            </Button>
            <Button
              mode="outlined"
              onPress={() => handleAction(item.id, 'Dismissed')}
              style={styles.actionButton}
              textColor={theme.colors.onSurfaceVariant}
            >
              Dismiss
            </Button>
          </View>
        )}
      </Card.Content>
    </Card>
  );

  const renderAction = ({ item }) => (
    <Card style={[styles.actionCard, { backgroundColor: theme.colors.surface }]}>
      <Card.Content style={styles.actionContent}>
        <Text style={[styles.actionName, { color: theme.colors.onSurface }]}>
          {item.action}
        </Text>
        <Text style={[styles.actionCount, { color: theme.colors.onSurfaceVariant }]}>
          {item.count} times
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backButton, { color: theme.colors.primary }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.header, { color: theme.colors.onSurface }]}>Moderation</Text>
      </View>
      <Divider style={styles.divider} />
      
      <View style={styles.statsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Actions Taken</Text>
        <FlatList
          data={mockActions}
          renderItem={renderAction}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.actionsContainer}
        />
      </View>
      
      <Divider style={styles.divider} />
      
      <View style={styles.reportsSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Reports</Text>
        <FlatList
          data={reports}
          renderItem={renderReport}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.reportsContainer}
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  backButton: { fontSize: 16, marginRight: 16 },
  header: { fontSize: 22, fontWeight: '700' },
  divider: { marginVertical: 4 },
  statsSection: { padding: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  actionsContainer: { paddingHorizontal: 4 },
  actionCard: { width: 120, marginRight: 12, borderRadius: 12, elevation: 1 },
  actionContent: { padding: 12, alignItems: 'center' },
  actionName: { fontSize: 14, fontWeight: '600', textAlign: 'center' },
  actionCount: { fontSize: 12, marginTop: 4 },
  reportsSection: { flex: 1, padding: 16 },
  reportsContainer: { paddingBottom: 16 },
  reportCard: { marginBottom: 8, borderRadius: 12, elevation: 1 },
  reportContent: { padding: 16 },
  reportHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  statusChip: { marginRight: 8 },
  timestamp: { fontSize: 12 },
  reportType: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  reporter: { fontSize: 12, marginBottom: 2 },
  reportedUser: { fontSize: 12, marginBottom: 8 },
  postContent: { fontSize: 14, marginBottom: 12 },
  actionButtons: { flexDirection: 'row', gap: 8 },
  actionButton: { flex: 1 },
});

export default AdminModerationScreen; 