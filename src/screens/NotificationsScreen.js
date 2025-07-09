import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList 
} from 'react-native';
import { 
  Text, 
  Card, 
  Avatar, 
  Chip, 
  Button, 
  useTheme,
  Surface,
  Badge,
  Divider,
  Searchbar
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format, isValid } from 'date-fns';

import { getElevationStyle } from '../theme/theme';

// Mock notifications data
const mockNotifications = [
  {
    id: '1',
    type: 'post_like',
    title: 'Sarah liked your post',
    message: 'Sarah Green liked your post about the community garden',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    read: false,
    connectorId: 'connector_001',
    postId: 'post_123'
  },
  {
    id: '2',
    type: 'connector_invite',
    title: 'Invitation to Downtown Business Network',
    message: 'You\'ve been invited to join the Downtown Business Network connector',
    avatar: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=100&h=100&fit=crop',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    connectorId: 'connector_003'
  },
  {
    id: '3',
    type: 'event_reminder',
    title: 'Event Reminder: Roommate Dinner',
    message: 'Don\'t forget! Roommate dinner is tomorrow at 7 PM',
    avatar: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=crop',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: true,
    connectorId: 'connector_001',
    eventId: 'event_456'
  },
  {
    id: '4',
    type: 'safety_alert',
    title: 'Safety Alert in Your Area',
    message: 'New safety alert reported near Downtown District',
    avatar: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=100&h=100&fit=crop',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    read: false,
    priority: 'high'
  },
  {
    id: '5',
    type: 'marketplace_interest',
    title: 'Interest in Your Marketplace Item',
    message: 'Mike is interested in your "Coffee Table" listing',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    read: true,
    connectorId: 'connector_005',
    listingId: 'listing_789'
  },
  {
    id: '6',
    type: 'connector_join',
    title: 'New Member in Downtown Pet Lovers',
    message: 'Emma joined the Downtown Pet Lovers connector',
    avatar: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=100&h=100&fit=crop',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    read: true,
    connectorId: 'connector_005'
  }
];

const NotificationsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState(mockNotifications);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'post_like':
        return 'heart';
      case 'connector_invite':
        return 'account-plus';
      case 'event_reminder':
        return 'calendar-clock';
      case 'safety_alert':
        return 'alert-circle';
      case 'marketplace_interest':
        return 'shopping';
      case 'connector_join':
        return 'account-group';
      default:
        return 'bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'post_like':
        return '#ef4444';
      case 'connector_invite':
        return '#0284c7';
      case 'event_reminder':
        return '#059669';
      case 'safety_alert':
        return '#dc2626';
      case 'marketplace_interest':
        return '#d97706';
      case 'connector_join':
        return '#7c3aed';
      default:
        return theme.colors.primary;
    }
  };

  const filterNotifications = () => {
    let filtered = notifications;

    // Filter by type
    if (activeFilter !== 'all') {
      filtered = filtered.filter(notification => notification.type === activeFilter);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(notification =>
        notification.title.toLowerCase().includes(query) ||
        notification.message.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const renderNotificationItem = ({ item: notification }) => (
    <TouchableOpacity 
      onPress={() => markAsRead(notification.id)}
      style={[
        styles.notificationItem,
        !notification.read && { backgroundColor: theme.colors.primaryContainer + '20' }
      ]}
    >
      <Card style={[styles.notificationCard, getElevationStyle('sm', theme)]}>
        <View style={styles.notificationHeader}>
          <View style={styles.notificationAvatar}>
            <Avatar.Image 
              size={48} 
              source={{ uri: notification.avatar }} 
            />
            <View style={[
              styles.notificationIcon,
              { backgroundColor: getNotificationColor(notification.type) }
            ]}>
              <MaterialCommunityIcons 
                name={getNotificationIcon(notification.type)} 
                size={16} 
                color="white" 
              />
            </View>
          </View>
          
          <View style={styles.notificationContent}>
            <View style={styles.notificationTitleRow}>
              <Text style={[styles.notificationTitle, theme.typography.titleSmall]}>
                {notification.title}
              </Text>
              {!notification.read && (
                <Badge style={styles.unreadBadge} />
              )}
            </View>
            <Text style={[styles.notificationMessage, theme.typography.bodySmall]}>
              {notification.message}
            </Text>
            <Text style={[styles.notificationTime, theme.typography.bodySmall]}>
              {(() => {
                try {
                  const notificationDate = new Date(notification.timestamp);
                  if (isValid(notificationDate)) {
                    return format(notificationDate, 'MMM d, h:mm a');
                  }
                  return 'Just now';
                } catch (error) {
                  console.warn('Invalid date format:', notification.timestamp);
                  return 'Just now';
                }
              })()}
            </Text>
          </View>
        </View>

        {notification.type === 'connector_invite' && (
          <View style={styles.notificationActions}>
            <Button 
              mode="contained" 
              compact
              style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => navigation.navigate('CommunityDetails', { community: { connectorId: notification.connectorId } })}
            >
              View
            </Button>
            <Button 
              mode="outlined" 
              compact
              style={styles.actionButton}
            >
              Decline
            </Button>
          </View>
        )}

        {notification.type === 'safety_alert' && (
          <View style={styles.notificationActions}>
            <Button 
              mode="contained" 
              compact
              style={[styles.actionButton, { backgroundColor: '#dc2626' }]}
            >
              View Alert
            </Button>
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );

  const renderFilterChip = ({ item: filter }) => (
    <TouchableOpacity
      onPress={() => setActiveFilter(filter.value)}
      style={styles.filterChip}
    >
      <Chip
        selected={activeFilter === filter.value}
        style={[
          styles.chip,
          activeFilter === filter.value && { backgroundColor: theme.colors.primary }
        ]}
        textStyle={[
          styles.chipText,
          activeFilter === filter.value && { color: theme.colors.onPrimary }
        ]}
      >
        {filter.label}
      </Chip>
    </TouchableOpacity>
  );

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Likes', value: 'post_like' },
    { label: 'Invites', value: 'connector_invite' },
    { label: 'Events', value: 'event_reminder' },
    { label: 'Safety', value: 'safety_alert' },
    { label: 'Marketplace', value: 'marketplace_interest' },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, theme.typography.headlineMedium]}>
          Notifications
        </Text>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllAsRead}>
            <Text style={[styles.markAllRead, theme.typography.labelMedium, { color: theme.colors.primary }]}>
              Mark all read
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search notifications..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={[styles.searchBar, { backgroundColor: theme.colors.surfaceVariant }]}
        />
      </View>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <FlatList
          data={filters}
          renderItem={renderFilterChip}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersList}
          keyExtractor={(item) => item.value}
        />
      </View>

      {/* Notifications List */}
      <FlatList
        data={filterNotifications()}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialCommunityIcons 
              name="bell-off" 
              size={48} 
              color={theme.colors.onSurfaceVariant} 
            />
            <Text style={[styles.emptyTitle, theme.typography.titleMedium]}>
              No notifications
            </Text>
            <Text style={[styles.emptySubtitle, theme.typography.bodyMedium]}>
              {searchQuery || activeFilter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'You\'re all caught up!'
              }
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontWeight: '600',
  },
  markAllRead: {
    fontWeight: '500',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    borderRadius: 12,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filtersList: {
    paddingHorizontal: 20,
  },
  filterChip: {
    marginRight: 8,
  },
  chip: {
    borderRadius: 20,
  },
  chipText: {
    fontWeight: '500',
  },
  notificationsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  notificationItem: {
    marginBottom: 12,
  },
  notificationCard: {
    borderRadius: 12,
  },
  notificationHeader: {
    flexDirection: 'row',
    padding: 16,
  },
  notificationAvatar: {
    position: 'relative',
    marginRight: 12,
  },
  notificationIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    borderRadius: 10,
    padding: 2,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontWeight: '600',
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: '#ef4444',
    marginLeft: 8,
  },
  notificationMessage: {
    color: '#666',
    marginBottom: 4,
    lineHeight: 18,
  },
  notificationTime: {
    color: '#999',
  },
  notificationActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  actionButton: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    textAlign: 'center',
    color: '#666',
    lineHeight: 20,
  },
});

export default NotificationsScreen; 