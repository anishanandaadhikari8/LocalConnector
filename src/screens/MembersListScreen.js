import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Avatar, Card, Chip, useTheme, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock members data
const mockMembers = [
  {
    id: 1,
    name: 'Alice Johnson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    neighborhood: 'Downtown',
    verified: true,
    reputation: 98,
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Mike Wilson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    neighborhood: 'Downtown',
    verified: false,
    reputation: 80,
    role: 'Member',
  },
  {
    id: 3,
    name: 'Sarah Green',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    neighborhood: 'Downtown',
    verified: true,
    reputation: 90,
    role: 'Moderator',
  },
];

const MembersListScreen = ({ navigation }) => {
  const theme = useTheme();

  const renderMember = ({ item }) => (
    <Card style={[styles.memberCard, { backgroundColor: theme.colors.surface }]}> 
      <Card.Content style={styles.memberContent}>
        <View style={styles.memberRow}>
          <Avatar.Image size={56} source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.infoSection}>
            <Text style={[styles.name, { color: theme.colors.onSurface }]}>{item.name}</Text>
            <Text style={[styles.neighborhood, { color: theme.colors.onSurfaceVariant }]}>{item.neighborhood}</Text>
            <View style={styles.badgesRow}>
              {item.verified && (
                <Chip icon="check-circle" style={[styles.verifiedChip, { backgroundColor: theme.colors.primary }]} textStyle={{ color: theme.colors.onPrimary }} compact>Verified</Chip>
              )}
              <Chip style={[styles.roleChip, { backgroundColor: theme.colors.surfaceVariant }]} textStyle={{ color: theme.colors.onSurfaceVariant }} compact>{item.role}</Chip>
              <Text style={[styles.reputation, { color: theme.colors.onSurfaceVariant }]}>{item.reputation} rep</Text>
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
        <Text style={[styles.header, { color: theme.colors.onSurface }]}>Members</Text>
      </View>
      <Divider style={styles.divider} />
      <FlatList
        data={mockMembers}
        renderItem={renderMember}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
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
  memberCard: { marginBottom: 8, borderRadius: 12, elevation: 1 },
  memberContent: { flexDirection: 'row', alignItems: 'center' },
  memberRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: { marginRight: 16 },
  infoSection: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600' },
  neighborhood: { fontSize: 13 },
  badgesRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  verifiedChip: { marginRight: 4 },
  roleChip: { marginRight: 4 },
  reputation: { fontSize: 12, marginLeft: 4 },
});

export default MembersListScreen; 