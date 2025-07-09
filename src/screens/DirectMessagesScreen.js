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
  Searchbar,
  FAB
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format, isValid } from 'date-fns';

import { getElevationStyle } from '../theme/theme';

// Mock messages data
const mockConversations = [
  {
    id: '1',
    user: {
      id: 1,
      name: 'Sarah Green',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      verified: true,
      online: true
    },
    lastMessage: {
      text: 'Hey! Are you coming to the community garden event tomorrow?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      senderId: 1,
      read: false
    },
    unreadCount: 2,
    connectorId: 'connector_001'
  },
  {
    id: '2',
    user: {
      id: 2,
      name: 'Mike Wilson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      verified: true,
      online: false
    },
    lastMessage: {
      text: 'Thanks for helping with the electricity bill split!',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      senderId: 2,
      read: true
    },
    unreadCount: 0,
    connectorId: 'connector_001'
  },
  {
    id: '3',
    user: {
      id: 3,
      name: 'Emma Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      verified: false,
      online: true
    },
    lastMessage: {
      text: 'I found your lost dog! He\'s safe and sound.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      senderId: 3,
      read: true
    },
    unreadCount: 0,
    connectorId: 'connector_005'
  },
  {
    id: '4',
    user: {
      id: 4,
      name: 'John Business',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      verified: true,
      online: false
    },
    lastMessage: {
      text: 'Great meeting you at the business network! Let\'s collaborate.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      senderId: 4,
      read: true
    },
    unreadCount: 0,
    connectorId: 'connector_003'
  },
  {
    id: '5',
    user: {
      id: 5,
      name: 'Lisa Fitness',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
      verified: false,
      online: true
    },
    lastMessage: {
      text: 'Ready for our morning workout tomorrow?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      senderId: 5,
      read: true
    },
    unreadCount: 0,
    connectorId: 'connector_006'
  }
];

const DirectMessagesScreen = ({ navigation }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [conversations, setConversations] = useState(mockConversations);

  const filterConversations = () => {
    let filtered = conversations;

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(conversation =>
        conversation.user.name.toLowerCase().includes(query) ||
        conversation.lastMessage.text.toLowerCase().includes(query)
      );
    }

    // Filter by status
    switch (activeFilter) {
      case 'unread':
        filtered = filtered.filter(conversation => conversation.unreadCount > 0);
        break;
      case 'online':
        filtered = filtered.filter(conversation => conversation.user.online);
        break;
      case 'verified':
        filtered = filtered.filter(conversation => conversation.user.verified);
        break;
      default:
        break;
    }

    return filtered;
  };

  const markAsRead = (conversationId) => {
    setConversations(prev => 
      prev.map(conversation => 
        conversation.id === conversationId 
          ? { 
              ...conversation, 
              unreadCount: 0,
              lastMessage: { ...conversation.lastMessage, read: true }
            }
          : conversation
      )
    );
  };

  const renderConversationItem = ({ item: conversation }) => (
    <TouchableOpacity 
      onPress={() => {
        markAsRead(conversation.id);
        // Navigate to chat screen
        navigation.navigate('Chat', { 
          conversationId: conversation.id,
          user: conversation.user 
        });
      }}
      style={[
        styles.conversationItem,
        conversation.unreadCount > 0 && { backgroundColor: theme.colors.primaryContainer + '20' }
      ]}
    >
      <Card style={[styles.conversationCard, getElevationStyle('sm', theme)]}>
        <View style={styles.conversationHeader}>
          <View style={styles.avatarContainer}>
            <Avatar.Image 
              size={56} 
              source={{ uri: conversation.user.avatar }} 
            />
            {conversation.user.online && (
              <View style={[styles.onlineIndicator, { backgroundColor: '#10b981' }]} />
            )}
            {conversation.user.verified && (
              <View style={[styles.verifiedBadge, { backgroundColor: theme.colors.primary }]}>
                <MaterialCommunityIcons name="shield-check" size={10} color="white" />
              </View>
            )}
          </View>
          
          <View style={styles.conversationContent}>
            <View style={styles.conversationTitleRow}>
              <Text style={[styles.conversationName, theme.typography.titleSmall]}>
                {conversation.user.name}
              </Text>
              <Text style={[styles.conversationTime, theme.typography.bodySmall]}>
                {(() => {
                  try {
                    const messageDate = new Date(conversation.lastMessage.timestamp);
                    if (isValid(messageDate)) {
                      return format(messageDate, 'h:mm a');
                    }
                    return 'Just now';
                  } catch (error) {
                    console.warn('Invalid date format:', conversation.lastMessage.timestamp);
                    return 'Just now';
                  }
                })()}
              </Text>
            </View>
            
            <View style={styles.conversationMessageRow}>
              <Text 
                style={[
                  styles.conversationMessage, 
                  theme.typography.bodySmall,
                  conversation.unreadCount > 0 && { fontWeight: '600' }
                ]}
                numberOfLines={1}
              >
                {conversation.lastMessage.text}
              </Text>
              {conversation.unreadCount > 0 && (
                <Badge style={styles.unreadBadge}>
                  {conversation.unreadCount}
                </Badge>
              )}
            </View>
          </View>
        </View>
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
    { label: 'Unread', value: 'unread' },
    { label: 'Online', value: 'online' },
    { label: 'Verified', value: 'verified' },
  ];

  const unreadCount = conversations.reduce((total, conv) => total + conv.unreadCount, 0);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, theme.typography.headlineMedium]}>
          Messages
        </Text>
        {unreadCount > 0 && (
          <Badge style={styles.headerBadge}>
            {unreadCount}
          </Badge>
        )}
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search conversations..."
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

      {/* Conversations List */}
      <FlatList
        data={filterConversations()}
        renderItem={renderConversationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.conversationsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialCommunityIcons 
              name="message-outline" 
              size={48} 
              color={theme.colors.onSurfaceVariant} 
            />
            <Text style={[styles.emptyTitle, theme.typography.titleMedium]}>
              No conversations
            </Text>
            <Text style={[styles.emptySubtitle, theme.typography.bodyMedium]}>
              {searchQuery || activeFilter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Start a conversation with your neighbors!'
              }
            </Text>
          </View>
        }
      />

      {/* Floating Action Button */}
      <FAB
        icon="plus"
        label="New Message"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('NewMessage')}
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
  headerBadge: {
    backgroundColor: '#ef4444',
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
  conversationsList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  conversationItem: {
    marginBottom: 12,
  },
  conversationCard: {
    borderRadius: 12,
  },
  conversationHeader: {
    flexDirection: 'row',
    padding: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'white',
  },
  verifiedBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    borderRadius: 8,
    padding: 2,
  },
  conversationContent: {
    flex: 1,
  },
  conversationTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationName: {
    fontWeight: '600',
    flex: 1,
  },
  conversationTime: {
    color: '#999',
  },
  conversationMessageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  conversationMessage: {
    color: '#666',
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: '#ef4444',
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
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});

export default DirectMessagesScreen; 